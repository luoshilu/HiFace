<template>
  <div>
    <div ref="imglist" class="imgcv">
      <img
        v-for="imgsrc in getImglist()"
        :style="'left:' + lf + ';' + 'top:' + tp"
        :src="imgsrc"
        @mousedown="mousedw($event)"
        @mousemove="mousemv($event)"
        @dragstart.prevent
        :class="mouseStyle"
        :width="wd"
        :height="ht"
        >
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {
        mouseStyle: 'ms-move',
        wd: 0,
        hd: 0,
        lf: 0,
        tp: 0
      }
    },
    mounted () {
      this.hd = this.getCanvas ? this.getCanvas.width : 0
      this.wd = this.getCanvas ? this.getCanvas.width : 0
    },
    computed: {
      ...mapGetters(['getCanvas', 'getselectImg', 'getCtx', 'getImglist'])
    },
    methods: {
      ...mapActions(['selectImg', 'imglist', 'status']),
      createImage (file) {
        var _this = this
        var Fn = Function
        // vue中不能识别FileReader对象，应使用new Function()来获取这个对象
        var Fr = new Fn('return FileReader')()
        var reader = new Fr()
        reader.readAsDataURL(file)
        reader.onload = function () {
          var Image = new Fn('return Image')()
          var img = new Image()
          img.src = this.result
          // 根据图片大小来填充canvas
          var cvw = _this.getCanvas.width
          var cvh = _this.getCanvas.height
          if (img.width > cvw) {
            _this.wd = cvw
          }
          if (img.height > cvh) {
            _this.ht = cvh
          }
          _this.imglist(this.result)
          // 默认最后一张图片为选中
          setTimeout(() => {
            _this.selectImg(_this.$refs.imglist.lastChild)
          }, 100)
          // 图片状态
          _this.status('img')
        }
      },
      // 鼠标在图片上移动时获取鼠标样式
      mousemv: function (e) {
        // 返回鼠标样式
        this.mouseStyle = this.mousedir(e)
      },
      // 鼠标点击
      mousedw: function (e) {
        this.status('img')
        // 选择某张图片
        var img = e.target
        this.selectImg(img)
        var _this = this
        var ele = e.target
        // 当前鼠标位置（相对文档）
        var lcx = e.screenX
        var lcy = e.screenY
        // 当前图片宽高
        var ht = ele.height
        var wd = ele.width
        // 当前图片left 和 top
        try {
          // left + top + height + width
          var lf = ele.style.left.match(/\d+/)[0]
          var tp = ele.style.top.match(/\d+/)[0]
        } catch (n) {
          lf = 0
          tp = 0
        }
        // 根据鼠标样式选择后续操作
        var mouseopt = {
          // document对象
          'doc': (function () {
            var Fn = Function
            var doc = new Fn('return document')()
            return doc
          })(),
          // 移动
          'ms-move': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var leftX = lf - 0 + (evt.screenX - lcx)
              var topY = tp - 0 + (evt.screenY - lcy)
              if (leftX > 0 && leftX < (_this.getCanvas.width - wd)) { ele.style.left = leftX + 'px' }
              if (topY > 0 && topY < (_this.getCanvas.height - ht)) { ele.style.top = topY + 'px' }
              _this.preventmouse(this)
            }
          },
          // 上
          'ms-n-resize': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var mv = evt.screenY - lcy
              var topY = tp - 0 + mv
              if (mv > (ht - 5)) {
                return
              }
              if (topY > 0 && topY < (_this.getCanvas.height - ht)) {
                ele.style.top = topY + 'px'
                ele.height = ht - mv
              }
              ele.width = wd
              _this.preventmouse(this)
            }
          },
          // 左
          'ms-w-resize': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var mv = evt.screenX - lcx
              var leftX = lf - 0 + mv
              if (mv > (wd - 5)) {
                return
              }
              if (leftX > 0 && leftX < (_this.getCanvas.width - wd)) {
                ele.style.left = leftX + 'px'
                ele.width = wd - mv
              }
              ele.height = ht
              _this.preventmouse(this)
            }
          },
          // 右
          'ms-e-resize': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var mv = evt.screenX - lcx
              if (Math.abs(mv) > (wd - 10) && mv < 0) {
                return
              }
              if (lf - 0 + wd + mv < _this.getCanvas.width) {
                ele.width = wd + mv
              }
              ele.height = ht
              _this.preventmouse(this)
            }
          },
          // 下
          'ms-s-resize': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var mv = evt.screenY - lcy
              if (Math.abs(mv) > (ht - 10) && mv < 0) {
                return
              }
              if (tp - 0 + ht + mv < _this.getCanvas.height) {
                ele.height = ht + mv
              }
              ele.width = wd
              _this.preventmouse(this)
            }
          },
          // 右上
          'ms-ne-resize': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var mvx = evt.screenX - lcx
              var mvy = evt.screenY - lcy
              var topY = tp - 0 + mvy
              if (mvy > (ht - 5) || ((Math.abs(mvx) > (wd - 10)) && mvx < 0)) {
                return
              }
              if (lf - 0 + wd + mvx < _this.getCanvas.width) {
                ele.width = wd + mvx
              }
              if (topY > 0 && topY < (_this.getCanvas.height - ht)) {
                ele.height = ht - mvy
                ele.style.top = topY + 'px'
              }
              _this.preventmouse(this)
            }
          },
          // 左上
          'ms-nw-resize': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var mvx = evt.screenX - lcx
              var mvy = evt.screenY - lcy
              var leftX = lf - 0 + mvx
              var topY = tp - 0 + mvy
              if (mvy > (ht - 5) || mvx > (wd - 5)) {
                return
              }
              if (leftX > 0 && leftX < (_this.getCanvas.width - wd)) {
                ele.style.left = leftX + 'px'
                ele.width = wd - mvx
              }
              if (topY > 0 && topY < (_this.getCanvas.height - ht)) {
                ele.style.top = topY + 'px'
                ele.height = ht - mvy
              }
              _this.preventmouse(this)
            }
          },
          // 左下
          'ms-sw-resize': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var mvx = evt.screenX - lcx
              var mvy = evt.screenY - lcy
              var leftX = lf - 0 + mvx
              if ((Math.abs(mvy) > (ht - 10)) && mvy < 0 || mvx > (wd - 5)) {
                return
              }
              if (leftX > 0 && leftX < (_this.getCanvas.width - wd)) {
                ele.style.left = leftX + 'px'
                ele.width = wd - mvx
              }
              if (tp - 0 + ht + mvy < _this.getCanvas.height) {
                ele.height = ht + mvy
              }
              _this.preventmouse(this)
            }
          },
          // 右下
          'ms-se-resize': function (ele, lcx, lcy, ht, wd, lf, tp) {
            this.doc.onmousemove = function (evt) {
              var mvx = evt.screenX - lcx
              var mvy = evt.screenY - lcy
              if (mvy > (ht - 5) || (Math.abs(mvx) > (wd - 10)) && mvx < 0) {
                return
              }
              if (lf - 0 + wd + mvx < _this.getCanvas.width) {
                ele.width = wd + mvx
              }
              if (tp - 0 + ht + mvy < _this.getCanvas.height) {
                ele.height = ht + mvy
              }
              _this.preventmouse(this)
            }
          }
        }
        // 开始操作
        try {
          mouseopt[_this.mouseStyle](ele, lcx, lcy, ht, wd, lf, tp)
        } catch (n) {
          // nothing..
        }
      },
      // 根据鼠标位置返回鼠标样式（上右下左）
      mousedir: function (e) {
        // 判断鼠标位置 上右下左
        var t = e.offsetY < 10
        var r = e.target.width - 10 < e.offsetX
        var b = e.target.height - 10 < e.offsetY
        var l = e.offsetX < 10
        var onedri = {
          'ms-move': !t && !r && !b && !l,
          'n': t,
          's': b,
          'e': r,
          'w': l
        }
        var dir = ''
        for (let style in onedri) {
          if (onedri[style]) {
            if (style === 'ms-move') {
              return 'ms-move'
            } else {
              dir += style
            }
          }
        }
        return 'ms-' + dir + '-resize'
      },
      //
      preventmouse (t) {
        t.onmouseup = function () {
          t.onmousemove = null
          t.onupmouseup = null
        }
      }
    }
  }
</script>
<style>
  .imgcv img {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #4db3ff;
  }
  input[type=file] {
    font-size: 0;
  }
  input::-webkit-file-upload-button {
    background: #efeeee;
    color: #333;
    border: 0;
    padding: 6px 10px;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: 1px 1px 5px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.12);
    cursor: pointer;
  }
  .imgcv img:hover {
    border: 2px dotted #4db3ff;
  }
  // 鼠标样式
  .ms-move {
    cursor: move;
  }
  .ms-n-resize,.ms-w-resize,.ms-s-resize,.ms-e-resize
  ,.ms-ne-resize,.ms-nw-resize,.ms-sw-resize,.ms-se-resize {
    cursor: crosshair;
  }
</style>