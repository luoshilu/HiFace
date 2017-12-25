var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access Key';
qiniu.conf.SECRET_KEY = 'Secret Key';

qiniu.url = '你的七牛云url';// 例如 http://qawoia2fd.bkt.clouddn.com

module.exports = qiniu
