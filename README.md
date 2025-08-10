# 码农来了

<div align="center">
  <img src="./public/favicon.svg" alt="码农来了" width="120" height="120">
  <h3>一个现代化的个人技术博客平台</h3>
  <p>基于 Vue 3 + TypeScript + Vite 构建的响应式技术博客</p>
</div>

## 📖 项目简介

「码农来了」是一个专为程序员打造的现代化个人技术博客平台。项目采用最新的前端技术栈，提供了完整的用户认证系统、文章管理、分类标签、搜索功能等，致力于为技术分享者提供一个优雅、高效的内容展示平台。
## 🖼️ 作品展示

<div align="center">
  <img src="https://github.com/chenZai90/AIBlog/blob/main/screenShotes/1.png" alt="截图1" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
  <img src="https://github.com/chenZai90/AIBlog/blob/main/screenShotes/2.png" alt="截图2" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
  
    <img src="https://github.com/chenZai90/AIBlog/blob/main/screenShotes/3.png" alt="截图2" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
    
      <img src="https://github.com/chenZai90/AIBlog/blob/main/screenShotes/4.png" alt="截图2" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
      
        <img src="https://github.com/chenZai90/AIBlog/blob/main/screenShotes/5.png" alt="截图2" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
        
        
          <img src="https://github.com/chenZai90/AIBlog/blob/main/screenShotes/6.png" alt="截图2" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
          
          
            <img src="https://github.com/chenZai90/AIBlog/blob/main/screenShotes/7.png" alt="截图2" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
            
              <img src="https://github.com/chenZai90/AIBlog/blob/main/screenShotes/8.png" alt="截图2" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
  
</div>
### ✨ 项目特色

- 🎨 **现代化设计** - 简洁优雅的 UI 设计，支持深色/浅色主题切换
- 📱 **响应式布局** - 完美适配桌面端、平板和移动设备
- 🔐 **用户认证系统** - 完整的登录/注册功能，支持会话管理
- 📝 **文章管理** - 支持文章分类、标签、搜索和分页
- 🚀 **性能优化** - 基于 Vite 构建，支持热模块替换和快速开发
- 🎯 **TypeScript** - 全面的类型安全保障

## 🚀 功能特性

### 核心功能
- ✅ 用户注册/登录系统
- ✅ 个人信息展示
- ✅ 文章列表和详情页
- ✅ 文章分类和标签管理
- ✅ 全文搜索功能
- ✅ 用户中心和个人资料管理
- ✅ 响应式设计
- ✅ 深色/浅色主题切换

### 页面结构
- 🏠 **首页** - 展示最新文章、热门分类和个人介绍
- 📝 **文章详情** - 完整的文章阅读体验
- 🔍 **搜索页面** - 支持关键词搜索
- 🏷️ **分类/标签页** - 按分类或标签浏览文章
- 👤 **用户中心** - 个人信息管理
- 🔐 **登录/注册** - 用户认证页面

## 🛠️ 技术栈

### 前端框架
- **Vue 3.4.15** - 渐进式 JavaScript 框架
- **TypeScript 5.3.3** - JavaScript 的超集，提供静态类型检查
- **Vite 5.0.12** - 下一代前端构建工具

### 状态管理与路由
- **Pinia 3.0.3** - Vue 的状态管理库
- **Vue Router 4.2.5** - Vue.js 官方路由管理器

### UI 与样式
- **Tailwind CSS 3.4.1** - 实用优先的 CSS 框架
- **Lucide Vue Next** - 美观的图标库
- **VueUse** - Vue 组合式 API 工具集

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 后处理器
- **Autoprefixer** - CSS 自动添加浏览器前缀

## 📁 项目结构

