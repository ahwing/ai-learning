# SPEC.md — AI/SA/Agent 学习平台优化技术规约

> 生成时间：2026-05-28  
> 来源：PRD.md  
> 版本：v1.0

---

## 1. 系统边界

### 1.1 现有文件清单（20 个）

| 文件 | 角色 | 本次动作 |
|------|------|----------|
| `index.html` | 首页（路线图展示） | **重写** |
| `common.css` | 共享样式（`.feynman`、`.nav-hint`） | **扩展**（新增赛道/进度条样式） |
| `nav.js` | 全局导航（键盘快捷键、首页按钮） | **重写**（支持赛道分组） |
| `stepper.js` | Stepper 通用逻辑 | **扩展**（新增 Quiz/进度回调） |
| `neural-network.html` | AI 基础 · 专题 | **微改**（加 SA 侧边栏提示 + 进度钩子） |
| `transformer.html` | AI 基础 · 专题 | **微改** |
| `pre-training.html` | AI 基础 · 专题 | **微改** |
| `scaling-laws.html` | AI 基础 · 专题 | **微改** |
| `sft.html` | 模型训练 · 专题 | **微改** |
| `rlhf.html` | 模型训练 · 专题 | **微改** |
| `rl-reasoning.html` | 模型训练 · 专题 | **微改** |
| `inference.html` | 部署应用 · 专题 | **微改** |
| `rag.html` | 部署应用 · 专题 | **微改** |
| `prompt-engineering.html` | 部署应用 · 专题 | **微改** |
| `evaluation.html` | 部署应用 · 专题 | **微改** |
| `mcp.html` | 部署应用 · 专题 | **微改** |
| `multimodal.html` | 进阶应用 · 专题 | **微改** |
| `agent.html` | 进阶应用 · 专题 | **微改** |
| `guardrails.html` | 进阶应用 · 专题 | **微改**（纳入导航） |
| `bedrock-overview.html` | 部署应用 · 专题 | **微改**（纳入导航） |

### 1.2 新增文件清单（10 个）

| 文件 | 赛道 | 说明 |
|------|------|------|
| `b1-aws-ai-services.html` | B · SA 能力 | AWS AI/ML 服务全景图 |
| `b2-architecture-patterns.html` | B · SA 能力 | AI Workload 架构模式 |
| `b3-cost-optimization.html` | B · SA 能力 | 成本优化与选型 |
| `b4-security-compliance.html` | B · SA 能力 | 安全合规 |
| `c1-multi-agent.html` | C · Agent 能力 | Multi-Agent 架构模式 |
| `c2-agent-frameworks.html` | C · Agent 能力 | Agent 编排框架对比 |
| `c3-agent-evaluation.html` | C · Agent 能力 | Agent 评估与可观测性 |
| `c4-enterprise-agent.html` | C · Agent 能力 | 企业级 Agent 部署 |
| `progress.js` | 全局 | 学习进度管理模块 |
| `quiz.js` | 全局 | Quiz 自测通用逻辑 |

### 1.3 不动的核心逻辑

- `stepper.js` 的 `initStepper(stages, options)` 函数签名和内部步骤切换逻辑保持不变
- `common.css` 的 `.feynman`、`.nav-hint` 等现有样式保持不变
- 各专题页面的 `stages` 数组内容和 `viz()` 可视化逻辑不动
- 各专题页面的内联样式不破坏

---

## 2. 接口定义

### 2.1 nav.js 重构接口

**当前接口（将废弃）：**
```javascript
// 硬编码的扁平页面数组
const pages = ['index.html', 'neural-network.html', ...];
```

