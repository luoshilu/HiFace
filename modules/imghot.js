var mongoose = require('mongoose');
var imgHotSchema = require('../schemas/imghot'); //拿到导出的数据集模块
var imgHot = mongoose.model('imghot', imgHotSchema, 'imghot'); // 编译生成Movie 模型(, , 集合)

module.exports = imgHot;