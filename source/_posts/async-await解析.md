---
abbrlink: 8
title: async await 异步使用
categories: 前端
tags:
    - 'async'
    - 'await'
    - 'js'
comments: false
date: 2019-04-15 23:47:20
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202305061524161.png'
---

### async await 异步使用

早期异步代码困境. 众所周知，js 是单线程的，耗时操作都是交给浏览器来处理，等时间到了从队列中取出执行，设计到事件循环的概念. 异步代码的困境、promise 出现解决了什么问题、异步回调地狱的终极方案并且实现 async await 的核心语法，其实 async/await 只是 generator+promise 的一个变种而已.

-   早期解决

早期解决方案都是传入两个回调，一个失败的，一个成功的。那很多开发者会问这不是挺好的吗？挺简单的，js 中函数是一等公民，可以传来传去，但是这样太灵活了，没有规范。
如果使用的是框架，还要阅读一下框架源码，正确失败的传实参的顺序，如果传参顺序错误这样是非常危险的。

-   promise 解决

Promise(承诺)，给予调用者一个承诺，过一会返回数据给你，就可以创建一个 promise 对象
当我们 new 一个 promise，此时我们需要传递一个回调函数，这个函数为立即执行的，称之为（executor）
这个回调函数，我们需要传入两个参数回调函数，reslove,reject(函数可以进行传参)

当执行了 reslove 函数，会回调 promise 对象的.then 函数
当执行了 reject 函数，会回调 promise 对象的.catche 函数

-   async await

1. async（异步的）
   async 用于申明一个异步函数

2. await 步函数的返回值

异步函数的返回值和普通返回值有所区别

普通函数主动返回什么就返回什么，不返回为 undefined
异步函数的返回值特点

明确有返回一个普通值，相当于 Promise.resolve(返回值)
返回一个 thenable 对象则由，then 方法中的 resolve,或者 reject 有关
明确返回一个 promise，则由这个 promise 决定
异步函数中可以使用 await 关键字，现在在全局也可以进行 await，但是不推荐。会阻塞主进程的代码执行

3. 异步函数的异常处理
   如果函数内部中途发生错误，可以通过 try catch 的方式捕获异常
   如果函数内部中途发生错误，也可以通过函数的返回值.catch 进行捕获

#### ES6生成器+Promise解法
1. ES6生成器+Promise解法
```
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('baidu')) {
        resolve(url)
      } else {
        reject('请求错误')
      }
    }, 1000);
  })
}

function* getData(url) {
  const res1 = yield requestData(url)
  const res2 = yield requestData(res1)
  const res3 = yield requestData(res2)

  console.log(res3)
}

const generator = getData('baidu.io')

generator.next().value.then(res1 => {
  generator.next(`baidu.org ${res1}`).value.then(res2 => {
    generator.next(`baidu.com ${res2}`).value.then(res3 => {
      generator.next(res3)
    })
  })
})

//baidu.com baidu.org baidu.io
```
* 可以发现我们的getData已经变为同步的形式，可以拿到我最终的结果了。那么很多同学会问，generator一直调用.next不是也产生了回调地狱吗？
* 其实不用关心这个，我们可以发现它这个是有规律的，我们可以封装成一个自动化执行的函数，我们就不用关心内部是如何调用的了。

2. 自动化执行函数封装
```
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('baidu')) {
        resolve(url)
      } else {
        reject('请求错误')
      }
    }, 1000);
  })
}

function* getData() {
  const res1 = yield requestData('baidu.io')
  const res2 = yield requestData(`baidu.org ${res1}`)
  const res3 = yield requestData(`baidu.com ${res2}`)

  console.log(res3)
}

//自动化执行 async await相当于自动帮我们执行.next
function asyncAutomation(genFn) {
  const generator = genFn()

  const _automation = (result) => {
    let nextData = generator.next(result)
    if(nextData.done) return

    nextData.value.then(res => {
      _automation(res)
    })
  }

  _automation()
}

asyncAutomation(getData)

//baidu.com baidu.org baidu.io
```
* 利用promise+生成器的方式变相实现解决回调地狱问题，其实就是async await的一个变种而已
* async await核心代码就类似这些，内部主动帮我们调用.next方法

3. async await解决
```
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('baidu')) {
        resolve(url)
      } else {
        reject('请求错误')
      }
    }, 1000);
  })
}

async function getData() {
  const res1 = await requestData('baidu.io')
  const res2 = await requestData(`baidu.org ${res1}`)
  const res3 = await requestData(`baidu.com ${res2}`)

  console.log(res3)
}

getData()

//baidu.com baidu.org baidu.io
```
* 惊奇的发现，只要把getData生成器函数函数，改为async函数，yeild的关键字替换为await就可以实现异步代码同步写法了.