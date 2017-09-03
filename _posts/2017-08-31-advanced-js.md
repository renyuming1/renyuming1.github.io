---
layout: post
title:  Advanced Javascript Notes
date:   2017-08-31 23:12:26
categories: Javascript
tags: Javascript
author: yuming
---




## 作用域(Scope)
> Important! JavaScript has **function** scope only.     

Javascript is in fact a **compiled language**. But it is not **pre-compiled language**. So, Javascript does not have lot of time for optimization. 
> 对于 JavaScript 来说,大部分情况下编译发生在代码执行前的几微秒(甚至更短!)的时 间内。在我们所要讨论的作用域背后,JavaScript 引擎用尽了各种办法(比如 JIT,可以延 迟编译甚至实施重编译)来保证性能最佳。

Defination of Scope: 
作用域是指程序源代码中定义变量的区域。作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。


LHS Left hand side

function LHS
RHS

LHS is the target and RHS is the source.



### 作用域嵌套（Nested Scope）
当一个块（block）或函数(function)嵌套在另一个块或函数中时,就发生了作用域的嵌套。因此,在当前作用 域中无法找到某个变量时,引擎就会在外层嵌套的作用域中继续查找,直到找到该变量, 或抵达最外层的作用域(也就是全局作用域)为止。我们也把这种查找方法称为lexical scope（词法作用域）。因此，总是先从嵌套链最里层开始找，最后到全局作用域。




### ReferenceError and TypeError
如果RHS查询在所有嵌套到作用域（最上层为全局作用域？ or with（））中遍寻不到所需的变量， Engine会给出 `Reference`Error。
如果 RHS 查询找到了一个变量,但是你尝试对这个变量的值进行不合理的操作, 比如试图对一个非函数类型的值进行函数调用,或着引用 null 或 undefined 类型的值中的 属性,那么引擎会抛出另外一种类型的异常,叫作 TypeError。
ReferenceError 同作用域判别失败相关,而 TypeError 则代表作用域判别成功了



## 词法作用域（Lecxical Scope）:
### 定义
简单地说,词法作用域就是定义在词法阶段的作用域。换句话说,词法作用域是由你在写 代码时将变量和块作用域写在哪里来决定的,因此当词法分析器处理代码时会保持作用域 不变(大部分情况下是这样的)。




### 欺骗词法（cheating Lexical）: 
在实际编码中，并不推荐使用这种cheating lexical， 此处只是为了理解这几种用法。
> Notice: 欺骗词法作用域会导致性能下降。
eval()
IIFE
let
with()

#### 1. eval
JavaScript 中的 eval(..) 函数可以接受一个字符串为参数,并将其中的内容视为好像在书 写时就存在于程序中这个位置的代码。在执行 eval(..) 之后的代码时,引擎并不“知道”或“在意”前面的代码是以动态形式插 入进来,并对词法作用域的环境进行修改的。引擎只会如往常地进行词法作用域查找。 比如下面的code

```javascript
	function foo(str, a) { 
		eval( str ); // Cheating! 
		console.log( a, b );
	}

	var b = 2;

	foo( "var b = 3;", 1 ); // 1, 3

```

在严格模式的程序中,eval(..) 在运行时有其自己的词法作用域,意味着其 中的声明无法修改所在的作用域。如下面的例子
```javascript
  function foo(str) { 
  	"use strict";
	eval( str );
    console.log( a ); // ReferenceError: a is not defined
  }

  foo( "var a = 2" );
```

Javascript 还有一些其他与eval()相似的函数，比如setTimeout（）和setInterval（）, 不提倡使用。


