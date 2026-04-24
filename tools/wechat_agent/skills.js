/**
 * 微信公众号 Agent Skills 注册表
 * 
 * 每个 Skill 是一个独立的「能力单元」，具备：
 *   - 明确的输入/输出 schema
 *   - 专属的 system prompt（角色设定）
 *   - 动态 user prompt 构建函数
 *   - 可选的后处理逻辑
 * 
 * Skills 按内容创作流程分为 5 大阶段：
 *   1. 选题阶段 (Research)   → 洞察受众、挖掘选题、借势热点
 *   2. 写作阶段 (Writing)    → 搭建大纲、撰写正文、设计开头结尾
 *   3. 优化阶段 (Optimize)   → 标题打磨、摘要提炼、SEO 优化、情感调节
 *   4. 排版阶段 (Format)     → 排版建议、emoji 点缀、分节设计
 *   5. 分发阶段 (Distribute) → 分享文案、互动引导、系列规划
 */

const SkillRegistry = {};

// ======================== 1. 选题阶段 ========================

SkillRegistry.audience_insight = {
    id: 'audience_insight',
    name: '受众洞察',
    description: '深度分析目标读者画像，输出痛点、需求和内容偏好',
    icon: '🎯',
    phase: 'research',
    phaseLabel: '选题',

    inputFields: [
        { key: 'field', label: '内容领域', placeholder: '例：职场成长、育儿、理财' },
        { key: 'audience', label: '目标人群', placeholder: '例：25-35岁职场女性' },
    ],
    outputFields: ['persona', 'painPoints', 'needs', 'contentPreference'],

    systemPrompt: '你是一位资深的用户研究专家，擅长分析微信公众号读者画像。你的分析精准、有洞察力，能指导后续内容创作。',
    
    buildPrompt(input) {
        return `请对以下公众号的目标受众进行深度画像分析：

**内容领域**：${input.field || '通用'}
**目标人群**：${input.audience || '未指定'}
${input._reviewFeedback ? `\n**改进要求**：${input._reviewFeedback}` : ''}

请输出以下维度的分析（用 Markdown 格式）：
1. **用户画像**：年龄、职业、生活状态、消费习惯
2. **核心痛点 TOP5**：他们最焦虑/困扰的问题
3. **内容需求 TOP5**：他们最想看到什么类型的内容
4. **阅读偏好**：喜欢什么风格、什么时间段阅读、对标题的敏感词
5. **内容切入建议**：基于以上分析，给出 3 个高潜力的内容方向`;
    },
    temperature: 0.8,
};

SkillRegistry.topic_brainstorm = {
    id: 'topic_brainstorm',
    name: '选题风暴',
    description: '批量生成公众号选题方向，每个选题附带角度和爆点分析',
    icon: '💡',
    phase: 'research',
    phaseLabel: '选题',

    inputFields: [
        { key: 'field', label: '内容领域', placeholder: '例：个人成长' },
        { key: 'audience', label: '目标受众', placeholder: '例：大学生、职场新人' },
        { key: 'count', label: '生成数量', placeholder: '10', type: 'number' },
    ],
    outputFields: ['topics'],

    systemPrompt: '你是一位顶级公众号内容策划师，曾操盘多个百万级大号的选题。你擅长从普通话题中找到独特切入角度，让内容既有深度又有传播力。',

    buildPrompt(input) {
        const count = input.count || 10;
        return `请为以下公众号生成 ${count} 个高质量选题：

**领域**：${input.field || '通用'}
**目标受众**：${input.audience || '泛人群'}
${input.insight ? `**受众洞察参考**：\n${input.insight}\n` : ''}
${input._reviewFeedback ? `**改进要求**：${input._reviewFeedback}` : ''}

每个选题请包含：
1. **选题标题**（吸引人的标题方向）
2. **核心角度**（与同类内容的差异化在哪里）
3. **爆点分析**（为什么这个选题能吸引点击和转发）
4. **适合形式**（干货长文 / 故事型 / 清单型 / 对比型）
5. **预估热度**（⭐~⭐⭐⭐⭐⭐）

请按热度从高到低排列。`;
    },
    temperature: 0.9,
};

