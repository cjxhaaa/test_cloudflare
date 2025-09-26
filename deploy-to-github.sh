#!/bin/bash

echo "🚀 GitHub Pages 部署助手"
echo "========================="

# 检查是否已经是Git仓库
if [ -d ".git" ]; then
    echo "✅ 检测到Git仓库已存在"
else
    echo "📦 初始化Git仓库..."
    git init
    echo "✅ Git仓库初始化完成"
fi

# 添加所有文件
echo "📝 添加文件到Git..."
git add .

# 检查是否有更改需要提交
if git diff --staged --quiet; then
    echo "ℹ️  没有检测到文件更改"
else
    echo "💾 提交更改..."
    git commit -m "Update: World Clock Website $(date '+%Y-%m-%d %H:%M:%S')"
    echo "✅ 文件提交完成"
fi

# 检查是否设置了远程仓库
if git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 检测到远程仓库已配置"
    echo "📤 推送到GitHub..."
    git push origin main
    echo "🎉 推送完成！"
else
    echo ""
    echo "⚠️  请先在GitHub创建仓库，然后运行以下命令："
    echo "git remote add origin https://github.com/你的用户名/仓库名.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
fi

echo ""
echo "📋 后续步骤："
echo "1. 确保GitHub仓库已创建且为Public"
echo "2. 进入仓库 Settings → Pages"
echo "3. Source 选择 'Deploy from a branch'"
echo "4. Branch 选择 'main'，Folder 选择 '/ (root)'"
echo "5. 几分钟后访问: https://你的用户名.github.io/仓库名"
echo ""
echo "🎯 部署完成后，你的世界时钟将在线可用！"
