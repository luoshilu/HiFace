var express = require('express')
// var qiniu = require("../conf/qiniuConfig");
var router = express.Router();
var Imgnewest = require('../modules/imgnewest');
// var Imghot = require(('../modules/imghot'));
var Imgtotal = require('../modules/imgtotal');
// var Users = require('../modules/users')

var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '-ChUD7EjnFxh_BJgVCSNdgn_SmYRKry-Dkx9ToAZ';
qiniu.conf.SECRET_KEY = 'O-5Y2yz687cOxP1QuFRksQ4vCF7IANqivQ48u6_P';

function getImglist(db, currentPage, num, search, sort, res) {
  var policy = new qiniu.rs.GetPolicy();
  var download = [];
  db.find(search).sort(sort).exec(function(err,back){
    var length = back.length;
    var imgob = {};
/*    var i = (currentPage-1)*num;
    function downloadimg(i) {
      imgob = {
        imgurl: policy.makeRequest(back[i].url),//构建私有空间的链接
        score: back[i].score,
        creator: back[i].creator,
        imghot: back[i].hot || 0,
        createDate: back[i].meta.createAt,
        tag: back[i].tag,
        sc: false
      }
      Users.find({name: back[i].creator},(err,result) => {
        if (!err && result[0]) {
          imgob.userhead = result[0].headurl || ''
        }
        download.push(imgob);
      })
      download.push(imgob);
      i++;
      if (i > length - 1) {
        return
      }
      if (i < currentPage*num){
        downloadimg(i)
      }
    }
    downloadimg(i);*/
    for (var i = (currentPage-1)*num;i < currentPage*num;i++) {
      if (i > length - 1) {
        break
      }
      imgob = {
        imgurl: policy.makeRequest(back[i].url),//构建私有空间的链接
        score: back[i].score,
        creator: back[i].creator,
        imghot: back[i].hot || 0,
        createDate: back[i].meta.createAt,
        tag: back[i].tag,
        sc: false
      }
      download.push(imgob);
    }
    console.log('download:');
    console.log(download);
    res.json({'imgList':download, 'total': length});
  });
}

router.post('/', function(req,res){
  var search = req.query.search;
  console.log(search);
  var tag = {
    tag: new RegExp(search)
  };
  if (search === '' || !search) {
    tag = {}
  }
  var currentPage = req.body.page;
  var num = req.body.num;
  getImglist(Imgtotal, currentPage, num, tag, {'_id':'-1'}, res);
})

router.post('/new',function(req, res){
  var search = req.query.search;
  var tag;
  if (search === '' || !search) {
    tag = {}
  } else {
    tag = {
      tag: new RegExp(search)
    };
  }
  var currentPage = req.body.page;
  var num = req.body.num;
  try {
    getImglist(Imgnewest, currentPage, num, tag, {'_id':'-1'}, res);
  } catch (e) {
    console.log(e);
  }
})

router.post('/hot', function(req, res) {
  // var search = req.query.search;
  var currentPage = req.body.page;
  var num = req.body.num;
  var tag = {
  };
  getImglist(Imgtotal, currentPage, num, tag, {'hotVal':'1'}, res);
}) 

router.post('/myFace', function(req, res) {
  console.log(req.session);
  var search = req.query.search;
  var currentPage = req.body.page;
  var num = req.body.num;
  var tag = {
    creator: search
  };
  getImglist(Imgtotal, currentPage, num, tag, {'_id':'-1'}, res);
}) 
module.exports = router;