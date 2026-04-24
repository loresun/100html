# HTML/Web 开发进阶功能清单 (Advanced Web Capabilities)

本文档梳理了除了基础 API 调用和数据库交互之外，Web 前端可以实现的进阶功能维度。这些功能可以让工具不仅仅是静态页面，而是具备原生应用般体验的强大程序。

## 1. 实时通信与即时交互 (Real-time & Communication)
*   **WebSockets**: 实现真正的双向实时通信（如：在线聊天室、多人协作白板、实时股价/比分）。
*   **Server-Sent Events (SSE)**: 服务器向客户端单向推送流数据（如：ChatGPT 的打字机效果、系统通知）。
*   **WebRTC Peer-to-Peer**: 浏览器点对点通信，不通过服务器传输大量数据（如：视频通话、局域网文件传输工具）。

## 2. 本地存储与文件系统 (Storage & File System)
*   **IndexedDB**: 浏览器内置的 NoSQL 数据库，容量大（可达几百MB甚至GB），支持索引事务（如：离线笔记应用、复杂数据管理）。
*   **File System Access API**: 允许网页直接读取、编辑并**保存**用户本地文件，体验类似桌面编辑器（如：VSCode Web 版、图片批处理工具）。
*   **Origin Private File System (OPFS)**: 高性能的私有文件系统，适合处理大量或大文件访问。

## 3. 硬件与设备访问 (Hardware & Device Access)
*   **MediaDevices (Camera/Mic)**: 访问摄像头和麦克风（如：网页扫码、录音机、AR 面部特效）。
*   **Geolocation API**: 获取地理位置（如：跑步轨迹记录、周边服务查找）。
*   **Device Orientation & Motion**: 陀螺仪和加速度计（如：手机体感游戏、摇一摇功能）。
*   **Web Bluetooth**: 直接连接低功耗蓝牙设备（如：连接智能手环、心率带、蓝牙打印机）。
*   **Web Serial / Web USB**: 与串口设备或 USB 设备通讯（如：Arduino 刷写工具、硬件调试台）。
*   **Battery Status API**: 获取电池电量信息。
*   **Vibration API**: 控制手机震动反馈。

## 4. 高级图形与多媒体 (Graphics & Multimedia)
*   **Canvas API & OffscreenCanvas**: 高性能 2D 绘图（如：图片编辑器、图表库）。
*   **WebGL / WebGPU**: 硬件加速的 3D 图形渲染（如：3D 模型查看器、网页 3D 游戏）。常用库：Three.js, Babylon.js。
*   **Web Audio API**: 专业级音频处理（如：合成器、音频可视化频谱、即时变声器）。
*   **Picture-in-Picture API**: 画中画模式，允许视频窗口悬浮。
*   **Speech Recognition & Synthesis (Web Speech API)**: 语音识别（转文字）和语音合成（文字朗读）。

## 5. 性能与后台处理 (Performance & Background)
*   **Web Workers**: 开启多线程，将耗时计算（如：视频转码、大文件压缩）放在后台，不阻塞 UI 界面。
*   **WebAssembly (Wasm)**: 运行 C++/Rust 编译的高性能代码（如：FFmpeg 网页版、Photoshop 网页版引擎）。
*   **Service Workers**:
    *   **离线访问 (Offline Support)**: 断网也能打开网页。
    *   **资源缓存 (Caching)**: 秒开加载。
    *   **后台同步 (Background Sync)**: 恢复网络后自动发送数据。
    *   **推送通知 (Push API)**: 即使关闭网页也能收到系统级通知。

## 6. 现代 UI/UX 交互 (Modern Interaction)
*   **Drag and Drop API**: 原生文件拖拽上传、看板拖拽排序。
*   **Clipboard API**: 读写剪贴板（包括图片复制粘贴）。
*   **Intersection Observer**: 监听元素是否进入视野（如：图片懒加载、无限滚动加载）。
*   **Resize Observer**: 监听元素尺寸变化做出响应。
*   **View Transitions API**: 页面或组件切换时实现丝滑的过渡动画（原生支持）。

## 7. 安全与认证 (Security & Auth)
*   **Web Authentication API (WebAuthn)**: 调用设备生物识别（指纹、FaceID）进行无密码登录。

---

### 建议的“进阶”工具开发方向：

1.  **本地文件处理类**：利用 File System Access API 做一个本地 Markdown 编辑器或 CSV 编辑器，直接保存回原文件，无需下载。
2.  **离线实用工具包**：结合 Service Worker 和 IndexedDB，做一个断网也能用的个人记账本或日记本。
3.  **多媒体工具**：利用 Web Audio API 做一个白噪声生成器，或者利用 Canvas 做一个简单的图片滤镜处理台。
4.  **硬件交互 Demo**：利用陀螺仪做一个手机网页水平仪。
