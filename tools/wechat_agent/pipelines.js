/**
 * 微信公众号 Agent 预设管道 (Pipelines)
 * 
 * 管道是一系列 Skill 的有序编排，定义了：
 *   - 执行顺序
 *   - 数据流向（inputMapping：从上下文的哪里取数据传给当前步骤）
 *   - 可选的审查门控
 *   - 用户交互检查点（checkpoint：暂停等待用户确认或修改）
 * 
 * inputMapping 语法说明：
 *   "input.xxx"           → 从用户原始输入中取值
 *   "steps.stepId.output" → 从前序步骤的输出中取值
 *   "steps.stepId.raw"    → 从前序步骤的原始输出中取值
 *   "globals.xxx"         → 从管道全局变量中取值
 *   "literal:xxx"         → 字面量字符串
 */

const PipelineRegistry = {};

// ==================== 🚀 管道一：一键长文发布 ====================
PipelineRegistry.full_article = {
    id: 'full_article',
    name: '🚀 一键长文发布',
    description: '从选题到发布的完整公众号长文生产流水线。输入主题和受众，自动编排 7 个步骤，产出可直接发布的完整内容包。',
    icon: '🚀',
    color: 'green',
    estimatedTime: '8-15 分钟',

    // 用户需要填写的初始输入
    inputFields: [
        { key: 'field', label: '内容领域', placeholder: '例：职场成长、育儿教育、个人理财', required: true },
        { key: 'topic', label: '文章主题/选题', placeholder: '例：年轻人如何建立被动收入', required: true },
        { key: 'audience', label: '目标受众', placeholder: '例：25-35岁职场白领', required: true },
        { key: 'style', label: '写作风格', placeholder: '例：专业但不枯燥、多用比喻和案例', required: false },
        { key: 'wordCount', label: '目标字数', placeholder: '3000', type: 'number', required: false },
    ],

    // 全局变量（所有步骤共享的默认值）
    globals: {
        platform: '微信公众号',
    },

    // 步骤编排
    steps: [
        {
            id: 'outline',
            skillId: 'outline_architect',
            label: '📋 生成大纲',
            description: '搭建文章逻辑骨架',
            inputMapping: {
                topic: 'input.topic',
                style: 'input.style',
                wordCount: 'input.wordCount',
                audience: 'input.audience',
            },
            checkpoint: true, // 大纲完成后暂停，让用户确认或修改
        },
        {
            id: 'hook',
            skillId: 'hook_writer',
            label: '🪝 撰写开头',
            description: '生成 5 种风格的文章开头',
            inputMapping: {
                topic: 'input.topic',
                outline: 'steps.outline.output',
            },
            checkpoint: true, // 用户选择喜欢的开头
        },
        {
            id: 'body',
            skillId: 'body_expander',
            label: '✍️ 撰写正文',
            description: '根据大纲逐段展开正文',
            inputMapping: {
                topic: 'input.topic',
                outline: 'steps.outline.output',
                style: 'input.style',
                hook: 'steps.hook.output',
            },
        },
        {
            id: 'title',
            skillId: 'title_optimizer',
            label: '🏆 优化标题',
            description: '生成 10 个标题方案并排名',
            inputMapping: {
                topic: 'input.topic',
                outline: 'steps.outline.output',
                audience: 'input.audience',
            },
            checkpoint: true,
        },
        {
            id: 'digest',
            skillId: 'digest_writer',
            label: '📋 撰写摘要',
            description: '生成公众号文章摘要',
            inputMapping: {
                content: 'steps.body.output',
            },
        },
        {
            id: 'emoji',
            skillId: 'emoji_seasoner',
            label: '✨ 排版美化',
            description: '添加 emoji 和排版优化',
            inputMapping: {
                content: 'steps.body.output',
                density: 'literal:中度',
            },
        },
        {
            id: 'share',
            skillId: 'share_copy',
            label: '📣 生成分享文案',
            description: '生成朋友圈和微信群分享话术',
            inputMapping: {
                title: 'input.topic',
                content: 'steps.body.output',
            },
        },
    ],
};