**新接口设计：**
```javascript
// nav.js 导出的全局配置
window.NAV_CONFIG = {
  tracks: [
    {
      id: 'A',
      name: 'AI 基础能力',
      color: '#00d2ff',
      groups: [
        {
          name: 'AI 基础',
          pages: [
            { file: 'neural-network.html', title: '神经网络基础' },
            { file: 'transformer.html', title: 'Transformer 架构' },
            { file: 'pre-training.html', title: '预训练' },
            { file: 'scaling-laws.html', title: 'Scaling Laws' }
          ]
        },
        {
          name: '模型训练',
          pages: [
            { file: 'sft.html', title: '监督微调 SFT' },
            { file: 'rlhf.html', title: '对齐 RLHF/DPO' },
            { file: 'rl-reasoning.html', title: '推理强化 RL' }
          ]
        },
        {
          name: '部署应用',
          pages: [
            { file: 'bedrock-overview.html', title: 'Bedrock 全景' },
            { file: 'inference.html', title: '推理部署' },
            { file: 'rag.html', title: 'RAG' },
            { file: 'prompt-engineering.html', title: 'Prompt Engineering' },
            { file: 'evaluation.html', title: 'Evaluation' },
            { file: 'mcp.html', title: 'MCP' }
          ]
        },
        {
          name: '进阶应用',
          pages: [
            { file: 'agent.html', title: 'Agent 基础' },
            { file: 'guardrails.html', title: 'Guardrails' },
            { file: 'multimodal.html', title: '多模态' }
          ]
        }
      ]
    },
    {
      id: 'B',
      name: 'SA 能力',
      color: '#ffa500',
      groups: [
        {
          name: 'SA 专题',
          pages: [
            { file: 'b1-aws-ai-services.html', title: 'AWS AI/ML 服务全景图' },
            { file: 'b2-architecture-patterns.html', title: 'AI Workload 架构模式' },
            { file: 'b3-cost-optimization.html', title: '成本优化与选型' },
            { file: 'b4-security-compliance.html', title: '安全合规' }
          ]
        }
      ]
    },
    {
      id: 'C',
      name: 'Agent 能力',
      color: '#c864ff',
      groups: [
        {
          name: 'Agent 深化',
          pages: [
            { file: 'c1-multi-agent.html', title: 'Multi-Agent 架构模式' },
            { file: 'c2-agent-frameworks.html', title: 'Agent 编排框架对比' },
            { file: 'c3-agent-evaluation.html', title: 'Agent 评估与可观测性' },
            { file: 'c4-enterprise-agent.html', title: '企业级 Agent 部署' }
          ]
        }
      ]
    }
  ]
};
```

**nav.js 新增功能：**
```javascript
// 面包屑渲染（注入到每个页面顶部）
function renderBreadcrumb(currentFile) → void
// 输出: <div class="breadcrumb">赛道 A · AI 基础 > 神经网络基础</div>

// SA 视角侧边栏（仅在赛道 A 页面显示）
function renderSATip(currentFile, tips) → void
// tips 来自页面内 data-sa-tips 属性或内联定义

// 赛道内键盘导航（保留 Alt+←/→ 切换，H 回首页）
// 新增: 只在当前赛道内循环导航
```

### 2.2 stepper.js 扩展接口

**现有接口（保留）：**
```javascript
window.initStepper = function(stages, options = {}) → { next, prev, toggleAuto, render }
// options.interval: 自动播放间隔（默认 4000ms）
```

**新增 options 字段：**
```javascript
options = {
  interval: 4000,           // 保持不变
  onComplete: function(){}, // 新增：所有步骤走完时的回调
  pageId: 'string',         // 新增：用于进度追踪的页面标识
  enableQuiz: false,        // 新增：是否在最后启动 Quiz
  quizData: []              // 新增：Quiz 题目数据（见 2.4）
}
```

**新增回调时机：**
- 当用户到达最后一步时，触发 `onComplete(pageId)` → 调用 `progress.js` 标记为"学习中"
- 当 Quiz 全部答对时，调用 `progress.markComplete(pageId)` → 标记为"已完成"

### 2.3 progress.js 接口（新建）

