// 使键值相等，如LOGIN : null 变为 LOGIN : LOGIN
function keyMirror (obj) {
  if (obj instanceof Object) {
    var _obj = Object.assign({}, obj)
    var _keyArray = Object.keys(obj)
    _keyArray.forEach(function (key) {
      _obj[key] = key
    })
    return _obj
  }
}

module.exports = keyMirror({
  LOGIN: null, // 登录界面
  SIGNIN: null, // 注册界面
  TIP: null, // 提示界面
  LOGINING: null, // 登录中
  SIGNINING: null, // 注册中
  CLOSEALL: null, // 关闭
  LOGINSTATE: null, // 登录状态
  USERNAME: null, // 用户名
  ABOUT: null, // 介绍
  HEADURL: null, // 头像url,
  MOVEDIR: null // 动画移动方向
})
