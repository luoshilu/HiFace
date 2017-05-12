var express = require('express')
// var qiniu = require("../conf/qiniuConfig");
var qiniu = require("qiniu");
var router = express.Router();

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '-ChUD7EjnFxh_BJgVCSNdgn_SmYRKry-Dkx9ToAZ';
qiniu.conf.SECRET_KEY = 'O-5Y2yz687cOxP1QuFRksQ4vCF7IANqivQ48u6_P';

router.post('/',function(req, res){
  var currentPage = req.body.page;
  var num = req.body.num;
  console.log("===body==");
  console.log(req.body);
  var policy = new qiniu.rs.GetPolicy();
  console.log(123)
  var download = [];
/*  imgTemplate.find({}).sort({'_id':'-1'}).exec(function(err,back){
    var length = back.length; */
  var imgob = {};
  for (var i = (currentPage-1)*num + 1;i < currentPage*num;i++) {
    if (i > 18) {
      break
    }
    imgob = {
      imgurl: policy.makeRequest('http://oownilpze.bkt.clouddn.com/' + i + '.jpg'),//构建私有空间的链接
    }

    download.push(imgob);
  }
  console.log('===download==');
  console.log(download);
  res.json({'imgList':download, 'total': 18});
/*  });*/
})


module.exports = router;