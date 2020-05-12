<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
    <div>
      <van-uploader v-model="fileList" :after-read="afterRead" accept="video/*,image/*"/>
    </div>
    <span @click="toUpload">发布</span>
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
      fileList:[],
      videoFile:{},
      videoUrl:''
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
    getSeatData () {
      this.$axios.post("http://localhost:8080/getSeatData", {
        // seatList: this.seatList,
        // sceneId:this.sceneInfo.sceneId
      }).then((res) => {
        if (res.data.code == 200) {
          // this.couponList = res.data.data

        }
        console.log(res)
      })
    },
    afterRead (file) {
      console.log(file)
      this.videoFile = file
      let formData = new FormData()
      formData.append('file', file.file)
      console.log(formData)
      this.$axios.post("/upload",formData).then((res)=>{
        if(res.data.code==200){
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
    toUpload(){
      console.log(this.message)
      this.$axios.post("/toUpload",{
        userId:this.userInfo.userId,
        videoDescribe:this.message,
        video:this.videoUrl,
      }).then((res)=>{
        if(res.data.code==200){
          console.log(res.data.data)
        }
      })
    },

  }
}
</script>

<style lang="less" scoped>
.main-con {

}
</style>