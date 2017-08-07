
---
layout: post
title:  Javascript的函数参数传值方式
date:   2017-08-07 13:10:26
categories: Javascript
tags: Javascript
author: yuming
---

* content
{:toc}


## Call by sharing 

Javascript的函数在传参数值的时候是用`call by sharing`方式的，这种方式不同于我们比较熟知的按值传递（`call by value`）和引用传递（`call by reference`）。 Wiki对`call by sharing`的解释是
>调用函数传参时，函数接受对象实参引用的副本(既不是按值传递的对象副本，也不是按引用传递的隐式引用)。 它和按引用传递的不同在于：在共享传递中对函数形参的赋值，不会影响实参的值。

>The main point of this strategy is that function receives the copy of the reference to object. This reference copy is associated with the formal parameter and is its value.
 Regardless the fact that the concept of the reference in this case appears, this strategy should not be treated as call by reference (though, in this case the majority makes a mistake), because the value of the argument is not the direct alias, but the copy of the address.
 The main difference consists that assignment of a new value to argument inside the function does not affect object outside (as it would be in case of call by reference). However, because formal parameter, having an address copy, gets access to the same object that is outside (i.e. the object from the outside completely was not copied as would be in case of call by value), changes of properties of local argument object — are reflected in the external object.
> --- ECMAScript

此处用一个例子来解释
```javascript
function setChanges(a, b, c)
{
    a = 1;
    b.name = "John Snow";
    c = {name: "Khaleesi of the Great Grass Sea" };
}

var num1 = 666;
var obj1 = {name: "King in the north" };
var obj2 = {name: "Daenerys Targaryen"};

setChanges(num1,obj1,obj2);
console.log(num1); //666
console.log(obj1.name); // King in the north;
console.log(obj2.name); // Daenerys Targaryen;

```
为什么此处obj1的name改了而obj2的name没有改呢？红宝书上有这么一句话：
> 在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反应函数外。

根据这句话，我们分析上述code的行为：

1. 变量初始化：
```javascript
var num1 = 666;
var obj1 = {name: "King in the north" };
var obj2 = {name: "Daenerys Targaryen"};

```
num1,obj1, obj2被声明并存在相应的stack内存，因为num1是basic value，直接按照值存，obj1，obj2分别开辟了heap的两块内存并且地址设为addr1，addr2。我们假设obj
1的name属性内存地址为addr3，obj2的name属性内存地址为addr4。
![](/assets/images/js_arguments/stack1.png)

2. 函数执行
```javascript
setChanges(num1,obj1,obj2);
```
- 函数执行过程中，我们将复制内存地址给b,c。所以b，c的值为addr1，addr2。
![](/assets/images/js_arguments/stack2.png)
 
- b语句
```javascript
  b.name = "John Snow";
```
此时b指向addr1，b.name指向addr3，所以此时修改的是addr3的内容。
- c语句
```javascript
   c = {name: "Khaleesi of the Great Grass Sea" };
```
此时c指向addr2，但是由于c被赋值了一个新的object，我们认为这个new object指向addr5. c在这个语句执行之后指向了addr5.

![](/assets/images/js_arguments/stack3.png)

所以，最后obj1被修改了，但是obj2并没有被修改。


### Arguments 数组
Javascript的参数变量在实现的过程中，用的是Arguments数组的模式。


### Ref:
1. [JavaScript 是传值调用还是传引用调用](https://zhuanlan.zhihu.com/p/25314908?refer=nodejh)
2. [call by sharing——JavaScript中“共享传参”和“按值传参”的理解](https://segmentfault.com/a/1190000005177386)
