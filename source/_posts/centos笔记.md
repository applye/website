---
abbrlink: 7
title: Centos 笔记
categories: 工具
tags:
  - '工具'
  - 'centos7'
  - '环境搭建'
comments: false
date: 2019-04-15 23:37:40
img: 'https://cdn.jsdelivr.ren/gh/879733672/images@cdn/img/202209041726156.jpg'
---
## Centos使用笔记

### Centos6忘记密码解决办法，root和普通用户均可?

参考地址: <a href="http://www.cnblogs.com/ljmjjy0820/p/6129893.html" target="_blank">http://www.cnblogs.com/ljmjjy0820/p/6129893.html</a>

1. 连接ssh
```
	输入命令：rpm -qa | grep ssh
	注：若没安装SSH则可输入：yum install openssh-server安装

	启动SSH服务

	输入命令：service sshd restart  重启SSH服务。
  命令：service sshd start 启动服务 |  命令：service sshd stop 停止服务  
  重启后可输入：netstat -antp | grep sshd 查看是否启动22端口（可略）

	如何设置SSH服务为开机启动？

	输入命令：chkconfig sshd on 即可。
	注：若是chkconfig sshd off则禁止SSH开机启动。
```
2. 在安装完CentOS6.5以后,通过ifconfig来查看IP来使用putty软件来实现远程链接,但发现没有eth0,只有l0？

	解决参考：<a href="http://www.linuxidc.com/Linux/2015-01/111265.htm" target="_blank">http://www.linuxidc.com/Linux/2015-01/111265.htm</a>

查询\安装SSH服务
```
	#rpm -qa |grep ssh 检查是否装了SSH包
	
	#yum install openssh-server 没有的话，安装SSH服务
	
	#chkconfig --list sshd 检查SSHD是否在本运行级别下设置为开机启动
	
	#chkconfig --level 2345 sshd on  如果没设置启动就设置下
	
	#service sshd restart  重新启动SSHD
	
	#netstat -antp |grep sshd  看看是否启动了22端口，需要确认下
	
	#iptables -nL  看看是否放行了22口
	
	#iptables -I INPUT -p tcp --dport 22 -j ACCEPT 没有的话放行22端口
	
	#iptables save 保存防火墙规则
	
	# vi /etc/ssh/sshd_config　   用vi打开SSH的配置文件，在这里我们先保持默认（允许普通用户通过口令登录）
	
	#useradd lhc    添加普通用户（lhc）

	#passwd lhc     修改lhc密码
```
 3.centos ping不通外网域名，能ping通地址？
```
	主机名配置
	假如要设置主机名为：centos
	1.修改network	
	
	vi /etc/sysconfig/network
	
	HOSTNAME=centos
	:x   #保存退出

	2.VM虚拟网络，采用桥接模式
	3.vim /etc/sysconfig/network-scripts/ifcfg-eth0
	配置好对应的ip，GETWAY，HOSTNAME，DSN1等参数，如下所示：
	
	BOOTPROTO=static  #启用静态ip地址
	ONBOOT=yes             #开启自动启用网络连接
	IPADDR=192.168.79.129  #设置ip地址
	NETMASK=255.255.255.0 #设置子网掩码
	GATEWAY=192.168.79.2   #设置网关
	DNS1=8.8.8.8        #设置主DNS
	DNS2=8.8.4.4     #设置备DNS
	IPV6INIT=no            #禁用ipv6
	HWADDR=00:0C:29:A9:91:42

	service ip6tables stop   #停止IPV6服务
	chkconfig ip6tables off      #禁止ipv6开机启动
	
	//重启network
	service netwrok restart
	4.检查虚拟机里面网络编辑Ant配置，是否和对应本地配置匹配。这里就不截图了。
```
  4.常用的命令

  地址:<a href="http://www.cnblogs.com/wangpd/p/6876825.html" target="_blank"> http://www.cnblogs.com/wangpd/p/6876825.html</a>
```
	yum命令安装
	epel是社区强烈打造的免费开源发行软件包版本库。
	yum install epel-release -y
```
yum命令
  地址:

<a href="http://man.linuxde.net/yum" target="_blank">http://man.linuxde.net/yum</a>

centos7 
```
	查询是否自启动
	systemctl list-unit-files

	查询所有已启动服务	
	systemctl list-units --type=service

	使某服务自动启动
	systemctl enable   httpd.service

	使某服务不自动启动		
	systemctl disable httpd.service

	启动某服务
	systemctl start httpd.service

	停止某服务
	systemctl stop httpd.service

	重启某服务
	systemctl restart httpd.service

	TCP listen

	# ss -lt
	UDP listen
	
	# ss -ul
	TCP连线
	
	# ss -t

	//查看端口使用情况
	ss -tln

	ss -a    查看所有服务端口
```

