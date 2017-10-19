---
layout: post
title:  GreaseMonkey 使用
date:   2017-10-13 12:14:54
categories: Web
excerpt: GreaseMonkey一点小笔记
tags: Web
---

* content
{:toc}


## GreaseMonkey


user.js结尾

```

// Hello World! example user script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hello World
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

alert('Hello world!');

```


### metaData

元数据：
```

// ==UserScript==
//
// ==/UserScript==
```

Greasemonkey 用它们来标记用户脚本的元数据段.

// @name
脚本名字，它将会在您第一次安装脚本时在安装对话框（install dialog）中显示出来。之后会显示在“管理用户脚本”对话框中。这个名字应该言简意赅。 

// @namespace

这是一个 URL，Greasemonkey 用它来区分名称相同但是作者不同的用户脚本。如果您有一个域名，您可以使用它作命名空间。
```

// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
```

这几行让 Greasemonkey 知道在那些网站上执行您的用户脚本。您可以明确的指定一个 URL，或者用通配符*来代替域名或路径中的部分字符。
@include和@exclude 是可选的，可以自定义执行和豁免的 URL，但必须每条规则各占一行。如果您没有任何定义， Greasemonkey 将会对所有的网站执行您的用户脚本。(等同于@include *)。 


如果您的用户脚本出错了，错误控制台会显示一条异常(exception)和一个行号。由于 Greasemonkey 将用户脚本插入到页面中，所以行号没有实际的用处，应该忽略这个行号。这并不是您的用户脚本中发生异常的行号。 

## ref:
