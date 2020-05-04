<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="bottom-coupon">
      <!-- <h3>影劵</h3> -->
      <div class="coupon-all">
        <div class="coupon" v-for="(item,index) in couponList" :key="index">
          <div class="coupon-paper">
            <div>￥{{item.couponValue}}抵扣劵</div>
          </div>
          <!-- <p>{{item.value}}元抵扣劵</p>
          <div class="convert-coupon">
            <span>{{item.cost}}影豆</span>
            <van-button round type="info" size="small" @click="exchange(item)">兑换</van-button>
          </div>-->
        </div>
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
  name: 'Coupon',
  data () {
    return {
      title: '我的优惠券',
      couponList: [],
      userInfo: {},
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.getMyCoupon()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getMyCoupon () {
      this.$axios.post("http://localhost:8080/getMyCoupon", {
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          this.couponList = res.data.data
          console.log(this.couponList )
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.main-con {
  .bottom-coupon {
    padding: 0 10px;
  }
  .coupon-all {
    display: flex;
    justify-content: space-between;
    .coupon {
      width: 170px;
      box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;
      border-radius: 4px;
      .coupon-paper {
        width: 100%;
        height: 100px;
        // border-radius: 4px;
        background: rgb(180, 196, 238);
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          width: 150px;
          height: 86px;
          background: url('../../assets/coupon-bg.png');
          background-size: 150px 86px;
          color: rgb(143, 169, 235);
          text-align: center;
          line-height: 86px;
        }
      }
      p {
        padding: 5px;
        margin: 0;
      }
      .convert-coupon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
      }
    }
  }
}
</style>