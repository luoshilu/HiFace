<template>
  <transition name="imgDet" v-if="showimg">
    <el-col ref="imgele" class="imgdettails">
    <el-button style="position:absolute;right:0;top:0;" size="mini" :plain="true" type="info" icon="close" v-on:click="close"></el-button>
        <el-row>
          <el-col class="img-show" :md="12" :sm="24" :xs="24">
              <img :src="showImgurl">
          </el-col>
          <el-col class="img-details" :md="12" :sm="24" :xs="24">
          <div class="msg">
            <div class="active">
              <div class="sc">
                <span><span v-show="sc">已</span>收藏</span> <i :class="{'selected': sc}" @click="scimg" class="el-icon-star-on"></i>
                <el-button type="warning" size="mini" @click="download">
                  <span>下载</span> <icon name="download" scale="1"></icon>
                </el-button>
              </div>
            </div>
            <el-tag>{{ImgTag}}</el-tag>
            <div class="msg-foot">
              <el-col :md="14" :xs="24">
                <icon name="hot" scale="2"></icon> <span>表情包热度 {{Imghot}}</span>
              </el-col>
              <el-col :md="10" :xs="24">
                <icon name="upload" scale="2"></icon> <span> 由 <el-button type="text">{{user}}</el-button> 在 {{date}} 上传</span>
              </el-col>
            </div>
          </div>
            <div class="comment-list">
              <p>暂时无人评论~</p>
            </div>
            <el-rate
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                v-model="value4"
                show-text>
            </el-rate>
            <div class="comment">
              <el-input type="textarea" name="" :rows="2" placeholder="评价一下吧"></el-input>
              <div class="comment-btn">
                <el-button type="info" size="small">评论</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
    </el-col>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    props: ['showImgurl', 'ImgTag', 'Imghot', 'sc', 'user', 'date', 'showimg'],
    data () {
      return {
        value4: null,
        show: true
      }
    },
    computed: {
      ...mapGetters(['getShowImg', 'getUsername'])
    },
    methods: {
      close () {
        this.showimg = false
      },
      scimg () {
        axios.post('/sc', qs({}))
        .then(() => {
          console.log('test');
        })
        this.sc = !this.sc
      },
      open () {
        this.show = true
      },
      download () {
        var Fn = Function
        var document = new Fn('return document')()
        var window = new Fn('return window')()
        var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        link.href = this.showImgurl
        link.download = 'hahah'
        var event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        link.dispatchEvent(event)
      }
    }
  }

</script>
<style>
  .imgdettails {
    position: relative;
    padding: 20px 20px;
    border-radius: 4px 4px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    clear: both;
  }
  .el-rate__text {
    color: #fff!important;
  }
  .img-show {
    padding-right: 15px;
    padding-bottom: 40px;
    text-align: center;
  }
  .img-show img {
    width: 80%;
    max-width: 500px;
    max-height: 500px;
    height: 80%;
  }
  .img-show,.img-details {
    padding-left: 20px;
    margin: 0 auto;
  }
  .msg {
    border-bottom: 1px solid #dfdfdf;
    border-top: 1px solid #dfdfdf;
    padding-top: 12px;
  }
  .msg-foot {
    font-size: 12px;
    margin: 10px 0 0 0;
  }
  .msg-foot:after {
    content: '.';
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
  }
  .comment-list {
    border: 1px solid #dfdfdf;
    border-radius: 4px 4px;
    height: 150px;
    padding: 20px;
    margin: 20px 0;
  }
  .active {
    position: relative;
  }
  .sc {
    position: absolute;
    right: 0;
    font-size: 12px;
  }
  .sc .el-icon-star-on:hover {
    cursor: pointer;
    color: rgb(247, 186, 42);
  }
  .sc .selected {
    color: rgb(247, 186, 42);
  }
  .comment {
    position: relative;
    bottom: 0;
  }
  .comment-btn {
    display: inline-block;
    width: 100%;
    margin: 8px 0 0 0;
    text-align: right;
  }
  .imgDet-enter-active {
    height: 0;
    transition: all .3s ease;
  }
  .imgDet-leave-active {
    height: 360px;
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .imgDet-enter, .imgDet-leave-active {
    transform: translateY(-50px);
    opacity: 0;
  }
</style>