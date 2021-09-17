---
title: kubenetes集群环境
categories: '工具'
tags:
  - 'k8s'
  - '环境搭建'
  - 'kubenetes'
comments: false
abbrlink: 50923
date: 2019-04-17 21:59:27
img: 'https://image.sitapix.com/index-thumb/abstract-business-code-270348-via-sitapix-com.jpeg'
---

## Minikube 安装

Minikube是一个快速搭建单节点kubeneter集群的工具
```
  brew cask install minikube
  //查看系统版本
  minikube version
```
## kubectl 安装
```
  # curl -LO https://stroage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/darwin/amd64/kubectl   安装最新版
  # chmod +x ./kubectl  赋二进制文件执行权限
  # sudo mv ./kubectl /usr/local/bin/kubectl   将二进制文件移到path中
  # kubectl version

  minikube start //去创建k8s环境

  //执行结束可以通过kubectl cluster-info 查看集群信息 去连一下k8s api server
  minikube ssh //进入虚拟机，进入集群，查看container运行起来了
  docker ps
  //退出，运行
  minikube dashboard  # UI界面
  minikube delete   # 删除已运行的Minikube实例
  minikube stop     # 停止已运行的Minikube实例
  minikube logs     # 查看日志

  //运行nginx
  # 运行一个nginx的pod, 然后导出运行的nginx服务
  kubectl run hello --image=nginx --port=80
  kubectl expose deployment hello --type=NodePort

  //命令
  minikube status
  minikube docker-env
  kubectl get nodes # 显示本地节点
  kubectl get all   # 显示所有资源 包括Pod, Service, Deployment, RS 等
  kubectl get all -o wide # 展示更多的信息, 包括镜像地址等
  kubectl get pod --all-namespaces   //查看所有服务就绪

  (1) 命令行直接创建namespace
  kubectl create namespace new-namespace

  (2) 通过文件创建
  cat my-namespace.yaml
  apiVersion: v1
  kind: Namespace
  metadata:
  name: new-namespace
  kubectl create -f ./my-namespace.yaml
  kubectl apply -f
  kubectl -n kub-system edit service kubernetes-dashboard

  kubectl delete -f kubernetes-dashboard.yaml
  //删除
  kubectl delete namespace new-namespace # 删除一个namespace会自动删除所有属于该namespace的资源，default和kube-system 命名空间不可删除。

  kubectl get pod # 显示所有pod
  kubectl get serveice # 显示所有server
  kubectl describe pods # 查看错误log
  kubectl get rc  # 显示所有rc
  kubectl delete rc rcname # 删除rc
  kubectl delete service servicename # 删除server
  kubectl delete pod podname # 删除pod 触发了replicas的确保机制，那么我们删除deployment deployment进行删除，则全部删除.
  kubectl delete deployment podname

  kubectl delete pod -all # 删除所有

  启动cluster
  minikube start
  kubectl get pods --all-namespace
  kubectl get nodes
  eval $(minikube docker-env)

  1. 创建并启动minikube虚拟机
  $ minikube start
  Starting local Kubernetes cluster...
  Running pre-create checks...
  Creating machine...
  Starting local Kubernetes cluster...

  2. 创建 hello-minikube 部署
  $ kubectl run hello-minikube --image=tomcat:8.0 --port=8080
  deployment "hello-minikube" created

  3. 发布服务 hello-minikube
  $ kubectl expose deployment hello-minikube --type=NodePort
  service "hello-minikube" exposed

  4. 查看 pods
  $ kubectl get pods
  NAME                             READY    STATUS             RESTARTS  AGE
  hello-minikube-598805112-3bzmf    1/1     ContainerCreating    0       5s
  注意：刚开始时， pod 没有完全创建好的时候，状态是ContainerCreating, 当部署完成，状态就变成了Running.

  $ kubectl get pods
  NAME                             READY    STATUS             RESTARTS  AGE
  hello-minikube-598805112-3bzmf    1/1     Running              0       25s

  用describe 可以查询失败的pod
  kubectl describe pod hello-minikube-598805112-3bzmf

  5. 获取服务地址
  $ minikube service hello-minikube --url
  http:xx.xx.xx.xx:30724
  $ minikube service hello-minikube   将直接打开地址到默认浏览器上。

  6. 停止minikube虚拟机
  $ minikube stop
```