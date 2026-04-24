/**
 * Lucide 图标工具库
 * 
 * 解决 Vue + Lucide DOM 冲突问题
 * 
 * ## 背景问题
 * 在 Vue 响应式区域使用 `data-lucide` + `lucide.createIcons()` 会导致：
 * - Vue 管理的 DOM 节点被 Lucide 直接修改
 * - 触发 __vnode 相关错误
 * - 动态渲染的图标可能丢失
 * 
 * ## 解决方案
 * 使用 `renderIcon()` 函数生成 SVG HTML 字符串，配合 `v-html` 指令使用
 * 
 * ## 使用方法
 * 
 * ### 1. 引入此文件
 * ```html
 * <script src="../../assets/js/lucide-utils.js"></script>
 * ```
 * 
 * ### 2. 在 Vue setup 中调用
 * ```javascript
 * const { renderIcon } = window.LucideUtils;
 * // 或者在 methods 中直接使用 LucideUtils.renderIcon
 * ```
 * 
 * ### 3. 在模板中使用
 * ```html
 * <!-- 静态图标 -->
 * <span v-html="renderIcon('settings', 'w-5 h-5 text-slate-600')"></span>
 * 
 * <!-- 动态图标 (v-if 控制) -->
 * <span v-if="isLoading" v-html="renderIcon('loader-2', 'w-5 h-5 animate-spin')"></span>
 * <span v-else v-html="renderIcon('check', 'w-5 h-5 text-green-600')"></span>
 * ```
 * 
 * ## 最佳实践
 * 
 * ### 何时使用 data-lucide (传统方式)
 * - 完全静态的区域 (不受 Vue 控制)
 * - 导航栏中的静态图标
 * - 页面加载后不会变化的图标
 * 
 * ### 何时使用 renderIcon (推荐)
 * - v-if / v-else 控制显示的图标
 * - v-for 循环渲染的图标
 * - 任何动态变化的图标
 * - watch / computed 触发更新的区域
 * 
 * ## 新版 Lucide API 兼容性
 * 
 * 本工具库已更新以兼容 Lucide 新版 API：
 * - 图标键名使用 kebab-case（如 'loader-2'）
 * - 图标格式为 [tag, attrs, children] 数组
 * - 不再使用已废弃的 toSvg() 方法
 * 
 * @version 1.1.0
 * @date 2026-01-10
 */

