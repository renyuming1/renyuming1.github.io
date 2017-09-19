---
layout: post
title:  Javascript object（对象）
date:   2017-09-16 16:12:26
categories: Javascript
tags: Javascript
author: yuming
---

* content
{:toc}



Objects

```javascript
var obj = new Object();
```







注 1:原理是这样的,不同的对象在底层都表示为二进制,在 JavaScript 中二进制前三位都为 0 的话会被判 断为 object 类型,null 的二进制表示是全 0,自然前三位也是 0,所以执行 typeof 时会返回“object”。


- 对象引用：
在对象中,属性名永远都是字符串。如果你使用 string(字面量)以外的其他值作为属性 名,那它首先会被转换为一个字符串。
```javascript
var myObject = { };
myObject[true] = "foo"; 
myObject[3] = "bar"; 
myObject[myObject] = "baz";

myObject["true"]; // "foo"
myObject["3"]; // "bar"
myObject["[object Object]"]; // "baz"

```

  可计算属性名
  ES6中可以用`“[]”`包裹表达式作为属性名：

```javascript
var prefix = "foo";
var myObject = {
	[prefix + "bar"] : "hello", 
	[prefix + "baz"] : "world" // 如果拿掉[]会出现syntax error
};
console.log(myObject["foobar"]); // hello
console.log(myObject["foobaz"]); // world
```


- 属性与方法



- 复制对象
此处我们要先分清楚一个概念，浅复制还是深复制

浅复制：
字面量复制，各种ref不复制

深复制： 引用也复制


```javascript
function anotherFunction() { /*..*/ }
var anotherObject = { 
	c: true
};
var anotherArray = [];
var myObject = { 
	a: 2,
	b: anotherObject, // 引用,不是复本! 
	c: anotherArray, // 另一个引用!
	d: anotherFunction
};

anotherArray.push( anotherObject, myObject );

```

对于浅拷贝来说,复制出的新对象中 a 的值会 复制旧对象中 a 的值,也就是 2,但是新对象中 b、c、d 三个属性其实只是三个引用,它们 和旧对象中 b、c、d 引用的对象是一样的。对于深复制来说,除了复制 myObject 以外还会复 制 anotherObject 和 anotherArray。这时问题就来了,anotherArray 引用了 anotherObject 和 myObject,所以又需要复制 myObject,这样就会由于循环引用导致死循环。



JSON安全的对象的复制方法：

对于 JSON 安全(也就是说可以被序列化为一个 JSON 字符串并且可以根据这个字符串解 析出一个结构和值完全一样的对象)
> var newObj = JSON.parse( JSON.stringify( someObj ) );
当然,这种方法需要保证对象是 JSON 安全的,所以只适用于部分情况。



浅复制：
Object.assign()
> Note: 由于 Object.assign(..) 就是使用 `=` 操作符来赋值,所 以源对象属性的一些特性(比如 writable)不会被复制到目标对象。