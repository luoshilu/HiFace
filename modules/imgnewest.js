var mongoose = require('mongoose');
var imgNewestSchema = require('../schemas/imgnewest'); //拿到导出的数据集模块
var imgNewest = mongoose.model('imgnewest', imgNewestSchema, 'imgnewest'); // 编译生成Movie 模型(, , 集合)

module.exports = imgNewest;