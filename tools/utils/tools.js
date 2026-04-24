window.toolCollections = window.toolCollections || {};
window.toolCollections.utils = [
    {
        id: 'utils_tool_hub',
        name: 'Utils 工具导航',
        desc: '27 个高频本地前端工具合集：包含图片处理、文档转换、开发辅助等高频需求。',
        href: 'tools/utils/index.html',
        icon: 'fa-solid fa-folder-gear',
        category: 'utils', // Use 'utils' category
        tags: ['效率工具', '工具集'],
        isNew: true,
        iconBg: 'bg-indigo-50',
        iconColor: 'text-indigo-600',
        borderColor: 'indigo-200',
        hoverTextColor: 'text-indigo-600',
        linkColor: 'text-indigo-600',
        badgeStyle: 'bg-indigo-100 text-indigo-700'
    },
    // PDF & 文档
    { id: 'file-toolbox', name: '文件处理工具箱', desc: 'PDF 拆分/合并/提取/水印 + TXT/MD 解析', href: 'tools/utils/tools/file-toolbox.html', icon: 'fa-solid fa-file-lines', category: 'utils' },
    { id: 'image-to-pdf', name: '图片转 PDF', desc: '单张图片转换为 PDF', href: 'tools/utils/tools/image-to-pdf.html', icon: 'fa-solid fa-file-plus', category: 'utils' },
    { id: 'markdown-to-pdf', name: 'Markdown 转 PDF', desc: '打印导出 PDF', href: 'tools/utils/tools/markdown-to-pdf.html', icon: 'fa-solid fa-image', category: 'utils' },

    // 图片工具
    { id: 'image-compressor', name: '图片压缩器', desc: '压缩图片体积', href: 'tools/utils/tools/image-compressor.html', icon: 'fa-solid fa-file-code', category: 'utils' },
    { id: 'image-resizer', name: '图片尺寸调整', desc: '调整宽高', href: 'tools/utils/tools/image-resizer.html', icon: 'fa-solid fa-compress', category: 'utils' },
    { id: 'image-cropper', name: '图片裁剪', desc: '坐标裁剪', href: 'tools/utils/tools/image-cropper.html', icon: 'fa-solid fa-crop', category: 'utils' },
    { id: 'image-merge', name: '图片拼接', desc: '多图横向/纵向拼接', href: 'tools/utils/tools/image-merge-horizontal.html', icon: 'fa-solid fa-layers', category: 'utils' },
    { id: 'image-watermark', name: '图片水印', desc: '添加文字或 Logo 水印', href: 'tools/utils/tools/image-watermark-text.html', icon: 'fa-solid fa-images', category: 'utils' },
    { id: 'image-converter', name: '图片格式转换', desc: 'PNG/JPG/WebP/Base64 互转', href: 'tools/utils/tools/png-to-jpg.html',         icon: 'fa-solid fa-rotate-right', category: 'utils' },

    // Markdown & 文本
    { id: 'markdown-editor', name: 'Markdown 编辑器', desc: '实时预览编辑器', href: 'tools/utils/tools/markdown-editor.html',         icon: 'fa-solid fa-pen-to-square', category: 'utils' },
    { id: 'markdown-table', name: 'Markdown 表格生成', desc: '快速生成 Markdown 表格', href: 'tools/utils/tools/markdown-table-generator.html', icon: 'fa-solid fa-table', category: 'utils' },
    { id: 'text-tools', name: '文本处理工坊', desc: '去重、排序、拆分、合并、统计、转换', href: 'tools/utils/tools/text-deduplicator.html', icon: 'fa-solid fa-align-left', category: 'utils' },
    { id: 'regex-tester', name: '正则表达式测试', desc: '实时匹配测试', href: 'tools/utils/tools/regex-tester.html', icon: 'fa-solid fa-regex', category: 'utils' },

    // 开发辅助
    { id: 'json-tools', name: 'JSON 工具箱', desc: '格式化、压缩、转换 (CSV/YAML)', href: 'tools/utils/tools/json-formatter.html', icon: 'fa-solid fa-code', category: 'utils' },
    { id: 'code-formatter', name: '代码格式化', desc: 'XML/HTML 格式化', href: 'tools/utils/tools/xml-formatter.html', icon: 'fa-solid fa-code', category: 'utils' },
    { id: 'encoders', name: '编码转换', desc: 'URL、Base64、HTML 实体编码', href: 'tools/utils/tools/url-encoder-decoder.html', icon: 'fa-solid fa-binary', category: 'utils' },
    { id: 'generators', name: '生成器合集', desc: 'UUID、密码、二维码、色板生成', href: 'tools/utils/tools/uuid-generator.html',         icon: 'fa-solid fa-wand-magic', category: 'utils' },
    { id: 'time-tools', name: '时间工具', desc: '时间戳转换、时间差计算', href: 'tools/utils/tools/timestamp-converter.html', icon: 'fa-solid fa-clock', category: 'utils' }
];
