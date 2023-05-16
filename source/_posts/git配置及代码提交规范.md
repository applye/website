---
abbrlink: 4
title: git配置及代码提交规范
categories: '工具'
tags:
  - '工具'
  - 'git'
comments: false
date: 2019-04-15 23:28:34
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202209041732591.jpg'
---

> 1. TortoiseGit 远程上传 push 代码，配置不用每次输入用户名和密码方法

配置方法：
打开目录 C:\Documents and Settings\Administrator\，找到.gitconfig 文件，里面已经存在你已经配置好的 name 和 email,只需在下面加人一行

```
[credential]
    helper = store
```

下次只需在输入一次用户名和密码，git 就会记住，而在目录 C:\Documents and Settings\Administrator\目录下，有.git-credentials 文件，里面就保存你的用户名和密码(注意是明文)

这样以后再链接时，就不需要输入用户名和密码.

> 2. 设置用户名和邮箱

```
git config --global user.name "xx"
git config --global user.email 'xx@sina.com'

git config --list

### 区分文件大小写
git config core.ignorecase false
```

> 3. git 提交可参考以下规范：

    * feat：新功能（feature）

    * fix：修补bug

    * docs：文档（documentation）

    * style： 格式（不影响代码运行的变动）

    * refactor：重构（即不是新增功能，也不是修改bug的代码变动）

    * test：增加测试

    * chore：构建过程或辅助工具的变动


    npm view react version  查看当前按装版本
    npm view react versions 查看所有版本

> 4. 版本号详解

版本号简介

-   第一部分为主版本号，变化了表示有了一个不兼容上个版本的大更改。
-   第二部分为次版本号，变化了表示增加了新功能，并且可以向后兼容。
-   第三部分为修订版本号，变化了表示有 bug 修复，并且可以向后兼容。
-   第四部分为日期版本号加希腊字母版本号，希腊字母版本号共有五种，分别为 base、alpha、beta 、RC 、 release
    。

    > 希腊字母版本号含义

    (1) Base
    此版本表示该软件仅仅是一个假页面链接，通常包括所有的功能和页面布局，但是 页面中的功能都没有做完整的实现，只是做为整体网站的一个基础架构。

    (2) Alpha
    软件的初级版本，表示该软件在此阶段以实现软件功能为主，通常只在软件开发者 内部交流，一般而言，该版本软件的 Bug 较多，需要继续修改，是测试版本。测试 人员提交 Bug 经开发人员修改确认之后，发布到测试网址让测试人员测试，此时可 将软件版本标注为 alpha 版。

    (3) Beta
    该版本相对于 Alpha 版已经有了很大的进步，消除了严重错误，但还需要经过多次 测试来进一步消除，此版本主要的修改对象是软件的 UI。修改的的 Bug 经测试人 员测试确认后可发布到外网上，此时可将软件版本标注为 beta 版.

    (4) RC
    该版本已经相当成熟，基本上不存在导致错误的 Bug，与即将发行的正式版本相差无几。

    (5) Release
    该版本意味“最终版本”，在前面版本的一系列测试版之后，终归会有一个正式的版本，是最终交付用户使用的一个版本。该版本有时也称标准版。

-   指定版本：比如 1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
-   波浪号（tilde）+指定版本：比如~1.2.2，表示安装 1.2.x 的最新版本（不低于 1.2.2），但是不安装 1.3.x，也就是说安装时不改变大版本号和次要版本号。
-   ^号（caret）+指定版本：比如 ˆ1.2.2，表示安装 1.x.x 的最新版本（不低于 1.2.2），但是不安装 2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为 0，则号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容

~ 会匹配最近的小版本依赖包，比如~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
^ 会匹配最新的大版本依赖包，比如^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0

> 5. git 将本地代码添加到远程新增仓库

-   首先，在你代码工程的根目录执行 git init 初始化仓库
    ```
    git init
    ```
-   执行 git add . 命令，将你代码工程的代码文件添加到本地暂存区

    ```
    git add .
    ```

-   执行 git commit -m '注释'， 添加注释

    ```
    git commit -m '初始化工程'
    ```

-   执行 git remote add origin url(即远程仓库地址) ，将本地工程和远程仓库关联起来

    ```
    git remote add origin url
    ```