// ==================== 🔥 管道二：爆款标题工坊 ====================
PipelineRegistry.title_workshop = {
    id: 'title_workshop',
    name: '🔥 爆款标题工坊',
    description: '针对一篇文章深度打磨标题。先洞察受众心理，再批量生成标题，最后精选 TOP3 并给出使用建议。',
    icon: '🔥',
    color: 'rose',
    estimatedTime: '3-5 分钟',

    inputFields: [
        { key: 'topic', label: '文章主题', placeholder: '例：为什么你总是存不下钱', required: true },
        { key: 'content', label: '文章内容摘要', placeholder: '简述文章核心观点（100-300字）', required: true, multiline: true },
        { key: 'audience', label: '目标受众', placeholder: '例：月薪8000-15000的职场人', required: false },
    ],

    globals: {},

    steps: [
        {
            id: 'insight',
            skillId: 'audience_insight',
            label: '🎯 受众洞察',
            description: '分析目标读者对这个话题的心理',
            inputMapping: {
                field: 'input.topic',
                audience: 'input.audience',
            },
        },
        {
            id: 'titles',
            skillId: 'title_optimizer',
            label: '🏆 批量生成标题',
            description: '结合洞察生成 10 个标题方案',
            inputMapping: {
                topic: 'input.topic',
                outline: 'input.content',
                audience: 'input.audience',
            },
        },
        {
            id: 'seo',
            skillId: 'seo_booster',
            label: '🔍 SEO 检查',
            description: '确保标题包含搜索关键词',
            inputMapping: {
                content: 'steps.titles.output',
                keywords: 'input.topic',
            },
        },
    ],
};

// ==================== 📚 管道三：系列内容规划 ====================
PipelineRegistry.series_planning = {
    id: 'series_planning',
    name: '📚 系列内容规划',
    description: '将一个大主题拆解为系列连载。从受众洞察出发，规划系列架构，再为每一期生成大纲和标题。',
    icon: '📚',
    color: 'indigo',
    estimatedTime: '6-10 分钟',

    inputFields: [
        { key: 'theme', label: '系列主题', placeholder: '例：30天学会时间管理', required: true },
        { key: 'field', label: '内容领域', placeholder: '例：个人成长', required: true },
        { key: 'audience', label: '目标受众', placeholder: '例：大学生和职场新人', required: true },
        { key: 'episodes', label: '计划期数', placeholder: '10', type: 'number', required: false },
        { key: 'frequency', label: '更新频率', placeholder: '例：每周2篇', required: false },
    ],

    globals: {},

    steps: [
        {
            id: 'insight',
            skillId: 'audience_insight',
            label: '🎯 受众洞察',
            description: '分析系列内容的目标读者',
            inputMapping: {
                field: 'input.field',
                audience: 'input.audience',
            },
        },
        {
            id: 'plan',
            skillId: 'series_planner',
            label: '📚 系列规划',
            description: '规划整个系列的内容结构',
            inputMapping: {
                theme: 'input.theme',
                episodes: 'input.episodes',
                frequency: 'input.frequency',
            },
            checkpoint: true,
        },
        {
            id: 'topics',
            skillId: 'topic_brainstorm',
            label: '💡 扩展选题',
            description: '为系列补充更多角度的选题',
            inputMapping: {
                field: 'input.field',
                audience: 'input.audience',
                insight: 'steps.insight.output',
                count: 'literal:15',
            },
        },
        {
            id: 'titles',
            skillId: 'title_optimizer',
            label: '🏆 标题包',
            description: '为每期内容优化标题',
            inputMapping: {
                topic: 'input.theme',
                outline: 'steps.plan.output',
                audience: 'input.audience',
            },
        },
    ],
};

