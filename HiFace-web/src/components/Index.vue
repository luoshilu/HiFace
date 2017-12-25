<template>
  <v-touch v-on:swipeleft="swipeleft" v-bind:swipe-options="{ direction: 'horizontal', threshold: 100 }">
    <div class="search-bg">
      <img src="../assets/bg3.jpg" alt="">
      <el-row type="flex" justify="center">
        <el-col class="search-index" :lg="2" :md="2" :sm="14" :xs="14">
          <h2>HiFace</h2>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <!-- 搜索框 -->
        <el-col class="search-index" :lg="10" :md="10" :sm="22" :xs="22">
          <el-input
            size="large"
            placeholder="大家正在搜: 我们不一样"
            v-model="searchVal2"
            icon="search"
            @keyup.enter.native="search"
            :on-icon-click="search"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="hot-tag">
      <div class="htg-head">
        <p class="htg-header">他们都在搜:</p>
      </div>
      <div class="tagList">
        <el-row type="flex" justify="space-between">
          <el-col :lg="23" :md="23" :sm="23" :xs="23">
            <a class="tag" v-for="word in tagList">
              <span :class="'y' + Math.floor(Math.random() * 4)" @click="searchTag(word, $event)">{{word}}</span>
            </a>
          </el-col>
        </el-row>
      </div>
    </div>
  </v-touch>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  import axios from 'axios'
  export default {
    mounted () {
      this.getTaglist()
    },
    data () {
      return {
        searchVal2: '',
        tagList: []
      }
    },
    methods: {
      ...mapActions(['searchimg', 'searchVal']),
      search () {
        this.$router.push('/all')
        this.searchimg(['all', this.searchVal2])
        this.searchVal(this.searchVal2)
      },
      searchTag (word) {
        this.$router.push('/all')
        this.searchimg(['all', word])
        this.searchVal(word)
      },
      getTaglist () {
        var _this = this
        axios.post('/tag').then(function (res) {
          _this.tagList = res.data.tagList.concat(_this.tagList)
        }).catch(function () {
          console.log('error');
        })
      },
      swipeleft () {
        this.$router.push('/new')
        this.$message({
          type: 'success',
          duration: 1500,
          message: '最新'
        })
      }
    }
  }
</script>
<style>
  .search-index {
    margin-top: 50px;
  }
  .search-bg {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 20%;
    -webkit-background-size:100%;
    background-size:100% 100%;
  }
  .search-bg img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .search-index input {
    color: #343434;
    background-color: rgba(255,255,255,.3);
  }
</style>