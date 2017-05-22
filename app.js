var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

// 路由模块
var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var mailverify = require('./routes/mailverify');
var actId = require('./routes/actId');
var login = require('./routes/login');
var upload = require('./routes/upload');
var imgTemplate = require('./routes/imgTemplate');
var tag = require('./routes/tag');
var exit = require('./routes/exit');

// 连接mogoodb数据库
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');

// 将session连接redis缓存
var newSession = require('./conf/newSession')


// 当前用户
var nowUser = require('./middlewares/queryUser');

// 允许其他可请求服务的端口
app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req,res,next){
  // console.log(req.headers);
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //需要显示设置来源
  res.header("Access-Control-Allow-Credentials",true); //带cookies
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

// 查询当前用户
app.use(nowUser);

// 新增session 存入redis 
app.use(newSession);

// test
app.use(function (val, req, res, next) {
  console.log('val:');
  console.log(val);
  console.log(req.session);
  next() // otherwise continue
})


// 路由
app.use('/', index);
app.use('/users', users);
app.use('/search', search);
app.use('/mailverify', mailverify);
app.use('/actId', actId);
app.use('/login', login);
app.use('/upload', upload);
app.use('/imgTemplate', imgTemplate);
app.use('/tag', tag);
app.use('/exit', exit);
// 404中间件
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
