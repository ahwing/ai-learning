# AI · SA · Agent 学习平台

一个交互式的 AWS 解决方案架构师 (SA) 学习平台，专注于 AI/ML 服务和 Agent 架构。

## 📚 项目概述

本项目提供 **24 个专题模块**，涵盖从底层 AI 基础到企业级 Agent 部署的完整学习路径，帮助 AWS SA 快速掌握：

- 🧠 **AI 基础能力**：神经网络、Transformer、RAG、多模态等核心技术
- ☁️ **AWS AI 服务**：Amazon Bedrock、SageMaker、Inferentia 等服务全景
- 🤖 **Agentic AI**：Multi-Agent 架构、Agent 框架 (LangGraph/CrewAI/AutoGen)、MCP 协议
- 🏗️ **架构实践**：成本优化、安全合规、企业级部署

## 🎯 三大学习赛道

### 赛道 A: AI 基础能力 (16 个专题)

**AI 基础**
- 🧠 神经网络基础
- 🧱 Transformer 架构
- 🔥 预训练
- 📈 Scaling Laws

**模型训练**
- 📝 监督微调 (SFT)
- 🎯 对齐 (RLHF/DPO)
- 🧠 推理强化 (RL)

**部署应用**
- ☁️ Amazon Bedrock 全景
- ⚡ 推理部署
- 🔍 RAG 检索增强生成
- ✍️ Prompt Engineering
- 📊 Evaluation 评估
- 🔌 MCP (Model Context Protocol)

**进阶应用**
- 🌐 多模态 AI
- 🤖 AI Agent
- 🛡️ Guardrails & AI 安全

### 赛道 B: SA 能力 (4 个专题)

- ☁️ AWS AI/ML 服务全景
- 🏗️ AI 架构模式
- 💰 成本优化与选型
- 🔒 安全合规

### 赛道 C: Agent 能力 (4 个专题)

- 🤝 Multi-Agent 架构
- 🔧 Agent 编排框架 (LangGraph/CrewAI/AutoGen/Amazon Bedrock Agents)
- 📊 Agent 评估与可观测性
- 🏢 企业级 Agent 部署

## 🚀 快速开始

### 本地运行

1. 克隆项目到本地：
```bash
git clone <repository-url>
cd ai-learning
```

2. 使用本地服务器打开：
```bash
# Python 3
python3 -m http.server 8000

# 或者使用 Node.js
npx http-server -p 8000
```

3. 在浏览器访问：
```
http://localhost:8000
```

### 学习建议

1. **新手建议**：从 **赛道 A** 开始，按顺序学习 AI 基础和部署应用
2. **有基础的 SA**：可直接进入 **赛道 B** 学习 AWS AI 服务架构
3. **Agent 开发者**：建议先学完赛道 A 的「MCP」和「AI Agent」，再进入 **赛道 C**

## 🎨 核心特性

- ✨ **交互式动画**：170+ 步骤式动画演示，可视化复杂概念
- 📊 **进度追踪**：自动保存学习进度，支持断点续学
- ⌨️ **键盘导航**：`←` `→` 翻页，`H` 返回首页，`R` 重置进度
- 📱 **响应式设计**：支持桌面、平板、手机多端访问
- 🎯 **测验系统**：每个专题配有知识测验，巩固学习效果

## 🔑 AWS AI 核心主题

### Amazon Bedrock
- Bedrock 服务架构与 API
- Agents for Bedrock (工具调用、知识库、动作组)
- Bedrock Guardrails
- 模型选择与性能优化

### 多 Agent 系统 (Multi-Agent)
- Agent 协作模式：层级式、网状式、流水线式
- Agent 间通信协议
- 任务分解与调度策略
- 冲突解决与共识机制

### MCP (Model Context Protocol)
- MCP 协议标准
- 客户端-服务器架构
- 工具调用与资源管理
- 与 Agent 框架集成

### Agent 框架
- **LangGraph**：状态图编排、流式输出、记忆管理
- **CrewAI**：角色驱动的多 Agent 协作
- **AutoGen**：多 Agent 对话与代码执行
- **Amazon Bedrock Agents**：原生 AWS 托管方案

## 📂 项目结构