```javascript
// progress.js — 学习进度管理模块
window.Progress = {
  // 获取某专题的状态
  getStatus(pageId) → 'not_started' | 'in_progress' | 'completed',
  
  // 标记状态
  markInProgress(pageId) → void,
  markComplete(pageId) → void,
  
  // 获取赛道统计
  getTrackStats(trackId) → { total: number, completed: number, inProgress: number },
  
  // 获取全部进度数据（供首页渲染）
  getAll() → { [pageId]: { status, lastVisit, quizScore } },
  
  // 重置
  reset(pageId?) → void  // 无参数则全部重置
};
```

### 2.4 quiz.js 接口（新建）

```javascript
// quiz.js — Quiz 自测通用逻辑
window.Quiz = {
  // 初始化 Quiz（在 stepper 最后一步后调用）
  init(containerId, quizData, onPass) → void,
  
  // quizData 格式见 §3.3
  // onPass: 全部答对后的回调
};
```

### 2.5 localStorage Schema

**Key**: `llm_learning_progress`

```json
{
  "version": 1,
  "lastUpdated": "2026-05-28T10:00:00Z",
  "pages": {
    "neural-network": { "status": "completed", "lastVisit": "...", "quizScore": 3 },
    "transformer": { "status": "in_progress", "lastVisit": "...", "quizScore": null },
    "b1-aws-ai-services": { "status": "not_started", "lastVisit": null, "quizScore": null }
  }
}
```

**pageId 命名规则**: 文件名去掉 `.html` 后缀（如 `neural-network`、`b1-aws-ai-services`）

---

## 3. 数据模型

### 3.1 赛道/专题元数据结构

已在 §2.1 的 `NAV_CONFIG` 中完整定义。核心字段：

```typescript
interface Track {
  id: string;           // 'A' | 'B' | 'C'
  name: string;         // 显示名称
  color: string;        // 主色调（hex）
  groups: Group[];
}

interface Group {
  name: string;         // 分组名
  pages: PageMeta[];
}

interface PageMeta {
  file: string;         // HTML 文件名
  title: string;        // 显示标题
  prerequisites?: string[];  // 前置依赖的 pageId 列表（P2 阶段实现）
}
```

### 3.2 学习进度数据结构

```typescript
interface ProgressData {
  version: number;
  lastUpdated: string;  // ISO 8601
  pages: Record<string, PageProgress>;
}

interface PageProgress {
  status: 'not_started' | 'in_progress' | 'completed';
  lastVisit: string | null;  // ISO 8601
  quizScore: number | null;  // 答对题目数
}
```

### 3.3 Quiz 数据格式

每个专题页面在内联 `<script>` 中定义 quizData：

```javascript
const quizData = [
  {
    type: 'choice',        // 选择题
    question: 'Transformer 中 Multi-Head Attention 的核心优势是什么？',
    options: [
      'A. 减少参数量',
      'B. 捕获不同子空间的特征',
      'C. 加速训练',
      'D. 减少数据需求'
    ],
    answer: 1,             // 正确选项索引（0-based）
    explanation: '多头机制让模型同时关注不同位置和不同特征维度的信息。'
  },
  {
    type: 'short',         // 简答题
    question: '请用一句话解释 KV Cache 的作用。',
    keywords: ['缓存', '重复计算', '推理加速', 'key', 'value'],
    // 用户回答包含任意 2 个关键词即判为正确
    minKeywords: 2,
    explanation: 'KV Cache 缓存已生成 token 的 Key/Value，避免推理时重复计算。'
  }
];
```

### 3.4 SA 视角提示数据

在赛道 A 各专题页面中内联定义：

```javascript
const saTips = [
  {
    step: 3,  // 在第 3 步时显示
    tip: '💡 SA 关注点：SageMaker 提供托管的分布式训练，自动处理这里描述的 3D 并行。'
  },
  {
    step: 7,
    tip: '💡 SA 关注点：Bedrock 的按 token 计价模型就是基于这里的推理部署架构。'
  }
];
```

---

## 4. 新增页面详细规约

### 4.1 B1: AWS AI/ML 服务全景图

**文件**: `b1-aws-ai-services.html`  
**赛道**: B · SA 能力  
**主色调**: `#ffa500`（橙色系）  
**预估步骤数**: 8 步

