# Task Decomposition

> 生成时间：2026-05-28 来源：SPEC.md v1.0 + VALIDATION.md v1.0 版本：v1.0

---

## Summary

- 任务总数: 20
- 波次数: 4
- 预估总工作量: ~11.7 agent-hours（串行）/ ~3.5 agent-hours（最大并行）

---

## DAG Overview

```
Wave 1: Foundation（基础设施，无外部依赖）
┌─────────────────────────────────────────────────────────────────┐
│  T-001 progress.js    T-002 quiz.js    T-003 nav.js 重写       │
│  T-004 common.css 扩展    T-005 stepper.js 扩展                │
└─────────────────────────────────────────────────────────────────┘
         │                    │                │
         ▼                    ▼                ▼
Wave 2: Content（内容页，依赖基础设施）
┌─────────────────────────────────────────────────────────────────┐
│  T-006 B1页面   T-007 B2页面   T-008 B3页面   T-009 B4页面     │
│  T-010 C1页面   T-011 C2页面   T-012 C3页面   T-013 C4页面     │
└─────────────────────────────────────────────────────────────────┘
         │                    │                │
         ▼                    ▼                ▼
Wave 3: Retrofit（现有页面微改，依赖基础设施）
┌─────────────────────────────────────────────────────────────────┐
│  T-014 现有页面微改-批次A（AI基础4页）                            │
│  T-015 现有页面微改-批次B（模型训练3页）                          │
│  T-016 现有页面微改-批次C（部署应用6页）                          │
│  T-017 现有页面微改-批次D（进阶应用3页）                          │
└─────────────────────────────────────────────────────────────────┘
         │                    │                │
         ▼                    ▼                ▼
Wave 4: Integration（集成，依赖所有内容完成）
┌─────────────────────────────────────────────────────────────────┐
│  T-018 index.html 首页重构                                      │
│  T-019 端到端集成验证与修复                                      │
│  T-020 跨浏览器/响应式/性能验收                                  │
└─────────────────────────────────────────────────────────────────┘

```

**依赖关系简表：**

- Wave 1：无外部依赖（全部可并行）
- Wave 2：每个任务依赖 T-003（nav.js）+ T-004（common.css）+ T-001（progress.js）+ T-002（quiz.js）+ T-005（stepper.js）
- Wave 3：每个任务依赖 T-001 + T-002 + T-003 + T-004 + T-005
- Wave 4：T-018 依赖 T-001 + T-003 + T-004 + 所有 Wave 2/3 完成；T-019 依赖全部前序任务；T-020 依赖 T-019

---

## Wave 1: Foundation（基础设施）

### T-001: progress.js — 学习进度管理模块

- **Goal**: 实现 `window.Progress` API，基于 localStorage 的学习进度持久化模块
- **Input**: SPEC §2.3 接口定义、§2.5 localStorage Schema、§3.2 数据结构
- **Output**: `progress.js`（1 个文件，< 5KB）
- **Validates**: V-013（全部 V-013-01 ~ V-013-08）, V-022（V-022-01 ~ V-022-03）
- **Depends**: none
- **Estimated effort**: 小（~20 min）

**实现要点**：

1. 暴露 `window.Progress` 对象含 `getStatus`/`markInProgress`/`markComplete`/`getTrackStats`/`getAll`/`reset` 方法
2. localStorage key 为 `llm_learning_progress`，JSON Schema 含 `version: 1`/`lastUpdated`/`pages`
3. pageId = 文件名去掉 `.html`
4. 容错：JSON 解析失败时静默降级为空数据
5. localStorage 容量满时 try-catch 静默失败
6. `getTrackStats(trackId)` 需读取 `NAV_CONFIG`（若未加载则返回合理默认值）

---

### T-002: quiz.js — Quiz 自测通用逻辑

- **Goal**: 实现 `window.Quiz` API，支持选择题和简答题两种题型
- **Input**: SPEC §2.4 接口定义、§3.3 Quiz 数据格式
- **Output**: `quiz.js`（1 个文件，< 5KB）
- **Validates**: V-014（全部 V-014-01 ~ V-014-07）
- **Depends**: none
- **Estimated effort**: 小（~25 min）

**实现要点**：

