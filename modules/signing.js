var mongoose = require('mongoose');
var SignSchema = require('../schemas/signing'); //拿到导出的数据集模块
var Sign = mongoose.model('Sign', SignSchema, 'sign'); // 编译生成Movie 模型(, , 集合)

module.exports = Sign;