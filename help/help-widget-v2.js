/**
 * 帮助文档弹窗组件 V2
 * 
 * 功能：
 * 1. 在页面右上角显示帮助按钮（问号图标）
 * 2. 点击按钮弹出 Markdown 帮助文档
 * 3. 自动根据当前页面路径匹配对应的帮助文档
 * 4. 支持 Mermaid 流程图渲染
 * 
 * 使用方式：
 * 方式一（自动匹配）：在 HTML 页面底部添加：
 *   <script src="/help/help-widget-v2.js"></script>
 * 
 * 方式二（手动指定）：
 *   <script src="/help/help-widget-v2.js" data-help-doc="/docs/help/your_doc.md"></script>
 * 
 * 方式三（通过 body 属性）：
 *   <body data-help-doc="/docs/help/your_doc.md">
 */
(() => {
  // 防止重复初始化
  const existing = document.getElementById('help-widget-root-v2');
  if (existing) return;

  // ===================== 配置常量 =====================
  
  // 帮助文档基础路径（相对于网站根目录）
  const HELP_DOCS_BASE = '/docs/help/';
  // manifest.json 路径
  const MANIFEST_PATH = '/help/manifest.json';
  
  // ===================== 工具函数 =====================
  
  /**
   * 动态加载外部脚本
   * @param {string} src - 脚本 URL
   * @returns {Promise} 加载完成的 Promise
   */
  const loadScript = (src) => new Promise((resolve, reject) => {
    // 检查是否已加载
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  /**
   * 加载外部样式表
   * @param {string} href - 样式表 URL
   * @returns {Promise} 加载完成的 Promise
   */
  const loadStyle = (href) => new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });

  /**
   * 确保依赖库已加载
   * 包括：marked（Markdown 解析）、mermaid（流程图）、highlight.js（代码高亮）
   */
  const ensureLibraries = async () => {
    // 加载 marked
    if (!window.marked) {
      await loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
    }
    
    // 加载 mermaid
    if (!window.mermaid) {
      await loadScript('https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js');
      window.mermaid.initialize({ 
        startOnLoad: false, 
        theme: 'default',
        securityLevel: 'loose'
      });
    }
    
    // 加载 highlight.js（可选，用于代码高亮）
    if (!window.hljs) {
      try {
        await loadScript('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js');
        await loadStyle('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css');
      } catch (e) {
        console.warn('高亮库加载失败，代码将不会高亮显示', e);
      }
    }
  };

  /**
   * 获取当前页面对应的帮助文档路径
   * 优先级：
   * 1. script 标签的 data-help-doc 属性
   * 2. body 标签的 data-help-doc 属性
   * 3. 从 manifest.json 中根据当前页面路径查找
   * 4. 默认返回 index.md
   */
  const getHelpDocPath = async () => {
    // 获取当前脚本标签
    const scriptTag = document.currentScript || 
      document.querySelector('script[src*="help-widget-v2.js"]');
    
    // 优先级 1: script 的 data-help-doc
    if (scriptTag?.dataset.helpDoc) {
      return scriptTag.dataset.helpDoc;
    }
    
    // 优先级 2: body 的 data-help-doc
    if (document.body.dataset.helpDoc) {
      return document.body.dataset.helpDoc;
    }
    
    // 优先级 3: 从 manifest 自动匹配
    try {
      const response = await fetch(MANIFEST_PATH);
      if (response.ok) {
        const manifest = await response.json();
        const currentPath = window.location.pathname;
        
        // 在 manifest.docs 中查找匹配的文档
        const matchedDoc = manifest.docs?.find(doc => {
          // 匹配策略：当前路径以 source 结尾
          // 例如：/tools/webtools/breathing_exercise.html 匹配 tools/webtools/breathing_exercise.html
          const sourcePath = doc.source;
          return currentPath.endsWith(sourcePath) || 
                 currentPath.endsWith('/' + sourcePath) ||
                 currentPath === '/' + sourcePath;
        });
        
        if (matchedDoc) {
          return HELP_DOCS_BASE + matchedDoc.path;
        }
      }
    } catch (e) {
      console.warn('无法加载帮助文档映射:', e);
    }
    
    // 优先级 4: 默认文档
    return '/help/index.md';
  };

  // 缓存帮助文档路径
  let helpDocPathCache = null;

  // ===================== 创建 UI 组件 =====================
  
  const root = document.createElement('div');
  root.id = 'help-widget-root-v2';

  // 内联样式，确保在各种页面中都能正常显示
  root.innerHTML = `
    <style>
      /* ===== 帮助按钮样式 ===== */
      .help-widget-btn {
        position: fixed;
        top: 80px;
        right: 24px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 
          0 4px 6px -1px rgba(99, 102, 241, 0.3),
          0 10px 20px -3px rgba(139, 92, 246, 0.25),
          0 0 0 3px rgba(139, 92, 246, 0.1);
        cursor: pointer;
        z-index: 9998;
        border: none;
        font-size: 20px;
        font-weight: 700;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: help-widget-pulse 2s infinite;
      }
      
      .help-widget-btn:hover {
        transform: scale(1.1);
        box-shadow: 
          0 6px 8px -2px rgba(99, 102, 241, 0.4),
          0 14px 24px -4px rgba(139, 92, 246, 0.35),
          0 0 0 4px rgba(139, 92, 246, 0.15);
      }
      
      .help-widget-btn:active {
        transform: scale(0.95);
      }
      
      @keyframes help-widget-pulse {
        0%, 100% {
          box-shadow: 
            0 4px 6px -1px rgba(99, 102, 241, 0.3),
            0 10px 20px -3px rgba(139, 92, 246, 0.25),
            0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        50% {
          box-shadow: 
            0 4px 6px -1px rgba(99, 102, 241, 0.3),
            0 10px 20px -3px rgba(139, 92, 246, 0.25),
            0 0 0 8px rgba(139, 92, 246, 0.05);
        }
      }

      /* ===== 遮罩层样式 ===== */
      .help-widget-overlay {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .help-widget-overlay.active {
        display: flex;
        opacity: 1;
      }

      /* ===== 弹窗样式 ===== */
      .help-widget-modal {
        width: min(900px, 95vw);
        max-height: 90vh;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 
          0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 0 0 1px rgba(0, 0, 0, 0.05);
        transform: translateY(20px) scale(0.98);
        transition: transform 0.3s ease;
      }
      
      .help-widget-overlay.active .help-widget-modal {
        transform: translateY(0) scale(1);
      }

      /* ===== 弹窗头部样式 ===== */
      .help-widget-header {
        padding: 16px 20px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-shrink: 0;
      }
      
      .help-widget-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .help-widget-header-icon {
        width: 36px;
        height: 36px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      
      .help-widget-header-title {
        font-size: 18px;
        font-weight: 600;
      }
      
      .help-widget-header-subtitle {
        font-size: 12px;
        opacity: 0.8;
        margin-top: 2px;
      }
      
      .help-widget-header-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .help-widget-open-center {
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 8px;
        color: #fff;
        font-size: 13px;
        cursor: pointer;
        text-decoration: none;
        transition: background 0.2s;
      }
      
      .help-widget-open-center:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .help-widget-close {
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 8px;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }
      
      .help-widget-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      /* ===== 弹窗内容样式 ===== */
      .help-widget-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
        line-height: 1.8;
        color: #1e293b;
        font-size: 15px;
      }
      
      /* Markdown 内容样式 */
      .help-widget-body h1 {
        font-size: 28px;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 20px 0;
        padding-bottom: 12px;
        border-bottom: 2px solid #e2e8f0;
      }
      
      .help-widget-body h2 {
        font-size: 22px;
        font-weight: 600;
        color: #1e293b;
        margin: 32px 0 16px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .help-widget-body h3 {
        font-size: 18px;
        font-weight: 600;
        color: #334155;
        margin: 24px 0 12px 0;
      }
      
      .help-widget-body h4 {
        font-size: 16px;
        font-weight: 600;
        color: #475569;
        margin: 20px 0 10px 0;
      }
      
      .help-widget-body p {
        margin: 0 0 16px 0;
      }
      
      .help-widget-body ul, .help-widget-body ol {
        margin: 0 0 16px 0;
        padding-left: 24px;
      }
      
      .help-widget-body li {
        margin: 8px 0;
      }
      
      .help-widget-body a {
        color: #6366f1;
        text-decoration: none;
      }
      
      .help-widget-body a:hover {
        text-decoration: underline;
      }
      
      .help-widget-body blockquote {
        margin: 16px 0;
        padding: 12px 16px;
        background: #f1f5f9;
        border-left: 4px solid #6366f1;
        border-radius: 0 8px 8px 0;
        color: #475569;
      }
      
      .help-widget-body blockquote p:last-child {
        margin-bottom: 0;
      }
      
      .help-widget-body code {
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
        font-size: 0.9em;
        color: #e11d48;
      }
      
      .help-widget-body pre {
        margin: 16px 0;
        background: #0f172a;
        color: #e2e8f0;
        padding: 16px;
        border-radius: 12px;
        overflow-x: auto;
        font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
        font-size: 14px;
        line-height: 1.6;
      }
      
      .help-widget-body pre code {
        background: transparent;
        padding: 0;
        color: inherit;
        font-size: inherit;
      }
      
      .help-widget-body table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        font-size: 14px;
      }
      
      .help-widget-body th, .help-widget-body td {
        padding: 12px 16px;
        border: 1px solid #e2e8f0;
        text-align: left;
      }
      
      .help-widget-body th {
        background: #f8fafc;
        font-weight: 600;
        color: #475569;
      }
      
      .help-widget-body tr:hover {
        background: #f8fafc;
      }
      
      .help-widget-body img {
        max-width: 100%;
        border-radius: 8px;
        margin: 16px 0;
      }
      
      .help-widget-body hr {
        border: none;
        border-top: 1px solid #e2e8f0;
        margin: 24px 0;
      }

      /* Mermaid 图表容器 */
      .help-widget-body .mermaid {
        background: #f8fafc;
        padding: 20px;
        border-radius: 12px;
        margin: 16px 0;
        text-align: center;
      }

      /* 加载状态 */
      .help-widget-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        color: #64748b;
      }
      
      .help-widget-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e2e8f0;
        border-top-color: #6366f1;
        border-radius: 50%;
        animation: help-widget-spin 1s linear infinite;
        margin-bottom: 16px;
      }
      
      @keyframes help-widget-spin {
        to { transform: rotate(360deg); }
      }

      /* 错误状态 */
      .help-widget-error {
        padding: 40px 20px;
        text-align: center;
        color: #dc2626;
      }
      
      .help-widget-error-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      
      .help-widget-error-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      
      .help-widget-error-message {
        color: #64748b;
        font-size: 14px;
      }

      /* 移动端适配 */
      @media (max-width: 640px) {
        .help-widget-btn {
          top: auto;
          bottom: 24px;
          right: 20px;
          width: 56px;
          height: 56px;
          font-size: 24px;
        }
        
        .help-widget-modal {
          max-height: 95vh;
          border-radius: 16px 16px 0 0;
        }
        
        .help-widget-body {
          padding: 16px;
        }
        
        .help-widget-header {
          padding: 14px 16px;
        }
        
        .help-widget-header-title {
          font-size: 16px;
        }
        
        .help-widget-open-center {
          display: none;
        }
      }
      
      /* 暗色模式支持 */
      @media (prefers-color-scheme: dark) {
        .help-widget-modal {
          background: #1e293b;
        }
        
        .help-widget-body {
          color: #e2e8f0;
        }
        
        .help-widget-body h1 {
          color: #f1f5f9;
          border-bottom-color: #334155;
        }
        
        .help-widget-body h2 {
          color: #e2e8f0;
          border-bottom-color: #334155;
        }
        
        .help-widget-body h3, .help-widget-body h4 {
          color: #cbd5e1;
        }
        
        .help-widget-body code {
          background: #334155;
          color: #f472b6;
        }
        
        .help-widget-body blockquote {
          background: #334155;
          color: #cbd5e1;
        }
        
        .help-widget-body th {
          background: #334155;
          color: #cbd5e1;
        }
        
        .help-widget-body th, .help-widget-body td {
          border-color: #475569;
        }
        
        .help-widget-body tr:hover {
          background: #334155;
        }
        
        .help-widget-body .mermaid {
          background: #334155;
        }
      }
    </style>

    <!-- 帮助按钮 -->
    <button class="help-widget-btn" aria-label="打开帮助文档" title="查看帮助文档">?</button>

    <!-- 弹窗遮罩 -->
    <div class="help-widget-overlay" role="dialog" aria-modal="true" aria-labelledby="help-widget-title">
      <div class="help-widget-modal">
        <!-- 头部 -->
        <div class="help-widget-header">
          <div class="help-widget-header-left">
            <div class="help-widget-header-icon">📖</div>
            <div>
              <div class="help-widget-header-title" id="help-widget-title">帮助文档</div>
              <div class="help-widget-header-subtitle">使用指南与技巧</div>
            </div>
          </div>
          <div class="help-widget-header-right">
            <a href="/help/index.html" target="_blank" class="help-widget-open-center">
              打开帮助中心 ↗
            </a>
            <button class="help-widget-close" aria-label="关闭">✕</button>
          </div>
        </div>
        
        <!-- 内容区域 -->
        <div class="help-widget-body" id="help-widget-content">
          <div class="help-widget-loading">
            <div class="help-widget-spinner"></div>
            <span>正在加载帮助文档...</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // 将组件添加到页面
  document.body.appendChild(root);

  // ===================== 获取 DOM 元素 =====================
  
  const button = root.querySelector('.help-widget-btn');
  const overlay = root.querySelector('.help-widget-overlay');
  const closeButton = root.querySelector('.help-widget-close');
  const content = root.querySelector('#help-widget-content');
  const titleElement = root.querySelector('#help-widget-title');

  // ===================== 核心功能 =====================

  /**
   * 渲染 Markdown 内容
   * @param {string} markdown - Markdown 文本
   */
  const renderMarkdown = (markdown) => {
    // 使用 marked 解析 Markdown，启用换行支持
    content.innerHTML = window.marked.parse(markdown, {
      breaks: true,        // 启用 GFM 换行符（行尾 \n 转换为 <br>）
      gfm: true,           // 启用 GitHub Flavored Markdown
      headerIds: true,     // 为标题添加 ID
      mangle: false        // 不转义标题中的链接
    });
    
    // 提取文档标题（第一个 h1）
    const h1 = content.querySelector('h1');
    if (h1) {
      titleElement.textContent = h1.textContent;
    }
    
    // 处理 Mermaid 代码块
    const mermaidBlocks = content.querySelectorAll('code.language-mermaid');
    mermaidBlocks.forEach((block, index) => {
      const pre = block.parentElement;
      const container = document.createElement('div');
      container.className = 'mermaid';
      container.id = `mermaid-${Date.now()}-${index}`;
      container.textContent = block.textContent;
      pre.replaceWith(container);
    });
    
    // 渲染 Mermaid 图表
    const mermaidContainers = content.querySelectorAll('.mermaid');
    if (mermaidContainers.length > 0) {
      window.mermaid.init(undefined, mermaidContainers);
    }
    
    // 应用代码高亮
    if (window.hljs) {
      content.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightElement(block);
      });
    }
  };

  /**
   * 加载并显示帮助文档
   */
  const loadDoc = async () => {
    // 显示加载状态
    content.innerHTML = `
      <div class="help-widget-loading">
        <div class="help-widget-spinner"></div>
        <span>正在加载帮助文档...</span>
      </div>
    `;
    
    try {
      // 确保依赖库已加载
      await ensureLibraries();
      
      // 获取帮助文档路径
      if (!helpDocPathCache) {
        helpDocPathCache = await getHelpDocPath();
      }
      
      // 智能处理路径
      let fetchUrl = helpDocPathCache;
      
      // 如果是 file:// 协议，尝试转换为正确的 URL
      if (window.location.protocol === 'file:') {
        // 相对路径：以 ../ 开头
        if (helpDocPathCache.startsWith('../')) {
          // 计算相对于当前 HTML 文件的路径
          const currentPath = window.location.pathname;
          const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
          const relativeParts = helpDocPathCache.split('../');
          let targetDir = currentDir;
          
          for (let i = 1; i < relativeParts.length; i++) {
            targetDir = targetDir.substring(0, targetDir.lastIndexOf('/'));
          }
          const fileName = relativeParts[relativeParts.length - 1];
          fetchUrl = 'file://' + targetDir + '/' + fileName;
        }
      }
      
      // 加载 Markdown 文件
      const response = await fetch(fetchUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const markdown = await response.text();
      renderMarkdown(markdown);
      
    } catch (error) {
      console.error('帮助文档加载失败:', error);
      
      // 提供更友好的错误提示
      let errorHint = '';
      if (window.location.protocol === 'file:') {
        errorHint = '<br><br><strong>💡 提示：您正在使用 file:// 协议打开页面。</strong>' +
                   '<br>由于浏览器安全限制，fetch 请求会被阻止。<br>' +
                   '请使用本地服务器（如 Live Server）打开页面。';
      }
      
      content.innerHTML = `
        <div class="help-widget-error">
          <div class="help-widget-error-icon">😞</div>
          <div class="help-widget-error-title">文档加载失败</div>
          <div class="help-widget-error-message">
            无法加载帮助文档，请检查网络连接或稍后重试。${errorHint}
            <small style="color: #94a3b8; margin-top: 8px; display: block;">
              路径: ${helpDocPathCache || '未知'}<br>
              错误: ${error.message}
            </small>
          </div>
        </div>
      `;
    }
  };

  /**
   * 打开帮助弹窗
   */
  const openModal = async () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    await loadDoc();
  };

  /**
   * 关闭帮助弹窗
   */
  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // 恢复背景滚动
  };

  // ===================== 事件绑定 =====================
  
  // 点击按钮打开弹窗
  button.addEventListener('click', openModal);
  
  // 点击关闭按钮
  closeButton.addEventListener('click', closeModal);
  
  // 点击遮罩层关闭
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });
  
  // ESC 键关闭
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  // ===================== 输出日志 =====================
  console.log('📖 帮助文档组件已加载 (v2)');
})();
