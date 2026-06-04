# Validation Contract

> 生成时间：2026-05-28
> 来源：SPEC.md v1.0
> 版本：v1.0

---

## Summary

- 功能点总数: 30
- 验收条件总数: 105
- 优先级分布: P0: 19 (18%), P1: 69 (66%), P2: 17 (16%)

---

## V-001: 首页三赛道展示

- Priority: P0
- Source: SPEC §5.1 index.html 重写

### 正常路径

- **V-001-01** 三赛道卡片可见
  - Given: 用浏览器打开 `index.html`
  - When: 页面加载完成
  - Then: 可见三个赛道区域，分别标注"AI 基础能力"（蓝色 #00d2ff）、"SA 能力"（橙色 #ffa500）、"Agent 能力"（紫色 #c864ff）

- **V-001-02** 赛道内专题列表完整
  - Given: 首页加载完成
  - When: 点击或切换到赛道 A 的 Tab
  - Then: 显示 4 个分组（AI 基础、模型训练、部署应用、进阶应用），共 16 个专题卡片

- **V-001-03** 赛道 B/C 专题数量
  - Given: 首页加载完成
  - When: 切换到赛道 B Tab
  - Then: 显示 4 个专题（B1-B4）
  - When: 切换到赛道 C Tab
  - Then: 显示 4 个专题（C1-C4）

- **V-001-04** 卡片点击跳转
  - Given: 首页赛道 B 展开
  - When: 点击 B1 卡片
  - Then: 成功跳转到 `b1-aws-ai-services.html`，无 404 错误

### 异常/边界

- **V-001-05** localStorage 无数据时首页渲染
  - Given: 清空 localStorage（DevTools → Application → Clear）
  - When: 刷新 `index.html`
  - Then: 三赛道正常显示，所有卡片状态为"未开始"（○ 图标），进度条为 0%

---

## V-002: 首页进度条渲染

- Priority: P1
- Source: SPEC §5.1 index.html, §2.3 progress.js

### 正常路径

- **V-002-01** 进度条反映实际数据
  - Given: 在 DevTools Console 执行 `Progress.markComplete('neural-network'); Progress.markComplete('transformer');`
  - When: 刷新 `index.html`
  - Then: 赛道 A 进度条显示"已完成 2 / 16"，填充比例 ≈ 12.5%

- **V-002-02** 各赛道独立进度
  - Given: 赛道 A 有 2 个完成，赛道 B 有 0 个完成
  - When: 查看首页
  - Then: 赛道 A 显示 2/16，赛道 B 显示 0/4，互不影响

### 异常/边界

- **V-002-03** 进度数据损坏时的容错
  - Given: 在 DevTools Console 执行 `localStorage.setItem('llm_learning_progress', 'invalid json')`
  - When: 刷新 `index.html`
  - Then: 页面不崩溃（无 JS 报错），进度条显示 0%，行为等同于无数据

---

## V-003: nav.js 赛道分组导航

- Priority: P0
- Source: SPEC §2.1 NAV_CONFIG, §5.2 nav.js 重写

### 正常路径

- **V-003-01** 面包屑导航正确显示
  - Given: 打开 `neural-network.html`
  - When: 页面加载完成
  - Then: 页面顶部显示面包屑 "赛道 A · AI 基础 > 神经网络基础"（或等效格式）

- **V-003-02** 所有页面可达
  - Given: 从 `index.html` 出发
  - When: 依次通过导航/链接访问 NAV_CONFIG 中定义的全部 24 个页面
  - Then: 每个页面均正常加载（无 404、无 JS 报错）

- **V-003-03** 新增页面 B1-B4、C1-C4 被导航收录
  - Given: 打开 `b1-aws-ai-services.html`
  - When: 页面加载完成
  - Then: 面包屑显示"赛道 B · SA 专题 > AWS AI/ML 服务全景图"
  - When: 使用 Alt+→ 导航
  - Then: 跳转到 `b2-architecture-patterns.html`

