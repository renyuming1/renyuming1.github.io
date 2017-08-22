---
layout: post
title:  Git ignore
date:   2017-08-21 09:06:05
categories: Git
tags: Git
---

* content
{:toc}


## .gitignore file

gitignore file 指出Git 在add的时候忽略的文件。
> 注：已经被git track的文件不受影响。


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
 `~/gitignore.txt`可以为任意路径下的任意文件，可自行命名，.gitconfig文件中仅仅是引用该文件的路径。

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






为什么


在初始化git repo的时候没有创建.gitignore文件来过滤不必要提交的文件, 后来却发现某些文件不需要提交, 但是这些文件已经被提交了, 这时候创建.gitignore文件忽略这些文件时, 发现ignore的规则对那些已经被track的文件无效.


git rm -r one-of-the-directories
git commit -m "Remove duplicated directory"
git push origin <your-git-branch> (typically 'master', but not always)

## ref
1. []()
2. []()			



git help ignore


