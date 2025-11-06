# 本地启动指南 | Local Setup Guide

## 📋 前置要求 | Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐) 或 npm/yarn

## 🚀 快速启动步骤 | Quick Start Steps

### 1. 安装依赖 | Install Dependencies

在项目根目录运行：

```bash
cd blog-test
pnpm install
```

### 2. 配置环境变量 | Configure Environment Variables

在 `packages/blog-starter-kit/themes/personal/` 目录下创建 `.env.local` 文件：

```env
# Hashnode GraphQL API 端点
NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT=https://gql.hashnode.com

# 你的 Hashnode 博客主机名（例如：your-username.hashnode.dev）
NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST=your-username.hashnode.dev

# 可选：你的博客基础 URL（用于部署时）
# NEXT_PUBLIC_BASE_URL=https://your-domain.com

# 可选：环境模式
# NEXT_PUBLIC_MODE=development
```

**重要提示**：
- 将 `your-username.hashnode.dev` 替换为你的实际 Hashnode 博客主机名
- 如果你还没有 Hashnode 账号，可以访问 [hashnode.com](https://hashnode.com) 注册

### 3. 启动开发服务器 | Start Development Server

在项目根目录运行：

```bash
pnpm run dev
```

或者直接运行特定主题：

```bash
# 运行 personal 主题
pnpm --filter @starter-kit/blog-personal dev

# 运行 hashnode 主题
pnpm --filter @starter-kit/blog-hashnode dev

# 运行 enterprise 主题
pnpm --filter @starter-kit/blog-enterprise dev
```

### 4. 访问应用 | Access the Application

打开浏览器访问：http://localhost:3000

## 📝 环境变量说明 | Environment Variables

| 变量名 | 必需 | 说明 | 示例 |
|--------|------|------|------|
| `NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT` | ✅ | Hashnode GraphQL API 端点 | `https://gql.hashnode.com` |
| `NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST` | ✅ | 你的 Hashnode 博客主机名 | `your-username.hashnode.dev` |
| `NEXT_PUBLIC_BASE_URL` | ❌ | 博客基础 URL（部署时使用） | `https://your-domain.com` |
| `NEXT_PUBLIC_MODE` | ❌ | 环境模式 | `development` 或 `production` |

## 🔧 常见问题 | Troubleshooting

### 问题 1: 找不到 dev 脚本

**解决方案**：已修复，根目录的 `package.json` 已包含 `dev` 脚本。

### 问题 2: Cannot read properties of undefined (reading 'document')

**解决方案**：已修复，相关代码已添加安全检查。

### 问题 3: missing required error components

**解决方案**：已创建 `404.tsx` 和 `_error.tsx` 错误页面组件。

### 问题 4: 环境变量未生效

**解决方案**：
- 确保 `.env.local` 文件在 `packages/blog-starter-kit/themes/personal/` 目录下
- 重启开发服务器
- 检查环境变量名称是否正确（注意大小写）

## 📚 更多信息 | More Information

- 项目使用 monorepo 结构，使用 pnpm workspace 管理
- 支持三个主题：personal、hashnode、enterprise
- 默认启动 personal 主题

## 🎯 下一步 | Next Steps

1. 配置你的 Hashnode 博客主机名
2. 自定义主题样式（编辑 `tailwind.config.js`）
3. 部署到 Vercel（参考 README.md）

