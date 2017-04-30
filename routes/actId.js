var express = require('express');
var router = express.Router();
var Sign = require('../modules/signing')
var Users = require('../modules/users')

var signing = false;

router.get('/',function(req,res){
    // console.log(req.query.key);
    var mail = req.query.mail;
    var key = req.query.key;

    Sign.find({'mail':mail},function(err,result){
      if (err || !result[0]){
        res.send("链接已经失效!")
      }else{
        var sg = result[0];
        if (sg.key === key) {
          // 注册成功,添加用户,返回注册成功提示.
          var user = {}
          user.mail = sg.mail;
          user.name = sg.name;
          user.psw = sg.psw;

          Users.create(user,function(){
              Users.fetch(function(err,result){
              console.log(result);
            })
          });
          // 删除注册信息
          Sign.remove({'mail':mail},function(err,result){
            console.log(result);
          });

          signing = true;
          res.send("注册成功!")
        }else{
          // 报错
          res.send("链接失效")
        }
      }
    })
});

router.post('/loading',function(req,res,next){
    var clTime = setInterval(function(){
      if (signing) {
        clearTimeout(clTime);
        signing = false;
        res.json({data:true});
      }
    },1000);
});

router.post('/referMail',function(req,res,next){
  var mail = req.body.mail;
  Users.find({mail: mail}, function (err,result) {
    if (err || !result[0]) {
      res.json({mail: false});
    }else{
      res.json({mail: true})
    }
  })
});
router.post('/referName',function(req,res,next){
  var name = req.body.name;
  Users.find({name: name}, function (err,result) {
    if (err || !result[0]) {
      res.json({name: false});
    }else{
      res.json({name: true})
    }
  })
});
module.exports = router;