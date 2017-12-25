<template>
  <div class="header" :class="{'no-top':smallHead}">
    <el-row :gutter="0">
    <!-- logo -->
      <el-col :lg="3" :md="3" :sm="2" :xs="2" :offset="1" class="logo">
        <router-link :to="{path:'/'}">
          <img alt="" src="../assets/logo.png" style="position:absolute;display: none">
          <span class="logo-font" @click="searchimg">HiFace</span>
        </router-link>
      </el-col>
      <!-- 菜单导航 -->
      <el-col class="nav-list" :lg="13" :md="13" :sm="24" :xs="24" v-bind:class="{'show':!listStatic}">
        <ul>
          <li class="nav-li" is="el-col" :lg="4" :md="4" :sm="24" :xs="24" v-for="(list,key) in lists">
            <router-link :to="{path:key}"><el-button type="text" :data="key" size="large" @click="closeNav()">{{list}}</el-button></router-link>
          </li>
        </ul>
      </el-col>
      <!-- 搜索框 -->
      <el-col class="search" :lg="3" :md="3" :sm="10" :xs="10">
          <el-input size="small"
            placeholder="搜索..."
            v-model="val"
            icon="search"
            @keyup.enter.native="searchTag"
            :on-icon-click="searchTag"></el-input>
      </el-col>
      <!-- 登录注册 -->
      <el-col class="head-button" :class="{'lg-hidden': getLoginState}" :lg="2" :md="2" :sm="9" :xs="9" :offset="1">
        <el-button size="small" :plain="true" type="primary" v-on:click="loginPage">登录</el-button>
        <el-button size="small" :plain="true" type="warning" v-on:click="signin">注册</el-button>
      </el-col>
      <!-- 已登录 -->
      <el-col :class="{'lg-show':getLoginState, 'lg-hidden': !getLoginState}" :lg="4" :md="4" :sm="7" :xs="8">

          <el-row :gutter="20">
            <el-col :span="20" :offset="4">
              <el-dropdown class="userMsg" trigger="click" @command="menuCommand">
                <el-badge class="item">
                  <img ref="headImg1" class="headImg1" :src="getHeadurl()"></img>
                    {{getUsername()}}
                  <i class="el-icon-caret-bottom arrow"></i>
                </el-badge>

                <el-dropdown-menu slot="dropdown">

                  <el-dropdown-item command="edit">
                    编辑信息
                  </el-dropdown-item>

                  <el-dropdown-item>
                    我的收藏
                  </el-dropdown-item>

                  <el-dropdown-item command="searchMyface">
                    我的表情包
                  </el-dropdown-item>

                  <el-dropdown-item command="exit">
                    退出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>

          <el-dialog
            title="编辑信息"
            :visible.sync="dialogVisible"
            size="tiny">
            <el-row>
              <el-col :span="6" :offset="9">
                <div class="edithead">
                  <i class="el-icon-edit"></i>
                  <input type="file" class="fileimg" @change="onFileChange($event)">
                  <img ref="headImg2" class="headImg2" :src="headurl" alt="">
                  </input>
                </div>
              </el-col>
              <el-col :span="18" :offset="3">
                <span>昵称</span>
                <el-input placeholder="昵称" v-model="editName" size="small"></el-input>
              </el-col>
              <el-col :span="18" :offset="3">
                <span>个人介绍</span>
                <el-input
                placeholder="介绍一下你自己吧"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 10}"
                v-model="editAbout"
                ></el-input>
              </el-col>
              <el-col :span="18" :offset="12">
                <el-button type="text">修改邮箱</el-button>
                <el-button type="text">修改密码</el-button>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editOver">确 定</el-button>
            </span>
          </el-dialog>

      </el-col>
      <!-- 打开菜单按钮 -->
      <el-col class="nav-btn" :sm="1" :xs="1">
       <el-button size="small" v-on:click="cgList" v-bind:class="{'el-icon-minus':listStatic, 'el-icon-close':!listStatic}"></el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    mounted () {
      var Fn = Function
      var _this = this
      var window = new Fn('return window')()
      window.onscroll = function (e) {
        var nowh = window.pageYOffset
        if (nowh > 60 && !_this.smallHead) {
          _this.smallHead = true
        }
        if (nowh < 60 && _this.smallHead) {
          _this.smallHead = false;
        }
      }
      // 访问服务器
      axios.post('/')
      .then(function (res) {
        if (res.data.name) {
          _this.username(res.data.name)
          _this.setabout(res.data.about)
          _this.setheadurl(res.data.headurl)
          _this.loginState()
        }
      })
      // 监听vuex中的state
      this.$store.watch(this.$store.getters.getUsername, username => {
        _this.editName = username
      })
      this.$store.watch(this.$store.getters.getAbout, about => {
        _this.editAbout = about
      })
      this.$store.watch(this.$store.getters.getHeadurl, headurl => {
        _this.headurl = headurl
      })
    },
    data () {
      return {
        lists: {'index': '首页', 'new': '最新', 'hot': '热门', 'bq': '标签墙', 'make': '表情制作'},
        listStatic: true,
        smallHead: false,
        dialogVisible: false,
        val: '',
        editName: '',
        editAbout: '',
        edithead: '',
        headurl: '#'
      }
    },
    computed: {
      ...mapGetters(['getUsername', 'getLoginState', 'getUri', 'getAbout', 'getHeadurl'])
    },
    methods: {
      ...mapActions(['loginPage', 'signin', 'loginState', 'username', 'searchimg', 'setabout', 'setheadurl', 'searchVal']),
      searchTag () {
        if (this.getUri === '') {
          this.$router.push('/all')
          this.searchimg(['all', this.val])
        } else {
          this.searchimg(['', this.val])
        }
        this.searchVal(this.val)
      },
      menuCommand (command) {
        this[command]()
      },
      edit () {
        this.dialogVisible = true
      },
      editOver () {
        var _this = this
        var Fn = Function
        var window = new Fn('return window')()
        var XMLHttpRequest = new Fn('return XMLHttpRequest')()
        function getfileSize (str) {
          if (str.indexOf('=') > 0) {
            var indexOf = str.indexOf('=')
            str = str.substring(0, indexOf)// 把末尾的’=‘号去掉
          }

          var fileSize = parseInt(str.length - (str.length / 8) * 2)
          return fileSize
        }
        // 上传头像
        function uphead () {
          axios.post('/upload/head/', qs.stringify({'username': _this.getUsername()}))
          .then(function (res) {
            var token = res.data.uptoken
            var id = res.data.id
              // 把字符串转换成json
            function strToJson (str) {
              var json = JSON.parse(str)
              return json
            }
            // 以用户id + 图片编号 命名
            var url = 'http://upload.qiniu.com/putb64/' + getfileSize(_this.edithead.replace(/^.*?,/, '')) + '/key/' + window.btoa(id + '/1')
            var xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                var keyText = xhr.responseText
                var sendData = {}
                // 返回的key是字符串，需要装换成json
                keyText = strToJson(keyText)
                if (keyText.error) {
                  return
                } else {
                  sendData = {
                    name: _this.getUsername,
                    key: keyText.key
                  }
                  // 上传成功
                  axios.post('/upload/head/result', qs.stringify(sendData))
                  .then(function (result) {
                    if (result.data.data) {
                      // 保存成功 弹窗
                      console.log('已经保存头像')
                    }
                  })
                }
              }
            }
            xhr.open('post', url, true)
            xhr.setRequestHeader('Content-Type', 'application/octet-stream')
            xhr.setRequestHeader('Authorization', 'UpToken ' + token)
            xhr.send(_this.edithead.replace(/^.*?,/, ''))
          })
        }

        axios.post('/users/edit', qs.stringify({
          oldname: _this.getUsername(),
          name: _this.editName,
          about: _this.editAbout === _this.getAbout ? null : _this.editAbout
        }))
        .then(function (result) {
          if (result.data.res) {
            _this.$message({
              duration: 2000,
              message: '修改成功'
            })
            _this.username(_this.editName)
            if (_this.edithead) {
              uphead()
            }
            _this.dialogVisible = false
          } else {
            _this.$message('该用户名已经被使用了')
          }
        })
      },
      searchMyface () {
        this.$router.push('/myFace')
        this.searchimg(['myFace', this.getUsername()])
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
        this.createImage(file)
      },
      createImage (file) {
        var _this = this
        var Fn = Function
        // vue中不能识别FileReader对象，应使用new Function()来获取这个对象
        var Fr = new Fn('return FileReader')()
        var reader = new Fr()
        reader.readAsDataURL(file)
        reader.onload = function () {
          _this.$refs.headImg2.src = this.result
          _this.edithead = this.result
        }
      },
      get_cookie (Name) {
        var Fn = Function
        var document = new Fn('return document')()
        var search = Name + '=' // 查询检索的值
        var returnvalue = '' // 返回值
        if (document.cookie.length > 0) {
          var sd = document.cookie.indexOf(search)
          if (sd !== -1) {
            sd += search.length
            var end = document.cookie.indexOf(';', sd)
            // 该cookie在末尾
            if (end === -1) {
              end = document.cookie.length
            }
            // unescape() 函数可对通过 escape() 编码的字符串进行解码。
            returnvalue = unescape(document.cookie.substring(sd, end))
          }
        }
        return returnvalue
      },
      closeNav () {
        this.listStatic = true
      },
      cgList () {
        this.listStatic = !this.listStatic
      },
      exit () {
        var _this = this
        axios.post('/exit', qs.stringify({ck: _this.get_cookie('connect.sid')}))
        .then(function (res) {
          if (res.data.data) {
            _this.loginState()
            _this.username(null)
          }
        })
      }
    }
  }
