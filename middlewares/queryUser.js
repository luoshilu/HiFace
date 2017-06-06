var redis = require('../conf/redis');
// 查询当前用户 connect.sid是否有效
var nowUser = function(req, res, next){
  var ssId = 'sess:' + req.cookies['connect.sid']
  console.log('cookiesID:');
  console.log(req.cookies['connect.sid']);

  // 查询字符串表
  redis.get(ssId, function(err,result){
    console.log("redis === result:");
    console.log(result);
    console.log(err);
    if (result){
      // 存在则为已经访问过但未登录的用户
      // 
      // 更新生存时间
      redis.expire(ssId, 600, function(err,result){
        if(result === 1){
          console.log('更新生存时间');
        }
      })
      next('visited');
    }else{
      // 去哈希表查询是否为已经登录的用户
      // 
      console.log(ssId);
      redis.hgetall(ssId, function(err,result){
        console.log('result:');
        console.log(result);

        if (result) {
          // 登录的用户
          req.username = result.name;
          next(result.name);
        }else{
          console.log('first:');
          // 第一次访问
          next();
        }
      })
    }
  })
}

module.exports = nowUser;