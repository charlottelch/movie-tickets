<template>
  <div class="main-con">
    <div class="personal-top container">
      <div class="portrait">
        <img v-if="userInfo.headPortrait!=null" :src="`${userInfo.headPortrait}`" alt />
      </div>
      <div class="info">
        <div>
          <h3>{{userInfo.userName}}</h3>
          <h3 @click="toLogin" v-show="token==false">登录/注册</h3>
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
            <span>每日签到</span>
            <span>签到有惊喜</span>
          </p>
        </div>
        <div class="list">
          <div @click="toMovieTickets">
            <div class="gradation-bk01">
              <img src="../../assets/icon/tickiets.png" alt />
            </div>
            <span>电影票</span>
          </div>
          <div @click="toMember">
            <div class="gradation-bk02">
              <img src="../../assets/icon/member.png" alt />
            </div>
            <span>会员</span>
          </div>
          <div @click="toCoupon">
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
          <div @click="toLikeMovie">
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
          <div @click="toUserComment">
            <img src="../../assets/icon/comment.png" alt />
            <span>评论</span>
          </div>
          <!-- <div>
            <img src="../../assets/icon/customer-service.png" alt />
            <span>客服</span>
          </div> -->
        </div>
        <div class="interaction" @click="toMyCommunity">
          <p class="title">互动社区</p>
          <div>
            <p>
              关注
              <span>{{followlist.length}}</span>
            </p>
            <p>
              粉丝
              <span>{{fans.length}}</span>
            </p>
            <p>
              动态
              <span>{{ownReleaseList.length}}</span>
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
      userInfo: {},
      token: false,
      followlist:[],
      fans:[],
      ownReleaseList: [],
      ownCollectList: []
    }
  },
  mounted () {
    this.receiveUserName()
    this.getVideoData()
    this.getUserInfo()
    // this.getLoginUserCommunity()
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
    toMember () {
      this.$router.push('/PersonalCenter/Member')
    },
    toCoupon () {
      this.$router.push('/PersonalCenter/Coupon')
    },
    toLikeMovie () {
      this.$router.push('/PersonalCenter/LikeMoviePage')
    },
    toUserComment(){
      this.$router.push('/PersonalCenter/UserComment')
    },
    toMyCommunity () {
      var videoArr = []
      console.log(this.userInfo)
      videoArr.push(this.userInfo)
      localStorage.setItem('video', JSON.stringify(videoArr));
      this.$router.push('/Community/PersonalHomepage')
    },
    // 获取动态数
    getVideoData () {
      this.$axios.post("/getVideoData", {
        userId: this.userInfo.userId,
        // concernedId: this.videoList.userId,
        // isFollow: this.isFollow
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
          this.ownReleaseList = res.data.data[0]
          this.ownCollectList = res.data.data[1]
          console.log(this.ownReleaseList)
          console.log(this.ownCollectList)
        } else {
        }
      })
    },
    // 获取关注和粉丝数
    getUserInfo () {
      this.$axios.post("/getUserInfo", {
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            this.followAndFansList = res.data.data
            this.followlist = res.data.data[0]
            this.fans = res.data.data[1]
            // console.log(this.followlist)
            // console.log(this.fans)
          }
        }
      })
    },
    receiveUserName () {
      if (this.$store.state.userInfo != null) {
        this.userInfo = this.$store.state.userInfo
        // 判断是否登录了
        this.token = this.$store.state.token
        console.log(this.userInfo)
        // console.log(this.token)
      }
      // console.log(this.userInfo.userName)
      // this.userName = this.userInfo
      // 路由传值
      // this.userName = this.$route.query.data 
    },
    // getLoginUserCommunity () {
    //   this.$axios.post("/getLoginUserCommunity", {
    //     userId: this.userInfo.userId,
    //   }).then((res) => {
    //     if (res.data.code == 200) {
    //       // this.toCheckFollow()
    //       console.log(res)
    //     } else {
    //     }
    //   })
    // }
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
    background: url('../../assets/personal-bg02.png') no-repeat;
    background-size: cover;
    background-position: 6% 82%;
    // background-image: radial-gradient(
    //   circle at 10% 50%,
    //   #99cccc 20%,
    //   #7171b7 40%,
    //   #cccc99 60%,
    //   #4f9c9c 80%
    // );
    color: white;
    border-radius: 0 0 10% 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .portrait{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #ffffffa1;
    }
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
