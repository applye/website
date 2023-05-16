---
abbrlink: 7
title: Linux使用教程
categories: 工具
tags:
  - '工具'
  - 'Linux'
  - '环境搭建'
comments: false
date: 2019-04-15 23:37:40
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202304282219385.png'
---
## Linux使用教程


### 介绍
一般来说著名的 Linux 系统基本上分两大类：
RedHat 系列：Redhat、Centos、Fedora 等
Debian 系列：Debian、Ubuntu 等  

```
uname -a | cat /etc/issue
```


RedHat 系列

* 常见的安装包格式 rpm包,安装rpm包的命令是“rpm -参数”
* 包管理工具 yum
* 支持tar包

Debian系列

常见的安装包格式 deb包,安装deb包的命令是“dpkg -参数”
包管理工具 apt-get
支持tar包

tar 只是一种压缩文件格式，它只是把文件压缩打包而已。 rpm 相当于windows中的安装文件，它会自动处理软件包之间的依赖关系。
优缺点来说，rpm一般都是预先编译好的文件，它可能已经绑定到某种CPU或者发行版上面了。
tar一般包括编译脚本，你可以在你的环境下编译，所以具有通用性。
如果你的包不想开放源代码，你可以制作成rpm，如果开源，用tar更方便了。
tar一般都是源码打包的软件，需要自己解包，然后进行安装三部曲，./configure, make, make install. 来安装软件。
安装rpm包的命令是“rpm -参数”，安装deb包的命令是“dpkg -参数”。而linux系统很方便和人性化的一点就是很多软件或服务根本就不用我们去下载，直接使用相应的命令就可以管理了，可能这就是传说中的 “云”的概念。


### Linux服务管理的两种方式service和systemctl
* service
service命令其实是去/etc/init.d目录下, 去执行相关程序， init.d目录包含许多系统各种服务的启动和停止脚本。当Linux启动，会寻找这些目录中的服务脚本，并根据脚本的run level确定不同的启动级别。

service常用的方式：
```
service <service> // 打印指定服务<service>的命令行使用帮助
service <service> start // 启动指定的系统服务<service>
service <service> stop // 停止指定的系统服务<service>
service <service> restart // service <service> restart
chkconfig --list  // 查看系统服务列表，以及每个服务的运行级别。
chkconfig <service> on // 设置指定服务<service>开机时自动启动。
chkconfig <service> off // 设置指定服务<service>开机时不自动启动。
ntsysv // 以全屏幕文本界面设置服务开机时是否自动启动。

service redis start  // 打开redis命令 
service redis stop  // 关闭redis命令
chkconfig redis on  // 设为开机启动
chkconfig redis off  // 设为开机关闭
```

* systemctl
systemctl是一个systemd工具，主要负责控制systemd系统和服务管理器, 在systemed管理体系中，被管理的deamo(守护进程)称作unit单元, 对于单元的管理是通过命令systemctl来进行控制的，unit表示不同的systemd对象，通过配置文件进行标识和配置；文件主要包括系统服务，监听socket、保存的系统快照以及其它与init相关的信息。
用service来管理服务时，是在/etc/init.d目录下创建一个脚本文件，来管理服务的启动和停止；在systemctl中，也类似，文件的目录有所不同.
(1) 在/lib/systemd/system目录下创建一个脚本文件redis.service
![](https://raw.githubusercontent.com/879733672/images/cdn/img/202210141029059.png)
(2) 创建软链接(创建软链接是为了下一步系统初始化时自动启动服务)
ln -s /lib/systemd/system/redis.service /etc/systemd/system/multi-user.target.wants/redis.service
(3) 刷新配置
sudo systemctl daemon-reload
(4) 启动
systemctl start redis

```
sudo systemctl daemon-reload  // 刷新配置 刚刚配置的服务需要让systemctl能识别，就必须刷新配置
redis:systemctl start redis  // 启动
redis:systemctl restart redis // 重启
redis: systemctl stop redis  // 停止
开机自启动redis服务加入开机启动:systemctl enable redis
禁止开机启动:systemctl disable redis
查看状态:systemctl status redis
```

### Linux命令
```
# systemctl status sshd   // 查看ssh服务是否启动
# systemctl start sshd    // 启动
# netstat -lnput |grep :22  // 查看端口号
# lsof -i:22   // 查看端口号
# kill -9 PID  // 命令杀死进程

// 执行sh脚本
# chmod +x hello.sh
# ./home/test/shell/hello.sh
# /home/test/shell/hello.sh
# sh /home/test/shell/hello.sh

// 查看服务是否启动命令
ps -ef | grep nginx
lsof -i:端口号
systemctl status 服务名 | service 服务名 status

// 查看开启的端口
netstat -tnlp命令
ps -ef|grep ttnode  // 查看是否运行
```

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


