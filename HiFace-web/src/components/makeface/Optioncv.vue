<template>
  <div class="option">
    <!-- 操作台 -->
    <!-- 文件 -->
    <div class="cell">
      <div class="file-btn">
        <input type="file" @change="onFileChange($event)">
      </div>
    </div>
    <!-- 画笔 -->
    <div class="cell">
      <Brushcv></Brushcv>
    </div>
    <!-- 橡皮 -->
    <div class="cell">
      <Clearcv></Clearcv>
    </div>
    <!-- 字体 -->
    <div class="cell">
      <el-button type="text" @click="addword"><icon name="font" scale="2"></icon></el-button>
    </div>
    <!-- 截图 -->
    <div class="cell">
      <el-button type="text" @click="clip"><icon name="clip" scale="2"></icon></el-button>
    </div>
    <!-- 图片上传 -->
    <!-- <Uploadcv></Uploadcv> -->
  </el-row>
  </div>
</template>
<script>
  import Brushcv from './Brushcv.vue'
  import Clearcv from './Clearcv.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    props: ['fontcv', 'imgcv'],
    components: {
      Brushcv,
      Clearcv
    },
    computed: {
      ...mapGetters(['getCanvas', 'getselectImg'])
    },
    methods: {
      ...mapActions(['word', 'selectImg']),
      addword (e) {
        this.word()
        // 显示文本框
        this.fontcv.starEvent()
      },
      // 选择文件
      onFileChange (e) {
        var file = e.target.files[0] || e.dataTransfer.files[0]
        if (!file) {
          return
        }
        if (!/image\/\w+/.test(file.type)) {
          console.log('文件必须为图片！')
          return false
        }
        if (typeof FileReader === 'undefined') {
          console.log('你的浏览器不支持图片上传,请升级你的浏览器')
          return false
        }
        this.imgcv.createImage(file)
      }
    }
  }
</script>
<style>
  .option {
    display: inline-block;
  }

/*铺满*/
  .bespread {
    display: inline-block;
    position: relative;
    border: 1px solid #20a0ff;
    height: 15px;
    width: 15px;
    background-color: #232323;
  }
  .bespread:before {
    content: '';
    background-color: #fff;
    display: block;
    bottom: 2px;
    left: 2px;
    position: absolute;
    border: 1px solid #20a0ff;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
  }
</style>
