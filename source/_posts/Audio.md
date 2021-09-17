---
abbrlink: 8
title: H5 Audio 对象介绍
categories: 前端
tags:
  - '前端'
  - 'h5'
  - 'audio'
comments: false
date: 2019-04-15 23:47:20
img: 'https://image.sitapix.com/index-thumb/sitapix-photo-305084-via-sitapix-com.jpeg'
---

## Audio 对象介绍

[详细AIP, 参w3school教程](http://www.w3school.com.cn/jsref/dom_obj_audio.asp)

1. 创建Audio对象，可以通过下面两种方式得到。
```
		//方法一
		<audio id="music" src=".map3">Your browser does not support it</audio>
		<script>
			var audio = document.getElementById('#music');
		</script>
	
		//方法二
		var audio = new Audio('.map3');
```
2. 方法和属性介绍
```
		audio.play();   //开始播放
		audio.pause();  //暂停
		audio.autoPlay = true/false  //设置播放状态
		console.log(audio.autoPlay);  //获取播放状态
		audio.src    //获取或者设置播放地址
		audio.volume = 0.5/1  //设置音量，最大为1,0为静音,获取音量
		console.log(audio.volume);
		audio.loop = true  //设置或者获取循环状态
		console.log(audio.loop);
		audio.duration  //获取音乐的长度，单位秒
		audio.currentTime  //设置或者获取播放时间
		audio.ended   //判断音乐是否播放完毕，只读属性
		
		事件
		
		playing
		当音乐开始播放，暂停后重新开始播放，设置currentTime后开始播放时触发
		audio.addEventListener('playing', function() {
			console.log('playing');
		});

		pause
		当音乐暂停时和结束时触发
		audio.addEventListener('pause', function(){
			console.log('pause');
		});

		ended
		当音乐结束时触发
		audio.addEventListener('ended', function() {
			console.log('ended');
		});

		timeupdate
		//当currentTime更新时会触发timeupdate事件。			
		audio.ontimeupdate = function(){
		 	console.log('timeupdate');
		}

		volumechange
		当音量改变时触发
		audio.onvolumechange = function(){
		  console.log('volumechange')
		}
```