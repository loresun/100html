(function () {
  const app = document.getElementById("app");
  if (!app || !window.CONSULT_SLUG || !window.consultCatalog) {
    return;
  }

  const scenarios = window.consultCatalog.scenarios || [];
  const scenario = scenarios.find((item) => item.slug === window.CONSULT_SLUG);

  if (!scenario) {
    app.innerHTML = [
      '<section class="response-card">',
      '<div class="eyebrow">页面未找到</div>',
      "<h1 class=\"headline\">这个咨询页没有生成成功</h1>",
      '<p class="subhead">请返回索引页重新进入，或者检查当前页面的 slug 配置。</p>',
      '<div class="action-row"><a class="btn btn-primary" href="./index.html">返回索引</a></div>',
      "</section>",
    ].join("");
    return;
  }

  applyTheme(scenario.palette);

  const savedConfig = loadConfig();
  const state = {
    config: {
      apiKey: savedConfig.apiKey || "",
      model: normalizeModel(savedConfig.model),
      tone: savedConfig.tone || "gentle",
    },
    form: buildInitialForm(scenario),
    loading: false,
    error: "",
    intakeSummary: "",
    thread: [],
    followupText: "",
  };

  render();

  function render() {
    app.innerHTML = [
      renderTopbar(),
      renderHero(),
      '<div class="layout">',
      renderFormColumn(),
      renderResponseColumn(),
      "</div>",
    ].join("");

    bindCommonEvents();
  }

  function renderTopbar() {
    return [
      '<div class="topbar">',
      '<div class="topbar-main">',
      '<a class="chip" href="./index.html">DeepSeek Consult Lab</a>',
      `<div class="ghost-chip">${escapeHtml(scenario.category)} · 单页咨询入口</div>`,
      "</div>",
      '<div class="topbar-actions">',
      '<div class="field-block topbar-key">',
      '<label for="api-key-input">DeepSeek Key</label>',
      `<input id="api-key-input" class="input" type="password" value="${escapeAttribute(state.config.apiKey)}" placeholder="输入 DeepSeek API Key">`,
      "</div>",
      '<div class="field-block topbar-models-wrap">',
      "<label>模型</label>",
      '<div class="topbar-models">',
      renderModelButton("deepseek-v4-flash", "V4 Flash"),
      renderModelButton("deepseek-v4-pro", "V4 Pro"),
      "</div>",
      "</div>",
      `<div class="topbar-status">${state.config.apiKey.trim() ? "已连接本地保存的 DeepSeek Key" : "未填写 Key，生成前请先输入"}</div>`,
      "</div>",
      "</div>",
    ].join("");
  }

  function renderHero() {
    return [
      '<section class="hero-card">',
      `<div class="eyebrow">${escapeHtml(scenario.collection)} · DeepSeek 动态回复</div>`,
      `<h1 class="headline">${escapeHtml(scenario.title)}</h1>`,
      `<p class="subhead">${escapeHtml(scenario.subtitle)}</p>`,
      '<div class="meta-grid">',
      `<div class="surface-card"><span class="muted">输入方式</span><strong>选项 + 文本补充</strong></div>`,
      `<div class="surface-card"><span class="muted">回复风格</span><strong>${escapeHtml(getToneLabel(state.config.tone))}</strong></div>`,
      `<div class="surface-card"><span class="muted">咨询视角</span><strong>${escapeHtml(scenario.consultFocus)}</strong></div>`,
      "</div>",
      "</section>",
    ].join("");
  }

  function renderFormColumn() {
    return [
      '<section class="stack">',
      renderToneCard(),
      renderIntakeForm(),
      "</section>",
    ].join("");
  }

  function renderToneCard() {
    return [
      '<section class="settings-card">',
      '<h2 class="section-title">回复设置</h2>',
      '<p class="section-copy">右上角输入 DeepSeek Key 并切换模型。这里保留回复风格控制，让你快速切换咨询语气。</p>',
      '<div class="field-block">',
      "<label>回复风格</label>",
      '<div class="mode-row">',
      renderToneButton("gentle", "温柔梳理"),
      renderToneButton("practical", "务实拆解"),
      renderToneButton("direct", "直接提醒"),
      "</div>",
      "</div>",
      '<div class="note-box helper">这是咨询式内容生成页，不会替你拍板做决定。它更适合帮你拆局面、看矛盾、定下一步。</div>',
      "</section>",
    ].join("");
  }

  function renderIntakeForm() {
    return [
      '<section class="form-card">',
      '<h2 class="section-title">先把情况说清楚</h2>',
      `<p class="section-copy">${escapeHtml(scenario.formIntro)}</p>`,
      '<div class="field-grid">',
      scenario.fields
        .map((field) => {
          if (field.type === "select") {
            return [
              '<div class="field-block">',
              `<label for="field-${escapeAttribute(field.id)}">${escapeHtml(field.label)}</label>`,
              `<select id="field-${escapeAttribute(field.id)}" class="select" data-field-id="${escapeAttribute(field.id)}">`,
              field.options
                .map((option) => {
                  const selected = state.form[field.id] === option.value ? "selected" : "";
                  return `<option value="${escapeAttribute(option.value)}" ${selected}>${escapeHtml(option.label)}</option>`;
                })
                .join(""),
              "</select>",
              field.hint ? `<small>${escapeHtml(field.hint)}</small>` : "",
              "</div>",
            ].join("");
          }

          return [
            '<div class="field-block">',
            `<label for="field-${escapeAttribute(field.id)}">${escapeHtml(field.label)}</label>`,
            `<textarea id="field-${escapeAttribute(field.id)}" class="textarea" data-field-id="${escapeAttribute(field.id)}" placeholder="${escapeAttribute(field.placeholder || "")}">${escapeHtml(state.form[field.id] || "")}</textarea>`,
            field.hint ? `<small>${escapeHtml(field.hint)}</small>` : "",
            "</div>",
          ].join("");
        })
        .join(""),
      "</div>",
      '<div class="suggestion-list" style="margin-top:18px;">',
      scenario.quickPrompts.map((item) => `<button type="button" class="mini-pill" data-quick-fill="${escapeAttribute(item)}">${escapeHtml(item)}</button>`).join(""),
      "</div>",
      '<div class="action-row" style="margin-top:18px;">',
      `<button class="btn btn-primary" id="generate-intake" type="button" ${state.loading ? "disabled" : ""}>${state.loading ? "DeepSeek 正在分析..." : "生成咨询回复"}</button>`,
      '<button class="btn btn-secondary" id="reset-form" type="button">清空这页输入</button>',
      "</div>",
      "</section>",
    ].join("");
  }

  function renderResponseColumn() {
    const hasThread = state.thread.length > 0;

    return [
      '<section class="stack">',
      '<section class="response-card">',
      '<h2 class="section-title">咨询回复</h2>',
      `<p class="section-copy">${escapeHtml(formatProviderText(scenario.responseIntro))}</p>`,
      state.error ? `<div class="note-box" style="color:#b42318;">${escapeHtml(state.error)}</div>` : "",
      !hasThread && !state.loading
        ? `<div class="note-box">还没有生成回复。先在左侧补全你的情况，再点击“生成咨询回复”。</div>`
        : "",
      state.loading && !hasThread ? '<div class="note-box">DeepSeek 正在根据你的选择和文本补充组织回复，请稍等。</div>' : "",
      hasThread ? renderThread() : "",
      hasThread ? renderFollowupBox() : "",
      "</section>",
      hasThread ? renderActionsPanel() : "",
      "</section>",
    ].join("");
  }

  function renderThread() {
    return [
      '<div class="thread-list">',
      state.thread
        .map((item) => {
          const isModel = item.role === "model";
          return [
            `<article class="thread-item ${isModel ? "is-model" : ""}">`,
            `<div class="thread-tag">${isModel ? "咨询回复" : "你的补充"}</div>`,
            `<div class="thread-bubble ${isModel ? "markdown-body" : ""}">${isModel ? renderMarkdown(item.text) : `<p>${escapeHtml(item.text)}</p>`}</div>`,
            "</article>",
          ].join("");
        })
        .join(""),
      "</div>",
    ].join("");
  }

  function renderFollowupBox() {
    return [
      '<section class="surface-card">',
      '<h3 class="section-title" style="font-size:1.15rem;">继续追问</h3>',
      '<p class="helper">你可以继续补充新信息，或者追问“那我第一句该怎么说”“如果我不想继续，该怎么收尾”这类更细的动作问题。</p>',
      `<textarea id="followup-input" class="textarea" placeholder="${escapeAttribute(scenario.followupPlaceholder)}">${escapeHtml(state.followupText)}</textarea>`,
      '<div class="followup-actions" style="margin-top:14px;">',
      `<button class="btn btn-primary" id="send-followup" type="button" ${state.loading ? "disabled" : ""}>${state.loading ? "继续追问中..." : "继续追问"}</button>`,
      '<button class="btn btn-ghost" id="insert-followup-hint" type="button">插入一个追问模板</button>',
      "</div>",
      "</section>",
    ].join("");
  }

  function renderActionsPanel() {
    const latestModel = [...state.thread].reverse().find((item) => item.role === "model");
    return [
      '<section class="surface-card">',
      '<h3 class="section-title" style="font-size:1.15rem;">操作</h3>',
      '<div class="action-row">',
      '<button class="btn btn-secondary" id="copy-latest" type="button">复制最新回复</button>',
      '<button class="btn btn-secondary" id="download-thread" type="button">导出本页对话</button>',
      '<button class="btn btn-ghost" id="restart-thread" type="button">重新开始本页咨询</button>',
      "</div>",
      latestModel ? `<div class="note-box helper" style="margin-top:14px;">最后一句可截图文案：${escapeHtml(extractLastLine(latestModel.text))}</div>` : "",
      "</section>",
    ].join("");
  }

  function bindCommonEvents() {
    const apiKeyInput = document.getElementById("api-key-input");

    if (apiKeyInput) {
      apiKeyInput.addEventListener("input", (event) => {
        state.config.apiKey = event.target.value;
        persistConfig();
        syncTopbarStatus();
      });
    }

    app.querySelectorAll("[data-model]").forEach((button) => {
      button.addEventListener("click", () => {
        state.config.model = button.getAttribute("data-model") || getClient().DEFAULT_MODEL;
        persistConfig();
        render();
      });
    });

    app.querySelectorAll("[data-tone]").forEach((button) => {
      button.addEventListener("click", () => {
        state.config.tone = button.getAttribute("data-tone");
        persistConfig();
        render();
      });
    });

    app.querySelectorAll("[data-field-id]").forEach((element) => {
      element.addEventListener("input", (event) => {
        state.form[event.target.getAttribute("data-field-id")] = event.target.value;
      });
      element.addEventListener("change", (event) => {
        state.form[event.target.getAttribute("data-field-id")] = event.target.value;
      });
    });

    app.querySelectorAll("[data-quick-fill]").forEach((button) => {
      button.addEventListener("click", () => {
        const textareaField = scenario.fields.find((field) => field.type === "textarea");
        if (!textareaField) return;
        const current = state.form[textareaField.id] || "";
        state.form[textareaField.id] = current ? `${current}\n${button.getAttribute("data-quick-fill")}` : button.getAttribute("data-quick-fill");
        render();
      });
    });

    const generateButton = document.getElementById("generate-intake");
    if (generateButton) {
      generateButton.addEventListener("click", handleGenerate);
    }

    const resetButton = document.getElementById("reset-form");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        state.form = buildInitialForm(scenario);
        state.error = "";
        render();
      });
    }

    const followupInput = document.getElementById("followup-input");
    if (followupInput) {
      followupInput.addEventListener("input", (event) => {
        state.followupText = event.target.value;
      });
    }

    const sendFollowup = document.getElementById("send-followup");
    if (sendFollowup) {
      sendFollowup.addEventListener("click", handleFollowup);
    }

    const insertHint = document.getElementById("insert-followup-hint");
    if (insertHint) {
      insertHint.addEventListener("click", () => {
        state.followupText = scenario.followupSuggestions[0] || "";
        render();
      });
    }

    const copyLatest = document.getElementById("copy-latest");
    if (copyLatest) {
      copyLatest.addEventListener("click", async () => {
        const latestModel = [...state.thread].reverse().find((item) => item.role === "model");
        if (!latestModel) return;
        try {
          await navigator.clipboard.writeText(latestModel.text);
          copyLatest.textContent = "已复制";
        } catch (error) {
          state.error = "复制失败，请手动复制。";
          render();
        }
      });
    }

    const downloadThread = document.getElementById("download-thread");
    if (downloadThread) {
      downloadThread.addEventListener("click", () => {
        const content = state.thread
          .map((item) => `${item.role === "model" ? "咨询回复" : "用户补充"}\n${item.text}`)
          .join("\n\n---\n\n");
        const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${scenario.slug}-consult.md`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    const restartThread = document.getElementById("restart-thread");
    if (restartThread) {
      restartThread.addEventListener("click", () => {
        state.thread = [];
        state.followupText = "";
        state.intakeSummary = "";
        state.error = "";
        render();
      });
    }
  }

  async function handleGenerate() {
    const primaryTextarea = scenario.fields.find((field) => field.type === "textarea");
    if (primaryTextarea && !(state.form[primaryTextarea.id] || "").trim()) {
      state.error = `请先填写「${primaryTextarea.label}」`;
      render();
      return;
    }

    state.loading = true;
    state.error = "";
    render();

    try {
      const intakeSummary = buildIntakeSummary();
      state.intakeSummary = intakeSummary;
      const result = await getClient().generateConsultReply({
        apiKey: state.config.apiKey.trim(),
        model: state.config.model.trim() || getClient().DEFAULT_MODEL,
        scenario,
        tone: state.config.tone,
        intakeSummary,
      });

      state.thread = [{ role: "model", text: result.text }];
      state.followupText = "";
    } catch (error) {
      state.error = error.message || "生成失败，请稍后重试。";
    } finally {
      state.loading = false;
      render();
    }
  }

  async function handleFollowup() {
    if (!state.followupText.trim()) {
      state.error = "先写下你想继续追问的问题。";
      render();
      return;
    }

    state.loading = true;
    state.error = "";
    render();

    try {
      const history = state.thread.map((item) => ({
        role: item.role,
        text: item.text,
      }));
      const userQuestion = state.followupText.trim();

      const result = await getClient().generateConsultReply({
        apiKey: state.config.apiKey.trim(),
        model: state.config.model.trim() || getClient().DEFAULT_MODEL,
        scenario,
        tone: state.config.tone,
        intakeSummary: state.intakeSummary || buildIntakeSummary(),
        followup: userQuestion,
        history,
      });

      state.thread.push({ role: "user", text: userQuestion });
      state.thread.push({ role: "model", text: result.text });
      state.followupText = "";
    } catch (error) {
      state.error = error.message || "继续追问失败，请稍后重试。";
    } finally {
      state.loading = false;
      render();
    }
  }

  function buildIntakeSummary() {
    const blocks = [
      `页面主题：${scenario.title}`,
      `当前页面关注点：${scenario.consultFocus}`,
      `希望的回复风格：${getToneLabel(state.config.tone)}`,
      "结构化输入：",
    ];

    scenario.fields.forEach((field) => {
      const rawValue = state.form[field.id] || "";
      if (field.type === "select") {
        const option = field.options.find((item) => item.value === rawValue);
        blocks.push(`- ${field.label}：${option ? option.label : "未填写"}`);
      } else {
        blocks.push(`- ${field.label}：${rawValue.trim() || "未填写"}`);
      }
    });

    blocks.push("请你据此进行咨询式拆解，不要泛泛而谈。");
    return blocks.join("\n");
  }

  function buildInitialForm(currentScenario) {
    const result = {};
    currentScenario.fields.forEach((field) => {
      if (field.type === "select") {
        result[field.id] = field.options[0]?.value || "";
      } else {
        result[field.id] = "";
      }
    });
    return result;
  }

  function renderToneButton(tone, label) {
    const className = state.config.tone === tone ? "mode-pill is-active" : "mode-pill";
    return `<button type="button" class="${className}" data-tone="${tone}">${label}</button>`;
  }

  function renderModelButton(model, label) {
    const className = state.config.model === model ? "mode-pill is-active" : "mode-pill";
    return `<button type="button" class="${className}" data-model="${model}">${label}</button>`;
  }

  function loadConfig() {
    let localConfig = {};
    let globalConfig = {};

    try {
      localConfig = JSON.parse(localStorage.getItem("xhs_gemini_consult_config") || "{}");
    } catch (error) {}

    try {
      globalConfig = JSON.parse(localStorage.getItem("global_llm_config") || "{}");
    } catch (error) {}

    return {
      apiKey:
        globalConfig.deepseek ||
        globalConfig.deepseek_key ||
        globalConfig.apiKey ||
        localConfig.apiKey ||
        "",
      model: normalizeModel(globalConfig.model || localConfig.model || ""),
      tone: localConfig.tone || "gentle",
    };
  }

  function persistConfig() {
    localStorage.setItem("xhs_gemini_consult_config", JSON.stringify(state.config));

    let globalConfig = {};
    try {
      globalConfig = JSON.parse(localStorage.getItem("global_llm_config") || "{}");
    } catch (error) {}

    localStorage.setItem(
      "global_llm_config",
      JSON.stringify({
        ...globalConfig,
        apiKey: state.config.apiKey,
        deepseek: state.config.apiKey,
        deepseek_key: state.config.apiKey,
        model: state.config.model,
      }),
    );
  }

  function syncTopbarStatus() {
    const status = app.querySelector(".topbar-status");
    if (!status) return;
    status.textContent = state.config.apiKey.trim()
      ? "已连接本地保存的 DeepSeek Key"
      : "未填写 Key，生成前请先输入";
  }

  function getClient() {
    return window.DeepSeekConsultClient || window.GeminiConsultClient;
  }

  function formatProviderText(text) {
    return String(text || "").replace(/Gemini/g, "DeepSeek");
  }

  function normalizeModel(model) {
    return ["deepseek-v4-flash", "deepseek-v4-pro"].includes(model) ? model : getClient().DEFAULT_MODEL;
  }

  function getToneLabel(tone) {
    return (
      {
        gentle: "温柔梳理",
        practical: "务实拆解",
        direct: "直接提醒",
      }[tone] || "温柔梳理"
    );
  }

  function extractLastLine(text) {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    return lines[lines.length - 1] || "";
  }

  function renderMarkdown(markdown) {
    if (!window.marked) {
      return `<pre>${escapeHtml(markdown)}</pre>`;
    }
    return window.marked.parse(markdown);
  }

  function applyTheme(palette) {
    if (!palette) return;
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

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/"/g, "&quot;");
  }
})();
