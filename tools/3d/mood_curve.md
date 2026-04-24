# Mood Curve 3D（心情曲线 3D）

## 目标
用一句话描述心情，调用 DeepSeek 生成一个「情绪曲线」方案，并渲染为 3D 曲线 + 粒子流。用户可以旋转视角、重新生成、保存为素材灵感。

## 交互
- 输入心情描述 → 点击「生成曲线」
- AI 返回 JSON 参数（曲线类型、幅度、频率、颜色、粒子密度等）
- 前端将参数转成 3D 曲线并生成沿曲线流动的粒子

## AI 输出规范（JSON）
```json
{
  "title": "一句诗意标题",
  "palette": ["#8B5CF6", "#22D3EE", "#F97316"],
  "curveType": "spiral | sine | helix",
  "amplitude": 1.4,
  "frequency": 2.2,
  "turns": 4.5,
  "energy": 0.78,
  "particleCount": 240,
  "glow": 0.7,
  "story": "一句话解释这条曲线表达的情绪"
}
```

## 渲染要点
- 颜色采用 palette 渐变
- 曲线材质自发光，粒子沿曲线流动
- 背景为深色星云渐变
- AI 标题与故事展示在卡片中
