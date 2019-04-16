---
abbrlink: 5
title: javaScript基础知识
categories:
  - '前端'
tags:
  - '前端'
  - 'javaScript'
  - 'ES6'
  - 'js面向对象'
  - '闭包'
date: 2019-04-15 22:26:20
img: 'http://i1.bvimg.com/683865/4760d60593e9f5c3s.jpg'
---
## js基础知识点
> js面向对象
 
### 面向对象编程（OOP）的特点:
* 抽象： 抓住核心问题
* 封装： 只能通过对象来访问方法
* 继承： 从已有的对象下继承新的对象
* 多态： 多对象的不同的形态

  面向对象是一种编程思想，把业务中看作对象，对象拥有属性和方法，对一下业务进行封装，方便维护。javaScript面向对象是通过prototype的方式来实现编程的。

> js面向对象创建的几种方式或者实现?

  1. 工厂模式创建对象： 面向对象中的封装函数(内置对象)  
 	就是一个函数，然后放入参数，返回对象，流水线工作
```
		function createPerson(name, age, job) {
	    var o = new Object();
	    o.name = name;
	    o.age = age;
	    o.job = job;
	    o.getName = function () {
	        return this.name;
	    }
	    return o;
		}
		var person = createPerson('Jack', 19, 'SoftWare Engineer');
```
	创建对象对象交给工厂方法来实现，可以传递参数，但缺点是无法识别对象类型，因为创建对象是使用Object的原生构造函数来完成的。

  2. 构造函数模式
```
	  	function Person(name, age, job) {
			this.name = name;
			this.age = age;
			this.job = job;
			this.getName = function() {
				return this.name;
			}
		}
		var person1 = new Person("Jack", 19, 'SoftWare Engineer');
		var person2 = new Person("Liye", 23, 'Mechanical Engineer');
```
     自定义的构造函数，（与普通函数一样，只是用它来创建对象），对象类型的属性和方法。它区别与工厂模式：
	- 没有显示地创建对象
	- 直接将属性和方法赋值给this对象
	- 没有return语句

	上述中person1,person2都是person的实例，因此可以用instanceof判断
```
		alert(person1 instanceof Person);//true;
		alert(person2 instanceof Person);//true;
		alert(person1 instanceof Object);//true;
		alert(person1.constructor === person2.constructor);//ture;
```
	虽然构造函数方式比较不错，但是也存在缺点，那就是在创建对象时，特别针对对象属性指向的函数时，会重复创建函数实例，以上述代码为基础，可以改成：
```
		function Person(name,age,job){
		    this.name = name;
		    this.age = age;
		    this.job = job;
		    this.getName = new Function () {//改写后效果与原代码相同，不过是为了方便理解
		        return this.name;
		    }
		}
```
	上述代码，创建多个实例时，会重复调用new Function();创建多个函数实例，这些函数实例还不是一个作用域中，当然这一般不会有错，但这会造成内存浪费。当然，可以在函数中定义一个getName = getName的引用，而getName函数在Person外定义，这样可以解决重复创建函数实例问题，但在效果上并没有起到封装的效果，如下所示：

```
		function Person(name,age,job){
		    this.name = name;
		    this.age = age;
		    this.job = job;
		    this.getName = getName;
		}
		function getName() {//到处是代码，看着乱！！
		        return this.name;
		}
```

3. 原型模式
  
	js每一个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，它是通过new操作符使用函数创建的实例的原型对象，原型对象最大的特点是，所有对象实例共享它所包含的属性和方法，也就是说，所有在原型对象中创建的属性和方法都直接被所有对象实例共享。

```
		function Person(){
		}
		Person.prototype.name = 'Jack';//使用原型来添加属性
		Person.prototype.age = 29;
		Person.prototype.getName = function(){
		    return this.name;
		}
		var person1 = new Person();
		alert(person1.getName());//Jack
		var person2 = new Person();
		alert(person1.getName === person2.getName);//true;共享一个原型对象的方法
```
原型与in操作符

一句话：无论原型中属性，还是对象实例的属性，都可以使用in操作符访问到；要想判断是否是实例本身的属性可以使用object.hasOwnProperty(‘attr’)来判断；
原型模式的缺点，它省略了为构造函数传递初始化参数，这在一定程序带来不便；另外，最主要是当对象的属性是引用类型时，它的值是不变的，总是引用同一个外部对象，所有实例对该对象的操作都会其它实例：
```
		function Person() {
		}
		Person.prototype.name = 'Jack';
		Person.prototype.lessons = ['Math','Physics'];
		var person1 = new Person();
		person1.lessons.push('Biology');
		var person2 = new Person();
		alert(person2.lessons);//Math,Physics,Biology，person1修改影响了person2
```
  4. 组合构造函数及原型模式
  
     目前最为常用的定义类型方式，是组合构造函数模式与原型模式。构造函数模式用于定义实例的属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方方法的引用，最大限度的节约内存。此外，组合模式还支持向构造函数传递参数，可谓是集两家之所长。
```
		function Person(name, age, job) {
	    this.name = name;
	    this.age = age;
	    this.job = job;
	    this.lessons = ['Math', 'Physics'];
		}
		Person.prototype = {
		    constructor: Person,//原型字面量方式会将对象的constructor变为Object，此外强制指回Person
		    getName: function () {
		        return this.name;
		    }
		}
		var person1 = new Person('Jack', 19, 'SoftWare Engneer');
		person1.lessons.push('Biology');
		var person2 = new Person('Lily', 39, 'Mechanical Engneer');
		alert(person1.lessons);//Math,Physics,Biology
		alert(person2.lessons);//Math,Physics
		alert(person1.getName === person2.getName);//true,//共享原型中定义方法
```
   	在所接触的JS库中，jQuery类型的封装就是使用组合模式来实例的
  5. 动态原型模式
  	
	组合模式中实例属性与共享方法（由原型定义）是分离的，这与纯面向对象语言不太一致；动态原型模式将所有构造信息都封装在构造函数中，又保持了组合的优点。其原理就是通过判断构造函数的原型中是否已经定义了共享的方法或属性，如果没有则定义，否则不再执行定义过程。该方式只原型上方法或属性只定义一次，且将所有构造过程都封装在构造函数中，对原型所做的修改能立即体现所有实例中：
