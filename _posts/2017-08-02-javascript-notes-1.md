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

### \<script>
script属性：
1. async: 表示立即下载脚本，但不妨碍页面其他操作，只对外部脚本有效。 
   example：
   ```html
   <script type="text/javascript" async src="example1.js"></script>
   <script type="text/javascript" async src="example2.js"></script>
   ```
   理论上讲，example1.js与example2.js异步加载，所以不存在顺序。确保相互之间互不依赖。建议不要在加载期间修改DOM。
   异步脚步会在页面load event前执行。
2. charset: 通过src属性指定的代码的字符集。
3. defer：与async相对，也是控制解析script的时间，只对外部脚本有效。
   example：
   ```html
   <script type="text/javascript" defer = "defer" src="example1.js"></script>
   <script type="text/javascript" defer = "defer" src="example2.js"></script>
   ```
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
 
#### 逗号
EMCASCript用分号结尾，省略分号，则由解析器确定语句结尾。
```javascript
var sum = a + b  // no comma, not recommend
var diff = a -b; // recommend
```
使用逗号的好处有很多，比如
1. 放心的删除多余空格压缩code
2. 增进代码性能，因为解析器不必花时间推测应该在哪里插入分号了。


## Variable

Javascript的变量是松散类型的，每个变量只是一个用于保存值的占位符而已。需要`var` 操作符定义变量名， 如    
```
var message; // if not assigned, the value will be undefined
var message = "hello"
```
> 注：初始化变量并不会把它标记为特殊类型，比如字符串，只是赋值给变量，因此可以随便给变量赋别的值  
> Question? : How to detect the type then? Constructor? Prototype?



##＃ 数据类型
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

Boolean:
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
`Number.MIN_VALUE`在大多数浏览器是`5e-324`， `Number.MAX_VALUE`在大多数浏览器是`1.7976931348623157e+308`。超过的值为`Infinity`

##### String

#### 复杂类型
##### Object
Object本质上是由一组无序的名值组成。

#### typeof
typeof是



### function

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


