---
layout: post
title:  Markdown 学习笔记
date:   2017-07-30 11:51:54
categories: Markdown
tags: Markdown
excerpt: Markdown 学习笔记，方便查找
author: yuming
---

## 简介
Markdown 是一种书写的格式，目的是为了更容易读写更改。是具有电子邮件风格的标记语言。


## HTML
Markdown语言是不需要额外标注HTML的，兼容HTML的标签，比如`<div>`,`<p>`, `<span>`,但是必须在前后加上空行与其它内容区隔开，还要求它们的开始标签与结尾标签不能用制表符或空格来缩进。
在 HTML 区块标签间的 Markdown 格式语法将不会被处理。比如，你在 HTML 区块内使用 Markdown 样式的\*强调\*会没有效果。
在HTML块区内，不要使用markdown语言。

#Layout




## 标题 Title
- Markdown使用＃前标作为标题的符号，并用`＃`的数量表示标题级数，比如:
  > \# 一级标题   
  > \## 二级标题  
  > \### 三级标题  
  > \#### 四级标题  
  > \##### 五级标题  

  生成的效果为:
  > # 一级标题   
  > ## 二级标题  
  > ### 三级标题  
  > #### 四级标题  
  > ##### 五级标题  

  注：# 和「一级标题」之间建议保留一个字符的空格，这是最标准的 Markdown 写法。
  
- 另外，还可以用底线的形式，利用 `=` （最高阶标题）和 `-` （第二阶标题），与`=`数量无关，这个不能适应超过二级的多级标题。
  > ``` 
  > Title1
  > ======
  > Title2  
  > ----
  > ```
  
   
  > Title1
  > ======
  > Title2
  > ----
     
  
 
## 列表
- 有序列表：
  使用
- 无序列表：
  使用`*`星号、`+`加号或是`-`减号作为列表标记：
  
  
  ```
  + Amazon
  + Microsoft
  + Google
  + Facebook
  ```
  > + Amazon
  > + Microsoft
  > + Google
  > + Facebook
  
  ```
  － Amazon
  － Microsoft
  － Google
  － Facebook
  ```
  > - Amazon
  > - Microsoft
  > - Google
  > - Facebook  
  
  ```
  * Amazon
  * Microsoft
  * Google
  * Facebook
  ```
  > * Amazon
  > * Microsoft
  > * Google
  > * Facebook  
  



## 加强
Marktown提供了丰富的加强格式，比如\`表示加强，`*`表示斜体，`_`表示加粗，, 
> ` \` 点的效果  `  
> *\* 的效果*  
> ** 加强 **

## Code Block
Markdown有两种方法来表征一个code block
1. 一行：Markdown使用四个head whitespace来表征一个code block
2. 多行：Markdown也允许用``` 来创造一个code block，这样不需要用四个head whitespaces。比如：
   > \```javascript  
   >  function test() {  
   >  console.log("Hello!")  
   >  }   
   >  \```

   输出结果为
   > ```javascript  
   >  function test() {  
   >  console.log("Hello!")  
   >  }   
   >  ```
   
   几个常用的语言为javascript，python， ruby， 也可以不指出语言，则只需要\```即可
   
   
## 表格
Marktown制作表格的样式也很简单

```
First Header | Second Header | Third Header  
------------ | ------------- | ------------  
Content Cell | Content Cell  | Content Cell  
Content Cell | Content Cell  | Content Cell      
```

效果为

> First Header | Second Header | Third Header
> ------------ | ------------- | ------------
> Content Cell | Content Cell  | Content Cell
> Content Cell | Content Cell  | Content Cell

 

## Link
link的方法也有两种，
1. 一种比较简单，用`< >`包裹网址就可以，比如  
   ```<www.google.com>``` 会生成     
   <www.google.com>
2. 另一种方法类似config，方括号显示说明，圆括号内显示网址， Markdown 会自动把它转成链接，例如：
   >     [renyu的github](https://renyuming1.github.io)    

   生成效果
   > [renyu的github](https://renyuming1.github.io)



## Line Breaks
Markdown使用的是GFM的line break格式

## Images

## Videos


## Escape
Markdown 允许使用\来产生escape characters, 比如
> \\\*literal asterisk\\\*  

生成效果
> \*literal asterisk\*

Markdown 还允许使用 \` 和 \* 来escape，比如  
> `literal asterisk`

Markdown provides backslash escapes for the 
following characters:
\    backslash
`   backtick
*    asterisk
_    
underscore
{}   
curly braces
[]   
square brackets
()   
parentheses
#    
hash mark
+   
plus sign
-    
minus sign (hyphen)
.     
dot
!     
exclamation mark