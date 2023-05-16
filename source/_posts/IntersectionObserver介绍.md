---
title: IntersectionObserver介绍
categories:
  - '前端'
tags:
  - 'js'
  - 'IntersectionObserver'
comments: false
abbrlink: 36207
date: 2019-04-20 21:33:12
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202209041650625.jpg'
---
## IntersectionObserver简介
在移动端，有个很重要的概念，叫做懒加载，适用于一些图片资源特别多，ajax数据特别多的页面中，经常会有动态加载数据的场景中，这个时候，我们通常是使用监听scroll或者使用setInterval来判断，元素是否进入视图，其中scroll由于其特别大的计算量，会有性能问题，而setInterval由于其有间歇期，也会出现体验问题。
浏览器的开发商，估计也发现了这个问题，所以在2016年初，chrome51率先提供了一个新的API，就是IntersectionObserver，它可以用来监听元素是否进入了设备的可视区域之内，而不需要频繁的计算来做这个判断。

毕竟是一个新兴的API，所以浏览器的支持性并不好，这里可以看看当前浏览器对于IntersectionObserver的支持性：[IntersectionObserver](http://caniuse.com/#search=IntersectionObserver)

1. Api简介
该API的调用非常简单：
```
var observer = new IntersectionObserver(callback,options);
```
IntersectionObserver支持两个参数：

* callback是当被监听元素的可见性变化时，触发的回调函数
* options是一个配置参数，可选，有默认的属性值

2. 应用
* 预加载（滚动加载，无限加载）
* 懒加载（图片后加载）
* TAB滚动跟随

3. 事件DOMContentLoaded和load的区别
区别是: 触发的时机不一样，先触发DOMContentLoaded事件，后触发load事件。

DOM文档加载的步骤为

1. 解析HTML结构。
2. DOM树构建完成。//DOMContentLoaded
3. 加载外部脚本和样式表文件。
4. 解析并执行脚本代码。
5. 加载图片等外部文件。
6. 页面加载完毕。//load
在第2步，会触发DOMContentLoaded事件。在第6步，触发load事件。

js原生写法：
```
// 不兼容老的浏览器，兼容写法见[jQuery中ready与load事件](http://www.imooc.com/code/3253)，或用jQuery
document.addEventListener("DOMContentLoaded", function() {
   // ...代码...
}, false);

window.addEventListener("load", function() {
    // ...代码...
}, false);
```
jQuery写法
```
// DOMContentLoaded
$(document).ready(function() {
    // ...代码...
});

//load
$(document).load(function() {
    // ...代码...
});
```