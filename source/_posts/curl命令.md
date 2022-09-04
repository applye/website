---
abbrlink: 6
title: curl常用命令
categories: '工具'
tags:
  - '工具'
  - 'curl'
comments: false
date: 2019-04-15 23:31:23
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202209041730053.jpg'
---
## curl使用常用命令
```
	curl -o/O pathName url   //下载文件o下载到本地并命名pathName O默认url 如下：

	 # 将文件下载到本地并命名为mygettext.html
	curl -o mygettext.html http://www.gnu.org/software/gettext/manual/gettext.html
	
	# 将文件保存到本地并命名为gettext.html
	 curl -O http://www.gnu.org/software/gettext/manual/gettext.html

	 curl -O URL1 -O URL2  //同时获取多个

	断点续传，通过使用-C选项可对大文件使用断点续传功能
	# 当文件在下载完成之前结束该进程
	 $ curl -O http://www.gnu.org/software/	gettext/manual/gettext.html
	 ##############             20.1%

	Head请求：curl -l http://www.mzwu.com/ -I
	GET请求：curl -l http://www.mzwu.com/?domain=mzwu.com
	curl example.com/form.cgi?data=xxx
	GET方法相对简单，只要把数据附在网址后面就行

	POST请求：curl -l http://www.mzwu.com/ -d "domain=mzwu.com"
	POST方法必须把数据和网址分开，curl就要用到--data参数。
	curl -X POST --data "data=xxx" example.com/form.cgi

	如果你的数据没有经过表单编码，还可以让curl为你编码，参数是`--data-urlencode`。
	curl -X POST--data-urlencode "date=April 1" example.com/form.cgi

	curl默认的HTTP动词是GET，使用`-X`参数可以支持其他动词。
	curl -X POST www.example.com
	curl -X DELETE www.example.com
	

	添加HTTP头：curl -l http://www.mzwu.com/ -H "name:dnawo" -H "sex:boy"
	伪造referer：curl -l http://www.mzwu.com/ -e "http://www.baidu.com/"
	Referer字段
	有时你需要在http request头信息中，提供一个referer字段，表示你是从哪里跳转过来的。
	curl --referer http://www.example.com http://www.example.com


	curl -v url //打印更多信息，包括发送的请求信息，这在调试脚本是特别有用,`-v`参数可以显示一次http通信的整个过程，包括端口连接和http request头信息。

	http request之中，自行增加一个头信息。`--header`参数就可以起到这个作用
	curl --header "Content-Type:application/json" http://example.com

	网域需要HTTP认证，这时curl需要用到`--user`参数
	curl --user name:password example.com

	可以显示更详细的通信过程
	curl --trace output.txt www.sina.com 或者
	curl --trace-ascii output.txt www.sina.com  

	curl -I url //查看响应头

	curl -i url //`-i`参数可以显示http response的头信息，连同网页代码一起。`-I`参数则是只显示http response的头信息。
```