**章节大纲：**
1. **全景鸟瞰**（步骤 1）— 三层架构概览：AI Services / ML Platform / Infrastructure
2. **AI Services 层**（步骤 2）— Rekognition, Textract, Comprehend, Translate, Polly, Lex, Transcribe
3. **Bedrock 生态**（步骤 3）— 模型选择（Claude, Titan, Llama, Mistral）、API 模式、按需/预留
4. **SageMaker 平台**（步骤 4）— 训练/推理/MLOps 全托管、Studio、Pipeline、Feature Store
5. **基础设施层**（步骤 5）— GPU 实例族（P/G/Trn/Inf）、EFA 网络、S3 数据湖
6. **选型决策树**（步骤 6）— "我该用哪个服务？"交互式决策流程
7. **集成模式**（步骤 7）— Lambda+Bedrock、Step Functions 编排、EventBridge 事件驱动
8. **费曼总结**（步骤 8）— 用"工厂"类比总结三层关系

**交互可视化方案：**
- 步骤 1: 三层堆叠图（动画逐层亮起）
- 步骤 6: 交互式决策树（可点击选择路径）

---

### 4.2 B2: AI Workload 架构模式

**文件**: `b2-architecture-patterns.html`  
**赛道**: B · SA 能力  
**主色调**: `#ffa500`  
**预估步骤数**: 8 步

**章节大纲：**
1. **参考架构概览**（步骤 1）— AWS AI/ML 参考架构总图
2. **RAG 架构模式**（步骤 2）— Knowledge Base + Bedrock + OpenSearch/Aurora pgvector
3. **Fine-tuning 架构**（步骤 3）— SageMaker Training + S3 + Model Registry
4. **实时推理架构**（步骤 4）— SageMaker Endpoint / Bedrock API / ECS+TGI
5. **批量推理架构**（步骤 5）— Batch Transform / Bedrock Batch / Step Functions
6. **Agent 架构**（步骤 6）— Bedrock Agent + Action Group + Knowledge Base
7. **多区域/灾备**（步骤 7）— 多 Region 部署、Failover 策略
8. **架构决策矩阵**（步骤 8）— 延迟/成本/复杂度权衡表

**交互可视化方案：**
- 每步一个架构图（AWS 风格方块+箭头动画）
- 步骤 8: 可交互的对比表格

---

### 4.3 B3: 成本优化与选型

**文件**: `b3-cost-optimization.html`  
**赛道**: B · SA 能力  
**主色调**: `#ffa500`  
**预估步骤数**: 7 步

**章节大纲：**
1. **AI 成本构成**（步骤 1）— 训练 vs 推理成本、token 定价模型
2. **GPU 实例选型**（步骤 2）— P5/P4d/G5/G6/Trn1/Inf2 性价比对比
3. **Serverless vs 自建**（步骤 3）— Bedrock 按需 vs SageMaker Endpoint vs 自建 ECS
4. **预留与 Spot**（步骤 4）— RI/Savings Plans/Spot 在 ML 场景的应用
5. **推理优化技术**（步骤 5）— 量化(INT8/FP8)、蒸馏、Speculative Decoding
6. **成本监控**（步骤 6）— Cost Explorer、Budget Alert、按项目标签分账
7. **费曼总结**（步骤 7）— 成本优化决策清单

**交互可视化方案：**
- 步骤 2: 实例性价比柱状图动画
- 步骤 3: 成本计算器（输入 QPS/并发 → 估算月费）

---

### 4.4 B4: 安全合规

**文件**: `b4-security-compliance.html`  
**赛道**: B · SA 能力  
**主色调**: `#ffa500`  
**预估步骤数**: 7 步

