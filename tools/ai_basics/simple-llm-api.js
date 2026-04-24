/**
 * 简单 LLM API 封装 - 教学用
 * Learn LLM API Wrapper - For Educational Purposes
 * 
 * 这是一个简化版的 API 封装，用于学习目的
 * 功能完整但代码简洁易懂
 */

// API 配置
const API_CONFIG = {
    // DeepSeek API 配置
    deepseek: {
        endpoint: 'https://api.deepseek.com/chat/completions',
        defaultModel: 'deepseek-v4-flash'
    },
    // OpenAI API 配置
    openai: {
        endpoint: 'https://api.openai.com/v1/chat/completions',
        defaultModel: 'gpt-4'
    }
};

// 简易 LLM 客户端
class SimpleLLM {
    constructor(config = {}) {
        this.apiKey = config.apiKey || '';
        this.endpoint = config.endpoint || API_CONFIG.deepseek.endpoint;
        this.model = config.model || API_CONFIG.deepseek.defaultModel;
        this.systemPrompt = config.systemPrompt || '';
    }
    
    // 设置 API Key
    setApiKey(key) {
        this.apiKey = key;
    }
    
    // 设置系统提示词
    setSystemPrompt(prompt) {
        this.systemPrompt = prompt;
    }
    
    // 发送对话请求
    async chat(message, options = {}) {
        if (!this.apiKey) {
            throw new Error('请先设置 API Key');
        }
        
        const messages = [];
        if (this.systemPrompt) {
            messages.push({ role: 'system', content: this.systemPrompt });
        }
        messages.push({ role: 'user', content: message });
        
        const body = {
            model: options.model || this.model,
            messages,
            temperature: options.temperature ?? 0.7,
            max_tokens: options.maxTokens || 2000,
            stream: false
        };
        
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.error?.message || `HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return {
            content: data.choices?.[0]?.message?.content || '',
            usage: data.usage || null
        };
    }
    
    // 流式输出 (简化版)
    async *stream(message, options = {}) {
        if (!this.apiKey) {
            throw new Error('请先设置 API Key');
        }
        
        const messages = [];
        if (this.systemPrompt) {
            messages.push({ role: 'system', content: this.systemPrompt });
        }
        messages.push({ role: 'user', content: message });
        
        const body = {
            model: options.model || this.model,
            messages,
            temperature: options.temperature ?? 0.7,
            max_tokens: options.maxTokens || 2000,
            stream: true
        };
        
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.error?.message || `HTTP ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') return;
                    
                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices?.[0]?.delta?.content;
                        if (content) yield content;
                    } catch (e) {
                        // 忽略解析错误
                    }
                }
            }
        }
    }
}

// 便捷函数 - 快速调用
function createLLM(apiKey, options = {}) {
    const llm = new SimpleLLM(options);
    llm.setApiKey(apiKey);
    return llm;
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.SimpleLLM = SimpleLLM;
    window.createLLM = createLLM;
    window.API_CONFIG = API_CONFIG;
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SimpleLLM, createLLM, API_CONFIG };
}
