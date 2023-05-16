---
title: python爬虫之scrapy使用教程
categories: '后端'
tags:
  - 'python'
  - 'scrapy'
comments: false
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202304262104764.png'
abbrlink: 52266
date: 2022-10-12 22:13:11
---

## Python Scrapy爬虫框架详解

### 简介

网络爬虫又称网络蜘蛛、网络机器人，它是一种按照一定的规则自动浏览、检索网页信息的程序或者脚本。网络爬虫能够自动请求网页，并将所需要的数据抓取下来。通过对抓取的数据进行处理，从而提取出有价值的信息。
* 认识爬虫

们所熟悉的一系列搜索引擎都是大型的网络爬虫，比如百度、搜狗、360浏览器、谷歌搜索等等。每个搜索引擎都拥有自己的爬虫程序，比如 360 浏览器的爬虫称作 360Spider，搜狗的爬虫叫做 Sogouspider。
百度搜索引擎，其实可以更形象地称之为百度蜘蛛（Baiduspider），它每天会在海量的互联网信息中爬取优质的信息，并进行收录。当用户通过百度检索关键词时，百度首先会对用户输入的关键词进行分析，然后从收录的网页中找出相关的网页，并按照排名规则对网页进行排序，最后将排序后的结果呈现给用户。在这个过程中百度蜘蛛起到了非常想关键的作用

百度的工程师们为“百度蜘蛛”编写了相应的爬虫算法，通过应用这些算法使得“百度蜘蛛”可以实现相应搜索策略，比如筛除重复网页、筛选优质网页等等。应用不同的算法，爬虫的运行效率，以及爬取结果都会有所差异。

* 爬虫分类

爬虫可分为三大类：通用网络爬虫、聚焦网络爬虫、增量式网络爬虫。

通用网络爬虫：是搜索引擎的重要组成部分，上面已经进行了介绍，这里就不再赘述。通用网络爬虫需要遵守 robots 协议，网站通过此协议告诉搜索引擎哪些页面可以抓取，哪些页面不允许抓取。
```
robots 协议：是一种“约定俗称”的协议，并不具备法律效力，它体现了互联网人的“契约精神”。行业从业者会自觉遵守该协议，因此它又被称为“君子协议”。
```

聚焦网络爬虫：是面向特定需求的一种网络爬虫程序。它与通用爬虫的区别在于，聚焦爬虫在实施网页抓取的时候会对网页内容进行筛选和处理，尽量保证只抓取与需求相关的网页信息。聚焦网络爬虫极大地节省了硬件和网络资源，由于保存的页面数量少所以更新速度很快，这也很好地满足一些特定人群对特定领域信息的需求。

增量式网络爬虫：是指对已下载网页采取增量式更新，它是一种只爬取新产生的或者已经发生变化网页的爬虫程序，能够在一定程度上保证所爬取的页面是最新的页面。

* 爬虫应用

随着网络的迅速发展，万维网成为大量信息的载体，如何有效地提取并利用这些信息成为一个巨大的挑战，因此爬虫应运而生，它不仅能够被使用在搜索引擎领域，而且在大数据分析，以及商业领域都得到了大规模的应用。

(1) 数据分析

(2) 商业领域

* 爬虫是一把双刃剑

爬虫是一把双刃剑，它给我们带来便利的同时，也给网络安全带来了隐患。有些不法分子利用爬虫在网络上非法搜集网民信息，或者利用爬虫恶意攻击他人网站，从而导致网站瘫痪的严重后果。

为了限制爬虫带来的危险，大多数网站都有良好的反爬措施，并通过 robots.txt 协议做了进一步说明.


## python 爬虫之scrapy使用教程

* pip3 install scrapy

* scrapy startporject 爬虫名字

* scrapy genspider 爬虫名字 域名

* 编写爬虫

* 运行爬虫scrapy crawl 爬虫名字


scrapy startproject CrawlerMM  // 创建项目
scrapy genspider example example.com   // 创建爬虫

scrapy crawl mmonly   // 运行爬虫

scrapy crawl picd -o img.json/img.csv

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