**章节大纲：**
1. **AI 安全全景**（步骤 1）— 数据安全 + 模型安全 + 运行时安全
2. **IAM for ML**（步骤 2）— SageMaker Execution Role、Bedrock 权限、最小权限原则
3. **网络隔离**（步骤 3）— VPC 配置、PrivateLink、NAT 策略
4. **数据加密**（步骤 4）— 静态加密（KMS）、传输加密、训练数据安全
5. **Responsible AI**（步骤 5）— Bedrock Guardrails、内容过滤、PII 检测
6. **Model Governance**（步骤 6）— Model Card、审计日志、版本管理、A/B 测试合规
7. **合规框架映射**（步骤 7）— SOC2/HIPAA/GDPR 在 AI 场景的落地

**交互可视化方案：**
- 步骤 1: 安全分层图（洋葱模型）
- 步骤 3: VPC 网络拓扑动画

---

### 4.5 C1: Multi-Agent 架构模式

**文件**: `c1-multi-agent.html`  
**赛道**: C · Agent 能力  
**主色调**: `#c864ff`（紫色系）  
**预估步骤数**: 8 步

**章节大纲：**
1. **为什么要多 Agent？**（步骤 1）— 单 Agent 局限性、复杂任务分解需求
2. **角色分工模式**（步骤 2）— Supervisor/Worker、专家团队、Debate
3. **通信模式**（步骤 3）— 共享状态、消息传递、黑板模式
4. **编排拓扑**（步骤 4）— 串行链、并行扇出、层级树、网状
5. **状态管理**（步骤 5）— 共享 Memory、上下文传递、冲突解决
6. **错误处理**（步骤 6）— 重试策略、降级、熔断、人工介入
7. **真实案例**（步骤 7）— Software Dev Team、Research Team、Customer Service
8. **设计原则**（步骤 8）— 最小 Agent 原则、单一职责、明确边界

**交互可视化方案：**
- 步骤 2-4: 每种模式用动画展示消息流转
- 步骤 7: 案例架构图

---

### 4.6 C2: Agent 编排框架对比

**文件**: `c2-agent-frameworks.html`  
**赛道**: C · Agent 能力  
**主色调**: `#c864ff`  
**预估步骤数**: 7 步

**章节大纲：**
1. **框架全景**（步骤 1）— 2024-2025 主流框架时间线
2. **LangGraph**（步骤 2）— 图状态机、Checkpoint、Human-in-the-loop
3. **CrewAI**（步骤 3）— 角色定义、Task/Crew/Process 模型
4. **AutoGen / AG2**（步骤 4）— 对话式协作、GroupChat、代码执行
5. **Bedrock Agents**（步骤 5）— Action Group、Knowledge Base 集成、托管 Runtime
6. **Strands Agents + Amazon Q**（步骤 6）— 模型驱动循环、工具原生、AWS 生态
7. **选型决策矩阵**（步骤 7）— 场景 × 框架推荐表、性能对比

**交互可视化方案：**
- 步骤 2-6: 每个框架的核心架构图
- 步骤 7: 交互式雷达图对比

---

### 4.7 C3: Agent 评估与可观测性

**文件**: `c3-agent-evaluation.html`  
**赛道**: C · Agent 能力  
**主色调**: `#c864ff`  
**预估步骤数**: 7 步

**章节大纲：**
1. **为什么 Agent Eval 很难？**（步骤 1）— 非确定性、多步骤、工具副作用
2. **评估维度**（步骤 2）— 任务完成率、效率（步骤数）、成本、安全
3. **评估方法**（步骤 3）— Benchmark Suite、LLM-as-Judge、人工评审、A/B Test
4. **Trace 与调试**（步骤 4）— LangSmith、Weights&Biases、CloudWatch
5. **可观测性架构**（步骤 5）— Metrics/Logs/Traces 三支柱在 Agent 场景
6. **持续监控**（步骤 6）— Drift 检测、告警规则、自动回滚
7. **最佳实践**（步骤 7）— Eval 清单、CI/CD 集成、成本追踪

**交互可视化方案：**
- 步骤 4: Trace 瀑布图动画（展示一次 Agent 执行的完整调用链）
- 步骤 5: 三支柱架构图

---

