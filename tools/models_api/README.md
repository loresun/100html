# Models API (多功能AI工作台)

这是一个专为 **Vibe Coding 新手**设计的配置驱动 AI 工具生成器。通过简单的 JSON 配置，即可快速构建各种 AI 应用，同时学习**动态加载与解析**的前端核心模式。

## ✨ 核心特性

### 1. 配置驱动 (JSON Config)
- 所有工具定义在 `prompts.json` 中
- 只需维护一份配置文件，无需修改 HTML 代码即可增加新功能
- 支持定义：系统提示词、输入字段、图标等

### 2. 主-详情双视图架构
- **主界面 (Home)**：展示 9 个功能卡片（九宫格布局）
- **详情界面 (Detail)**：点击卡片后跳转，动态渲染该工具的所有输入控件

### 3. 多种输入类型支持
| 类型 | JSON `type` | 描述 |
|------|-------------|------|
| 文本框 | `text` | 单行文本输入 |
| 长文本 | `textarea` | 多行文本输入 |
| 下拉菜单 | `select` | 单选下拉 |
| **滑块** | `range` | 支持 min/max/step，实时显示数值 |
| **多选组** | `checkbox_group` | 可选多个选项 |
| **单选组** | `radio_group` | 只能选一个选项 |

### 4. 教学说明区
主界面顶部包含"什么是动态加载与解析"的可视化教程，帮助新手理解：
- 如何从 JSON 读取配置
- 如何根据 `type` 字段动态渲染不同 UI 组件
- 如何无需修改 HTML 代码就能扩展功能

## 🚀 如何添加新工具

编辑 `prompts.json`，按以下格式添加：

```json
{
  "id": "new_tool_id",
  "icon": "star",           // Lucide 图标名称
  "name": "新工具名称",
  "description": "工具简介",
  "systemPrompt": "你是一个...",
  "inputs": [
    { "id": "field1", "label": "字段1", "type": "text", "required": true },
    { "id": "field2", "label": "字段2", "type": "range", "min": 1, "max": 10, "defaultValue": 5 },
    { "id": "field3", "label": "字段3", "type": "checkbox_group", "options": ["A", "B", "C"] }
  ]
}
```

## 📂 文件结构

- `index.html`: 主程序入口（Alpine.js 单页应用）
- `prompts.json`: 配置文件数据源
- `README.md`: 使用说明

## 🔗 技术栈

- **Alpine.js** v3.13.3 - 轻量响应式框架
- **Tailwind CSS** - Utility-first CSS
- **Lucide Icons** - 图标库
- **Marked.js** - Markdown 渲染
- **DeepSeek API** - AI 后端

