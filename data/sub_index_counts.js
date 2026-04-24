/**
 * 二级索引中的子页面数量统计
 * 这些页面通过二级 index.html 间接关联到首页，不在 tools.js 中直接注册
 * 用于首页统计显示真实的工具总数
 */
const subIndexCounts = {
    // JS 库示例大全 - tools/js_template/ 下的演示页面（不含 index.html）
    // 实际统计: 113 个 HTML 文件，减去 index.html，共 112 个演示页面
    js_template: 112,
    
    // SuperHTML 特效库 - tools/html_style/ 下的风格演示页面（不含 index.html）  
    // 实际统计: 31 个 HTML 文件，减去 index.html，共 30 个风格页面
    html_style: 30,
    
    // Utils 实用工具库 - tools/utils/tools/ 下的工具页面
    // 实际统计: 27 个 HTML 文件
    utils_tools: 27,
    
    // Excel 自动化案例 - tools/excel_examples/ 下的案例页面（不含 index.html）
    // 实际统计: 8 个 HTML 文件，减去 index.html，共 7 个案例页面
    excel_examples: 7,
    
    // API 交易平台 - tools/api/ 下的子页面（不含 index.html）
    // 实际统计: 4 个 HTML 文件，减去 index.html，共 3 个子页面
    api: 3,
    
    // HTML_SUPER 实验性交互 - tools/html_super/ 下的实验页面（不含 index.html）
    // 实际统计: 24 个 HTML 文件，减去 index.html，共 23 个实验页面
    html_super: 23
};

// 计算二级索引页面总数
const subIndexTotal = Object.values(subIndexCounts).reduce((sum, count) => sum + count, 0);

window.subIndexCounts = subIndexCounts;
window.subIndexTotal = subIndexTotal;