```
		function Person(name, age, job) {
	    this.name = name;
	    this.age = age;
	    this.job = job;
	    this.lessons = ['Math', 'Physics'];
		}
		if (typeof this.getName != 'function') {//通过判断实例封装
		　　Person.prototype = {
		　　　　constructor: Person,//原型字面量方式会将对象的constructor变为Object，此外强制指回Person
		　　　　getName: function () {
		　　　　　　return this.name;
		　　　　}
		　　}
		}
		var person1 = new Person('Jack', 19, 'SoftWare Engneer');
		person1.lessons.push('Biology');
		var person2 = new Person('Lily', 39, 'Mechanical Engneer');
		alert(person1.lessons);//Math,Physics,Biology
		alert(person2.lessons);//Math,Physics
		alert(person1.getName === person2.getName);//true,//共享原型中定义方法
```
> 常用

```
		Object.prototype.toString.call();用来判断对象的类型。
		toLowerCase(); 转小写
		toUpperCase(); 转大写
		str.charAt(index)；   //根据index索引获取字符串
	
		Math.random(); //获取随机数（包含0到1不包含1）
		//生成整数,如生成20以下整数（0-19）	利用floor向下取整
		Math.floor(Math.random()*20);
		//获取某个值之间的随机数
		Math.floor(Math.random() * (max - min + 1)) + min；
		Math.max(x,y);  //返回最大值
		Math.min(x,y);  //返回最小值
		Math.round(x);  //四舍五入
		Math.floor();  //向下舍入
		Math.abs();    //返回绝对值

		transform
		rotate(deg)
		skew(x,y)
		scale(x,y)
		translate(x,y)
```
> js继承

  继承方式：

　　1、拷贝继承：通用型  有new无new都可以用

　　2、类式继承：new构造函数---利用构造函数（类）继承的方式

　　3、原型继承：无new的对象---借助原型来实现对象继承对象

　　属性继承：调用父类的构造函数call

　　方法继承：用for in的形式 拷贝继承（jq也用拷贝继承）
```
	    var a = {
            name: '小米'
        };
        //拷贝继承
        function extend(obj1, obj2) {
            for (var attr in obj2) {
                obj1[attr] = obj2[attr];
            }
        }
        //原型继承
            var b=cloneObj(a);
            b.name='小乔';
            alert(a.name);
            alert(b.name);
            function cloneObj(obj) {
                var F=function () {};
                F.prototype=obj;
                return new F();
            }
        //类式继承
        function A() {//父类
            this.name='小米';
        }
        A.prototype.showName=function () {
            alert(this.name);
        }
        function B() {//子类
            A.call(this);//属性和方法分开继承
        }
	　　　　//B.prototype=new A();//一句话实现继承，但会有很多问题，比如指向问题，属性会互相影响
	　　　　//类式继承改进：至少由以下四句实现方法的继承，属性需要分开继承

        var F=function () {};
        F.prototype=A.prototype;
        B.prototype=new F();
        B.prototype.constructor=A;//修正指向问题
        var b1=new B();
        b1.name='笑笑';
        b1.showName();
```
> js闭包

闭包就是一个函数引用另外一个函数的变量，因为变量被引用着所以不会被回收，因此可以用来封装一个私有变量。这是优点也是缺点，不必要的闭包只会徒增内存消耗！
执行环境、作用域链、垃圾回收机制、函数嵌套
> 事件委托的优点和缺点

优点：

 1. 减少事件注册，节省内存。比如：table代理所有的td的click.在ul上代理所有li的click事件。
 2. 简化了dom节点更新时，相应事件的更新。

缺点：

 1. 事件委托基于冒泡，对应不冒泡的不支持。
 2. 层级过多，冒泡过程中，可能被某层阻止掉。
 3. 把所有的事件都用代理可能会出现事件误判。 


> ES6语法
  
 一. 块级作用域绑定

 (1). let声明
 
 使用let声明变量的语法和使用var声明的语法是一样的。但是let声明的变量的作用域会限制在当前的代码块中。这是let与var的最大区别。用 let 声明的变量具有**块级作用域**，只能在声明的块中访问，在块外面无法访问

 (2). const声明

ES6 使用const来声明的变量称之为常量。这意味着它们不能再次被赋值,所有的 const 声明的变量都必须在声明处初始化

 二. 函数新增特性
 
 (1). 带默认参数的函数 
 ```
		 function makeRequest(url, timeout, callback) {
		    timeout = timeout || 2000;
		    callback = callback || function() {};
		}
```
 一般在函数内部需要做一些默认值的处理，有个bug，timeout是0的时候也会当做假值来处理，从而给赋值默认值2000.

ES6从语言层面面上增加了 默认值的 支持
这个函数如果只传入第一个参数，后面两个不传入，则会使用默认值。如果后面两个也传入了参数，则不会使用默认值。
```
		function makeRequest(url, timeout = 2000, callback = function() {}) {
		    // 其余代码		
		}
```
 (2). 默认参数对 arguments 对象的影响 

ES6参数默认值的时候，不管是否是在严格模式下，都和ES5的严格模式相同。
```
		<script type="text/javascript">
	
	    function foo(a, b = 30) {
	        console.log(arguments[0] === a); //true
	        console.log(arguments[1] === b); //true
	        a = 10;
	        b = 20;
	        console.log(arguments[0]  === a); //false。  由于b使用了默认值。虽然a没有使用默认值，但是仍然表现的和严格模式一样。
	        console.log(arguments[1] === b); //false。  b使用了默认值，所以表现的和严格模式一样。
	    }
	    foo(1, 2);
		</script>
```
 (3).默认参数表达式

参数的默认值，也可以是一个表达式或者函数调用等
```
		<script type="text/javascript">
			function getValue() {
		        return 5;
			}
		
		    function add(first, second = getValue()) { //表示使用getValue这个函数的返回值作为second的默认值。
		        return first + second;
		    }
		
		    console.log(add(1, 1));     // 2.  调用add函数的时候，传入了第二个参数，则以传入的参数为准。
		    console.log(add(1));        // 6。 调用add函数的时候，没有传入第二个参数，则会调用getValue函数。
		</script>
```
getValue()只会在调用add且不传入第二个参数的时候才会去调用。不是在解析阶段调用的。

  （4）. 未命名参数问题

