<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="member">
      <div class="card-top">
        <div>
          <img src="../../assets/vip.png" alt />
        </div>
        <p>
          <van-icon name="volume-o" size="20"/>
          <span>此卡为折扣卡，不可储存，不可退换</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'Member',
  data () {
    return {
      title: '会员',
      // couponList: [],
      userInfo: {},
      sceneInfo: [],
      cinemaList: [],
      seatList: []
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
  .member {
    .card-top {
      div {
        padding: 10px 25px 0 25px;
        img {
          width: 100%;
          border-radius: 8px;
        }
      }
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>