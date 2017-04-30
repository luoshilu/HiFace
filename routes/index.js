var express = require('express');
var router = express.Router();

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
      res.json({name:req.username});
    }
});
module.exports = router;
