<template>
  <div class="main-con">
    <nav-title-fixed :title="title"></nav-title-fixed>
    <div class="vid-wrap">
      <video width="100%" height="100%" controls>
        <source :src="`../../../static/video/${videoList.video}`" type="video/mp4" />您的浏览器不支持 HTML5 video 标签。
        <!-- <source src="../../../static/video/video01.mp4" type="video/mp4" /> -->
      </video>
    </div>
    <div class="text-area">
      <div class="description">
        <div class="top">
          <div class="user" @click="toUserDetailPage">
            <img src="../../assets/头像.jpg" alt />
            <p>{{videoList.userName}}</p>
          </div>
          <span class="follow" :class="[isFollow?'followed':'un-followed']" @click="follow">{{isFollow?'已关注':'关注'}}</span>
        </div>
        <p>标签</p>
        <p>{{videoList.videoDescribe}}</p>
      </div>
      <div class="functional-area">
        <div>
          <img
            v-show="isthumb == false || isthumb == null"
            src="../../assets/icon/thumb-grey.png"
            alt
            @click="toThumb"
          />
          <img
            v-show="isthumb == true"
            src="../../assets/icon/thumb-red.png"
            alt
            @click="toCancelThumb"
          />
          <span>{{videoList.likeNumber}}</span>
        </div>
        <div>
          <img
            v-show="isCollect == false || isCollect == null"
            @click="toCollect"
            src="../../assets/icon/collect-grey.png"
            alt
          />
          <img
            v-show="isCollect == true"
            @click="toCancelCollect"
            src="../../assets/icon/collect-yellow.png"
            alt
          />
          <span>收藏</span>
        </div>
        <div>
          <img src="../../assets/icon/share-grey.png" alt />
          <span>分享</span>
        </div>
      </div>
      <div class="comment">
        <p>评论</p>
        <div class="comment-detail">
          <img src="../../assets/头像.jpg" alt />
          <div>
            <p>用户</p>
            <p>好看，快乐源泉</p>
            <div class="reply">
              <img src="../../assets/头像.jpg" alt />
              <div>
                <p>用户1</p>
                <p>好看，快乐源泉</p>
              </div>
            </div>
            <div class="reply">
              <img src="../../assets/头像.jpg" alt />
              <div>
                <p>用户1</p>
                <p>好看，快乐源泉</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTitleFixed from "@/components/navTitleFixed"
export default {
  components: {
    NavTitleFixed
  },
  name: 'Video',
  data () {
    return {
      title: '',
      active: 0,
      videoList: {},
      userInfo: {},
      isthumb: null,
      isCollect: null,
      isFollow: null
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    // 视频数据
    this.videoList = JSON.parse(localStorage.getItem('video'))

    // this.videoList = this.$route.query.data
    console.log(this.videoList)
    // this.getUserInfo()
    // this.getAuthorInfo()
    this.toCheckFollow()
    this.toCheckThumb()
    this.toCheckCollect()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toUserDetailPage () {
      this.$router.push({ path: '/Community/PersonalHomepage', query: { data: this.videoList } })
    },
    // 拿取发布动态用户的信息
    getAuthorInfo () {
      this.$axios.post("http://localhost:8080/getAuthorInfo", {
        userId: this.videoList.userId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            // this.videoList = res.data.data
            // console.log(this.videoList)
          }
        }
      })
    },
    // 拿取该用户信息
    getUserInfo () {
      this.$axios.post("http://localhost:8080/getUserInfo", {
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            // this.videoList = res.data.data
            // console.log(this.videoList)
          }
        }
      })
    },
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
    // 点赞
    toCheckThumb () {
      this.$axios.post("http://localhost:8080/toCheckThumb", {
        userId: this.userInfo.userId,
        videoId: this.videoList.videoId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length != 0) {
            this.isthumb = true
          } else {
            this.isthumb = false
          }
        } else {
        }
        // console.log(res.data)
      })
    },
    // 点赞
    toThumb () {
      this.$axios.post("http://localhost:8080/toThumb", {
        userId: this.userInfo.userId,
        videoId: this.videoList.videoId,
        likeNumber: this.videoList.likeNumber
      }).then((res) => {
        if (res.data.code == 200) {
          this.videoList.likeNumber = this.videoList.likeNumber + 1
          // this.isthumb = true
          this.toCheckThumb()
        }
      })
    },
    // 取消点赞
    toCancelThumb () {
      this.$axios.post("http://localhost:8080/toCancelThumb", {
        userId: this.userInfo.userId,
        videoId: this.videoList.videoId,
        likeNumber: this.videoList.likeNumber
      }).then((res) => {
        if (res.data.code == 200) {
          this.videoList.likeNumber = this.videoList.likeNumber - 1
          // this.isthumb = true
          this.toCheckThumb()
        }
      })
    },
    toCheckCollect () {
      this.$axios.post("http://localhost:8080/toCheckCollect", {
        userId: this.userInfo.userId,
        videoId: this.videoList.videoId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length != 0) {
            this.isCollect = true
          } else {
            this.isCollect = false
          }
        } else {
        }
      })
    },
    toCollect () {
      this.$axios.post("http://localhost:8080/toCollect", {
        userId: this.userInfo.userId,
        videoId: this.videoList.videoId,
      }).then((res) => {
        if (res.data.code == 200) {
          // this.isthumb = true
          this.toCheckCollect()
        }
      })
    },
    toCancelCollect () {
      this.$axios.post("http://localhost:8080/toCancelCollect", {
        userId: this.userInfo.userId,
        videoId: this.videoList.videoId,
      }).then((res) => {
        if (res.data.code == 200) {
          // this.isthumb = true
          this.toCheckCollect()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // background: black;
  .vid-wrap {
    width: 100%;
    background: #000;
    position: relative;
    padding-bottom: 56.25%; /*需要用padding来维持16:9比例,也就是9除以16*/
    height: 0px;
  }
  .vid-wrap video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .text-area {
  }
  .description {
    padding: 0px 10px;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .user {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
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
    }
  }
  .functional-area {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid gray;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  .comment {
    padding: 0 10px;
    .comment-detail {
      display: flex;
      align-items: flex-start;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p {
        margin: 0;
      }
      .reply {
        display: flex;
        align-items: flex-start;
      }
    }
  }
}
</style>