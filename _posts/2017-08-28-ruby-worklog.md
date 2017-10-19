---
layout: post
title:  Ruby work note
date:   2017-08-28 21:06:05
categories: Ruby Rails
tags: Ruby
author: yuming
---

* content
{:toc}




## common statements

### array 内元素大小写
```ruby
array.map(&:upcase) # to Upper case
array.map(&:downcase) # to down case
```

[How can I uppercase each element of an array?](https://stackoverflow.com/questions/11402362/how-can-i-uppercase-each-element-of-an-array)


### show parameter inpect without HTML entitiies

In view, just use `<%=  raw parameter.inspect %>`
For example, we pass a `@user` parameter to the view, the @usr = ";nbsp", it will put a " " instead.


### url parameters
request.request_uri
request.fullpath
request.path
[https://stackoverflow.com/questions/2165665/how-do-i-get-the-current-absolute-url-in-ruby-on-rails](https://stackoverflow.com/questions/2165665/how-do-i-get-the-current-absolute-url-in-ruby-on-rails)