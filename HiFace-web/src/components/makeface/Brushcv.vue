<template>
  <el-button type="text" @click="startPen"><icon name="pen" scale="2"></icon></el-button>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        context: null,
        isDrawing: false,
        t: false
      }
    },
    computed: {
      ...mapGetters(['getCanvas', 'getColor', 'getCtx', 'getPenSize'])
    },
    methods: {
      ...mapActions(['pen']),
      startPen (e) {
        this.pen()
        var canvas = this.getCanvas
        this.context = this.getCtx
        // 事件
        var start = 'mousedown'
        var end = 'mouseout'
        var move = 'mousemove'
        var Fn = Function
        var window = new Fn('return window')()
        var u = window.navigation
        // 判断终端
        this.t = !!/AppleWebKit.*Mobile.*/.test(u) || !!/AppleWebKit/.test(u);

        if (this.t) {
          start = 'touchstart'
          end = 'touchend'
          move = 'touchmove'
        }
        // canvas.onmousedown = this.startDrawing
        canvas.addEventListener(start, this.startDrawing, false)

        canvas.onmouseup = this.stopDrawing
        canvas.addEventListener(end, this.stopDrawing, false)

        canvas.onmouseout = this.stopDrawing

        canvas.onmousemove = this.draw
        canvas.addEventListener(move, this.draw, false)
      },
      startDrawing (e) {
        this.context.lineWidth = this.getPenSize
        this.context.strokeStyle = this.getColor
        // 创建一个新的绘图路径
        this.context.beginPath()
        // 把画笔移动到鼠标位置
        if (!this.t) {
          this.context.moveTo(e.offsetX, parseInt(e.offsetY) + 22);
        } else {
          // this.context.moveTo(e.touches[0].clientX || e.offsetX, parseInt(e.touches[0].clientY || e.offsetY) - 22)
        }
        this.isDrawing = true
      },
      draw (e) {
        if (this.isDrawing) {
          if (!this.t) {
            this.context.lineTo(e.offsetX, parseInt(e.offsetY) + 22)
          } else {
            // this.context.lineTo(e.touches[0].clientX || e.offsetX, parseInt(e.touches[0].clientY || e.offsetY) - 22)
          }
          this.context.stroke()
        }
      },
      stopDrawing (e) {
        this.isDrawing = false
      }
    }
  }
</script>
