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
  name: 'BuyTickets',
  data () {
    return {
      title: '订单',
      couponList: [],
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

    this.sceneInfo = JSON.parse(localStorage.getItem('scene'))
    this.cinemaList = JSON.parse(localStorage.getItem('cinema'))
    this.seatList = JSON.parse(localStorage.getItem('seat'))
    // 获取座位信息
      // this.sceneInfo = this.$route.query.data1
    console.log(this.sceneInfo)
    console.log(this.cinemaList)
    console.log(this.seatList)


    this.getSeatData()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getSeatData () {
      this.$axios.post("http://localhost:8080/getSeatData", {
        seatList: this.seatList,
        sceneId:this.sceneInfo.sceneId
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