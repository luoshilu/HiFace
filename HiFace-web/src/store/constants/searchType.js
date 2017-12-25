
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
  SEARCH_REQUEST: null, // 搜索内容（包括最新、热门、标签搜索、个人收藏、个人图片）
  SEARCH_SUCCESS: null, // 搜索成功
  SEARCH_FAILURE: null, // 搜索失败
  SEARCHVAL: null, // 搜索关键词
  TOTAL: null, // 总数
  SEARCHURI: null, // uri
  PAGE: null, // 页数
  SHOWIMG: null // 显示详情
})
