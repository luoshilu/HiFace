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
  try{
    var policy = new qiniu.rs.GetPolicy();
    var download = [];
    db.find(search).sort(sort).exec(function(err,back){
      if (back[0]){
        var length = back.length;
        var imgob = {};
        for (var i = (currentPage-1)*num;i < currentPage*num;i++) {
          if (i > length - 1) {
            break
          }
          if (!back[i].url) {
            continue
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
        res.json({'imgList':download, 'total': length});
      }else{
        res.json({'imgList':download, 'total': 0});
      }
    });
  }catch(e){
    console.log(e);
  }
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
  var bd = req.body
  var tag;
  console.log('search======>');
  console.log(search);

  console.log('body======>');
  console.log(bd);
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
  var search = req.query.search;
  var tag = {};
  if (search !== '' && search) {
    tag = {
      tag: new RegExp(search)
    };
  }
  var currentPage = req.body.page;
  var num = req.body.num;
  getImglist(Imgtotal, currentPage, num, tag, {'hotVal':'1'}, res);
}) 

router.post('/myFace', function(req, res) {
  console.log(req.session);
  var name = req.query.name;
  var search = req.query.search;
  var currentPage = req.body.page;
  var num = req.body.num;
  var tag = {
    creator: name,
    tag:  new RegExp(search)
  };
  getImglist(Imgtotal, currentPage, num, tag, {'_id':'-1'}, res);
}) 
module.exports = router;