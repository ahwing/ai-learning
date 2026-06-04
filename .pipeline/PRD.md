# PRD：AI/SA/Agent 学习平台优化

## 背景

现有一个交互式 LLM 学习路线图网站（`/Users/ahwingwu/Desktop/Demos/learning/`），包含 16 个 HTML 专题页 + 共享 CSS/JS。内容以 AI 基础（从神经网络到多模态）为主，交互体验良好（逐步动画 + 键盘导航），但存在内容缺口和结构问题。

## 目标用户

AWS Solutions Architect（SA），需要同时具备：
1. **AI 能力** — 理解 LLM 全栈技术（已有基础覆盖）
2. **SA 能力** — 掌握 AWS AI/ML 服务、架构设计模式、成本优化、安全合规
3. **Agent 能力** — 深入 Agent 架构、编排、评估、企业级部署

## 现状

### 已有内容（16 页，134+ 交互步骤）
| 模块 | 专题 |
|------|------|
| AI 基础 | 神经网络、Transformer、预训练、Scaling Laws |
| 模型训练 | SFT、RLHF/DPO、推理强化 (RL) |
| 部署应用 | 推理部署、RAG、Prompt Engineering、Evaluation、MCP |
| 进阶应用 | Agent（基础）、多模态、Guardrails（未导航）、Bedrock 全景（未导航）|

### 结构性问题
1. 2 个页面（guardrails、bedrock-overview）未被导航收录
2. 所有内容扁平排列，无分类/分层
3. 无学习进度追踪
4. 无自测功能
5. 缺少"SA 视角"标注
6. 页面间知识依赖关系不明显

## 需求

### P0 — 必须做

#### R1: 内容重组为三大学习赛道
将现有内容 + 新增内容组织为三条学习赛道，首页展示清晰的路径关系：

**赛道 A：AI 基础能力（原有内容为主）**
- 保留现有 14 个 AI 专题
- 修复导航：收录 guardrails.html 和 bedrock-overview.html
- 调整顺序：Bedrock 全景放在"部署应用"分组开头，Guardrails 放在 Agent 之后

**赛道 B：SA 能力（新增）**
- B1: AWS AI/ML 服务全景图（SageMaker, Bedrock, Titan, Textract, Comprehend, Rekognition 等）
- B2: AI Workload 架构模式（参考架构、决策树）
- B3: 成本优化与选型（GPU 实例选型、Serverless vs 自建、按需 vs 预留）
- B4: 安全合规（IAM for ML, VPC 配置, 数据加密, Responsible AI, Model Governance）

**赛道 C：Agent 能力（新增 + 深化已有）**
- C1: Multi-Agent 架构模式（角色分工、通信模式、编排拓扑）
- C2: Agent 编排框架对比（LangGraph, CrewAI, AutoGen, Bedrock Agents, Amazon Q）
- C3: Agent 评估与可观测性（Agent 级 Eval、Trace、调试）
- C4: 企业级 Agent 部署（安全沙箱、权限控制、成本管理、规模化）

#### R2: 首页重构
- 三赛道可视化（三列或三行，带颜色区分）
- 每个赛道内显示学习进度
- 标注前置依赖（如"SA 能力建议先完成 AI 基础的推理部署 + RAG"）

#### R3: 导航升级
- 在 nav.js 中支持按赛道切换
- 每个页面顶部显示当前位置（赛道 > 分组 > 专题）
- 页面内增加"SA 视角"侧边栏提示（在 AI 基础专题中标注 SA 关注点）

### P1 — 应该做

#### R4: 学习进度系统
- 用 localStorage 追踪每个专题的完成状态
- 首页进度条（已完成/总数）
- 标记"已学完"/"学习中"/"未开始"

#### R5: 自测/Quiz 功能
- 每个专题末尾增加 2-3 道自测题
- 选择题 + 简答题混合
- 答对后自动标记专题为"已完成"

#### R6: 跨专题知识关联
- 在页面中添加"相关专题"链接
- 鼠标悬停显示前置/后续知识点预览

### P2 — 锦上添花

#### R7: 搜索功能
- 全局关键词搜索（跨所有专题内容）

#### R8: 深色/浅色主题切换

#### R9: 移动端适配优化

## 技术约束
- 纯静态 HTML/CSS/JS（无后端、无构建工具）
- 保持现有 stepper.js 交互模式
- 保持 common.css 视觉风格统一
- 所有新页面使用相同的动画和交互范式
- 数据存储用 localStorage（纯前端）

## 验收标准
1. 三条赛道首页可正常浏览和切换
2. 所有新增页面有 ≥5 个交互步骤
3. 导航完整收录所有页面，键盘快捷键正常工作
4. 学习进度在 localStorage 正确持久化
5. 现有 14 个专题内容不丢失、交互不破损

## 非目标
- 不做用户认证/登录
- 不做后端 API
- 不做多人协作
- 不重写现有的 stepper.js 和 common.css 核心逻辑