### 异常/边界

- **V-003-04** 未知页面不崩溃
  - Given: 创建一个 `test-unknown.html` 引用 `nav.js`
  - When: 打开该页面
  - Then: nav.js 不抛出异常，面包屑可以不显示或显示默认值

---

## V-004: 键盘快捷键导航

- Priority: P0
- Source: SPEC §5.2 nav.js（保留 Alt+←/→、H 键）

### 正常路径

- **V-004-01** Alt+→ 前进
  - Given: 打开 `neural-network.html`（赛道 A 第一个专题）
  - When: 按下 Alt+→
  - Then: 页面跳转到 `transformer.html`（赛道 A 第二个专题）

- **V-004-02** Alt+← 后退
  - Given: 打开 `transformer.html`
  - When: 按下 Alt+←
  - Then: 页面跳转到 `neural-network.html`

- **V-004-03** H 键回首页
  - Given: 打开任意专题页面
  - When: 按下 H 键（焦点不在输入框内时）
  - Then: 跳转到 `index.html`

- **V-004-04** 赛道内循环导航
  - Given: 打开 `b4-security-compliance.html`（赛道 B 最后一页）
  - When: 按下 Alt+→
  - Then: 回到 `b1-aws-ai-services.html`（赛道 B 第一页）或停留在最后一页（不跳到赛道 C）

### 异常/边界

- **V-004-05** 输入框中按 H 不触发导航
  - Given: 打开任意带 Quiz 简答题的页面，焦点在输入框内
  - When: 输入字母 H
  - Then: 字母 H 正常输入到文本框，不触发页面跳转

---

## V-005: B1 — AWS AI/ML 服务全景图

- Priority: P1
- Source: SPEC §4.1

### 正常路径

- **V-005-01** 页面加载与步骤数
  - Given: 打开 `b1-aws-ai-services.html`
  - When: 页面加载完成
  - Then: Stepper 显示 8 个步骤，当前处于第 1 步

- **V-005-02** 交互式决策树
  - Given: 导航到步骤 6（选型决策树）
  - When: 点击决策树中的选项路径
  - Then: 高亮对应推荐的 AWS 服务，可点击切换路径

- **V-005-03** 费曼总结
  - Given: 导航到步骤 8（费曼总结）
  - When: 查看内容
  - Then: 用"工厂"类比总结三层关系，包含 `.feynman` 样式区块

### 异常/边界

- **V-005-04** 步骤切换动画流畅
  - Given: 打开 `b1-aws-ai-services.html`
  - When: 快速连续点击下一步 5 次
  - Then: 每次切换无闪烁、无白屏，动画过渡流畅

---

## V-006: B2 — AI Workload 架构模式

- Priority: P1
- Source: SPEC §4.2

### 正常路径

- **V-006-01** 页面加载与步骤数
  - Given: 打开 `b2-architecture-patterns.html`
  - When: 页面加载完成
  - Then: Stepper 显示 8 个步骤

- **V-006-02** 架构图可视化
  - Given: 导航到步骤 2（RAG 架构模式）
  - When: 查看可视化区域
  - Then: 显示 Knowledge Base + Bedrock + 向量数据库的架构图（方块+箭头）

- **V-006-03** 架构决策矩阵
  - Given: 导航到步骤 8（架构决策矩阵）
  - When: 查看内容
  - Then: 显示延迟/成本/复杂度权衡对比表格，可交互高亮行

---

## V-007: B3 — 成本优化与选型

- Priority: P1
- Source: SPEC §4.3

### 正常路径

- **V-007-01** 页面加载与步骤数
  - Given: 打开 `b3-cost-optimization.html`
  - When: 页面加载完成
  - Then: Stepper 显示 7 个步骤

- **V-007-02** 实例性价比可视化
  - Given: 导航到步骤 2（GPU 实例选型）
  - When: 查看可视化区域
  - Then: 显示柱状图或对比图展示 P5/P4d/G5/G6/Trn1/Inf2 性价比