### 4.8 C4: 企业级 Agent 部署

**文件**: `c4-enterprise-agent.html`  
**赛道**: C · Agent 能力  
**主色调**: `#c864ff`  
**预估步骤数**: 7 步

**章节大纲：**
1. **企业 vs 个人 Agent**（步骤 1）— 安全、合规、多租户、SLA 差异
2. **安全沙箱**（步骤 2）— 工具权限白名单、执行沙箱（容器/Lambda）、网络隔离
3. **权限控制**（步骤 3）— 最小权限、动态授权、Human-in-the-loop 审批
4. **成本管理**（步骤 4）— Token 预算、超时控制、并发限制、计费追踪
5. **规模化部署**（步骤 5）— 多 Agent 编排平台、队列/异步、Auto Scaling
6. **运维与故障处理**（步骤 6）— 熔断降级、回退策略、事故响应
7. **案例：企业 Agent 平台架构**（步骤 7）— 完整参考架构

**交互可视化方案：**
- 步骤 2: 沙箱隔离层级图
- 步骤 7: 完整企业架构图动画

---

## 5. 修改文件详细规约

### 5.1 index.html — 完全重写

**改动范围**: 全部内容重写，保留 `common.css` 引用和深色背景风格。

**新结构：**
```
┌─ Header ─────────────────────────────────────────────┐
│  标题 + 副标题 + 统计 badge（总专题数/总步骤数）       │
├─ Track Selector ─────────────────────────────────────┤
│  三个赛道 Tab（A/B/C），可切换显示                     │
├─ Track Detail ───────────────────────────────────────┤
│  进度条 + 分组卡片                                    │
│  每张卡片显示：编号、标题、描述、步骤数、完成状态       │
├─ 依赖提示 ───────────────────────────────────────────┤
│  "赛道 B 建议先完成赛道 A 的推理部署 + RAG"           │
├─ Footer ─────────────────────────────────────────────┤
│  键盘快捷键提示                                       │
└───────────────────────────────────────────────────────┘
```

**关键 UI 规格：**
- 三赛道用三列布局（桌面端）或三行布局（移动端）
- 每赛道有独立进度条：`已完成 X / 总数 Y`
- 卡片右上角显示状态 icon（✅ 已完成 / 📖 学习中 / ○ 未开始）
- 从 `localStorage` 读取进度数据渲染

### 5.2 nav.js — 重写

**改动范围**: 全部逻辑重写，保留键盘导航的用户习惯。

**新功能列表：**
1. 从 `NAV_CONFIG` 读取赛道/分组/页面结构
2. 自动检测当前页面所属赛道和分组
3. 渲染面包屑：`赛道名 > 分组名 > 专题名`
4. Alt+←/→ 在**当前赛道内**顺序导航
5. H 键回首页
6. 渲染 Home 按钮（保留现有样式）
7. 渲染底部导航提示（保留 `.nav-hint` 样式）
8. **SA 视角侧边栏**：在赛道 A 页面中，如果页面定义了 `saTips`，在对应步骤弹出侧边栏提示

### 5.3 stepper.js — 扩展

**改动范围**: 在现有 `initStepper` 函数末尾新增进度回调和 Quiz 触发。

**新增逻辑（追加，不修改已有代码）：**
```javascript
// 在 render() 末尾追加:
if (step === stages.length - 1 && options.pageId) {
  Progress.markInProgress(options.pageId);
  if (options.onComplete) options.onComplete();
}

// 在 initStepper 末尾追加:
if (options.enableQuiz && options.quizData) {
  // 当用户到达最后一步后，在 viz 区域下方渲染 Quiz
  // Quiz 通过后调用 Progress.markComplete(options.pageId)
}
```

### 5.4 common.css — 扩展

