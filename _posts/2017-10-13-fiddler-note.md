---
layout: post
title:  Fiddler 学习使用
date:   2017-10-13 12:24:54
categories: Web
excerpt: Fiddler安装使用笔记
tags: Web
---

* content
{:toc}



## install and configure in Mac

Fiddler作为微软开发的用具，是用.net写的，所以在兼容mac和linux上不好，现在还只是beta版本。Mac下需要用Mono。Mono是支持OS的一个开源系统，提供不同OS下运行.net的环境。

step 1: Download fiddler

https://www.telerik.com/download/fiddler
step 2: extract fiddler

step 3: set mono
 - Install Mono
 - Sync: 

step 4: Start Fiddler 
go to Fiddler Folder,run command：
```
mono --arch=32 Fiddler.exe
```
加attribute `--arch=32` 是因为目前Fiddler.exe 不支持64 bits, 兼容至32bits.







## ref:
1. [](https://imququ.com/post/use-fiddler-on-macos.html)
