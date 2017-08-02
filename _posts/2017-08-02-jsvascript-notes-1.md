---
layout: post
title:  Javascript高级程序设计笔记
date:   2017-08-02 13:12:26
categories: JavaScript
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




### external js source vs embedded js code
+ maintainable:
+ Cacheable: If both pages use same js file, will only need to load once.
+ For future: compatible with XHTML




