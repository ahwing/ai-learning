# OpenAI Codex — 新手完全指南

> 📅 最后更新：2026 年 6 月 · 适合新手 · 约 30 分钟阅读

面向新手的 OpenAI AI 编程助手完全指南。从安装到配置 Amazon Bedrock——你需要知道的一切都在这里。

---

## 目录

1. [Codex 简介](#codex-简介)
2. [与其他 AI 编程工具对比](#与其他-ai-编程工具对比)
3. [下载与安装](#下载与安装)
4. [首次使用](#首次使用)
5. [核心功能](#核心功能)
6. [架构概览](#架构概览)
7. [配置 Amazon Bedrock](#配置-amazon-bedrock)
8. [Bedrock 认证方式](#bedrock-认证方式)
9. [验证配置](#验证配置)
10. [Bedrock 上的功能限制](#bedrock-上的功能限制)
11. [常见问题 (FAQ)](#常见问题-faq)

---

## Codex 简介

OpenAI Codex 是一款 AI 驱动的编程助手，能够帮助开发者编写、调试、重构和理解多种编程语言的代码。它将 GPT 模型的强大能力与专为软件开发打造的工具相结合，提供横跨桌面应用、CLI 工具和 IDE 扩展的无缝体验。

与简单的代码补全工具不同，Codex 是一个**自主编程代理（Agentic Coding Assistant）**——它能理解项目上下文、执行多步任务、运行 Shell 命令，并在最少人工干预下交付可用的代码变更。

### 核心能力

| 能力 | 说明 |
|------|------|
| 🧠 代理式智能 | 超越自动补全——自主规划、执行和验证多步编程任务 |
| 🔗 全项目上下文 | 理解你的整个代码库、依赖关系和架构模式，提供上下文感知的建议 |
| 💻 多种界面 | 提供桌面应用、CLI 工具和 VS Code 扩展——选择最适合你工作流的方式 |
| 🔒 安全与隐私 | 代码保存在本地。模型在云端运行，但你的源代码不会被存储或用于训练 |

> 💡 **本指南适合谁？**
> 本指南面向 AI 编程助手新手，或者想将 Codex 配置为使用 Amazon Bedrock 的开发者。无需任何 AI 工具使用经验。

---

## 与其他 AI 编程工具对比

AI 编程助手领域正在快速发展。以下是 OpenAI Codex 与其他热门工具的对比：

| 功能 | OpenAI Codex | Cursor | Claude Code | GitHub Copilot |
|------|-------------|--------|-------------|----------------|
| **模型** | GPT-5.5 / GPT-5.4 | 多模型 (Claude, GPT 等) | Claude Sonnet/Opus | GPT-4o / 自定义 |
| **界面** | 桌面、CLI、VS Code | 独立 IDE (VS Code 分支) | 仅 CLI | VS Code、JetBrains、CLI |
| **代理模式** | ✅ 完整 | ✅ Composer | ✅ 完整 | ⚠️ 有限 |
| **Goal Mode（目标模式）** | ✅ 支持 | ❌ 不支持 | ❌ 不支持 | ❌ 不支持 |
| **MCP 支持** | ✅ 支持 | ✅ 支持 | ✅ 支持 | ⚠️ 有限 |
| **自定义后端** | ✅ Bedrock、Azure | ✅ API Key | ⚠️ Bedrock | ❌ 不支持 |
| **子代理（Subagents）** | ✅ 支持 | ❌ 不支持 | ⚠️ 有限 | ❌ 不支持 |
| **定价** | 按用量 / Pro 计划 | $20/月 (Pro) | 按用量 (API) | $10–39/月 |

> ℹ️ **核心差异点**
> Codex 的独特优势是 **Goal Mode（目标模式）**——你只需描述想要什么，Codex 会自主规划、编码、测试并交付结果。配合 Subagents 和 MCP 支持，它更像是一个初级开发者而非代码补全工具。

---

## 下载与安装

Codex 有三种形式可供选择。挑选最适合你工作流的一种，或者全部安装以获得最大灵活性。

### 桌面应用

#### macOS

1. **下载安装包** — 访问 [codex.openai.com/download](https://codex.openai.com/download)，点击 **"Download for macOS"**，下载 `.dmg` 文件。
2. **安装应用** — 打开 `.dmg` 文件，将 "Codex" 拖入「应用程序」文件夹。
3. **授权权限** — 首次启动时，macOS 可能会要求确认打开该应用。前往 **系统设置 → 隐私与安全性**，点击"仍然打开"。
4. **启动并登录** — 从「应用程序」打开 Codex，系统会提示你使用 OpenAI 账户登录。

#### Windows

1. **下载安装包** — 访问 [codex.openai.com/download](https://codex.openai.com/download)，点击 **"Download for Windows"**，下载 `.exe` 安装程序。
2. **运行安装程序** — 双击 `.exe` 文件，按照向导操作——建议使用默认设置。
3. **启动并登录** — 在开始菜单找到 "Codex" 并启动，使用 OpenAI 账户登录。

### CLI 命令行

#### macOS (Homebrew)

```bash
# 通过 Homebrew 安装
brew install codex

# 验证安装
codex --version

# 登录 OpenAI 账户
codex auth login
```

#### Windows (winget / scoop)

```powershell
# 方式 A：使用 winget
winget install OpenAI.Codex

# 方式 B：使用 scoop
scoop bucket add extras
scoop install codex

# 验证安装
codex --version
```

#### Linux

```bash
# 通过官方脚本安装
curl -fsSL https://codex.openai.com/install.sh | sh

# 或通过 npm 安装
npm install -g @openai/codex

# 验证安装
codex --version
```

### VS Code 扩展

1. **打开 VS Code 扩展面板** — 按 `Ctrl+Shift+X`（Windows/Linux）或 `Cmd+Shift+X`（macOS）打开扩展面板。
2. **搜索 "OpenAI Codex"** — 在搜索框输入 "OpenAI Codex"，找到 OpenAI 发布的官方扩展（带有认证发布者标志）。
3. **安装** — 点击 **"Install"** 按钮，扩展会自动下载并激活。
4. **登录** — 安装后，左侧活动栏会出现 Codex 图标。点击它，使用 OpenAI 账户登录。

命令行安装方式：

```bash
code --install-extension openai.codex
```

---

## 首次使用

安装完成后，按以下步骤开始你的第一次 Codex 会话。

### 登录

1. **启动 Codex** — 打开桌面应用，或在项目目录中运行 `codex` 命令。
2. **认证身份** — 浏览器窗口将自动打开 OpenAI 登录页面。使用你的 OpenAI 账户（邮箱/密码或 SSO）登录。
3. **授权访问** — 授予 Codex 访问你账户的权限。这使应用能够使用你的 API 额度或 Pro 订阅。
4. **准备就绪！** — 认证完成后，你会看到 Codex 工作区，一个空白会话等待你的第一个指令。

### 创建第一个会话

导航到项目目录（CLI）或打开项目文件夹（桌面/VS Code），然后开始编码：

```bash
# 导航到你的项目
cd ~/projects/my-app

# 启动交互式 Codex 会话
codex

# 或直接以 Goal Mode（目标模式）启动
codex "给设置页面添加一个暗色模式开关"

# 明确以 Chat Mode（对话模式）启动
codex --mode chat
```

> ✅ **小技巧**
> 始终从项目根目录启动 Codex。这能让它访问完整的代码库上下文，包括 package.json、requirements.txt 和其他配置文件，从而提供更好的建议。

### 界面概览

```
┌─────────────────────────────────────────────────────────────┐
│ ● ● ●        Codex — ~/projects/my-app                      │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                   │
│ 会话列表  │    [用户] 给设置页面添加一个暗色模式开关            │
│          │                                                   │
│ ● 当前会话│    [Codex] 我来添加暗色模式开关。以下是我的计划：   │
│ ○ 修复Bug │      1. 创建 ThemeToggle 组件                     │
│ ○ 添加API │      2. 添加暗色主题的 CSS 变量                   │
│          │      3. 接入设置页面                               │
│ 模式:    │                                                   │
│ [⚡目标]  │    + src/components/ThemeToggle.tsx (新建)         │
│ [💬对话]  │    ~ src/styles/theme.css (修改)                  │
│          │                                                   │
│          ├──────────────────────────────────────────────────┤
│          │ ● 已连接          GPT-5.5 · 2.3k tokens          │
│          ├──────────────────────────────────────────────────┤
│          │ 输入消息或描述目标...                        [⏎]   │
└──────────┴──────────────────────────────────────────────────┘
```

*图 1：Codex 桌面应用界面——左侧为会话面板，中间为对话区域，底部为输入框。*

---

## 核心功能

Codex 提供了多项强大功能，使其远超简单的代码补全工具。以下逐一深入介绍。

### ⚡ Goal Mode（目标模式）

Goal Mode 是 Codex 最强大的功能。你不需要来回对话，只需描述一个**高层目标**，Codex 就会自主规划并执行工作——编写代码、创建文件、安装依赖包、运行测试。

**Goal Mode 工作原理：**

1. **你描述目标** — "添加 JWT 用户认证和登录页面"
2. **Codex 制定计划** — 分析你的代码库，创建逐步执行计划，确定需要创建/修改的文件。
3. **Codex 执行** — 编写代码、安装依赖、创建文件、运行测试——全程自动化。
4. **你审查结果** — 以统一 diff 的形式审查变更，批准、要求修改或拒绝。

**Goal Mode 示例：**

```bash
# 简单目标
codex "修复 auth.test.js 中失败的测试"
codex "重构数据库模块，使用连接池"

# 复杂目标
codex "为 products 资源添加包含增删改查的 REST API，包括数据验证、错误处理和单元测试"

# 带约束的目标
codex "将 Express 迁移到 Fastify，保持公共 API 接口不变"
```

### 💬 Chat Mode（对话模式）

Chat Mode 提供对话式交互界面，适用于讨论代码、提问或迭代解决问题。可以把它想象成与 AI 结对编程。

| 用途 | 说明 |
|------|------|
| ❓ 提问 | "认证中间件是怎么工作的？"——获取你自己代码或任何概念的解释 |
| 🐛 协作调试 | 粘贴错误信息和堆栈跟踪，讨论根因，协同迭代修复 |

### 🎓 Skills（技能）

Skills 是你可以教给 Codex 的可复用指令。它们相当于标准操作规程（SOP），Codex 在执行特定类型任务时会遵循这些指令。

```markdown
# ~/.codex/skills/create-component.md

# 技能：创建 React 组件

当被要求创建 React 组件时：

1. 在 src/components/ 下创建组件文件
2. 使用 TypeScript 并定义 Props 接口
3. 在导出组件上添加 JSDoc 注释
4. 创建对应的 .test.tsx 文件并编写基础测试
5. 从 components/index.ts barrel 文件中导出
6. 命名规范：文件名使用 PascalCase
7. 使用 styled-components 编写样式（非 CSS modules）
```

### 🔌 MCP（模型上下文协议）

MCP 允许 Codex 连接外部工具和数据源——数据库、API、文档服务、文件系统等——将其能力扩展到本地项目文件之外。

```toml
# ~/.codex/config.toml — MCP 服务器配置

# 连接 PostgreSQL 数据库
[[mcp_servers]]
name = "postgres"
command = "npx"
args = ["@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]

# 连接 GitHub 获取 PR/Issue 上下文
[[mcp_servers]]
name = "github"
command = "npx"
args = ["@modelcontextprotocol/server-github"]
env = { GITHUB_TOKEN = "ghp_xxxxxxxxxxxx" }

# 连接文档搜索工具
[[mcp_servers]]
name = "docs"
command = "npx"
args = ["@modelcontextprotocol/server-brave-search"]
env = { BRAVE_API_KEY = "BSAxxxxxxxxx" }
```

### 👁️ Auto-Review（自动审查）

Auto-Review 在将代码变更展示给你之前自动进行验证。它能提前发现问题，让你信任输出结果。检查内容包括：

- 语法错误和类型问题
- 变更引入的测试失败
- Lint 违规和格式不一致
- 安全漏洞（基本静态分析）
- 依赖冲突和缺失的导入
- 逻辑错误和边界情况遗漏

### 🤖 Subagents（子代理）

Subagents 允许 Codex 为复杂任务生成专门的子代理。每个子代理独立处理一个聚焦的子任务并向主代理汇报，实现问题不同部分的并行处理。

```
                    ┌─────────────┐
                    │   主代理     │
                    └──────┬──────┘
              ┌────────────┼────────────┐
              ▼            ▼            ▼
     ┌────────────┐ ┌────────────┐ ┌────────────┐
     │子代理：前端 │ │子代理：API │ │子代理：测试 │
     └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
           ▼              ▼              ▼
     ┌──────────┐  ┌──────────┐  ┌──────────┐
     │✓ UI 已构建│  │✓ 端点已建 │  │✓ 测试通过 │
     └─────┬────┘  └─────┬────┘  └─────┬────┘
           └──────────────┼──────────────┘
                          ▼
                  ┌──────────────┐
                  │ 合并并交付 ✓  │
                  └──────────────┘
```

*图 2：子代理架构——主代理将专项任务委托给聚焦的子代理并行工作，然后合并结果。*

---

## 架构概览

了解 Codex 的内部工作原理有助于你更好地使用它，并有效排查问题。

```
┌─────────────────────────────────────────────────────────────────────┐
│  用户层 — 你的交互界面                                                │
│  ┌──────────┐  ┌─────┐  ┌──────────────┐                           │
│  │ 桌面应用  │  │ CLI │  │ VS Code 扩展  │                           │
│  └──────────┘  └─────┘  └──────────────┘                           │
└───────────────────────────────┬─────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  代理层 — 在你的本地机器运行                                          │
│  ┌───────────┐  ┌────────┐  ┌────────┐  ┌────────┐                 │
│  │ 上下文引擎 │  │ 规划器  │  │ 执行器  │  │ 审查器  │                 │
│  │ (代码库索引)│  │(任务分解)│  │(代码生成)│  │(自动验证)│                 │
│  └───────────┘  └────────┘  └────────┘  └────────┘                 │
└───────────────────────────────┬─────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  模型提供层 — 云端推理                                                │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐             │
│  │ OpenAI 直连   │  │ Amazon Bedrock │  │ Azure OpenAI  │             │
│  │ GPT-5.5/5.4  │  │ openai.gpt-5.5│  │ 企业部署       │             │
│  │ 所有功能可用   │  │ 部分功能受限    │  │ 自定义端点     │             │
│  └──────────────┘  └───────────────┘  └──────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
```

*图 3：Codex 架构——本地代理层负责上下文和执行，云层通过你选择的提供商进行模型推理。*

---

## 配置 Amazon Bedrock

Amazon Bedrock 允许你将 Codex 的模型推理路由到你的 AWS 账户。这对于企业合规、成本管理（用量计入 AWS 承诺消费）和数据驻留要求非常有用。

### 前提条件

开始之前，请确认以下检查清单：

- ✅ **AWS 账户** — 需要一个已启用计费的活跃 AWS 账户。
- ✅ **Bedrock 模型访问** — 在 [Bedrock 控制台](https://console.aws.amazon.com/bedrock) 的 **Model access** 中请求访问 OpenAI 模型。启用 `openai.gpt-5.5` 和/或 `openai.gpt-5.4`。
- ✅ **IAM 权限** — 你的 AWS 身份需要以下权限：
  - `bedrock:InvokeModel`
  - `bedrock:InvokeModelWithResponseStream`
- ✅ **AWS CLI (v2)** — 如果打算使用 SDK 凭证，从 [docs.aws.amazon.com](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) 安装。
- ✅ **Codex 已安装** — 完成上面下载与安装章节的步骤。

> ⚠️ **模型访问审批**
> Bedrock 模型访问请求可能需要几分钟到几小时才能获批。请在继续以下配置步骤之前提交申请。

### 第 1 步：编辑配置文件

打开（或创建）Codex 配置文件 `~/.codex/config.toml`，将模型提供商设为 Amazon Bedrock：

```toml
# ~/.codex/config.toml

# ============================================
# OpenAI Codex — 模型提供商配置
# ============================================

# 设置模型提供商
# 选项: "openai" (默认), "amazon-bedrock", "azure-openai"
model_provider = "amazon-bedrock"

# 指定使用的模型
# 必须在 Bedrock 控制台中已开通
model = "openai.gpt-5.5"
```

终端操作：

```bash
# 如果 .codex 目录不存在则创建
mkdir -p ~/.codex

# 用你喜欢的编辑器打开配置文件
nano ~/.codex/config.toml
# 或: code ~/.codex/config.toml
# 或: vim ~/.codex/config.toml
```

---

## Bedrock 认证方式

Codex 支持多种 AWS 认证方式。选择最符合你组织安全策略的方式。

### 方式 A：AWS SDK 凭证（推荐）

#### 选项 1：AWS Configure（Access Keys）

最简单的方式——配置标准 AWS CLI 凭证，Codex 会自动发现。

```bash
# 运行 AWS 配置向导
aws configure

# 按提示输入：
AWS Access Key ID [None]: AKIA****************
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

#### 选项 2：环境变量

直接设置环境变量中的凭证——适用于 CI/CD 或临时会话。

```bash
# ~/.bashrc 或 ~/.zshrc

# 通过环境变量设置 AWS 凭证
export AWS_ACCESS_KEY_ID="AKIA****************"
export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
export AWS_DEFAULT_REGION="us-east-1"

# 可选：会话令牌（用于临时/角色切换凭证）
export AWS_SESSION_TOKEN="FwoGZXIvYXdzE..."
```

> ℹ️ **凭证优先级**
> Codex 遵循标准 AWS SDK 凭证解析顺序：环境变量 → 共享凭证文件 (~/.aws/credentials) → SSO/IAM Identity Center → EC2 实例配置文件。

### 方式 B：Bedrock API Key

如果你的组织提供了 Bedrock API Key，可以直接使用，无需配置完整的 AWS SDK。

```bash
# ~/.codex/.env

# Bedrock API Key 认证
AWS_BEARER_TOKEN_BEDROCK="br-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# AWS Region（必填）
AWS_REGION="us-east-1"
```

> ℹ️ **关于 Bedrock API Key**
> Bedrock API Key 在 AWS Bedrock 控制台的 "API Keys" 下生成。相比完整的 IAM 凭证，它提供了更简单的认证方式，但权限可能更受限。适合个人开发者或快速设置。

### 方式 C：AWS SSO

对于使用 AWS IAM Identity Center（原 AWS SSO）的组织，配置一个 SSO Profile 供 Codex 使用。

```bash
# 配置新的 SSO Profile
aws configure sso

# 按照交互式提示操作：
#   SSO session name: my-org
#   SSO start URL: https://my-org.awsapps.com/start
#   SSO region: us-east-1
#   SSO registration scopes: sso:account:access
#   CLI default client Region: us-east-1
#   CLI profile name: my-bedrock-profile

# 通过 SSO 登录（会打开浏览器）
aws sso login --profile my-bedrock-profile

# 告诉 Codex 使用哪个 Profile
export AWS_PROFILE="my-bedrock-profile"
```

对应的 AWS 配置文件示例：

```ini
# ~/.aws/config — SSO Profile 示例

[profile my-bedrock-profile]
sso_session = my-org
sso_account_id = 123456789012
sso_role_name = BedrockDeveloperAccess
region = us-east-1
output = json

[sso-session my-org]
sso_start_url = https://my-org.awsapps.com/start
sso_region = us-east-1
sso_registration_scopes = sso:account:access
```

### 第 2 步：创建 .env 文件设置 Region

在 Codex 配置目录中创建 `.env` 文件，指定 AWS Region：

```bash
# ~/.codex/.env

# 必填：Bedrock 模型所在的 AWS Region
AWS_REGION="us-east-1"

# 可选：自定义端点 URL（用于 VPC 端点或代理）
# BEDROCK_ENDPOINT_URL="https://vpce-xxx.bedrock-runtime.us-east-1.vpce.amazonaws.com"

# 可选：AWS Profile 覆盖（如果不使用默认 Profile）
# AWS_PROFILE="my-bedrock-profile"
```

一行命令快速设置：

```bash
# 创建 .env 文件并写入 Region
echo 'AWS_REGION="us-east-1"' > ~/.codex/.env

# 验证已创建
cat ~/.codex/.env
```

---

## 验证配置

配置完 Bedrock 后，使用 Codex 会话中的 `/status` 命令验证一切正常。

```
# 启动 Codex 并检查连接状态
> /status

╔═══════════════════════════════════════════════════╗
║              Codex 状态                           ║
╠═══════════════════════════════════════════════════╣
║  提供商:       Amazon Bedrock                     ║
║  模型:         openai.gpt-5.5                    ║
║  Region:       us-east-1                         ║
║  认证方式:     AWS SDK (profile: default)         ║
║  状态:         ● 已连接                           ║
║  延迟:         142ms                             ║
║  功能:         Goal ✓  Chat ✓  MCP ✓  Agents ✓  ║
╚═══════════════════════════════════════════════════╝
```

> ✅ **成功！**
> 如果你看到 **"状态: ● 已连接"** 以及你的 Bedrock 配置详情，就说明一切就绪！Codex 现在会将所有模型推理请求路由到你的 AWS Bedrock 账户。

> ❌ **连接失败？排查步骤：**
> 1. 验证凭证：`aws sts get-caller-identity`
> 2. 确认 Bedrock 控制台中模型访问已获批
> 3. 检查 Region 与模型启用的区域一致
> 4. 验证 IAM 权限包含 `bedrock:InvokeModel`

### Bedrock 上支持的模型

| 模型 ID | 描述 | 上下文窗口 | 最适用于 |
|---------|------|-----------|---------|
| `openai.gpt-5.5` | 最新且最强大的模型 | 256K tokens | 复杂任务、Goal Mode、大型代码库 |
| `openai.gpt-5.4` | 快速且经济的模型 | 128K tokens | Chat Mode、快速编辑、成本敏感场景 |

### 完整配置参考

以下是一个包含所有选项的完整 Bedrock 配置：

```toml
# ~/.codex/config.toml — 完整示例

# ============================================
# OpenAI Codex 配置
# 提供商: Amazon Bedrock
# ============================================

# 模型提供商（Bedrock 必填）
model_provider = "amazon-bedrock"

# 主模型
model = "openai.gpt-5.5"

# 备用模型（主模型限流或不可用时使用）
fallback_model = "openai.gpt-5.4"

# ============================================
# 可选: MCP 服务器
# ============================================
[[mcp_servers]]
name = "filesystem"
command = "npx"
args = ["@modelcontextprotocol/server-filesystem", "/Users/me/projects"]

[[mcp_servers]]
name = "github"
command = "npx"
args = ["@modelcontextprotocol/server-github"]
env = { GITHUB_TOKEN = "ghp_xxxxxxxxxxxx" }
```

```bash
# ~/.codex/.env — 环境变量

# AWS Region（Bedrock 必填）
AWS_REGION="us-east-1"

# 如果使用 Bedrock API Key 而非 SDK 凭证：
# AWS_BEARER_TOKEN_BEDROCK="br-xxxxxxxxxxxxxxxxxxxx"

# 如果使用指定的 AWS Profile：
# AWS_PROFILE="my-bedrock-profile"
```

---

## Bedrock 上的功能限制

通过 Amazon Bedrock 使用 Codex 时，一些依赖 OpenAI 特有基础设施的功能不可用。核心编码功能完全支持。

| 功能 | OpenAI 直连 | Amazon Bedrock | 备注 |
|------|------------|---------------|------|
| **Goal Mode（目标模式）** | ✅ 可用 | ✅ 可用 | 完整功能 |
| **Chat Mode（对话模式）** | ✅ 可用 | ✅ 可用 | 完整功能 |
| **Subagents（子代理）** | ✅ 可用 | ✅ 可用 | 完整功能 |
| **MCP 服务器** | ✅ 可用 | ✅ 可用 | 完整功能 |
| **Skills（技能）** | ✅ 可用 | ✅ 可用 | 完整功能 |
| **Auto-Review（自动审查）** | ✅ 可用 | ✅ 可用 | 完整功能 |
| **Fast Mode（快速模式）** | ✅ 可用 | ❌ 不可用 | 需要 OpenAI 特有的流式推理基础设施 |
| **Web Search（网络搜索）** | ✅ 可用 | ❌ 不可用 | 需要 OpenAI 搜索集成；可用 MCP Brave Search 替代 |
| **Image Generation（图片生成）** | ✅ 可用 | ❌ 不可用 | 需要 DALL·E 集成 |

> ⚠️ **实际影响**
> 不可用的功能（Fast Mode、Web Search、Image Generation）属于辅助性功能。**所有核心编码功能**——包括 Goal Mode、Chat Mode、Subagents、MCP 和 Auto-Review——在 Bedrock 上运行完全相同。大多数开发者在日常工作中不会感受到差异。

---

## 常见问题 (FAQ)

### Q1: 如何从 Bedrock 切换回 OpenAI 直连？

只需更新 `~/.codex/config.toml` 文件：

```toml
# 切换回 OpenAI 直连
model_provider = "openai"
model = "gpt-5.5"
```

然后重启 Codex（退出并重新打开）。你也可以直接**删除** `model_provider` 这一行——不指定 provider 时 Codex 默认使用 OpenAI 直连。使用 `/status` 确认更改已生效。

### Q2: 哪些 AWS Region 支持 Bedrock 上的 OpenAI 模型？

截至 2026 年 6 月，Amazon Bedrock 上的 OpenAI 模型在以下区域可用：

- **us-east-1**（弗吉尼亚北部）——所有模型，完全可用
- **us-west-2**（俄勒冈）——所有模型，完全可用
- **eu-west-1**（爱尔兰）——所有模型，完全可用
- **ap-northeast-1**（东京）——仅 GPT-5.5

查看 [Bedrock 模型可用性文档](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html) 获取最新信息。在 `~/.codex/.env` 中设置你选择的 Region。

### Q3: Bedrock 和 OpenAI 直连的定价有什么区别？

通过 Amazon Bedrock 的定价**与 OpenAI 官方定价一致**——你支付相同的 per-token 费率。关键区别在于计费和承诺消费方面的优势：

- **计费：** 费用出现在你的 AWS 账单上，而非单独的 OpenAI 发票
- **承诺消费：** 用量计入 AWS 企业折扣计划 (EDP) 和承诺用量
- **优惠券：** AWS 促销积分可用于 Bedrock 消费
- **统一账单：** 通过 AWS Organizations 管理多账户设置
- **成本分摊：** 为 Bedrock 用量打标签，用于部门间费用分摊

这使得 Bedrock 对有现存 AWS 消费承诺需要完成的企业尤为有吸引力。

### Q4: Codex 能离线使用吗？

**不能。** Codex 需要活跃的网络连接。AI 模型在云端运行（OpenAI 或 AWS Bedrock），所有代码生成、分析和对话功能都需要联网。

但是，一些本地功能在没有网络时仍可用：

- 本地文件索引和项目上下文构建可被缓存
- Skill 定义存储在本地，可编辑
- 之前生成的代码保留在文件系统中
- 会话历史存储在本地可供查看

如果在会话中断网，Codex 会显示错误并在恢复连接后重试。不会丢失任何工作。

### Q5: Goal Mode 和 Chat Mode 有什么区别？

**Goal Mode（目标模式）** 用于自主任务执行。你描述想要完成什么，Codex 自主规划、实现、测试并交付完整结果，无需进一步输入。把它想象成给一个能干的初级开发者分配任务。

**Chat Mode（对话模式）** 用于交互式协作。你进行来回对话，提问、讨论方案、一起迭代。把它想象成结对编程。

| 维度 | Goal Mode ⚡ | Chat Mode 💬 |
|------|-------------|-------------|
| 交互方式 | 一个提示 → 完整交付 | 多轮对话 |
| 最适用于 | 明确的、可交付的任务 | 探索、学习、调试 |
| 自主程度 | 高——几乎无需干预 | 低——你引导每一步 |
| 执行方式 | 运行命令、创建/编辑文件 | 建议代码供你应用 |
| 输出形式 | 统一 diff，可直接提交 | 代码片段和解释 |

**选择建议：** 如果你能清楚地说"我要完成 X" → Goal Mode。如果你在想"我需要帮忙弄清楚 X" → Chat Mode。

### Q6: 如何在 Codex 中使用 MCP 服务器？

MCP（模型上下文协议）服务器扩展 Codex 的外部数据源和工具能力。在 `~/.codex/config.toml` 中添加：

```toml
# 数据库访问——查询表结构和数据
[[mcp_servers]]
name = "postgres"
command = "npx"
args = ["@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/mydb"]

# 网络搜索能力
[[mcp_servers]]
name = "brave-search"
command = "npx"
args = ["@modelcontextprotocol/server-brave-search"]
env = { BRAVE_API_KEY = "BSAxxxxxxxxx" }

# GitHub——PR、Issue、代码搜索
[[mcp_servers]]
name = "github"
command = "npx"
args = ["@modelcontextprotocol/server-github"]
env = { GITHUB_TOKEN = "ghp_xxxx" }
```

**常用 MCP 服务器：** PostgreSQL、MySQL、GitHub、Brave Search、Filesystem、Puppeteer（浏览器自动化）、Slack、Linear、Sentry。访问 [MCP 服务器仓库](https://github.com/modelcontextprotocol/servers) 查看社区维护的完整列表。

### Q7: Codex vs Claude Code vs Cursor——应该选哪个？

以下是日常开发的实用对比：

**选 Codex 如果：** 你想要最大程度的自主性——描述目标，让 AI 全权处理。适合明确定义的任务、多文件变更、以及已在使用 AWS 的团队（Bedrock 集成）。子代理系统擅长复杂的可并行化工作。

**选 Claude Code 如果：** 你需要深度推理来解决难题——复杂调试、架构决策、全面代码审查。其长上下文窗口和推理深度无与伦比。纯 CLI 界面适合重度终端用户。

**选 Cursor 如果：** 你想要 AI 无缝集成到编辑器中。实时补全、内联编辑和熟悉的 VS Code 界面使其成为摩擦最小的选项。多模型支持（切换不同提供商）增加灵活性。

**很多开发者同时使用 2-3 个工具**应对不同场景。它们是互补的，不是互斥的。

### Q8: 如何排查常见错误？

以下是最常见的问题及解决方案：

**❌ "Model not found" 或 "Access denied"**
- 确认 Bedrock 控制台中模型访问已启用
- 检查模型 ID 是否完全匹配：`openai.gpt-5.5`（不是 `gpt-5.5`）
- 确保你的 Region 有该模型可用

**❌ "Invalid credentials" 或 "ExpiredToken"**
- 运行 `aws sts get-caller-identity` 测试凭证
- 如果用 SSO，运行 `aws sso login` 刷新会话
- 检查 .env 中的 AWS_REGION 与凭证的 Region 匹配

**❌ "Rate limit exceeded" / "ThrottlingException"**
- 在 Bedrock 控制台申请配额提升（Service Quotas）
- 在 config.toml 中添加 `fallback_model = "openai.gpt-5.4"`
- 减少 Goal Mode 任务的并发子代理数量

**❌ "Connection timeout" 或 "Network error"**
- 验证网络连接
- 检查 VPN/代理是否阻止了 AWS 端点
- 尝试不同 Region 排除区域性问题
- 确保防火墙允许 HTTPS 访问 `bedrock-runtime.{region}.amazonaws.com`

### Q9: 如何更新 Codex 到最新版本？

更新方式取决于你最初的安装方式：

```bash
# macOS (Homebrew)
brew upgrade codex

# npm / Node.js (任意平台)
npm update -g @openai/codex

# Windows (winget)
winget upgrade OpenAI.Codex

# Windows (scoop)
scoop update codex

# 查看当前版本
codex --version
```

**桌面应用：** 默认自动更新。手动检查：菜单栏 **Codex → Check for Updates**（macOS）或 **Help → Check for Updates**（Windows）。

**VS Code 扩展：** 除非禁用，否则自动更新。在扩展面板中检查是否有待更新。

### Q10: 安全和隐私方面需要注意什么？

Codex 非常重视安全性。以下是你需要了解的：

**🔐 数据处理：**
- 你的源代码会发送到模型提供商进行推理，但**不会被存储或用于模型训练**
- 使用 Bedrock 时，数据保留在你 AWS 账户的数据边界和 VPC 内（如已配置）
- 会话历史仅存储在你本地机器上
- 请求完成后，代码不会持久化在 OpenAI 或 AWS 服务器上

**🔑 认证安全：**
- 凭证存储在操作系统原生密钥库中（macOS Keychain、Windows 凭证管理器、Linux Secret Service）
- .env 文件中的 API Key 应设置受限权限：`chmod 600 ~/.codex/.env`

**🌐 网络安全：**
- 所有通信通过 TLS 1.3 加密
- Bedrock 支持 VPC 端点（流量走 AWS 骨干网络）
- 未经明确选择加入，不会收集遥测或使用数据

**✅ 最佳实践：**
- 将敏感文件添加到 `.codexignore`（类似 .gitignore）以防止发送到模型
- 使用临时凭证或 SSO，而非长期有效的 Access Key
- 始终在提交前审查代码变更——即使来自 Goal Mode
- 定期轮换 API Key

### Q11: 有哪些常用的快捷键和命令？

桌面应用的常用快捷键和所有界面通用的斜杠命令：

| 快捷键 / 命令 | 操作 |
|---------------|------|
| `Cmd/Ctrl + N` | 新建会话 |
| `Cmd/Ctrl + K` | 快速命令面板 |
| `Cmd/Ctrl + Shift + G` | 切换 Goal/Chat 模式 |
| `Cmd/Ctrl + Enter` | 发送消息 |
| `Escape` | 取消当前操作 |
| `/status` | 检查连接和提供商状态 |
| `/clear` | 清除会话上下文 |
| `/mode goal` | 切换到 Goal Mode |
| `/mode chat` | 切换到 Chat Mode |
| `/model` | 显示或更改当前模型 |
| `/help` | 显示所有可用命令 |

### Q12: Codex 支持哪些编程语言？

Codex 支持所有主流编程语言，在训练数据丰富的语言上表现最强：

- Python
- JavaScript / TypeScript
- Rust
- Go
- Java
- C / C++
- C#
- Ruby
- PHP
- Swift
- Kotlin
- Scala

还支持配置文件（YAML、TOML、JSON、HCL/Terraform）、Shell 脚本（Bash、Zsh、PowerShell）、SQL（所有方言）、HTML/CSS/SCSS 和标记语言（Markdown、LaTeX、reStructuredText）。

输出质量通常与该语言可用的公开训练数据量相关。小众或较新的语言输出可能不够可靠——请始终仔细审查生成的代码。

---

## 相关资源

- 📚 [官方文档](https://codex.openai.com/docs)
- 👥 [社区论坛](https://community.openai.com)
- 🐙 [GitHub 仓库](https://github.com/openai/codex)

---

*最后更新：2026 年 6 月 · 面向初学者的完整指南*