1. `Quiz.init(containerId, quizData, onPass)` — 在指定容器渲染题目
2. 选择题：点击选项立即判定对错，正确绿色/错误红色 + 正确答案高亮，显示解析
3. 简答题：输入框 + 提交按钮，包含 ≥ minKeywords 个关键词即为正确
4. 全部答对后回调 `onPass()`
5. 可无限重试（答错后可重新选择/重新输入）
6. quizData 为空数组时不渲染任何内容、不抛异常
7. 使用 `common.css` 中的 `.quiz-*` 样式类

---

### T-003: nav.js — 全局导航系统重写

- **Goal**: 重写导航系统，支持赛道分组、面包屑、键盘导航、SA 视角侧边栏
- **Input**: SPEC §2.1 NAV_CONFIG 定义、§5.2 nav.js 功能列表
- **Output**: `nav.js`（1 个文件）
- **Validates**: V-003（V-003-01 ~ V-003-04）, V-004（V-004-01 ~ V-004-05）, V-016（V-016-01 ~ V-016-03）, V-019（V-019-01 ~ V-019-03）, V-026（V-026-01 ~ V-026-04）
- **Depends**: none
- **Estimated effort**: 中（~40 min）

**实现要点**：

1. 导出 `window.NAV_CONFIG` 含三赛道完整数据（A: 4 组 16 页, B: 1 组 4 页, C: 1 组 4 页）
2. `renderBreadcrumb(currentFile)` — 渲染面包屑「赛道 A · AI 基础 > 神经网络基础」
3. Alt+←/→ 在**当前赛道内**顺序导航（到末尾循环回首页或停留）
4. H 键回首页（焦点在 input 时不触发）
5. 渲染 Home 按钮 + 底部 `.nav-hint` 导航提示
6. `renderSATip(currentFile, tips)` — 赛道 A 页面在对应步骤显示 SA 侧边栏，赛道 B/C 不显示
7. 未知页面不崩溃（面包屑不显示或显示默认值）
8. 自动执行：DOMContentLoaded 时调用 renderBreadcrumb + 注册键盘监听

---

### T-004: common.css — 样式扩展

- **Goal**: 在现有 common.css 末尾追加赛道/进度条/Quiz/首页卡片等新样式
- **Input**: SPEC §5.4 新增样式列表、现有 `common.css` 文件
- **Output**: `common.css`（修改 1 个文件，仅追加内容）
- **Validates**: V-018（V-018-01, V-018-02）, V-029（V-029-01, V-029-02）
- **Depends**: none
- **Estimated effort**: 小（~20 min）

**实现要点**：

1. **不修改**已有 `.feynman`、`.nav-hint` 等任何现有规则
2. 在文件末尾用注释分隔后追加：- `.breadcrumb` — 面包屑导航
- `.track-badge` — 赛道标识 badge
- `.progress-bar-track` / `.progress-fill` — 赛道进度条
- `.sa-tip-sidebar` / `.sa-tip-content` — SA 提示侧边栏（可折叠）
- `.quiz-container` / `.quiz-question` / `.quiz-options` / `.quiz-option` / `.quiz-option.correct` / `.quiz-option.wrong` / `.quiz-input` / `.quiz-explanation` / `.quiz-result`
- `.track-card` / `.track-card-header` / `.track-progress` / `.page-status-icon`
- `.related-topics` / `.related-topic-link`
3. 赛道 B 主色 `#ffa500`，赛道 C 主色 `#c864ff`，赛道 A 主色 `#00d2ff`
4. 保持深色渐变背景风格、发光卡片、圆角设计
5. 响应式：≥768px 最佳，≥375px 不破碎

---

### T-005: stepper.js — 进度回调与 Quiz 触发扩展

- **Goal**: 在现有 stepper.js 中追加 onComplete 回调、pageId 标记和 enableQuiz 触发逻辑
- **Input**: SPEC §2.2 扩展接口、§5.3 新增逻辑、现有 `stepper.js` 文件
- **Output**: `stepper.js`（修改 1 个文件，仅追加逻辑）
- **Validates**: V-015（V-015-01 ~ V-015-04）, V-027（V-027-01 ~ V-027-03）
- **Depends**: none
- **Estimated effort**: 小（~20 min）

**实现要点**：

1. **不改动** `initStepper(stages, options)` 的签名和内部步骤切换核心逻辑
2. 新增 `options.onComplete` / `options.pageId` / `options.enableQuiz` / `options.quizData`
3. 用户到达最后一步时：调用 `Progress.markInProgress(pageId)` + 触发 `onComplete`
4. 若 `enableQuiz && quizData.length > 0`：在最后一步内容下方调用 `Quiz.init()`
5. Quiz 全部通过后调用 `Progress.markComplete(pageId)`
6. **向后兼容**：旧调用 `initStepper(stages, { interval: 5000 })` 不传新参数时正常工作

