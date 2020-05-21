<template>
  <div class="main-con">
    <nav-title-fixed :title="title"></nav-title-fixed>
    <div class="movie-comment">
      <div class="film-review-part">
        <div class="film-review-user">
          <img :src="`${commentListOne.headPortrait}`" alt />
          <span>{{commentListOne.userName}}</span>
        </div>
        <p @click="replyUser">{{commentListOne.comment}}</p>
        <div class="review-bottom">
          <span>{{commentListOne.commentTime}}</span>
          <div class="like-comment">
            <!-- <span class="like">
              <img
                v-show="isLike==false || isLike==null"
                src="../../assets/icon/movie-like-grey.png"
                alt
              />
              <img v-show="isLike==true" src="../../assets/icon/movie-like-red.png" alt />
              <span>{{commentReplyList.likeCommentNum}}</span>
            </span>-->
            <span class="comment">
              <!-- <van-icon name="chat-o" /> -->
              <img src="../../assets/icon/movie-comment-grey.png" alt />
              <span>{{commentNum}}</span>
            </span>
          </div>
        </div>
      </div>
      <h4>最新评论</h4>
      <div class="film-review-part" v-for="(item,index) in commentListOne.reply" :key="index">
        <div class="film-review-user">
          <img :src="`${item.userSend[0].headPortrait}`" alt />
          <span>{{item.userSend[0].userName}}</span>
        </div>
        <p>
          <span>回复</span>
          <span>@{{item.userReplied[0].userName}}：</span>
          <span @click="replySomeOne(item)">{{item.filmReplyContent}}</span>
        </p>
        <div class="review-bottom">
          <span>{{item.filmReplyTime}}</span>
        </div>
      </div>
    </div>
    <div class="input">
      <van-field v-model="message" rows="1" autosize type="textarea" :placeholder="placeholder">
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
  name: 'MovieCommentReply',
  data () {
    return {
      title: '影评回复',
      // couponList: [],
      userInfo: {},
      currentdate: '',
      isLike: null,
      commentReplyList: [],
      commentNum: '',
      message: '',
      placeholder: '',
      userFilmRepliedId: '',
      commentListOne:[]
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.commentReplyList = JSON.parse(localStorage.getItem('movieCommentReply'))
    this.commentNum = this.commentReplyList.reply.length
    this.userFilmRepliedId = this.commentReplyList.userId
    console.log(this.commentReplyList.reply.length)
    this.getMovieCommentDataOne()
    // this.getSeatData()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
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
    // 获取的影评
    getMovieCommentDataOne () {
      this.$axios.post("/getMovieCommentDataOne", {
        id: this.commentReplyList.id,
        movieId: this.commentReplyList.movieId
      }).then((res) => {
        this.commentListOne = res.data.data[0]
        // if(this.commentListOne.reply.length>0){
        this.commentNum =  this.commentListOne.reply.length
        // }
        console.log(this.commentListOne)
      })
    },
    replyUser () {
      this.placeholder = '@' + this.commentReplyList.userName
      this.userFilmRepliedId = this.commentReplyList.userId
      console.log(this.userFilmRepliedId)

    },
    replySomeOne (item) {
      this.placeholder = '@' + item.userSend[0].userName
      this.userFilmRepliedId = item.userSend[0].userId
      console.log(this.userFilmRepliedId)
      // this.filmReplyContent=item.filmReplyContent
    },
    sendReplyComment () {
      this.getNowFormatDate()
      this.$axios.post("/sendFilmReplyComment", {
        filmCommentId: this.commentReplyList.id,
        userFilmSendId: this.userInfo.userId,
        userFilmRepliedId: this.userFilmRepliedId,
        filmReplyContent: this.message,
        filmReplyTime: this.currentdate
      }).then((res) => {
        if (res.data.code == 200) {
          this.getMovieCommentDataOne()
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.main-con {
  h3,
  p {
    margin: 10px 0;
  }
  .movie-comment {
    padding: 46px 10px 0 10px;
  }
  .film-review-part {
    padding: 10px 0;
    // border-bottom: 1px solid #ddd;
    .film-review-user {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p {
        text-align: left;
      }
    }
    .review-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      .like-comment {
        display: flex;
        align-items: center;
        .like {
          display: flex;
          align-items: center;
          span {
            padding-left: 3px;
          }
          margin-right: 10px;
        }
        .comment {
          display: flex;
          align-items: center;
          span {
            padding-left: 3px;
          }
        }
        img {
          width: 20px;
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