Javascript并不限制传入的参数的数量, 在ES5之前，我们一般可以通过arguments对象来获取到未命名参数的值。但是罗显繁琐
```
		<script type="text/javascript">
		    function foo(a) {
		        console.log(a);
		        console.log(arguments[1])  //取得传入的多余的参数。
		    }
		    foo(2, 3);
		</script>
```


ES6，提供了一种更加优雅处理未命名参数的问题：剩余参数(Rest Parameters)

语法：function a(a, … b){ }

剩余参数使用三个点( … )和变量名来表示。

  (5).  函数中的扩展运算符

Math中的max函数可以返回任意多个参数中的最大值。但是如果这些参数在一个数组中，则没有办法直接传入。以前通用的做法是使用applay方法.
```
	<script type="text/javascript">
	    let values = [25, 50, 75, 100]  
	    console.log(Math.max.apply(Math, values));  // 100
	</script>
```
这种方法虽然可行，但是总是不是那么直观.ES6提供的扩展运算符可以很容易的解决这个问题。在数组前加前缀 … (三个点)
```
	<script type="text/javascript">
	    let values = [25, 50, 75, 100]
	    console.log(Math.max(...values));  //使用扩展运算符。相当于拆解了数组了。
	    console.log(Math.max(...values, 200));  //也可以使用扩展运算符和参数的混用，则这个时候就有 5 个数参与比较了。
	</script>
```
 三. 全新的函数：箭头函数（=>）

  箭头函数可以赋值给变量，也可以像匿名函数一样直接作为参数传递
```
		<script type="text/javascript">
	    var sum = (num1, num2) =>{
	        return num1 + num2;
	    }
	    console.log(sum(3, 4));
	    //前面的箭头函数等同于下面的传统函数
	    var add = function (num1, num2) {
	        return num1 + num2;
	    }
	    console.log(add(2, 4))
		</script>
```
如果函数体内只有一行代码，则包裹函数体的 大括号 ({ })完全可以省略。如果有return，return关键字也可以省略。

如果函数体内有多条语句，则 {} 不能省略。
```
	<script type="text/javascript">
	    var sum = (num1, num2) => num1 + num2;
	    console.log(sum(5, 4));
	    //前面的箭头函数等同于下面的传统函数
	    var add = function (num1, num2) {
	        return num1 + num2;
	    }
	    console.log(add(2, 4));
	
	    //如果这一行代码是没有返回值的，则方法的返回自也是undefined
	    var foo = (num1, num2) => console.log("aaa");
	    console.log(foo(3,4));  //这个地方的返回值就是undefined
	 </script>
```
如果箭头函数只有一个参数，则包裹参数的小括号可以省略。其余情况下都不可以省略。当然如果不传入参数也不可以省略
```
	<script type="text/javascript">
	    var foo = a=> a+3; //因为只有一个参数，所以()可以省略
	    console.log(foo(4)); // 7
	</script>
```
如果想直接返回一个js对象，而且还不想添加传统的大括号和return，则必须给整个对象添加一个小括号 ()
```
	<script type="text/javascript">
	    var foo = ()=>({name:"lisi", age:30});
	    console.log(foo());
	    //等同于下面的；
	    var foo1 = ()=>{
	        return {
	            name:"lisi",
	            age : 30
	        };
	    }
	</script>
```
 使用箭头函数实现函数自执行
```
	<script type="text/javascript">
	    var person = (name => {
	            return {
	                name: name,
	                age: 30
	            }
	        }
	    )("zs");
	    console.log(person);
	</script>
```
箭头函数中无this绑定

四. 对象功能的扩展
	
(1) 简写的属性初始化,ES6中简化成如下的形式:
```
	<script type="text/javascript">
	    function createPerson(name, age) {
	        //返回一个对象：属性名和参数名相同。
	        return {
	            name,  //当对象属性名和本地变量名相同时，可以省略冒号和值
	            age
	        }
	    }
	    console.log(createPerson("lisi", 30)); // {name:"lisi", age:30}
	</script>
```
(2) 简写的方法声明
```
	<script type="text/javascript">
	    var person = {
	        name:'李四',
	        sayHell() {
	            console.log("我的名字是：" + this.name);
	        }
	    }
	    person.sayHell()
	</script>
```
省略了冒号和function看起来更简洁

(3) 在字面量中动态计算属性名

在ES5之前，如果属性名是个变量或者需要动态计算，则只能通过 对象.[变量名] 的方式去访问。而且这种动态计算属性名的方式 在字面量中 是无法使用的.
```
	<script type="text/javascript">
	    var p = {
	        name : '李四',
	        age : 20
	    }
	    var attName = 'name';
	    console.log(p[attName]) //这里 attName表示的是一个变量名。
	</script>
```
在ES6中，把属性名用[ ]括起来，则括号中就可以引用提前定义的变量。
```
	<script type="text/javascript">
	    var attName = 'name';
	    var p = {
	        [attName] : '李四',  // 引用了变量attName。相当于添加了一个属性名为name的属性
	        age : 20
	    }
	    console.log(p[attName])  // 李四
	</script>
```
 (4)新增的方法

  **Object.is()**;

使用比较操作符（==）或严格比较操作符（===）.许多开发者为了避免在比较的过程中发生强制类型转换，更倾向于后者。但即使是严格等于操作符，它也不是万能的。例如，它认为 +0 和 -0 是相等的，虽然它们在 JavaScript 引擎中表示的方式不同。同样 NaN === NaN 会返回 false，所以必须使用 isNaN() 函数才能判断 NaN 。

