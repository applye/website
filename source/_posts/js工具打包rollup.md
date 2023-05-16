---
abbrlink: 10
title: rollup（下一代ES模块捆绑器）
tags:
  - '前端'
  - '正则'
  - 'js'
comments: false
date: 2019-04-15 23:57:20
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202305061546688.png'
---

### 简介

rollup生成代码只是把我们的代码转码成目标js并无其他,同时如果需要,他可以同时帮我们生成支持umd/commonjs/es的js代码,vue/react/angular都在用他作为打包工具.

1. 发布包基本流程

    (1). 使用nrm管理npm源:

    >nrm：npm registry 管理工具，方便切换不同的源；开发的包需要发布的源是

    [https://registry.npmjs.org](https://registry.npmjs.org)

    ```
    // 安装
    npm install -g nrm
    //查看
    nrm ls
    // 切换
    nrm use taobao
    // 增加源
    nrm add <registry> <url> [home]
    // 删除源
    nrm del <registry>
    ```

    (2). 发布包
    >[https://www.npmjs.com](https://www.npmjs.com) 注册账户并在邮箱激活账户
    ```
    * 编写包代码(npm init等操作，具体在下面会提及)

    * 切换registry到npm对应链接https://registry.npmjs.org/：nrm use npm

    * 登录：npm login

    * 发布、更新：npm publish
    ```

    (3). 关于为何选择rollup而不是webpack编写一个npm包

    * 为了支持tree shaking，得导出一份符合es6模块规范的代码，但是webpack不支持导出为es6模块，所以使用rollup来开发我们的包

    * Rollup偏向应用于js库，webpack偏向应用于前端工程，UI库；如果你的应用场景中只是js代码，希望做ES转换，模块解析，可以使用Rollup。如果你的场景中涉及到css、html，涉及到复杂的代码拆分合并，建议使用webpack。

    * rollup可以直接构建出符合es6模块规范的代码（有利于tree shaking），但是webpack不能；因此为了更好地使用es6模块化来实现tree shaking，以及优化包代码体积等原因，选用rollup来开发npm包；


2. 使用rollup构建npm包


    * 新建文件夹tool
    ```
    cd tool
    npm init -y
    npm i rollup --save-dev
    ```
    * 构建脚本
    package.json中加入构建脚本命令：
    ```
    "scripts": {
        "build": "rollup -c ./rollup.config.js"
    }
    ```

    ```
    // rollup.config.js
    const path = require('path');
    const resolve = function (filePath) {
        return path.join(__dirname, '..', filePath)
    }
    export default {
        input: resolve('src/core.js'), // 入口文件
        output: { // 出口文件
            file: resolve('dist/bundle.js'),
            format: 'umd',  //  五种输出格式：amd /  es / iife / umd / cjs
            name: 'tool'
        }
    };
    ```
    ```
    // core.js
    import index from './index.js';
    export default (function () {
        console.log(index);
    })();
    ```
    ```
    // index.js
    export default 'hello world!';
    ```
    ```
    // index.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>example</title>
    </head>
    <body>
        
    </body>
    <script src="../dist/bundle.js"></script>
    </html>
    ```
    执行npm run build，就可以生成打包文件/dist/bundle.js，打开example/index.html控制台可以查看打包文件是否生效

    * 使用插件
    rollup中如果要处理json，就要用到插件，比如rollup-plugin-json

    ```
    npm i rollup-plugin-json --save-dev
    ```

    ```
    const path = require('path');
    import json from 'rollup-plugin-json'; 
    const resolve = function(filePath) {
        return path.join(__dirname, filePath);
    }

    export default {
        input: resolve('src/index.js'),
        output: {
            file: resolve('dist/bundle.js'),
            format: 'umd',
            name: 'tool',
            sourcemap:true 
        },
        plugins: [
            json(),
        ]
    }
    ```

    ```
    import foo from './foo.js'
    import { version } from '../package.json';
    console.log(version);
    export default (function() {
        console.log(foo);
    })();
    ```

    * external：有些包要处理成外部引用（例如lodash等），externals就是用来处理外部的引用，不要将这些包打包到输出文件中，减小打包文件体积.
        > external 接受一个模块名称的数组或一个接受模块名称的函数，如果它被视为外部引用（externals）则返回true

        ```
            // rollup.config.js
        export default {
            ...,
            // 作用：指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
            external: ['lodash']
            // external: id => /lodash/.test(id) // 也可以使用这种方式
        };
        ```

    * 一次编译，同时打包生成不同格式文件，如cjs、es、umd等， 核心示例代码：

    ```
    import json from "rollup-plugin-json";
    import resolve from "rollup-plugin-node-resolve"; // Rollup 如何查找外部模块, 其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏CommonJS的检测
    import commonjs from "rollup-plugin-commonjs"; // CommonJS模块转换为 ES2015 供 Rollup 处理
    import { eslint } from "rollup-plugin-eslint";
    import serve from "rollup-plugin-serve";
    import { terser } from "rollup-plugin-terser";
    import babel from "rollup-plugin-babel";
    import { omit } from "lodash";

    const path = require("path");
    const resolveFile = function (filePath) {
        return path.join(__dirname, "..", filePath);
    };

    const isDev = process.env.NODE_ENV !== "production";
    // 通过控制outputs中对应的isExternal、isUglify值来决定打包的文件是否启用external和uglify
    const outputs = [
        {
            file: resolveFile("lib/index.js"),
            format: "cjs",
            isExternal: true,
            exports: "auto"
        },
        {
            file: resolveFile("es/index.js"),
            format: "es",
            isExternal: true,
        },
        {
            file: resolveFile("dist/index.js"),
            format: "umd",
            name: "tool",
            globals: {
                lodash: '_'
            },
            isExternal: true
        },
        {
            file: resolveFile("dist/index.min.js"),
            format: "umd", //  五种输出格式：amd /  es / iife / umd / cjs
            name: "tool", // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=.
            isUglify: true,
            isExternal: true,  // 外部是否打包进去，true不打包进去
            globals: {
                lodash: '_'
            }
        },
    ].map((i) => {
        i.sourcemap = isDev;  // 生成bundle.map.js文件，方便调试
        return i;
    });

    const len = outputs.length;

    const config = outputs.map((output, i) => {
        const isUglify = output?.isUglify || false;
        const isExternal = output?.isExternal || false;
        return {
            input: resolveFile("src/index.js"),
            output: omit(output, ['isUglify', 'isExternal']),
            plugins: [
                commonjs(),
                json(),
                resolve({
                    // 将自定义选项传递给解析插件
                    customResolveOptions: {
                        moduleDirectory: "node_modules",
                    },
                }),
                eslint({
                    throwOnError: true,
                    throwOnWarning: true,
                    include: ["src/**"],
                    exclude: ["node_modules/**"],
                }),
                babel({
                    exclude: "node_modules/**", // 只编译源码
                    runtimeHelpers: true,  // 使plugin-transform-runtime生效
                }),
                ...(isDev && i === len - 1
                    ? [
                        serve({
                            // 使用开发服务插件
                            port: 3001,
                            // 设置 exmaple的访问目录和dist的访问目录
                            contentBase: [resolveFile("example"), resolveFile("dist")],
                        }),
                    ]
                    : isUglify
                        ? [
                            terser({
                                compress: {
                                    // remove console.log
                                    pure_funcs: ["console.log"],
                                },
                                // output: {
                                //   // add comment on the top
                                //   preamble: `/*! ${PROJECT} - v${VERSION} - ${DATE} https://xiaogliu.github.io */`
                                // }
                            }),
                        ]
                        : []),
            ],
            // 作用：指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
            // external: id => /@babel\runtime/.test(id) || /lodash/.test(id),
            // external: id => /lodash/.test(id) // 也可以使用这种方式
            external: (id) => {
                return !isExternal
                    ? false
                    : /@babel\/runtime/.test(id) || /lodash/.test(id);
            },
        };
    });

    export default config;
    ```

3. 关于调试

    * 直接通过npm start启动时的http://localhost:3001来调试；由于开启了rollup的监听功能，因此当我们修改代码时，会自动构建打包出新代码，只要刷新浏览器就能看到最新的效果；开启source map调试调试方法中能正常使用

    * npm link命令通过链接目录和可执行文件，实现任意位置的npm包命令的全局可执行。 
     (1) 在包目录下执行npm link； 
     (2)在项目目录下执行npm link tool(假设包名为tool)即可使用该包 (执行npm unlink tool可以删除包链接)；

在包目录下执行npm start可以实时打包出最新代码

    
4. package.json中需要注意的点：

    版本格式: [主版本号major.次版本号minor.修订号patch]

    先行版本: 内部版本alpha、公测版本beta、Release candiate正式版本的候选版本rc，例如1.0.0-alpha、1.0.0-beta.1

    使用npm version进行版本号管理：
    ```
    npm version 1.0.1  # 显示设置版本号为 1.0.1
    npm version major  # major + 1，其余版本号归 0
    npm version minor  # minor + 1，patch 归 0
    npm version patch  # patch + 1

    # 预发布版本
    # 当前版本号为 1.2.3
    npm version prepatch  # 版本号变为 1.2.4-0，也就是 1.2.4 版本的第一个预发布版本
    npm version preminor  # 版本号变为 1.3.0-0，也就是 1.3.0 版本的第一个预发布版本
    npm version premajor  # 版本号变为 2.0.0-0，也就是 2.0.0 版本的第一个预发布版本
    npm version prerelease  # 版本号变为 2.0.0-1，也就是使预发布版本号加一

    # 在git环境下npm version会默认执行git add->git commit->git tag
    npm version minor -m "feat(version): upgrade to %s"  # 可自定义commit message；%s 会自动替换为新版本号

    # 模块 tag 管理
    # 当前版本为1.0.1
    npm version prerelease  # 1.0.2-0
    npm publish --tag beta # 发布包beta版本，打上beta tag
    npm dist-tag ls xxx  # 查看某个包的tag；beta: 1.0.2-0
    npm install xxx@beta  # 下载beta版本 1.0.2-0
    # 当prerelease版本已经稳定了，可以将prerelease版本设置为稳定版本
    npm dist-tag add xxx@1.0.2-0 latest
    npm dist-tag ls xxx  # latest: 1.0.2-0
    ```

    npm version 可以更新包版本，当仓库已经被git初始化了，那么运行npm version修改完版本号以后，还会运行git add 、git commit和git tag的命令，其中commit的信息默认是自改完的版本号.

    * lib：符合commonjs规范的文件，一般放在lib这个文件夹里面，入口是mian

    * es：符合ES module规范的文件，一般放在es这个文件夹里面，入口是module

    * dist：经过压缩的文件，一般是可以通过script标签直接引用的文件


5. 控制npm发布的包包含的文件有以下方式：

    * package.json#files：数组，表示可以包含哪些文件，格式和.gitignore的写法一样
    * .npmignore：表示哪些文件将被忽略，格式和.gitignore的写法一样
    * .gitignore：表示要忽略哪些文件
    优先级：files > .npmignore > .gitignore
