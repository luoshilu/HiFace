var express = require('express');
var router = express.Router();
// var Imgtotal = require(('../modules/imgtotal'));
var Tag = require(('../modules/tag'));
/* 获取tag */
router.post('/', function(req, res) {
  var tagList = [];
  try {
    Tag.find({},function(err,back){
        for (let i=back.length - 1;i>=0;i--) {
          tagList.push(back[i].name);
        }
        res.json({tagList: tagList});
    });
  } catch(e) {
    console.log(e);
  }
});
module.exports = router;