- **V-007-03** 成本计算器交互
  - Given: 导航到步骤 3（Serverless vs 自建）
  - When: 存在成本计算器交互元素（输入 QPS / 并发数）
  - Then: 输入数值后显示估算月费结果

---

## V-008: B4 — 安全合规

- Priority: P1
- Source: SPEC §4.4

### 正常路径

- **V-008-01** 页面加载与步骤数
  - Given: 打开 `b4-security-compliance.html`
  - When: 页面加载完成
  - Then: Stepper 显示 7 个步骤

- **V-008-02** 安全分层可视化
  - Given: 导航到步骤 1（AI 安全全景）
  - When: 查看可视化区域
  - Then: 显示分层安全模型图（数据安全 + 模型安全 + 运行时安全）

- **V-008-03** VPC 网络拓扑动画
  - Given: 导航到步骤 3（网络隔离）
  - When: 页面渲染完成
  - Then: 显示 VPC 拓扑图，含 PrivateLink、NAT 等组件

---

## V-009: C1 — Multi-Agent 架构模式

- Priority: P1
- Source: SPEC §4.5

### 正常路径

- **V-009-01** 页面加载与步骤数
  - Given: 打开 `c1-multi-agent.html`
  - When: 页面加载完成
  - Then: Stepper 显示 8 个步骤

- **V-009-02** 通信模式动画
  - Given: 导航到步骤 3（通信模式）
  - When: 查看动画可视化
  - Then: 展示消息传递/共享状态/黑板模式的动态流转动画

- **V-009-03** 设计原则总结
  - Given: 导航到步骤 8（设计原则）
  - When: 查看内容
  - Then: 列出"最小 Agent 原则"、"单一职责"、"明确边界"等设计要点

---

## V-010: C2 — Agent 编排框架对比

- Priority: P1
- Source: SPEC §4.6

### 正常路径

- **V-010-01** 页面加载与步骤数
  - Given: 打开 `c2-agent-frameworks.html`
  - When: 页面加载完成
  - Then: Stepper 显示 7 个步骤

- **V-010-02** 框架对比可视化
  - Given: 导航到步骤 7（选型决策矩阵）
  - When: 查看内容
  - Then: 显示场景 × 框架推荐的对比表格或雷达图

- **V-010-03** 框架架构图
  - Given: 导航到步骤 2（LangGraph）
  - When: 查看可视化
  - Then: 显示 LangGraph 图状态机核心架构图

---

## V-011: C3 — Agent 评估与可观测性

- Priority: P1
- Source: SPEC §4.7

### 正常路径

- **V-011-01** 页面加载与步骤数
  - Given: 打开 `c3-agent-evaluation.html`
  - When: 页面加载完成
  - Then: Stepper 显示 7 个步骤

- **V-011-02** Trace 瀑布图动画
  - Given: 导航到步骤 4（Trace 与调试）
  - When: 查看可视化
  - Then: 展示一次 Agent 执行的完整调用链瀑布图动画

- **V-011-03** 三支柱架构图
  - Given: 导航到步骤 5（可观测性架构）
  - When: 查看内容
  - Then: 显示 Metrics/Logs/Traces 三支柱关系图

---

## V-012: C4 — 企业级 Agent 部署

- Priority: P1
- Source: SPEC §4.8

### 正常路径

- **V-012-01** 页面加载与步骤数
  - Given: 打开 `c4-enterprise-agent.html`
  - When: 页面加载完成
  - Then: Stepper 显示 7 个步骤

- **V-012-02** 沙箱隔离可视化
  - Given: 导航到步骤 2（安全沙箱）
  - When: 查看可视化
  - Then: 显示沙箱隔离层级图（工具权限白名单、容器/Lambda、网络隔离）

- **V-012-03** 企业架构参考图
  - Given: 导航到步骤 7（案例）
  - When: 查看可视化
  - Then: 显示完整的企业 Agent 平台参考架构图

