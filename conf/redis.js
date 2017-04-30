var rediz = require('redis')
var redis = rediz.createClient({"host": "127.0.0.1", "port": "6379"});

module.exports = redis;