SkillRegistry.trend_hook = {
    id: 'trend_hook',
    name: '热点借势',
    description: '将热点话题与你的内容领域结合，生成借势选题方案',
    icon: '🔥',
    phase: 'research',
    phaseLabel: '选题',

    inputFields: [
        { key: 'hotTopic', label: '热点话题', placeholder: '例：ChatGPT 搜索功能上线' },
        { key: 'field', label: '你的领域', placeholder: '例：效率工具' },
    ],
    outputFields: ['hookAngles'],

    systemPrompt: '你是一位嗅觉灵敏的热点内容策划师，擅长在热点事件中找到与任何领域的巧妙结合点，让蹭热点不尬、不硬、有价值。',

    buildPrompt(input) {
        return `当前热点话题：${input.hotTopic || '无'}
我的内容领域：${input.field || '通用'}

请生成 5 个热点借势选题方案，每个方案包含：
1. **借势标题**（标题中自然融入热点关键词）
2. **结合角度**（热点与我的领域的连接点）
3. **内容框架**（大致写什么）
4. **时效性判断**（建议发布时间窗口）
5. **风险提示**（是否有敏感性、是否容易翻车）`;
    },
    temperature: 0.85,
};

// ======================== 2. 写作阶段 ========================

SkillRegistry.outline_architect = {
    id: 'outline_architect',
    name: '大纲架构师',
    description: '为文章搭建清晰的逻辑骨架，包含每部分的要点和字数建议',
    icon: '🏗️',
    phase: 'writing',
    phaseLabel: '写作',

    inputFields: [
        { key: 'topic', label: '文章主题', placeholder: '输入选题标题' },
        { key: 'style', label: '内容风格', placeholder: '干货型 / 故事型 / 观点型' },
        { key: 'wordCount', label: '目标字数', placeholder: '3000', type: 'number' },
    ],
    outputFields: ['outline'],

    systemPrompt: '你是一位经验丰富的公众号编辑总监，擅长设计文章结构。你的大纲逻辑清晰、节奏感强，能保证读者从头看到尾。',

    buildPrompt(input) {
        return `请为以下公众号文章设计详细大纲：

**文章主题**：${input.topic || '待定'}
**内容风格**：${input.style || '干货型'}
**目标字数**：${input.wordCount || 3000} 字
${input.audience ? `**目标受众**：${input.audience}` : ''}

大纲要求：
1. 设计 **标题方向**（3 个备选）
2. **开头设计**（用什么方式吸引读者：故事开场/数据冲击/痛点共鸣/悬念钩子）
3. **正文结构**（3-5 个主要板块，每个板块写明：小标题、核心论点、支撑案例方向、预计字数）
4. **结尾设计**（总结升华 + CTA 行动号召）
5. **金句预埋**（2-3 个适合被截图转发的句子方向）
6. **排版建议**（是否需要引用框、列表、分隔符等）`;
    },
    temperature: 0.7,
};

SkillRegistry.hook_writer = {
    id: 'hook_writer',
    name: '开头钩子',
    description: '撰写 3-5 种不同风格的文章开头，抓住读者前 3 秒',
    icon: '🪝',
    phase: 'writing',
    phaseLabel: '写作',

    inputFields: [
        { key: 'topic', label: '文章主题', placeholder: '' },
        { key: 'outline', label: '文章大纲', placeholder: '（可选）粘贴大纲', multiline: true },
    ],
    outputFields: ['hooks'],

    systemPrompt: '你是公众号文案开头大师。你深谙读者心理：公众号文章的前 3 行决定了 80% 的阅读完成率。你能写出让人忍不住往下读的开头。',

    buildPrompt(input) {
        return `为以下文章撰写 5 种不同风格的开头（每个 100-150 字）：

**文章主题**：${input.topic}
${input.outline ? `**大纲参考**：\n${input.outline}\n` : ''}

请分别写出以下 5 种风格的开头：
1. 🎯 **痛点共鸣型**：直击读者痛点，让人觉得"这说的就是我"
2. 📖 **故事悬念型**：用一个引人入胜的故事片段开场
3. 💥 **数据冲击型**：用反直觉的数据或事实开场
4. ❓ **提问引导型**：连续提问，引发读者思考
5. 🔥 **热点切入型**：从大众关注的话题自然过渡到文章主题

每种风格请标注适用场景和预期效果。`;
    },
    temperature: 0.85,
};

