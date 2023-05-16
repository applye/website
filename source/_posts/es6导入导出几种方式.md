---
title: ES6模块导入和导出
categories: '前端'
tags:
  - '前端'
  - 'es6'
comments: false
abbrlink: 41020
date: 2022-04-29 20:07:14
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202304282137822.png'
---

## ES6模块导入和导出

### 常用导入导出

1. export 导出模块

    * 正常导出

        // 方式一
        ```
        export var first = 'test';
        export function func() {
            return true
        }
        ```
        // 方式二
        ```
        var first = 'test;
        var second = 'test';
        function func() {
            return true;
        }
        export { first,  second, func}
        ```

    * as关键字：

        ```
        var first = 'test';
        export { first as second };
        ```
        as 关键字可以重命名暴露的变量或方法，经过重命名后同一变量可以多次暴露出去。

    * export default

        export default 会导出默认输出，即用户不需要知道模块中输出的名字，在导入时候为其指定任意名称
        ```
        // 导出
        export default function() {
            console.log('fun');
        }
        // 导入
        import customName from './export-default';
        ```
        注意：导入默认模块时不需要大括号，导出默认的变量或方法可以有名称，但是对外无效，export default只能使用一次。

2. import 导入模块

    * 正常导入

        ```
        import { firstName, lastName, year } from './test';
        ```
        导入模块位置可以是相对路径也可以是绝对路径，.js可以省略，如果不带路径只是模块名，则需要通过配置文件告诉引擎查找的位置。

    * as关键字
        ```
        import { lastName as surname } from './test';
        ```
        import 命令会被提升到模块头部，所以写的位置不是那么重要，但不能使用表达式和变量来进行导入。

    * 加载整个模块（无输出）

        ```
        import 'loadsh';  // 仅仅是加载而已，无法使用
        ```

    * 加载整个模块（有输出）

        ```
        import * as circle from './circle';
        console.log('圆的面积：' + circle.area(4));
        console.log('圆的周长：' + circle.circumference(14));
        ```
        注意：import * 会忽略default 输出

3. 导入导出复合用法

    * 先导入后导出

        ```
        export { foo, bar } from 'my_module';
        // 等同于
        import { foo, bar } from 'my_module';
        export { foo, bar };
        ```

    * 整体先导入在输出及default

        ```
        // 整体输出
        export * from 'my_module';
        // 导出default， export default 其实导出的是default 变量
        export { default } from 'my_modaule';
        // 具名接口改default
        export { es6 as default } from './someModule';
        ```

4. 模块的继承

    ```
    export * from 'circle';
    export var e = 3.14;
    export default = function(x) {
        return Math.exp(x);
    }
    ```
    注意export * 会忽略default;


    ```
    export const name = 'xxx';
    import { name } from '...path';

    export default 'value';
    import name from '...path'


    export const name = 'value'
    export default 'value'

    import myname, { name } from './..path';


    const name="value";
    const name1="value2";
    export {name,name2} 
    import {name，name2} from "...'
    console.log(name,name2)//"value","value2"



    这里使用到as关键字进行重命名

    const name ='value'
    export { name as myLiveName}

    现在你文件引入就要换成myLiveName了，之前的名字就消失了

    import { myLiveName } from './..';
    console.log(myLiveName) //'value'

    console.log(name)  //undefined
    已经不能用了

    重命名可以用到多项导入和导出
    const name="value";
    const name1="value2";
    export { 
            name,
            name2 as myLiveName
    } 
    import { 
            name as myLiveName2，
            myLiveName
    } from "...'
    console.log(myLiveName2) //'value'
    console.log(name2) //'value2'

    console.log(name) //undefined
    console.log(name2) //undefined

    全部导入

    import * as newName from './..'

    现在就可以完全使用newName了
    console.log(newName.name) //'value'
    console.log(newName.myLiveName)  //'value2

    注意如果文件中含有一个默认导出
    export default 'value3'
    console.log(newName.default)  //'value3'

    export { Aa , Bb  } from './xxx'

    export { default as useName }  from '...';
    ```

