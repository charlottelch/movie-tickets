<template>
  <div class="main-con">
    <!-- <nav-title-fixed :title="title"></nav-title-fixed> -->
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      fixed
      :class="[isScroll?'title-top':'title-top-scroll']"
    />

    <div class="vid-wrap">
      <video width="100%" height="100%" controls>
        <source :src="`${videoList.video}`" type="video/mp4" />您的浏览器不支持 HTML5 video 标签。
        <!-- <source src="../../../static/video/video01.mp4" type="video/mp4" /> -->
      </video>
    </div>
    <div class="text-area">
      <div class="description">
        <div class="top">
          <div class="user" @click="toUserDetailPage">
            <img :src="`${videoList.headPortrait}`" alt />
            <p>{{videoList.userName}}</p>
          </div>
          <span
            class="follow"
            :class="[isFollow?'followed':'un-followed']"
            @click="follow"
          >{{isFollow?'已关注':'关注'}}</span>
        </div>
        <p>{{videoList.videoLabel}}</p>
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
          <span>{{videoList.likeNumber==null?'点赞':videoList.likeNumber}}</span>
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
      <van-divider />
      <div class="comment">
        <p>评论</p>
        <!-- -->
        <div class="comment-detail" v-for="(item,index) in commentsList" :key="index">
          <img :src="`${item.headPortrait}`" alt />
          <div>
            <p @click="toUserPersonalHomepage(item)">{{item.userName}}</p>
            <p @click="replyUser(item)">{{item.commentContent}}</p>
            <div class="reply-area">
              <p v-for="(Ritem,index) in item.reply" :key="index">
                <span
                  class="reply-user"
                  @click="toUserPersonalHomepage(Ritem.userSend[0])"
                >{{Ritem.userSend[0].userName}}</span>
                <span v-if="Ritem.userReplied.length>0">回复</span>
                <span
                  class="reply-user"
                  v-if="Ritem.userReplied.length>0"
                  @click="toUserPersonalHomepage(Ritem.userReplied[0])"
                >{{Ritem.userReplied[0].userName}}</span>
                <span>：</span>
                <span @click="replySomeOne(item,Ritem)">{{Ritem.replyContent}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="input">
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        :placeholder="placeholder"
        v-show="isReply==false"
      >
        <template #button>
          <span @click="sendComment">发布</span>
        </template>
      </van-field>
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        :placeholder="placeholder"
        v-show="isReply==true"
      >
        <template #button>
          <span @click="sendReplyComment">发布</span>
        </template>
      </van-field>
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
      isFollow: null,
      commentsList: [],
      message: '',
      placeholder: '说点什么吧',
      isReply: false,
      currentdate: '',

      videoCommentId: '',
      repliedUserId: '',
      isScroll: true,

    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    // 视频数据
    // 每次页面都拿取localstorage里面最后一条数据
    var videoPlayList = JSON.parse(localStorage.getItem('video'))
    this.videoList = videoPlayList[videoPlayList.length - 1]
    // this.videoList = JSON.parse(localStorage.getItem('video'))

    // this.videoList = this.$route.query.data
    console.log(this.videoList)
    // this.getUserInfo()
    // this.getAuthorInfo()
    this.toCheckFollow()
    this.toCheckThumb()
    this.getCommentData()
    this.toCheckCollect()
    //首先，在mounted钩子window添加一个滚动滚动监听事件
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    //然后在方法中，添加这个handleScroll方法来获取滚动的位置，实现导航栏滚动时样式改变
    handleScroll () {
      let _this = this;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      if (scrollTop > 0) {
        _this.isScroll = false
      } else {
        _this.isScroll = true
      }
      // console.log(_this.isScroll)
    },
    onClickLeft () {
      // 返回上一个页面就删除一条localstorage的数据
      var videoPlayList = JSON.parse(localStorage.getItem('video'))
      console.log(videoPlayList)
      videoPlayList.pop()
      console.log(videoPlayList)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      this.$router.go(-1)
    },
    toUserDetailPage () {
      // 去到一个页面就向localstorage发一次
      var videoPlayList = JSON.parse(localStorage.getItem('video'))
      videoPlayList.push(this.videoList)
      console.log(videoPlayList)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      // 
      this.$router.push({ path: '/Community/PersonalHomepage' })
    },
    // 拿取发布动态用户的信息
    getAuthorInfo () {
      this.$axios.post("/getAuthorInfo", {
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
      this.$axios.post("/getUserInfo", {
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
      this.$axios.post("/toCheckFollow", {
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
      this.$axios.post("/follow", {
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
    // 初始化点赞
    toCheckThumb () {
      this.$axios.post("/toCheckThumb", {
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
      this.$axios.post("/toThumb", {
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
      this.$axios.post("/toCancelThumb", {
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
      this.$axios.post("/toCheckCollect", {
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
      this.$axios.post("/toCollect", {
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
      this.$axios.post("/toCancelCollect", {
        userId: this.userInfo.userId,
        videoId: this.videoList.videoId,
      }).then((res) => {
        if (res.data.code == 200) {
          // this.isthumb = true
          this.toCheckCollect()
        }
      })
    },
    // 获取时间
    getNowFormatDate () {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      this.currentdate = year + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + minutes + seperator2 + seconds;;
      // return currentdate;
      console.log(this.currentdate)
    },
    // 回复
    replyUser (item) {
      this.isReply = true
      this.placeholder = '回复@' + item.userName
      this.videoCommentId = item.videoCommentId
      this.repliedUserId = item.userCommentId
      // console.log(this.message)

      // console.log("hhhh")
      // this.getCommentData()
    },
    // 回复
    replySomeOne (item, Ritem) {
      this.isReply = true
      this.videoCommentId = item.videoCommentId
      this.repliedUserId = Ritem.userSend[0].userId
      console.log(this.repliedUserId)
      this.placeholder = '回复@' + Ritem.userSend[0].userName

    },
    // 获取评论数据
    getCommentData () {
      this.$axios.post("/getCommentData", {
        videoId: this.videoList.videoId,
      }).then((res) => {
        if (res.data.code == 200) {
          // this.isthumb = true
          // this.toCheckCollect()
          this.commentsList = res.data.data
          console.log(this.commentsList)
        }
      })
    },
    // 发布评论
    sendComment () {
      console.log(this.videoList.videoId, this.userInfo.userId, this.message, this.currentdate)
      this.getNowFormatDate()
      this.$axios.post("/sendComment", {
        videoId: this.videoList.videoId,
        userCommentId: this.userInfo.userId,
        commentContent: this.message,
        commentTime: this.currentdate
      }).then((res) => {
        if (res.data.code == 200) {
          this.getCommentData()
        }
      })
    },
    // 回复
    sendReplyComment () {
      this.getNowFormatDate()
      console.log(this.videoCommentId, this.userInfo.userId, this.repliedUserId, this.message, this.currentdate)
      this.$axios.post("/sendReplyComment", {
        videoCommentId: this.videoCommentId,
        userSendId: this.userInfo.userId,
        userRepliedId: this.repliedUserId,
        replyContent: this.message,
        replyTime: this.currentdate
      }).then((res) => {
        if (res.data.code == 200) {
          this.getCommentData()
        }
      })
    },
    toUserPersonalHomepage (item) {
      // 去到一个页面就向localstorage发一次
      // console.log(item)
      var videoPlayList = JSON.parse(localStorage.getItem('video'))
      videoPlayList.push(item)
      console.log(videoPlayList)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      this.$router.push({ path: '/Community/PersonalHomepage' })
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .title-top {
    // font-size: 10px;
    background-color: transparent !important;
    color: white;
    i {
      color: white;
    }
    .van-nav-bar__title {
      color: white;
    }
  }
  .title-top-scroll {
    background-color: white !important;
    color: black;
    i {
      color: black;
    }
    .van-nav-bar__title {
      color: black;
    }
  }
  /deep/ .van-hairline--bottom::after {
    border-bottom-width: 0px !important;
  }
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
    justify-content: space-around;
    // padding: 10px;
    // border-bottom: 1px solid gray;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
  .van-divider {
    margin: 10px 0 !important;
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
        margin: 5px;
      }
      .reply-area {
        background: #e4e2e273;
        width: 310px;
        .reply-user {
          color: rgb(64, 147, 224);
        }
      }
    }
  }
  /deep/ .van-field__control {
    height: 33px;
    line-height: 33px;
    border-radius: 33px;
    padding: 0 10px;
    background: #e4e2e273;
  }
  .input{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>