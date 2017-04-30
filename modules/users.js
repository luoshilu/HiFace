var mongoose = require('mongoose');
var UsersSchema = require('../schemas/users'); //拿到导出的数据集模块
var Users = mongoose.model('Users', UsersSchema, 'userList'); // 编译生成Movie 模型(, , 集合)

module.exports = Users;/*db.auth({"admin":"123"})*/