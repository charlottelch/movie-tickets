<template>
  <div class="main-con">
    <nav-title-fixed :title="title"></nav-title-fixed>
    <div class="movie-comment">
      <div class="film-review-part" v-for="(item,index) in commentList" :key="index">
        <div class="film-review-user">
          <img :src="`${item.headPortrait}`" alt />
          <span>{{item.userName}}</span>
        </div>
        <p>{{item.comment}}</p>
        <div class="review-bottom">
          <span>{{item.commentTime}}</span>
          <div class="like-comment">
            <span class="like">
              <!-- <van-icon name="good-job-o" /> -->
              <img
                v-show="isLike==false || isLike==null"
                src="../../assets/icon/movie-like-grey.png"
                alt
              />
              <img v-show="isLike==true" src="../../assets/icon/movie-like-red.png" alt />
              <span>{{item.likeCommentNum}}</span>
            </span>
            <span class="comment">
              <!-- <van-icon name="chat-o" /> -->
              <img src="../../assets/icon/movie-comment-grey.png" alt />
              <span>{{item.reply.length}}</span>
            </span>
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
  name: 'AllMovieComments',
  data () {
    return {
      title: '影评',
      // couponList: [],
      userInfo: {},
      sceneInfo: [],
      cinemaList: [],
      seatList: [],
      isLike:null,
      commentList:[]
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.commentList = JSON.parse(localStorage.getItem('movieComment'))
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