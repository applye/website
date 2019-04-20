---
abbrlink: 1
title: React-native之开源Tab导航组件
categories: '前端'
tags:
  - '前端'
  - 'react-native'
date: 2019-04-15 22:12:38
img: 'http://i1.bvimg.com/683865/d838e138d8b7bf60s.jpg'
---
## React-native之开源Tab导航组件	

### 简介
大多数应用都会有导航进行页面切换，React Native原生的控件仅有TabBarIOS可供iOS平台使用，如果想同时适配Android和IOS,最好使用第三方控件，比如:react-native-tab-navigator
地址:<a href="https://github.com/exponent/react-native-tab-navigator" target="_blank">https://github.com/exponent/react-native-tab-navigator</a>

### 二. 使用
(1).安装
	项目根目录下 使用命令行安装 
    ```
    npm install react-native-tab-navigator --save
    ```

(2).导入
```
	import TabNavigator from 'react-native-tab-navigator';
```

(3).代码
```
	import React, { Component } from 'react'
	import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    ListView,
	} from 'react-native'
	import TabNavigator from 'react-native-tab-navigator'
	/**
	 * 
	 * TabNavigator 使用示例
	 * @export HomeUI
	 * @class HomeUI
	 * @extends {Component}
	 */
	export default class HomeUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        };
    }

    /**
     * 
     * 
     * @returns 
     * 
     * @memberOf HomeUI
     */
    render() {
        const homeView = (
            <View style={[styles.flex, styles.center, { backgroundColor: '#ffff0044' }]}>
                <Text style={{ fontSize: 22 }}>我是主页</Text>
            </View>
        )
        const settingView = (
            <View style={[styles.flex, styles.center, { backgroundColor: '#ffff0044' }]}>
                <Text style={{ fontSize: 22 }}>我是设置页面</Text>
            </View>
        )
        return (
           ' <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={{ height: 60 }}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title='主页'
                    renderIcon={() => <Image source={require('./images/home_tab_home_normal.png')} />}
                    renderSelectedIcon={() => <Image source={require('./images/home_tab_home_pressed.png')} />}
                    badgeText='200'
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {homeView}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'setting'}
                    title='设置'
                    renderIcon={() => <Image source={require('./images/home_tab_setting_normal.png')} />}
                    renderSelectedIcon={() => <Image source={require('./images/home_tab_setting_pressed.png')} />}
                    onPress={() => this.setState({ selectedTab: 'setting' })}>
                    {settingView}
                </TabNavigator.Item>
            </TabNavigator>
        )
    	}
	}
	const styles = StyleSheet.create({
    flex: {
        	flex: 1,
   	},
    ListView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    img: {
        width: 40,
        height: 33,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
 	},
	});
```