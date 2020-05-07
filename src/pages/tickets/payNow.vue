<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="order-price">
      <p>电影订单</p>
      <p>
        <span>￥</span>
        <span>{{orderPrice}}</span>
      </p>
    </div>
    <div class="ticket-purchase" @click="payNow">
      <span>
        <span>立即支付</span>
      </span>
    </div>
    <van-dialog
      v-model="payShow"
      title="请输入支付密码"
      :close-on-click-overlay="true"
      :show-confirm-button="false"
    >
      <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
      <!-- 密码输入框 -->
      <p></p>
      <van-password-input
        :value="value"
        :error-info="errorInfo"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </van-dialog>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'PayNow',
  data () {
    return {
      title: '',
      couponList: [],
      userInfo: {},
      cinemalist: {},
      sceneInfo: {},
      seatList: [],
      isSeatAvailable: true,
      couponlist: {},
      payShow: false,
      value: '',
      showKeyboard: true,
      errorInfo: '',
      password: '123456',
      orderPrice: '',
      radio: '',
      // 订单生成时间
      currentdate: '',
      // 定订单生成是的时间戳
      timeStamp: '',
      // 订单号
      orderNum: '',
      // 取票码
      ticketCode: '',
      // 订单生成时间
      orderTime:'',
      couponValue:'',
      // 订单ID
      orderId:''
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.sceneInfo = JSON.parse(localStorage.getItem('scene'))
    this.seatList = JSON.parse(localStorage.getItem('seat'))
    // this.couponlist = JSON.parse(localStorage.getItem('coupon'))
    this.cinemalist = JSON.parse(localStorage.getItem('cinema'))

    this.orderPrice = JSON.parse(localStorage.getItem('orderPrice'))
    this.couponValue = this.sceneInfo.ticketPrice*this.seatList.length-this.orderPrice
    console.log(this.couponValue)
    this.radio = this.$route.query.data
    if (this.radio == 1) {
      this.title = "支付宝"
    } else {
      this.title = "微信"
    }
    console.log(this.radio)
    // this.getMyCoupon()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    payNow () {
      this.payShow = true
      // 
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
      // console.log(this.currentdate)
      this.timeStamp = new Date(this.currentdate).getTime()
      // console.log(this.timeStamp)
      var a = this.timeStamp.toString()
      var b = this.userInfo.userId.toString()
      this.orderNum = a + b
      // console.log(this.orderNum)
      // 生成取票号
      var c = this.cinemalist.cinemaId.toString()
      var d = this.sceneInfo.sceneId.toString()
      var e = this.userInfo.userId.toString()
      this.ticketCode = Math.ceil(Math.random() * 10) + c + d + e + Math.ceil(Math.random() * 10) + Math.ceil(Math.random() * 10)
      // console.log(typeof (this.ticketCode))

      let newdate = date.toLocaleString('chinese', { hour12: false });
      var SFMtime = newdate.substring(newdate.length-8,newdate.length)
      // console.log(SFMtime)
      this.orderTime = this.currentdate + ' '+ SFMtime
      // console.log(ordertime)

    },
    // getMyCoupon () {
    //   this.$axios.post("http://localhost:8080/getMyCoupon", {
    //     userId: this.userInfo.userId
    //   }).then((res) => {
    //     if (res.data.code == 200) {
    //       this.couponList = res.data.data
    //       console.log(this.couponList)
    //     }
    //   })
    // },

    // 验证座位
    selectSeatType () {
      this.$axios.post("http://localhost:8080/selectSeatType", {
        seatList: this.seatList,
        sceneId: this.sceneInfo.sceneId
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i][0].seatType == 2) {
              this.isSeatAvailable = false
              console.log(this.isSeatAvailable)
            }
          }
          console.log(this.isSeatAvailable)
          if (this.isSeatAvailable == true) {
            this.createOrder()
            // this.getSeatData()
            this.updateCouponData()
            this.$router.push('/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions/PayNow/PaySuccess')
          } else {
            this.$toast('座位已经被选了，请重新选座')
          }
        }
      })
    },
    // 密码输入
    onInput (key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length === 6 && this.value == this.password) {
        this.selectSeatType()
        // this.createOrder()
        //  this.$router.push('/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions/PayNow/PaySuccess')
      } else if (this.value.length === 6 && this.value != this.password) {
        this.errorInfo = '密码错误';
      } else {
        this.errorInfo = '';
      }
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    // 更新座位信息
    getSeatData () {
      this.$axios.post("http://localhost:8080/getSeatData", {
        seatList: this.seatList,
        sceneId: this.sceneInfo.sceneId,
        orderId: this.orderId
      }).then((res) => {
        if (res.data.code == 200) {
          // this.couponList = res.data.data
        }
        console.log(res)
      })
    },
    // 更新优惠券数量
    updateCouponData () {
      this.$axios.post("http://localhost:8080/updateCouponData", {
        couponId: this.couponlist.couponId
      }).then((res) => {
        if (res.data.code == 200) {
          // this.couponList = res.data.data
        }
        console.log(res)
      })
    },
    // 生成电影订单
    createOrder () {
      this.$axios.post("http://localhost:8080/createOrder", {
        orderNum: this.orderNum,
        userId: this.userInfo.userId,
        sceneId: this.sceneInfo.sceneId,
        ticketCode: this.ticketCode,
        cost: this.orderPrice,
        orderTime: this.orderTime,
        couponValue: this.couponValue
      }).then((res) => {
        if (res.data.code == 200) {
          // this.couponList = res.data.data
          this.orderId = res.data.data.insertId
          this.getSeatData()
          localStorage.setItem("order",JSON.stringify(this.orderId))
        }
        console.log(res.data.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  .order-price {
    text-align: center;
  }
  .van-icon-alipay {
    color: blue;
  }
  .van-icon-wechat {
    color: green;
  }
  .ticket-purchase {
    // position: fixed;
    // bottom: 0;
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
  .van-dialog {
    height: 480px;
  }
}
</style>