```
TraeWorks/
├── public/                 # 静态资源
│   ├── favicon.svg        # 网站图标
│   └── vite.svg          # Vite 图标
├── src/
│   ├── components/        # 可复用组件
│   │   ├── AppLayout.vue # 应用布局组件
│   │   └── Empty.vue     # 空状态组件
│   ├── composables/       # 组合式函数
│   │   └── useTheme.ts   # 主题切换逻辑
│   ├── data/             # 静态数据
│   │   ├── articles.json # 文章数据
│   │   ├── personal-info.json # 个人信息
│   │   └── users.json    # 用户数据
│   ├── lib/              # 工具库
│   │   └── utils.ts      # 通用工具函数
│   ├── pages/            # 页面组件
│   ├── router/           # 路由配置
│   │   └── index.ts      # 路由定义
│   ├── stores/           # 状态管理
│   │   ├── app.ts        # 应用状态
│   │   ├── articles.ts   # 文章状态
│   │   └── auth.ts       # 认证状态
│   ├── types/            # TypeScript 类型定义
│   │   └── index.ts      # 全局类型
│   ├── views/            # 视图组件
│   │   ├── HomeView.vue  # 首页
│   │   ├── LoginView.vue # 登录页
│   │   ├── ProfileView.vue # 用户中心
│   │   └── ...           # 其他页面
│   ├── App.vue           # 根组件
│   ├── main.ts           # 应用入口
│   └── style.css         # 全局样式
├── .vscode/              # VS Code 配置
├── package.json          # 项目依赖
├── vite.config.ts        # Vite 配置
├── tailwind.config.js    # Tailwind 配置
└── tsconfig.json         # TypeScript 配置
```

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd TraeWorks

# 安装依赖
npm install
# 或
yarn install
```

### 开发环境运行

```bash
# 启动开发服务器
npm run dev
# 或
yarn dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看项目

### 构建生产版本

```bash
# 构建项目
npm run build
# 或
yarn build

# 预览构建结果
npm run preview
# 或
yarn preview
```

## 🔐 测试账号

项目提供了以下测试账号供体验：

### 管理员账号
- **邮箱/用户名**: `624990742@qq.com` 或 `chenZai90`
- **密码**: `password123`
- **权限**: 管理员权限

### 普通用户账号
- **邮箱/用户名**: `user@example.com` 或 `testuser`
- **密码**: `password123`
- **权限**: 普通用户权限

> 💡 **提示**: 所有测试账号的密码都是 `password123`

## 🌐 部署指南

### Vercel 部署（推荐）

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

### GitHub Pages 部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到 GitHub Pages**
   - 将 `dist` 文件夹内容推送到 `gh-pages` 分支
   - 在仓库设置中启用 GitHub Pages

### 其他静态托管服务

项目构建后的 `dist` 文件夹可以部署到任何静态托管服务：
- Netlify
- Surge.sh
- Firebase Hosting
- 阿里云 OSS
- 腾讯云 COS

## 🔧 开发说明

### 代码规范

项目使用 ESLint 进行代码质量检查：

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint:fix
```

### 类型检查

```bash
# TypeScript 类型检查
npm run type-check
```

### 项目配置

- **Vite 配置**: `vite.config.ts`
- **TypeScript 配置**: `tsconfig.json`
- **Tailwind 配置**: `tailwind.config.js`
- **ESLint 配置**: `eslint.config.js`

### 开发建议

1. **组件开发**: 保持组件单一职责，控制在 300 行以内
2. **状态管理**: 使用 Pinia 进行状态管理，按功能模块划分 store
3. **类型安全**: 充分利用 TypeScript 的类型系统
4. **响应式设计**: 使用 Tailwind CSS 的响应式工具类
5. **性能优化**: 合理使用 Vue 3 的响应式 API

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. **Fork 项目**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

### 提交规范

请使用以下格式提交代码：

```
type(scope): description

[optional body]

[optional footer]
```

**类型说明**:
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 👨‍💻 作者

**贾晨** - iOS开发工程师

- 📧 邮箱: 624990742@qq.com
- 🐙 GitHub: [您的GitHub链接]
- 📝 掘金: [您的掘金链接]

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [Lucide](https://lucide.dev/) - 美观的图标库

---

<div align="center">
  <p>如果这个项目对你有帮助，请给个 ⭐️ 支持一下！</p>
  <p>Made with ❤️ by 贾晨</p>
</div>
