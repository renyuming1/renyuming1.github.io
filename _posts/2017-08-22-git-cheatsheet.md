---
layout: post
title:  Git cheatsheet
date:   2017-08-22 11:06:05
categories: Git
tags: Git
---

* content
{:toc}







1. 到本地仓库 cd   
2. 查看状态：git status  
3. 添加文件：git  add .  
4. 提交 git commit -m”备注”	  
5. 查看日志：git log	  
6. 查看当前分支：git branch	  
7. 拉取最新代码：git pull origin 分支名	  
8. 推送代码：git push origin 分支名	  
9. 删除远程分支：git push origin :分支名 	  
10. 新建分支，并切换到新建的分支:git checkout -b 新分支名	  
11. 将新建的分支推送到服务器：git push origin 新建的分支名	  
12. 删除本地分支：git branch -D 分支名	  
13. 合并某个分支到当前分支：git merge 需要合并到当前分支的分支名	  
14. 强制回撤到某次提交的版本：git reset —hard 版本号的前6位(如：abe75e)	  
15. 添加tag：git tag -a “标签名” -m”备注”	  
16. 将添加的标签推送到远程服务器：git push —tag	  
17. 进入到某哥tag:git checkout 标签名	  
18. 强制回撤到某个标签：git reset —hard 标签名	  
19. 删除本地tag：git tag -d 标签名	  
20. 删除远程的tag：git push origin -–delete tag 标签名	     
21.  删除git而不删除文件：find . -name “.git | xargs rm -Rf	  
22. 查看git远程仓库地址：git remote -v	  
23. 移除远程的git地址：git remote rm origin	  
24. 将本地修改强制推送到服务器  git push -f -u origin master	  



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


> 有一点很重要，需要记住，fetch 
> 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并。


如果设置了某个分支用于跟踪某个远端仓库的分支（参见下节及第三章的内容），可以使用 git pull 命令自动抓取数据下来，然后将远端分支自动合并到本地仓库中当前分支。在日常工作中我们经常这么用，既快且好。实际上，默认情况下 git clone 命令本质上就是自动创建了本地的 master 分支用于跟踪远程仓库中的 master 分支（假设远程仓库确实有 master 分支）。所以一般我们运行 git pull，目的都是要从原始克隆的远端仓库中抓取数据后，合并到工作目录中的当前分支。

push

git push [remote-name] [branch-name]
git push origin master

track
git remote show origin



git branch --merged

git branch --no-merged

删除远程分支
如果不再需要某个远程分支了，比如搞定了某个特性并把它合并进了远程的 master 分支（或任何其他存放稳定代码的分支），可以用这个非常无厘头的语法来删除它：git push [远程名] :[分支名]。如果想在服务器上删除 serverfix 分支，运行下面的命令：

$ git push origin :serverfix
To git@github.com:schacon/simplegit.git
 - [deleted]         serverfix
咚！服务器上的分支没了。你最好特别留心这一页，因为你一定会用到那个命令，而且你很可能会忘掉它的语法。有种方便记忆这条命令的方法：记住我们不久前见过的 git push [远程名] [本地分支]:[远程分支] 语法，如果省略 [本地分支]，那就等于是在说“在这里提取空白然后把它变成[远程分支]”。


长期分支

git rebase:
有了 rebase 命令，就可以把在一个分支里提交的改变移到另一个分支里重放一遍。




#### scale to peak


#### downshift

profile

overstat/understat metrics


branch:


host for testing
emergent demand

express delivered

reserve pool:







## git 

Repository:
记录文件或目录状态的地方，存储着内容修改的历史记录。

### remote repo vs local repo
remote: 配有专用的服务器，为了多人共享而建立的数据库。
lcoal: 为了方便用户个人使用，在自己的机器上配置的数据库。

origin/master, origin/HEAD, master



### create a repo
1. create a new repo
2. clone a repo




## git commit

### Git 标准注解：
> 第1行：提交修改内容的摘要
> 第2行：空行
> 第3行以后：修改的理由



## git Tree:
Index



### pull 
进行拉取(Pull) 操作就可以把远程数据库的内容更新到本地数据库。



### clone
执行克隆后，远程数据库的全部内容都会被下载。之后您在另一台机器的本地数据库上进行操作。

Note: 克隆后的本地数据库的变更履历也会被复制，所以可以像原始的数据库一样进行查看记录或其他操作。



## git branch:
master:



## ref:
[猴子都能懂的GIT入门](http://backlogtool.com/git-guide/cn/intro/intro1_2.html)

ref:

[CGPointZero](http://www.jianshu.com/p/f5461fe1787a)






