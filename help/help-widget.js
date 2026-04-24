(() => {
  const existing = document.getElementById('help-widget-root');
  if (existing) return;

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const ensureLibraries = async () => {
    if (!window.marked) {
      await loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
    }
    if (!window.mermaid) {
      await loadScript('https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js');
      window.mermaid.initialize({ startOnLoad: false, theme: 'default' });
    }
  };

  const root = document.createElement('div');
  root.id = 'help-widget-root';

  root.innerHTML = `
    <style>
      .help-widget-button {
        position: fixed;
        top: 76px;
        right: 20px;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: #4f46e5;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.35);
        cursor: pointer;
        z-index: 80;
        border: none;
      }
      .help-widget-overlay {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.45);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 24px;
        z-index: 90;
      }
      .help-widget-modal {
        width: min(960px, 100%);
        max-height: 85vh;
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 24px 48px rgba(15, 23, 42, 0.2);
      }
      .help-widget-header {
        padding: 16px 20px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .help-widget-body {
        padding: 20px;
        overflow-y: auto;
        line-height: 1.8;
      }
      .help-widget-body pre {
        background: #0f172a;
        color: #e2e8f0;
        padding: 1rem;
        border-radius: 12px;
        overflow-x: auto;
      }
      .help-widget-body code {
        background: #f1f5f9;
        padding: 0.15rem 0.35rem;
        border-radius: 6px;
      }
      .help-widget-close {
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #64748b;
      }
    </style>
    <button class="help-widget-button" aria-label="打开帮助">?</button>
    <div class="help-widget-overlay" role="dialog" aria-modal="true">
      <div class="help-widget-modal">
        <div class="help-widget-header">
          <div>
            <div class="text-sm text-slate-500">帮助文档</div>
            <div class="text-lg font-semibold text-slate-800">使用指南</div>
          </div>
          <div class="flex items-center gap-3">
            <a class="text-sm text-indigo-600 hover:underline" href="/help/index.html" target="_blank">打开帮助中心</a>
            <button class="help-widget-close" aria-label="关闭">✕</button>
          </div>
        </div>
        <div class="help-widget-body" id="help-widget-content">
          <p class="text-slate-500">加载中...</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  const button = root.querySelector('.help-widget-button');
  const overlay = root.querySelector('.help-widget-overlay');
  const closeButton = root.querySelector('.help-widget-close');
  const content = root.querySelector('#help-widget-content');

  const renderMarkdown = (markdown) => {
    content.innerHTML = window.marked.parse(markdown);
    const mermaidBlocks = content.querySelectorAll('code.language-mermaid');
    mermaidBlocks.forEach((block) => {
      const pre = block.parentElement;
      const container = document.createElement('div');
      container.className = 'mermaid';
      container.textContent = block.textContent;
      pre.replaceWith(container);
    });
    if (content.querySelector('.mermaid')) {
      window.mermaid.init(undefined, content.querySelectorAll('.mermaid'));
    }
  };

  const loadDoc = async () => {
    const scriptTag = document.currentScript || document.querySelector('script[src*="help-widget.js"]');
    const docPath = scriptTag?.dataset.helpDoc || document.body.dataset.helpDoc || 'help/index.md';
    try {
      await ensureLibraries();
      const response = await fetch(docPath);
      const markdown = await response.text();
      renderMarkdown(markdown);
    } catch (error) {
      content.innerHTML = '<p class="text-red-500">帮助文档加载失败，请检查路径配置。</p>';
    }
  };

  const openModal = async () => {
    overlay.style.display = 'flex';
    await loadDoc();
  };

  const closeModal = () => {
    overlay.style.display = 'none';
  };

  button.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });
})();
