var mongoose = require('mongoose');
var imgTotalSchema = require('../schemas/imgtotal'); //拿到导出的数据集模块
var Imgtotal = mongoose.model('Imgtotal', imgTotalSchema, 'imgtotal'); // 编译生成Movie 模型(, , 集合)

module.exports = Imgtotal;