---

## Wave 2: Content（新增学习专题页）

### T-006: B1 — AWS AI/ML 服务全景图

- **Goal**: 创建 B1 专题页，8 个交互步骤，覆盖 AWS AI/ML 三层架构
- **Input**: SPEC §4.1 完整大纲、SPEC §5.5 统一引用结构
- **Output**: `b1-aws-ai-services.html`（1 个文件）
- **Validates**: V-005（V-005-01 ~ V-005-04）, V-020（V-020-01）, V-029-01, V-030-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 大（~45 min）

**实现要点**：

1. 引用 common.css + progress.js + quiz.js + nav.js + stepper.js
2. 8 步骤 Stepper：全景鸟瞰 → AI Services → Bedrock → SageMaker → 基础设施 → 选型决策树（交互式）→ 集成模式 → 费曼总结
3. 主色调 `#ffa500`（橙色系），使用 `.track-badge` 标注赛道 B
4. 步骤 6 实现可点击决策树交互
5. 步骤 8 包含 `.feynman` 样式区块
6. 页面底部含 quizData（2-3 道题）+ initStepper 配置 pageId/enableQuiz
7. 包含 `.related-topics` 区域链接到 B2

---

### T-007: B2 — AI Workload 架构模式

- **Goal**: 创建 B2 专题页，8 个交互步骤，展示 AWS AI 架构参考模式
- **Input**: SPEC §4.2 完整大纲
- **Output**: `b2-architecture-patterns.html`（1 个文件）
- **Validates**: V-006（V-006-01 ~ V-006-03）, V-020-02, V-029-01, V-030-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 大（~45 min）

**实现要点**：

1. 8 步骤：参考架构 → RAG 架构 → Fine-tuning → 实时推理 → 批量推理 → Agent 架构 → 多区域/灾备 → 决策矩阵
2. 每步一个架构图（纯 HTML/CSS 方块+箭头动画）
3. 步骤 8 可交互高亮行的对比表格
4. 含 quizData + `.related-topics`

---

### T-008: B3 — 成本优化与选型

- **Goal**: 创建 B3 专题页，7 个交互步骤，覆盖 AI 成本优化策略
- **Input**: SPEC §4.3 完整大纲
- **Output**: `b3-cost-optimization.html`（1 个文件）
- **Validates**: V-007（V-007-01 ~ V-007-03）, V-020-02, V-029-01, V-030-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 大（~45 min）

**实现要点**：

1. 7 步骤：成本构成 → GPU 选型（柱状图动画）→ Serverless vs 自建（成本计算器）→ 预留与 Spot → 推理优化 → 成本监控 → 费曼总结
2. 步骤 2 实现性价比柱状图动画
3. 步骤 3 实现简易成本计算器（输入 QPS → 估算月费）
4. 含 quizData + `.related-topics`

---

### T-009: B4 — 安全合规

- **Goal**: 创建 B4 专题页，7 个交互步骤，覆盖 AI 安全合规
- **Input**: SPEC §4.4 完整大纲
- **Output**: `b4-security-compliance.html`（1 个文件）
- **Validates**: V-008（V-008-01 ~ V-008-03）, V-020-02, V-029-01, V-030-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 大（~45 min）

**实现要点**：

1. 7 步骤：安全全景（洋葱分层图）→ IAM → 网络隔离（VPC 拓扑动画）→ 数据加密 → Responsible AI → Model Governance → 合规框架
2. 步骤 1 实现安全分层洋葱模型可视化
3. 步骤 3 实现 VPC 网络拓扑动画
4. 含 quizData + `.related-topics`

---

### T-010: C1 — Multi-Agent 架构模式

- **Goal**: 创建 C1 专题页，8 个交互步骤，覆盖多 Agent 架构设计
- **Input**: SPEC §4.5 完整大纲
- **Output**: `c1-multi-agent.html`（1 个文件）
- **Validates**: V-009（V-009-01 ~ V-009-03）, V-020-02, V-029-02, V-030-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 大（~45 min）

**实现要点**：

