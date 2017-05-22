var express = require('express')
var router = express.Router();
var redis = require('../conf/redis')
router.post('/',function(req, res, next){
    // var ssId2 = 'sess:' + req.cookies['connect.sid']
    var ssId = 'sess:' + req.body.ck;
    // console.log(ssId2);
    redis.del(ssId,function(err,result){
        if (err){
            console.log(err);
            res.json({data: false});
        }else{
            res.json({data: true});
        }
    })
});
module.exports = router;
