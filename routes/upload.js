var express = require('express')
var qiniu = require("../conf/qiniuConfig");
var router = express.Router();
var Users = require('../modules/users');
var Imgtotal = require('../modules/imgtotal');
var Imgnewest = require('../modules/imgnewest');
// 上传策略
// (要上传的空间,用户的第几张图片,_id,response)
function setUpload (bucket,imgNum,_id,res) {
    // var key = 'key'
    // console.log(bucket, key);
    //构建上传策略函数
    function uptoken(bucket) {
      var putPolicy = new qiniu.rs.PutPolicy(bucket);
      return putPolicy.token();
    }

    //生成上传 Token
    var token = uptoken(bucket);
    res.json({uptoken: token, imgNum: imgNum, id: _id});
}

router.post('/',function(req, res){

    var name = req.body.username;
    console.log(name);
    Users.find({name: name}, function (err, user) {
      var findimgNum = user[0].imgNum;
      var _id = user[0]._id;
      if (err) {
        return
      }else if(findimgNum === undefined){
        console.log('=====user=====');
        console.log(user);
        Users.update(
            {_id:_id},
            {imgNum: 1},
            function(){}
        )
        setUpload('img-total', 1, res);
      }else{
        console.log(user);
        setUpload('img-total', user[0].imgNum + 1, _id, res);
      }
    })
});
// 上传成功
router.post('/result',function(req, res, next){

    var data = req.body;
    var imgurl = 'http://oowoia3ge.bkt.clouddn.com/' + data.key;
    var name = data.name;
    var imgNum = data.imgNum;
    var img = {
        tag: [],// 标签
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
    console.log('img:');
    console.log(img);

    // 新建图片
    Imgtotal.create(img,function(err,result){
        console.log('==新建图片====');
        console.log(result);
        res.json({data:true, img:img});
    })
});
// 分享
router.post('/share',function(req, res, next){
    var img = req.body;
    // 设置最新图片为5天内的更新
    img.expire = (new Date() - 0 + (60000 * 60 * 24 * 5));
    // 新增分享图片
    Imgnewest.create(img,function(err,back){
        if (back) {
            res.json({data: true});
        }else{
            res.json({data: false});
        }
    })
});

module.exports = router;
