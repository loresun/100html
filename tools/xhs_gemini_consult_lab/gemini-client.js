(function () {
  const DEFAULT_MODEL = "deepseek-v4-flash";
  const DEFAULT_ENDPOINT = "https://api.deepseek.com/chat/completions";

  async function generateConsultReply(options) {
    const {
      apiKey,
      model = DEFAULT_MODEL,
      scenario,
      tone,
      intakeSummary,
      followup,
      history = [],
    } = options;

    if (!apiKey) {
      throw new Error("请先填写右上角的 DeepSeek API Key");
    }

    const endpoint = DEFAULT_ENDPOINT;
    const systemInstruction = buildSystemInstruction(scenario, tone);
    const messages = buildMessages({ systemInstruction, intakeSummary, followup, history });

    const payload = {
      model,
      messages,
      temperature: 0.9,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `DeepSeek API 请求失败：HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      text: extractText(data),
      raw: data,
    };
  }

  function buildSystemInstruction(scenario, tone) {
    const toneMap = {
      gentle: "语气温柔、稳定、像一个很会梳理问题的咨询顾问，不油腻，不鸡汤。",
      practical: "语气务实、清楚、像一个经验足够的策略顾问，重点放在判断和下一步动作。",
      direct: "语气直接但不刻薄，像一个很清醒的朋友兼顾问，敢指出回避点。",
    };

    return [
      "你是一个中文场景化咨询顾问，擅长把用户当前的困惑拆成清晰的结构，再给出可执行建议。",
      "你的目标不是替用户做决定，而是帮助用户更快看清局面、主要矛盾、风险点和下一步。",
      "不要使用心理诊断、医学诊断、法律定论，也不要夸张安慰。",
      "必须紧扣用户在结构化选项和文本中的具体信息，不要写通用套话。",
      "如果用户信息明显不足，要明确指出缺口在哪里，并给出最关键的补充问题。",
      `当前页面主题：${scenario.title}。`,
      `当前页面关注点：${scenario.consultFocus}。`,
      `建议语气：${toneMap[tone] || toneMap.gentle}`,
      "输出必须使用中文 Markdown，并严格使用以下结构：",
      "## 你现在的局面",
      "## 我看到的关键矛盾",
      "## 先别急着做的事",
      "## 更适合你的下一步",
      "## 你接下来可以继续追问什么",
      "最后补一行 18-28 字、适合小红书截图传播的总结句。",
    ].join("\n");
  }

  function buildMessages({ systemInstruction, intakeSummary, followup, history }) {
    const turns = [
      {
        role: "system",
        content: systemInstruction,
      },
    ];

    if (!followup) {
      turns.push({
        role: "user",
        content: ["这是用户当前页面的一次初始咨询输入。", intakeSummary, "请基于这些信息直接给出咨询式回复。"].join("\n\n"),
      });
      return turns;
    }

    turns.push({
      role: "user",
      content: `初始咨询背景：\n${intakeSummary}`,
    });

    history.slice(-8).forEach((item) => {
      turns.push({
        role: item.role === "model" ? "assistant" : "user",
        content: item.text,
      });
    });

    turns.push({
      role: "user",
      content: `用户的继续追问：\n${followup}`,
    });

    return turns;
  }

  function extractText(data) {
    const text = data?.choices?.[0]?.message?.content || "";

    if (!text) {
      throw new Error("DeepSeek 没有返回可解析的文本内容");
    }

    return text;
  }

  const client = {
    generateConsultReply,
    DEFAULT_MODEL,
  };

  window.DeepSeekConsultClient = client;
  window.GeminiConsultClient = client;
})();
