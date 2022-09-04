---
title: debounce弹跳函数介绍
categories: '工具'
tags:
  - '工具'
  - 'debounce'
comments: false
abbrlink: 32778
date: 2019-04-20 21:19:48
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202209041657018.jpg'
---
## debounce去弹跳函数 原lodash.debounce
debounce 强制函数再某段时间内只执行一次
throttle 强制函数以固定的频率触发的 DOM 事情的时候，他们都能极大提高用户体验.

dobounce 返回了一个闭包，这个闭包依然会被连续频繁地调用，但是在闭包内部，却限制了原始函数fn的执行，强制fn只在连续操作停止后只执行一次
大致核心代码如下：
```
function debounce(fun, delay) {
  var timer;
  return function() {
    var content = this;
    var args =  arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fun.apply(content, args);
    }, delay)
  }
}
```


