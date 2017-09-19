---
layout: post
title:  Javascript this
date:   2017-09-15 13:12:26
categories: Javascript
tags: Javascript
author: yuming
---

* content
{:toc}




Advanced Js this


如果你传入了一个原始值(字符串类型、布尔类型或者数字类型)来当作 this 的绑定对 象,这个原始值会被转换成它的对象形式(也就是new String(..)、new Boolean(..)或者 new Number(..))。这通常被称为“装箱”。

可惜,显式绑定仍然无法解决我们之前提出的丢失绑定问题。
1. 硬绑定
我们创建了函数 bar(),并在它的内部手动调用 了 foo.call(obj),因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar,它 总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定,因此我们称之为硬绑定。

```javascript
function foo(something) { console.log( this.a, something ); return this.a + something;
}
// 简单的辅助绑定函数 function bind(fn, obj) {
return function() {
return fn.apply( obj, arguments );
}; }
varobj={ a:2
};
var bar = bind( foo, obj );
varb=bar(3);//23 console.log( b ); // 5

```


由于硬绑定是一种非常常用的模式,所以在 ES5 中提供了内置的方法 Function.prototype. bind,它的用法如下:
```javascript
function foo(something) { 
	console.log( this.a, something ); 
	return this.a + something;
}

var obj={ 
	a:2
};

var bar = foo.bind( obj );

var b = bar(3); //2 3 
console.log( b ); // 5
```

2. API 调用的context




new 绑定

1. Javascript中的new
在 JavaScript 中,构造函数只是一些 使用 new 操作符时被调用的函数。它们并不会属于某个类,也不会实例化一个类。实际上, 它们甚至都不能说是一种特殊的函数类型,它们只是被 new 操作符调用的普通函数而已。


使用 new 来调用函数,或者说发生构造函数调用时,会自动执行下面的操作。
	1. 创建(或者说构造)一个全新的对象。
	2. 这个新对象会被执行[[原型]]连接。
	3. 这个新对象会绑定到函数调用的this。
	4. 如果函数没有返回其他对象,那么new表达式中的函数调用会自动返回这个新对象。

```javascript
function foo(a) { 
	this.a = a;
}
var bar = new foo(2); 
console.log( bar.a ); // 2
```


隐式绑定 vs 显式绑定
```javascript
function foo() { 
	console.log( this.a );
}

var obj1= { 
	a: 2,
    foo: foo 
};

var obj2={ 
	a: 3,
    foo: foo 
};

obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

可以看到,显式绑定优先级更高,也就是说在判断时应当先考虑是否可以应用显式绑定。


之所以要在 new 中使用硬绑定函数,主要目的是预先设置函数的一些参数,这样在使用 new 进行初始化时就可以只传入其余的参数。bind(..) 的功能之一就是可以把除了第一个 参数(第一个参数用于绑定 this)之外的其他参数都传给下层的函数(这种技术称为“部 分应用”,是“柯里化”的一种)。

函数的间接引用


this 词法

箭头函数  => ES6


箭头函数并不是使用 function 关键字定义的,而是使用被称为“胖箭头”的操作符 => 定 义的。箭头函数不使用 this 的四种标准规则,而是根据外层(函数或者全局)作用域来决 定 this。



