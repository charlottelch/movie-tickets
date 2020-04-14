<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="sign-in">
      <div class="sign-in-show">
        <p>本周累计签到1天</p>
        <p>
          <span>210</span>
          <span>影豆</span>
        </p>
      </div>
      <div class="do-sign-in">
        <ul>
          <li v-for="item in 7">
            <span>1天</span>
            <img src="../../assets/icon/gift.png" alt />
          </li>
        </ul>
      </div>
      <div>
        <h3>影劵</h3>
        <div class="coupon-all">
          <div class="coupon">
            <div class="coupon-paper">￥10观影劵</div>
            <p>10元观影券</p>
            <div class="convert-coupon">
              <span>40影豆</span>
              <van-button round type="info" size="small">兑换</van-button>
            </div>
          </div>
          <div class="coupon">
            <div class="coupon-paper">￥10观影劵</div>
            <p>10元观影券</p>
            <div class="convert-coupon">
              <span>40影豆</span>
              <van-button round type="info" size="small">兑换</van-button>
            </div>
          </div>
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
  name: 'SignIn',
  data () {
    return {
      title: '签到',
      active: 0
    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.sign-in {
  padding: 0 10px;
  .sign-in-show {
    padding: 10px 20px;
    background: rgb(247, 179, 155);
    border-radius: 10px;
  }
  .do-sign-in {
    margin-top: 20px;
    border: 1px solid rgb(223, 222, 222);
    border-radius: 10px;
    ul {
      display: flex;
      justify-content: space-between;
      padding: 15px 10px;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 4px;
        background: rgb(248, 246, 246);
        font-size: 12px;
        color: #cdcdcd;
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  .coupon-all {
    display: flex;
    justify-content: space-between;
    .coupon {
      width: 160px;
      .coupon-paper {
        width: 100%;
        height: 100px;
        background: rgb(180, 196, 238);
      }
      .convert-coupon {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>