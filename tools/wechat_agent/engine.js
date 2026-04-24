/**
 * 微信公众号 Agent 引擎 - 纯前端 Agent 编排核心
 * 
 * 设计理念：
 *   将 AI Agent 的 Plan → Execute → Review → Refine 循环
 *   完全在浏览器端用 JS 实现，通过 EventTarget 驱动 UI 更新。
 * 
 * 核心能力：
 *   1. Skill 执行器 - 单个技能的 API 调用与流式输出
 *   2. Pipeline 编排器 - 多技能串行/并行编排，上下文自动传递
 *   3. 审查门控 - 可选的质量检查与自动重试
 *   4. 上下文管理 - 全局记忆与步骤间数据流
 *   5. 事件系统 - 解耦 UI 与逻辑层
 */

class AgentEngine extends EventTarget {

    /**
     * @param {Object} apiConfig - API 配置对象
     * @param {string} apiConfig.deepseek - DeepSeek API Key
     * @param {string} apiConfig.model - 模型名称 (deepseek-v4-flash / deepseek-v4-pro)
     * @param {string} [apiConfig.baseUrl] - API 基础 URL
     */
    constructor(apiConfig) {
        super();
        this.apiConfig = apiConfig;
        // Agent 运行上下文：保存每步输入输出与全局变量
        this.context = { input: {}, steps: {}, globals: {} };
        // 执行历史记录
        this.history = [];
        // 运行状态标记
        this.isRunning = false;
        // 是否被用户手动中止
        this.aborted = false;
        // 当前正在执行的 AbortController（用于取消 fetch）
        this._abortController = null;
    }

    // ===================== 事件辅助 =====================

    /** 触发自定义事件，附带 detail 数据 */
    _emit(eventName, detail) {
        this.dispatchEvent(new CustomEvent(eventName, { detail }));
    }

    // ===================== API 层 =====================