SkillRegistry.body_expander = {
    id: 'body_expander',
    name: '正文撰写',
    description: '根据大纲逐段展开撰写，保持风格统一和逻辑连贯',
    icon: '✍️',
    phase: 'writing',
    phaseLabel: '写作',

    inputFields: [
        { key: 'topic', label: '文章主题', placeholder: '' },
        { key: 'outline', label: '详细大纲', placeholder: '粘贴大纲', multiline: true },
        { key: 'style', label: '写作风格', placeholder: '例：专业但不枯燥，多用比喻' },
        { key: 'hook', label: '已选开头', placeholder: '（可选）粘贴选定的开头', multiline: true },
    ],
    outputFields: ['body'],

    systemPrompt: `你是一位顶级公众号长文作者。你的文章特点：
- 逻辑清晰但不说教，像朋友聊天一样娓娓道来
- 每隔 2-3 段就有一个"钩子"让读者想继续看
- 善用比喻、类比让抽象概念具象化
- 适当穿插故事和案例增强说服力
- 关键结论用加粗或引用框突出`,

    buildPrompt(input) {
        return `请根据以下大纲撰写完整的公众号文章正文：

**文章主题**：${input.topic}
**写作风格**：${input.style || '专业但亲切，像朋友聊天'}
${input.hook ? `**已确定的开头**：\n${input.hook}\n\n请从这个开头自然衔接正文。` : ''}

**大纲**：
${input.outline}

写作要求：
1. 严格按照大纲结构展开，但可以适当调整过渡
2. 每个板块之间要有自然的过渡语句
3. 正文中预埋 2-3 个适合被截图转发的金句（用 **加粗** 标注）
4. 适当使用分行和留白，避免大段文字墙
5. 结尾要有力度，包含明确的 CTA`;
    },
    temperature: 0.75,
};

SkillRegistry.ending_crafter = {
    id: 'ending_crafter',
    name: '结尾设计',
    description: '为文章设计有力的结尾+引导关注/转发的 CTA',
    icon: '🎬',
    phase: 'writing',
    phaseLabel: '写作',

    inputFields: [
        { key: 'topic', label: '文章主题', placeholder: '' },
        { key: 'bodyPreview', label: '正文摘要', placeholder: '简述正文核心内容', multiline: true },
    ],
    outputFields: ['endings'],

    systemPrompt: '你是公众号结尾设计专家。好的结尾不只是总结，更要让读者产生行动：点赞、转发、关注、留言。你擅长设计各种 CTA 话术。',

    buildPrompt(input) {
        return `为以下文章设计 3 种不同风格的结尾（含 CTA）：

**文章主题**：${input.topic}
**正文核心内容**：${input.bodyPreview || '见上文'}

请设计：
1. 🔁 **金句升华型**：用一句醍醐灌顶的话收尾 + 引导转发
2. 💬 **互动引导型**：抛出开放性问题 + 引导留言讨论
3. 📢 **预告引流型**：预告下期内容 + 引导关注不错过

每种结尾请包含：正文结语(100-200字) + CTA话术(50字以内)`;
    },
    temperature: 0.8,
};

// ======================== 3. 优化阶段 ========================

SkillRegistry.title_optimizer = {
    id: 'title_optimizer',
    name: '标题优化',
    description: '为文章生成 10 个标题方案并打分排名',
    icon: '🏆',
    phase: 'optimize',
    phaseLabel: '优化',

    inputFields: [
        { key: 'topic', label: '文章主题', placeholder: '' },
        { key: 'outline', label: '内容概要', placeholder: '简述文章核心内容', multiline: true },
        { key: 'audience', label: '目标受众', placeholder: '' },
    ],
    outputFields: ['titles'],

    systemPrompt: `你是一位深谙公众号标题心理学的标题优化大师。你知道：
- 标题是决定打开率的第一要素
- 好标题要在 0.3 秒内抓住注意力
- 要利用好奇心缺口、数字锚点、情感共鸣、身份认同
- 微信生态下标题不宜超过 32 字`,

    buildPrompt(input) {
        return `请为以下公众号文章生成 10 个标题方案：

**文章主题**：${input.topic}
**内容概要**：${input.outline || '见上文'}
**目标受众**：${input.audience || '泛人群'}

要求：
1. 10 个标题风格各异（好奇型/数字型/对比型/痛点型/身份型/反常识型等）
2. 每个标题后附上：
   - 📊 **预估打开率**：⭐~⭐⭐⭐⭐⭐
   - 🧠 **标题策略**：用了什么心理技巧
   - ⚠️ **风险提示**：是否有标题党嫌疑
3. 最后给出 **TOP 3 推荐** 并说明原因`;
    },
    temperature: 0.9,
};

