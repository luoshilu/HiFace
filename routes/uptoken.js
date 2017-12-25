var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access_Key';
qiniu.conf.SECRET_KEY = 'Secret_Key';

//要上传的空间
var bucket = 'Bucket_Name';

//上传到七牛后保存的文件名
var key = 'my-nodejs-logo.png';

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}

//生成上传 Token
var token = uptoken(bucket, key);

module.exports = token;