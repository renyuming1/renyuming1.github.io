---
layout: post
title:  Javascript Prototype
date:   2017-09-18 16:12:26
categories: Javascript
tags: Javascript
author: yuming
---

* content
{:toc}




# Object的prototype




prototype chain


## prototype linkage([[prototype]])

`[[prototype]]`:几乎任何对象有一个[[prototype]]属性，在标准中，这是一个隐藏属性。该属性指向的是这个对象的原型。
object的[[prototype]]属性是有什么决定的？答案是取决于构造object的方法。
1. 字面量构造
```javascript
var car = {
	wheels: 4,
	drive: function() {
		return "start the engine";
	}
}
console.log(car.__proto__) // object Object.prototype
```
这种[[prototype]]指向Object.prototype

2. 构造函数

```javascript

function Car() {
	this.wheels = 4;
	this.drive = function(){
		return "start the engine";
	}
}
var car = new Car();
console.log(car.__proto__) // object Car.prototype
```
由构造函数构造的对象，其[[prototype]]指向其构造函数的prototype属性指向的对象。每个函数都有一个prototype属性，其所指向的对象带有constructor属性，这一属性指向函数自身。

3. Object.create()

```javascript


var car = {
	wheels: 4,
	drive: function() {
		return "start the engine";
	}
}

var anotherCar = Object.create(car);
console.log(anotherCar.__proto__) // object car
```
此处指向car object。

## 如何get一个object的[[Prototype]]？

### 1. Dunder proto(__proto__)

`__proto__` 又叫dunder proto， 是`Object.prototype` 这个object的一个[Accessor Porperty](http://www.javascripttutorial.net/javascript-objects/#accessor_property)。会访问到object的[[Prototype]]指向的object。

>  `__proto__` exposes the internal prototype linkage ( `[[Prototype]]`) of an object through which it is accessed.

### 2. Object.getPrototypeOf()
`Object.getPrototypeOf()` 方法返回object的`[[Prototype]]`。

### 3. object.constructor.prototype

Hack way。 我们假设code
```javascript
function FOO( name ) {
  this.name = name;
}

var a = new FOO("Albert");

```
此处`a.constructor`指向的是函数`FOO()`,`FOO()`的prototype正是`FOO.prototype`这个匿名函数。

### 三种方法的比较

ES6标准化了`__proto__`, 但是之后可能还会deprecated，所以建议使用`Object.getPrototypeOf()`。




## shadowing





__proto__（隐式原型）与prototype（显式原型）

prototype 是函数的属性, __proto__是Object的内置属性。

每一个函数在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象。

JavaScript中任意对象都有一个内置属性[[prototype]]，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过__proto__来访问。ES5中有了对于这个内置属性标准的Get方法。



# Function的prototype



Javascript中，每创建一个函数的时候，JavaScript会自动生成一个匿名object，我们估计叫做`function_name.prototype`。举个例子

```javascript
function foo(name){
	this.name = name;
}

console.log(foo.prototype); // foo.prototype object

console.log(Object); // function Object()
console.log(Object.prototype); // 匿名object

```
![](/assets/images/js_note/JavaScript-Prototype-Object.png){:class="img-responsive"}


## ref:


1. [Javascript Tutorial](http://www.javascripttutorial.net/javascript-prototype/)



todo:
1. isPrototypeOf()