ECMAScript 6 引入了 Object.is() 方法来补偿严格等于操作符怪异行为的过失。该函数接受两个参数并在它们相等的返回 true 。只有两者在类型和值都相同的情况下才会判为相等。如下所示：
```
	console.log(+0 == -0);              // true
	console.log(+0 === -0);             // true
	console.log(Object.is(+0, -0));     // false
	
	console.log(NaN == NaN);            // false
	console.log(NaN === NaN);           // false
	console.log(Object.is(NaN, NaN));   // true
	
	console.log(5 == 5);                // true
	console.log(5 == "5");              // true
	console.log(5 === 5);               // true
	console.log(5 === "5");             // false
	console.log(Object.is(5, 5));       // true
	console.log(Object.is(5, "5"));     // false
```
Object.is() 的表现和 === 是相同的。它们之间的区别是前者 认为 +0 和 -0 不相等而 NaN 和 NaN 则是相同的。不过弃用后者是完全没有必要的。何时选择 Object.is() 与 == 或 === 取决于代码的实际情况

  **Object.assign()**

assing可以把一个对象的属性和访问完整的转copy到另外一个对象中。
```
	<script type="text/javascript">
	    var p = {
	        name : "lisi",
	        age : 20,
	        friends : ['张三', '李四']
	    }
	    var p1 = {};
	    Object.assign(p1, p); //则p1中就有了与p相同的属性和方法.  p1是接受者，p是提供者
	    console.log(p1);
	    //这种copy是浅copy，也就是说如果属性值是对象的话，只是copy的对象的地址值(引用）
	    console.log(p1.friends == p.friends);  //true   p1和p的friends同事指向了同一个数组。
	    p.friends.push("王五");
	    console.log(p1.friends); //['张三', '李四', '王五']
	</script>
```
assign方法可以接受任意多的提供者。意味着后面提供者的同名属性和覆盖前面提供者的属性值
```
	<script type="text/javascript">
        var p = {
	        name : "lisi",
	        age : 20,
	        friends : ['张三', '李四']
	    }
	    var p1 = {
	        name : 'zs',
	    }
	    var p2 = {};
	    Object.assign(p2, p, p1); //p和p1都是提供者
	    console.log(p2.name); // zs
	</script>
```
 五. 字符串功能的增强

  (1) 查找子字符串

   在以前在字符串中查找字符串的时候，都是使用indexOf方法.ES6新增了三个方法来查找字符串。
```
	includes() 方法会在给定文本存在于字符串中的任意位置时返回 true，否则返回 false 。
	startsWith() 方法会在给定文本出现在字符串开头时返回 true，否则返回 false 。
	endsWith() 方法会在给定文本出现在字符串末尾时返回 true，否则返回 false 。
	
	var msg = "Hello world!";	
	console.log(msg.startsWith("Hello"));       // true
	console.log(msg.endsWith("!"));             // true
	console.log(msg.includes("o"));             // true
	
	console.log(msg.startsWith("o"));           // false
	console.log(msg.endsWith("world!"));        // true
	console.log(msg.includes("x"));             // false
	
	console.log(msg.startsWith("o", 4));        // true
	console.log(msg.endsWith("o", 8));          // true
	console.log(msg.includes("o", 8));          // false
```
 (2) repeat方法

   ECMAScript 6 还向字符串添加了 repeat() 方法，它接受一个数字参数作为字符串的重复次数。该方法返回一个重复包含初始字符串的新字符串，重复次数等于参数.
```
	console.log("x".repeat(3));         // "xxx"
	console.log("hello".repeat(2));     // "hellohello"
	console.log("abc".repeat(4));       // "abcabcabcabc"
```
 (3) 字符串模板字面量

  基本语法,使用一对反引号 “(tab正上方的按键)来表示模板字面量.
```
	let message = `Hello world!`;   //使用模板字面量创建了一个字符串

	console.log(message);               // "Hello world!"
	console.log(typeof message);        // "string"
	console.log(message.length);        // 12
```
注意：如果模板字符串中使用到了反引号，则应该转义。但是单双引号不需要转义

 (4) 多行字符串

ES6中字符串的模板字面量轻松的解决了多行字符串的问题，而且没有任何新的语法.
```
	<script type="text/javascript">
    	var s = `abc
	    aaaaa
	    dsalfja
	    dfadfja`;
	    console.log(s);
	</script>
```
但是要注意： 反引号中的所有空格和缩进都是有效字符。

  (5) 字符串置换

置换允许你将 JavaScript 表达式嵌入到模板字面量中并将其结果作为输出字符串中的一部分。

语法：${变量名、表达式、任意运算、方法调用等}

可以嵌入任何有效的JavaScript代码.
```
	<script type="text/javascript">
	    var name = "李四";
	    var msg = `欢迎你${name}同学`;
	    console.log(msg)
	</script>
```
 (6) 模板标签

 什么是模板标签,模板字面量真正的强大之处来源于模板标签。一个模板标签可以被转换为模板字面量并作为最终值返回。标签在模板的头部，即左 ` 字符之前指定，如下所示：
```
	let message = myTag`Hello world`;
```
在上面的代码中，myTag就是模板标签。

myTag其实是一个函数，这个函数会被调用来处理这个模板字符串。

 (7) 定义模板标签

一个标签仅代表一个函数，他接受需要处理的模板字面量。标签分别接收模板字面量中的片段，且必须将它们组合以得出结果。函数的首个参数为包含普通 JavaScript 字符串的数组。余下的参数为每次置换的对应值。

标签函数一般使用剩余参数来定义，以便轻松地处理数据。如下：
```
	<script type="text/javascript">
	    let name = '张三',
	        age = 20,
	        message = show`我来给大家介绍${name}的年龄是${age}.`;
	
	    /*
	        应该定义一个函数show：
	        参数1：一个字符串数组。在本例中包含三个元素。
	             0:"我来给大家介绍"
	             1:"的年龄是"
	             2:"."
	        参数2和参数3：表示需要置换的字符串的值。  
	     */
	    function show(stringArr, value1, value2) {
	        console.log(stringArr); //
	        console.log(value1);  // 张三
	        console.log(value2);  // 20
	        return "abc";
	    }
	    console.log(message); //abc
	</script>
```
为了简化书写，一般把Value1和Value2写成剩余字符串的形式
```
	function show(stringArr, ...values){

	}
