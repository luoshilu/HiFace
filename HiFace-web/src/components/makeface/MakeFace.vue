<template>
  <div class="makeface">
    <v-touch ref="mk" v-on:swiperight="swiperight" v-bind:swipe-options="{ direction: 'horizontal', threshold: 100 }">
      <el-row>
        <el-col class="mb" :lg="8" :md="8" :sm="24" :xs="24">
          <div class="cvs-head">
            <p>先来一套模板</p>
          </div>
          <Imgtmp></Imgtmp>
        </el-col>
      
        <el-col class="cvs-box" :lg="8" :md="8" :sm="24" :xs="24">
          <div class="cvs-head">
            <p>画板</p>
          </div>
          <div class="cvs">
              <v-touch v-on:panstart="tapcvs" v-on:panend="leavecvs">
                <img ref="dradb" class="dradb">
                <Imgcv ref="imgcv"></Imgcv>
                <Fontcv ref="fontcv"></Fontcv>
                <canvas id="dra" ref="cv" :width="cvs_width" height="350px" class="dra"></canvas>
              </v-touch>
          </div>
        </el-col>
      
        <el-col class="menu" :lg="6" :md="6" :sm="24" :xs="24">
          <div class="menu-head">
            <p>菜单栏</p>
          </div>
          <div class="tool set">
            <MenuWindow :imgcv="this.$refs.imgcv"></MenuWindow>
          </div>
      
          <!-- 操作 -->
          <div class="tool">
            <Optioncv :imgcv="this.$refs.imgcv" :fontcv="this.$refs.fontcv"></Optioncv>
          </div>
      
          <!-- 选项 -->
          <div class="tool">
            <Menucv></Menucv>
          </div>
        </el-col>
        <el-col class="tip" :lg="6" :md="6" :sm="24" :xs="24">
          <!-- 文字说明 -->
          <div class="menu-head">
            <p>菜鸟教程:</p>
          </div>
          <el-steps :space="100" :active="active">
            <el-step title="步骤 1" description="选择文件或模板" icon="picture"></el-step>
            <el-step title="步骤 2" description="编辑" icon="edit"></el-step>
            <el-step title="步骤 3" description="登录并保存" icon="upload"></el-step>
          </el-steps>
        </el-col>
      </el-row>
    </v-touch>
  </div>
</template>
<script>
  import Imgcv from './Imgcv.vue'
  import MenuWindow from './menuWindow.vue'
  import Fontcv from './Fontcv.vue'
  import Menucv from './Menucv.vue'
  import Uploadcv from './Uploadcv.vue'
  import Optioncv from './Optioncv.vue'
  import Imgtmp from './Imgtemplate.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    mounted () {
      var _this = this
      // 使画布大小等于父元素大小，img高宽设为100%，img高宽=父元素高宽，使画布大小=img
      this.cvs_width = this.$refs.dradb.width
      // 保存canvas ctx
      this.canvas(this.$refs.cv)
      this.ctx(this.$refs.cv.getContext('2d'))
      // 步骤动画
      setInterval(function () {
        if (_this.active === 3) {
          _this.active = 0
        } else {
          _this.active = _this.active + 1
        }
      }, 1000)
    },
    data () {
      return {
        active: 0,
        // canvas宽度
        cvs_width: 0
      }
    },
    components: {
      Imgcv,
      Fontcv,
      Menucv,
      Uploadcv,
      Optioncv,
      Imgtmp,
      MenuWindow
    },
    computed: {
      ...mapGetters(['getCanvas', 'getCtx', 'getOption'])
    },
    methods: {
      ...mapActions(['canvas', 'ctx']),
      swiperight () {
        this.$router.push('/bq')
        this.$message({
          type: 'success',
          duration: 1500,
          message: '标签墙'
        })
      },
      tapcvs () {
        // console.log(this.getOption());
        this.$refs.mk.disableAll()
      },
      leavecvs () {
        setTimeout(() => {
          this.$refs.mk.enableAll()
        }, 100)
      }
    }
  }
</script>
<style>
  .makeface {
    position: relative;
    display: inline-block;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .dradb {
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    right: 0;
    visibility: hidden
  }
  .dra {
    border: 1px solid #999;
    box-shadow: 0 0 2px 2px #344444;
    height: 350px;
  }
  /*不同操作下的鼠标样式*/
  .dra.pen {
    cursor: url('../../svg/msl-pen.png'),auto;
    color: red;
  }
  .mb,.menu,.cvs-box,.tip {
    padding: 0 20px;
    margin: 0 0 20px 0;
    border: 1px solid #ddd;
  }
  .menuhd {
    font-size: 12px;
    color: #676767;
  }
  .cvs {
    position: relative;
  }

  .cvs-head,.menu-head {
    font-weight: 500;
    margin: 10px 0;
    padding: 5px 15px;
    background-color: #fcf8e3;
    border: 1px solid #faebcc;
    color: #31708f;
  }
  .file-btn {
    float: left;
  }
  .tool {
    margin: 8px 0;
    border: 1px solid #ddd;
    white-space: nowrap;
    overflow: none;
    height: 40px;
  }
  .tool.set {
    height: 110px;
    background-color: #efefef;
  }

  /*画笔粗细*/
  .pen-size {
    margin: 0 10px;
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 2px 2px;
    box-shadow: 0 0 1px 1px;
    background-color: #000;
    cursor: pointer;
  }
  .pen-size:hover {
    background-color: #565656;
  }
  .pen-size.sm {
    width: 6px;
    height: 6px;
    border-radius: 3px 3px;
  }
  .pen-size.md {
    width: 8px;
    height: 8px;
    border-radius: 4px 4px;
  }
  .pen-size.lg {
    width: 12px;
    height: 12px;
    border-radius: 6px 6px;
  }
  /*文本说明*/
  .tip {
    position: relative;
    text-align: left;
  }
  /*重设置element样式*/
  .tool .el-select input {
    width: 100px;
  }

  /*子组件样式*/
  .cell {
    display: inline-block;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    float: left;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
  }
</style>