1. 8 步骤：为什么多 Agent → 角色分工模式 → 通信模式（消息流转动画）→ 编排拓扑 → 状态管理 → 错误处理 → 真实案例 → 设计原则
2. 步骤 2-4 每种模式用动画展示消息流转
3. 步骤 7 案例架构图
4. 主色调 `#c864ff`（紫色系）
5. 含 quizData + `.related-topics`

---

### T-011: C2 — Agent 编排框架对比

- **Goal**: 创建 C2 专题页，7 个交互步骤，对比主流 Agent 框架
- **Input**: SPEC §4.6 完整大纲
- **Output**: `c2-agent-frameworks.html`（1 个文件）
- **Validates**: V-010（V-010-01 ~ V-010-03）, V-020-02, V-029-02, V-030-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 大（~45 min）

**实现要点**：

1. 7 步骤：框架全景时间线 → LangGraph → CrewAI → AutoGen/AG2 → Bedrock Agents → Strands+Q → 选型决策矩阵
2. 步骤 2-6 每个框架核心架构图
3. 步骤 7 交互式雷达图或对比表格
4. 主色调 `#c864ff`
5. 含 quizData + `.related-topics`

---

### T-012: C3 — Agent 评估与可观测性

- **Goal**: 创建 C3 专题页，7 个交互步骤，覆盖 Agent 评估方法论
- **Input**: SPEC §4.7 完整大纲
- **Output**: `c3-agent-evaluation.html`（1 个文件）
- **Validates**: V-011（V-011-01 ~ V-011-03）, V-020-02, V-029-02, V-030-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 大（~45 min）

**实现要点**：

1. 7 步骤：Agent Eval 难点 → 评估维度 → 方法论 → Trace 瀑布图（动画）→ 三支柱架构图 → 持续监控 → 最佳实践
2. 步骤 4 实现 Trace 瀑布图动画（展示调用链）
3. 步骤 5 三支柱 Metrics/Logs/Traces 关系图
4. 主色调 `#c864ff`
5. 含 quizData + `.related-topics`

---

### T-013: C4 — 企业级 Agent 部署

- **Goal**: 创建 C4 专题页，7 个交互步骤，覆盖企业 Agent 部署最佳实践
- **Input**: SPEC §4.8 完整大纲
- **Output**: `c4-enterprise-agent.html`（1 个文件）
- **Validates**: V-012（V-012-01 ~ V-012-03）, V-020-02, V-029-02, V-030-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 大（~45 min）

**实现要点**：

1. 7 步骤：企业 vs 个人 → 安全沙箱（隔离层级图）→ 权限控制 → 成本管理 → 规模化部署 → 运维故障处理 → 完整参考架构
2. 步骤 2 沙箱隔离层级可视化
3. 步骤 7 完整企业 Agent 平台架构图动画
4. 主色调 `#c864ff`
5. 含 quizData + `.related-topics`

---

## Wave 3: Retrofit（现有页面微改）

### T-014: 现有页面微改 — 批次 A（AI 基础 4 页）

- **Goal**: 为 neural-network / transformer / pre-training / scaling-laws 追加进度追踪、Quiz、SA 提示和相关专题链接
- **Input**: SPEC §5.5 统一改动模板、§3.4 SA 视角数据、现有 4 个 HTML 文件
- **Output**: 修改 4 个文件：`neural-network.html`、`transformer.html`、`pre-training.html`、`scaling-laws.html`
- **Validates**: V-017（V-017-01 ~ V-017-04）, V-016-01, V-021（V-021-01, V-021-02）, V-025-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 中（~30 min）

**统一改动内容**（每个页面）：

1. `<head>` 中追加 `<link rel="stylesheet" href="common.css">`（如果已有则保留）
2. `</head>` 前追加 `<script src="progress.js"></script>` + `<script src="quiz.js"></script>`
3. 在 `</body>` 前追加 `<script src="nav.js"></script>`
4. 追加内联 `<script>` 定义 `quizData`（2-3 道题）和 `saTips`（1-2 条 SA 提示）
5. 在现有 Stepper 初始化中追加 `pageId` / `enableQuiz` / `quizData` / `onComplete` 参数
6. 追加 `.related-topics` HTML 区域
7. **不改动** stages 数组内容和 viz() 可视化逻辑
8. **不引入**任何外部 CDN 依赖

---

### T-015: 现有页面微改 — 批次 B（模型训练 3 页）

