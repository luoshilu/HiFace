var express = require('express');
var router = express.Router();
var redis = require('../conf/redis')
var Users = require('../modules/users')


router.post('/',function(req, res, next){
  var user = req.body;
  var mail = '';
  var name = '';
  var ssId = "sess:"+req.cookies['connect.sid'];
  // 验证用户
  Users.find({mail: user.mail, psw: user.psw}, function(err,result){
    if(!result[0] || err){
      res.json({'verify': false});
    }else{
      mail = result[0].mail;
      name = result[0].name;
      var cookie = null;
      // 将sessionId值字符串转化为json对象
      redis.get(ssId,function(err,ck){
        if(err){
          console.log(err);
        }else{
          try {
            cookie = JSON.parse(ck);
            if (cookie.cookie) {
              var strck = JSON.stringify(cookie.cookie);
            }
            redis.del(ssId,function(){
              // 将用户名加入到redis session中
              redis.hmset(ssId,{'cookie': strck,'mail': mail,name: name},function(){
                  // 设定有效时间
                  redis.expire(ssId,600,function(err,result){
                    console.log('设定有效时间:');
                    console.log(result);
                    redis.ttl(ssId,function(err,result){
                      console.log('ttl:');
                      console.log(result);
                    })
                  })
              })
            })
          } catch (e) {
            console.log(e);
          }
        }
      })
      if (user.saveme){
        console.log('加入用户名密码到cookie');
        console.log(user.mail);
        res.cookie('mail',user.mail,{ maxAge: 5*24*60*60*1000 });
        res.cookie('psw',user.psw,{ maxAge: 5*24*60*60*1000 });
      }
      res.json({
        'verify': true,
        name:result[0].name,
        about: result[0].about,
        headurl: result[0].headurl
      });
    }
  })
})
module.exports = router;