SkillRegistry.digest_writer = {
    id: 'digest_writer',
    name: '摘要撰写',
    description: '生成文章摘要（公众号「摘要」字段），120字以内的精华浓缩',
    icon: '📋',
    phase: 'optimize',
    phaseLabel: '优化',

    inputFields: [
        { key: 'content', label: '文章内容', placeholder: '粘贴文章或核心要点', multiline: true },
    ],
    outputFields: ['digest'],

    systemPrompt: '你是公众号摘要撰写专家。摘要会显示在订阅消息和搜一搜结果中，需要在 120 字内精准传达价值点并吸引点击。',

    buildPrompt(input) {
        return `请为以下公众号文章撰写 3 个版本的摘要（每个不超过 120 字）：

**文章内容**：
${input.content || '未提供'}

请输出：
1. 📌 **价值导向型**：强调读者能获得什么
2. 🎣 **悬念钩子型**：制造好奇心缺口
3. 💡 **金句浓缩型**：用一句有力的话概括

每个摘要严格控制在 120 字以内，并标注字数。`;
    },
    temperature: 0.7,
};

SkillRegistry.seo_booster = {
    id: 'seo_booster',
    name: '搜索优化',
    description: '为文章做微信搜一搜 SEO 优化，提升搜索流量',
    icon: '🔍',
    phase: 'optimize',
    phaseLabel: '优化',

    inputFields: [
        { key: 'content', label: '文章内容', placeholder: '粘贴文章', multiline: true },
        { key: 'keywords', label: '目标关键词', placeholder: '例：时间管理, 自律方法' },
    ],
    outputFields: ['seoSuggestions'],

    systemPrompt: '你是微信搜一搜 SEO 专家。你深谙微信生态内的搜索排名规则，包括关键词密度、标题优化、标签使用、阅读完成率对排名的影响。',

    buildPrompt(input) {
        return `请对以下公众号文章进行搜索优化分析：

**文章内容**：
${(input.content || '').substring(0, 2000)}...

**目标关键词**：${input.keywords || '请根据内容推荐'}

请输出：
1. **关键词分析**：核心词、长尾词、相关词推荐
2. **标题 SEO 优化**：如何在标题中自然融入关键词
3. **正文优化建议**：关键词分布、密度建议、小标题优化
4. **标签推荐**：适合添加的公众号话题标签 (# 标签)
5. **搜一搜排名预估**：当前内容的搜索竞争力评分`;
    },
    temperature: 0.5,
};

SkillRegistry.emotion_tuner = {
    id: 'emotion_tuner',
    name: '情感调节',
    description: '调整文章情感基调，让内容更有感染力或更克制理性',
    icon: '🎭',
    phase: 'optimize',
    phaseLabel: '优化',

    inputFields: [
        { key: 'content', label: '文章内容', placeholder: '粘贴需要调整的文章', multiline: true },
        { key: 'targetEmotion', label: '目标情感', placeholder: '例：温暖治愈 / 犀利理性 / 幽默轻松' },
    ],
    outputFields: ['tunedContent'],

    systemPrompt: '你是一位文字情感调控大师。你能在保持内容核心信息不变的前提下，精准调整文章的情感基调和语言温度。',

    buildPrompt(input) {
        return `请将以下文章的情感基调调整为【${input.targetEmotion || '温暖有力'}】：

**原文**：
${input.content || '未提供'}

要求：
1. 保持核心信息和论点不变
2. 调整用词、句式、节奏来改变情感基调
3. 标注你修改的关键段落和修改理由
4. 输出完整的调整后文章`;
    },
    temperature: 0.7,
};

// ======================== 4. 排版阶段 ========================

