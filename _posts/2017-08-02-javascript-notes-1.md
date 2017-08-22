---
layout: post
title:  Javascript高级程序设计笔记1
date:   2017-08-02 13:12:26
categories: Javascript
tags: Javascript
author: yuming
---

* content
{:toc}



## HTML in Javascript

### <script>

#### script代码块：
Javascript在HMTL中的代码块是由`<script type="text/javascript"></script>`tag分割的代码段。需要注意的是：
> JS是按照代码块来进行编译和执行的，代码块间相互独立，但变量和方法共享。
```html
<script type="text/javascript">
      alert(block2Msg); //typeError
      var block1Msg = "Here is block 1 variable";
</script>
<script type="text/javascript">
      var block2Msg = "Here is block 2 variable";
      alert(block1Msg); //"Here is block 1 variable"
</script>
```
可见，代码块之间的变量和方法是共享的。那为什么此处的`alert(block2Msg);`会是typeError呢？如果我们把这两个代码块写在一起，按照变量声明提起的原则，应该alert的是`undefined`才对。
```html
<script type="text/javascript">
      alert(block2Msg); //undefined
      var block1Msg = "Here is block 1 variable";
      var block2Msg = "Here is block 2 variable";
      alert(block1Msg); //"Here is block 1 variable"
</script>
```
事实确实也是这样的。那这两者之间的区别是哪里来的呢？原因就在于，`<script>`代码块在HTML文档流中的顺序执行：
**浏览器在解析HTML文档流时，如果遇到一个`<script>`标签，则JavaScript解释器会等到这个代码块都加载完后，先对代码块进行预编译，然后再执行。执行完毕后，浏览器会继续解析下面的HTML文档流，同时JavaScript解释器也准备好处理下一个代码块。**
所以说，当执行到第一个代码块时，script里并没有对block1Msg的声明，也就自然不会有变量声明提起的问题。


那这意味着什么呢？
- 如果你的网站有很慢的脚本在页面较前部分被加载，你的网页加载就会被显著拖慢。
- 后加载的脚本可以依赖先加载的脚本。
- 当前脚本之前的 DOM 节点才可以在当前 JavaScript 中被访问。

这三点使得我们需要考虑script代码块在HTML中的放置顺序。那我们能不能不通过更改HTML的放置顺序来改变script的执行顺序呢？答案是可以的。

#### 如何改变script的执行顺序？
为了安全起见，我们一般在页面初始化完毕之后才允许JavaScript代码执行，这样可以避免网速对JavaScript执行的影响，同时也避开了HTML文档流对于JavaScript执行的限制。
`<script>`的若干属性会影响代码的执行顺序，比如`async`, `defer`。具体内容放到下一节。此处我们着重讨论的load的过程。

#### script属性：
1. async: 表示立即下载脚本，但不妨碍页面其他操作，只对外部脚本有效。 表示“先下载，不用马上执行，但是下载完后会执行”
   example：
   ```html
   <script type="text/javascript" async src="example1.js"></script>
   <script type="text/javascript" async src="example2.js"></script>
   ```
   理论上讲，example1.js与example2.js异步加载，所以不存在顺序。确保相互之间互不依赖。建议不要在加载期间修改DOM。
   异步脚本会在页面load event前执行。因此，定义一个页面需要的变量或函数在`async`的代码中是不行的，因为你没有方法知道什么时候`async`代码将会被实际执行。
2. charset: 通过src属性指定的代码的字符集。
3. defer：与async相对，也是控制解析script的时间，只对外部脚本有效。表示“等待页面解析完成之后执行”
   example：
   ```html
   <script type="text/javascript" defer = "defer" src="example1.js"></script>
   <script type="text/javascript" defer = "defer" src="example2.js"></script>
   ```
   大致等价于将你的脚本绑定到`DOMContentedLoaded`事件，或者使用`jQuery.ready`。当这个代码被执行，`DOM`中的一切元素都可用。不同于`async`，所有加了`defer`的脚本将会按照它们出现在`TML`页面中的顺序执行，它只是推迟到`HTML`页面解析完毕后开始执行。


   > defer vs async 
   1、相同点:  
    (1)、加载文件时不阻塞页面渲染；
    (2)、对于inline的script无效；
    (3)、使用这两个属性的脚本中不能调用document.write方法；
    (4)、有脚本的onload的事件回调；
    (5)、允许不定义属性值，仅仅使用属性名；
    2、不同点

    (1)、每一个async属性的脚本都在它下载结束之后立刻执行，同时会在window的load事件之前执行。所以就有可能出现脚本执行顺序被打乱的情况；

    (2)、每一个defer属性的脚本都是在页面解析完毕之后，按照原本的顺序执行，同时会在document的DOMContentLoaded之前执行。

 



   > 注：最好只包含一个延迟脚本，理论上讲，example1.js会先于example2.js被执行。但是现实中，延迟脚本不一定按照顺序执行，比如我们并不知道example1.js还是example2.js谁会先被load.
