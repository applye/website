---
title: react hooks 使用教程
categories: '前端'
tags:
  - '前端'
  - 'react'
  - 'hooks'
comments: false
abbrlink: 41019
date: 2022-04-29 20:07:14
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202305162211911.png'
---

## react hooks 使用教程

### 简介

Hook 是React16.8新增的特性，可以说是扩展了函数式组件的各项功能。有了这个功能，函数式组件和类式组件在实现功能上就没有什么差异了，而且使用hook后，能使代码更加的简洁，代码也更具复用性了。


### useState
以一个计数器介绍：
```
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    return (<div>
        <h3>当前计数：{count}</h3>
        <button onClick={() => setCount(count+1)}>加一</button>
        <button onClick={() => setCount(count-1)}>减一1</button>
    </div>);
}

export default Counter;
```
上面组件实现了计数器，点击按钮就会加减，hook使得函数组件有了自己的状态。useState就是一个hook。
参数：初始值，不设置就为undefind, 也可以传入数组对象，还可以带一个返回值的函数。
返回值：数组，包括两个元素，一般简写使用数组结构语法。
* 第一个元素使当前状态的值（第一次调用为初始化的值）
* 第二个元素为设置状态值的函数。比如，上面的例子count的初始值为0 ，可以通过setCount来重新设置count的值，而且也会触发组件的创新渲染。

我们可以在组件中多次使用这个hook来创建多个变量


### useEffect

函数组件自身没有生命周期这类函数，我们要实现这个功能就可以使用这个hook
现在演示一个需求，页面的title总是显示counter的数字。
```
import React, { useEffect, useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = count;
    })
    

    return (<div>
        <h3>当前计数：{count}</h3>
        <button onClick={() => setCount(count+1)}>加一</button>
        <button onClick={() => setCount(count-1)}>减一1</button>
    </div>);
}

export default Counter;
```

useEffect这个hook可以告知React在渲染好组件后执行某些操作。该hook要求传入一个回调函数，在React执行完DOM更新操作后就会回调这个函数。默认情况下，无论是第一次渲染还是之后的每次更新都会执行一次这个回调函数。

清除effect
我们需要在组件卸载的时候清除componentWillUnmount中进行清除。而useEffect为我们可以这样做，在我们传入的回调函数中，我么们可以指定一个返回值，返回一个回调函数。

这是useEffect可选清除机制，每个useEffect都可以返回一个清除函数。
```
   useEffect(() => {
        document.title = count;
        return () => {
            console.log('清除了');
        }
    });
```

useEffect性能优化

某些代码我们只希望在组件第一次挂载完毕后执行一次就行了，之后的更新就无需再执行。但是默认情况下useEffect在第一次挂载和之后的更新都会执行回调。这多次的执行一定程度上会导致一些性能问题。

所以useEffect可以传入第二个参数，第二个参数是一个数组，传入该useEffect的依赖项。如果该useEffect不依赖任何内容的话可以传入一个空数组。当传入空数组的时候，useEffect中的回调函数就相当于componentDidMount，回调函数返回的回调函数就相当于componentWillUnmount。当然传入的依赖项如果改变了那就会重新执行回调函数和返回的回调函数。

### useContext
另类的获取context的方式
```
const ThemeContext = React.createContext();
const ContextHooks = () => {
    const theme = useContext(ThemeContext);
    return <div>主题颜色{theme.color}</div>
}
```
当最上层的Provider更新的时候，该hook会重新触发渲染并传递新的值。

### useReducer


