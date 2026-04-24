(() => {
  const storageKey = 'global_llm_config';
  const modelMap = {
    'v4-flash': 'deepseek-v4-flash',
    'v4-pro': 'deepseek-v4-pro'
  };
  const defaultConfig = {
    deepseek: '',
    model: modelMap['v4-flash'],
    thinking: 'disabled'
  };

  const loadConfig = () => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return { ...defaultConfig };
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultConfig, ...parsed };
    } catch (error) {
      console.warn('读取全局配置失败，使用默认值', error);
      return { ...defaultConfig };
    }
  };

  const saveConfig = (config) => {
    const current = loadConfig();
    const nextConfig = { ...current, ...config };
    localStorage.setItem(storageKey, JSON.stringify(nextConfig));
    return nextConfig;
  };

  const resolveLabel = (model) => {
    const entry = Object.entries(modelMap).find(([, value]) => value === model);
    return entry ? entry[0] : 'v4-flash';
  };

  const callLLM = async ({ apiKey, model, messages, temperature = 0.7, thinking = 'disabled', reasoning_effort = 'high' }) => {
    if (!apiKey) {
      throw new Error('请先在设置中配置 API Key。');
    }
    const body = {
      model,
      messages,
      thinking: { type: thinking }
    };
    if (thinking === 'enabled') {
      body.reasoning_effort = reasoning_effort;
    } else {
      body.temperature = temperature;
    }
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 请求失败：${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  };

  window.studyShared = {
    storageKey,
    modelMap,
    defaultConfig,
    loadConfig,
    saveConfig,
    resolveLabel,
    callLLM
  };
})();
