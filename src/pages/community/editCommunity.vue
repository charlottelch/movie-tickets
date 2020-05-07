<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div>
      hhhh
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
      // couponList: [],
      userInfo: {},
      sceneInfo:[],
      cinemaList:[],
      seatList:[]
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
    }

  }
}
</script>

<style lang="less" scoped>
.main-con {
  
}
</style>