#### 2. with
syntax
```
with (expression)
  statement
```
with 通常被当作重复引用同一个对象中的多个属性的快捷方式,可以不需要重复引用对象本身。eval(..) 函数如果接受了含有一个或多个声明的代码,就会修改其所处的词法作用域,而 with 声明实际上是根据你传递给它的对象凭空创建了一个全新的词法作用域。
举个例子
```javascript
var obj = { 
	a: 1, 
	b: 2,
	c: 3 
};

// 单调乏味的重复 "obj" 

obj.a = 2;
obj.b = 3;
obj.c = 4;


// 简单的快捷方式 
with (obj) {
         a = 3;
         b = 4;
         c = 5;
}
```
这样用with，除了减少代码量，节省文件空间之外，还有一个好处是避免interpreter多次重复访问同一个object ref。但是，其实也可以用声明临时变量来解决这个问题。比如我们有一个多层嵌套的object
```javascript
var gameOfThrone = {
  houses: {
       starks: {
         lord: {
            name: "John Snow",
            title: "The King in the north"
          },

       },
       baratheon: {}  
    }
};

with(gameOfThrone.houses.starks.lord) {
  name = "You know nothing!";
  title = "Hold my beer";
}

//IIFE
(function changeLord (obj){
   newLord = obj;   // Decalre a temp obj newLord to reduce repaeted call ref gameOfThrone
   newLord.name =  "Sansa";
})(gameOfThrone.houses.starks.lord);

```
但是with的用法会带来不必要的confusion和对performance的影响，因为with会把特定的object放到整个作用域链的前面, 当在这个特殊obj查找不到的时候，会继续往这个obj所在的函数作用域查找，以此类推。举个例子
```javascript
var c = "global";

function foo(obj) { 
  var c = "foo";
  with (obj) {
    a = 2;
    c = "with"; 
  }
  console.log(c);
}

var o1 = { a: 3, c:"o1"};
var o2 = { b: 3};

foo( o1 ); //"foo"
console.log( o1.a ); // 2
foo( o2 ); //"with"
console.log( o2.a ); // undefined
console.log( a ); // 2——Oops,a is leaked to global variable.
console.log( c ); "global"
```

当我们执行 `foo( o2 )` 的时候，相当于执行语句
```javascript
with( o2 ) {
  a =2;
  c＝ “with";
}
```
o2这个作用域会先被查找，结果发现没有`a`，`c`，就会到上层作用域查找，这里的上层作用域为函数`foo`，`foo`有`c`，所有`c`赋值为“with”，`foo（o2）`会log **"with"**。但是`a`在foo的作用域内没有发现，那就继续向上，到了全局作用域，那给全局作用域添加了属性`window.a`


> with对performance的影响：
> The with statement forces the specified object to be searched first for all name lookups. Therefore all identifiers that aren't members of the specified object will be found more slowly in a 'with' block. 


> Notice: `with`在`Strict Node` 下被禁止了。

### function scope

 function 是javascript的最小作用域单位，即function是可能存在的最小的作用域区间。



## Javascript 中对Scope的运用
### 隐藏内部实现
"Prinicple of Least Privilege"(最小授权原则)：指在软件设计中,应该最小限度地暴露必 要内容,而将其他内容都“隐藏”起来,比如某个模块或对象的 API 设计。

在JavaScript中，我们需要尽量规避过多的暴露变量和函数，一方面是为了隐藏内部实现，另一方面是为了规避命名冲突。

### 规避冲突
#### 全局命名空间（Global Namespaces）

 在实际code过程中，会加载多个三方lib，如果它们没有妥善地将内部私有的函数或变量隐藏起来,就会很容易引发冲突。这些库通常会在全局作用域中声明一个名字足够独特的变量,通常是一个对象。这个对象 被用作库的命名空间,所有需要暴露给外界的功能都会成为这个对象(命名空间)的属 性,而不是将自己的标识符暴漏在顶级的词法作用域中。比如

```javascript

  var MyReallyCoolLibrary = {    
    awesome: "stuff",     
    doSomething: function() {   
    // ... },   
    doAnotherThing: function() {    
    // ...    
    }   
  };   
```
那么如果我们觉得我们有一些逻辑需要做，但是我们并不想把它们被外部访问，哪有什么好方法么？下面IIFE就是一种选择，

