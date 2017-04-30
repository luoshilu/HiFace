var express = require('express');
// var mongoose = require('mongoose');//导入mongoose模块

var Users = require('../modules/users');//导入模型数据模块

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.json({data:0});
    // Users.create({data:'1585159568@qq.com',psw:'123321'})
    // Users.remove({"__v":0},function(){});
    Users.fetch(function(err, result){
        res.json(result)
    });
});

//查询所有用户数据
router.get('/users', function(req, res, next) {
    Users.fetch(function(err, result) {
        if(err) {
            console.log(err);
        }
        console.log(result);
        res.json(result);
        // res.render('users',{title: '用户列表', users: users});  //这里也可以json的格式直接返回数据res.json({data: users});
    });
    // 基于静态方法的查询
/*    Users.fetch(function(error, result){
        if(error) {
            console.log(error);
        } else {
            console.log('resule:' + result[0]);
        }
        //关闭数据库链接
        // db.close();
      });*/
});
module.exports = router;