- **Goal**: 为 sft / rlhf / rl-reasoning 追加进度追踪、Quiz、SA 提示和相关专题链接
- **Input**: 同 T-014
- **Output**: 修改 3 个文件：`sft.html`、`rlhf.html`、`rl-reasoning.html`
- **Validates**: V-017（V-017-01 ~ V-017-04）, V-016-01, V-021-01, V-025-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 小（~20 min）

**改动内容**：同 T-014 统一模板。

---

### T-016: 现有页面微改 — 批次 C（部署应用 6 页）

- **Goal**: 为 bedrock-overview / inference / rag / prompt-engineering / evaluation / mcp 追加进度追踪、Quiz 和相关专题链接
- **Input**: 同 T-014
- **Output**: 修改 6 个文件：`bedrock-overview.html`、`inference.html`、`rag.html`、`prompt-engineering.html`、`evaluation.html`、`mcp.html`
- **Validates**: V-017（V-017-01 ~ V-017-04）, V-016-01, V-021-01, V-025-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 中（~30 min）

**改动内容**：同 T-014 统一模板。

---

### T-017: 现有页面微改 — 批次 D（进阶应用 3 页）

- **Goal**: 为 multimodal / agent / guardrails 追加进度追踪、Quiz 和相关专题链接
- **Input**: 同 T-014
- **Output**: 修改 3 个文件：`multimodal.html`、`agent.html`、`guardrails.html`
- **Validates**: V-017（V-017-01 ~ V-017-04）, V-016-01, V-021-01, V-025-01
- **Depends**: T-001, T-002, T-003, T-004, T-005
- **Estimated effort**: 小（~20 min）

**改动内容**：同 T-014 统一模板。

---

## Wave 4: Integration（集成与首页）

### T-018: index.html — 首页完全重构

- **Goal**: 重写首页，实现三赛道 Tab 切换、进度条渲染、专题卡片展示
- **Input**: SPEC §5.1 首页结构、§5.1 UI 规格、progress.js API
- **Output**: `index.html`（1 个文件，完全重写）
- **Validates**: V-001（V-001-01 ~ V-001-05）, V-002（V-002-01 ~ V-002-03）, V-028（V-028-01 ~ V-028-04）
- **Depends**: T-001, T-003, T-004（直接依赖）；T-006 ~ T-017 全部完成（确保链接目标存在）
- **Estimated effort**: 中（~40 min）

**实现要点**：

1. 引用 common.css + progress.js + nav.js
2. Header：标题 + 副标题 + 统计 badge（总专题数/总步骤数）
3. Track Selector：三个 Tab（A/B/C），对应颜色，可切换
4. Track Detail：展开后显示分组卡片 + 每赛道进度条
5. 卡片右上角状态 icon（✅ 已完成 / 📖 学习中 / ○ 未开始）
6. 从 `Progress.getAll()` 和 `Progress.getTrackStats()` 读取渲染
7. localStorage 无数据时优雅降级（所有卡片为○，进度条 0%）
8. localStorage 数据损坏时不崩溃（捕获异常，按空数据处理）
9. 桌面端三列布局（≥768px），移动端纵向堆叠
10. 深色渐变背景风格与现有专题页一致
11. 底部键盘快捷键提示

---

### T-019: 端到端集成验证与修复

- **Goal**: 启动本地 HTTP 服务器，按 VALIDATION.md 的 P0/P1 条目逐条验证，修复发现的集成问题
- **Input**: VALIDATION.md 全部 P0 + P1 条目、所有已产出文件
- **Output**: `INTEGRATION_REPORT.md`（验证报告，标注 PASS/FAIL/FIXED）
- **Validates**: V-017-04, V-025-01, V-025-02, V-030-01（及所有前序验收项的集成复验）
- **Depends**: T-001 ~ T-018 全部完成
- **Estimated effort**: 中（~35 min）

**验证清单**：

1. 文件清单完整性（10 个新文件全部存在）
2. NAV_CONFIG 24 个页面全部可达
3. 键盘导航在每个赛道内正常工作
4. 首页三赛道切换 + 进度条实时反映
5. 任一专题页完整学习流程（进入 → 最后一步 → Quiz → 标记完成）
6. 返回首页确认状态更新
7. 无外部网络请求
8. 无 JS 控制台报错

---

### T-020: 跨浏览器/响应式/性能验收

