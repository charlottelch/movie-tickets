<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div id="Flash1" style="  z-index: 999;">
      <video autoplay width="100%" controls x5-video-player-type="h5" x5-video-orientation="landscape" :src="`${video.trailerVideo}`" v-show="video.trailerVideo != undefined"></video>
      <video autoplay width="100%" controls x5-video-player-type="h5" x5-video-orientation="landscape" :src="`${video.movieVideo}`" v-show="video.movieVideo != undefined"></video>
    </div>
    <p v-show="video.trailerDescribe != undefined">{{video.trailerDescribe}}</p>
    <p v-show="video.movieVideoDescribe != undefined">{{video.movieVideoDescribe}}</p>

  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'VideoPlay',
  data () {
    return {
      title: '视频播放',
      // couponList: [],
      userInfo: {},
      sceneInfo: [],
      cinemaList: [],
      seatList: [],
      video:''
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.video=JSON.parse(localStorage.getItem("videoPlay"))
    // console.log(this.video.trailerVideo)
    // this.getSeatData()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getSeatData () {
      this.$axios.post("/getSeatData", {
        // seatList: this.seatList,
        // sceneId:this.sceneInfo.sceneId
      }).then((res) => {
        if (res.data.code == 200) {
          // this.couponList = res.data.data

        }
        console.log(res)
      })
    }

  }
}
</script>

<style lang="less" scoped>
.main-con {
  // #Flash1{
	// 		-webkit-transform: rotate(90deg);
	// 		-moz-transform: rotate(90deg);
	// 		-ms-transform: rotate(90deg);
	// 		-o-transform: rotate(90deg);
	// 		transform: rotate(90deg);
	// 	}
		// body{
		// 	margin: 0px;
		// 	padding: 0px;
		// }
}
</style>