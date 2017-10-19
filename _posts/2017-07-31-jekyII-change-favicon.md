---
layout: post
title:  Jekyll 更换favicon
date:   2017-07-31 10:26:26
categories: jekyll
tags: jekyll
excerpt: Jekyll 学习笔记，方便查找
author: yuming
---

* content
{:toc}

## 简介
>Favicon是favorites icon的缩写，是与某个网站或者网页相关联的图标，主要的实现方法是用HTML为任何一个网页指示其图标所存储的位置。这种方法是通过在页面的<head>部分添加两个link元件来实现的。这样，任何一个适当大小的（16×16像素或更大）的图像都可以用作favicon。尽管如此，多数情况下仍然使用ICO格式。其他网页浏览器现在也支持PNG（便携式网络图片）格式，和GIF（图形交换格式）动画图像格式。
>                    ---[Wiki](https://zh.wikipedia.org/wiki/Favicon)  

![](https://media.licdn.com/mpr/mpr/shrinknp_800_800/p/6/005/06e/31b/2cb05e2.jpg)







## 更换：

### 获取自己的favicon
在设计好自己的favicon之后，通常我们会把其他诸如.jpg, .gif等格式转化为.ico格式，因为ico格式通常可以被所有可以显示favicon的浏览器读取。网上有诸多转换器，比如
[http://cn.favicon-icon-generator.com/favicon](http://cn.favicon-icon-generator.com/favicon)
下载之后即可得到自己的favicon.ico


### 新加/替换Jekyll的favicon
Jekyll的初始默认favicon.ico应该在根目录下。为了方便更改维护，将调用ico文件的HTMLcode直接写在`_includes-> head.html`下，这样会自动生成到所有页面的`<head>`里。
- 建议在`head.html`下包含以下HTML代码
  ```
  <link rel="shortcut icon" href="/favicon.ico?" type="image/x-icon">
  <link rel="icon" href="/favicon.ico?" type="image/x-icon">
  ```
  
  然而，只有第一行是必须的，因为“shortcut icon”字符串将被多数遵守标准的浏览器识别为列出可能的关键词（“shortcut”将被忽略，而仅使用“icon”）；而Internet Explorer将会把它作为一个单独的名称（“shortcut icon”）。这样做的结果是所有浏览器都可以理解此代码。只有当希望为新浏览器提供另一种备用图像（例如动画GIF）时，才有必要添加第二行。 

## 测试：

因为Favicon是缓存在浏览器中的，所以在更换了favicon之后，需要clean浏览器中的Cache，一般可以用的方法为直接清空所以缓存，但是如果只是更换Favicon，Firefox提供了一种更为简洁的方法。
使用Firefox Addon [SQLite Manager](https://addons.mozilla.org/en-US/firefox/addon/sqlite-manager/)。


Firefox浏览过的网页的缓存文件默认是在个人配置文件夹的\cache\目录下。具体步骤可以参考[https://stackoverflow.com/questions/8616016/favicon-not-displayed-by-firefox](https://stackoverflow.com/questions/8616016/favicon-not-displayed-by-firefox)

注：在地址栏输入`about:cache`可以查看当前缓存文件的路径。其中Disk 对应的Cache Directory就是firefox缓存的文件夹位置了。

清空缓存后，运行`jekyll serve`测试新的favicon是否正确显示。


## Ref
1. [Wiki](https://zh.wikipedia.org/wiki/Favicon)
2. [Unable to set favicon using Jekyll and github pages](https://stackoverflow.com/questions/30551501/unable-to-set-favicon-using-jekyll-and-github-pages)
3. [favicon not displayed by Firefox](https://stackoverflow.com/questions/8616016/favicon-not-displayed-by-firefox)

