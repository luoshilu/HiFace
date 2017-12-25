<template>
    <div>
      <Headcp></Headcp>
      <Login></Login>
      <div class="router">
        <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:leave="leave"
          v-bind:css="false"
        >
          <router-view class="view"></router-view>
        </transition>
      </div>
      <Footcp></Footcp>
    </div>
</template>
<script>
import Velocity from 'Velocity'
import {mapGetters} from 'vuex'
import Headcp from './components/Headcp'
import Footcp from './components/Footcp'
import Login from './components/Login'
export default {
  name: 'App',
  mounted () {
  },
  data () {
    return {
      touch: '123'
    }
  },
  methods: {
    ...mapGetters(['getMovedir']),
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      var _this = this
      Velocity(el, { translateX: _this.getMovedir()() === 'left' ? '100%' : '-100%' }, { complete: done })
    },
    afterEnter: function (el, done) {
      Velocity(el, { translateX: '0%', opacity: 1 }, { complete: done })
    },
    leave: function (el, done) {
      var _this = this
      Velocity(el, {
        translateX: _this.getMovedir()() === 'left' ? '-100%' : '100%'
      }, { complete: done })
    }
  },
  components: {
    Headcp,
    Footcp,
    Login
  }
}
</script>

<style>

.router {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
}

* {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  box-sizing: border-box;
}
html,body{
  background-color: #ffffff;
  margin: 0 0;
  padding: 0 0;
  overflow-x: hidden;
}
div,p,b,a{
  margin: 0 0;
  padding: 0 0;
}
h1 {
  font-size: 36px;
}
h2 {
  font-size: 30px;
}
input,ul,a{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #111;
  margin: 0;
  padding: 0;
}
ul {
  width: 100%;
}
a:hover,a:focus {
  text-decoration: none!important;
}

/*--  遮罩层------*/
.v-modal {
  z-index: 0!important;
}
/*---------------*/
@media (max-width: 768px) {
  .el-message-box {
    width: 95%!important;
  }
  .el-dialog.el-dialog--tiny {
    width: 95%!important;
  }
}

  /* 标签 */
  .hot-tag {    position: relative;
    height: auto;
    width: 90%;
    margin: 20px auto 0 auto;
    border: 1px solid #ddd;
    border-radius: 4px 4px;
  }
  .htg-head {
    border-bottom: 1px solid #ddd;
    color: #31708f;
  }
  .htg-header {
    font-weight: 500;
    padding: 10px 15px;
    background-color: #f5f5f5;
  }
  .htg-header:before{
    content: "\e236 ";
    font-weight: 900;
  }
  .tagList {
    text-align: center;
    white-space: normal;
    padding: 0 0 10px 10px;
  }
  .tag {
    display: inline-block;
    font-size: 14px;
    padding: 2px 0;
    margin: 6px 5px;
    cursor: pointer;
  }
  .tag:hover {
    opacity: 0.6;
  }
  .y0 {
    color: #00ff00;
  }
  .y1 {
    color: #72afd2;
  }
  .y2 {
    color: #a94442;
  }
  .y3 {
    color: #3c8dbc;
  }
  .y4 {
    color: #777;
  }
</style>
