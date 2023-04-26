---
title: python爬虫之scrapy使用教程
categories: '后端'
tags:
  - 'python'
  - 'scrapy'
comments: false
img: 'https://cdn.jsdelivr.ren/gh/879733672/images@cdn/img/202304262104764.png'
abbrlink: 52266
date: 2022-10-12 22:13:11
---

### python 爬虫之scrapy使用教程

* pip3 install scrapy

* scrapy startporject 爬虫名字

* scrapy genspider 爬虫名字 域名

* 编写爬虫

* 运行爬虫scrapy crawl 爬虫名字


### pip3修改源配置

* 文件存放位置
```
C:\Users\Administrator\AppData\Roaming\pip\pip.ini
```
其中Administrator更换为你当前的用户名

有些人可能没有pip文件夹和pip.ini文件，那就自己手动创建

在pip.ini文件中编辑以下内容
```
[global]
# 源地址
index-url = http://pypi.douban.com/simple
# 添加源主机为可信主机，要不然可能报错
trusted-host = pypi.douban.com
# 取消pip版本检查，排除每次都报最新的pip
disable-pip-version-check = true
# 超时时间，可自行调整
timeout = 1200
```
查看配置
```
pip3 config list
```

更新pip3为最新版
```
pip3 install --upgrade pip
```

* 国内常用Python镜像源

-  阿里云
```
http://mirrors.aliyun.com/pypi/simple/
```

- 中国科学技术大学
```
https://pypi.mirrors.ustc.edu.cn/simple
```

- 清华大学
```
https://pypi.tuna.tsinghua.edu.cn/simple
```

- 豆瓣
```
http://pypi.douban.com/simple/
```

- 华中理工大学
```
http://pypi.hustunique.com/simple
```

- 山东理工大学
```
http://pypi.sdutlinux.org/simple
```