4. language: replaced by type
5. type: 表示编写代码用的脚本语言的内容类型(MIME类型)。常用的MIME类型诸如`text/javascript`, `text/ecmascript`。服务器在传送JS文件时用的MIME类型通常为`application/x-javascript`，但是在type中设置可能导致脚本被忽略。
6. src: 包含执行代码的外部文件。如果要包含外部Javascript文件，src是必须的
   Example:
    ```html
    <script type="text/javascript" src = 'example.js'></script>
    ```
   > 注：外部文件与解析嵌入式Javascript一样，解析外部文件时，页面处理会暂停。
   
   > 注：带有src属性的`<scipt>`元素不应在其`<scipt>`与`</scipt>`间包含JS代码，不然嵌入的代码会被忽略




### External JavaScript Source vs Embedded Javascript Code
+ maintainable:
+ Cacheable: If both pages use same js file, will only need to load once.
+ For future: compatible with XHTML



## Syntax

### ECMAScript
区分大小写  
标识符： Camel  
#### Strict Mode: 
   ECMAScript 5 引入Strict Mode,为Javascript定义了一种不同的解析与执行模型。
1. 整个脚本启动严格模式：
   ``` 
   *use strict*;
   ```

2. 指定函数在严格模式下运行
   ```javascript
   function foo(){
     *use strict*;
     // function body
   }
   ```
 
#### 分号
EMCASCript用分号结尾，省略分号，则由解析器确定语句结尾。
```javascript
var sum = a + b  // no comma, not recommend
var diff = a -b; // recommend
```
使用逗号的好处有很多，比如
1. 放心的删除多余空格压缩code
2. 增进代码性能，因为解析器不必花时间推测应该在哪里插入分号了。


## 变量

Javascript的变量是松散类型的，每个变量只是一个用于保存值的占位符而已。需要`var` 操作符定义变量名， 如    
```
var message; // if not assigned, the value will be undefined
var message = "hello"
```
> 注：初始化变量并不会把它标记为特殊类型，比如字符串，只是赋值给变量，因此可以随便给变量赋别的值  
> Question? : How to detect the type then? Constructor? Prototype?



### 数据类型
#### 基本类型
##### Undefined:
声明的未赋值变量和未声明变量都是undefined.
##### Null:
null表示空对象指针, 如果定义变量准备在将来保存object，建议将变量初始化为null，方便变量是否已经保存了对象的引用，如
```javascript
if(car != null){
    // car operations
}
```
`undefined` 派生自 `null`，所以相等性测试为true
```javascript
var car = null;
tyoeof car // 'object'
alert(null == undefined); //true
```

##### Boolean:
true or false, 只有两个值。
函数Boolean()可以用来把其他type转化为boolean，比如
```javascript
var foo = "hello world!";
var fooAsBoolean = Boolean(foo); //true
```
Boolean()转化规则为

Datatype | convert as `true`  | convert as `false`
--------| --------- | --------
number | not 0 or NaN   | 0 or NaN
object | object | null
string | not empty | ""
undefined | n/a | undefined

这个在if判断语句里十分有用，比如
```javascript
var msg = "Hello my lady!"
if(msg) { //true;
    alert('Ya my lord!') 
}

```


##### Number:
常见number几种值为整数，浮点数，科学计数法
```javascript
 var intNum = 7;
 var floating1 = 1.0
 var floating2 = .34567 //valid,not recommend
 var floating3 = 3.1415e7; //31415000
```
> floating number 最高精度为17位小数，但是计算时候有误差
> ```javascript
>  var a = 0,1, b = 0.2;  
>  if( a + b == 0.3) { // indeed a + b is 0.30000000000000004, 正好为17位小数， so false 
>    alert("it is 0.3"):
>  }
>  ```


数值范围：
`Number.MIN_VALUE`在大多数浏览器是`5e-324`， `Number.MAX_VALUE`在大多数浏览器是`1.7976931348623157e+308`。超过的值为`Infinity`, `Infinity`有正负，但是`Infinity`不能参与计算，

NaN
Not a number, 表示一个本来要返回数值的操作数未返回的情况，比如除以0. 

NaN有以下几个特点：
1. 所有涉及NaN的操作都会返回NaN
```javascript
 console.log(NaN/0); //  NaN
```
2. NaN与任何值不相等
```javascript
 console.log(NaN == NaN) // false;
 console.log(NaN === NaN) // false; 
```

所以判断`NaN`需要用新的方法，`isNaN()`， `isNaN`接到值之后，尝试将这个值转换为数值，任何不能被转换为数值的值都会返回true。注意，string比如`"10"`或者boolean都可以转换为数值。

```javascript
isNaN(NaN); // true
isNaN(10); // false
isNaN("10"); //false
isNaN("blue"); // true, can not be converted to Num
isNaN(true); // false, convert to 1
var object1 = function(){return 1;}; // define a object object1
isNaN(object1); //true, use what the object return to judge

```
数值转换：  
主要的几种转换方法为 
- Number()  
- parseInt()  
- parseFloat()  


