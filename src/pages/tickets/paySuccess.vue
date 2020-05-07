<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="order-price">
      <p>支付成功</p>
      <p>
        <span>￥</span>
        <span>{{orderPrice}}</span>
      </p>
      <span class="toSeeTickets" @click="toSeeTickets">查看电影票</span>
    </div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'PaySuccess',
  data () {
    return {
      title: '',
      couponList: [],
      userInfo: {},
      payShow: false,
      orderPrice: ''
      // value: '',
      // showKeyboard: true,
      // errorInfo: '',
      // password:'123456'
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.orderPrice = JSON.parse(localStorage.getItem('orderPrice'))
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toSeeTickets () {
      this.$router.push("/PersonalCenter/MovieTickets/TicketDetail")
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  .order-price {
    text-align: center;
  }
  .toSeeTickets {
    display: inline-block;
    border: 1px solid #ff3174;
    padding: 5px 10px;
    color: #ff3174;
  }
}
</style>