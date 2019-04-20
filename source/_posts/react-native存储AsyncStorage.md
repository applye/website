---
abbrlink: 3
title: React Native APi AsyncStorage的使用
categories: '前端'
tags:
  - '前端'
  - 'react-native'
	- 'AsyncStorage'
date: 2019-04-15 22:18:34
img: 'http://i1.bvimg.com/683865/9bfbc148e42886a0s.jpg'
---
## React Native APi AsyncStorage的使用。
### 简介
  AsyncStorage是一个简单的、异步、持久的key-value存储系统，它对于App来说是全局的。用来替换LocalStorage。推荐您使用AsyncStorage基础上做一层抽象的封装，而不是直接使用。

  地址：<a href="https://github.com/sunnylqm/react-native-storage" target="_blank">https://github.com/sunnylqm/react-native-storage</a>
### 方法
  AsyncStorage里面都有一个回调，而回调第一个参数都是错误对象，如果发生错误，就返回该对象的错误信息，否则为null。每个方法都返回一个promise对象。
```
	static getItem(key:string , callback:(error,result)): 根据键来获取值，获取的结果会在回调函数中。
	static setItem(key:string , value:string , callback:(error)): 设置键值对。
	static removeItem(key:string , callback:(error)): 将根据键移出一项
	static mergeItem:(key:string , value:string , callback:(error)): 合并现有的值和输入值。
	static clear(callback:(error)): 清除所有的项目。
	static getAllKeys(callback:(error)): 获取所有的键。
	static multiGet(keys,callback:(errors,result)):获取多项，其中keys是字符串数组。
	static multiSet(keyValuePairs,callback:(errors)):设置多项，其中keyValuePairs是字符串的二维数组。
	static multiRemove(keys,callback(errors)):删除多项，其中keys是字符串数组。
	static multiMerge(keyValuePairs,callback:(errors)):多个键值合并，其中keyValuePairs是字符串中的二维数组。
```
