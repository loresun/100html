/**
 * DeepSeek V4 兼容层
 * 功能：
 * 1. 自动迁移 localStorage 中的旧模型配置（deepseek-chat / deepseek-reasoner）
 * 2. 拦截 fetch 请求，自动为 V4 模型注入 thinking + reasoning_effort 参数
 * 3. 提供显式 API 供高级页面使用
 *
 * 用法：在 <head> 或 <body> 开头引入即可
 * <script src="../../assets/js/deepseek-v4-compat.js"></script>
 */
(function () {
  'use strict';

  const V4_MODELS = ['deepseek-v4-flash', 'deepseek-v4-pro'];
  const OLD_MODELS = {
    'deepseek-chat': { model: 'deepseek-v4-flash', thinking: 'disabled' },
    'deepseek-reasoner': { model: 'deepseek-v4-pro', thinking: 'enabled' }
  };

  // API 层面默认 thinking = enabled，但兼容层会根据旧体验显式注入：
  // - v4-flash → disabled（保持原 deepseek-chat 的非思考体验）
  // - v4-pro  → enabled（保持原 deepseek-reasoner 的思考体验）
  // reasoning_effort 映射：low/medium → high, xhigh → max

  /* ==================== 1. localStorage 配置迁移 ==================== */

  function migrateLocalStorage() {
    // 扫描所有 localStorage key，寻找包含旧 model 字段的配置
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      try {
        const raw = localStorage.getItem(key);
        if (!raw || !raw.includes('deepseek')) continue;
        const config = JSON.parse(raw);
        if (!config || typeof config !== 'object') continue;
        if (config.model && OLD_MODELS[config.model]) {
          const migration = OLD_MODELS[config.model];
          config.model = migration.model;
          config.thinking = migration.thinking;
          if (!config.reasoning_effort) {
            config.reasoning_effort = 'high';
          }
          localStorage.setItem(key, JSON.stringify(config));
          console.log(`[DeepSeek V4 Migrate] ${key}: ${config.model} → ${migration.model}, thinking=${migration.thinking}, effort=${config.reasoning_effort}`);
        }
      } catch (e) {
        // 非 JSON 值或解析失败，忽略
      }
    }
  }

  /* ==================== 2. fetch 拦截（自动注入 thinking + effort） ==================== */

  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const [url, options] = args;

    if (
      typeof url === 'string' &&
      url.includes('api.deepseek.com') &&
      options &&
      typeof options.body === 'string'
    ) {
      try {
        const body = JSON.parse(options.body);
        if (body.model && V4_MODELS.includes(body.model) && !body.thinking) {
          // 根据模型推断默认 thinking 行为，保持与旧范式一致的体验
          if (body.model === 'deepseek-v4-flash') {
            body.thinking = { type: 'disabled' };
          } else {
            body.thinking = { type: 'enabled' };
          }

          // 如果开启了 thinking，尝试从 localStorage 读取 effort
          if (body.thinking.type === 'enabled') {
            try {
              const global = JSON.parse(localStorage.getItem('global_llm_config') || '{}');
              if (global.reasoning_effort) {
                body.reasoning_effort = global.reasoning_effort;
              } else {
                body.reasoning_effort = 'high';
              }
            } catch (e) {
              body.reasoning_effort = 'high';
            }
          }

          args[1] = { ...options, body: JSON.stringify(body) };
        }
      } catch (e) {
        // 忽略解析错误
      }
    }

    return originalFetch.apply(this, args);
  };

  /* ==================== 3. 显式 API ==================== */

  window.DeepSeekV4 = {
    /** 手动触发配置迁移 */
    migrate: migrateLocalStorage,

    /** 获取模型的默认 thinking 模式 */
    getDefaultThinking(model) {
      if (model === 'deepseek-v4-flash') return 'disabled';
      if (model === 'deepseek-v4-pro') return 'enabled';
      return 'disabled';
    },

    /** 规范化 reasoning_effort */
    normalizeEffort(effort) {
      const e = String(effort).toLowerCase();
      if (e === 'low' || e === 'medium') return 'high';
      if (e === 'xhigh') return 'max';
      if (e === 'high' || e === 'max') return e;
      return 'high';
    },

    /**
     * 构建符合 V4 规范的请求体
     * @param {Object} baseBody - 原始请求体
     * @param {string} thinkingType - 'enabled' | 'disabled'
     * @param {string} reasoningEffort - 'high' | 'max' | undefined
     * @returns {Object} 修正后的请求体
     */
    buildBody(baseBody, thinkingType, reasoningEffort) {
      if (!baseBody || !V4_MODELS.includes(baseBody.model)) {
        return baseBody;
      }

      const thinking = thinkingType || this.getDefaultThinking(baseBody.model);
      baseBody.thinking = { type: thinking };

      if (thinking === 'enabled') {
        baseBody.reasoning_effort = this.normalizeEffort(reasoningEffort);

        // thinking 模式下这些参数无效或应避免依赖
        delete baseBody.temperature;
        delete baseBody.top_p;
        delete baseBody.presence_penalty;
        delete baseBody.frequency_penalty;
      }

      return baseBody;
    },

    /** 判断是否为 V4 模型 */
    isV4(model) {
      return V4_MODELS.includes(model);
    },

    /** 旧模型到新配置的映射 */
    MIGRATION_MAP: OLD_MODELS
  };

  /* ==================== 4. 页面加载时自动执行迁移 ==================== */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', migrateLocalStorage);
  } else {
    migrateLocalStorage();
  }
})();
