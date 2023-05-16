---
abbrlink: 9
title: tree-node-cli 成树状目录
tags:
  - '前端'
  - 'tree-node-cli'
comments: false
date: 2019-04-15 23:57:20
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202304282121957.png'
---
## tree-node-cli 成树状目录

### 由于写 README.md 时需要用到展示目录树的功能，在搜索了一番后发现 tree-node-cli 比较符合要求.

-   安装

```
// 目录由 tree-node-cli 生成
npm i tree-node-cli -g
```

-   简单使用

```
tree -L 4 -I "node_modules" > dir.md

  -V, --version             输出版本号
  -a, --all-files           打印所有文件，包括隐藏文件
  --dirs-first              目录在前，文件在后
  -d, --dirs-only           仅列出目录
  -I, --exclude [patterns]  排除与模式匹配的文件。用 | 隔开,用双引号包裹。 例如 “node_modules|.git”
  -L, --max-depth <n>       目录树的最大显示深度
  -r, --reverse             按反向字母顺序对输出进行排序
  -F, --trailing-slash      为目录添加'/'
  -h, --help                输出用法信息
```