-   如果远程仓库有文件，比如新建仓库的时候创建了 REAEM.md 文件，此时要先执行 git pull origin master；如果远程仓库是个空仓库，直接进行第 6 步骤

    ```
    git pull origin master
    ```

    但有可能会报错：fatal: refusing to merge unrelated histories

    这是因为两个分支之间没有取得关联，此时需要在 git pull 或 git push 命令后添加 --allow-unrelated-histories 参数

    ```
    git pull origin master --allow-unrelated-histories
    ```

-   执行 git push origin master 将本地工程代码提交到远程 master 分支

    ```
    git push origin master
    ```

    注意：如果直接执行 git push 可能会出现 fatal the current branch master has no upstream branch 的错误，这时需要执行 git push -u origin master 或 git push --set-upstream origin master，之后就可以直接用 git push 或 git pull 指令了

    ```
    git push -u origin master 或 git push --set-upstream origin master
    ```

    至此，就把本地代码添加到了远程新增仓库了。

> 6. Git 提交代码时添加 emoji 图标

使用 git 的开发者都知道提交代码的最简单命令： git commit -m '此次提交的内容说明'。 我们在 github 发现了这样一张视图：

这是在 commit 时，添加了 emoji 表情说明，我们来看看其命令语法：

-   在 commit 时添加一个 emoji 表情图标

```
git commit -m ':emoji: 此次提交的内容说明'
```

-   添加多个 emoji 表情图标

```
git commit -m ':emoji1: :emoji2: :emoji3: 此次提交的内容说明'
```

在提交内容的前面增加了 emoji 标签： :emoji:，其中 emoji 是表情图标的标签，列表见下面的附录表格。[参考资料](https://gitmoji.carloscuesta.me/)

| emoji             | emoji 代码                 | commit 说明           |
| ----------------- | -------------------------- | --------------------- |
| 🎨(调色板)        | :art:                      | 改进代码结构/代码格式 |
| ⚡(闪电)🐎 (赛马) | :zap:“:racehorse:          | 提升性能              |
| 🔥 (火焰)         | :fire:                     | 移除代码或文件        |
| 🐛 (bug)          | :bug:                      | 修复 bug              |
| 🚑 (急救车)       | :ambulance:                | 重要补丁              |
| ✨ (火花)         | :sparkles:                 | 引入新功能            |
| 📝 (备忘录)       | :memo:                     | 撰写文档              |
| 🚀 (火箭)         | :rocket:                   | 部署功能              |
| 💄 (口红)         | :lipstick:                 | 更新 UI 和样式文件    |
| 🎉 (庆祝)         | :tada:                     | 初次提交              |
| ✅ (白色复选框)   | :white_check_mark:         | 增加测试              |
| 🔒 (锁)           | :lock:                     | 修复安全问题          |
| 🍎 (苹果)         | :apple:                    | 修复 macOS 下的问题   |
| 🐧 (企鹅)         | :penguin:                  | 修复 Linux 下的问题   |
| 🏁 (旗帜)         | :checked_flag:             | 修复 Windows 下的问题 |
| 🔖 (书签)         | :bookmark:                 | 发行/版本标签         |
| 🚨 (警车灯)       | :rotating_light:           | 移除 linter 警告      |
| 🚧 (施工)         | :construction:             | 工作进行中            |
| 💚 (绿心)         | :green_heart:              | 修复 CI 构建问题      |
| ⬇️ (下降箭头)     | :arrow_down:               | 降级依赖              |
| ⬆️ (上升箭头)     | :arrow_up:                 | 升级依赖              |
| 👷 (工人)         | :construction_worker:      | 添加 CI 构建系统      |
| 📈 (上升趋势图)   | :chart_with_upwards_trend: | 添加分析或跟踪代码    |
| 🔨 (锤子)         | :hammer:                   | 重大重构              |
| ➖ (减号)         | :heavy_minus_sign:         | 减少一个依赖          |
| 🐳 (鲸鱼)         | :whale:                    | Docker 相关工作       |
| ➕ (加号)         | :heavy_plug_sign:          | 增加一个依赖          |
| 🔧 (扳手)         | :wrench:                   | 修改配置文件          |
| 🌐 (地球)         | :globe_with_meridians:     | 国际化与本地化        |
| ✏️ (铅笔)         | :pencil2:                  | 修复 typo             |

> 7. 协议选择, 如下图：

![](https://gcore.jsdelivr.net/gh/879733672/images@cdn/img/202208161721838.jpg)