centos firewalld简单使用

  <a href="http://blog.csdn.net/y534560449/article/details/65626183" target="_blank">http://blog.csdn.net/y534560449/article/details/65626183</a>

centos PHP环境搭建

<a href="http://www.cnblogs.com/zhaosiwen/p/5157757.html" target="_blank">http://www.cnblogs.com/zhaosiwen/p/5157757.html</a>

```
	//查看安装的模块
	php -m
	php -i | grep php.ini
	#apache主配置文件
	/etc/httpd/conf/httpd.conf
	#相关配置 比如vhost文件就可以创建在该目录下
	/etc/httpd/conf.d/
	#模块配置文件 比如你要开启rewrite模块，可能你就需要到这个目录下面做一些配置了
	/etc/httpd/conf.modules.d/
	#web可访问目录 网站根目录
	/var/www/html
	#apache日志文件目录
	/var/log/httpd/

	//查看php包
 	rpm -qa | grep php

	rpm -qa |grep -i mysql
	
	//删除包
	yum remove php

	//查询是否有残留目录
	whereis php

	//删除查看的php包
	rpm -e *
	
	//安装php需要先添加EPEL 包的仓库源
	yum -y install epel-release

	//安装nginx
	yum -y install nginx

	//查看源目录
	cd /etc/yum.repos.d
	ls
	//清除缓存
	yum clean all
	//重新生成缓存
	yum makecache

	1.安装
	yum -y install mariadb*
	2.开启MySQL服务
	systemctl start mariadb.service
	3.设置开机启动MySQL服务
	systemctl enable mariadb.service
	4.设置root帐户的密码
	mysql_secure_installation

	//php7-fpm 添加另外一个仓库
	//PHP7-FPM webtatic 仓库：
	rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm

	yum -y install php70w-fpm php70w-cli php70w-gd php70w-mcrypt php70w-mysql php70w-pear php70w-xml php70w-mbstring php70w-pdo php70w-json php70w-pecl-apcu php70w-pecl-apcu-devel


	apache
	启动
	systemctl start httpd
	停止
	systemctl stop httpd
	重启
	systemctl restart httpd


	mysql
	启动
	systemctl start mysqld
	停止
	systemctl stop mysqld
	重启
	systemctl restart mysqld
	
	
	php-fpm
	启动
	systemctl start php-fpm
	停止
	systemctl stop php-fpm
	重启
	systemctl restart php-fpm
	
	
	nginx
	启动
	systemctl start nginx
	停止
	systemctl stop nginx
	重启
	systemctl restart nginx
```

 <a href="http://www.jianshu.com/p/999949f8fbf3" tareget="_blank">http://www.jianshu.com/p/999949f8fbf3</a>

```
	查看所有打开的端口： firewall-cmd --zone=public --list-ports
	更新防火墙规则： firewall-cmd --reload
	添加
	firewall-cmd --zone=public --add-port=80/tcp --permanent    （--permanent永久生效，没有此参数重启后失效）
	删除
	firewall-cmd --zone= public --remove-port=80/tcp --permanent

	firewall-cmd --permanent --zone=public --add-port=3306/tcp
	firewall-cmd --permanent --zone=public --add-port=3306/udp
	这样就开放了相应的端口。
	
	执行
	
	firewall-cmd --reload 
```



mysql文章

<a href="http://blog.csdn.net/gebitan505/article/details/54613549" target="_blank">http://blog.csdn.net/gebitan505/article/details/54613549</a>

centos7重置密码。
<a href="http://blog.csdn.net/keepd/article/details/77151006" target="_blank">http://blog.csdn.net/keepd/article/details/77151006</a>

mysql: 
``` 
	1.用户名和密码： root root
	2.远程连接用户名和密码： admin admin
```

添加用户名和密码方法：
<a href="http://www.cnblogs.com/chenggege/p/7761255.html" target="_blank">http://www.cnblogs.com/chenggege/p/7761255.html</a>	

```
	mysql 语法：
	
	show databases;  //查询所有db
	use db;  //选中要操作的数据库
	create table tableName (
		id number,
		bookName varchar(20),
		price varchar(20)
	);		//创建表

	select * from tableName;	//查询所有信息

	slecet * from tableName where type=xxx;	//根据条件查询所有信息

	update tableName set type='xxx' where name="shuigu";//根据条件更新某条数据

	delete from tableName where name='xxx' //删除单条数据


	 DROP DATABASE 库名;  //删除db数据库

	 DROP TABLE 表名；  //删除表

	DELETE FROM 表名;  //清空表
```