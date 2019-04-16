# website
个人博客网站搭建

1. hexo 命令

    hexo new "postName" #新建文章
    hexo new page "pageName" #新建页面
    hexo generate #生成静态页面至public目录
    hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
    hexo deploy #部署到GitHub
    hexo help  # 查看帮助
    hexo version  #查看Hexo的版本
    hexo s 开启本地预览服务

2. 修改主题
既然默认主题很丑，那我们别的不做，首先来替换一个好看点的主题。这是 [官方主题](https://hexo.io/themes/)。

* 下载主题
    有两种方式获取本主题--下载 *.zip 文件和通过 git方式：

    下载 Snippet主题 文件解压后放在 themes 目录下，和博客中的landscape为同级目录

    Git方式，在Hexo根目录执行：

    git clone git://github.com/shenliyang/hexo-theme-snippet.git themes/hexo-theme-snippet

* 安装主题插件
因为 hexo-theme-snippet 使用了 ejs 模版引擎 、 Less CSS预编译语言以及在官方插件的基础上 进行功能的开发，以下为必装插件：

npm i hexo-renderer-ejs hexo-renderer-less hexo-deployer-git -S

* 部署主题
> 如果没有更改过主题源文件,也不需要代码优化可以跳过1,2,3步骤

gulp打包构建，拷贝主题目录下package.json文件到Hexo根目录下，然后安装项目的开发依赖。 Gulp入门指南
npm i   //安装项目依赖

在Hexo根目录下创建一个名为 gulpfile.js 的文件：
require('./themes/hexo-theme-snippet/gulpfile');

运行 gulp：
gulp 或者 gulp default   //执行打包任务

清空hexo静态文件和缓存，并重新生成
hexo clean && hexo g  //清空缓存并生成静态文件

本地预览，确没有问题再进行发布
hexo s -p 4000 或者 hexo s  //启动本地服务默认

当gulp执行完成，并提示 please execute： hexo d 时，可以进行发布
hexo d 或者 gulp deploy  //部署发布

* 更新主题
主题可能会不定时优化和更新，更新主题代码：

cd themes/hexo-theme-snippet
git pull