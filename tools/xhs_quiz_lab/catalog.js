(function () {
  const app = document.getElementById("catalog-app");
  if (!app || !window.quizCatalog || !Array.isArray(window.quizCatalog.quizzes)) {
    return;
  }

  const quizzes = window.quizCatalog.quizzes;
  const categories = ["全部"].concat([...new Set(quizzes.map((quiz) => quiz.category))]);
  let activeCategory = "全部";
  let keyword = "";

  render();

  function render() {
    const filtered = quizzes.filter((quiz) => {
      const hitCategory = activeCategory === "全部" || quiz.category === activeCategory;
      const hitKeyword =
        keyword.trim() === "" ||
        [quiz.title, quiz.subtitle, quiz.category, quiz.collection]
          .join(" ")
          .toLowerCase()
          .includes(keyword.trim().toLowerCase());
      return hitCategory && hitKeyword;
    });

    app.innerHTML = [
      '<section class="hero-card glass-panel">',
      '<div class="eyebrow">100 个纯前端测试页</div>',
      '<h1 class="headline">XHS Quiz Lab</h1>',
      '<p class="subhead">这里是新建的测试专区。全部都是结构化题库 + 硬编码逻辑，不走大模型回复，适合直接二开、补题、换皮和批量扩展。</p>',
      '<div class="meta-row">',
      `<div class="stat-chip"><span>总测试数</span><strong>${quizzes.length}</strong></div>`,
      `<div class="stat-chip"><span>题量标准</span><strong>每个 12 题</strong></div>`,
      `<div class="stat-chip"><span>结果机制</span><strong>4 类硬编码结果</strong></div>`,
      "</div>",
      "</section>",
      '<div class="catalog-layout">',
      '<section class="search-panel">',
      '<h3>筛选与搜索</h3>',
      '<p class="catalog-intro">你可以按赛道筛，也可以直接搜“城市”“恋爱”“消费”“周末”等关键词。</p>',
      `<input class="search-input" id="quiz-search" type="text" placeholder="搜索测试标题或分类" value="${escapeAttribute(keyword)}">`,
      '<div class="filter-row">',
      categories
        .map((category) => {
          const className = category === activeCategory ? "filter-pill is-active" : "filter-pill";
          return `<button class="${className}" type="button" data-category="${escapeAttribute(category)}">${escapeHtml(category)}</button>`;
        })
        .join(""),
      "</div>",
      "</section>",
      `<section class="floating-panel"><h3>当前结果</h3><p class="catalog-meta">共筛出 ${filtered.length} 个测试页。</p></section>`,
      `<section class="card-grid">${renderCards(filtered)}</section>`,
      "</div>",
    ].join("");

    const input = document.getElementById("quiz-search");
    if (input) {
      input.addEventListener("input", (event) => {
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
      return '<div class="empty-state">没有匹配到对应测试，换个关键词试试。</div>';
    }

    return items
      .map((quiz, index) => {
        return [
          '<article class="catalog-card">',
          '<div class="card-topline">',
          `<span class="catalog-badge">${index + 1}</span>`,
          `<span class="ghost-chip">${escapeHtml(quiz.category)}</span>`,
          "</div>",
          `<h3>${escapeHtml(quiz.title)}</h3>`,
          `<p class="catalog-meta">${escapeHtml(quiz.subtitle)}</p>`,
          `<div class="tag-row">`,
          `<div class="tag-chip">${escapeHtml(quiz.collection)}</div>`,
          `<div class="tag-chip">${escapeHtml(quiz.shareAngle)}</div>`,
          "</div>",
          `<a class="card-link" href="./pages/${escapeAttribute(quiz.slug)}.html">打开测试 <span>→</span></a>`,
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
