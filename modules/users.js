var mongoose = require('mongoose');
var UsersSchema = require('../schemas/users'); //拿到导出的数据集模块
var Users = mongoose.model('Users', UsersSchema, 'userList'); // 编译生成Movie模型
module.exports = Users;