```
ai-learning/
├── index.html              # 🏠 首页 - 学习路径导航
├── README.md               # 📖 本文件
├── .gitignore              # Git 忽略配置
│
├── pages/                  # 📚 学习页面 (按赛道分类)
│   ├── track-a/           # 赛道 A: AI 基础 (16 个专题)
│   │   ├── neural-network.html      # 神经网络基础
│   │   ├── transformer.html         # Transformer 架构
│   │   ├── pre-training.html        # 预训练
│   │   ├── scaling-laws.html        # Scaling Laws
│   │   ├── sft.html                 # 监督微调 (SFT)
│   │   ├── rlhf.html                # 对齐 (RLHF/DPO)
│   │   ├── rl-reasoning.html        # 推理强化 (RL)
│   │   ├── bedrock-overview.html    # ⭐ Amazon Bedrock 全景
│   │   ├── inference.html           # 推理部署
│   │   ├── rag.html                 # RAG 检索增强生成
│   │   ├── prompt-engineering.html  # Prompt Engineering
│   │   ├── evaluation.html          # Evaluation 评估
│   │   ├── mcp.html                 # ⭐ MCP 协议
│   │   ├── multimodal.html          # 多模态 AI
│   │   ├── agent.html               # ⭐ AI Agent
│   │   └── guardrails.html          # Guardrails & AI 安全
│   │
│   ├── track-b/           # 赛道 B: SA 能力 (4 个专题)
│   │   ├── b1-aws-ai-services.html      # ⭐ AWS AI/ML 服务全景
│   │   ├── b2-architecture-patterns.html # AI 架构模式
│   │   ├── b3-cost-optimization.html     # 成本优化与选型
│   │   └── b4-security-compliance.html   # 安全合规
│   │
│   └── track-c/           # 赛道 C: Agent 能力 (4 个专题)
│       ├── c1-multi-agent.html        # ⭐ Multi-Agent 架构
│       ├── c2-agent-frameworks.html   # ⭐ Agent 编排框架
│       ├── c3-agent-evaluation.html   # Agent 评估与可观测性
│       └── c4-enterprise-agent.html   # 企业级 Agent 部署
│
├── assets/                 # 🎨 静态资源
│   ├── common.css         # 全局样式
│   ├── nav.js             # 导航逻辑 (键盘快捷键、页面跳转)
│   ├── progress.js        # 进度管理 (LocalStorage 持久化)
│   ├── quiz.js            # 测验系统
│   └── stepper.js         # 步骤动画引擎
│
└── docs/                   # 📄 文档
    ├── codex-guide.md     # Claude Code 入门指南
    └── .pipeline/         # 开发流水线文档 (构建产物)

⭐ = AWS AI / Agent 核心主题
```

## 🛠️ 技术栈

- 纯前端实现：HTML5 + CSS3 + Vanilla JavaScript
- 无需构建工具，开箱即用
- LocalStorage 持久化学习进度
- 响应式布局，支持暗色主题

## 📖 学习路径示例

### 场景 1：我想快速了解 AWS AI 服务
```
index.html → b1-aws-ai-services.html → bedrock-overview.html
```

### 场景 2：我想学习构建 Agent 系统
```
index.html → agent.html → mcp.html → c1-multi-agent.html → c2-agent-frameworks.html
```

### 场景 3：我想深入理解 AI 底层原理
```
index.html → neural-network.html → transformer.html → pre-training.html → sft.html → rlhf.html
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

如果你有新的专题建议或发现内容错误，请：
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/new-topic`)
3. 提交更改 (`git commit -m '添加新专题：xxx'`)
4. 推送到分支 (`git push origin feature/new-topic`)
5. 创建 Pull Request

## 📄 许可证

MIT License

## 🔗 相关资源

- [AWS AI/ML 官方文档](https://docs.aws.amazon.com/machine-learning/)
- [Amazon Bedrock 文档](https://docs.aws.amazon.com/bedrock/)
- [MCP 协议规范](https://modelcontextprotocol.io/)
- [LangGraph 文档](https://langchain-ai.github.io/langgraph/)

---

**开始学习** → 打开 `index.html` 选择你的学习路径！
