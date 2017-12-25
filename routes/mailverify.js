var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var Sign = require('../modules/signing');
var mail = require('../conf/mail');
var conf = require('../conf/conf');
// 密钥生成
function getkey () {
    // 
    var zmNum = Math.round(Math.random()*5)+5;
    var szNum = Math.round(Math.random()*5)+5;

    // 
    var dxZm = [65,97];
    var zm = [];
    // 随机字母
    for (var i=0;i<zmNum;i++) {
      // 随机大小写
      var dx = dxZm[Math.round(Math.random()*1)];
      // 随机字母
      var z = Math.ceil(Math.random()*25);
      zm.push(String.fromCharCode(dx + z));
    }
    // 随机数字
    var sz = [];
    for (var j=0;j<szNum;j++) {
      sz.push(Math.ceil(Math.random()*100))
    }

    // key
    var key = [];
    var length = 0;
    zmNum < szNum ? length = zmNum : length = szNum;

    for (var m = 0;m<length;m++) {
      key.push(zm[m]);
      key.push(sz[m]);
    }
    var stKey = key.join('');
    return stKey
}
router.post('/',function(req,res){
    var data = req.body
    var transporter = nodemailer.createTransport({
        service: mail.service,
        auth: {
            user: mail.mail,
            pass: mail.key
        }
    });
    var key = getkey();
    // 激活链接
    var link = "http://"+conf.host+"/actId?mail="+ data.mail +"&key="+ key;

    var mailOptions = {
        from: mail.mail, // sender address
        to: data.mail, // list of receivers
        subject: '欢迎注册HiFace', // Subject line
        text: '这是激活链接:', // plaintext body
        html: "<h1>激活链接:<h1><a href='"+link+"'>"+link+"</a>"
    };
    // 发送
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({data:false});
        }else{
            // 将临时信息存入数据库
            // 加入key
            data.key = key;

            // 设置5分钟链接超时
            setTimeout(function(){
                // 删除注册信息
                Sign.remove({mail:data.mail})
            },1000*60*5);


            // 先将相同注册信息删除
            Sign.remove({mail:data.mail},function(){
                // 添加注册信息
                Sign.create(data,function(err){
                    if(err){
                        console.log(err);
                    }else{
                        Sign.find(function(err,result){
                        if(err) {
                                console.log(err);
                            }
                            console.log('====result======');
                            console.log(result);
                        });
                    }
                });
            });

            // test
            // Sign.remove({"__v":0},function(){});
            res.json({data:true});
        }
    });
})
module.exports = router;