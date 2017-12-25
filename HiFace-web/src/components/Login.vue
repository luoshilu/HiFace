<template>
  <div class="login" :style="'height:' + windowH + 'px;' + 'top:' + - windowH * 2 + 'px'" :class="{'login-page':getLoginpage || getSignin || getTip}">
    <div class="login-content-md">
      <el-row>
      <!--  -->
        <el-col :lg="10" :md="10" :sm="16" :xs="23">
          <!-- 登录 -->
          <div class="login-content" :class="{'login-show':getLoginpage}">
            <!-- 标题 -->
              <el-row>
                <el-col class="login-head" :lg="18" :md="18" :sm="18" :xs="18" :offset="3">
                  <h2 class="head-font">HiFace</h2>
                </el-col>                  
                <el-button style="position:absolute;right:0;top:0;" size="mini" :plain="true" type="info" icon="close"
                v-on:click="closeall"></el-button>
              </el-row>
            <!-- 用户名 -->
              <el-row>
                <el-col :lg="18" :md="18" :sm="18" :xs="18" :offset="3">
                  <el-input placeholder="用户名/手机号/邮箱" v-model="mail" icon="edit"></el-input>
                </el-col>
              </el-row>
            <!-- 密码 -->
              <el-row>
                <el-col :lg="18" :md="18" :sm="18" :xs="18" :offset="3">
                  <el-input placeholder="密码" type="password" v-model="psw" icon="edit"></el-input>
                </el-col>
              </el-row>
              <!-- 其他 -->
              <el-row>
                <el-col :span="2" :offset="3">
                  <el-checkbox v-model="saveme">记住我</el-checkbox>
                </el-col>
                <el-col :span="4" :offset="13">
                  <span style="color:red">{{loginResult}}</span>
                </el-col>
              </el-row>
            <!-- 按钮 -->
              <el-row>
                <el-col :span="10" :offset="8">
                  <el-button
                  :plain="true"
                  @click="logining(),userLogin()"
                  :loading="getLogining"
                  type="primary">登录</el-button>
                  <el-button :plain="true" v-on:click="signin" type="warning">注册</el-button>
                </el-col>
                <!-- 其他 -->
                <el-col :span="3">
                  <el-button type="text" v-model="psw">忘记密码?</el-button>
                </el-col>
              </el-row>
            <!-- 验证码 -->
            <!-- 提示 -->
          </div>
          <!-- 注册 -->
          <div class="signin-content" :class="{'signin-show':getSignin}">
            <!-- 标题 -->
              <el-row>
                <el-col class="login-head" :lg="18" :md="18" :sm="18" :xs="18" :offset="3">
                  <h2 class="head-font">Join HiFace</h2>
                </el-col>
                <el-button style="position:absolute;right:0;top:0;" size="mini" :plain="true" type="info" icon="close"
                v-on:click="closeall"></el-button>
              </el-row>
            <!-- 用户名 -->
              <el-row>
                <el-col :lg="17" :md="17" :sm="17" :xs="17" :offset="3">
                  <el-input placeholder="输入注册邮箱" icon="edit" v-model="simail" @change="referMail">
                  </el-input>
                </el-col>
                <el-col :span="4" class="sign-tip">
                  <p class="refertip">{{rfMail}}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :lg="17" :md="17" :sm="17" :xs="17" :offset="3">
                  <el-input placeholder="昵称" icon="edit" @change="referName" v-model="siname">
                  </el-input>
                </el-col>
                <el-col :span="4" class="sign-tip">
                  <p class="refertip">{{rfName}}</p>
                </el-col>
              </el-row>
            <!-- 密码 -->
              <el-row>
                <el-col :lg="17" :md="17" :sm="17" :xs="17" :offset="3">
                  <el-input placeholder="设置密码" @change="referPsw" type="password" icon="edit" v-model="sipsw1"></el-input>
                </el-col>
                <el-col :span="4" class="sign-tip">
                  <p class="refertip">{{rfPsw}}</p>
                </el-col>
              </el-row>
            <!-- 确认密码 -->
              <el-row>
                <el-col :lg="17" :md="17" :sm="17" :xs="17" :offset="3">
                  <el-input placeholder="确认密码" @change="referPsw" type="password" icon="edit" v-model="sipsw2"></el-input>
                </el-col>
              </el-row>
            <!-- 按钮 -->
              <el-row>
                <el-col :span="10" :offset="9">
                  <el-button :plain="true" v-on:click="loginPage" type="primary">登录</el-button>
                  <el-button :plain="true" v-on:click="signRequest(),signining()" type="warning" :loading="getSignining">注册</el-button>
                </el-col>
              </el-row>
          </div>

          <!-- 提示信息 -->
          <div class="tip-content" :class="{'tip-show':getTip}">
            <el-row>
              <el-col class="login-head" :lg="18" :md="18" :sm="18" :xs="18" :offset="3">
                <h2 class="head-font">验证中</h2>
              </el-col>                  
              <el-button style="position:absolute;right:0;top:0;" size="mini" :plain="true" type="info" icon="close"
              v-on:click="closeall"></el-button>
            </el-row>
            <p>{{sitip}}</p>
            <!-- 按钮 -->
            <el-row>
              <el-col :span="10" :offset="9">
                <el-button :plain="true" v-on:click="loginPage" type="primary">登录</el-button>
                <el-button :plain="true" v-on:click="signin" type="warning" :loading="getSignining">注册</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    mounted () {
      var Fn = Function
      var window = new Fn('return window')()
      this.windowH = window.innerHeight
      console.log('========>');
      console.log(window.innerHeight);
    },
    data () {
      return {
        windowH: 0, // 窗口高度
        mail: this.get_cookie('mail'),
        psw: this.get_cookie('psw'),
        simail: '',
        siname: '', // 注册名
        sipsw1: '', // 密码1
        sipsw2: '', // 密码2
        sitip: '', // 提示
        loginResult: '',
        saveme: false,
        rfMail: '', // 验证邮箱
        rfName: '',
        rfPsw: null
      }
    },
    computed: {
      ...mapGetters(['getAbout', 'getHeadurl', 'getLoginState', 'getLoginpage', 'getSignin', 'getTip', 'getLogining', 'getSignining'])
    },
    methods: {
      ...mapActions(['setabout', 'setheadurl', 'loginPage', 'signin', 'tip', 'closeall', 'username', 'logining', 'signining', 'loginState']),
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
      referMail () {
        var _this = this
        if (this.simail === '' || !this.simail) {
          this.rfMail = '邮箱不能为空'
          return
        } else if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.simail)) {
          this.rfMail = '邮箱格式不正确'
          return
        } else {
          axios.post('/actId/referMail', qs.stringify({mail: _this.simail}))
          .then(function (res) {
            if (res.data.mail) {
              _this.rfMail = '该邮箱已注册'
            } else {
              _this.rfMail = ''
            }
          })
        }
      },
      referName () {
        var _this = this
        if (this.siname === '' || !this.siname) {
          this.rfName = '用户名不能为空'
          return
        }
        axios.post('/actId/referName', qs.stringify({name: _this.siname}))
        .then(function (res) {
          if (res.data.name) {
            _this.rfName = '该用户已存在'
          } else {
            _this.rfName = ''
          }
        })
      },
      referPsw () {
        if (this.sipsw1 !== this.sipsw2) {
          this.rfPsw = '密码不一致'
        } else if (this.sipsw1 === '' || this.sipsw2 === '') {
          this.rfPsw = '请输入密码'
        } else {
          this.rfPsw = ''
        }
      },
      signRequest () {
        var _this = this
        if (this.rfMail !== '' || this.rfName !== '' || this.rfPsw !== '') {
          this.signining()
          this.referMail()
          this.referName()
          this.referPsw()
          return
        }
        axios.post('/mailverify', {mail: _this.simail, name: _this.siname, psw: _this.sipsw1})
        .then(function (res) {
          if (res.data.data) {
            axios.post('/actId/loading')
            .then(function () {
              _this.sitip = '注册成功啦,快去登录吧!'
              _this.signining()
            })
            _this.sitip = '验证已经发到你的邮箱,等待确认..'
          } else {
            _this.sitip = '邮箱不存在或者该邮箱拒收外来邮件!'
            _this.signining()
          }
          // 跳转到tip
          _this.tip()
        })
      },
      userLogin () {
        var _this = this
        axios.post('/login', qs.stringify({mail: _this.mail, psw: _this.psw, saveme: _this.saveme}))
        .then(function (res) {
          if (!res.data.verify) {
            _this.loginResult = '密码错误'
            _this.logining()
          } else {
            // 登陆成功
            _this.$message({
              duration: 1500,
              message: '登录成功'
            })
            _this.username(res.data.name)
            _this.setabout(res.data.about)
            _this.setheadurl(res.data.headurl)
            _this.loginState()
            setTimeout(function () {
              _this.closeall()
            }, 500)
          }
        })
      }
    }
  }
</script>
<style>
  .login {
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.1);
    transition: top 1s;
  }

  /*------------*/
  .login.login-page {
    top: 0!important;
  }
  .login-content,.signin-content,.tip-content {
    display: none;
  }
  .login-content.login-show {
    display: block;
  }
  .signin-content.signin-show {
    display: block;
  }
  .tip-content.tip-show {
    display: block;
  }
  /*-------*/
  .login-content-md {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 20%;
  }
  .login-content,.signin-content,.tip-content {
    position: relative;
    margin: 12px auto;
    padding: 0 0 12px 0;
    border: 2px solid #41b883;
    background-color: #fff;
    border-radius: 5px 5px;
    left: -50%;
  }
  .login input{
    margin: 10px 0;
  }
  .login-head {
    display: inline-block;
    text-align: center;
  }
  .head-font {
    padding: 6px 0;
    background-color: #fff;
    border-radius: 5px 5px;
  }
  .sign-tip {
    margin: 10px 0;
  }
  .refertip {
    font-size: 12px;
    color: red;
  }
</style>