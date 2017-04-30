var rediz = require('redis')
var redis = rediz.createClient({"host": "127.0.0.1", "port": "6379"});
// redis 链接错误
redis.on("error", function(error) {
    console.log(error);
});

module.exports = redis;