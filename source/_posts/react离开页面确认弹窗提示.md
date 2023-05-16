---
abbrlink: 10
title: react中实现路由切换时离开页面确认弹窗提示
tags:
  - '前端'
  - 'js'
  - 'react'
comments: false
date: 2019-04-15 23:57:20
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202305162215972.png'
---

### 简介

react中实现路由切换时离开页面确认弹窗提示

1. 需要离开提示页面上添加

    * 引入Prompt
        ```
        import { Prompt } from 'react-router-dom';
        ```

    * 在页面中添加组件，可在render内任一地方添加

        <Prompt message='商家信息还未保存，是否离开？' when={true} />

        ```
        render(){
            return <Prompt message='商家信息还未保存，是否离开？' when={true} />
        }
        ```

2. 在路由页面进行配置

    * Router上添加 getUserConfirmation={getConfirmation}
        ```
        <Router getUserConfirmation={getConfirmation} >
        ```

    * 在路由页面添加方法
        ```
            function getConfirmation(message, callback) { // 至关重要的callback方法，可以异步执行
            if (!window.pageChangeConfirm) { // G.pageChangeConfirm为页面内的全局变量，用于数据交互与条件判断
                callback(true);
                return;
            }
            Modal.confirm({
                title: '离开该页面，表单信息将不被保留？是否确定离开该页面？',
                content: '',
                okText: '离开',
                cancelText: '取消',
                onOk() {
                    callback(true);
                },
                onCancel() {
                    callback(false);
                },
            });
        }
        ```
    * 触发弹窗

        通过设置window.pageChangeConfirm，触发是否弹窗。

        例：在componentDidMount设置默认离开是否弹窗。 也可在点击页面时触发修改弹窗参数

        ```
        if (isEdit) {
            window.pageChangeConfirm = true;
        }
        ```
