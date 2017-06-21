var mongoose = require('mongoose');

//声明一个mongoons对象
var TagSchema = new mongoose.Schema({
    name: String, // 标签列表
    hot: Boolean,
    meta: {
        createAt: {
            type: Date,
            default: new Date().toLocaleString()
        },
        updateAt: {
            type: Date,
            default: new Date().toLocaleString()
        }
    }
});

// 添加 mongoose 静态方法，静态方法在Model层就能使用
TagSchema.statics.findbytitle = function(title, callback) {
    return this.model('mongoose').find({data: title}, callback);
};
//每次执行都会调用,时间更新操作
TagSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = new Date().toLocaleString();
    }else {
        this.meta.updateAt = new Date().toLocaleString();
    }
    next();
});

//查询的静态方法
TagSchema.statics = {
    findbytitle: function(title, callback) {
        return this.find({first: title}, callback);
    },
    fetch: function(cb) { //查询所有数据
        return this
          .find()
          .exec(cb); //回调
    },
    findById: function(id, cb) { //根据id查询单条数据
        return this
          .findOne({_id: id})
          .exec(cb);
    },
    add: function(data ,cb) {
        return this
            .create(data, cb);
    }
}

//暴露出去的方法
module.exports = TagSchema;