</script>
<style>
  /*-------编辑信息--------------*/
  .edithead {
    display: inline-block;
    position: relative;
    height: 52px;
    width: 52px;
    outline: none;
    border-radius: 26px 26px;
    border: 1px solid #dfdfdf;
    margin: 0 auto;
  }
  .headImg1 {
    height: 20px;
    width: 20px;
    line-height: 20px;
    outline: none;
    border-radius: 10px 10px;
  }
  .headImg2, .fileimg {
    height: 50px;
    width: 50px;
    line-height: 50px;
    outline: none;
    border-radius: 25px 25px;
  }
  .headImg2 {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .fileimg {
    border: none;
    position: absolute;
    cursor: pointer;
    opacity: 0;
  }
  .el-dialog__footer {
    text-align: center!important;
  }
  /*---------------------*/
  .userMsg .el-button{
    color: #545434;
    font-size: 1.2em;
  }
  .userMsg .arrow{
    font-size: 12px;
    color: #848484;
    transition: all .3s ease-in-out;
  }
  .userMsg:hover .arrow{
     transform:rotate(180deg)
  }
  .el-dropdown-menu {
    width: 120px!important;
    top: 62px!important;
    /*transition: top .5s ease-in-out;*/
  }
  /* ------------------- */
  .header {
    display: block;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    padding: 20px 0 5px 0;
    margin-bottom: 25px;
    z-index: 2000;
    transition: all 1s;
  }
  .header.no-top {
    position: fixed;
    box-shadow: 0px 2px 3px #999799;
    font-size: 14px;
    padding-top: 10px;
    background-color: rgba(255,255,255,0.2);
  }
  .header.no-top .logo-icon img{
    height: 30px;
    width: 30px;
  }
  .head-button button{
    color: #fff;
    background: rgba(0, 0, 0, 0)!important;
  }
  /* --------------------- */
  .nav-list,.nav-list ul,.logo{
    display: inline-block;
    text-align: center;
  }
  .nav-li a,.nav-li .el-button--text,.nav-li .el-button--text span {
    display: inline-block;
    width: 80%;
    height: 80%;
    text-decoration: none;
    white-space: nowrap;
  }
  .nav-list .el-button--text {
    color: #000;
  }
  .nav-li:hover .el-button--text {
    color: #fff;
  }
  .el-button--text:active {
    color: #fff;
  }
  .nav-li {
    margin: 0 6px;
    background-color: rgba(64, 184, 131, 0);
    transition: all 0.5s ease-in-out;
  }
  .nav-li a {
    width: 100%;
  }
  .nav-li:hover {
    background-color: rgba(64, 184, 131, 1);
  }
  .nav-li .router-link-active,.nav-li .router-link-active .el-button--text {
    color: #fff;
    background-color: rgba(64, 184, 131, 1);
  }
  .nav-btn {
    display: none;
  }
  /* ------------------ */
  .logo {
    display: inline-block;
    text-align: center;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    vertical-align: middle;
  }
   /* logo和文字居中 */
  .logo-icon,.logo-font{
    display: inline-block;
    line-height: 100%;
    vertical-align: middle;
  }
  .logo img {
    display: inline-block;
    height: 40px;
    width: 40px;
    transition: all 1s;
  }
  /* 未登录状态 */
  .lg-hidden {
    visibility: visible;
    opacity: 1;
    display: none;
  }
  .lg-show {
    font-size: 18px;
    display: block;
  }
  /*--------------------------------------------------------*/
  @media (max-width: 1090px) {
    * {
      font-size: 12px;
    }
    .header {
      height: 60px;
      padding: 15px 20px 15px 10px;
    }
    .logo img {
      display: inline-block;
      height: 30px;
      width: 30px;
      transition: all 1s;
    }
    .nav-list {
      display: block;
      position: fixed;
      background-color: rgba(255,255,255,0.8);
      top: 60px;
      height: 0;
      opacity: 0;
      right: -3020px;
      transition-property: opacity,height,top;
      transition-duration: 1s;
      z-index: -1;
    }

    .el-dropdown-menu {
      width: 150px!important;
      top: 52px!important;
    }

    .header.no-top .nav-list {
      top: 50px;
    }
    .nav-list.show {
      height: 260px;
      opacity: 1;
      right: 0px
    }
    .nav-list .nav-li{
      cursor: pointer;
      font-size: 1.2em;
      margin: 6px 0 6px 0;
    }
    .nav-list .nav-li span{
      font-size: 1.2em;
    }
    .nav-list .nav-li a:hover {
      background-color: rgba(64, 184, 131, 0.8);
    }
    .nav-btn {
      display: block;
    }
    .logo-font {
      display: none;
    }
  }
  /*--------------------*/
  @media (max-width: 768px) {
    .logo-font {
      display: none;
    }
  }
  /* v-modal */
  body>.v-modal {
    display: none;
  }
</style>