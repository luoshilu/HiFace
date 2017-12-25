var express = require('express')
var qiniu = require("../conf/qiniuConfig");
var router = express.Router();
var Users = require('../modules/users');
var Imgtotal = require('../modules/imgtotal');
var Imgnewest = require('../modules/imgnewest');
var Tag = require(('../modules/tag'));
// 生产上传凭证 + 文件命名
// (要上传的空间,用户的第几张图片,_id,response)
function setUpload (bucket,imgNum,_id,res) {
    try {
        //构建上传策略函数
        function uptoken(bucket) {
          var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + _id + '/' + imgNum);
          putPolicy.insertOnly = 1;
          return putPolicy.token();
        }
        //生成上传 Token
        var token = uptoken(bucket);
        res.json({uptoken: token, imgNum: imgNum, id: _id});
    }catch (e) {
        console.log('错误:' + e);
    }
}
// 上传
router.post('/',function(req, res){

    var name = req.body.username;
    Users.find({name: name}, function (err, user) {
      console.log(user);
      var findimgNum = user[0].imgNum;
      var _id = user[0]._id;
      if (err) {
        return
      }else if(!findimgNum){
        Users.update(
            {_id:_id},
            {imgNum: 1},
            function(){}
        )
        setUpload('img-total', 1,  _id, res);
      }else{
        setUpload('img-total', findimgNum + 1, _id, res);
      }
    })
});

// 上传图片成功
router.post('/result',function(req, res, next){

    var data = req.body;
    var imgurl = qiniu.url +'/'+ data.key;
    var name = data.name;
    var imgNum = data.imgNum;
    var tag = data.tag;
    var img = {
        tag: tag,// 标签
        creator: name,// 创建人
        score: 0,// 评分
        scoreUserList: [],// 评分的用户列表
        url: imgurl,
        collect_count: 0 // 收藏人数
    }
    // 更新数量
    Users.update(
        {name:name},
        {imgNum: imgNum},
        function(){}
    )
    // 新增标签
    Tag.find({name: tag}, (err,result) => {
        if (!result[0]) {
            Tag.create({name: tag}, (err, result) => {
                console.log('插入');
                console.log(result);
            });
        }
    })
    // 新建图片
    Imgtotal.create(img,function(err,result){
        res.json({data:true, img:img});
    })
});
// 分享
router.post('/share',function(req, res){
    var img = req.body;
    console.log(img);
    // 设置最新图片为5天内的更新
    img.expire = (new Date() - 0 + (60000 * 60 * 24 * 5));
    // 新增分享图片
    Imgnewest.create(img,function(err,back){
        console.log("back:");
        console.log(back);
        if (back) {
            res.json({data: true});
        }else{
            res.json({data: false});
        }
    })
});
// ---------------oowoopghd.bkt.clouddn.com

// 上传头像
router.post('/head',function(req, res){

    var name = req.body.username;
    Users.find({name: name}, function (err, user) {
      var _id = user[0]._id;
      if (err) {
        return
      }else{
        setUpload('user-head', 1, _id, res);
      }
    })
});
// 上传头像成功
router.post('/head/result',function(req, res, next){

    var data = req.body;
    var imgurl = qiniu.url +'/'+ data.key;
    var name = data.name;
    console.log('=-=用户data===');
    console.log(data);
    // 更新url
    Users.update(
        {name:name},
        {headurl: imgurl},
        function(err){
            if (!err) {
                res.json({data:true});
            }
        }
    )

});

module.exports = router;
