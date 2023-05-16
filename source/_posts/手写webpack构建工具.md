---
title: 手写webpack构建工具
categories: '前端'
tags:
  - '前端'
  - 'webpack'
comments: false
abbrlink: 27060
date: 2019-06-07 21:33:14
img: https://raw.githubusercontent.com/879733672/images/cdn/img/202304282212112.png
---
## webpack构建主要流程

* 打包的主要流程如下
    1. 需要读到入口文件里面的内容。
    2. 分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树。
    3. 根据AST语法树，生成浏览器能够运行的代码


* 创建项目

```
mdirk webpack
cd webpack
npm init -y  初始化项目
```
![](https://raw.githubusercontent.com/879733672/images/cdn/img/202302241054732.png)

* 安装相应的依赖

```
npm install @babel/parser -save  //（转AST）
npm install @babel/traverse -save  // 遍历AST收集依赖
npm install @babel/core -save  // es6转ES5
npm install babel/preset-env -save  // 插件预设
```

* 读到入口文件内容

```
function getModuleInfo(file) {
    const deps = {}
    const body = fs.readFileSync(file, 'utf-8');
}
```
* 分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树
```
 traverse(ast, { ImportDeclaration({node}) {
        const dirName = path.dirname(file);
        const abspath = './' + path.posix.join(dirName, node.source.value);
        deps[node.source.value]  = abspath;
    } });
```
* 根据AST语法树，生成浏览器能够运行的代码
```
 const { code } = babel.transformFromAst(ast, null, { presets: ['@babel/preset-env'] });
 ```
* 完成代码如下：
```
function getModuleInfo(file) {
    const deps = {}
    const body = fs.readFileSync(file, 'utf-8');
    const ast = parser.parse(body, {sourceType:'module'});
    traverse(ast, { ImportDeclaration({node}) {
        const dirName = path.dirname(file);
        const abspath = './' + path.posix.join(dirName, node.source.value);
        deps[node.source.value]  = abspath;
    } });
    const { code } = babel.transformFromAst(ast, null, { presets: ['@babel/preset-env'] });
    const mouleInfo = { file, deps, code };
    return mouleInfo;
}
```
* 打印结果，会拿到入口文件的所有依赖。
![](https://raw.githubusercontent.com/879733672/images/cdn/img/202302241101804.png)

这样分析到单个文件的依赖，之后在根据入口文件依赖，循环递归拿到所有的文件。

```
function parseModule(file){
    const entry = getModuleInfo(file); // 获取单个文件依赖
    const temp = [entry];
    const depsGraph = { };  // 存储依赖关系对象
    getDeps(temp, entry);
    temp.forEach(info => {
        depsGraph[info.file] = {
            deps: info.deps,
            code: info.code
        }
    });
    return depsGraph;
}

function getDeps(temp, { deps }) {
    Object.keys(deps).forEach(key => {
        if (deps.hasOwnProperty(key)){
            const child = getModuleInfo(deps[key]);
            temp.push(child);
            getDeps(temp, child);
        }
    });
}
```

* 定义bunlde函数
```
function bundle(file) {
    const depsGraph = JSON.stringify(parseModule(file));  // 读取文件关系图
    return `(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`
}
```
* 调用并写入打包目录， 到此webpack核心原理已经完成
```
const info = bundle('./src/index.js');
if(!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
}
fs.writeFileSync('./dist/bundle.js', info);
```





