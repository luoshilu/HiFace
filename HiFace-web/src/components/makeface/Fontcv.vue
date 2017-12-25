<template>
  <div
    v-show="getOption === 'word'"
    :style="'left:'+ left +'px;' + 'top:' + top + 'px'"
    class="inputBox">
    <textarea
       row="1"
       ref="Input" type="text"
       :readonly="getOption !== 'word'"
       :style="'font-size:' + getFontSize + 'px;' + 'font-family: ' + getFontType + ';' + 'color:' + getColor + ';'"
       v-model="inputword">
     </textarea>
     <br>
     <span ref="mvInput"><icon name="move" :scale="2" @click="drawText"></icon></span>
     <span @click="drawText"><icon class="inputok" name="ok" :scale="2" @click="drawText"></icon></span>
     <span @click="clear"><icon name="clear" :scale="2"></icon></span>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        left: 0,
        top: 0,
        inputword: ''
      }
    },
    computed: {
      ...mapGetters(['getCanvas', 'getColor', 'getOption', 'getCtx', 'getFontType', 'getFontSize'])
    },
    methods: {
      ...mapActions(['word', 'nostatus']),
      starEvent () {
        var _this = this
        this.left = 0
        this.top = 0
        var Fn = Function
        var window = new Fn('return window')()
        this.$refs.mvInput.onmousedown = function (e) {
          var clickx = e.screenX
          var clicky = e.screenY
          var lf = _this.left
          var tp = _this.top
          window.onmousemove = function (e) {
            // 计算鼠标移动距离 确定输入框位置
            var nx = lf + (e.screenX - clickx)
            var ny = tp + (e.screenY - clicky)

            // 控制边框
            _this.left = nx > 0 && nx < _this.getCanvas.offsetWidth ? nx : _this.left
            _this.top = ny > 0 && ny < _this.getCanvas.offsetHeight ? ny : _this.top
            // 控制输入框宽度
            if (_this.left + _this.$refs.Input.width > _this.getCanvas) {
              _this.width = _this.getCanvas.width - _this.left.width
            }
          }
          window.onmouseup = function () {
            window.onmousemove = null
            this.onmouseup = null
          }
        }
      },
      drawText () {
        this.getCtx.fillStyle = this.getColor
        this.getCtx = this.old_ctx
        this.getCtx.font = this.getFontSize + 'px ' + this.getFontType
        // 分析输入字符,回车换行
        var iwd = this.inputword.split(/\n/ig)
        for (let i in iwd) {
          this.getCtx.fillText(iwd[i], this.left, this.top + (this.getFontSize) * (parseInt(i) + 1))
        }
        this.nostatus()
      },
      clear () {
        this.inputword = ''
      }
    }
  }
</script>
<style>
  .inputBox {
    position: absolute;
    left: 0;
    font-size: 24px;
    white-space: nowrap;
  }
  .inputBox textarea {
    padding: 0;
    outline: none;
    max-width: 360px;
    background-color: rgba(255, 255, 255, 0);
  }
  .inputok:hover {
    border-radius: 1em 1em;
    background-color: rgb(23, 184, 131)!important;
  }
  .svg-icon {
    cursor: pointer;
  }
</style>

