<template>
  <div class="main-con">
    <nav-title-fixed :title="title"></nav-title-fixed>
    <div class="userComment">
      <div v-for="(mItem,index) in userCommentList" :key="index" class="film-comment">
        <div class="film">
          <div class="information" @click="goMovieDetailPage(mItem)">
            <img :src="`../../../static/${mItem.movieImg}`" alt />
            <div>
              <h3>{{mItem.movieName}}</h3>
              <p>
                评分
                <span>{{mItem.score}}</span>
              </p>
              <p>
                导演:
                <span
                  v-for="(dItem,index) in mItem.director"
                  :key="index"
                  style="paddingRight:4px"
                >{{dItem.performerName}}</span>
              </p>
              <p>
                主演:
                <span v-for="(aItem,index) in mItem.actor" :key="index">
                  <span style="paddingRight:4px">{{aItem.performerName}}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="comment" @click="toMovieCommentAndReply(mItem)">
          <p>我评:</p>
          <p>{{mItem.comment}}</p>
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
  name: 'UserComment',
  data () {
    return {
      title: '我的影评',
      // couponList: [],
      userInfo: {},
      sceneInfo: [],
      cinemaList: [],
      seatList: [],
      userCommentList: []
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }

    this.getUserCommentData()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getUserCommentData () {
      this.$axios.post("/getUserCommentData", {
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          // this.couponList = res.data.data
          this.userCommentList = res.data.data
        }
        console.log(res)
      })
    },
    goMovieDetailPage (mItem) {
      // 电影信息存到localstorage
      this.$router.push({ path: '/Tickets/MovieDetail' })
      localStorage.setItem('movie', JSON.stringify(mItem));
    },
    toMovieCommentAndReply (mItem) {
      console.log(mItem)
      localStorage.setItem('movieCommentReply', JSON.stringify(mItem))
      this.$router.push('/Tickets/MovieDetail/AllMovieComments/MovieCommentReply')
    },

  }
}
</script>

<style lang="less" scoped>
.main-con {
  font-size: 12px;
  .userComment {
    margin-top: 46px;
    padding: 0 10px;
    .film-comment {
      padding: 10px 0;
      border-bottom: 1px solid #80808014;
    }
    .film {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // padding: 10px 0px;
      .information {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        font-size: 12px;
        img {
          width: 90px;
          height: 115px;
          border-radius: 4px;
        }
        h3 {
          margin: 8px;
        }
        p {
          margin: 8px;
        }
      }
      button {
        // z-index: 100;
      }
    }
    .comment {
      margin: 10px 0;
      background: #80808014;
      padding: 10px;
      p {
        margin: 0;
      }
    }
  }
}
</style>