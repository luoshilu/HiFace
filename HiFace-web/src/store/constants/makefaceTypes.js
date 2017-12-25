
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
  GET_CANVAS: null, // 画布元素
  CTX: null, // 画布内容
  COLOR: null, // 颜色板
  STATUS: null, // 状态
  USE_PEN: null, // 画笔状态
  USE_WORD: null, // 输入文字状态
  NOSTATUS: null, // 无状态
  PEN_SIZE: null, // 画笔大小
  SELECT_IMG: null, // 当前选择图片
  IMGLIST: null, // 图片
  FONT_TYPE: null, // 字体类型
  FONT_SIZE: null, // 字体大小
  USE_CLEAR: null // 橡皮
})

