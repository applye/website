---
title: docker学习
categories: '工具'
tags:
  - '工具'
  - 'docker'
comments: false
abbrlink: 29609
date: 2019-04-19 22:24:14
img: 'http://i1.bvimg.com/683865/c47d5cc2472d1013s.png'
---
## docker 简介
2013年发布至今，docker一直广受瞩目，被认为可能会改变软件行业。

但是，许多人并不清楚 Docker 到底是什么，要解决什么问题，好处又在哪里？本文就来详细解释，帮助大家理解它，还带有简单易懂的实例，教你如何将它用于日常开发。

![docker](http://i2.bvimg.com/683865/a23612e631d484b4s.jpg)

1、环境配置的难题
软件开发最大的麻烦事之一，就是环境配置。用户计算机的环境都不相同，你怎么知道自家的软件，能在那些机器跑起来？

用户必须保证两件事：操作系统的设置，各种库和组件的安装。只有它们都正确，软件才能运行。举例来说，安装一个 Python 应用，计算机必须有 Python 引擎，还必须有各种依赖，可能还要配置环境变量。

如果某些老旧的模块与当前环境不兼容，那就麻烦了。开发者常常会说："它在我的机器可以跑了"（It works on my machine），言下之意就是，其他机器很可能跑不了。

环境配置如此麻烦，换一台机器，就要重来一次，旷日费时。很多人想到，能不能从根本上解决问题，软件可以带环境安装？也就是说，安装的时候，把原始环境一模一样地复制过来。

2、虚拟机
虚拟机（virtual machine）就是带环境安装的一种解决方案。它可以在一种操作系统里面运行另一种操作系统，比如在 Windows 系统里面运行 Linux 系统。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。

虽然用户可以通过虚拟机还原软件的原始环境。但是，这个方案有几个缺点

* 资源占用多
虚拟机会独占一部分内存和硬盘空间。它运行的时候，其他程序就不能使用这些资源了。哪怕虚拟机里面的应用程序，真正使用的内存只有 1MB，虚拟机依然需要几百 MB 的内存才能运行。
* 冗余步骤多
虚拟机是完整的操作系统，一些系统级别的操作步骤，往往无法跳过，比如用户登录。
* 启动慢
启动操作系统需要多久，启动虚拟机就需要多久。可能要等几分钟，应用程序才能真正运行

对比传统虚拟机总结：

|特性|容器|虚拟机|
|--|--|--|
|启动|秒级|分钟级|
|硬盘使用|一般为 MB|一般为 GB|
|性能|接近原生|弱于|
|系统支持量|单机支持上千个容器|一般几十个|

3、Linux 容器
由于虚拟机存在这些缺点，Linux 发展出了另一种虚拟化技术：Linux 容器（Linux Containers，缩写为 LXC）。

Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。或者说，在正常进程的外面套了一个保护层。对于容器里面的进程来说，它接触到的各种资源都是虚拟的，从而实现与底层系统的隔离。

由于容器是进程级别的，相比虚拟机有很多优势。

* 启动快

容器里面的应用，直接就是底层系统的一个进程，而不是虚拟机内部的进程。所以，启动容器相当于启动本机的一个进程，而不是启动一个操作系统，速度就快很多。

* 资源占用少

容器只占用需要的资源，不占用那些没有用到的资源；虚拟机由于是完整的操作系统，不可避免要占用所有资源。另外，多个容器可以共享资源，虚拟机都是独享资源。

* 体积小

容器只要包含用到的组件即可，而虚拟机是整个操作系统的打包，所以容器文件比虚拟机文件要小很多。

总之，容器有点像轻量级的虚拟机，能够提供虚拟化的环境，但是成本开销小得多。

4、Docker 是什么？
Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。

5、docker架构
Docker 使用客户端-服务器 (C/S) 架构模式，使用远程API来管理和创建Docker容器。

Docker 容器通过 Docker 镜像来创建。

容器与镜像的关系类似于面向对象编程中的对象与类。

|docker|面向对象|
|--|--|
|容器|对象|
|镜像|类|

* 镜像
Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:18.04 就包含了完整的一套 Ubuntu 18.04 最小系统的 root 文件系统
Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

* 容器
镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

* 仓库
镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，Docker Registry 就是这样的服务。

一个 Docker Registry 中可以包含多个 仓库（Repository）；每个仓库可以包含多个 标签（Tag）；每个标签对应一个镜像。

通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 <仓库名>:<标签> 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 latest 作为默认标签。

以 Ubuntu 镜像 为例，ubuntu 是仓库的名字，其内包含有不同的版本标签，如，16.04, 18.04。我们可以通过 ubuntu:14.04，或者 ubuntu:18.04 来具体指定所需哪个版本的镜像。如果忽略了标签，比如 ubuntu，那将视为 ubuntu:latest。

仓库名经常以 两段式路径 形式出现，比如 jwilder/nginx-proxy，前者往往意味着 Docker Registry 多用户环境下的用户名，后者则往往是对应的软件名。但这并非绝对，取决于所使用的具体 Docker Registry 的软件或服务。

6、docker的用途和安装
* 提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
* 提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。 

docker安装
Docker 是一个开源的商业产品，有两个版本：社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。企业版包含了一些收费服务，个人开发者一般用不到。下面的介绍都针对社区版。

Docker CE 的安装请参考官方文档。

安装完成后，运行下面的命令，验证是否安装成功。
```
$ docker version# 或者$ docker info
```
docker 是服务器--客户端架构。命令行运行docker命令的时候，需要本机有docker服务，如果这项服务没有启动，可以用下面的命令启动（官方文档）。
```
# service 命令的用法
$ sudo service docker start
# systemctl 命令的用法
$ sudo systemctl start docker
```

7、image文件
Docker 把应用程序及其依赖，打包在 image 文件里面。只有通过这个文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。
image 是二进制文件。实际开发中，一个 image 文件往往通过继承另一个 image 文件，加上一些个性化设置而生成。举例来说，你可以在 Ubuntu 的 image 基础上，往里面加入 Apache 服务器，形成你的 image。
```
# 列出本机的所有 image 文件。
$ docker image ls
# 删除 image 文件
$ docker image rm[imageName]
```
image 文件是通用的，一台机器的 image 文件拷贝到另一台机器，照样可以使用。一般来说，为了节省时间，我们应该尽量使用别人制作好的 image 文件，而不是自己制作。即使要定制，也应该基于别人的 image 文件进行加工，而不是从零开始制作。

为了方便共享，image 文件制作完成后，可以上传到网上的仓库。Docker 的官方仓库Docker Hub是最重要、最常用的 image 仓库。此外，出售自己制作的 image 文件也是可以的。

8、实例：hello world
下面，我们通过最简单的 image 文件"hello world"，感受一下 Docker。

首先，运行下面的命令，将 image 文件从仓库抓取到本地。
```
$ docker image pull library/hello-world
```
上面代码中，docker image pull是抓取 image 文件的命令。library/hello-world是 image 文件在仓库里面的位置，其中library是 image 文件所在的组，hello-world是 image 文件的名字。  

由于 Docker 官方提供的 image 文件，都放在library组里面，所以它的是默认组，可以省略。因此，上面的命令可以写成下面这样。
```
$ docker image pull hello-world
```
抓取成功以后，就可以在本机看到这个 image 文件了
```
$ docker image ls
```
现在，运行这个 image 文件。
```
$ docker container run hello-world
```
docker container run命令会从 image 文件，生成一个正在运行的容器实例。
注意，docker container run命令具有自动抓取 image 文件的功能。如果发现本地没有指定的 image 文件，就会从仓库自动抓取。因此，前面的docker image pull命令并不是必需的步骤。

如果运行成功，你会在屏幕上读到下面的输出。
```
$ docker container run hello-worldHello from Docker!This message shows that your installation appears to be working correctly.......
```
输出这段提示以后，hello world就会停止运行，容器自动终止

有些容器不会自动终止，因为提供的是服务。比如，安装运行 Ubuntu 的 image，就可以在命令行体验 Ubuntu 系统。
```
$ docker container run-it ubuntu bash
```
对于那些不会自动终止的容器，必须使用docker container kill命令手动终止。
```
$ docker container kill[containID]
```

9、容器文件
image 文件生成的容器实例，本身也是一个文件，称为容器文件。也就是说，一旦容器生成，就会同时存在两个文件： image 文件和容器文件。而且关闭容器并不会删除容器文件，只是容器停止运行而已。
```
# 列出本机正在运行的容器
$ docker container ls
# 列出本机所有容器，包括终止运行的容器
$ docker container ls--all
```
上面命令的输出结果之中，包括容器的 ID。很多地方都需要提供这个 ID，比如上一节终止容器运行的docker container kill命令。

终止运行的容器文件，依然会占据硬盘空间，可以使用docker container rm命令删除。
```
$ docker container rm[containerID]
```
运行上面的命令之后，再使用docker container ls --all命令，就会发现被删除的容器文件已经消失了。

10、Dockerfile文件
学会使用 image 文件以后，接下来的问题就是，如何可以生成 image 文件？如果你要推广自己的软件，势必要自己制作 image 文件。

这就需要用到 Dockerfile 文件。它是一个文本文件，用来配置 image。Docker 根据 该文件生成二进制的 image 文件。

下面通过一个实例，演示如何编写 Dockerfile 文件。

实例：制作自己的 Docker 容器
```
FROM node:8.4 COPY./app WORKDIR/app RUN npm install--registry=https://registry.npm.taobao.org EXPOSE 3000
```
上面代码一共五行，含义如下。

FROM node:8.4：该 image 文件继承官方的 node image，冒号表示标签，这里标签是8.4，即8.4版本的 node。

COPY . /app：将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。

WORKDIR /app：指定接下来的工作路径为/app。

RUN npm install：在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。

EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口。

有了 Dockerfile 文件以后，就可以使用docker image build命令创建 image 文件了。
```
$ docker image build-t koa-demo.
# 或者
$ docker image build-t koa-demo:0.0.1.
```
上面代码中，-t参数用来指定 image 文件的名字，后面还可以用冒号指定标签。如果不指定，默认的标签就是latest。最后的那个点表示 Dockerfile 文件所在的路径，上例是当前路径，所以是一个点。
如果运行成功，就可以看到新生成的 image 文件koa-demo了。
```
$ docker image ls
```
生成容器
docker container run命令会从 image 文件生成容器。
```
$ docker container run -p 8000:3000 -it koa-demo/bin/bash
# 或者
$ docker container run -p 8000:3000 -it koa-demo:0.0.1/bin/bash
```
上面命令的各个参数含义如下：
-p参数：容器的 3000 端口映射到本机的 8000 端口。

-it参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。

koa-demo:0.0.1：image 文件的名字（如果有标签，还需要提供标签，默认是 latest 标签）。

/bin/bash：容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell。

如果一切正常，运行上面的命令以后，就会返回一个命令行提示符。
```
root@66d80f4aaf1e:/app#
```
也可以使用docker container run命令的--rm参数，在容器终止运行后自动删除容器文件。
```
$ docker container run --rm -p 8000:3000 -it koa-demo /bin/bash
```
发布 image 文件

容器运行成功后，就确认了 image 文件的有效性。这时，我们就可以考虑把 image 文件分享到网上，让其他人使用。

首先，去hub.docker.com或cloud.docker.com注册一个账户。然后，用下面的命令登录。
```
$ docker login
```
接着，为本地的 image 标注用户名和版本。
```
$ docker image tag[imageName][username]/[repository]:[tag]
# 实例
$ docker image tag koa-demos:0.0.1ruanyf/koa-demos:0.0.1
```
也可以不标注用户名，重新构建一下 image 文件。
```
$ docker image build-t[username]/[repository]:[tag].
```
最后，发布 image 文件。
```
$ docker image push[username]/[repository]:[tag]
```
发布成功以后，登录 hub.docker.com，就可以看到已经发布的 image 文件。

11、其他有用的命令
前面的docker container run命令是新建容器，每运行一次，就会新建一个容器。同样的命令运行两次，就会生成两个一模一样的容器文件。如果希望重复使用容器，就要使用docker container start命令，它用来启动已经生成、已经停止运行的容器文件

```
$ docker container start[containerID]

```
前面的docker container kill命令终止容器运行，相当于向容器里面的主进程发出 SIGKILL 信号。而docker container stop命令也是用来终止容器运行，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号。
```
$ bash container stop[containerID]
```
这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以自行进行收尾清理工作，但也可以不理会这个信号。如果收到 SIGKILL 信号，就会强行立即终止，那些正在进行中的操作会全部丢失。

docker container logs命令用来查看 docker 容器的输出，即容器里面 Shell 的标准输出。如果docker run命令运行容器的时候，没有使用-it参数，就要用这个命令查看输出。
```
$ docker container logs[containerID]
```

docker container exec命令用于进入一个正在运行的 docker 容器。如果docker run命令运行容器的时候，没有使用-it参数，就要用这个命令进入容器。一旦进入了容器，就可以在容器的 Shell 执行命令了。
```
$ docker container exec-it[containerID]/bin/bash
```

docker container cp命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。下面是拷贝到当前目录的写法。
```
$ docker container cp[containID]:[/path/to/file].
```

[docker文档](https://github.com/yeasy/docker_practice/blob/master/SUMMARY.md)

命令合集

```
docker pull [选项] [docker registry 地址[:端口号]/]仓库名[:标签]
例如：docker pull ubuntu:16.04
docekr run   //运行容器container
例如：docker run -it --rm ubuntu:16.04 \bash
-it 这个两个参数，一个-i：交互式操作，-t 终端 bash 执行一些命令查看返回结果，因此需要交互式终端
--rm 容器退出后随之删除

exit  //退出容器
//启动一个nginx
docker run -p 8080:80 -d nginx
docker images   //列出所有image镜像
docker build -t //创建image

docker ps   //列出container
docker cp index.html b08b3xx://usr/share/nginx/html

##提交保存一个镜像
docker commit -m 'fun' b08b3xx(容器id) name(名称)
# 删除镜像
docker rmi b08b3xx
# 显示之前运行的历史容器
docker ps -a
# 删除容器container
docker rm b08b3xx(容器id) 
# 在host和container之间拷贝文件
docker cp
# 查看镜像和任务的详细信息
docker inspect ubuntu:latest
# 进入容器
docker exec -it d5ab172xx /bin/bash
docker attach d5ab172xx
ssh方式进去
# 删除全部容器
docker rm $(docker ps -aq)
# 一条命令实现停用并删除容器
docker stop $(docker ps -q) & docker rm $(docker ps -aq)
# 查看日志
docker logs <container id>
# 查看容器内部运行的进程
docker top [容器id]
# 导出镜像
docker expoer > develop.tar
# 导入镜像
输入命令docker import, 从文件夹中直接把ubuntu文件拖拽到命令行中
# 查看空间占用
docker system df -v
# 自动空间清理
docker system prune
# 挂载目录
docker run -p 8080:80 -d -v $PWD/doc2:/var/www/html cwz/nginx:1.0.0
#方式二
docker run --volumed-from ...

mkdir data
docker create -v $PWD/data:/var/mydata --name data_container ubuntu
产生一个仅有数据的容器

docker run -it --volumes-from data_container ubuntu /bin/base
从一个容器挂载，运行并进入容器内部

多容器app
compose介绍
  app名称：ghost，是一个博客平台程序，安装之后，可着急写文字或别人发布，架构：nginx-ghost app-mysql 分别分为三个容器
  dcoker-compose.yml命令
  build: 本地构建镜像
  command: 覆盖缺省命令
  depends_on: 连接容器
  ports: 暴露端口
  volumes: 挂载卷组
  image: 拉取镜像
docker-compose命令
  up：启动服务
  stop: 停止服务
  rm: 删除服务中的各个容器
  logs: 观察各个容器中的日志
  ps: 列出服务相关的容器
```

|命令|用途|
|--|--|
|docker pull|获取image|
|docker build|创建image|
|docker run|运行container|
|docker ps|列出container|
|docker rm|删除container|
|docker rmi|删除image|
|docker ps|在host和container之间拷贝文件|
|docker commit|保存改动为新的image|

Dockerfile 语法

|命令|用途|
|--|--|
|FROM|base image|
|RUN|执行命令|
|ADD|添加文件|
|COPY|拷贝文件|
|CMD|执行命令|
|EXPOSE|暴露端口|
|WORKDIR|指定路径|
|MAINTAINER|维护者|
|ENV|指定环境变量|
|ENTRYPOINT|容器入口|
|USER|指定用户|
|VOLUME|mount point|