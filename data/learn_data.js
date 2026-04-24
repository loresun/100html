/**
 * 学习中心文档索引
 */
const learnDocs = [
    // 基础教程
    { id: 'foundations', title: '01. AI 基础概念', path: '../../learn/01-foundations.md', group: '基础教程' },
    { id: 'model_capabilities', title: '02. 模型能力详解', path: '../../learn/02-model-capabilities.md', group: '基础教程' },
    { id: 'chat_parameters', title: '03. 对话参数调优', path: '../../learn/03-chat-parameters.md', group: '基础教程' },
    { id: 'prompting', title: '04. 提示工程指南', path: '../../learn/04-prompting.md', group: '基础教程' },
    { id: 'html_workflows', title: '05. HTML 开发工作流', path: '../../learn/05-html-workflows.md', group: '基础教程' },
    { id: 'frontend_stack', title: '06. 纯前端技术栈', path: '../../learn/06-frontend-only-stack.md', group: '基础教程' },
    { id: 'launch_business', title: '07. 发布与商业化', path: '../../learn/07-launch-and-business.md', group: '基础教程' },
    { id: 'next_stage', title: '08. 进阶开发方向', path: '../../learn/08-next-stage.md', group: '基础教程' },
    { id: 'using_repo', title: '09. 如何使用本仓库', path: '../../learn/09-using-this-repo.md', group: '基础教程' },
    { id: 'customize_build', title: '10. 定制与构建', path: '../../learn/10-customize-and-build.md', group: '基础教程' },
    { id: 'debugging', title: '11. 调试指南', path: '../../learn/11-debugging.md', group: '基础教程' },
    { id: 'product_intro', title: '12. 产品介绍', path: '../../learn/12-product-intro.md', group: '基础教程' },
    { id: 'team_usage', title: '13. 团队协作指南', path: '../../learn/13-team-usage.md', group: '基础教程' },
    { id: 'learning_path', title: '14. 学习路径规划', path: '../../learn/14-learning-path.md', group: '基础教程' },
    { id: 'repo_docs_map', title: '15. 仓库文档地图', path: '../../learn/15-repo-docs-map.md', group: '基础教程' },
    { id: 'faq', title: '16. 常见问题 (FAQ)', path: '../../learn/16-faq.md', group: '基础教程' },
    { id: 'quickstart', title: '17. 快速开始', path: '../../learn/17-quickstart.md', group: '基础教程' },
    { id: 'tool_checklist', title: '18. 工具创建清单', path: '../../learn/18-tool-creation-checklist.md', group: '基础教程' },
    { id: 'beginner_questions', title: '19. 新手常见问题', path: '../../learn/19-beginner-questions.md', group: '基础教程' },
    { id: 'llm_basics_api', title: '20. 大模型基础与 API 认知', path: '../../learn/20-llm-basics-and-api.md', group: '基础教程' },
    { id: 'frontend_integration', title: '21. 前端知识集成', path: '../../learn/21-frontend-knowledge-integration.md', group: '基础教程' },
    { id: 'content_presentation', title: '22. 技术呈现方式', path: '../../learn/22-content-presentation.md', group: '基础教程' },
    { id: 'glossary', title: '23. 术语表与概念速查', path: '../../learn/23-glossary.md', group: '基础教程' },
    { id: 'prompt_library', title: '24. Prompt 模板库', path: '../../learn/24-prompt-library.md', group: '基础教程' },
    { id: 'case_study', title: '25. 案例拆解', path: '../../learn/25-case-study.md', group: '基础教程' },
    { id: 'quality_check', title: '26. 输出质量评估', path: '../../learn/26-quality-check.md', group: '基础教程' },
    { id: 'practice_map', title: '27. 学习与工具映射', path: '../../learn/27-practice-map.md', group: '基础教程' },
    { id: 'readme', title: '📚 学习路径总览', path: '../../learn/README.md', group: '基础教程' },

    // 进阶学习
    { id: 'js_components', title: 'JS 组件库 (50+)', path: '../../learn/advanced-js-components.md', group: '进阶学习' },
    { id: 'superhtml_demos', title: 'SuperHTML 创意工坊 (20+)', path: '../../learn/advanced-superhtml.md', group: '进阶学习' },
    { id: 'utils_library', title: '实用工具库 (50+)', path: '../../learn/advanced-utils.md', group: '进阶学习' },
];
