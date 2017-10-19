---
layout: post
title:  Git ignore 文件设置及常见语法
date:   2017-08-22 09:06:05
categories: Git
tags: Git
excerpt: Git Ignore 文件分析，设置与常用命令
author: yuming
---

* content
{:toc}


## .gitignore file

gitignore file 指出Git 在add的时候忽略的文件。
> 注：已经被git track的文件不受影响。即在初始化git repo的时候没有创建.gitignore文件来过滤不必要提交的文件, 后来却发现某些文件不需要提交, 但是这些文件已经被提交了, 这时候创建.gitignore文件忽略这些文件时, 发现ignore的规则对那些已经被track的文件无效. 需要运行命令如下：   
> ```
> git rm -r one-of-the-directories 或者 git rm --cached ignore_file    
> git commit -m "Remove duplicated directory"   
> git push origin <your-git-branch> (typically 'master', but not always)    
> ```

## 文件位置
在创始git repo的时候，在root目录下存放`.gitignore`

## Git ignore 作用域
- 全局
  这个需要在账户文件（~/users/yuming）下的`.gitconfig`文件,
  ```
  [user]
  name = sea
  email = sea@gmail.com
  [core]
  excludesfile = ~/gitignore.txt
  ```
  看这段代码
  ```
  excludesfile = ~/gitignore.txt
  ```
 `~/gitignore.txt`可以为任意路径下的任意文件，可自行命名，.gitconfig文件中仅仅是引用该文件的路径。也可以用`$git config –global core.excludesfile ~/.gitignore`设置。

  > 注: git config文件其实也有三种作用域，分别为全局（`/etc/gitconfig` 文件：系统中对所有用户都普遍适用的配置)；用户目录下(`~/.gitconfig`比如上面例子)；当前git项目（.gitconfig），这个配置仅仅针对当前项目有效。
  > 每一个级别的配置都会覆盖上层的相同配置，所以 `.git/config` 里的配置会覆盖 `/etc/gitconfig` 中的同名变量。
  > 详细内容请阅读[初次运行 Git 前的配置](https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)


- 设置为单个repo专用，但该设置会被同步至远程仓库，在clone该repo时会同时将该设置clone至本地；
  .gitignore文件名不能更改
- 设置为单个repo专用，且该设置不会同步至远程仓库，仅供本地的repo使用。
  直接编辑repo根目录下的.git/info/exlude文件。比如
  ```
  # git ls-files --others --exclude-from=.git/info/exclude
  # Lines that start with '#' are comments.
  # For a project mostly in C, the following would be a good set of
  # exclude patterns (uncomment them if you want to use them):
  # *.[oa]
  # *~
  ```


## Syntax
### 规则
1. 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。   
2. 使用glob／shell通配符匹配文件。具体在下一节介绍。
3. 路径分隔符"/";如果"/"后面的名称是个目录,则该目录以及该目录下的所有文件都会被忽略;如果"/"后面的名称是个文件,则该文件不会被忽略;  例如: /name, 如果name是个目录,则目录name和name下的所有文件都会被忽略;如果name是个文件,则该文件不会被忽略;
4. 也可以忽略自己，即在.gitignore文件下加 ".gitignore"。

### glob
glob 模式也称为shell通配符，通常用来匹配目录以及文件，而不是文本。

glob语法：

字符            	| 解释
----------------| -------------
*				| 匹配任意长度字符
?				| 匹配任意单个字符
[list]			| 匹配list任意单个字符，也可以是单个字符组成的集合
[^list]			| 匹配指定范围外的任意单个字符或者字符集合
[!list]			| same as [^list]
{str1,str2,...} | 匹配 srt1 或者 srt2 或者更多字符串，也可以是集合
\  				| 转义符




字符           	|   	意义
--------------- | ------------
[:alnum:]		| 	任意数字或者字母
[:alpha:]		| 	任意字母
[:space:]		| 	空格
[:lower:] 		|	小写字母
[:digit:]		| 	任意数字
[:upper:]		| 	任意大写字母
[:cntrl:]		| 	控制符
[:graph:]		| 	图形
[:print:] 		|	可打印字符
[:punct:]		| 	标点符号
[:xdigit:]		| 	十六进制数
[:blank:] 		|	空白字符（未验证）     



让我们拿一个[https://www.gitignore.io/](https://www.gitignore.io/)生成的RubyMine的`gitignore`文件来看一下

```
# Created by https://www.gitignore.io/api/rubymine

### RubyMine ###
# Covers JetBrains IDEs: IntelliJ, RubyMine, PhpStorm, AppCode, PyCharm, CLion, Android Studio and Webstorm
# Reference: https://intellij-support.jetbrains.com/hc/en-us/articles/206544839

# User-specific stuff:
.idea/**/workspace.xml
.idea/**/tasks.xml
.idea/dictionaries

......

# CMake
cmake-build-debug/

# Mongo Explorer plugin:
.idea/**/mongoSettings.xml

## File-based project format:
*.iws

## Plugin-specific files:

# IntelliJ
/out/

# mpeltonen/sbt-idea plugin
.idea_modules/

# JIRA plugin
atlassian-ide-plugin.xml

# Cursive Clojure plugin
.idea/replstate.xml

# Crashlytics plugin (for Android Studio and IntelliJ)
com_crashlytics_export_strings.xml
crashlytics.properties
crashlytics-build.properties
fabric.properties

### RubyMine Patch ###
# Comment Reason: https://github.com/joeblau/gitignore.io/issues/186#issuecomment-215987721

# *.iml
# modules.xml
# .idea/misc.xml
# *.ipr

# Sonarlint plugin
.idea/sonarlint

# End of https://www.gitignore.io/api/rubymine

```

#开头的为注释，不多解释。
```
.idea/**/workspace.xml
.idea/**/tasks.xml
.idea/dictionaries

```
表示../.idea/文件下所有子文件或者自身下面workspace.xml与tasks.xml文件和.idea/dictionaries。
> 注： 此处的`**` 应该与 `*`同意，但是不是所有的版本都支持，建议改用`*`并且测试。
> 如果想了解更多，看这个链接 [https://git.eclipse.org/r/#/c/31366/](https://git.eclipse.org/r/#/c/31366/)

```
*.iws
```
表示根目录下所有.iws结尾的文件

鉴于这个例子没有覆盖所有case，我们再分析几个例子,假设一个jeklly project的根目录下文件如下
```bash
LICENSE				_site
README-zh-cn.md			assets
README.md			css
_config.yml			feed.xml
_drafts				gittitititttttttttt.docx
_includes			index.html
_layouts			js
_posts				page
_sass				~git.docx
```

```
ls ?EADME.md  					   # README.md
ls [[:lower:]]eed*             # feed.xml
ls [L,F,G]*[[:upper:]]*[^A,B]  # LICENSE; 表示以L或者F或者G开头中间有大写字母并且以非A，B结尾的文件
ls [L,F,G]*[[:lower:]]*[^A,B]  # no match
ls README[[:punct:]]*          # README-zh-cn.md	README.md

```



## 一些有用的产生gitignore文件的工具链接
- [github/gitignore](https://github.com/github/gitignore) : gitignore templates集合
- [https://www.gitignore.io](https://www.gitignore.io) : 产生gitignore的网站
> Tips: git help ignore



## ref
1. [Linux shell 通配符 / glob 模式](http://www.cnblogs.com/divent/p/5762154.html)
2. [Git中.gitignore的配置语法](http://www.jianshu.com/p/ea6341224e89)			


