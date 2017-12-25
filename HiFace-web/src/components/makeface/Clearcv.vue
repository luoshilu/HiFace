<template>
  <el-button type="text" @click="startClear" size="large"><icon name="xp" scale="2"></icon></el-button>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        context: null,
        isClear: false
      }
    },
    computed: {
      ...mapGetters(['getCanvas', 'getOption', 'getCtx', 'getPenSize'])
    },
    methods: {
      ...mapActions(['clear']),
      startClear (e) {
        this.clear()
        var canvas = this.getCanvas
        this.context = this.getCtx
        canvas.onmousedown = this.startClearing
        canvas.onmouseup = this.stopClear
        canvas.onmouseout = this.stopClear
        canvas.onmousemove = this.move
      },
      startClearing (e) {
        console.log(this.getPenSize)
        this.context.clearRect(e.offsetX, e.offsetY, this.getPenSize * 2, this.getPenSize * 2)
        this.isClear = true
      },
      move (e) {
        if (this.isClear) {
          this.context.clearRect(e.offsetX, e.offsetY, this.getPenSize * 2, this.getPenSize * 2)
        }
      },
      stopClear (e) {
        this.isClear = false
      }
    }
  }
</script>
<style>
  .icon-clear {
    display: inline-block;
    position: relative;
    border: 1px solid #20a0ff;
    height: 15px;
    width: 15px;
    border-radius: 5px 5px;
  }
  .icon-clear:before {
    content: '';
    display: block;
    bottom: 2px;
    left: 2px;
    position: absolute;
    border: 1px solid #20a0ff;
    width: 8px;
    height: 8px;
    border-radius: 5px 5px;
    transform: rotate(45deg);
  }
  .icon-clear:after {
    content: ' 。';
    display: block;
    bottom: 3px;
    left: 4px;
    border-radius: 5px 5px;
    position: absolute;
  }
</style>
