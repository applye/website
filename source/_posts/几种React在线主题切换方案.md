---
abbrlink: 4
title: 几种React在线主题切换方案
categories: '前端'
tags:
    - '主题'
    - '前端'
    - 'react'
comments: false
date: 2019-04-15 23:28:34
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202305061459879.png'
---

1. 更改body的class命名

通过修改body标签的class名称来进行主题的切换，这是最简单最容易理解的方式。
```
<style>
  .light-theme p {
    color: #FFFFFF;
  }
  .light-theme div {
    background-color: #000000;
  }
  .dark-theme div {
    color: #f4f5f5;
  }
  .dark-theme p {
    color: #333333;
  }
</style>
<body class="normal-theme">
  <div>
    <p>这是测试</p>
  </div>
  <div id="root"></div>
</body>

const [ theme, setTheme ] = useState(false)

const changeTheme = () => {
  console.log('切换主题')
  setTheme(!theme)
  document.querySelector('body').className = theme ? 'dark-theme' : 'light-theme'
}
```
* 优点： 容易理解和实现
* 缺点： 多主题的时候，需要些多个class，代码容易混乱；需要手动编写

2. 利用less的modifyVars

通过less的modifyVars方法改变对应的样式变量，因此我们先需要引入less.js，可以通过npm install less的方式或者CND的方式引入less.js
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/4.1.3/less.min.js"></script>
```
这样就可以在项目中使用modifyVars方法了。
```
// LESS
@primary-color: #15eaf0; // 全局主色
@success-color: #52c41a; // 成功色

.header {
  height: 80px;
  background-color: @primary-color;
  color: @success-color;
}

// react
 const changeTheme = () => {
    less.modifyVars({  // 调用 `less.modifyVars` 方法来改变变量值
      'primary-color': '#Ff4FFF',
    }).then(() => {
      console.log('修改成功');
    })
 }
```
样式文件在html中引入的位置最好放在body标签之内，如果通过CDN的方式引入less.js，那么样式文件一定要在script标签之前引入

* 优点： 样式颜色修改灵活
* 缺点： 无法压缩混淆

3. 使用styled-components

styled-component提供<ThemeProvider>包装组件以支持主题，<ThemeProvider>通过contextAPI 为其后代组件提供主题.在其渲染树中的所有组件都能够访问主题。具体实现如下：

(1) 首先通过npm install --save styled-components 安装styled-componets，安装成功之后创建styled.ts，在文件中写一个基本样式组件：
```
import styled from 'styled-components'

export const HeaderDiv = styled.div`
  background: ${props => props.theme.backgroundColor};
```

(2) <ThemeProvider>，将其放在HeaderDiv外层
```
import React, { useState } from 'react'
import { SkinOutlined } from '@ant-design/icons'
import { ThemeProvider } from 'styled-components'
import { HeaderDiv } from './styled'

const Header: React.FC = props => {
  const [ theme, setTheme ] = useState({
    backgroundColor: 'green'
  })

  const changeTheme = () => {
    console.log('切换主题')
    setTheme({
      backgroundColor: 'red'
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <HeaderDiv>
        <SkinOutlined onClick={changeTheme} style={{ marginRight: 10 }} />
      </HeaderDiv>
    <ThemeProvider>
  )
}

export default Header
```

* 优点： 可以使用ts，用来封装标准组件方便，不存在兼容性问题
* 缺点： 对antd的组件，需要二次封装

4. 使用css变量
通过定义css变量的方式来动态修改对应的颜色，或者修改对应的某个主题；
(1) 首先是改变单个颜色变量的做法：
```
:root {
  --color: #333333;
  --background-color: #FFFFFF;
}

.header {
  color: var(--color);
  background-color: var(--background-color);
}
```
(2) 修改变量的一些方法
```
动态修改:root变量中的值：
const root = document.documentElement
let _style = getComputedStyle(root)

// 获取颜色变量
_style.getPropertyValue('--background-color').trim()
// 设置颜色变量
root.style.setProperty('--background-color','green')
// 删除颜色变量
root.style.removeProperty('--background-color')

document.documentElement.style.setProperty(`--color`, 'red');
```
(3) React中使用：
```
import React from 'react'
import { SkinOutlined } from '@ant-design/icons'
import style from './header.less'

const Header: React.FC = props => {

  const changeTheme = () => {
    console.log('切换主题')
    const root = document.documentElement
    let _style = getComputedStyle(root)
    root.style.setProperty('--background-color','green')
  }

  return (
    <div className={style.header}>
      <SkinOutlined onClick={changeTheme} />
    </div>
  )
}

export default Header
```

(4) 改变整个主题的用法：
```
// variable.css 主题文件创建到public文件夹中的variable.css中（没错，是.css，这里用less的话无法生效）

:root.light{
  --color: #333333;
  --background-color: #FFFFFF;
}

:root.dark {
  --color: #FFFFFF;
  --background-color: #000000;
}

// 在header.less中使用对应变量：
.header {
  color: var(--color);
  background-color: var(--background-color);
}

// React中写切换事件
import React, { useEffect } from 'react'
import { SkinOutlined } from '@ant-design/icons'
import style from './header.less'

const Header: React.FC = props => {

  useEffect(() => {
    // 这里设置默认的主题样式
    const root = document.documentElement
    root.className = 'light'
  }, [])

  const changeTheme = () => {
    console.log('切换主题')
    const root = document.documentElement
    // 这里跟上面改变单个变量的方式不同，需要直接改变root的className来改变整体主题
    root.className = 'dark'
  }

  return (
    <div className={style.header}>
      <SkinOutlined onClick={changeTheme} style={{ marginRight: 10 }} />
    </div>
  )
}

export default Header
```
* 缺点： 兼容性存在一定问题
