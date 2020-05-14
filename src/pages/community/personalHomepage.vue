<template>
  <div class="main-con">
    <!-- <nav-title-fixed :title="title"></nav-title-fixed> -->
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" fixed />
    <!-- <div class="top-bg">
      <img src="../../assets/timg (1).jpg" alt />
    </div>-->
    <div class="infoCard">
      <div class="user-info-show">
        <div>
          <img :src="`${videoList.headPortrait}`" alt />
        </div>
        <span>{{videoList.userName}}</span>
      </div>
      <div class="follow-fans">
        <span
          @click="toFollowFansList(index)"
          v-for="(item,index) in followAndFansList"
          :key="index"
        >
          <span>{{item.length}}</span>
          {{index==0?'关注':'粉丝'}}
        </span>
        <!-- <span>
          <span>{{item.length}}</span>粉丝
        </span>-->
      </div>
      <span
        class="follow"
        :class="[isFollow?'followed':'un-followed']"
        @click="follow"
        v-if="videoList.userId != userInfo.userId"
      >{{isFollow?'已关注':'关注'}}</span>
    </div>
    <van-tabs v-model="active" sticky offset-top="46">
      <van-tab title="动态">
        <div class="videos-parts">
          <div
            class="videos"
            v-for="(item,index) in ownReleaseList"
            :key="index"
            @click="toVideoDetail(item)"
          >
            <div class="video">
              <img :src="`${item.videoCover}`" alt />
            </div>
            <p class="describe">{{item.videoDescribe}}</p>
            <div class="video-bottom">
              <div class="left-person">
                <img :src="`${item.headPortrait}`" alt />
                <p>{{item.userName}}</p>
              </div>
              <!-- <div class="right-great">
                <van-icon name="good-job-o" />
                <span>5</span>
              </div>-->
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="收藏">
        <div class="videos-parts">
          <div
            class="videos"
            v-for="(item,index) in ownCollectList"
            :key="index"
            @click="toVideoCollectDetail(item)"
          >
            <div class="video">
              <img :src="`../../../static/images/${item.videoCover}`" alt />
            </div>
            <p>{{item.videoDescribe}}</p>
            <div class="video-bottom">
              <div class="left-person">
                <img src="../../assets/头像.jpg" alt />
                <p>{{item.userName}}</p>
              </div>
              <!-- <div class="right-great">
                <van-icon name="good-job-o" />
                <span>5</span>
              </div>-->
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavTitleFixed from "@/components/navTitleFixed"
export default {
  components: {
    NavTitleFixed
  },
  name: 'PersonalHomepage',
  data () {
    return {
      title: '',
      active: 0,
      videoList: {},
      userInfo: {},
      // followlist: [{ "follow": '--' }],
      // fans: [{ "fans": '--' }],
      followAndFansList: [],
      isFollow: null,
      ownReleaseList: [],
      ownCollectList: []
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    // 视频数据
    // this.videoList = this.$route.query.data
    var videoPlayList = JSON.parse(localStorage.getItem('video'))
    this.videoList = videoPlayList[videoPlayList.length - 1]

    // this.videoList = JSON.parse(localStorage.getItem('video'))
    this.getUserInfo()
    this.toCheckFollow()
    this.getVideoData()
  },
  methods: {
    onClickLeft () {
      // cs
      var videoPlayList = JSON.parse(localStorage.getItem('video'))
      console.log(videoPlayList)
      videoPlayList.pop()
      console.log(videoPlayList)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      // cs
      this.$router.go(-1)
    },
    // 拿取该用户信息
    getUserInfo () {
      this.$axios.post("http://localhost:8080/getUserInfo", {
        userId: this.videoList.userId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            this.followAndFansList = res.data.data
            // this.followlist = res.data.data[0]
            // this.fans = res.data.data[1]
            // console.log(this.followlist)
            // console.log(this.fans)
          }
        }
      })
    },
    // 是否关注了
    toCheckFollow () {
      this.$axios.post("http://localhost:8080/toCheckFollow", {
        userId: this.userInfo.userId,
        concernedId: this.videoList.userId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length != 0) {
            this.isFollow = true
          } else {
            this.isFollow = false
          }
        } else {
        }
      })
    },
    // 关注或取消关注
    follow () {
      this.$axios.post("http://localhost:8080/follow", {
        userId: this.userInfo.userId,
        concernedId: this.videoList.userId,
        isFollow: this.isFollow
      }).then((res) => {
        if (res.data.code == 200) {
          this.toCheckFollow()
        } else {
        }
      })
    },
    getVideoData () {
      this.$axios.post("http://localhost:8080/getVideoData", {
        userId: this.videoList.userId,
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
    // 自己的动态页
    toVideoDetail (item) {
      console.log("jjj")
      var videoPlayList = JSON.parse(localStorage.getItem('video'))
      videoPlayList.push(item)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      this.$router.push({ path: '/Community/Video', query: { data: item } })

      console.log("jjj")
    },
    // 收藏用户的动态页
    toVideoCollectDetail (item) {
      var videoPlayList = JSON.parse(localStorage.getItem('video'))
      videoPlayList.push(item)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      this.$router.push({ path: '/Community/Video', query: { data: item } })
      // localStorage.setItem('video', JSON.stringify(item));
      console.log("hhh")
    },
    // 查看关注或者粉丝的列表
    toFollowFansList (index) {
      localStorage.setItem('followOrFans', JSON.stringify(index));
      // cs
      var videoPlayList = JSON.parse(localStorage.getItem('video'))
      videoPlayList.push(this.videoList)
      console.log(videoPlayList)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      // cs
      this.$router.push({ path: '/Community/FollowAndFansList' })
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  width: 100%;
  height: 100%;
  .top-bg {
    img {
      width: 100%;
    }
  }
  .infoCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 46px;
  }
  .user-info-show {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .follow-fans {
    margin: 10px 0;
    span {
      padding: 0 6px;
      span {
        font-size: 28px;
      }
    }
  }
  .follow {
    display: inline-block;
    height: 25px;
    width: 100px;
    text-align: center;
    line-height: 25px;
    // color: white;
    border-radius: 25px;
    // background-image: linear-gradient(to right, #ff3174, #fe756b);
  }
  .followed {
    color: #ff3174;
    border: 1px solid #ff3174;
  }
  .un-followed {
    color: white;
    background-image: linear-gradient(to right, #ff3174, #fe756b);
  }
  .videos-parts {
    padding: 10px 10px 50px 10px;
    text-align: left;
    // display: flex;
    // flex-flow: column wrap;
    // height: 50vh;
    column-count: 2;
    column-gap: 2%;
    h3,
    p {
      margin: 0px;
    }
    .videos {
      // width: 48%;
      // margin-right: 2%;
      // margin-top: 10px;
      border-radius: 5px;
      box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;
      background-color: white;
      break-inside: avoid;
      margin-bottom: 10px;
      // margin: 10px;
      // width: calc(100% / 2 - 20px);
      .video {
        height: 200px;
        background-color: rgb(69, 121, 121);
        overflow: hidden;
        img {
          // height: 200px;
          width: 100%;
        }
      }
      .describe {
        padding: 5px;
      }
      .video-bottom {
        padding: 0px 5px 10px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-person {
          display: flex;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>