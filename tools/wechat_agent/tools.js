/**
 * 微信公众号 Agent 工作台 - 主站注册
 * 
 * 将 Agent 工作台作为一个工具注册到主站的分类系统中。
 * 与其他工具不同，这是一个「系统级」工具，包含多个子 Skills 和 Pipelines。
 */
window.toolCollections = window.toolCollections || {};
window.toolCollections.wechat_agent = [
    {
        id: 'wechat_agent_workbench',
        name: '公众号 Agent 工作台',
        desc: '纯前端 Agent 编排系统。17 个专业技能 + 5 条预设管道，自动串联选题→写作→优化→排版→分发全流程。',
        href: 'tools/wechat_agent/index.html',
        icon: 'fa-solid fa-robot',
        category: 'wechat_agent',
        tags: ['公众号'],
        isNew: true,
        complexity: 4,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        borderColor: 'emerald-200',
        hoverTextColor: 'text-emerald-600',
        linkColor: 'text-emerald-600',
    },
];
