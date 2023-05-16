---
title: pve常见问题
categories: '工具'
tags:
  - 'pve'
comments: false
abbrlink: 64096
date: 2022-10-12 22:13:11
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202304262057411.png'
---

## pve 常见问题
- 
```
apt update  // apt update 的作用是从/etc/apt/sources.list文件中定义的源中获取的最新的软件包列表。即运行 apt update 并没有更新软件，而是相当 windows 下面的检查更新，获取的是软件的状态。
apt upgrade // 则是根据 updare 命令获取的最新的软件包列表，去真正地更新软件
apt dis-upgrade // 可以聪明的解决相依性的问题，如果相依性问题，需要安装/移除新的 Package ，就会试着去安装它。（所以通常 dis-upgrade 会被认为是有点风险的升级）

update ,然后才能运行 upgrade 和 dist-upgrade ,因为相当与 update 命令获取了包的一些信息，比如大小和版本号，然后在运行 upgrade 去下载包，如果没有获取包的信息，那么 upgrade 就是无效

apt list --upgradable  // 查看可以更新的包
apt update && apt upgrade -y 执行软件包数据库更新
apt install -f  // 命令可修复依赖关系,假如有软件因依赖关系不满足而无法安装,就可以运行此命令自动修复安装程序包所依赖的包
```

```
cat /etc/apt/sources.list   // 查当前镜像源配置
```

