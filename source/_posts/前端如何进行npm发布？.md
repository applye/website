---
title: 前端如何进行npm发布？
categories: '前端'
tags:
  - '前端'
  - 'npm'
comments: false
abbrlink: 4020
date: 2019-05-14 22:50:16
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202209041646159.jpg'
---

### 前端npm包发布
1. 在npm官网上注册一个账号，[https://www.npmjs.com/](https://www.npmjs.com/). 之后别忘了验证邮箱。

2. 新建一个目录，比如all-web, 使用命令进入到这个目录，执行npm init, 初始化，按照提示填写对应的内容信息。
```
package name：填写你这个包的名字，默认是你这个文件夹的名字（nodeadd）

version：填写你这个包的版本，默认1.0.0

description：描述一下你这个包是干嘛用的

entry point：入口文件，默认是index.js，你也可以自己填写你自己的文件名

test command：测试命令，默认为空，直接回车就行

git repository：git仓库地址，如果你的包是先放到github上或者其他git仓库里，这时候你的文件夹里面会存在一个隐藏的.git目录，npm会读到这个目录作为这一项的默认值。如果没有的话，直接回车继续。

keywords：关键词，方便别人搜到这个包

author：你的账号

license： 你的这个包遵循什么开源协议，直接回车就行

```
3. 编写自己的项目包，可以是脚手架等

4. 发布npm包
* npm源切换
注意一般因为网络速度，原因一般使用taobao镜像，发布时需要切换会官网镜像
```
npm config set registry http://registry.npmjs.org/
 ```
* npm登录
```
npm adduser     # 添加账号
npm login       # 登录账号
```
接下来会以问答形式向你了解你的用户名、密码以及公开的邮箱，之后输入：
```
npm publish
```
看到进度条，之后发布成功。

5. 查询发布的包
npm官网全局搜索即可，淘宝npm等镜像同步时间到搜索.

5. 如何撤销发布的包(撤包有时间限制，24小时)
终端执行 npm unpublish
例如：
(1). npm unpublish all-web@1.0.0 删除某个版本
(2). npm unpublish all-web --force 删除整个npm市场的包

npm unpublish的推荐替代命令：npm deprecate <pkg>[@<version>] <message>
使用这个命令，并不会在社区里撤销你已有的包，但会在任何人尝试安装这个包的时候得到警告
例如：npm deprecate z-tool '这个包我已经不再维护了哟～'

【注意】如果报权限方面的错，加上--force