函数 | Number()| parseInt()| parseFloat() 
----|  ----- | ------ | -----
Input type |  all type    |  string only   |  string only    
boolean |  true ->1; false -> 0;    | NaN  |  NaN   
null | 0 | NaN | NaN
undefined | NaN | NaN | NaN
string | 数字 -> 数字，可以转换十进制，十六进制，浮点型；其他格式为NaN | 从左往右解析，直到遇到非数字字符 | 解析到无效字符，比如第二个小数点
"" |  0 | NaN  | NaN
前导0 | 解析进制 | 解析进制  | 始终忽略，因此只解析十进制



一些具体例子：
```javascript
 var num1 = Number("Hello"); // NaN
 var num2 = Number(""); //0
 var num3 = Number("00001.1"); // 1,1
 var num4 = Number(true); //1
 var num5 = Number(false); //0
 var num6 = parseInt("666laotie"); // 666
 var num7 = parseInt(""); // NaN
 var num8 = parseInt(22.5); // 22
 var num9 = parseInt("070"); // 56(八进制)
 var num10 = parseInt("70"); // 70
 var num11 = parseInt("0xf"); // 15(十六进制)
 var num12 = parseFloat("666laotie"); // 666
 var num13 = parseFloat("0xA"); // 0
 var num14 = parseFloat("1.23"); // 1.23
 var num15 = parseFloat("1.2.3"); // 1.2
 var num16 = parseFloat("0666"); // 666

```


`parseInt()` 在解析八进制、十六进制这种字符串时，ECMAScript 3 和 5 存在分歧。因此，`parseInt()`提供了第二个参数，转换基数。比如
```javascript
var num = parseInt("0xAF", 16); //175
var num1 = parseInt("AF",16); //175
var num2 = parseInt("AF); //NaN 
```




##### String:
Javascript中的字符串是不可变的。
字符串比较：

转化为string：
1. toString():
对于null，undefined无效
```javascript
var value1 = 10, value2 = true, value3 = null; value4;
value1.toString(); // "10"
value2.toString(); // "true"
value3.toString(); // syntax error
value4.toString(); // syntax error
```
2. String():
适用于null,undefined,其他情况与`toString()`完全一样 
```javascript
var value1 = 10, value2 = true, value3 = null; value4;
String(value1); // "10"
String(value2); // "true"
String(value3); // "null"
String(value4); // "undefined"
```



#### 复杂类型
##### Object
Object本质上是由一组无序的名值组成。

#### 如何判断类型？
1. 基本类型：
typeof

2. 复杂类型：

instanceof

```javascript
result = variable instanceof constructor;
var person = new Object();
person instanceof Object; // true
var no_person;
no_person instanceof Object; // false
null instanceof Object; //false, as null is a basic type

var a = "person";
a instanceof String; // false, 基本类型不能使用instanceof, 用typeof
```

所有引用类型的值都是Object的实例.




### 操作符
#### 相等
1. "==" & "!="
比较规则：
  - bool, false -> 0, true -> 1
  - string vs number, 先把string换成number
  - Object vs not Object, valueof(Object)

  特殊情况
 
 statement |  value | statement |  value
 --- | ---| --- | ----
 null = undefined | true | "NaN" == NaN | false
 "5" == 5 | true | false == 0 | true
 null == 0 |false |   |  
  



2. "===" & "!=="   
比较之前不转换操作数，因此只在操作数未转换前就相等时才返回true。
```javascript
 null === undefined // false, not same type
 "55" === 55 //false, not same type
```




### 函数


#### return:
Function不需要有return 语句，例子：
```javascript
function foo(n1,n2){
    return n1+n2;
} // return n1 + n2

function nuts(){
    return;
} // return undefined

function foo(){
    console.log("hello my lady!")
} // return undefined

```


#### Arguments
Javascript function 使用一个arguments数组传入参数。因此，在函数体内也可以通过`arguments`对象访问参数数组，从而获取传递给函数的参数。使用`length`判断传递了多少参数。
```javascript
function alertArgs() {
    alert(arguments.length);
}
```
可以用这个方式让函数接收任意个参数并且分别实现功能。
```javascript
function showState(){
    if(arguments.length == 1){
        alert("single");
    }
    else if(arguments.length == 2){
        alert("married");
    }
    else {
        alert("???");
    }
}


showState("me"); // "single"
showState("me", "you"); //"married"
showState(); // "???"
```
arguments 可以与命名了的参数一起用，比如
```javascript
function doAdd(num1, num2){
    if(arguments.length == 1){
        alert(num1 + 10); //if no num2, by default add 10
    } else if(arguments.length == 2){
        alert(arguments[0] + num2);
    }
}
```
> 注： 此处有一点要注意，看这个例子
> ```javascript
> function doAdd(num1, num2) {
>   arguments[1] = 10;
>   alert(arguments[0] + num2);
> }
> doAdd(20,30); // 20 + 10 =30
> ```
> arguments中的值会自动反映到对应的参数中，比如此处`arguments[1]`会对应到`num2`。但是，这两个值并不在相同的内存空间中，只是值会同步。
>

> 注: ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数（ref）

因为Javascript没有检测参数长度或者参数类型，因此不可以overload。
