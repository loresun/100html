(function () {
  const app = document.getElementById("app");
  if (!app || !window.QUIZ_SLUG) {
    return;
  }

  const quizzes = (window.quizCatalog && window.quizCatalog.quizzes) || [];
  const quiz = quizzes.find((item) => item.slug === window.QUIZ_SLUG);

  if (!quiz) {
    app.innerHTML = [
      '<div class="result-card">',
      '<div class="result-main">',
      '<div class="result-badge">页面未找到</div>',
      "<h2>这个测试页还没生成成功</h2>",
      '<p class="helper-text">请返回总索引重新进入，或者检查当前页面引用的 slug 是否正确。</p>',
      '<div class="action-row"><a class="btn btn-primary" href="./index.html">返回索引</a></div>',
      "</div>",
      "</div>",
    ].join("");
    return;
  }

  applyTheme(quiz.palette);

  const state = {
    index: 0,
    answers: [],
    scores: Object.fromEntries(quiz.results.map((result) => [result.key, 0])),
  };

  render();

  function render() {
    if (state.index >= quiz.questions.length) {
      renderResult();
      return;
    }

    const question = quiz.questions[state.index];
    const progress = Math.round((state.index / quiz.questions.length) * 100);

    app.innerHTML = [
      renderTopbar(quiz),
      '<section class="hero-card glass-panel">',
      `<div class="eyebrow">${escapeHtml(quiz.category)} · 硬核静态逻辑</div>`,
      `<h1 class="headline">${escapeHtml(quiz.title)}</h1>`,
      `<p class="subhead">${escapeHtml(quiz.subtitle)}</p>`,
      '<div class="meta-row">',
      `<div class="stat-chip"><span>题量</span><strong>${quiz.questions.length} 题</strong></div>`,
      `<div class="stat-chip"><span>结果类型</span><strong>${quiz.results.length} 种</strong></div>`,
      `<div class="stat-chip"><span>传播标签</span><strong>${escapeHtml(quiz.shareAngle)}</strong></div>`,
      "</div>",
      "</section>",
      '<div class="section-stack">',
      '<section class="progress-block">',
      '<div class="progress-head">',
      `<div class="question-count">Question ${state.index + 1} / ${quiz.questions.length}</div>`,
      `<div>${progress}% 已完成</div>`,
      "</div>",
      `<div class="progress-bar"><span style="width:${progress}%"></span></div>`,
      "</section>",
      '<section class="quiz-card">',
      `<div class="eyebrow">第 ${state.index + 1} 题</div>`,
      `<h2>${escapeHtml(question.prompt)}</h2>`,
      '<div class="option-list">',
      question.options
        .map((option, optionIndex) => {
          return [
            `<button class="option-card" data-option-index="${optionIndex}" type="button">`,
            `<span class="option-index">${String.fromCharCode(65 + optionIndex)}</span>`,
            `<span>${escapeHtml(option.text)}</span>`,
            "</button>",
          ].join("");
        })
        .join(""),
      "</div>",
      `<p class="helper-text">结果是根据你每一道选择累计分值计算出来的，不依赖任何 AI 回复。</p>`,
      "</section>",
      "</div>",
    ].join("");

    app.querySelectorAll("[data-option-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const optionIndex = Number(button.getAttribute("data-option-index"));
        const option = question.options[optionIndex];
        state.answers.push({
          prompt: question.prompt,
          text: option.text,
          resultKey: option.resultKey,
        });
        state.scores[option.resultKey] += option.weight || 1;
        state.index += 1;
        render();
      });
    });
  }

  function renderResult() {
    const ordered = quiz.results
      .map((result) => ({
        ...result,
        score: state.scores[result.key] || 0,
      }))
      .sort((left, right) => right.score - left.score);

    const winner = ordered[0];
    const total = ordered.reduce((sum, item) => sum + item.score, 0) || 1;
    const shareText = [
      `我测出来是「${winner.title}」`,
      winner.share,
      `测试：${quiz.title}`,
    ].join(" | ");

    app.innerHTML = [
      renderTopbar(quiz),
      '<section class="hero-card glass-panel">',
      `<div class="eyebrow">${escapeHtml(quiz.category)} · 结果页</div>`,
      `<h1 class="headline">${escapeHtml(quiz.title)}</h1>`,
      `<p class="subhead">${escapeHtml(quiz.resultIntro)}</p>`,
      "</section>",
      '<div class="section-stack result-shell">',
      '<section class="result-card result-main">',
      `<div class="result-badge">${escapeHtml(winner.badge)}</div>`,
      `<h2 class="headline" style="font-size:clamp(1.9rem,4vw,3.2rem); margin-top:16px;">${escapeHtml(winner.title)}</h2>`,
      `<p>${escapeHtml(winner.summary)}</p>`,
      '<div class="result-score-bars">',
      ordered
        .map((item) => {
          const percentage = Math.round((item.score / total) * 100);
          return [
            '<div class="score-item">',
            `<div class="score-head"><strong>${escapeHtml(item.title)}</strong><span>${percentage}%</span></div>`,
            `<div class="score-track"><span style="width:${percentage}%"></span></div>`,
            "</div>",
          ].join("");
        })
        .join(""),
      "</div>",
      '<div class="tag-row">',
      winner.tags.map((tag) => `<div class="tag-chip">${escapeHtml(tag)}</div>`).join(""),
      "</div>",
      '<div class="action-row">',
      '<button class="btn btn-primary" id="copy-share" type="button">复制晒图文案</button>',
      '<button class="btn btn-secondary" id="restart-quiz" type="button">再测一次</button>',
      '<a class="btn btn-secondary" href="./index.html">返回测试索引</a>',
      "</div>",
      "</section>",
      '<section class="result-grid">',
      `<article class="info-card"><h3>你最舒服的状态</h3><p>${escapeHtml(winner.match)}</p></article>`,
      `<article class="info-card"><h3>容易翻车的点</h3><p>${escapeHtml(winner.warning)}</p></article>`,
      `<article class="info-card"><h3>适合你的行动建议</h3><p>${escapeHtml(winner.advice)}</p></article>`,
      "</section>",
      `<section class="floating-panel"><h3>适合发小红书的那句</h3><p>${escapeHtml(winner.mantra)}</p></section>`,
      "</div>",
    ].join("");

    const restartButton = document.getElementById("restart-quiz");
    const copyButton = document.getElementById("copy-share");

    if (restartButton) {
      restartButton.addEventListener("click", () => {
        state.index = 0;
        state.answers = [];
        state.scores = Object.fromEntries(quiz.results.map((result) => [result.key, 0]));
        render();
      });
    }

    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(shareText);
          copyButton.textContent = "已复制";
        } catch (error) {
          copyButton.textContent = "复制失败，请手动复制";
        }
      });
    }
  }

  function renderTopbar(currentQuiz) {
    return [
      '<div class="topbar">',
      '<a class="brand-chip" href="./index.html">XHS Quiz Lab</a>',
      `<div class="ghost-chip">${escapeHtml(currentQuiz.category)} · ${escapeHtml(currentQuiz.collection)}</div>`,
      "</div>",
    ].join("");
  }

  function applyTheme(palette) {
    if (!palette) {
      return;
    }
    const root = document.documentElement;
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--accent-soft", palette.accentSoft);
    root.style.setProperty("--accent-strong", palette.accentStrong);
    root.style.setProperty("--glow", palette.glow);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
