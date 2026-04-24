window.toolCollections = window.toolCollections || {};
window.toolCollections.html_test = [
    { id: 'transfer_a', name: 'A 页面 | 内容采集与跳转', desc: '演示 sessionStorage 跨页面数据传递。采集文本、多区域内容、JSON 及图片，打包后跳转到 B 页面展示。', href: 'tools/html_test/transfer_a.html', icon: 'fa-solid fa-upload', category: 'html_test', tags: ['功能演示', '跨页通信'], isNew: true, iconBg: 'bg-gray-50', iconColor: 'text-gray-600', borderColor: 'gray-200', hoverTextColor: 'text-gray-600', linkColor: 'text-gray-600' },
    { id: 'transfer_b', name: 'B 页面 | 内容接收与展示', desc: '演示 sessionStorage 跨页面数据传递。从 A 页面接收数据并以卡片形式渲染展示标题、内容块、JSON 及图片。', href: 'tools/html_test/transfer_b.html', icon: 'fa-solid fa-download', category: 'html_test', tags: ['功能演示', '跨页通信'], isNew: true, iconBg: 'bg-gray-50', iconColor: 'text-gray-600', borderColor: 'gray-200', hoverTextColor: 'text-gray-600', linkColor: 'text-gray-600' },
];