```
五. 解构
	
  (1) 解构的实用性

 ECMAScript 5 或更早的版本中，从对象或数组中获取特定的数据并赋值给本地变量需要书写很多并且相似的代码。例如：
```
		let options = {
	        repeat: true,
	        save: false
	   };
	
		// 从对象中提取数据
	
		let repeat = options.repeat,
	    save = options.save;
```
 对象解构的基本形式
```
	let node = {
        type: "Identifier",
        name: "foo"
    };
	//这里就相当于声明了两个变量： type = node.type;  name:node.name
	let { type, name } = node;
	
	console.log(type);      // "Identifier"
	console.log(name);      // "foo"
```
在上面的结构中必须要初始化。否则会出现语法错误
```
	// 语法错误！
	var { type, name };
	
	// 语法错误！
	let { type, name };
	
	// 语法错误！
	const { type, name };
```
 (2) 解构赋值表达式

  声明的变量想改变他们的值，也可以使用解构表达式.
```
	<script type="text/javascript">
    let node = {
      type: "Identifier",
      name: "foo"
    },
    type = "Literal",
    name = 5;
	
	  //注意：此处必须要在圆括号内才能使用解构表达式
	  ({type, name} = node);
	
	  console.log(type);      // "Identifier"
	  console.log(name);      // "foo""
	</script>
```
 (3) 对象解构时的默认值

  如果赋值号右边的对象中没有与左边变量同名的属性，则左边的变量会是 undefined
```
	let node = {
        type: "Identifier",
        name: "foo"
    };
	//因为node中没有叫value的属性，所以valued的值将会是undefined
	let { type, name, value } = node;
	
	console.log(type);      // "Identifier"
	console.log(name);      // "foo"
	console.log(value);     // undefined
```
手动指定他的默认值
```
	<script type="text/javascript">
	    let node = {
	        type: "Identifier",
	        name: "foo"
	    };
	    //手动添加value的默认值为3
	    let { type, name, value = 3} = node;
	
	    console.log(type);      // "Identifier"
	    console.log(name);      // "foo"
	    console.log(value);     // 3
	</script>
```
赋值给不同的变量名
```
	<script type="text/javascript">
	    let node = {
	        type: "Identifier",
	        name: "foo"
	    };
	    // localType才是要定义的新的变量。  type是node的属性
	    let {type: localType, name: localName} = node;
	
	    console.log(localType);     // "Identifier"
	    console.log(localName);     // "foo"
	</script>
```
注意：冒号后面才是要定义的新的变量，这个可以我们的对象字面量不太一样！
这个地方也可以使用默认值
```
	let node = {
	        type: "Identifier"
	    };
	
	let { type: localType, name: localName = "bar" } = node;
	
	console.log(localType);     // "Identifier"
	console.log(localName);     // "bar"
```
 （4） 数组解构

  数组解构基本语法

  数据解构的语法和对象解构看起来类似，只是将对象字面量替换成了数组字面量，而且解构操作的是数组内部的位置（索引）而不是对象中的命名属性，例如：
```
	let colors = [ "red", "green", "blue" ];
	let [ firstColor, secondColor ] = colors;
	
	console.log(firstColor);        // "red"
	console.log(secondColor);       // "green"
```
 如果只想取数组中的某一项，则可以不用命名。
```
	 let colors = [ "red", "green", "blue" ];
	//只取数组中的第三项。
	let [ , , thirdColor ] = colors;
	
	console.log(thirdColor);        // "blue"
```
 解构表达式

  你可以想要赋值的情况下使用数组的解构赋值表达式，但是和对象解构不同，没必要将它们包含在圆括号中，例如：
```
	let colors = [ "red", "green", "blue" ],
    firstColor = "black",
    secondColor = "purple";
	
	[ firstColor, secondColor ] = colors;  //可以不用加括号。当然添加也不犯法
	
	console.log(firstColor);        // "red"
	console.log(secondColor);       // "green"
```
数组解构表达式有一个很常用的地方，就是交换两个变量的值。在以前一般定义一个第三方变量进行交换，例如下面的代码：
```
	<script type="text/javascript">
	    let a = 3,
	        b = 4,
	        temp;
	    temp = a;
	    a = b;
	    b = temp;
	    console.log(a);
	    console.log(b)
	</script>
```
ES6中完全可以抛弃第三方变量这种方式，使用我们的数组解构表达式
```
	<script type="text/javascript">
	    let a = 3,
	        b = 4;
	    //左侧和前面的案例是一样的，右侧是一个新创建的数组字面量。
	    [a, b] = [b, a];
	    console.log(a);
	    console.log(b)
	</script>
```
六. Set数据结构

  Set类型是一个包含无重复元素的有序列表

 	Set本身是一个构造函数。
```
	<script type="text/javascript">
	    //创建Set数据结构对象。
	    var s = new Set();
	    //调用set对象的add方法，向set中添加元素
	    s.add("a");
	    s.add("c");
	    s.add("b");
	    //set的size属性可以获取set中元素的个数
	    console.log(s.size)
	</script>
```
Set中不能添加重复元素

使用数组初始化Set
```
	<script type="text/javascript">
	    //使用数组中的元素来初始化Set，当然碰到重复的也不会添加进去。
	    var s = new Set([2, 3, 2, 2, 4]);
	    console.log(s.size)
	</script>
```
判断一个值是否在Set中

  使用Set的 has() 方法可以判断一个值是否在这个set中。
```
	<script type="text/javascript">
        let set = new Set();
        set.add(5);
        set.add("5");
        console.log(set.has(5));    // true
        console.log(set.has(6));    // false
	</script>
```
移除Set中的元素
```
	delete(要删除的值) ：删除单个值

	clear()：清空所有的值

	<script type="text/javascript">
	    let set = new Set();
	    set.add(5);
	    set.add("5");
	
	    console.log(set.has(5));    // true
	
	    set.delete(5);
	
	    console.log(set.has(5));    // false
	    console.log(set.size);      // 1
	
	    set.clear();
	
	    console.log(set.has("5"));  // false
	    console.log(set.size);      // 0
	</script>
