(function () {
  const app = document.getElementById("catalog-app");
  if (!app || !window.consultCatalog) {
    return;
  }

  const scenarios = window.consultCatalog.scenarios || [];
  const categories = ["全部"].concat([...new Set(scenarios.map((item) => item.category))]);
  let keyword = "";
  let activeCategory = "全部";

  render();

  function render() {
    const filtered = scenarios.filter((scenario) => {
      const hitCategory = activeCategory === "全部" || scenario.category === activeCategory;
      const haystack = [scenario.title, scenario.subtitle, scenario.category, scenario.collection].join(" ").toLowerCase();
      const hitKeyword = !keyword.trim() || haystack.includes(keyword.trim().toLowerCase());
      return hitCategory && hitKeyword;
    });

    app.innerHTML = [
      '<section class="hero-card">',
      '<div class="eyebrow">30 个 DeepSeek 场景咨询页</div>',
      '<h1 class="headline">XHS DeepSeek Consult Lab</h1>',
      '<p class="subhead">这一组页面不是固定结论，而是结构化 intake + DeepSeek 动态咨询回复。现在每个页面都改成更顺手的阅读流：先在上面填写信息，回复结果直接显示在下方。</p>',
      '<div class="meta-grid">',
      `<div class="surface-card"><span class="muted">总页面数</span><strong>${scenarios.length}</strong></div>`,
      '<div class="surface-card"><span class="muted">模型默认值</span><strong>deepseek-v4-flash</strong></div>',
      '<div class="surface-card"><span class="muted">交互方式</span><strong>结构化输入 + 文本补充 + 继续追问</strong></div>',
      '<div class="surface-card"><span class="muted">页面内设置</span><strong>右上角填 Key + 切模型</strong></div>',
      "</div>",
      "</section>",
      '<div class="stack">',
      '<section class="filter-card">',
      '<h2 class="section-title">筛选入口</h2>',
      '<p class="section-copy">可以按赛道筛，也可以直接搜“关系”“城市”“焦虑”“副业”这类词。进入任意页面后，右上角直接输入 DeepSeek Key 即可开始。</p>',
      `<input id="search-input" class="input" type="text" placeholder="搜索咨询主题" value="${escapeAttribute(keyword)}">`,
      '<div class="mode-row" style="margin-top:14px;">',
      categories
        .map((category) => {
          const className = category === activeCategory ? "mode-pill is-active" : "mode-pill";
          return `<button type="button" class="${className}" data-category="${escapeAttribute(category)}">${escapeHtml(category)}</button>`;
        })
        .join(""),
      "</div>",
      '<div class="note-box helper" style="margin-top:14px;">现在的页面结构是「上方输入、下方回复」，更适合连续浏览和截图。</div>',
      `<div class="note-box helper" style="margin-top:14px;">当前筛出 ${filtered.length} 个页面。</div>`,
      "</section>",
      `<section class="catalog-grid">${renderCards(filtered)}</section>`,
      "</div>",
    ].join("");

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        keyword = event.target.value || "";
        render();
      });
    }

    app.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.getAttribute("data-category") || "全部";
        render();
      });
    });
  }

  function renderCards(items) {
    if (!items.length) {
      return '<div class="empty-state">没有匹配到页面，换个关键词试试。</div>';
    }

    return items
      .map((scenario, index) => {
        return [
          '<article class="catalog-card">',
          `<span class="catalog-badge">${index + 1}</span>`,
          `<div class="ghost-chip">${escapeHtml(scenario.category)}</div>`,
          `<h3 class="section-title" style="font-size:1.25rem;">${escapeHtml(scenario.title)}</h3>`,
          `<p>${escapeHtml(scenario.subtitle)}</p>`,
          '<div class="suggestion-list">',
          `<div class="mini-pill">${escapeHtml(scenario.collection)}</div>`,
          `<div class="mini-pill">${escapeHtml(scenario.consultFocus)}</div>`,
          "</div>",
          `<a class="link-row" href="./pages/${escapeAttribute(scenario.slug)}.html">打开咨询页 <span>→</span></a>`,
          "</article>",
        ].join("");
      })
      .join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/"/g, "&quot;");
  }
})();
