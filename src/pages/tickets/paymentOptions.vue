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
    <div>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="支付宝" icon="alipay" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="微信" icon="wechat" clickable @click="radio = '2'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="ticket-purchase" @click="confirmPayment">
      <span>
        <span>确认支付</span>
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
  name: 'PaymentOptions',
  data () {
    return {
      title: '支付订单',
      couponList: [],
      userInfo: {},
      sceneInfo: [],
      seatList: [],
      isSeatAvailable: true,
      radio: '1',
      orderPrice: ''
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.sceneInfo = JSON.parse(localStorage.getItem('scene'))
    this.seatList = JSON.parse(localStorage.getItem('seat'))
    this.orderPrice = JSON.parse(localStorage.getItem('orderPrice'))
    console.log(this.orderPrice)
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
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
            // this.$router.push({path:'/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions'})
            this.$router.push({ path: '/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions/PayNow', query: { data: this.radio } })
            // var orderPrice = this.sceneInfo.ticketPrice * this.seatList.length-this.allowance
            // localStorage.setItem('orderPrice', JSON.stringify(orderPrice))
            // this.getSeatData()
          } else {
            this.$toast('座位已经被选了，请重新选座')
          }
        }
      })
    },
    confirmPayment () {
      this.selectSeatType()
      // this.$router.push({path:'/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions/PayNow',query:{data:this.radio}})
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
    width: 40;
  }
  .van-icon-wechat {
    color: green;
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