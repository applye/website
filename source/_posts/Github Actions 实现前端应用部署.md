---
abbrlink: 4
title: Github Actions 实现前端应用部署
categories: '工具'
tags:
    - '工具'
    - 'git'
comments: false
date: 2019-04-15 23:28:34
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202305061518369.png'
---

##  Github Actions 简介

GitHub Actions 是 GitHub 的持续集成服务，于2018年10月推出。
大家知道，持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。

很多操作在不同项目里面是类似的，完全可以共享。GitHub 注意到了这一点，想出了一个很妙的点子，允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。

如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。这就是 GitHub Actions 最特别的地方。

GitHub 做了一个[官方市场](https://github.com/marketplace?type=actions)，可以搜索到他人提交的 actions。另外，还有一个 [awesome actions](https://github.com/sdras/awesome-actions) 的仓库，也可以找到不少 action。


### 基本概念

* workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。
* job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
* step（步骤）：每个 job 由多个 step 构成，一步步完成。
* action （动作）：每个 step 可以依次执行一个或多个命令（action）。

### 基本配置
```
// doc.yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [15]

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0
        
      - uses: pnpm/action-setup@v2.2.4
        with:
          version: 7

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          # 选择要使用的 node 版本
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      # 如果缓存没有命中，安装依赖
      - name: Install Dependencies
        run: pnpm install

      # 运行构建脚本
      - name: Build VuePress site
        run: | 
            npm run build:types
            npm run docs
            npm run docs:build


      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

```
# npm.yml 发布
name: npm 发布

on:
  # 每当 push tag 时触发npm发布
  push:
    tags: [v*]
  # 手动触发部署
  workflow_dispatch:

jobs:
  npm:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [15]

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0
        
      - uses: pnpm/action-setup@v2.2.4
        with:
          version: 7

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          # 选择要使用的 node 版本
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      # 安装依赖
      - name: Install Dependencies
        run: pnpm install

      # 测试
      - name: 测试
        run: |
            npm run test

      # 运行打包脚本
      - name: Build Npm
        run: | 
            npm run build
            build:types

      # 执行部署
      - name: 发布到 NPM
        uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/  # 设置发包npm地址仓库

      - run: npm run npublish # 执行发布
        env:
            NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}} # 刚刚设置的 NPM_TOKEN

```