---

## V-013: progress.js 学习进度追踪

- Priority: P1
- Source: SPEC §2.3, §2.5 localStorage Schema

### 正常路径

- **V-013-01** getStatus 返回正确状态
  - Given: localStorage 中无任何数据
  - When: 在 Console 执行 `Progress.getStatus('neural-network')`
  - Then: 返回 `'not_started'`

- **V-013-02** markInProgress 写入
  - Given: `neural-network` 状态为 not_started
  - When: 执行 `Progress.markInProgress('neural-network')`
  - Then: `Progress.getStatus('neural-network')` 返回 `'in_progress'`；localStorage 中 `llm_learning_progress` 存在且 JSON 解析后 `pages['neural-network'].status === 'in_progress'`

- **V-013-03** markComplete 写入
  - Given: `neural-network` 状态为 in_progress
  - When: 执行 `Progress.markComplete('neural-network')`
  - Then: `Progress.getStatus('neural-network')` 返回 `'completed'`

- **V-013-04** getTrackStats 统计准确
  - Given: 赛道 A 中 `neural-network` 已完成、`transformer` 学习中、其余未开始
  - When: 执行 `Progress.getTrackStats('A')`
  - Then: 返回 `{ total: 16, completed: 1, inProgress: 1 }`

- **V-013-05** reset 单页面
  - Given: `neural-network` 状态为 completed
  - When: 执行 `Progress.reset('neural-network')`
  - Then: `Progress.getStatus('neural-network')` 返回 `'not_started'`

- **V-013-06** reset 全部
  - Given: 多个页面有进度数据
  - When: 执行 `Progress.reset()`（无参数）
  - Then: `Progress.getAll()` 返回所有页面状态为 not_started，或返回空对象

### 异常/边界

- **V-013-07** localStorage 被清空后的行为
  - Given: 调用 `localStorage.clear()`
  - When: 执行 `Progress.getStatus('neural-network')`
  - Then: 返回 `'not_started'`，不抛出异常

- **V-013-08** localStorage 容量限制处理
  - Given: localStorage 接近配额限制（模拟：先填充 5MB 数据）
  - When: 执行 `Progress.markComplete('neural-network')`
  - Then: 不抛出未捕获异常；要么写入成功要么静默失败

---

## V-014: quiz.js 自测功能

- Priority: P1
- Source: SPEC §2.4, §3.3

### 正常路径

- **V-014-01** Quiz 初始化
  - Given: 打开一个包含 quizData 的专题页面（如 `transformer.html`）
  - When: 用户走完所有 Stepper 步骤到达最后一步
  - Then: 在可视化区域下方渲染 Quiz 容器，显示第一道题目

- **V-014-02** 选择题正确作答
  - Given: Quiz 显示一道 `type: 'choice'` 的题目
  - When: 点击正确答案选项
  - Then: 选项变为绿色（`.correct` 样式），显示解析说明（`.quiz-explanation`）

- **V-014-03** 选择题错误作答
  - Given: Quiz 显示一道选择题
  - When: 点击错误答案选项
  - Then: 选中选项变为红色（`.wrong` 样式），正确答案同时高亮为绿色，显示解析

- **V-014-04** 简答题关键词匹配
  - Given: Quiz 显示一道 `type: 'short'` 的题目，`minKeywords: 2`
  - When: 在输入框输入包含 2 个及以上关键词的文本并提交
  - Then: 判定为正确，显示绿色反馈和解析

- **V-014-05** 全部答对后标记完成
  - Given: 当前页面的所有 Quiz 题目均已正确回答
  - When: 最后一题答对
  - Then: 调用 `Progress.markComplete(pageId)`；刷新后 `Progress.getStatus(pageId)` 返回 `'completed'`

- **V-014-06** 可无限重试
  - Given: 用户答错一道题
  - When: 再次点击另一个选项（或重新输入答案）
  - Then: 可以重新作答，不限次数