    /**
     * 调用 DeepSeek API（流式）
     * 
     * @param {Array} messages - 消息数组 [{role, content}]
     * @param {Object} options - 可选参数
     * @param {Function} [options.onChunk] - 每收到一个 token 时的回调 (deltaText, fullText) => void
     * @param {boolean} [options.jsonMode] - 是否启用 JSON 输出模式
     * @param {number} [options.temperature] - 温度参数
     * @returns {Promise<{content: string, reasoning: string}>} 最终内容与推理过程
     */
    async callAPI(messages, options = {}) {
        const { onChunk, jsonMode = false, temperature = 0.7 } = options;
        const baseUrl = this.apiConfig.baseUrl || 'https://api.deepseek.com';

        this._abortController = new AbortController();

        const body = {
            model: this.apiConfig.model || 'deepseek-v4-flash',
            messages,
            stream: true,
            temperature,
        };
        if (jsonMode) {
            body.response_format = { type: 'json_object' };
        }

        const response = await fetch(`${baseUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiConfig.deepseek}`,
            },
            body: JSON.stringify(body),
            signal: this._abortController.signal,
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API 请求失败 (${response.status}): ${errText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let content = '';
        let reasoning = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop();

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices?.[0]?.delta;
                    if (!delta) continue;

                    if (delta.reasoning_content) {
                        reasoning += delta.reasoning_content;
                    }
                    if (delta.content) {
                        content += delta.content;
                        if (onChunk) onChunk(delta.content, content);
                    }
                } catch (e) {
                    // 忽略解析异常的行
                }
            }
        }

        return { content, reasoning };
    }

    // ===================== Skill 执行 =====================

    /**
     * 执行单个 Skill
     * 
     * @param {Object} skill - Skill 定义对象 (来自 skills.js)
     * @param {Object} input - 传入技能的参数
     * @param {Object} [options] - 执行选项
     * @param {Function} [options.onStream] - 流式回调
     * @returns {Promise<Object>} 技能输出结果 { raw, parsed, reasoning }
     */
    async executeSkill(skill, input, options = {}) {
        const { onStream } = options;

        // 构建 messages
        const systemPrompt = typeof skill.systemPrompt === 'function'
            ? skill.systemPrompt(input) : skill.systemPrompt;
        const userPrompt = skill.buildPrompt(input);

        const messages = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
        ];

        // 调用 API
        const { content, reasoning } = await this.callAPI(messages, {
            onChunk: onStream,
            jsonMode: skill.jsonMode || false,
            temperature: skill.temperature ?? 0.7,
        });

        // 后处理：将原始文本转换为结构化输出
        let parsed = content;
        if (skill.postProcess) {
            try {
                parsed = skill.postProcess(content, input);
            } catch (e) {
                console.warn(`[AgentEngine] Skill "${skill.id}" postProcess 异常:`, e);
                parsed = content;
            }
        }

        return { raw: content, parsed, reasoning };
    }

    // ===================== Pipeline 编排 =====================

    /**
     * 运行完整管道（Pipeline）
     * 
     * 管道步骤按顺序执行，每步的输出自动注入上下文，
     * 下一步可通过 inputMapping 引用前序步骤的输出。
     * 
     * @param {Object} pipeline - 管道定义 (来自 pipelines.js)
     * @param {Object} userInput - 用户初始输入
     * @param {Object} skillRegistry - 技能注册表 { skillId: skillDef }
     * @returns {Promise<Object>} 完整上下文
     */
    async runPipeline(pipeline, userInput, skillRegistry) {
        this.isRunning = true;
        this.aborted = false;

        // 初始化上下文
        this.context = {
            input: { ...userInput },
            steps: {},
            globals: { ...pipeline.globals },
        };

        this._emit('pipeline-start', { pipeline, input: userInput });

        const steps = pipeline.steps;
        for (let i = 0; i < steps.length; i++) {
            if (this.aborted) {
                this._emit('pipeline-aborted', { atStep: i });
                break;
            }

            const stepDef = steps[i];
            const skill = skillRegistry[stepDef.skillId];

            if (!skill) {
                this._emit('step-error', { index: i, error: `未找到技能: ${stepDef.skillId}` });
                continue;
            }

            // 解析输入映射：将上下文中的值注入为本步输入
            const skillInput = this._resolveInputMapping(stepDef.inputMapping || {});

            this._emit('step-start', { index: i, step: stepDef, skill, input: skillInput });

            let result;
            let attempts = 0;
            const maxRetries = stepDef.maxRetries || 1;

            // 重试循环（含可选审查门控）
            while (attempts < maxRetries) {
                attempts++;
                try {
                    result = await this.executeSkill(skill, skillInput, {
                        onStream: (delta, full) => {
                            this._emit('step-stream', { index: i, delta, full });
                        },
                    });

                    // 审查门控：如果定义了 reviewPrompt，则用 AI 审查输出质量
                    if (stepDef.reviewGate && attempts < maxRetries) {
                        const passed = await this._reviewOutput(
                            result.raw, stepDef.reviewGate, skillInput
                        );
                        if (passed) break;
                        // 未通过审查，将审查反馈注入下次重试
                        skillInput._reviewFeedback = passed.feedback || '请优化输出质量';
                        this._emit('step-retry', { index: i, attempt: attempts });
                    } else {
                        break;
                    }
                } catch (err) {
                    if (this.aborted) break;
                    if (attempts >= maxRetries) {
                        this._emit('step-error', { index: i, error: err.message });
                        result = { raw: '', parsed: '', reasoning: '' };
                    } else {
                        this._emit('step-retry', { index: i, attempt: attempts, error: err.message });
                        await this._sleep(1000 * attempts);
                    }
                }
            }

            // 将输出存入上下文
            this.context.steps[stepDef.id || stepDef.skillId] = {
                output: result?.parsed || result?.raw || '',
                raw: result?.raw || '',
                reasoning: result?.reasoning || '',
            };

            // 记录历史
            this.history.push({
                pipelineId: pipeline.id,
                stepIndex: i,
                skillId: stepDef.skillId,
                input: skillInput,
                output: result,
                timestamp: Date.now(),
            });

            this._emit('step-complete', { index: i, step: stepDef, result });
        }

        this.isRunning = false;
        this._emit('pipeline-complete', { context: this.context });
        return this.context;
    }

    /**
     * 中止当前运行
     */
    abort() {
        this.aborted = true;
        if (this._abortController) {
            this._abortController.abort();
        }
        this._emit('pipeline-aborted', {});
    }

    // ===================== 输入映射解析 =====================

    /**
     * 根据 inputMapping 从上下文中提取值
     * 
     * 映射语法：
     *   "input.topic"        → context.input.topic (用户原始输入)
     *   "steps.outline.output" → context.steps.outline.output (前序步骤输出)
     *   "globals.style"      → context.globals.style (全局变量)
     *   "literal:xxx"        → 字面量字符串 "xxx"
     * 
     * @param {Object} mapping - { targetKey: "source.path" }
     * @returns {Object} 解析后的输入对象
     */
    _resolveInputMapping(mapping) {
        const resolved = {};
        for (const [key, path] of Object.entries(mapping)) {
            if (typeof path === 'string' && path.startsWith('literal:')) {
                resolved[key] = path.slice(8);
            } else {
                resolved[key] = this._getNestedValue(this.context, path);
            }
        }
        return resolved;
    }

    /** 安全地按 dot-path 取嵌套值 */
    _getNestedValue(obj, path) {
        if (!path || typeof path !== 'string') return path;
        return path.split('.').reduce((acc, key) => {
            return acc != null ? acc[key] : undefined;
        }, obj);
    }

    // ===================== 审查门控 =====================

    /**
     * 用 AI 审查某步输出是否达标
     * 
     * @param {string} output - 待审查的输出文本
     * @param {Object} gate - 审查配置 { criteria, passThreshold }
     * @param {Object} originalInput - 原始输入（提供上下文）
     * @returns {Promise<boolean>} 是否通过
     */
    async _reviewOutput(output, gate, originalInput) {
        const reviewMessages = [
            {
                role: 'system',
                content: '你是一个严格的内容质量审查员。根据给定标准评估内容质量，返回 JSON: {"score": 1-10, "passed": true/false, "feedback": "改进建议"}'
            },
            {
                role: 'user',
                content: `审查标准：${gate.criteria}\n\n原始需求：${JSON.stringify(originalInput)}\n\n待审查内容：\n${output}\n\n请以 JSON 格式返回评估结果。`
            }
        ];

        try {
            const { content } = await this.callAPI(reviewMessages, {
                jsonMode: true,
                temperature: 0.3,
            });
            const result = JSON.parse(content);
            return result.score >= (gate.passThreshold || 7);
        } catch {
            return true; // 审查失败时默认通过，避免阻塞
        }
    }

    // ===================== 工具方法 =====================

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 导出当前上下文为 JSON
     */
    exportContext() {
        return JSON.stringify(this.context, null, 2);
    }

    /**
     * 导出所有步骤输出为纯文本（适合拷贝到公众号编辑器）
     */
    exportAsText() {
        const parts = [];
        for (const [stepId, data] of Object.entries(this.context.steps)) {
            parts.push(`====== ${stepId} ======\n\n${data.output}\n`);
        }
        return parts.join('\n');
    }

    /**
     * 重置引擎状态
     */
    reset() {
        this.context = { input: {}, steps: {}, globals: {} };
        this.history = [];
        this.isRunning = false;
        this.aborted = false;
    }
}

// 暴露到全局
window.AgentEngine = AgentEngine;
