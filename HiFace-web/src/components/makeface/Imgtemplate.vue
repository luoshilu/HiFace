<template>
  <div ref="imgTmp" class="imgTmp">
    <el-row>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/1.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/2.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/3.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/4.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/5.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/6.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/7.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/8.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/9.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/10.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/11.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/12.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/13.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/14.jpg' @click="selectImg($event)">
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/15.jpg' @click="selectImg($event)">
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="24" :lg="24">
        <div class="imgContent">
          <img src='../../assets/images/16.jpg' @click="selectImg($event)">
        </div>
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination
        :page-size="num"
        layout="prev, pager, next"
        :total="total"
        @current-change="getImgtmp"
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  // import $ from 'jquery'
  export default {
    mounted () {
      for (var i = 1; i < 17; i++) {
        this.imglist.push(i)
      }
    },
    data () {
      return {
        loading: false,
        imglist: [],
        showImgurl: '',
        imgdt: null,
        num: 8, // 每页图片数量
        total: 18,
        currentPage: 1 // 当前页数
      }
    },
    computed: {
      ...mapGetters(['getCanvas', 'getCtx'])
    },
    methods: {
      ...mapActions(['canvas', 'pen', 'img', 'word', 'ctx', 'penSize', 'fontType', 'fontSize']),
      getImgtmp (currentPage) {
        this.currentPage = currentPage
        this.$refs.imgTmp.scrollTop = 0
        // var _this = this
/*        $.ajax({
          type: 'post',
          url: '/imgTemplate',
          data: {page: _this.currentPage, num: _this.num},
          xhrFields: {
            withCredentials: true
          },
          'Access-Control-Allow-Credentials': true,
          success: function (backDate) {
            // body...
            _this.imglist = backDate.imgList
            _this.total = backDate.total
          }
        }) */
      },
      selectImg (e) {
        this.getCtx.drawImage(e.target, 0, 0, this.getCanvas.width, this.getCanvas.height)
      }
    }
  }
</script>
<style>
  .imgTmp {
    height: 600px;
    overflow-y: scroll;
  }
  @media (max-width: 768px) {
   .imgTmp {
     height: 300px;
   }
 } 
  .imgTmp .imgContent img {
    width: 100%;
    max-width: 400px;
    height: 100%;
  }
</style>