- PVE 虚拟机在一次重启后web打开一片空白，并非打不开，而是不显示任何东西。使用F12打开开发者工具，可以看到如下信息:
![](https://raw.githubusercontent.com/879733672/images/cdn/img/202210122315506.png)
关键信息：
```
no such file '/PVE/StdWorkspace.js'
```

解决办法
升级浏览器版本内核，chrome>80, 如果不行在执行下列命令
```
apt update && apt upgrade
apt install -f

apt dist-upgrade
pvecm updatecerts --force
server pveproxy restart
```

### 更换源
```
## 进入系统软件源配置文件目录
cd /etc/apt

## 将默认软件源配置文件进行备份
cp sources.list sources.list.bak

```

这里我将使用中国科技大（USTC）的镜像仓库进行替换，使用如下命令：

```
## 替换系统软件仓库

sed -i 's|^deb http://ftp.debian.org|deb https://mirrors.ustc.edu.cn|g' /etc/apt/sources.list

sed -i 's|^deb http://security.debian.org|deb https://mirrors.ustc.edu.cn/debian-security|g' /etc/apt/sources.list
```

执行完成后，检查是否执行正确：
```
## 输出系统源配置文件，检查是否正确
cat /etc/apt/sources.list
如果输出结果中有 USTC 的镜像地址，则表示命令已经正确执行：

## 输出内容参考：

deb https://mirrors.ustc.edu.cn/debian bullseye main contrib

deb https://mirrors.ustc.edu.cn/debian bullseye-updates main contrib

# security updates
deb https://mirrors.ustc.edu.cn/debian-security bullseye-security main contrib
```




```
## 清理
apt clean && apt autoclean

## 同步镜像仓库
apt update

## apt 命令显示已安装软件包
apt list –installed

## dpkg 命令显示已安装软件包:
dpkg-query -l

## 列出系统里 Snap 已安装软件包:
snap list

## Flatpak 已安装软件包:
flatpak list


apt-get 命令
## 更新安装源（Source）
apt-get update

## 更新已安装的软件包
apt-get upgrade

## 更新已安装的软件包（识别并处理依赖关系的改变）
apt-get dist-upgrade

## 删除软件包, 保留配置文件
apt-get remove PackageName

## 删除软件包, 同时删除配置文件
apt-get --purge remove PackageName

## 清除 已下载的软件包 和 旧软件包
apt-get clean && apt-get autoclean

## 修复依赖关系
apt-get -f install

## 普通安装
apt-get install PackageName



## 列出已安装的所有软件包
dpkg -l

## 搜索软件包
apt-cache search PackageName

## 检查是否有损坏的依赖
apt-get check



### pve目录

local iso镜像目录 /var/lib/vz/template/iso
local-lvm存储镜像，位置在/dev/pve

find / -name DS918_7.1.0-42661.img  // 查找文件命令
qm importdisk 101 /var/lib/vz/template/iso/DS918_7.1.0-42661.img local-lvm  // 导入镜像

```
### 设置硬盘直通
ls /dev/disk/by-id
ata-ST1000LM035-1RK172_ZDE5PT0X-part2

qm set 虚拟机ID -sata1 /dev/disk/by-id/硬盘识别符

![](https://cdn.jsdelivr.net/gh/879733672/images@cdn/img/202211051736096.png)
ata1代表的是未占用的id数，因为sata0刚刚被我们引导盘（也就是电脑自带硬盘占用了），当然你也可以设置成其它的，PVE支持satat0-5。当出现上图那样“update"的时候，就说明硬盘直通成功！
![](https://cdn.jsdelivr.net/gh/879733672/images@cdn/img/202211051737040.png)

回到PVE虚拟机系统，点击我们创建的虚拟机ID，在硬件里面就可以看到多出来一个“硬盘（sata1）”，它就是我们挂载进来的直通硬盘。如下图：
![](https://cdn.jsdelivr.net/gh/879733672/images@cdn/img/202211051740782.png)


格式化分区：
lsblk:查看分区
格式化分区
mkfs.ext4 /dev/sda


lsblk:查看分区是否挂载完成
// 创建分区
fdisk /dev/sda
// 格式化分区
mkfs -t ext4 /dev/sda1 

手动挂载分区
mount /dev/sda3 /mnt/sda3
mount /dev/sda4 /mnt/sda4
mount /dev/sda5 /mnt/sda5



二、开启直通
1、修改 /etc/default/grub
默认
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
只开启 PCIE (网卡或SATA控制器)的直通功能，即 IOMMU 分组
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on pcie_acs_override=downstream"
并打开核显直通功能。N5105核显无法直通且可以用来主系统或者LXC容器硬解，所以只开启 PCIE 直通。
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on video=efifb:off,vesafb:off pcie_acs_override=downstream"
2、更新grub
update-grub

3. 重启
reboot
3. 查看是否成功，有输出代表成功
dmesg |grep -e DMAR -e IOMM

[地址](https://www.bilibili.com/read/cv17670431)



[分区设置](https://post.smzdm.com/p/ar6k3m8w/?zdm_ss=Android_5648142893_&send_by=5648142893&from=other&invite_code=zdm7mdve9ninv/)

[教程](https://post.smzdm.com/p/a9gvp557/)

mstsc // windows打开远程链接 

https://post.smzdm.com/p/alxom300/

https://flybace.com/5644.html

PVE下安装Windows10并直通核显、键盘鼠标、声卡等设备详细步骤
https://www.simaek.com/archives/69/

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


  shutdown也是关机命令，其语法格式：

  ```
  shutdown [option] [时间] [消息内容]
  ```
-k ： 并不是真的关机，只发送警告信息给登录用户
-r ： 在将系统的所有服务关闭之后立刻重新启动系统
-h ： 将系统的所有服务关闭之后 ，立刻关机
-c ： 取消已经在进行的 shutdown 命令操作
时间 ：指定系统关机的时间 ！若没有这个参数，系统默认 1 分钟后自动执行shutdown操作

```
shutdown -h now									立即关机
shutdown -h +10									10分钟后关机
shutdown -h 20:00								20:00分点关机
shutdown -r now 								立刻重启(root用户使用)
shutdown -r 10 									过10分钟自动重启(root用户使用)
shutdown -r 20:35 								在时间为20:35时候重启(root用户使用)
shutdown -c										取消上一次所做的命令
shutdown -k "I will shutdown the systemc"    	发送警告信息给其他用户
shutdown -h +10 "I will shutdown the systemc"   10分钟后关机并发送提示消息
```
