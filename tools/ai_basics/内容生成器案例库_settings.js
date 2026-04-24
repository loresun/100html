// --- 设置相关 ---

    function loadSettings() {
      const savedConfig = localStorage.getItem('global_llm_config');
      if (savedConfig) {
        try {
          const config = JSON.parse(savedConfig);
          if (config.deepseek) {
            document.getElementById('apiKey').value = config.deepseek;
          }
           // 注意：这里没有保存 apiUrl，因为 usually it's fixed or derived. 
           // But existing code has apiUrl input. Let's respect what's there but primarily sync key.
           // Check if model is saved
           if(config.model){
               const modelSelect = document.getElementById('modelId');
                if(modelSelect){
                    modelSelect.value = config.model;
                }
           }
        } catch (e) {
          console.error('Error loading settings:', e);
        }
      }
      updateApiStatus();
    }

    function saveSettings() {
      const apiKey = document.getElementById('apiKey').value.trim();
      const model = document.getElementById('modelId').value;
      
      let currentConfig = {};
      try {
          currentConfig = JSON.parse(localStorage.getItem('global_llm_config') || '{}');
      } catch (e) {
          console.error('Error parsing config for update:', e);
      }
      
      const newConfig = {
          ...currentConfig,
          deepseek: apiKey,
          model: model
      };
      
      localStorage.setItem('global_llm_config', JSON.stringify(newConfig));
      updateApiStatus();
    }
    
    function updateApiStatus() {
        const apiKey = document.getElementById('apiKey').value.trim();
        const apiStatusDot = document.getElementById('apiStatus');
        if (apiKey) {
            apiStatusDot.classList.remove('bg-danger');
            apiStatusDot.classList.add('bg-success'); // Assuming success class exists or green color
            apiStatusDot.style.backgroundColor = '#10b981'; // Tailwind emerald-500
        } else {
            apiStatusDot.classList.remove('bg-success');
            apiStatusDot.style.backgroundColor = ''; // Reset inline style
            apiStatusDot.classList.add('bg-danger');
        }
    }

    // 初始化时加载设置
    document.addEventListener('DOMContentLoaded', () => {
        loadSettings();
        // ... existing DOMContentLoaded logic ...
    });

    // 绑定保存事件 (在 initEventListeners 中调用或在此处附加)
    //为了不破坏现有结构，我将 append 这些逻辑。
