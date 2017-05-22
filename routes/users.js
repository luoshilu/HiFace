var express = require('express');
var Imgtotal = require(('../modules/imgtotal'));
var Imgnewest = require('../modules/imgnewest');
var Users = require('../modules/users');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
    });
});
//查询所有用户数据
router.get('/aboutme', function(req, res, next) {
    var name = req.query.name
    console.log(name);
    Users.find({name: name}, function(err,result){
        console.log(result);
        res.json({headImg: result.headurl, about: result.about})
    })
});

//修改个人资料
router.post('/edit', function(req, res, next) {
    var data = req.body;
    var search = {name: data.oldname};
    var change = {};

    function edit(search,change) {
        // 修改
        Users.update(search,change,function (err) {
            try {
                if (err) {
                    res.json({res: false})
                } else {
                    res.json({res: true})
                }
            } catch(e) {
                console.log(e);
            }
        })
    }
    // 已经更改了昵称
    if (data.name !== data.oldname){
        // 查询用户名是否已存在
        Users.find({name: data.name},function(err,result){
            if (result[0]) {
                res.json({res:false})
            } else {
                if (data.about) {
                    edit({name: data.oldname},{name: data.name, about: data.about});
                } else {
                    edit({name: data.oldname},{name: data.name});
                }
                // 更新图
                Imgtotal.update({creator: data.oldname},{$set:{creator: data.name}}, {multi:true}, function(err,result){
                    console.log(result);
                });
                Imgnewest.update({creator: data.oldname},{$set:{creator: data.name}}, {multi:true}, function(err,result){
                    console.log(result);
                });
            }
        })
    } else if (data.about){
        edit({name: data.oldname},{about: data.about});
    } else {
        res.json({res: true})
    }
});
module.exports = router;