```
遍历Set

  Set也有forEach可以遍历Set,for…of也可以遍历set

**将Set转换为数组**


  将数组转换为Set相当容易，你只需要在创建Set集合时把数组作为参数传递进去即可。

把Set转换为数组使用前面讲到的扩展运算符也很容易
```
	<script type="text/javascript">
    let set = new Set([1, 2, 3, 3, 3, 4, 5]),
        arr = [...set];  //使用扩展运算符。那么新的数组中已经没有了重复元素。注意，此对set并没有什么影响

    console.log(arr);             // [1,2,3,4,5]
	</script>
```
这种情况在需要去数组中重复元素的时候非常好用。
```
	<script type="text/javascript">
	    function eliminateDuplicates(items) {
	        return [...new Set(items)];
	    }
	    let numbers = [1, 2, 3, 3, 3, 4, 5, 5, 2, 1, 1],
	        //返回的是新的没有重复元素的数组。
	        noDuplicates = eliminateDuplicates(numbers);
	    console.log(noDuplicates);      // [1,2,3,4,5]
	</script>
```
Set提供了处理一系列值的方式，不过如果想给这些值添加一些附加数据则显得力不从心，所以又提供了一种新的数据结构：Map

七. Map数据结构

Map创建也是使用Map构造函数
向Map存储键值对使用set(key, value);方法
可以使用get(key),来获取指定key对应的value
```
	<script type="text/javascript">
	    var map = new Map();
	    map.set("a", "lisi");
	    map.set("b", "zhangsan");
	    map.set("b", "zhangsan222");  // 第二次添加，新的value会替换掉旧的
	    console.log(map.get("a"));
	    console.log(map.get("b"));   //zhangsan222
	    console.log(map.get("c")); //undefined.如果key不存在，则返回undefined
	    console.log(map.size); //2
	</script>

	has(key) - 判断给定的 key 是否在 map 中存在
	delete(key) - 移除 map 中的 key 及对应的值
	clear() - 移除 map 中所有的键值对
```
初始化Map

创建Map的时候也可以像Set一样传入数组。但是传入的数组中必须有两个元素，这个两个元素分别是一个数组。

也就是传入的实际是一个二维数组！
```
	<script type="text/javascript">
	  //map接受一个二维数组
	    var map = new Map([
	      //每一个数组中，第一个是是map的可以，第二个是map的value。如果只有第一个，则值是undefined
	        ["name", "lisi"],  
	        ["age", 20],
	        ["sex", "nan"]
	    ]);
	    console.log(map.size);
	    console.log(map.get("name"))
	</script>  
```
 Map的forEach方法
```
	<script type="text/javascript">
	    var map = new Map([
	        ["name", "李四"],
	        ["age", 20],
	        ["sex", "nan"]
	    ]);
	    /*
	        回调函数有函数：
	        参数1：键值对的value
	        参数2：键值对的key
	        参数3：map对象本身
	     */
	    map.forEach(function (value, key, ownMap) {
	        console.log(`key=${key} ,vlue=${value}`);
	        console.log(this);
	    })
	 </script>

	var colors = ["red", "green", "blue"];
	
	for (var i = 0, len = colors.length; i < len; i++) {
	    console.log(colors[i]);
	}
```
八. 类

  ES5之前的模拟的类，JavaScript 没有类。和类这个概念及行为最接近的是创建一个构造函数并在构造函数的原型上添加方法，这种实现也被称为自定义的类型创建，例如：
```
	function PersonType(name) {
    this.name = name;
	}
	
	PersonType.prototype.sayName = function() {
	    console.log(this.name);
	};
	
	let person = new PersonType("Nicholas");
	person.sayName();   // 输出 "Nicholas"
	
	console.log(person instanceof PersonType);  // true
	console.log(person instanceof Object);      // true
```
 (1) ES6中基本的类声明
```	
	//class关键字必须是小写。   后面就是跟的类名
	class PersonClass {
	    // 等效于 PersonType 构造函数。
		 constructor(name) {  //这个表示类的构造函数。constuctor也是关键字必须小写。
	        this.name = name;  //创建属性。  也叫当前类型的自有属性。
	    } 
	    // 等效于 PersonType.prototype.sayName.   这里的sayName使用了我们前面的简写的方式。
	    sayName() {
	        console.log(this.name);
	    }
	}
	let person = new PersonClass("Nicholas");
	person.sayName();   // 输出 "Nicholas"
	
	console.log(person instanceof PersonClass);     // true
	console.log(person instanceof Object);          // true
	
	console.log(typeof PersonClass);                    // "function"
	console.log(typeof PersonClass.prototype.sayName);  // "function"
```
 匿名类表达式
```
	let PersonClass = class {
	
	    // 等效于 PersonType 构造函数
	    constructor(name) {
	        this.name = name;
	    }
	
	    // 等效于 PersonType.prototype.sayName
	    sayName() {
	        console.log(this.name);
	    }
	};
	
	let person = new PersonClass("Nicholas");
	person.sayName();   // 输出 "Nicholas"
	
	console.log(person instanceof PersonClass);     // true
	console.log(person instanceof Object);          // true
	
	console.log(typeof PersonClass);                    // "function"
	console.log(typeof PersonClass.prototype.sayName);  // "function"
```
静态成员

   在ES5中，我们可以直接给构造函数添加属性或方法来模拟静态成员。
```
	function PersonType(name) {
    	this.name = name;
	}
	// 静态方法。  直接添加到构造方法上。  (其实是把构造函数当做一个普通的对象来用。)
	PersonType.create = function(name) {
	    return new PersonType(name);
	};
	// 实例方法
	PersonType.prototype.sayName = function() {
	    console.log(this.name);
	};
	var person = PersonType.create("Nicholas");
```
ECMAScript 6 的类通过在方法之前使用正式的 static 关键字简化了静态方法的创建。例如，下例中的类和上例相比是等效的：
```
	class PersonClass {
	
	    // 等效于 PersonType 构造函数
	    constructor(name) {
	        this.name = name;
	    }
	
	    // 等效于 PersonType.prototype.sayName
	    sayName() {
	        console.log(this.name);
	    }
	
	    // 等效于 PersonType.create。
	    static create(name) {
	        return new PersonClass(name);
	    }
	}
	
	let person = PersonClass.create("Nicholas");
