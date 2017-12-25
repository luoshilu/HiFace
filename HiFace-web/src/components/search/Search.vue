<template>
  <div class="searchResult">
    <v-touch v-on:swipeleft="swipeleft" v-on:swiperight="swiperight" v-bind:swipe-options="{ direction: 'horizontal', threshold: 100 }">
      <p v-if="this.getSearchVal&&getimgList.length>0" class="searchTip"><b>为你找到关于 <i class="searchContent">"{{getSearchVal}}"</i> 的{{getimgList.length}}张表情...</b></p>
      <el-row :gutter="20">
        <el-col class="img-col" :xs="24" :sm="8" :md="6" :lg="4" v-for="(imgob,i) in getimgList" :ref="'rank'+(i+1)">
          <div class="imgContent">
            <img class="imgface"
            v-lazy="imgob.imgurl"
            :key="imgob.imgurl"
            :data-option="i + 1"
            :alt="imgob.tag"
            :title="imgob.tag"
            :data-option-date="imgob.createDate"
            :data-option-sc="imgob.sc"
            :data-option-imghot="imgob.imghot"
            :data-option-creator="imgob.creator"
            @click="clickImg($event)">
            <div class="imgMsg">
              <el-row type="flex" justify="center" align="bottom">
                <el-col :span="15">
                  <el-rate
                  v-model="imgob.score"
                  :allow-half="true"
                  ></el-rate>
                </el-col>
                <el-col :span="2" class="builderHead">
                    <img class="headimg" :src="imgob.userhead" alt="">
                </el-col>
                <el-col :span="4" :offset="1">
                  <span class="builderName">{{imgob.creator}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="pagination" v-if="getimgList.length > 0">
        <el-pagination
          :page-size="getNum"
          layout="prev, pager, next"
          :total="getTotal"
          @current-change="changePage"
          >
        </el-pagination>
      </div>
      <div style="text-align:center;color: #787878" v-else>
        <span>啥也没有哦</span>
      </div>
    </v-touch>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import Vue from 'vue'
  import ImgDetails from '../ImgDetails'
  export default {
    mounted () {
      var _this = this
      // 获取子组件
      this.imgdt = new Vue({
        el: 'ele',
        render: ctele => ctele(ImgDetails, {
          props: {
            'showImgurl': _this.showImgurl,
            'ImgTag': _this.ImgTag,
            'Imghot': _this.Imghot,
            'sc': _this.sc,
            'user': _this.user,
            'date': _this.date,
            'showimg': _this.getShowImg
          }
        })
      })
      // this.changePage(1)
    },
    data () {
      return {
        loading: false,
        imgdt: '',
        showImgurl: '',
        ImgTag: '',
        Imghot: 0,
        sc: false,
        user: '',
        date: ''
      }
    },
    computed: {
      ...mapGetters(['getimgList', 'getShowImg', 'getNum', 'getCurrentPage', 'getTotal', 'getUri', 'getSearchVal'])
    },
    components: {
      ImgDetails
    },
    methods: {
      ...mapActions(['searchimg', 'page', 'showimg']),
      clickImg (evt) {
        var Fn = Function
        var document = new Fn('return document')()
        var etgt = evt.target
        this.showimg(true)
        // 初始化数据
        this.showImgurl = etgt.src
        this.ImgTag = etgt.alt
        this.imghot = etgt.getAttribute('data-option-imghot')
        this.sc = etgt.getAttribute('data-option-sc')
        this.date = etgt.getAttribute('data-option-date').replace(/T/i, ' ').slice(0, -5)
        this.user = etgt.getAttribute('data-option-creator')
        // 确定图片详情组件在文档流的哪个位置
        var wd = document.body.clientWidth
        var screenType = 'lg'
        var imgRownumList = {
          xs: 1,
          sm: 3,
          md: 4,
          lg: 6
        }
        if (wd < 768) {
          screenType = 'xs'
        } else if (wd >= 1190) {
          screenType = 'lg'
        } else if (wd >= 981 && wd < 1990) {
          screenType = 'md'
        } else {
          screenType = 'sm'
        }
        // 当前屏幕下每行有多少张图片
        var imgRownum = imgRownumList[screenType]
        var imglt = this.getimgList.length
        if (imglt < imgRownum) {
          imgRownum = imglt
        }
        var showImgrank = evt.target.getAttribute('data-option')
        var ranknum = 'rank' + (parseInt((parseInt(showImgrank) - 1) / imgRownum) + 1) * imgRownum
        var ele = this.$refs[ranknum][0].$el
        // 在元素后插入组件
        this.imgdt.$children[0].show = true
        this.imgdt.$parent = this
        ele.parentNode.insertBefore(this.imgdt.$el, ele.nextSibling)
      },
      changePage (currentPage) {
        var Fn = Function
        var document = new Fn('return document')()
        document.body.scrollTop = 0
        this.page(currentPage)
        this.searchimg(['page', ''])
      },
      swiperight () {
        if (this.getUri === 'hot') {
          this.$router.push('/new')
          this.$message({
            type: 'success',
            duration: 1500,
            message: '最新'
          })
        } else {
          this.$router.push('/index')
          this.$message({
            type: 'success',
            duration: 1500,
            message: '首页'
          })
        }
      },
      swipeleft () {
        if (this.getUri === 'new') {
          this.$router.push('/hot')
          this.$message({
            type: 'success',
            duration: 1500,
            message: '热门'
          })
        } else {
          this.$router.push('/bq')
          this.$message({
            type: 'success',
            duration: 1500,
            message: '标签墙'
          })
        }
      }
    }
  }
</script>
<style>
  .searchResult {
    padding: 0 20px;
  }
  .searchTip {
    color: #8a6d3b;
    padding: 4px 0;
    margin-bottom: 20px;
    background-color: #d9edf7;
  }
  .searchContent {
    font-size: 14px;
    color: #343433;
  }
  /*------------*/
  .img-col.el-col {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .imgContent,.imgface {
    height: 200px;
    border-radius: 5px 5px;
    cursor: pointer;
  }
  .imgface,.imgMsg{
    width: 100%;
    max-width: 375px;
  }
  /*-------------*/
  .imgContent {
    position: relative;
    height: 204px;
    color: #fff;
    border: 1px solid #ddd;
  }
  .imgContent:hover{
    border: 1px solid #975522;
    box-shadow: 0 2px 0px 2px;
  } 
  .imgContent:hover .imgMsg {
    opacity: 1;
  }
  .imgMsg {
    position: absolute;
    border-radius: 0 0 5px 5px;
    height: 28px;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all .5s ease-in-out;
  }
  /*---------------*/
  .el-rate,.builder,.builderHead {
    display: inline-block;
  }
  /*---------------*/
  .builderHead {
    height: 16px;
    width: 16px;
    border: 1px solid #fff;
    border-radius: 8px 8px!important;
  }
  .headimg {
    width: 20px;
    height: 20px;
    opacity: 0;
  }

  .el-rate__icon,.builderName {
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
  }
  .pagination {
    margin: 0 auto;
    padding-top: 12px;
    width:  235px;
  }
  .pagination ul {
    width: auto;
  }
</style>