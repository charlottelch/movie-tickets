<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="bottom-coupon">
      <!-- <h3>影劵</h3> -->
      <!-- <div class="coupon-all">
        <div class="coupon" v-for="(item,index) in couponList" :key="index">
          <div class="coupon-paper">
            <div>
              <span>￥{{item.valueDesc}}抵扣劵</span>
              <span class="end">有效期至:{{item.endTime}}</span>
            </div>
          </div>
        </div>
      </div>-->
      <div>
        <!-- 优惠券单元格 -->
        <!-- <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" /> -->
        <!-- 优惠券列表 -->
        <!-- <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >-->
        <van-coupon-list :coupons="coupons" :disabled-coupons="disabledCoupons" />
        <!-- </van-popup> -->
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
      timeNumber: null,
      currentdate: '',

      showList: false,

      chosenCoupon: -1,
      coupons: [
        {
          // available: 1,
          condition: '无门槛',
          // reason: '',
          value: 150,
          name: '优惠券名称',
          startAt: 1588723200 - 259200,
          endAt: 1314592000,
          valueDesc: '1.5',
          unitDesc: '元',
        }
      ],
      disabledCoupons: [
        {
          available: 1,
          condition: '无使用门槛',
          reason: '',
          value: 150,
          name: '优惠券名称',
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: '1.5',
          unitDesc: '元',
        }
      ],
      userInfo: {},
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.getNowFormatDate()
    this.getMyCoupon()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getNowFormatDate () {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentdate = year + seperator1 + month + seperator1 + strDate;
      // return currentdate;
      console.log(this.currentdate)
      var timeStamp = new Date(this.currentdate).getTime()
      var timeString = timeStamp.toString()
      // console.log(timeStamp.toString())
      var shortName = timeString.substr(0, 10)
      // console.log(typeof(shortName))
      this.timeNumber = Number(shortName)
      console.log(this.timeNumber)
      console.log(this.coupons[0].endAt)
    },
    getMyCoupon () {
      this.$axios.post("/getMyCoupon", {
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          this.couponList = res.data.data
          console.log(this.couponList)
          this.disabledCoupons = []
          this.coupons = []
          for (let i = 0; i < this.couponList.length; i++) {
            console.log(this.couponList[i].endAt)
            if (this.couponList[i].endAt < this.timeNumber) {
              this.disabledCoupons.push(this.couponList[i])
              // console.log(this.disabledCoupons)
            } else {
              this.coupons.push(this.couponList[i])
              console.log(this.coupons)
            }
          }
        }
      })
    },
    // onChange (index) {
    //   this.showList = false;
    //   this.chosenCoupon = index;
    //   // this.allowance = this.coupons[this.chosenCoupon].value/100
    //   // // localStorage.setItem('coupon',JSON.stringify(this.coupons[this.chosenCoupon]))
    //   // console.log(this.coupons[this.chosenCoupon])
    // },
    // onExchange (code) {
    //   this.coupons.push(coupon);
    // },

  }
}
</script>

<style lang="less" scoped>
.main-con {
  .bottom-coupon {
    padding: 0 10px;
    /deep/ .van-coupon-list__exchange-bar {
      display: none;
    }
    /deep/ .van-coupon-list__bottom {
      display: none;
    }
    /deep/ .van-coupon__corner {
      display: none;
    }
  }
  .coupon-all {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .coupon {
      width: 170px;
      box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;
      border-radius: 4px;
      margin-top: 10px;
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
          // text-align: center;
          // line-height: 86px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .end {
            font-size: 12px;
          }
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