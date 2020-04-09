<template>
  <div class="main-con">
    <div class="personal-top container">
      <div class="portrait">
        <img src="../../assets/头像.jpg" alt />
      </div>
      <div class="info">
        <div>
          <h3>昵称</h3>
          <p>签到有惊喜</p>
        </div>
        <div class="top-right">
          <van-icon name="comment-o" size="20" />
          <van-icon name="setting-o" size="20" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="list">
        <div>
          <van-icon name="service-o" />
          <span>客服</span>
        </div>
        <div>
          <van-icon name="bill-o" color="#db831f" />
          <span>订单</span>
        </div>
        <div>
          <van-icon name="star-o" color="#e5f132" />
          <span>收藏</span>
        </div>
        <div>
          <van-icon name="coupon-o" color="#32f182" />
          <span>优惠券</span>
        </div>
      </div>
      <div>
        <p>电影票</p>
        <p>看过</p>
        <p>想看</p>
        <p>影单</p>
      </div>
      <div class="interaction">
        <p class="title">互动社区</p>
        <div>
          <p>
            关注
            <span>3</span>
          </p>
          <p>
            粉丝
            <span>0</span>
          </p>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer"

export default {
  components: {
    Footer
  },
  name: 'HomePage',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-con {
  h3,
  p {
    margin: 0 5px;
  }
  .container {
    padding-left: 10px;
    padding-right: 10px;
  }
  .personal-top {
    height: 150px;
    background: rgb(194, 105, 70);
    color: white;
    border-radius: 0 0 10% 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .info {
      width: 80%;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .top-right {
        i {
          padding-left: 10px;
        }
      }
      div {
        p {
          display: inline-block;
          width: 100px;
          height: 30px;
          // background-color: #e47553;
          border-radius: 30px;
          text-align: center;
          line-height: 30px;
          color: aliceblue;
        }
      }
    }
  }
  .sign-in {
    // position: absolute;
    // top: 130px;
    // left: 5%;
    background: white;
    color: black;
    // width: 80%;
    height: 40px;
    border-radius: 10px;
    padding: 10px;
    margin: auto 0;
  }
  .list {
    height: 100px;
    font-size: 36px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border: 1px solid #ebedf0;
    border-radius: 10px;
    div {
      width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 14px;
      }
    }
  }
  .interaction {
    // height: 100px;
    margin-top: 20px;
    border: 1px solid #ebedf0;
    border-radius: 10px;
    text-align: left;
    padding: 0 8px;
    .title {
      padding: 4px 0;
      border-bottom: 1px solid #ebedf0;
    }
    div {
      height: 80px;
      display: flex;
      align-items: center;
      p {
        width: 50%;
      }
    }
  }
}
</style>