- **Goal**: 在 Chrome/Safari/Firefox 三浏览器和不同屏幕宽度下验证，确保性能指标达标
- **Input**: VALIDATION.md V-023（性能）、V-024（兼容性）、V-028（视觉规格）
- **Output**: `PERF_REPORT.md`（性能和兼容性报告）
- **Validates**: V-023（V-023-01 ~ V-023-05）, V-024（V-024-01 ~ V-024-04）, V-025-02, V-028-01, V-028-02
- **Depends**: T-019
- **Estimated effort**: 小（~20 min）

**验证清单**：

1. Chrome/Safari/Firefox 各打开首页 + 1 个 B 页面 + 1 个 C 页面 + 1 个旧页面
2. 375px / 768px / 1280px 三档宽度下布局不破碎
3. DOMContentLoaded < 1.5s（首页）/ < 1s（专题页）
4. progress.js + quiz.js 合计 < 10KB
5. 步骤切换动画无明显卡顿

---

## Validation Coverage Matrix

以下矩阵确保每个 V-xxx 至少被一个任务覆盖：

| V-xxx | 任务 | 优先级 |
| --- | --- | --- |
| V-001 | T-018 | P0 |
| V-002 | T-018 | P1 |
| V-003 | T-003 | P0 |
| V-004 | T-003 | P0 |
| V-005 | T-006 | P1 |
| V-006 | T-007 | P1 |
| V-007 | T-008 | P1 |
| V-008 | T-009 | P1 |
| V-009 | T-010 | P1 |
| V-010 | T-011 | P1 |
| V-011 | T-012 | P1 |
| V-012 | T-013 | P1 |
| V-013 | T-001 | P1 |
| V-014 | T-002 | P1 |
| V-015 | T-005 | P1 |
| V-016 | T-003, T-014~T-017 | P1 |
| V-017 | T-014~T-017, T-019 | P0 |
| V-018 | T-004 | P1 |
| V-019 | T-003 | P1 |
| V-020 | T-006~T-013 | P1 |
| V-021 | T-014~T-017 | P1 |
| V-022 | T-001 | P1 |
| V-023 | T-020 | P2 |
| V-024 | T-020 | P2 |
| V-025 | T-019, T-020 | P2 |
| V-026 | T-003 | P1 |
| V-027 | T-005, T-014~T-017 | P1 |
| V-028 | T-018, T-020 | P2 |
| V-029 | T-006~T-013 | P2 |
| V-030 | T-006~T-013, T-001, T-002, T-019 | P0 |

✅ 全部 30 个 V-xxx 均已覆盖。

---

## 执行策略建议

### 并行度

| 波次 | 可并行任务数 | 建议 Agent 数 |
| --- | --- | --- |
| Wave 1 | 5 | 5（全部并行） |
| Wave 2 | 8 | 8（全部并行） |
| Wave 3 | 4 | 4（全部并行） |
| Wave 4 | 3 | 串行执行（T-018 → T-019 → T-020） |

### 关键路径

```
T-003 (nav.js) → T-006~T-013 (新页面) → T-018 (首页) → T-019 (集成验证) → T-020 (性能验收)

```

最长路径预估：40min + 45min + 40min + 35min + 20min = **3 agent-hours**（串行情况）

### 风险点

1. **stepper.js 兼容性**：部分现有页面可能使用内联 Stepper 而非引用 stepper.js，微改时需确认实际实现方式（采用方案 A：保留内联，仅追加 progress 调用）
2. **NAV_CONFIG 与实际文件不一致**：Wave 2 产出的文件名必须与 nav.js 中定义完全一致
3. **首页依赖完整数据**：T-018 需要所有页面都已存在才能验证链接不 404

---

## 待确认事项（继承自 SPEC）

| # | 问题 | 建议默认值 | 影响任务 |
| --- | --- | --- | --- |
| Q1 | 现有页面是否统一重构为引用 stepper.js？ | 方案 A（保留内联，最小改动） | T-014~T-017 |
| Q2 | B/C 页面可视化用纯 HTML/CSS 还是 SVG？ | 纯 HTML/CSS（与现有一致） | T-006~T-013 |
| Q3 | 相关专题链接硬编码还是集中管理？ | 硬编码在各页面 | T-014~T-017 |
| Q4 | Quiz 答错是否允许重试？ | 无限重试 | T-002 |
| Q5 | SA 侧边栏默认展开还是折叠？ | 默认展开、可折叠 | T-003 |
| Q6 | 首页三赛道并排还是纵向？ | 桌面三列、移动端纵向 | T-018 |