**新增样式（追加到文件末尾）：**
```css
/* === 赛道相关 === */
.breadcrumb { ... }             /* 面包屑导航 */
.track-badge { ... }            /* 赛道标识 badge */
.progress-bar-track { ... }     /* 赛道进度条 */
.progress-fill { ... }          /* 进度条填充 */

/* === SA 视角 === */
.sa-tip-sidebar { ... }         /* SA 提示侧边栏 */
.sa-tip-content { ... }

/* === Quiz 样式 === */
.quiz-container { ... }         /* Quiz 容器 */
.quiz-question { ... }          /* 题目 */
.quiz-options { ... }           /* 选项列表 */
.quiz-option { ... }            /* 单个选项 */
.quiz-option.correct { ... }    /* 正确状态 */
.quiz-option.wrong { ... }      /* 错误状态 */
.quiz-input { ... }             /* 简答题输入框 */
.quiz-explanation { ... }       /* 解析说明 */
.quiz-result { ... }            /* 结果汇总 */

/* === 首页赛道卡片 === */
.track-card { ... }
.track-card-header { ... }
.track-progress { ... }
.page-status-icon { ... }

/* === 相关专题链接 === */
.related-topics { ... }
.related-topic-link { ... }
```

### 5.5 现有 16 个专题页面 — 微改

**统一改动（每个页面都做）：**

1. **头部追加引用**（在 `</head>` 前）：
```html
<link rel="stylesheet" href="common.css">
<script src="progress.js"></script>
<script src="quiz.js"></script>
```

2. **底部替换/追加**（在 `</body>` 前）：
```html
<script src="nav.js"></script>
<script>
  // 页面级 Quiz 数据
  const quizData = [ ... ];  // 2-3 道题
  
  // SA 视角提示（仅赛道 A 页面）
  const saTips = [ ... ];
</script>
```

3. **Stepper 初始化调整**（如果使用 `initStepper`）：
```javascript
initStepper(stages, {
  pageId: 'neural-network',  // 新增
  enableQuiz: true,          // 新增
  quizData: quizData         // 新增
});
```

4. **相关专题链接**（在页面底部 stages 后面新增 HTML 段落）：
```html
<div class="related-topics">
  <h3>📚 相关专题</h3>
  <a href="transformer.html" class="related-topic-link">→ Transformer 架构（后续）</a>
  <a href="pre-training.html" class="related-topic-link">→ 预训练（后续）</a>
</div>
```

**注意**: 大多数现有页面使用内联实现的 stepper（未引用 `stepper.js`），改造策略有两种：
- **方案 A**: 保留内联实现，仅在内联代码中追加 progress 调用 [NEEDS_CLARIFICATION]
- **方案 B**: 重构为统一引用 `stepper.js`，减少重复代码

---

## 6. 非功能需求

### 6.1 性能

| 指标 | 要求 |
|------|------|
| 首屏加载（index.html） | < 1.5s（无网络请求，纯本地文件） |
| 专题页加载 | < 1s |
| localStorage 读写 | < 10ms |
| 步骤切换动画 | 60fps（保持现有 CSS transition 性能） |
| 总 JS bundle 增量 | progress.js + quiz.js < 10KB（未压缩） |

### 6.2 兼容性

| 维度 | 要求 |
|------|------|
| 浏览器 | Chrome 90+, Safari 15+, Firefox 90+, Edge 90+ |
| 设备 | 桌面端为主，移动端基本可用（P2 深度适配） |
| 屏幕宽度 | ≥ 768px 最佳体验，≥ 375px 不破碎 |
| JavaScript | ES6+（箭头函数、模板字符串、const/let） |
| 网络 | 纯离线可用（无外部 CDN 依赖） |

### 6.3 可维护性

| 维度 | 要求 |
|------|------|
| 新增专题 | 只需创建 HTML 文件 + 在 `NAV_CONFIG` 中注册 |
| 样式一致性 | 新页面只需引用 `common.css` + 按模板写内联样式 |
| 进度系统 | progress.js 独立模块，不侵入现有页面逻辑 |
| Quiz 内容 | Quiz 数据内联在各页面，修改只影响单个文件 |

---

## 7. 技术约束