### 异常/边界

- **V-014-07** quizData 为空数组时不崩溃
  - Given: 某页面 `quizData = []`
  - When: Stepper 走完最后一步
  - Then: 不渲染 Quiz 区域，不抛出 JS 异常

---

## V-015: stepper.js 扩展（进度回调 + Quiz 触发）

- Priority: P1
- Source: SPEC §2.2, §5.3

### 正常路径

- **V-015-01** onComplete 回调触发
  - Given: 打开一个使用 `initStepper(stages, { pageId: 'xxx', onComplete: fn })` 的页面
  - When: 用户导航到最后一个步骤
  - Then: `onComplete` 函数被调用

- **V-015-02** 自动标记 in_progress
  - Given: 打开 `transformer.html`（配置了 `pageId: 'transformer'`）
  - When: 用户到达最后一步
  - Then: `Progress.getStatus('transformer')` 返回 `'in_progress'`

- **V-015-03** enableQuiz 启动 Quiz
  - Given: 页面配置了 `enableQuiz: true` 和有效的 `quizData`
  - When: 用户到达最后一步
  - Then: Quiz 区域出现在步骤内容下方

### 异常/边界

- **V-015-04** 旧参数兼容
  - Given: 某页面调用 `initStepper(stages, { interval: 5000 })` 不传新参数
  - When: 页面加载
  - Then: Stepper 正常工作，无 JS 报错，自动播放间隔为 5000ms

---

## V-016: SA 视角侧边栏提示

- Priority: P1
- Source: SPEC §2.1 renderSATip, §3.4, §5.2

### 正常路径

- **V-016-01** 在正确步骤显示提示
  - Given: 打开赛道 A 某页面（如 `pre-training.html`），该页面定义了 `saTips = [{ step: 3, tip: '...' }]`
  - When: 用户导航到步骤 3
  - Then: 页面侧边栏区域显示对应的 SA 提示文本，含 💡 图标

- **V-016-02** 非对应步骤不显示
  - Given: 同上页面
  - When: 用户在步骤 1、2、4 等非定义步骤
  - Then: SA 侧边栏不显示（或隐藏）

- **V-016-03** 赛道 B/C 页面不显示 SA 提示
  - Given: 打开 `b1-aws-ai-services.html`（赛道 B 页面）
  - When: 页面加载完成
  - Then: 不渲染 SA 视角侧边栏区域（该功能仅限赛道 A）

---

## V-017: 现有 14 个专题页面不破损

- Priority: P0
- Source: SPEC §1.3 不动的核心逻辑, §5.5 微改

### 正常路径

- **V-017-01** 现有专题内容完整
  - Given: 依次打开 14 个现有专题页面（neural-network 到 multimodal/agent）
  - When: 页面加载完成
  - Then: 每个页面的 Stepper 步骤数量与原版一致，内容和可视化动画正常渲染

- **V-017-02** initStepper 签名不变
  - Given: 查看任意使用 stepper.js 的页面源码
  - When: 检查 `initStepper(stages, options)` 调用
  - Then: 第一个参数仍为 stages 数组，options 中 interval 字段仍有效

- **V-017-03** .feynman 样式不变
  - Given: 打开含有 `.feynman` 区块的页面
  - When: 导航到费曼总结步骤
  - Then: 样式与改造前视觉一致（深色卡片、柔光边框）

### 异常/边界

- **V-017-04** 无新增外部依赖引入
  - Given: 打开 DevTools Network 面板
  - When: 依次加载所有页面
  - Then: 不出现任何对外域（CDN/API）的网络请求

---

## V-018: common.css 扩展（只追加不修改）

- Priority: P1
- Source: SPEC §5.4

### 正常路径

- **V-018-01** 新增样式类存在
  - Given: 打开 `common.css` 文件
  - When: 搜索以下类名
  - Then: 文件中存在 `.breadcrumb`、`.track-badge`、`.progress-bar-track`、`.progress-fill`、`.sa-tip-sidebar`、`.quiz-container`、`.quiz-question`、`.quiz-options`、`.quiz-option`、`.quiz-option.correct`、`.quiz-option.wrong`、`.track-card`

