var express = require('express');
var router = express.Router();
var Users = require('../modules/users');
/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session) {
      console.log('====id====');
      console.log(req.session.id);
      res.cookie('connect.sid',req.session.id);
      res.end();
    }else if(!req.username){
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
          res.end()
        }
      })
    }
});
module.exports = router;