```
注意：静态成员通过实例对象不能访问，只能通过类名访问！！！

(2)  ES6中的继承

ES6之前要完成继承，需要写很多的代码。看下面的继承的例子：
```
	<script type="text/javascript">
	    function Father(name) {
	        this.name = name;
	    }
	    Father.prototype.sayName = function () {
	        console.log(this.name);
	    }
	
	    function Son(name,age) {
	        Father.call(this, name);
	        this.age = age;
	    }
	    Son.prototype = new Father();
	    Son.prototype.constructor = Son;
	    Son.prototype.sayAge = function () {
	        console.log(this.age);
	    }
	
	    var son1 = new Son("儿子", 20);
	    son1.sayAge();  //20
	    son1.sayName(); //儿子
	
	</script>
```
如果在ES6通过类的方式完成继承就简单了很多。需要用到一个新的关键字：extends
```
	<script type="text/javascript">
	    class Father{
	        constructor(name){
	            this.name = name;
	        }
	        sayName(){
	            console.log(this.name);
	        }
	    }
	    class Son extends Father{  //extents后面跟表示要继承的类型
	        constructor(name, age){
	            super(name);  //相当于以前的：Father.call(this, name);
	            this.age = age;
	        }
	        //子类独有的方法
	        sayAge(){
	            console.log(this.age);
	        }
	    }
	
	    var son1 = new Son("李四", 30);
	    son1.sayAge();
	    son1.sayName();
	    console.log(son1 instanceof Son);  // true
	    console.log(son1 instanceof Father);  //true
	
	</script>
```

这种继承方法，和我们前面提到的构造函数+原型的继承方式本质是一样的。但是写起来更简单，可读性也更好。

关于super的使用，有几点需要注意：

你只能在派生类中使用 super()，否则（没有使用 extends 的类或函数中使用）一个错误会被抛出。
你必须在构造函数的起始位置调用 super()，因为它会初始化 this。任何在 super() 之前访问 this 的行为都会造成错误。也即是说super()必须放在构造函数的首行。
在类构造函数中，唯一能避免调用 super() 的办法是返回一个对象。

在子类中屏蔽父类的方法

如果在子类中声明与父类中的同名的方法，则会覆盖父类的方法。(这种情况在其他语言中称之为 方法的覆写、重写 )
```
	<script type="text/javascript">
	    class Father{
	        constructor(name){
	            this.name = name;
	        }
	        sayName(){
	            console.log(this.name);
	        }
	    }
	    class Son extends Father{  //extents后面跟表示要继承的类型
	        constructor(name, age){
	            super(name);  //相当于以前的：Father.call(this, name);
	            this.age = age;
	        }
	        //子类独有的方法
	        sayAge(){
	            console.log(this.age);
	        }
	        //子类中的方法会屏蔽到父类中的同名方法。
	        sayName(){
	            super.syaName();  //调用被覆盖的父类中的方法。 
	            console.log("我是子类的方法，我屏蔽了父类：" + name);
	        }
	    }
	
	    var son1 = new Son("李四", 30);
	    son1.sayAge();
	    son1.sayName();
	</script>	
```
如果在子类中又确实需要调用父类中被覆盖的方法，可以通过super.方法()来完成。

注意：

如果是调用构造方法，则super不要加点，而且必须是在子类构造方法的第一行调用父类的构造方法
普通方法调用需要使用super.父类的方法() 来调用。

静态方法也可以继承
```
	<script type="text/javascript">
	   class Father{
	       static foo(){
	           console.log("我是父类的静态方法");
	       }
	   }
	   class Son extends Father{
	
	   }
	   Son.foo(); //子类也继承了父类的静态方法。  这种方式调用和直接通过父类名调用时一样的。
	
	</script>
