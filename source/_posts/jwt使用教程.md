---
title: jwt使用教程
categories: '前端'
tags:
  - 'jwt'
  - 'json web token'
  - 'token'
comments: false
abbrlink: 8816
date: 2023-04-02 21:31:52
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202304262137347.png'
---

## jwt简介
	
	* [JWT](https://jwt.io/)(Json Web Token)是实现token技术的一种解决方案,JWT由三部分组成：header(头)、payload(载体)、signature(签名).

### 用法

	* jwt.sign(payload, secretOrPrivateKey, [options, callback])

   （异步）如果提供回调，则使用err或JWT 调用回调。
   （同步）将JsonWebToken返回为字符串。

    payload必须是一个object, buffer或者string。请注意， exp只有当payload是object字面量时才可以设置。
	secretOrPrivateKey 是包含HMAC算法的密钥或RSA和ECDSA的PEM编码私钥的string或buffer。
	options: 
		* algorithm：加密算法（默认值：HS256）

		* expiresIn：以秒表示或描述时间跨度zeit / ms的字符串。如60，"2 days"，"10h"，"7d"，Expiration time，过期时间

		* notBefore：以秒表示或描述时间跨度zeit / ms的字符串。如：60，"2days"，"10h"，"7d"

		* audience：Audience，观众

		* issuer：Issuer，发行者

		* jwtid：JWT ID

		* subject：Subject，主题

		* noTimestamp

		* header

	如果payload不是buffer或string，它将被强制转换为使用的字符串JSON.stringify()。
	在expiresIn，notBefore，audience，subject，issuer没有默认值时。也可以直接在payload中用exp，nbf，aud，sub和iss分别表示，但是你不能在这两个地方同时设置。
	请记住exp，nbf，iat是NumericDate类型。
	生成的jwts通常会包含一个iat值除非指定了noTimestamp。如果iat插入payload中，则将使用它来代替实际的时间戳来计算其他事情，诸如options.expiresIn给定一个exp这样的时间间隔。
	```
	iss：Issuer，发行者 
	sub：Subject，主题
	aud：Audience，观众
	exp：Expiration time，过期时间
	nbf：Not before
	iat：Issued at，发行时间
	jti：JWT ID
	```

	```
	// sign with default (HMAC SHA256)
	var jwt = require('jsonwebtoken');
	var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
	//backdate a jwt 30 seconds
	var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

	// sign with RSA SHA256
	var cert = fs.readFileSync('private.key');  // get private key
	var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});

	// sign asynchronously
	jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
	  console.log(token);
	});
	```

	Token Expiration (exp claim)

	签署1小时期限的token:
	```
	jwt.sign({
	  exp: Math.floor(Date.now() / 1000) + (60 * 60),
	  data: 'foobar'
	}, 'secret');
	```

	使用此库生成令牌的另一种方法是:
	```
	jwt.sign({
	  data: 'foobar'
	}, 'secret', { expiresIn: 60 * 60 });

	//or even better:

	jwt.sign({
	  data: 'foobar'
	}, 'secret', { expiresIn: '1h' });
	```

	* jwt.verify（token，secretOrPublicKey，[options，callback]）
	验证token的合法性


### 利用Nodejs搭建简单的Token验证

	* 安装jsonwebtoken
	```
	npm i jsonwebtoken
	```
	* Nodejs结合验证
	```
		const express = require('express');
		const jwt = require('jsonwebtoken');
		let app = express();
		app.listen(5000,()=>{console.log('Server start port 5000')});
		app.get('/api' , (req,res) => {
		    res.json({
		        'status': 200,
		        'msg' : '访问成功'
		    });
		});
		app.post('/api/login', (req, res) => {
		    /*
		        iss:签发人
		        iat:签发时间回溯30s
		        exp:过期时间 这里可是使用秒数,也可以使用day
		        "{"jti":1,"iss":"gumt.top","user":"goolge","iat":1555650413,"exp":1555657613}"
		        "iat": ~~(Date.now() / 1000)-30,
		        "exp": ~~(Date.now() / 1000)+(60*60),
		    */
		  const user = {
		    "jti": 1,
		        "iss": "gumt.top",
		        "user": "goolge",
		  }
		    jwt.sign(user,"secretkey",{ expiresIn: '1day' },(err,token) => {
		        res.json({
		            token
		        })
		    })
		});
		app.post('/api/posts',verifyToken,(req,res) => {
		  jwt.verify(req.token, 'secretkey', (err, authData) => {
		    if(err) {
		       res.sendStatus(403);
		      } else {
		        res.json({
		          message: 'Post created...',
		          authData
		        });
		     }
		  });
		});
		function verifyToken(req, res, next) {
		  const bearerHeader = req.headers['authorization'];
		  if(typeof bearerHeader !== 'undefined') {
		    const bearer = bearerHeader.split(' ');
		    const bearerToken = bearer[1];
		    req.token = bearerToken;
		    next();
		  } else {
		    res.sendStatus(403);
		  }
		}
	``` 


