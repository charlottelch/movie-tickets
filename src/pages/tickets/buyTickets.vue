<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="buy-tickets">
      <div class="tickets-info">
        <p>
          <span>{{movieList.movieName}}</span>
          <span>{{seatList.length}}张</span>
        </p>
        <p>
          <span>{{sceneInfo.sceneDate}}</span>
          <span>{{sceneInfo.startTime}}~{{sceneInfo.endTime}}</span>
        </p>
        <p>{{cinemaList.cinemaName}}</p>
        <p>{{sceneInfo.cinemaHallName}}</p>
        <p>
          <span
            class="seat"
            v-for="(item,index) in seatList"
            :key="index"
          >{{item.r+1+'排'}}{{item.c+1+'座'}}</span>
          <!-- <span>5排3座</span> -->
        </p>
      </div>
      <div class="select">
        <span>票价总计</span>
        <div class="select-right">
          <span>{{sceneInfo.ticketPrice * seatList.length}}</span>
          <span>元</span>
        </div>
      </div>

      <div>
        <!-- 优惠券单元格 -->
        <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
      </div>
      <div class="select">
        <span>小计</span>
        <div class="select-right">
          <span>{{sceneInfo.ticketPrice * seatList.length-allowance}}</span>
          <span>元</span>
        </div>
      </div>
    </div>
    <div class="ticket-purchase" @click="toPayment">
      <span>
        <span>立即付款</span>
      </span>
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
      // couponList: [],
      userInfo: {},
      sceneInfo: [],
      cinemaList: [],
      movieList: [],
      seatList: [],
      // 优惠券
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
      couponList: [],
      currentdate: '',
      timeNumber: null,
      isSeatAvailable: true,
      // 优惠劵减少的价格
      allowance: ''
    }
  },
  mounted () {
    this.getNowFormatDate()
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }

    this.sceneInfo = JSON.parse(localStorage.getItem('scene'))
    this.cinemaList = JSON.parse(localStorage.getItem('cinema'))
    this.seatList = JSON.parse(localStorage.getItem('seat'))
    this.movieList = JSON.parse(localStorage.getItem('movie'))

    this.getMyCoupon()
    // let timeStamp = new Date('2020-05-06').getTime()
    // console.log(timeStamp)

  },
  methods: {
    // 今天的日期
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
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取用户的优惠券信息
    getMyCoupon () {
      this.$axios.post("/getMyCoupon", {
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          this.couponList = res.data.data
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
          // console.log(this.couponList)
        }
      })
    },
    // 判断时间
    date () {
      // console.log(this.couponList[0].endTime)
    },
    // 验证座位
    selectSeatType () {
      this.$axios.post("/selectSeatType", {
        seatList: this.seatList,
        sceneId: this.sceneInfo.sceneId
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i][0].seatType != 0) {
              this.isSeatAvailable = false
              console.log(this.isSeatAvailable)
            }
          }
          console.log(this.isSeatAvailable)
          if (this.isSeatAvailable == true) {
            var orderPrice = this.sceneInfo.ticketPrice * this.seatList.length - this.allowance
            localStorage.setItem('orderPrice', JSON.stringify(orderPrice))
            this.$router.push({ path: '/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions' })
            // this.getSeatData()
          } else {
            this.$toast('座位已经被选了，请重新选座')
          }
        }
      })
    },
    // 更新座位信息
    getSeatData () {
      this.$axios.post("/getSeatData", {
        seatList: this.seatList,
        sceneId: this.sceneInfo.sceneId
      }).then((res) => {
        if (res.data.code == 200) {
          // this.couponList = res.data.data
        }
        console.log(res)
      })
    },
    onChange (index) {
      this.showList = false;
      this.chosenCoupon = index;
      if (this.chosenCoupon >= 0) {
        this.allowance = this.coupons[this.chosenCoupon].value / 100
      } else {
        this.allowance = 0
      }
      console.log(this.coupons[this.chosenCoupon])
      console.log(this.chosenCoupon)
    },
    onExchange (code) {
      this.coupons.push(coupon);
    },
    toPayment () {
      // if(this.coupons[this.chosenCoupon] != undefined){
      localStorage.setItem('coupon', JSON.stringify(this.coupons[this.chosenCoupon]))
      // }eles{

      // }
      console.log(this.coupons[this.chosenCoupon])
      this.selectSeatType()
      // if(this.isSeatAvailable == true){

      // }
      console.log("去付款")
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  .buy-tickets {
    .tickets-info {
      padding: 10px;
      background: #8692b3;
      color: white;
      .seat {
        padding: 0 4px;
      }
    }
    .select {
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .select-right {
        display: flex;
        align-items: center;
        .select-picture {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
    // /deep/ .van-tabs__wrap {
    //   // overflow: hidden;
    //   display: none !important;
    // }
    /deep/ .van-coupon-list__exchange-bar {
      display: none;
    }
  }
  .ticket-purchase {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background: white;
  }
  .ticket-purchase > span {
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
  .ticket-purchase > span > span {
    margin-right: 4px;
  }
}
</style>