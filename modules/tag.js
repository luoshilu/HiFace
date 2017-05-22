var mongoose = require('mongoose');
var TagSchema = require('../schemas/tag'); //拿到导出的数据集模块
var Tag = mongoose.model('Tag', TagSchema, 'Tag'); // 编译生成Movie 模型(, , 集合)

module.exports = Tag;