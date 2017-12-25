<template>
  <el-row class="menucv">
    <!-- 保存上传 -->
    <div class="cell">
      <el-button type="text" @click="addtag"><icon name="save" scale="2"></icon></el-button>
    </div>
    <!-- 清除画板 -->
    <div class="cell">
      <el-button type="text" @click="clear"><icon name="del" scale="2"></icon></el-button>
    </div>
  </el-row>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['getCtx', 'getCanvas', 'getUsername'])
    },
    methods: {
      ...mapActions(['loginPage', 'imglist']),
      clear () {
        this.getCanvas.width = this.getCanvas.width
      },
      addtag () {
        // 查看是否是登录用户
        if (!this.getUsername()) {
          this.loginPage()
          return
        }
        this.$prompt('输入表情标签:', '提示', {
          confirmButtonText: '上传',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.newImg(value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消上传'
          })
        })
      },
      newImg (tag) {
        var _this = this
        upload(this.getCanvas.toDataURL())

        function getfileSize (str) {
          if (str.indexOf('=') > 0) {
            var indexOf = str.indexOf('=')
            str = str.substring(0, indexOf)// 把末尾的’=‘号去掉
          }

          var fileSize = parseInt(str.length - (str.length / 8) * 2)
          return fileSize
        }

        function upload (base64) {
          var Fn = Function
          var window = new Fn('return window')()
          var XMLHttpRequest = new Fn('return XMLHttpRequest')()
          var pic = base64.replace(/^.*?,/, '')

          axios.post('/upload', qs.stringify({'username': _this.getUsername()}))
          .then(function (res) {
            var token = res.data.uptoken
            var imgNum = res.data.imgNum
            var id = res.data.id
              // 把字符串转换成json
            function strToJson (str) {
              var json = JSON.parse(str)
              return json
            }
            // 以用户id + 图片编号 命名
            var url = 'http://upload.qiniu.com/putb64/' + getfileSize(pic) + '/key/' + window.btoa(id + '/' + imgNum)
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
                    name: _this.getUsername(),
                    key: keyText.key,
                    imgNum: imgNum,
                    tag: tag
                  }
                  axios.post('/upload/result', qs.stringify(sendData))
                  .then(function (result) {
                    if (result.data) {
                      // 保存成功 弹窗
                      _this.openShare(result.data.img)
                    }
                  })
                }
              }
            }
            xhr.open('post', url, true)
            xhr.setRequestHeader('Content-Type', 'application/octet-stream')
            xhr.setRequestHeader('Authorization', 'UpToken ' + token)
            xhr.send(pic)
          }).catch(e => {
            console.log(e);
          })
        }
      },
      openShare (img) {
        var _this = this
        this.$confirm('保存成功！是否分享？', '提示', {
          confirmButtonText: '分享',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/upload/share', qs.stringify(img))
          .then(function (result) {
            if (result.data.data) {
              _this.$message({
                type: 'success',
                duration: 1500,
                message: '已分享！'
              })
            } else {
              _this.$message({
                type: 'info',
                message: '分享失败！'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消分享！'
          })
        })
      }
    }
  }
</script>