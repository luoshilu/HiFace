<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :data="data"
      list-type="picture">
      <el-button slot="trigger" size="small" type="primary">直接上传图片</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        fileList: [{name: 'file', url: ''}],
        data: {
          key: 0,
          token: 0
        }
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      }
    }
  }
</script>