1. **纯静态部署** — 无服务器、无构建工具（Webpack/Vite）、无 npm 依赖
2. **保持现有视觉风格** — 深色渐变背景、发光卡片、圆角设计
3. **保持交互范式** — 逐步 Stepper + 左右键导航 + 自动播放
4. **stepper.js 核心逻辑不动** — `initStepper()` 的签名和内部步骤切换逻辑不变，仅追加新的 options 字段
5. **common.css 只追加不修改** — 已有样式规则不改动
6. **无外部网络依赖** — 不引入 CDN 字体/图标库/分析脚本
7. **localStorage 唯一存储** — 不使用 IndexedDB、Cookie 或其他存储
8. **单文件自包含原则** — 新页面可以在只有 common.css + progress.js + quiz.js + nav.js 的情况下独立运行

---

## 8. 待确认事项 [NEEDS_CLARIFICATION]

| # | 问题 | 影响范围 | 建议默认值 |
|---|------|----------|-----------|
| Q1 | 现有 14 个专题页面是否统一重构为引用 `stepper.js`（方案 B），还是保留内联实现、仅追加 progress 调用（方案 A）？ | 所有现有页面 | 建议方案 A（最小改动），后续迭代再统一 |
| Q2 | 赛道 B/C 页面的步骤可视化（如架构图）使用纯 HTML/CSS 还是 SVG？ | B1-B4, C1-C4 | 建议纯 HTML/CSS（与现有页面一致） |
| Q3 | "相关专题"链接的数据是硬编码在各页面中，还是集中管理在一个 JSON 文件？ | 所有页面 | 建议硬编码在各页面（保持单文件原则） |
| Q4 | Quiz 答错是否允许重试？重试几次？ | quiz.js | 建议无限重试，实时反馈对错 |
| Q5 | SA 视角侧边栏是默认显示还是需要用户点击展开？ | 赛道 A 全部页面 | 建议默认展开、可折叠 |
| Q6 | 首页三赛道是并排三列还是纵向三段？ | index.html | 建议桌面三列、移动端纵向 |
| Q7 | 进度数据是否需要导出/导入功能（如换电脑后恢复）？ | progress.js | P2 阶段考虑，本期不做 |

---

## 9. 实施优先级映射

| PRD 需求 | SPEC 对应章节 | 优先级 | 复杂度 |
|----------|--------------|--------|--------|
| R1: 内容重组为三大赛道 | §2.1 NAV_CONFIG, §5.1 index.html | P0 | 中 |
| R2: 首页重构 | §5.1 index.html | P0 | 中 |
| R3: 导航升级 | §5.2 nav.js, §5.5 各页面 | P0 | 中 |
| R4: 学习进度系统 | §2.3 progress.js, §2.5 localStorage | P1 | 低 |
| R5: Quiz 功能 | §2.4 quiz.js, §3.3 Quiz 数据格式 | P1 | 中 |
| R6: 跨专题知识关联 | §5.5 相关专题链接 | P1 | 低 |
| B1-B4 新增页面 | §4.1-4.4 | P0 | 高（内容创作） |
| C1-C4 新增页面 | §4.5-4.8 | P0 | 高（内容创作） |

---

## 10. 验收 Checklist

- [ ] 首页展示三条赛道，可切换浏览
- [ ] 所有 22 个专题页面（14 旧 + 8 新）在导航中完整收录
- [ ] 键盘快捷键（Alt+←/→, H）正常工作
- [ ] 面包屑导航在每个专题页正确显示
- [ ] B1-B4 每页 ≥ 7 个交互步骤
- [ ] C1-C4 每页 ≥ 7 个交互步骤
- [ ] 学习进度 localStorage 正确持久化
- [ ] 首页进度条实时反映完成状态
- [ ] Quiz 答题流程顺畅，答对后标记完成
- [ ] SA 视角提示在赛道 A 页面正确弹出
- [ ] 现有 14 个专题的内容和交互不破损
- [ ] 无外部网络请求（纯本地运行）
- [ ] Chrome/Safari/Firefox 均正常渲染
