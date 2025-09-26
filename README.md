# 🌍 世界时钟网站

一个简洁美观的世界时钟网站，可以实时显示全球10个主要城市的当前时间。

## ✨ 功能特点

- 🎨 现代化卡片设计，美观易用
- 🌐 显示10个主要城市的实时时间
- 📱 响应式设计，支持手机和桌面设备
- ⏰ 每秒自动更新时间
- 🎯 显示时区信息和日期
- 🏴 各国国旗标识
- ✨ 平滑动画效果

## 🌆 支持的城市

- 🇨🇳 北京 (中国)
- 🇺🇸 纽约 (美国)
- 🇬🇧 伦敦 (英国)
- 🇯🇵 东京 (日本)
- 🇦🇺 悉尼 (澳大利亚)
- 🇫🇷 巴黎 (法国)
- 🇺🇸 洛杉矶 (美国)
- 🇸🇬 新加坡 (新加坡)
- 🇷🇺 莫斯科 (俄罗斯)
- 🇦🇪 迪拜 (阿联酋)

## 🚀 使用方法

### 本地使用
1. 直接在浏览器中打开 `index.html` 文件
2. 或者通过本地服务器访问项目目录

### GitHub Pages 部署

#### 方法一：通过GitHub界面（推荐）
1. **创建GitHub仓库**
   - 登录GitHub，创建新仓库
   - 仓库名可以是 `world-clock` 或任意名称
   - 设置为Public（私有仓库需要付费计划）

2. **上传代码**
   - 将所有文件上传到仓库主分支（main）
   - 确保 `index.html` 在根目录

3. **启用GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main" 
   - Folder 选择 "/ (root)"
   - 点击 Save

4. **访问网站**
   - 几分钟后访问：`https://你的用户名.github.io/仓库名`

#### 方法二：使用Git命令行
```bash
# 1. 初始化Git仓库
git init
git add .
git commit -m "Initial commit: World Clock Website"

# 2. 连接到GitHub仓库
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main

# 3. 按照方法一的步骤3-4启用GitHub Pages
```

#### 自动部署
- 项目已包含GitHub Actions配置
- 每次推送到main分支会自动部署
- 部署状态可在Actions标签查看

## 📁 文件结构

```
├── index.html     # 主页面文件
├── style.css      # 样式文件
├── script.js      # JavaScript逻辑文件
└── README.md      # 说明文件
```

## 🛠 技术栈

- HTML5
- CSS3 (支持渐变、毛玻璃效果、动画)
- 原生JavaScript (ES6+)
- 响应式设计

## 📱 兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动端浏览器

## ⚡ 特色技术

- 使用 `Intl.DateTimeFormat` API 处理时区转换
- CSS Grid 布局实现响应式卡片排列
- CSS backdrop-filter 实现毛玻璃效果
- 页面可见性API优化性能
- 平滑的CSS动画和过渡效果

享受您的世界时钟体验！🕐