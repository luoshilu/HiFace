var express = require('express');
var router = express.Router();
var Users = require('../modules/users');

router.post('/', function(req, res, next) {
    console.log("session:");
    console.log(req.session);
    if (req.session) {
      res.cookie('connect.sid',req.session.id);
      res.end();
    }else if(!req.username){
      console.log("已登录");
      res.end();
    }else{
      // 查询用户信息
      Users.find({name: req.username},function(err,result){
        if(result[0]) {
          console.log('-=-=-=-=-=-');
          console.log(result);
          res.json({
            name:req.username,
            about: result[0].about,
            headurl: result[0].headurl
          });
        }else{
          console.log("未查询到");
          res.end();
        }
      })
    }
});
module.exports = router;
