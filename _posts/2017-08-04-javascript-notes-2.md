---
layout: post
title:  Javascript高级程序设计笔记2
date:   2017-08-04 11:10:26
categories: Javascript
tags: Javascript
author: yuming
---

* content
{:toc}



### 执行环境，作用域
#### 执行环境(Execution context)：
执行环境(Execution context)定义了变量或者函数有权访问的其他数据，决定了他们各自的行为。
全局执行环境是最外围的一个执行环境，在web浏览器中，全局执行环境被默认为是指window对象。因此所有的全局变量和函数都是作为window对象的属性和方法创建的。全局执行环境直到应用程序推出才会被销毁（例如关闭网页或者浏览器的时候）。

每个函数都有自己的执行环境。当执行流进入一个函数的时候，函数的环境就会被推入一个环境栈中，而在函数执行之后，栈将其环境弹出。把控制权返回给之前的执行环境了。
拿一个例子举例说明：
```javascript
var color = "blue";
function changeColor() {
    var anotherColor = "red";
    function swapColors() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }
    
    swapColors();
    alert(anotherColor); //"blue"
}

changeColor();

alert(color); //"red"

```
这里是先把全局执行环境(EC)放进stack中，然后开始执行其中的可执行代码，遇到｀changeColor()｀, 把`function changeColor` 的EC放入stack,最后把`function swapColors` 的EC放入stack。


![](/assets/images/flowchart_for_ec.png){:class="img-responsive"}

在执行过程中，因为`swapColors EC`是栈顶，先访问`swapColors EC`。然后，执行完`swapColors()` function后，将`swapColors EC`从stack 弹出。然后再执行`changeColor()`,执行完毕将`changeColor EC` 弹出。

![](/assets/images/flowchart_for_ec_1.png){:class="img-responsive"}


#### 变量对象(variable object)
每个执行环境都有一个与该环境相关联的变量对象（variable object）。环境EC中定义的所有变量和函数都是保存在这个对象中的。如果变量与EC相关，那变量自己应该知道它的数据存储在哪里，并且知道如何访问。这种机制称为变量对象(variable object)。
>变量对象(缩写为VO)是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的以下内容：  
>   变量 (var, 变量声明);  
>   函数声明 (FunctionDeclaration, 缩写为FD);  
>   函数的形参

举例来说，我们可以用普通的ECMAScript对象来表示一个变量对象：
```javascript
VO = {};
```
VO是EC的一个属性

```javascript
activeExecutionContext = {
  VO: {
    // 上下文数据（var, FD, function arguments)
  }
};
```
当我们声明一个变量或一个函数的时候，和我们创建VO新属性的时候一样没有别的区别（即：有名称以及对应的值）。
```javascript
var a = 10;
 
function test(x) {
  var b = 20;
};
 
test(30);

```

对应的变量对象是：
```javascript
 //全局上下文的变量对象
 VO(globalContext) = {
  a: 10,
  test: <reference to function>
};
 
// test函数上下文的变量对象
VO(test functionContext) = {
  x: 30,
  b: 20
};
```