### IIFE（Immediately Invoked Function Expression）立即执行函数表达式
举一个IIFE的例子
```javascript
var a = 2; 
(function IIFE() {
  var a = 3; 
  console.log( a ); // 3
  })();

  console.log( a ); // 2
```
IIFE的最初命名可以参考`Ben Alman`的[blog](http://benalman.com/news/2010/11/immediately-invoked-function-expression/).
IIFE有两种写法：
1. (function(){...})();函数表达式被包含在 ( ) 中,然后在后面用另一个() 括号来调用。
2. (function(){...}());用来调用的 () 括号被移进了用来包装的( )括号中。

IIFE还可以把它们当作函数调用并且传递参数。
```javascript
var a = 2;
(function IIFE( global ) {
  var a = 3;
  console.log( a ); // 3 
  console.log( global.a ); // 2
  })( window );

console.log( a ); // 2
```

IIFE 还有一种变化的用途是倒置代码的运行顺序,将需要运行的函数放在第二位,在 IIFE 执行之后当作参数传递进去。这种模式在`UMD(Universal Module Definition)`项目中被广泛使用。常见用法是把一个函数的声明表达式放进IIFE的函数调用（）里。
举个例子

```javascript
var a = 2;
(function IIFE( def ) { 
  def( window );
})(function def( global ) {
  var a = 3;
  console.log( a ); //3 
  console.log( global.a ); // 2
});

```
函数表达式 def 定义在片段的第二部分,然后当作参数(这个参数也叫作 def)被传递进 IIFE 函数定义的第一部分中。最后,参数 def(也就是传递进去的函数)被调用,并将 window 传入当作 global 参数的值。


### 其他block scope
> `for`, `if` 语句不具block scope


Javascript除了function之外，其他几种可以制造块级作用域的方法有
1. with： 用 with 从对象中创建出的作用域仅在 with 声明中而非外 部作用域中有效。
2. try／catch：
ES3 规范中规定 try/catch 的 catch 分句会创建一个块作用域,其中声明的变量仅在 catch 内部有效。  

```javascript
try {
  undefined();
}
catch (err) {
  console.log(err); //works
}

console.log(err); //ReferenceError
```

> Notice: 当同一个作用域中的两个或多个 catch 分句 用同样的标识符名称声明错误变量时,很多静态检查工具还是会发出警告。 实际上这并不是重复定义,因为所有变量都被安全地限制在块作用域内部, 但是静态检查工具还是会很烦人地发出警告。为了避免这个不必要的警告,很多开发者会将 catch 的参数命名为 err1、 err2 等。


3. let
ES6引入了`let`关键字,提供了除`var`以外的另一种变量声明方式。
let关键字可以将变量绑定到所在的任意作用域中(通常是`{...}`内部)。比如
```javascript
var foo = true;
if (foo) {
  let bar = foo * 2;
  bar = something( bar ); console.log( bar );
}

console.log( bar ); // ReferenceError

```
只要声明是有效的,在声明中的任意位置都可以使用 { .. } 括号来为 let 创建一个用于绑 定的块。比如if
```javascript
foo =1;
if (foo) {
  { // <-- 显式的快
    let bar = foo * 2;
    bar = something( bar ); 
    console.log( bar );
  } 
}

console.log( bar ); // ReferenceError

```

> 注:用`let`将变量附加在一个已经存在的块作用域上的行为是隐式的。所以在编写代码过程中要特别注意。


> 注意： 使用 let 进行的声明不会在块作用域中进行提升。声明的代码被运行之前,声明并不“存在”。

> ```javascript
> {
>   console.log( bar ); // ReferenceError! 
>   let bar = 2;  
> }
> ```


    TODO: garbage collection used for let

let一个很有用的地方是循环，因为循环有{}

```javascript
  for (let i=0; i<10; i++) { 
      console.log( i );
  }

  console.log( i ); // ReferenceError
```
for 循环头部的 let 不仅将 i 绑定到了 for 循环的块中,事实上它将其重新绑定到了循环 的每一个迭代中,确保使用上一个循环迭代结束时的值重新进行赋值。这个地方有点绕，大体是变为了下面的逻辑

```javascript
  {
    let j;
    for (j=0; j<10; j++) {
      let i = j; // 每个迭代重新绑定!
          console.log( i );
      }
  }
```
4.  const
和let相似，只是const声明的变量第一次赋值之后就不可以更改。



## Hoisting(提升)

先声明后赋值

数声明会被提升,但是函数表达式却不会被提升。


## Dynamci Scope: this

Hoisting

this keyword

binding,


binding rules
  - 	





Scope Manager : get the reference 


strict mode vs no-strict mode




function expression vs declation


var vs function


var => expression  name or anoymous


self reference until you declare a name.


name declation expression 好处



try ｛


｝
catch（err）{
	console.log(err); //typeError
}

console.log(err);










IIFE Pattern:
keep control of the global scope


IIFE 
it can pass the value




let(ES6+)

IIFE Pattern Questions:


Scope

 Javascript has function scope only



 Block Scope (try-catch)  
 ```

 ```












## ref:


- [You donot know JS](http://YouDontKnowJS.com)
- High Performance JavaScript
- Javascript Patterns
- Js Resources:
  [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)    
  [MDM](https://github.com/rwldrn/idiomatic.js)




## NEED TO ADD
1. Javascript is a JIT  JIT just intime compliation