(function(global) {
    'use strict';

    /**
     * 将 kebab-case 转换为 PascalCase
     * 例如: 'loader-2' -> 'Loader2', 'arrow-left' -> 'ArrowLeft'
     * 
     * @param {string} str - kebab-case 字符串
     * @returns {string} - PascalCase 字符串
     */
    function kebabToPascal(str) {
        return str
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    }

    /**
     * 检查 Lucide 库是否已加载
     * 
     * @returns {boolean} - 是否可用
     */
    function isLucideAvailable() {
        return typeof lucide !== 'undefined' && lucide.icons;
    }

    /**
     * 渲染 Lucide 图标为 SVG HTML 字符串
     * 
     * 此函数是解决 Vue + Lucide DOM 冲突的核心方法。
     * 它直接返回 SVG 字符串，避免 Lucide 直接操作 Vue 管理的 DOM。
     * 
     * 【新版 Lucide API 说明】
     * - 图标键名使用 kebab-case（如 'loader-2'）
     * - 图标格式为 [tag, attrs, children] 数组
     * - 不再支持旧版的 icon.toSvg() 方法
     * 
     * @param {string} name - 图标名称 (kebab-case)，例如: 'loader-2', 'settings', 'arrow-left'
     * @param {string} [className='w-5 h-5'] - 应用到 SVG 的 CSS 类名
     * @returns {string} - SVG HTML 字符串，如果图标不存在则返回空字符串
     * 
     * @example
     * // 基础用法
     * renderIcon('settings')
     * // => '<svg class="w-5 h-5" ...></svg>'
     * 
     * // 自定义样式
     * renderIcon('loader-2', 'w-8 h-8 animate-spin text-blue-600')
     * // => '<svg class="w-8 h-8 animate-spin text-blue-600" ...></svg>'
     * 
     * // 在 Vue 模板中使用
     * // <span v-html="renderIcon('check', 'w-4 h-4 text-green-500')"></span>
     */
    function renderIcon(name, className = 'w-5 h-5') {
        // 检查 Lucide 是否可用
        if (!isLucideAvailable()) {
            console.warn('[LucideUtils] Lucide library not loaded. Make sure to include lucide before this script.');
            return '';
        }

        try {
            const icons = lucide.icons;
            
            // 1. 尝试查找图标
            let icon = icons[name];
            
            // 如果没找到，尝试将 kebab-case 转为 PascalCase (例如 'file-text' -> 'FileText')
            if (!icon) {
                const pascalName = kebabToPascal(name);
                icon = icons[pascalName];
            }
            
            if (!icon) {
                console.warn(`[LucideUtils] Icon "${name}" not found in Lucide icons.`);
                return '';
            }

            // 2. 处理新版 Lucide 格式 (Array: [tag, attrs, children])
            if (Array.isArray(icon)) {
                const [tag, attrs, children] = icon;
                
                // 将属性对象转为 HTML 属性字符串
                const svgAttrs = Object.entries(attrs)
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(' ');
                
                // 处理子元素（路径 path、线条 line、圆形 circle 等）
                const childrenHtml = (children || []).map(child => {
                    // 防御性编程：确保 child 是数组 [tag, attrs]
                    if (!Array.isArray(child)) return '';
                    
                    const [childTag, childAttrs] = child;
                    const childAttrsStr = Object.entries(childAttrs || {})
                        .map(([key, value]) => `${key}="${value}"`)
                        .join(' ');
                    return `<${childTag} ${childAttrsStr}></${childTag}>`;
                }).join('');
                
                return `<svg ${svgAttrs} class="${className}">${childrenHtml}</svg>`;
            }
            
            // 3. 处理旧版 Lucide 格式 (Object with toSvg)
            if (typeof icon.toSvg === 'function') {
                return icon.toSvg({ class: className });
            }
            
            return '';

        } catch (error) {
            console.error(`[LucideUtils] Error rendering icon "${name}":`, error);
            return '';
        }
    }

    /**
     * 批量渲染多个图标
     * 适用于需要预渲染一组图标的场景
     * 
     * @param {Array<{name: string, className?: string}>} icons - 图标配置数组
     * @returns {Object} - 图标名到 SVG 字符串的映射
     * 
     * @example
     * const icons = renderIcons([
     *   { name: 'settings', className: 'w-5 h-5' },
     *   { name: 'loader-2', className: 'w-5 h-5 animate-spin' }
     * ]);
     * // => { settings: '<svg...>', 'loader-2': '<svg...>' }
     */
    function renderIcons(icons) {
        const result = {};
        for (const { name, className } of icons) {
            result[name] = renderIcon(name, className);
        }
        return result;
    }

    /**
     * 获取所有可用的图标名称列表
     * 用于调试和开发时查看可用图标
     * 
     * @returns {string[]} - 图标名称数组 (PascalCase)
     */
    function getAvailableIcons() {
        if (!isLucideAvailable()) {
            return [];
        }
        return Object.keys(lucide.icons);
    }

    /**
     * 创建一个绑定了默认样式的 renderIcon 函数
     * 适用于整个工具需要统一图标大小的场景
     * 
     * @param {string} defaultClassName - 默认 CSS 类名
     * @returns {function} - 绑定了默认样式的 renderIcon 函数
     * 
     * @example
     * const renderSmallIcon = createIconRenderer('w-4 h-4');
     * renderSmallIcon('settings'); // 自动应用 'w-4 h-4'
     * renderSmallIcon('check', 'w-4 h-4 text-green-500'); // 可以覆盖
     */
    function createIconRenderer(defaultClassName = 'w-5 h-5') {
        return function(name, className) {
            return renderIcon(name, className || defaultClassName);
        };
    }

    // 导出到全局对象
    global.LucideUtils = {
        renderIcon,
        renderIcons,
        getAvailableIcons,
        createIconRenderer,
        isLucideAvailable,
        
        // 版本信息
        version: '1.1.0'
    };

    // 同时导出 renderIcon 作为全局函数，方便直接使用
    global.renderIcon = renderIcon;

})(typeof window !== 'undefined' ? window : this);