盗用[Charming](https://segmentfault.com/u/charming_58a6884da06c0)画的图来说明Variable object 的创建过程，
![](https://sfault-image.b0.upaiyun.com/321/485/3214852543-5906c1cf61eb4_articlex){:class="img-responsive"}

上面就是变量对象的一个创建过程，这个过程的解释：

> 1. 建立arguments对象。检查当前上下文中的参数，建立该对象下的属性与属性值。
> 2. 检查当前上下文的函数声明，也就是使用function关键字声明的函数。在变量对象中以函数名建立一个属性，属性值为指向该函数所在内存地址的引用。如果函数名的属性已经存在，那么该属性将会被新的引用所覆盖。
> 3. 检查当前上下文中的变量声明，每找到一个变量声明，就在变量对象中以变量名建立一个属性，属性值为undefined。如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被修改。
参考[变量对象和执行环境的理解](https://segmentfault.com/a/1190000009247123) 的代码解释。



##### Global Variable Object
> 全局对象(Global object) 是在进入任何执行上下文之前就已经创建了的对象；这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象的生命周期终止于程序退出那一刻。  

全局对象初始创建阶段将Math、String、Date、parseInt作为自身属性，等属性初始化，同样也可以有额外创建的其它对象作为属性（其可以指向到全局对象自身）。例如，在DOM中，全局对象的window属性就可以引用全局对象自身(当然，并不是所有的具体实现都是这样)：
```javascript
global = {
  Math: <...>,
  String: <...>
  ...
  ...
  window: global //引用自身
};
```
在Global EC中的VO变量对象就是全局对象`global`本身：
```javascript
VO(globalContext) === global;
```
基于这个原理，在全局上下文中声明的对应，我们才可以间接通过全局对象的属性来访问它（例如，事先不知道变量名称）。

```javascript
var a = new String('test');
 
alert(a); // 直接访问，在VO(globalContext)里找到："test"
 
alert(window['a']); // 间接通过global访问：global === VO(globalContext): "test"
alert(a === this.a); // true
 
var aKey = 'a';
alert(window[aKey]); // 间接通过动态属性名称访问："test"
```

##### Function variable object
在函数执行上下文中，VO是不能直接访问的，此时由活动对象(activation object,缩写为AO)扮演VO的角色。
```javascript
VO(functionContext) === AO;
```
AO是在进入函数EC时被创建的，通过函数的arguments属性初始化。arguments属性的值是Arguments对象：
```javascript
 AO = {
  arguments: <ArgO>
 };
```


##### 处理EC code对2个阶段

执行上下文的代码被分成两个基本的阶段来处理：  
1. 进入EC
2. 执行代码
Variable Object的修改变化与这两个阶段紧密相关。

###### 1.进入EC
 进入EC，即执行code前，VO已经包含属性：
 - arguments声明,包括值
 - 函数声明(Function Declaration)
 - 变量声明(var)
 
 例子：
```javascript
function test(a, b) {
  var c = 10;
  function d() {}
  var e = function _e() {};
  (function x() {});
}
test(10); // call
```
当test() 的EC被call，AO为
```javascript
AO(test) = {
  a: 10, // a 是arguments，已经传值
  b: undefined,
  c: undefined,
  d: <reference to FunctionDeclaration "d">
  e: undefined
  //此处没有x，因为x is FunctionExpression， 不影响VO
};
```
##### 2. 代码执行
AO/VO在代码解释期间被修改如下：
```javascript
AO['c'] = 10;
AO['e'] = <reference to FunctionExpression "_e">;

```
> 注：因为FunctionExpression“_e”保存到了已声明的变量“e”上，所以它仍然存在于内存中。而FunctionExpression “x”却不存在于AO/VO中，也就是说如果我们想尝试调用“x”函数，不管在函数定义之前还是之后，都会出现一个错误“x is not defined”，未保存的函数表达式只有在它自己的定义或递归中才能被调用。





- 作用域链(scope chain)

#### 没有块级作用域
其他类C语言中，由花括号封闭的代码块都有自己的作用域。
```javascript
if(true){
    var color = "blue";
}

alert(color); //blue
```
此处的color会被添加到当前执行环境。

var声明的variable会自动被添加到最接近的作用域，对于函数来说，就是函数本身。如果初始化的时候没有用var，则会被添加到全局环境。

在Javascript引用标识符(Literal)时，必须通过搜索确定Literal背后代表什么。Javascript从最近的Variable Object（就是环境）开始搜索，如果找到对变量的定义，就自动停止搜索，不然，再去更上一级对Variable Object去寻找。

> 注：变量查询是有代价的。很明显，访问局部变量比访问全局变量更快，因为不需要向上搜索。 

### Garbage Collection


#### 内存泄漏


### Other refs:
1. [变量对象和执行环境的理解](https://segmentfault.com/a/1190000009247123)
2. [深入理解JavaScript系列（12）：变量对象（Variable Object）](http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html#!comments)