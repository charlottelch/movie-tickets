<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="upload">
      <div>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="添加一些描述吧^_^"
          show-word-limit
        />
      </div>
      <div>
        <van-field
          v-model="labelMessage"
          rows="1"
          autosize
          type="textarea"
          placeholder="添加标签,例如：#喜剧"
        >
          <template #button>
            <span @click="addLabel">#标签</span>
          </template>
        </van-field>
      </div>
      <div class="upload-parts">
        <div class="upload-text">
          <p>上传封面图片</p>
        </div>
        <van-uploader
          v-model="fileListImage"
          :after-read="afterReadImage"
          accept="image/*"
          :max-count="1"
        />
      </div>
      <div class="upload-parts">
        <div class="upload-text">
          <p>上传视频</p>
        </div>
        <van-uploader v-model="fileList" :after-read="afterRead" accept="video/*" :max-count="1" />
      </div>
    </div>
    <div class="ticket-purchase">
      <span @click="toUpload">发布</span>
    </div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'EditCommunity',
  data () {
    return {
      title: '发布动态',
      message: '',
      labelMessage: '',
      userInfo: {},
      // fileList: [
      //   {
      //     url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      //     status: 'uploading',
      //     message: '上传中...',
      //   },
      //   {
      //     url: 'https://img.yzcdn.cn/vant/tree.jpg',
      //     status: 'failed',
      //     message: '上传失败',
      //   },
      // ],
      // 图片
      fileListImage: [],
      imgFile: {},
      imageUrl: '',
      // 视频
      fileList: [],
      videoFile: {},
      videoUrl: ''
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }

    // this.getSeatData()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    addLabel () {
      this.labelMessage = this.labelMessage + '#'
    },
    afterRead (file) {
      console.log(file)
      this.videoFile = file
      let formData = new FormData()
      formData.append('file', file.file)
      console.log(formData)
      this.$axios.post("/upload", formData).then((res) => {
        if (res.data.code == 200) {
          file.message = '上传成功！';
          console.log(res.data.data.url)
          this.videoUrl = res.data.data.url
        }
      })
      // this.upload()
      // setTimeout(() => {
      //   file.status = 'failed';
      //   file.message = '上传失败';
      // }, 1000);
    },
    afterReadImage (file) {
      // file.status = 'uploading';
      // file.message = '上传中...';
      console.log(file)
      this.imgFile = file
      let formData = new FormData()
      formData.append('file', file.file)
      console.log(formData)
      this.$axios.post("/uploadImage", formData).then((res) => {
        if (res.data.code == 200) {
          file.message = '上传成功！';
          this.imageUrl = res.data.data.url
          console.log(this.imageUrl)

        }
      })
      // this.upload()
      // setTimeout(() => {
      //   file.status = 'failed';
      //   file.message = '上传失败';
      // }, 1000);
    },
    toUpload () {
      console.log(this.imageUrl)
      console.log(this.labelMessage)
      this.$axios.post("/toUpload", {
        userId: this.userInfo.userId,
        videoDescribe: this.message,
        video: this.videoUrl,
        videoCover: this.imageUrl,
        videoLabel: this.labelMessage
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
        }
      })
    },

  }
}
</script>

<style lang="less" scoped>
.main-con {
  .upload {
    padding: 10px;
    .van-cell {
      border: 1px dashed rgb(226, 226, 226);
    }
    .upload-parts {
      display: flex;
      align-items: center;
      padding: 10px 0 0 0;
      .upload-text {
        display: flex;
        align-items: cneter;
        width: 60px;
        height: 60px;
        background: rgb(245, 238, 224);
        text-align: center;
        padding: 10px;
        margin-bottom: 8px;
        p {
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
          margin: 0;
          line-height: 30px;
        }
      }
      // /deep/ .van-uploader__upload {
      //   margin: 0 !important;
      // }
    }
  }
  .ticket-purchase {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background: white;
    span {
      display: inline-block;
      background: rgb(233, 87, 131);
      background-image: linear-gradient(to left, #ff3174, #fe756b);
      border: 0;
      width: 95%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 40px;
      color: white;
    }
  }
}
</style>