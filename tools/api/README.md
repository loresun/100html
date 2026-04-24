# API 交易平台 - 公开 API 演示说明

本文件用于维护 API 交易平台内的页面、功能和接口来源，方便快速更新或扩展新的 API 演示场景。

## 页面导航

| 页面 | 入口 | 说明 |
| --- | --- | --- |
| 实时数据联动看板 | `api/live_dashboard.html` | 结合天气、加密行情、汇率的实时联动展示，提供 SVG 趋势线与组合指数。 |
| 公共 API 演示库 | `api/public_showcase.html` | 汇集人物、趣味、太空、语录等多个免费公开 API，支持独立刷新。 |
| DeepSeek 改写与提取 | `api/deepseek_lab.html` | 对接 DeepSeek API，实现内容润色、要点提取、关系抽取，并展示 R1 推理过程。 |
| API 导航首页 | `api/index.html` | 汇总入口 + 快速导航 + 标签说明。 |

## 已接入 API 列表

### 实时数据联动看板
- Open-Meteo 天气：`https://api.open-meteo.com/v1/forecast?latitude=31.2304&longitude=121.4737&current=temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m&timezone=auto`
- CoinGecko 加密行情：`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`
- ExchangeRate.host 汇率：`https://api.exchangerate.host/latest?base=USD&symbols=CNY,EUR`

### 公共 API 演示库
- RandomUser 随机人物：`https://randomuser.me/api/`
- NASA APOD 天文图片：`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`
- Bored API 趣味活动：`https://www.boredapi.com/api/activity`
- Quotable 灵感语录：`https://api.quotable.io/random`
- CatFact 猫咪冷知识：`https://catfact.ninja/fact`

### DeepSeek 改写与提取
- DeepSeek Chat Completions：`https://api.deepseek.com/chat/completions`

## 功能说明

- **自动刷新**：实时看板默认每 30 秒更新一次，可手动暂停。
- **手动刷新**：所有 API 卡片均提供独立刷新按钮。
- **组合联动指数**：实时看板使用天气舒适度 + 加密行情涨跌 + 汇率波动计算综合指数。
- **结构化输出**：DeepSeek 页面在“要点提取”和“关系抽取”模式下使用 JSON 输出格式，并渲染结构化条目。
- **推理过程展示**：选择 `deepseek-reasoner` 模型后，页面展示推理过程（`reasoning_content`）。

## 扩展建议

1. 增加更多免费 API（如交通、航班、公共开放数据）。
2. 新增联动公式，例如天气 + 热点 + 舆情指数等。
3. 在 DeepSeek 页面增加导出 JSON/Markdown 按钮。