// ==================== ✨ 管道四：内容翻新改写 ====================
PipelineRegistry.content_refresh = {
    id: 'content_refresh',
    name: '✨ 内容翻新改写',
    description: '将旧文章重新包装：分析原文亮点、调整情感基调、重写标题和摘要、生成新的分享文案。让老内容焕发新生。',
    icon: '✨',
    color: 'amber',
    estimatedTime: '5-8 分钟',

    inputFields: [
        { key: 'content', label: '原文内容', placeholder: '粘贴需要翻新的公众号文章', required: true, multiline: true },
        { key: 'targetEmotion', label: '目标风格/情感', placeholder: '例：更轻松幽默 / 更专业深度 / 更温暖治愈', required: false },
        { key: 'audience', label: '新的目标受众', placeholder: '（可选）如果想调整受众', required: false },
    ],

    globals: {},

    steps: [
        {
            id: 'emotion',
            skillId: 'emotion_tuner',
            label: '🎭 情感调节',
            description: '调整文章整体情感基调',
            inputMapping: {
                content: 'input.content',
                targetEmotion: 'input.targetEmotion',
            },
        },
        {
            id: 'title',
            skillId: 'title_optimizer',
            label: '🏆 新标题',
            description: '为翻新内容重新设计标题',
            inputMapping: {
                topic: 'steps.emotion.output',
                outline: 'steps.emotion.output',
                audience: 'input.audience',
            },
        },
        {
            id: 'digest',
            skillId: 'digest_writer',
            label: '📋 新摘要',
            description: '为翻新内容撰写新摘要',
            inputMapping: {
                content: 'steps.emotion.output',
            },
        },
        {
            id: 'emoji',
            skillId: 'emoji_seasoner',
            label: '✨ 排版刷新',
            description: '重新点缀 emoji 和排版',
            inputMapping: {
                content: 'steps.emotion.output',
                density: 'literal:中度',
            },
        },
        {
            id: 'share',
            skillId: 'share_copy',
            label: '📣 新分享文案',
            description: '生成配套分享话术',
            inputMapping: {
                title: 'steps.title.output',
                content: 'steps.emotion.output',
            },
        },
    ],
};

// ==================== 📱 管道五：短内容矩阵 ====================
PipelineRegistry.short_content_matrix = {
    id: 'short_content_matrix',
    name: '📱 短内容矩阵',
    description: '一个话题快速生成朋友圈+群聊+留言互动的短内容矩阵。适合日常内容运营，5分钟出一套内容。',
    icon: '📱',
    color: 'violet',
    estimatedTime: '3-5 分钟',

    inputFields: [
        { key: 'topic', label: '话题/观点', placeholder: '例：今天发现一个提升效率的好方法', required: true },
        { key: 'field', label: '内容领域', placeholder: '例：效率工具', required: false },
    ],

    globals: {},

    steps: [
        {
            id: 'brainstorm',
            skillId: 'topic_brainstorm',
            label: '💡 角度拓展',
            description: '从一个话题拓展多个分享角度',
            inputMapping: {
                field: 'input.field',
                audience: 'literal:公众号读者和朋友圈好友',
                count: 'literal:5',
            },
        },
        {
            id: 'share',
            skillId: 'share_copy',
            label: '📣 分享文案包',
            description: '生成朋友圈+微信群话术',
            inputMapping: {
                title: 'input.topic',
                content: 'steps.brainstorm.output',
            },
        },
        {
            id: 'interaction',
            skillId: 'comment_guide',
            label: '💬 互动设计',
            description: '设计评论互动引导',
            inputMapping: {
                topic: 'input.topic',
                content: 'steps.brainstorm.output',
            },
        },
    ],
};

// ==================== 工具方法 ====================

/** 获取所有管道列表 */
PipelineRegistry._list = function () {
    return Object.values(this).filter(p => typeof p === 'object' && p.id);
};

/** 按颜色获取管道 */
PipelineRegistry._getById = function (id) {
    return this[id] || null;
};

// 暴露到全局
window.PipelineRegistry = PipelineRegistry;