- **V-018-02** 现有样式未被修改
  - Given: 对比改造前后的 `common.css`
  - When: 检查原有 `.feynman`、`.nav-hint` 等样式规则
  - Then: 这些规则内容完全不变（仅在文件末尾追加新内容）

---

## V-019: 首页 Home 按钮与底部导航提示

- Priority: P1
- Source: SPEC §5.2 nav.js 第 6、7 条

### 正常路径

- **V-019-01** Home 按钮可见
  - Given: 打开任意专题页面
  - When: 页面加载完成
  - Then: 页面中存在一个可点击的 Home 按钮/图标

- **V-019-02** Home 按钮功能
  - Given: 在 `b2-architecture-patterns.html`
  - When: 点击 Home 按钮
  - Then: 跳转到 `index.html`

- **V-019-03** 底部导航提示可见
  - Given: 打开任意专题页面
  - When: 查看页面底部
  - Then: 显示 `.nav-hint` 样式的键盘快捷键提示（如"← → 切换步骤 | Alt+←/→ 切换专题 | H 回首页"）

---

## V-020: 新增页面引用结构正确

- Priority: P1
- Source: SPEC §5.5 统一改动第 1-2 条

### 正常路径

- **V-020-01** 新增页面引用完整
  - Given: 查看 `b1-aws-ai-services.html` 源码
  - When: 检查 `<head>` 和 `</body>` 前的引用
  - Then: 包含 `common.css`、`progress.js`、`quiz.js`、`nav.js` 的引用

- **V-020-02** 所有 8 个新增页面引用一致
  - Given: 检查 B1-B4、C1-C4 共 8 个文件
  - When: 对比引用结构
  - Then: 所有 8 个文件的 CSS/JS 引用方式一致，均引用 `common.css`、`progress.js`、`quiz.js`、`nav.js`

---

## V-021: 跨专题知识关联（相关专题链接）

- Priority: P1
- Source: SPEC §5.5 第 4 条

### 正常路径

- **V-021-01** 相关专题区域存在
  - Given: 打开 `neural-network.html`
  - When: 滚动到页面底部（Stepper 之后）
  - Then: 存在 `.related-topics` 区域，显示至少 1 个相关专题链接

- **V-021-02** 链接可用
  - Given: 在 `neural-network.html` 页面底部
  - When: 点击"→ Transformer 架构（后续）"链接
  - Then: 成功跳转到 `transformer.html`

---

## V-022: localStorage Schema 正确性

- Priority: P1
- Source: SPEC §2.5

### 正常路径

- **V-022-01** 数据结构符合 Schema
  - Given: 完成几个专题的学习和 Quiz
  - When: 在 DevTools Console 执行 `JSON.parse(localStorage.getItem('llm_learning_progress'))`
  - Then: 返回对象包含 `version: 1`、`lastUpdated`（ISO 8601 格式）、`pages` 对象

- **V-022-02** pageId 命名规则
  - Given: 查看 localStorage 中的 pages 键名
  - When: 验证键名格式
  - Then: 所有键名为"文件名去掉 .html 后缀"（如 `neural-network`、`b1-aws-ai-services`）

- **V-022-03** quizScore 正确记录
  - Given: 在 `transformer.html` 完成 Quiz，3 题答对 2 题
  - When: 查看 localStorage 数据
  - Then: `pages['transformer'].quizScore` 值为 2（或等于全部答对的题数）

---

## V-023: 性能要求

- Priority: P2
- Source: SPEC §6.1

### 正常路径

- **V-023-01** 首页加载时间
  - Given: 使用 Chrome DevTools Performance 面板
  - When: 刷新 `index.html`（Disable cache）
  - Then: DOMContentLoaded 事件 < 1.5s

