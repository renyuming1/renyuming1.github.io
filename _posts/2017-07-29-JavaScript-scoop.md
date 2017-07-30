---
layout: post
title:  JavaScript Scope作用域
date:   2017-07-29 17:51:54
categories: JavaScript
tags: JavaScript
excerpt: Javascript作用域学习笔记
mathjax: true
---
JavaScript 代码块语法貌似支持block scope， 实际上并不支持。
JavaScript有Function Scope，意味着定义在函数中的参数和变量在函数外部是不可见的，而在一个函数内部可见。
JavaScript推荐在函数体的顶部声明函数中可能用到的所有变量。
JavaScript特殊的作用域定义还带来了一个好处，闭包（Closure）。

