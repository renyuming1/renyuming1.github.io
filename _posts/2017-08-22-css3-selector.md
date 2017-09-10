

##选择器概述


###属性选择器

CSS2增加了属性选择器的特征，使用属性选择器时，需要声明属性与属性值，声明方法如下所示。
[att=val] 

<style type="text/css">
[id=section1]{
    background-color: yellow;
}
</style> 

CSS3的属性选择器：
在CSS3中，追加了三个属性选择器分别为：[att*=val]、[att^=val]和[att$=val]，使得属性选择器有了通配符的概念。
[att*=val]：wildcard val
[att^=val]：开头匹配为val
[att$=val]： 结尾匹配为val

```html
<!DOCTYPE html>
<html>
<head>
<style>
[id *= wildcard] {
    background-color: lightblue;
}
[id ^= start] {
    color: red;
}
[id $= end] {
    font-size: larger;
}

</style>
</head>
<body>

<h1 id = 'hello'>Hello World!</h1>

<p>This page has a light blue background color!</p>
<div id ='wildcard'>This is wildcard</div>
<div id ='111wildcard111'>This is 111wildcard111</div>
<div id ='wild-card'>This is wild-card</div>
<div id ='start'>This is start</div>
<div id ='wildcard-end'>This is wildcard-end</div>
<div id ='start-wildcard'>This is start-wildcard</div>
<div id ='end-wildcard-start'>end-wildcard-start</div>

</body>
</html>

```

效果图为：
![](/assets/images/css3/attr-selector.png){:class="img-responsive"}

### 伪类选择器


CSS中的伪类选择器及伪元素
类选择器与类选择器的区别是，类选择器可以随便起名，如上面的“p.right”与“p.center”，你也可以命名为“p.class1”与“p.class2”，然后在页面上使用“class='class1'”与“class='class2'”，但是伪类选择器是CSS中已经定义好的选择器，不能随便起名。在CSS中我们最常用的伪类选择器是使用在a（锚）元素上的几种选择器，它们的使用方法如下所示。

:first-line
:first-letter
:before
:after


### 结构性伪类选择器
选择器root、not、empty和target

