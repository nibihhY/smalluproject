### git代码版本控制

#### git的基本操作

##### 作用：

```
代码管理工具
```

##### 目前市场用的代码管理工具

###### svn

```
外号小乌龟
官网地址：https://tortoisesvn.net/
这个工具用多不多了
它是一个独立的服务器，你进入公司。会有你的leader或者网管给你用户名密码
图形化软件
```

###### git

```
git本身自己就是一台服务器，分布式系统
它是命令窗口，用Linux语法
官网地址：https://git-scm.com/
下载之后，下一步，下一步安装即可
```

##### 基本操作命令

打开窗口

```
鼠标右键 Git Bash Here
```

获取当前目录结构

```
pwd
```

清空输入框

```
clear
```

创建文件夹

```
mkdir  目录名称
```

进入目录文件夹

```
cd 目录名称
```

查看目录下的文件

```
ll 查看文件详情
ls 查看文件名称
```

git 初始化

```
git init 
```

查看git状态

```
git status
```

查看git的配置列表

```
git config --list
```

给git全局配置账号（账号与gitHub一致）（如果当前电脑有，就是属于修改）

工作的时候公司会给你创建私密的账号

```
git config --global user.email '你自己的邮箱地址'
git config --global user.name '你刚创建好的用户名'
```

添加文件或者文件夹

```
git add index.html(文件)
git add *.txt (添加一类文件)
git add . (添加所有文件以及文件夹，不包含空文件夹)
git add * (添加所有文件以及文件夹，不包含空文件夹)
```

查看日志

```
git log
git reflog (查看版本号)   eg:8057882
```

回退上一个版本

```
git reset --hard HEAD^
```

回退上两个版本

```
git reset --hard HEAD^^
```

回退到某一个版本号

```
git reset --hard HEAD 版本号
```



#### github

##### 官网地址

```
https://github.com/
```

##### 上传步骤

本地文件夹（本地仓库） ====暂缓区=====  远程仓库（github）

##### 上传项目

如果你们公司只有你一个人，你要上传，走这个步骤

```
一、创建一个文件夹
二、git init 初始化（出现隐藏的.git文件）
三、创建项目
四、打开命令窗口 git add . 
五、 git commit -m '备注信息'
六、链接远程仓库地址
 git remote add origin https://github.com/仓库地址.git
七、把暂缓区的代码推送到远程仓库
git push -u origin master
```

##### 拉取项目

```
第一、链接到远程仓库
git clone https://github.com/仓库地址.git
```

##### 上传自己的代码文件

```
第一步先更新
git pull 
Already up to date(看到它，代表本地是最新的了)
第二步
git add 文件名
第三步
git commit -m '备注信息'
第四步
git push
```