SkillRegistry.format_enhancer = {
    id: 'format_enhancer',
    name: '排版建议',
    description: '分析文章结构并给出公众号排版优化建议',
    icon: '📐',
    phase: 'format',
    phaseLabel: '排版',

    inputFields: [
        { key: 'content', label: '文章内容', placeholder: '粘贴需要分析排版的文章', multiline: true },
    ],
    outputFields: ['formatSuggestions'],

    systemPrompt: '你是一位公众号排版专家。你深谙移动端阅读体验：字号、行间距、段间距、留白、配色都影响阅读完成率。你能给出专业的排版建议。',

    buildPrompt(input) {
        return `请分析以下公众号文章并给出排版优化建议：

**文章内容**：
${(input.content || '').substring(0, 3000)}

请输出：
1. **整体排版评分**：当前排版的手机阅读友好度 (1-10)
2. **段落优化**：哪些段落过长需要拆分
3. **强调元素**：哪些内容建议加粗/变色/加引用框
4. **视觉分隔**：建议在哪些位置添加分隔线或留白
5. **配图建议**：文中哪些位置适合插入配图，建议什么类型的图
6. **标注导出**：输出一个包含排版标记的版本（用 HTML 标签标注）`;
    },
    temperature: 0.5,
};

SkillRegistry.emoji_seasoner = {
    id: 'emoji_seasoner',
    name: '表情点缀',
    description: '为文章智能添加 emoji 和特殊符号，提升阅读趣味性',
    icon: '✨',
    phase: 'format',
    phaseLabel: '排版',

    inputFields: [
        { key: 'content', label: '文章内容', placeholder: '粘贴需要添加表情的文章', multiline: true },
        { key: 'density', label: 'Emoji 密度', placeholder: '轻度 / 中度 / 浓厚' },
    ],
    outputFields: ['enhancedContent'],

    systemPrompt: '你是公众号表情符号运用专家。恰到好处的 emoji 能让文章更有呼吸感和亲和力，但过度使用会显得不专业。你追求的是"精准点缀"。',

    buildPrompt(input) {
        return `请为以下公众号文章添加 emoji 表情符号：

**Emoji 密度**：${input.density || '中度'}
**原文**：
${input.content || '未提供'}

规则：
1. 小标题前添加主题相关 emoji
2. 关键要点前可用 ✅ 📌 💡 等标记
3. 列表项目前统一使用同一风格的 emoji
4. 正文中适度使用，每 2-3 段最多 1-2 个
5. 不要在严肃论述中间生硬插入
6. 输出添加 emoji 后的完整文章`;
    },
    temperature: 0.6,
};

SkillRegistry.section_divider = {
    id: 'section_divider',
    name: '分节设计',
    description: '为文章设计创意小标题和视觉分隔符',
    icon: '🔖',
    phase: 'format',
    phaseLabel: '排版',

    inputFields: [
        { key: 'content', label: '文章内容', placeholder: '粘贴需要重新分节的文章', multiline: true },
        { key: 'style', label: '分节风格', placeholder: '简洁 / 文艺 / 趣味' },
    ],
    outputFields: ['sectionedContent'],

    systemPrompt: '你是公众号视觉分节设计师。好的分节让读者的眼睛有"停靠点"，降低认知负荷，提升阅读完成率。',

    buildPrompt(input) {
        return `请为以下文章重新设计分节标题和分隔方式：

**分节风格**：${input.style || '简洁有力'}
**文章内容**：
${input.content || '未提供'}

请输出：
1. 为每个板块设计 2 个备选小标题（一个直白一个创意）
2. 推荐分隔符风格（纯文字分隔 / emoji 分隔 / 线条分隔）
3. 输出重新分节后的完整文章`;
    },
    temperature: 0.75,
};

// ======================== 5. 分发阶段 ========================

SkillRegistry.share_copy = {
    id: 'share_copy',
    name: '分享文案',
    description: '生成朋友圈、微信群、社交平台的分享话术包',
    icon: '📣',
    phase: 'distribute',
    phaseLabel: '分发',

    inputFields: [
        { key: 'title', label: '文章标题', placeholder: '' },
        { key: 'content', label: '文章核心内容', placeholder: '简述核心观点', multiline: true },
    ],
    outputFields: ['shareCopies'],

    systemPrompt: '你是社交传播文案专家。你知道在不同场景（朋友圈、微信群、社交平台）的分享话术需要不同的策略，才能最大化点击率。',

    buildPrompt(input) {
        return `请为以下公众号文章生成分享文案包：

**文章标题**：${input.title || '未提供'}
**核心内容**：${input.content || '未提供'}

请生成以下场景的分享文案：

**1. 朋友圈版** (3 条，风格各异)
- 要求：有个人态度，不像广告，让朋友想点开

**2. 微信群版** (2 条)
- 要求：有讨论感，像在群里抛话题

**3. 作者个人号私聊版** (1 条)
- 要求：亲密、真诚，像推荐给好朋友

**4. 二次传播引导语** (1 条)
- 要求：放在文末的"觉得不错就分享给需要的朋友"类话术`;
    },
    temperature: 0.85,
};

