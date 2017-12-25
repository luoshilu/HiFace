# HiFace 
#### 一个表情包制作和分享管理的网站

开发栈:
* elementUI
* VUE2
* express
* redis
* mongodb
* 七牛云接口

# 项目部分截图

### 主页
![image](https://github.com/luoshilu/HiFace/blob/master/public/img/index.png)

### 最新表情图列表
![image](https://github.com/luoshilu/HiFace/blob/master/public/img/new.png)

### 制作表情
![image](https://github.com/luoshilu/HiFace/blob/master/public/img/make2.png)

### 发布-分享-最新表情更新
![image](https://github.com/luoshilu/HiFace/blob/master/public/img/show.png)

# install

### 安装

一.下载更新项目
    git clone git@github.com:luoshilu/HiFace.git
    cd HiFace
    npm install

    cd HiFace-web
    npm install

二. 安装redis
    [redis下载官网](https://redis.io/download)

三. 安装mongodb

    [mongodb官网](https://www.mongodb.com/)


    安装成功访问后启动mongodb即可
    sudo /usr/bin/mongod --dbpath=/data/db -smallfiles --rest 

四. 修改配置文件

* 用于发送验证信息的邮箱(conf/mail.js)

你需要在项目中设置一个邮箱，用于进行发送注册信息。

在router目录下的mailverify.js文件中, 补充下面的邮箱信息：

    module.exports = {
        type: '邮箱service',// 比如qq邮箱service是qq
        mail: '(填写)你的邮箱',
        key: '(填写)你的邮箱POP协议密钥'
    }

* 七牛云token（conf/qiniuCnfig.js）

    //需要填写你的 Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = 'Access Key';
    qiniu.conf.SECRET_KEY = 'Secret Key';
    qiniu.url = 'url';

* mongodb(app.js)

    mongoose.connect('mongodb://localhost:27017');

* redis（conf/redis.js）

    var rediz = require('redis')
    var redis = rediz.createClient({"host": "127.0.0.1", "port": "6379"});


##### 里面有很多功能未完善，若在上面进行开发请你再三考虑，项目主要作为学习使用。
