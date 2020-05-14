<template>
  <div class="main-con">
    <nav-title-fixed :title="title"></nav-title-fixed>
    <div class="movie-comment">
      <div class="film-review-part">
        <div class="film-review-user">
          <img :src="`${commentReplyList.headPortrait}`" alt />
          <span>{{commentReplyList.userName}}</span>
        </div>
        <p>{{commentReplyList.comment}}</p>
        <div class="review-bottom">
          <span>{{commentReplyList.commentTime}}</span>
          <div class="like-comment">
            <span class="like">
              <!-- <van-icon name="good-job-o" /> -->
              <img
                v-show="isLike==false || isLike==null"
                src="../../assets/icon/movie-like-grey.png"
                alt
              />
              <img v-show="isLike==true" src="../../assets/icon/movie-like-red.png" alt />
              <span>{{commentReplyList.likeCommentNum}}</span>
            </span>
            <span class="comment">
              <!-- <van-icon name="chat-o" /> -->
              <img src="../../assets/icon/movie-comment-grey.png" alt />
              <span>{{commentNum}}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="film-review-part" v-for="(item,index) in commentReplyList.reply" :key="index">
        <div class="film-review-user">
          <img :src="`${item.userReplied[0].headPortrait}`" alt />
          <span>{{item.userReplied[0].userName}}</span>
        </div>
        <p>
          <span>回复</span>
          <span>@{{item.userSend[0].userName}}：</span>
          <span>{{item.filmReplyContent}}</span>
        </p>
        <div class="review-bottom">
          <span>{{item.filmReplyTime}}</span>
          <!-- <div class="like-comment">
            <span class="like">
              <img
                v-show="isLike==false || isLike==null"
                src="../../assets/icon/movie-like-grey.png"
                alt
              />
              <img v-show="isLike==true" src="../../assets/icon/movie-like-red.png" alt />
              <span>{{commentReplyList.likeCommentNum}}</span>
            </span>
            <span class="comment">
              <img src="../../assets/icon/movie-comment-grey.png" alt />
              <span>{{commentReplyList.reply.length}}</span>
            </span>
          </div> -->
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
  name: 'MovieCommentReply',
  data () {
    return {
      title: '影评回复',
      // couponList: [],
      userInfo: {},
      sceneInfo: [],
      cinemaList: [],
      seatList: [],
      isLike:null,
      commentReplyList:[],
      commentNum:''
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.commentReplyList = JSON.parse(localStorage.getItem('movieCommentReply'))
    this.commentNum = this.commentReplyList.reply.length
    console.log(this.commentReplyList.reply.length)
    // this.getSeatData()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    
  }
}
</script>

<style lang="less" scoped>
.main-con {
  h3,
  p {
    margin: 10px 0;
  }
  .movie-comment{
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
}
</style>