- **V-023-02** 专题页加载时间
  - Given: 使用 Chrome DevTools Performance 面板
  - When: 刷新 `neural-network.html`（Disable cache）
  - Then: DOMContentLoaded 事件 < 1s

- **V-023-03** JS 文件大小
  - Given: 检查 `progress.js` 和 `quiz.js` 文件大小
  - When: 查看未压缩文件字节数
  - Then: 两个文件合计 < 10KB

- **V-023-04** 步骤切换动画帧率
  - Given: 使用 Chrome DevTools Performance 面板录制
  - When: 连续点击切换 Stepper 步骤
  - Then: 动画帧率保持 ≥ 50fps，无明显卡顿

- **V-023-05** localStorage 读写延迟
  - Given: 在 Console 执行 `console.time('rw'); Progress.markComplete('test'); Progress.getStatus('test'); console.timeEnd('rw');`
  - When: 查看耗时
  - Then: 读写完成时间 < 10ms

---

## V-024: 浏览器兼容性

- Priority: P2
- Source: SPEC §6.2

### 正常路径

- **V-024-01** Chrome 兼容
  - Given: 使用 Chrome 90+ 打开 `index.html`
  - When: 浏览首页、切换赛道、进入专题、完成 Quiz
  - Then: 所有功能正常，无 CSS 布局错乱，无 JS 报错

- **V-024-02** Safari 兼容
  - Given: 使用 Safari 15+ 打开 `index.html`
  - When: 执行同样的功能流程
  - Then: 所有功能正常

- **V-024-03** Firefox 兼容
  - Given: 使用 Firefox 90+ 打开 `index.html`
  - When: 执行同样的功能流程
  - Then: 所有功能正常

- **V-024-04** 最小屏幕宽度不破碎
  - Given: 使用 Chrome DevTools 将视口宽度设为 375px
  - When: 打开 `index.html` 和任意专题页面
  - Then: 页面内容不溢出视口，文字可读，按钮可点击

---

## V-025: 纯离线可用（无外部依赖）

- Priority: P2
- Source: SPEC §6.2 网络, §7 技术约束第 6 条

### 正常路径

- **V-025-01** 无外部网络请求
  - Given: 在 Chrome DevTools Network 面板开启请求监听
  - When: 从 `index.html` 开始，依次访问所有 24 个页面
  - Then: Network 面板中不出现任何非本地文件的请求（无 CDN、无 API 调用、无字体下载）

- **V-025-02** 断网可用
  - Given: 在 Chrome DevTools Network 面板选择 Offline 模式
  - When: 打开本地 `index.html`（通过 file:// 协议或本地服务器）
  - Then: 所有页面功能正常工作

---

## V-026: NAV_CONFIG 数据完整性

- Priority: P1
- Source: SPEC §2.1

### 正常路径

- **V-026-01** 赛道 A 包含 16 个页面
  - Given: 查看 nav.js 中 NAV_CONFIG 的赛道 A 定义
  - When: 计算所有 groups 下的 pages 总数
  - Then: 共 16 个页面条目

- **V-026-02** 赛道 B 包含 4 个页面
  - Given: 查看 NAV_CONFIG 赛道 B 定义
  - When: 计算 pages 总数
  - Then: 共 4 个页面条目（b1 到 b4）

- **V-026-03** 赛道 C 包含 4 个页面
  - Given: 查看 NAV_CONFIG 赛道 C 定义
  - When: 计算 pages 总数
  - Then: 共 4 个页面条目（c1 到 c4）

- **V-026-04** 所有 file 字段对应实际文件
  - Given: 遍历 NAV_CONFIG 中所有 pages[].file 值
  - When: 检查对应 HTML 文件是否存在于项目目录
  - Then: 24 个文件全部存在

---

## V-027: progress.js 与 Stepper 集成

- Priority: P1
- Source: SPEC §2.2, §5.3

### 正常路径

