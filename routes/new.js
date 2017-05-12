var express = require('express')
// var qiniu = require("../conf/qiniuConfig");
var qiniu = require("qiniu");
var router = express.Router();
var Imgnewest = require('../modules/imgnewest');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '-ChUD7EjnFxh_BJgVCSNdgn_SmYRKry-Dkx9ToAZ';
qiniu.conf.SECRET_KEY = 'O-5Y2yz687cOxP1QuFRksQ4vCF7IANqivQ48u6_P';

router.post('/',function(req, res){
  var currentPage = req.body.page;
  var num = req.body.num;
  console.log("===body==");
  console.log(req.body);
  var policy = new qiniu.rs.GetPolicy();
  var download = [];
  Imgnewest.find({}).sort({'_id':'-1'}).exec(function(err,back){
    var length = back.length;
    var imgob = {};
    for (var i = (currentPage-1)*num;i < currentPage*num;i++) {
      if (i > length - 1) {
        break
      }
      imgob = {
        imgurl: policy.makeRequest(back[i].url),//构建私有空间的链接
        score: back[i].score,
        creator: back[i].creator
      }

      download.push(imgob);
    }
    console.log('===download==');
    console.log(download);
    res.json({'imgList':download, 'total': length});
  });
})


module.exports = router;