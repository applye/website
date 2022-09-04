---
abbrlink: 4
title: git配置用户密码
categories: '工具'
tags:
  - '工具'
  - 'git'
comments: false
date: 2019-04-15 23:28:34
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202209041732591.jpg'
---

> 1. TortoiseGit 远程上传push代码，配置不用每次输入用户名和密码方法

配置方法：
	打开目录C:\Documents and Settings\Administrator\，找到.gitconfig文件，里面已经存在你已经配置好的name和email,只需在下面加人一行
```
[credential]  
    helper = store
```
下次只需在输入一次用户名和密码，git就会记住，而在目录C:\Documents and Settings\Administrator\目录下，有.git-credentials文件，里面就保存你的用户名和密码(注意是明文)

这样以后再链接时，就不需要输入用户名和密码.