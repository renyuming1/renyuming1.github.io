---
layout: post
title:  Git cheatsheet
date:   2017-08-22 11:06:05
categories: Git
tags: Git
---

* content
{:toc}





1.到本地仓库 cd
2.查看状态：git status
3.添加文件：git  add .
4.提交 git commit -m”备注”
5.查看日志：git log
6.查看当前分支：git branch
7.拉取最新代码：git pull origin 分支名
8.推送代码：git push origin 分支名
9.删除远程分支：git push origin :分支名 
10.新建分支，并切换到新建的分支:git checkout -b 新分支名
11.将新建的分支推送到服务器：git push origin 新建的分支名
12.删除本地分支：git branch -D 分支名
13.合并某个分支到当前分支：git merge 需要合并到当前分支的分支名
14.强制回撤到某次提交的版本：git reset —hard 版本号的前6位(如：abe75e)
15.添加tag：git tag -a “标签名” -m”备注”
16.将添加的标签推送到远程服务器：git push —tag
17.进入到某哥tag:git checkout 标签名
18.强制回撤到某个标签：git reset —hard 标签名
19.删除本地tag：git tag -d 标签名
20.删除远程的tag：git push origin -–delete tag 标签名
21.删除git而不删除文件：find . -name “.git | xargs rm -Rf
22.查看git远程仓库地址：git remote -v
23.移除远程的git地址：git remote rm origin
24.将本地修改强制推送到服务器  git push -f -u origin master


ref:

[CGPointZero](http://www.jianshu.com/p/f5461fe1787a)



git commit -a 

git commit -a -m "msg"

git status
git diff

git diff --cached




remove files from cache
要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。

git rm : remove the file from repo. already pushed to the remote repo

如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 -f
git rm file_name -f

remove from git repo but keep it in local repo

git rm --cached 

git mv old_file_name new_file_name


取消已经暂存的文件

git reset HEAD file
git checkout --file

remote repo

至少可以看到一个名为 origin 的远程库，Git 默认使用这个名字来标识你所克隆的原始仓库：

add a new remote repo

get repo from remote
git fetch [remote-name]




#### scale to peak