SkillRegistry.comment_guide = {
    id: 'comment_guide',
    name: '互动引导',
    description: '设计文末互动话术、精选留言和作者回复策略',
    icon: '💬',
    phase: 'distribute',
    phaseLabel: '分发',

    inputFields: [
        { key: 'topic', label: '文章主题', placeholder: '' },
        { key: 'content', label: '文章要点', placeholder: '简述文章的主要内容和观点', multiline: true },
    ],
    outputFields: ['interactionPlan'],

    systemPrompt: '你是公众号互动运营专家。留言区是文章的"第二战场"——高质量的互动能大幅提升文章的推荐权重和读者黏性。',

    buildPrompt(input) {
        return `请为以下公众号文章设计完整的互动引导方案：

**文章主题**：${input.topic || '未提供'}
**核心内容**：${input.content || '未提供'}

请设计：
1. **文末互动话术** (3 个版本)
   - 投票型："你是A还是B？评论区告诉我"
   - 分享型："说说你的经历/故事"
   - 求助型："你还遇到过哪些类似的问题？"

2. **种子留言** (5 条)
   - 作者自己先发的引导性留言，带动讨论

3. **回复模板** (常见留言类型的回复策略)
   - 赞同型留言 → 如何回复
   - 质疑型留言 → 如何回复
   - 提问型留言 → 如何回复

4. **置顶留言建议** (1 条)
   - 什么内容适合置顶以引导更多互动`;
    },
    temperature: 0.8,
};

SkillRegistry.series_planner = {
    id: 'series_planner',
    name: '系列规划',
    description: '将一个大主题拆解为系列文章，规划连载节奏',
    icon: '📚',
    phase: 'distribute',
    phaseLabel: '分发',

    inputFields: [
        { key: 'theme', label: '系列主题', placeholder: '例：30天学会时间管理' },
        { key: 'episodes', label: '计划期数', placeholder: '10', type: 'number' },
        { key: 'frequency', label: '更新频率', placeholder: '例：每周2篇' },
    ],
    outputFields: ['seriesPlan'],

    systemPrompt: '你是公众号系列内容策划师。系列文章是培养读者阅读习惯、提升关注率的利器。你擅长规划有节奏感、有递进关系的系列内容。',

    buildPrompt(input) {
        const episodes = input.episodes || 10;
        return `请规划以下公众号系列内容：

**系列主题**：${input.theme || '未定'}
**计划期数**：${episodes} 期
**更新频率**：${input.frequency || '每周1篇'}

请输出：
1. **系列命名**：3 个系列名称方案（有辨识度、适合长期使用）
2. **系列定位**：一句话概括这个系列的核心价值
3. **内容排期表**：每一期的标题方向 + 核心内容 + 承上启下关系
4. **节奏设计**：
   - 第 1 期如何开篇引流
   - 中间期如何保持新鲜感
   - 最后一期如何收官 + 引导关注新系列
5. **预热方案**：系列发布前的预告文案`;
    },
    temperature: 0.8,
};

// ======================== 便捷方法 ========================

/** 获取所有 Skills 列表 */
SkillRegistry._list = function () {
    return Object.values(this).filter(s => typeof s === 'object' && s.id);
};

/** 按阶段分组 */
SkillRegistry._byPhase = function () {
    const groups = {};
    this._list().forEach(s => {
        if (!groups[s.phase]) groups[s.phase] = [];
        groups[s.phase].push(s);
    });
    return groups;
};

/** 阶段元数据 */
SkillRegistry._phases = [
    { id: 'research', label: '选题', icon: '🔍', color: 'blue' },
    { id: 'writing', label: '写作', icon: '✍️', color: 'green' },
    { id: 'optimize', label: '优化', icon: '⚡', color: 'amber' },
    { id: 'format', label: '排版', icon: '🎨', color: 'purple' },
    { id: 'distribute', label: '分发', icon: '📣', color: 'rose' },
];

// 暴露到全局
window.SkillRegistry = SkillRegistry;