- **V-027-01** 浏览专题自动标记 in_progress
  - Given: localStorage 中 `transformer` 状态为 not_started
  - When: 打开 `transformer.html`，导航到最后一步
  - Then: `Progress.getStatus('transformer')` 返回 `'in_progress'`

- **V-027-02** Quiz 通过后标记 completed
  - Given: `transformer` 状态为 in_progress
  - When: 完成 `transformer.html` 的全部 Quiz 题目（全部答对）
  - Then: `Progress.getStatus('transformer')` 返回 `'completed'`

- **V-027-03** 刷新后进度保持
  - Given: `transformer` 已被标记为 completed
  - When: 关闭页面，重新打开 `index.html`
  - Then: 赛道 A 中 transformer 卡片显示 ✅ 已完成图标

---

## V-028: 首页视觉规格

- Priority: P2
- Source: SPEC §5.1 关键 UI 规格

### 正常路径

- **V-028-01** 桌面端三列布局
  - Given: 使用 ≥ 768px 宽度的浏览器窗口
  - When: 查看首页三赛道区域
  - Then: 三个赛道呈现水平三列布局

- **V-028-02** 移动端纵向布局
  - Given: 使用 < 768px 宽度的视口（或 DevTools 模拟）
  - When: 查看首页
  - Then: 三个赛道纵向堆叠排列

- **V-028-03** 深色背景风格保持
  - Given: 打开 `index.html`
  - When: 查看页面背景
  - Then: 保持深色渐变背景风格（与现有专题页一致）

- **V-028-04** 卡片状态图标显示
  - Given: 有不同状态的专题（已完成/学习中/未开始）
  - When: 查看首页卡片
  - Then: 已完成显示 ✅，学习中显示 📖，未开始显示 ○

---

## V-029: 新增页面主色调正确

- Priority: P2
- Source: SPEC §4.1-4.8

### 正常路径

- **V-029-01** 赛道 B 页面橙色调
  - Given: 打开任意 B 系列页面（b1-b4）
  - When: 查看页面主题色（进度条、标题高亮等）
  - Then: 主色调为橙色系（#ffa500 或近似）

- **V-029-02** 赛道 C 页面紫色调
  - Given: 打开任意 C 系列页面（c1-c4）
  - When: 查看页面主题色
  - Then: 主色调为紫色系（#c864ff 或近似）

---

## V-030: 文件清单完整性

- Priority: P0
- Source: SPEC §1.2

### 正常路径

- **V-030-01** 新增 10 个文件全部存在
  - Given: 检查项目目录
  - When: 查找以下文件是否存在
  - Then: 以下 10 个文件全部存在：
    - `b1-aws-ai-services.html`
    - `b2-architecture-patterns.html`
    - `b3-cost-optimization.html`
    - `b4-security-compliance.html`
    - `c1-multi-agent.html`
    - `c2-agent-frameworks.html`
    - `c3-agent-evaluation.html`
    - `c4-enterprise-agent.html`
    - `progress.js`
    - `quiz.js`

---

## 验收执行指南

### 手动验证流程

1. **环境准备**：用本地 HTTP 服务器（如 `python3 -m http.server`）启动项目目录
2. **清空状态**：在 DevTools 中执行 `localStorage.clear()` 确保干净起始状态
3. **按优先级执行**：先验证所有 P0 条目，再 P1，最后 P2
4. **记录结果**：每条验收条件标记 PASS/FAIL，FAIL 条目记录具体表现

### 优先级判定标准

| 优先级 | 含义 | FAIL 时的影响 |
|--------|------|--------------|
| P0 | 必须通过 | 阻塞交付，必须修复 |
| P1 | 应该通过 | 影响体验，应在本迭代修复 |
| P2 | 锦上添花 | 可延后，不阻塞交付 |

### 交付通过标准

- ✅ 所有 P0 条目必须 PASS
- ✅ P1 条目通过率 ≥ 90%
- ⚠️ P2 条目通过率 ≥ 70%（可协商）
