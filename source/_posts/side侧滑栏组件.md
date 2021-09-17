---
abbrlink: 2
title: React Native 第三方组件react-native-side-menu -侧滑栏使用
categories: 前端
tags: ['React Native','前端']
comments: false
img: 'https://image.sitapix.com/index-thumb/sitapix-photo-4425159-via-sitapix-com.jpeg'
---
## React Native 第三方组件react-native-side-menu -侧滑栏使用
### 简介
  添加应用侧滑功能， 使用第三方组件。比如：react-native-side-menu。

  地址：<a href="https://github.com/react-native-community/react-native-side-menu" target="_blank">https://github.com/react-native-community/react-native-side-menu</a> 

(1). 安装
```
	 npm install react-native-side-menu --save
```
(2). 导入
```
	import SideMenu from 'react-native-side-menu';
```
(3). 出现的错误
```
Warning: setState(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.
```
大体意思是说render 在这种需要props和state进行渲染的方法中，不能在对props和state进行更新。 React 会在state和props改变的时候调用render进行DOM diff然后渲染，如果渲染在对props和state进行更新，就进入死循环。

解决办法：在调用方法时创建一个匿名函数，再调用。

(4).代码示例

    homeUI.js
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
	    ScrollView,
	    navigator,
	    TouchableOpacity,
	} from 'react-native'
	import SideMenu from 'react-native-side-menu'
	import Menu from './menu'

	/**
 	* 
 	* SideMenu 使用示例
	 * @export HomeUI
 	* @class HomeUI
	 * @extends {Component}
 	*/
	export default class HomeUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
        })
    }

    updateMenu(isOpen) {
        this.setState({
            isOpen: isOpen
        });
    }
    
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} navigator={navigator} />;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenu(isOpen)}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>hello world react native</Text>
                    <Text>
                        选中菜单是： {this.state.selectedItem}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.toggle()}>
                    <Image style={{ width: 32, height: 32 }} source={require('./images/image_menu.png')} />
                </TouchableOpacity>
            </SideMenu>
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
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        top: 20,
        padding: 10,
    },
	});

	menu.js

	import React,{Component} from 'react'
	import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
    Image,
    View,
	} from 'react-native'
	const window = Dimensions.get('window');

	/**
	 * 菜单组件
 	* 
 	* @class Menu
	* @extends {Component}
 	*/
	class Menu extends Component {
    static PropTypes = {
        onItemSelected: React.PropTypes.func.isRequired,
    };
    render() {
        return(
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarConent}>
                    <Image style={styles.avatar}
                        source={require('./images/avatar.jpg')} />
                        <Text style={styles.name}> 小程QQ昵称</Text>
                </View>
                <Text onPress={() => this.props.onItemSelected('作者')} style={styles.item}>
                    作者
                </Text>
                <Text onPress={() => this.props.onItemSelected('联系美丽蓝天')} style={styles.item}>
                    联系美丽蓝天
                </Text>
            </ScrollView>

        )
    }
	}
	const styles =  StyleSheet.create({
    menu: {
        flex:1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    avatarConent: {
        marginBottom: 20,
        marginTop:20,        
    },
    avatar: {
        width:48,
        height:48,
        borderRadius: 24,
        flex:1,
    },
    name:{
        position: 'absolute',
        left: 70,
        top:20,
    },
    item: {
        fontSize:16,
        fontWeight:'300',
        paddingTop:10,
    },
	})

	export default Menu;
```