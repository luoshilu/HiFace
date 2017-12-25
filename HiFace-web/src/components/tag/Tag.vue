<template>
  <div class="bq">
    <v-touch v-on:swipeleft="swipeleft" v-on:swiperight="swiperight" v-bind:enabled="{ swipeup: false, swipedown: false }">
      <div class="hot-tag">
        <div class="htg-head">
          <p class="htg-header">标签墙:</p>
        </div>
        <div class="tagList">
          <el-row type="flex" justify="center">
            <el-col :lg="22" :md="22" :sm="22" :xs="22">
              <a class="tag" v-for="word in tagList">
                <span :class="'y' + Math.floor(Math.random() * 4)" @click="searchTag(word, $event)">{{word}}</span>
              </a>
            </el-col>
          </el-row>
        </div>
      </div>
    </v-touch>
  </div>
</template>
<script type="text/javascript">
  import axios from 'axios'
  import {mapActions} from 'vuex'
  export default {
    mounted () {
      this.getTaglist()
    },
    data () {
      return {
        colorList: ['y1', 'y2', 'y3', 'y4'],
        tagList: [],
        aList: {}
      }
    },
    methods: {
      ...mapActions(['searchimg', 'searchVal']),
      getTaglist () {
        var _this = this
        axios.post('/tag')
        .then((back) => {
          _this.tagList = back.data.tagList.concat(_this.tagList)
        })
      },
      searchTag (word) {
        this.$router.push('/all')
        this.searchimg(['all', word])
        this.searchVal(word)
      },
      swiperight () {
        this.$router.push('/hot')
        this.$message({
          type: 'success',
          duration: 1500,
          message: '热门'
        })
      },
      swipeleft () {
        this.$router.push('/make')
        this.$message({
          type: 'success',
          duration: 1500,
          message: '制作表情包'
        })
      }
    }
  }
</script>
<style type="text/css">
  .bq {
    display: inline-block;
    white-space: normal;
    width: 100%;
  }
</style>