```
> Array 数组

  JavaScript 数组对象是用于构造数组的全局对象; 它是高阶，类似列表的对象。
```
	创建数组
	let fruits = ["Apple", "Banana"];
	
	console.log(fruits.length);
	// 2
	

	通过索引访问
    let first = fruits[0];
	// Apple
	
	let last = fruits[fruits.length - 1];
	// Banana

	遍历一个数组
	fruits.forEach(function (item, index, array) {
	    console.log(item, index);
	});
	// Apple 0
	// Banana 1

	添加元素到数组的末尾
	var newLength = fruits.push("Orange");
	// ["Apple", "Banana", "Orange"]
	
	删除数组末尾的元素
	let last = fruits.pop(); 
	// remove Orange (from the end)
	
	// ["Apple", "Banana"];

	删除数组最前面（头部）的元素
	let first = fruits.shift(); 
	// remove Apple from the front
	
	// ["Banana"];

	添加到数组的前面（头部）
	let newLength = fruits.unshift("Strawberry");
	// add to the front
	
	// ["Strawberry", "Banana"];

	找到某个元素在数组中的索引

	fruits.push('Mango');
	// ["Strawberry", "Banana", "Mango"]
	
	let index = fruits.indexOf("Banana");
	// 1

	通过索引删除某个元素
	let removedItem = fruits.splice(pos, 1); 
	// this is how to remove an item
	
	// ["Strawberry", "Mango"]

	从一个索引位置删除多个元素
	let vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];
	console.log(vegetables); 
	
	// ["Cabbage", "Turnip", "Radish", "Carrot"]
	
	let pos = 1, n = 2;
	
	let removedItems = vegetables.splice(pos, n); 
	
	// this is how to remove items, 
	// n defines the number of items to be removed,
	// from that position(pos) onward to the end of array.
	
	console.log(vegetables); 
	// ["Cabbage", "Carrot"] (the original array is changed)
	
	console.log(removedItems); 
	// ["Turnip", "Radish"]

	复制一个数组
	var shallowCopy = fruits.slice(); 
	// this is how to make a copy
	
	// ["Strawberry", "Mango"]

	方法
	Array.from() 方法从一个类似数组或可迭代的对象中创建一个新的数组实例。
	Array.from(arrayLike[, mapFn[, thisArg]])
	类数组对象（拥有一个 length 属性和若干索引属性的任意对象）
	可遍历对象（你可以从它身上迭代出若干个元素的对象，比如有 Map 和 Set 等）
	
	Array from a String
	Array.from('foo'); 
	// ["f", "o", "o"]

	Array from a Set
	let s = new Set(['foo', window]); 
	Array.from(s); 
	// ["foo", window]

	Array from a Map
	let m = new Map([[1, 2], [2, 4], [4, 8]]);
	Array.from(m); 
	// [[1, 2], [2, 4], [4, 8]]

	Array from an Array-like object (arguments)
	function f() {
	  return Array.from(arguments);
	}
	
	f(1, 2, 3);
	
	// [1, 2, 3]	

	Array.isArray()
	假如一个变量是数组则返回true，否则返回false。
	Array.isArray([1, 2, 3]);  
	// true
	Array.isArray({foo: 123}); 
	// false
	Array.isArray("foobar");   
	// false
	Array.isArray(undefined);  
	// false

	假如不存在 Array.isArray()，则在其他代码之前运行下面的代码将创建该方法。
	if (!Array.isArray) {
	  Array.isArray = function(arg) {
	    return Object.prototype.toString.call(arg) === '[object Array]';
	  };
	}

	Array.of();
	创建一个有可变数量的参数的新的数组实例，无论参数有多少数量，而且可以是任意类型
	Array.of(7);       // [7] 
	Array.of(1, 2, 3); // [1, 2, 3]
	
	Array(7);          // [ , , , , , , ]
	Array(1, 2, 3);    // [1, 2, 3]
	
	如果原生不支持的话，在其他代码之前执行以下代码会创建 Array.of() 。
	if (!Array.of) {
	  Array.of = function() {
	    return Array.prototype.slice.call(arguments);
	  };
	}

    Mutator 方法
	下面的这些方法会改变调用它们的对象自身的值：

	Array.prototype.copyWithin() 
	在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。
	Array.prototype.fill() 
	将数组中指定区间的所有元素的值，都替换成某个固定的值。
	Array.prototype.pop()
	删除数组的最后一个元素，并返回这个元素。
	Array.prototype.push()
	在数组的末尾增加一个或多个元素，并返回数组的新长度。
	Array.prototype.reverse()
	颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。
	Array.prototype.shift()
	删除数组的第一个元素，并返回这个元素。
	Array.prototype.sort()
	对数组元素进行排序，并返回当前数组。
	Array.prototype.splice()
	在任意的位置给数组添加或删除任意个元素。
	Array.prototype.unshift()
	在数组的开头增加一个或多个元素，并返回数组的新长度。

	Accessor 方法
	下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。
	Array.prototype.concat()
	返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
	Array.prototype.includes() 
	判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。
	Array.prototype.join()
	连接所有数组元素组成一个字符串。
	Array.prototype.slice()
	抽取当前数组中的一段元素组合成一个新数组。
	Array.prototype.toSource() 
	返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。
	Array.prototype.toString()
	返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。
	Array.prototype.toLocaleString()
	返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。
	Array.prototype.indexOf()
	返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
	Array.prototype.lastIndexOf()
	返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

	Iteration 方法
	Array.prototype.forEach()
	为数组中的每个元素执行一次回调函数。
	Array.prototype.entries() 
	返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。
	Array.prototype.every()
	如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
	Array.prototype.some()
	如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。
	Array.prototype.filter()
	将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
	Array.prototype.find() 
	找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
	Array.prototype.findIndex() 
	找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。
	Array.prototype.keys() 
	返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。
	Array.prototype.map()
	返回一个由回调函数的返回值组成的新数组。
	Array.prototype.reduce()
	从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
	Array.prototype.reduceRight()
	从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
	Array.prototype.values() 
	返回一个数组迭代器对象，该迭代器会包含所有数组元素的值
```
> canvas 使用

canvas 是使用javascript网页上绘制图像
画布是一个矩形区域，可以控制其中每一个像素。canvas拥有多种绘制路径，矩形、圆形、字符及添加图像的方法
getContext("2d") 对象是内建html5对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
fillRect(0,0,150,75) 绘制矩形，从左上角开始（0,0）,画150*75的矩形

```
	//绘制线条
	cxt.moveTo(10,10);
	cxt.lineTo(150,50);
	cxt.linTo(10, 50);
	cxt.stroke();

	//绘制圆形
	cxt.beginPath();
	cxt.arc(70,18,15,0,Math.PI*2, true);
	cxt.closePath();
	cxt.fill();

	//绘制图片
	cxt.drawImage(img,0,0);

	一下是画三角示例
	<canvas id="triangle" height="100" width="100"></canvas>

	var canvas = document.getElementById('triangle');  //获取canvas元素
	var context = canvas.getContext('2d');  //创建context对象

	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(100,0);
	context.lineTo(50,100);
	context.closePath();
	context.fillStyle="rgb(78,193,243)";
	context.fill();
```
> css盒子模型

介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

   (1) 有两种， IE 盒子模型、W3C 盒子模型；

   (2) 盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；

   (3) 区  别： IE的content部分把 border 和 padding计算了进去;
```
	.triangle {
        width : 0;
        height: 0;
        border : 100px solid transparent;
		border-top : 100px solid blue; /*这里可以设置border的top、bottom、left、right四个方向的三角
	}
	<div class="triangle"></div>
```

在实际设计中，我们会发现，IE 盒模型更容易进行控制，我们一般先将整个容器的尺寸先确定，然后再填充具体的内容，通过 padding 来调整内容的具体位置，通过 margin 来调整容器与其他元素之间的间隙，无论如何调整，整个容器的结构是固定的，不会改变的；
而在标准盒模型中，我们在调整 padding 和 margin 的同时，往往会将容器本身的结构打乱，需要重新设置内容 content 的尺寸

所以我一般都会在样式重置中添加 CSS 3 属性：box-sizing: border-box; 可以让元素按照 IE 盒模型进行解析，即设置的宽高包括了 border 以及 padding 的值

标准模型的盒子大小(280X280) = 200 +10*2 + 30*2 — 相加效果

传统IE6盒子大小(200X200) = 120 + 10 * 2 + 30*2 — 减去效果

js有5种基本数据类型，null, undefind, number, boolean, string,和一种对象数据类型（Oject, Array, Date）.