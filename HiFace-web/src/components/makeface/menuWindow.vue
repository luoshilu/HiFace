<template>
  <!-- 选项卡 -->
  <div>
  <!-- 选择颜色 -->
      <div v-show="getOption === 'pen' || getOption === 'word'">
        <span class="menuhd">颜色板:</span>
        <el-color-picker v-model="getColor" @change="color" show-alpha></el-color-picker>
      </div>

    <!-- 粗细 -->
      <div v-show="getOption === 'pen' || getOption === 'clear'">
        <span class="menuhd">粗细:</span>
        <i class="pen-size" @click="penSize(6)"></i>
        <i class="pen-size sm" @click="penSize(8)"></i>
        <i class="pen-size md" @click="penSize(12)"></i>
        <i class="pen-size lg" @click="penSize(18)"></i>
      </div>

      <!-- 字体 -->
      <div class="fontmenu" v-show="getOption === 'word'">
        <span class="menuhd">字体类型:</span>
        <el-select size="small" @change="fontType(value)" filterable v-model="value" placeholder="选择字体">
          <el-option
            v-for="item in fontList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br>
        <span class="menuhd">字体大小:</span>
         <el-input-number size="small" v-model="inputFontsize" @change="fontSize(inputFontsize)" :min="10" :max="56" :step="4"></el-input-number>
      </div>
      <!-- 铺满 -->
      <div v-show="getOption === 'img'">
        <span class="menuhd">全屏:</span>
          <el-button type="text" @click="bespread"><icon name="qp" scale="2"></icon></i></el-button>
        <br>
        <span class="menuhd">固定:</span>
          <el-button type="text" @click="gdimg" ><icon name="gd" scale="2"></icon></el-button>
      </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        inputword: '',
        fontList: [{
          value: 'Microsoft YaHei',
          label: 'Microsoft YaHei'
        }, {
          value: 'serif',
          label: 'serif'
        }],
        value: '',
        inputFontsize: 24
      }
    },
    props: ['imgcv'],
    computed: {
      ...mapGetters(['getCtx', 'getColor', 'getCanvas', 'getOption', 'getselectImg'])
    },
    methods: {
      ...mapActions(['imglist', 'selectImg', 'color', 'canvas', 'pen', 'img', 'word', 'ctx', 'penSize', 'fontType', 'fontSize']),
      // 铺满
      bespread (e) {
        this.getselectImg().style.left = 0
        this.getselectImg().style.top = 0
        this.getselectImg().width = this.getCanvas.width
        this.getselectImg().height = this.getCanvas.height
      },
      // 固定
      gdimg () {
        var lft = 0
        var tp = 0
        try {
          lft = this.getselectImg().style.left.match(/\d+/)[0] - 0
          tp = this.getselectImg().style.top.match(/\d+/)[0] - 0
        } catch (e) {
          lft = 0
        }
        this.getCtx.drawImage(this.getselectImg(), lft, tp, this.getselectImg().width, this.getselectImg().height)
        this.imglist()
        setTimeout(() => {
          this.selectImg(this.imgcv.$refs.imglist.lastChild)
        }, 100)
      }
    }
  }
</script>