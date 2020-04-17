<template>
  <div class="main-con">
    <div class="personal-top container">
      <div class="portrait">
        <img src="../../assets/头像.jpg" alt />
      </div>
      <div class="info">
        <div>
          <h3 @click="toLogin">{{userName}}</h3>
        </div>
        <div class="top-right">
          <img src="../../assets/icon/massage.png" alt @click="goMessage" />
          <img src="../../assets/icon/setting.png" alt @click="goSetting" />
        </div>
      </div>
    </div>
    <div class="functional-area">
      <div class="container">
        <div class="sign-in" @click="toSignIn">
          <img src="../../assets/icon/sign-in.png" alt />
          <p>
            <span>签到有惊喜</span>
            <span>你已经签到2天</span>
          </p>
        </div>
        <div class="list">
          <div @click="toMovieTickets">
            <div class="gradation-bk01">
              <img src="../../assets/icon/tickiets.png" alt />
            </div>
            <span>电影票</span>
          </div>
          <div>
            <div class="gradation-bk02">
              <img src="../../assets/icon/member.png" alt />
            </div>
            <span>会员</span>
          </div>
          <div>
            <div class="gradation-bk03">
              <img src="../../assets/icon/coupon.png" alt />
            </div>
            <span>优惠券</span>
          </div>
          <div>
            <div class="gradation-bk04">
              <img src="../../assets/icon/snake.png" alt />
            </div>
            <span>小食</span>
          </div>
        </div>
        <div class="list">
          <div>
            <img src="../../assets/icon/want-to-watch.png" alt />
            <span>想看</span>
          </div>
          <div>
            <img src="../../assets/icon/collection.png" alt />
            <span>影单</span>
          </div>
          <div>
            <img src="../../assets/icon/watched.png" alt />
            <span>看过</span>
          </div>
          <div>
            <img src="../../assets/icon/comment.png" alt />
            <span>评论</span>
          </div>
          <div>
            <img src="../../assets/icon/customer-service.png" alt />
            <span>客服</span>
          </div>
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
            <p>
              动态
              <span>2</span>
            </p>
          </div>
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
      userName: '登录/注册',
      userInfo:{}
    }
  },
  mounted () {
    this.receiveUserName()
  },
  methods: {
    toLogin () {
      this.$router.push('/Login')
    },
    goMessage () {
      this.$router.push('/PersonalCenter/Message')
    },
    goSetting () {
      this.$router.push('/PersonalCenter/Setting')
    },
    toSignIn () {
      this.$router.push('/PersonalCenter/SignIn')
    },
    toMovieTickets () {
      this.$router.push('/PersonalCenter/MovieTickets')
    },
    receiveUserName () {
      // console.log(this.$store.state.userInfo)
      // this.userInfo = this.$store.state.userInfo 
      if(this.$store.state.userInfo != null){
        this.userName = this.$store.state.userInfo.userName
      }
      // console.log(this.userInfo.userName)
      // this.userName = this.userInfo
      // this.userName = this.$route.query.data 
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
    // background: #34c372;
    background-image: radial-gradient(
      circle at 10% 50%,
      #99cccc 20%,
      #7171b7 40%,
      #cccc99 60%,
      #4f9c9c 80%
    );
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
        img {
          width: 20px;
          height: 20px;
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
  .functional-area {
    position: absolute;
    top: 120px;
    // padding: 0 10px;
    width: 100%;
  }
  .sign-in {
    background: white;
    color: black;
    // width: 80%;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    border: 1px solid #ebedf0;
    padding: 10px;
    img {
      width: 40px;
      height: 40px;
    }
    // margin: auto 0;
  }
  .list {
    height: 100px;
    font-size: 36px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border: 1px solid #ebedf0;
    border-radius: 10px;
    img {
      width: 30px;
      height: 30px;
    }
    div {
      width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: green;
      }
      .gradation-bk01 {
        background-image: linear-gradient(to top right, #fc8778, #ffaf8a);
      }
      .gradation-bk02 {
        background-image: linear-gradient(to top right, #ff9e54, #fcc956);
      }
      .gradation-bk03 {
        background-image: linear-gradient(to top right, #52b7fd, #47dbfe);
      }
      .gradation-bk04 {
        background-image: linear-gradient(to top right, #16c49d, #4effbfe0);
      }
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
