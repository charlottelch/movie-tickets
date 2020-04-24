<template>
  <div class="main-con">
    <van-nav-bar
      title="电影名称"
      left-text="关闭"
      right-text="发布"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="grade-score">
      <h3>
        <span>我的评分</span>
        {{this.score}}分
      </h3>
      <!-- <p>很不错</p> -->
      <van-rate
        v-model="value"
        allow-half
        :size="25"
        void-icon="star"
        color="rgb(255, 49, 116)"
        void-color="#eee"
        @change="changGrade"
      />
    </div>
    <van-field v-model="message" rows="1" autosize type="textarea" placeholder="不要吝啬你的赞美和吐槽" />
  </div>
</template>

<script>
export default {
  name: 'Grade',
  data () {
    return {
      value: 3,
      message: '',
      score: '6',
      userInfo: {},
      movieList: [],
    }
  },
  mounted () {
    this.movieList = this.$route.query.data
    console.log(this.movieList)
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
      console.log(this.userInfo)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({ path: '/Tickets/MovieDetail' })
    },
    onClickRight () {
      // console.log(this.message)
      this.$router.push({ path: '/Tickets/MovieDetail'})
      // this.$router.go(-1)
      this.$axios.post("http://localhost:8080/score", {
        userId: this.userInfo.userId,
        movieId: this.movieList.movieId,
        score:this.score,
        comment:this.message
      }).then((res) => {
        console.log(res.data.code)
      })
      // 提交评分，更新电影平均评分
      this.$axios.post("http://localhost:8080/movieScore", {
        // userId: this.userInfo.userId,
        movieId: this.movieList.movieId
      }).then((res) => {
        // this.movieList.score=res.data.data[0].score
        console.log(res)
      })

    },
    changGrade (value) {
      this.score = value * 2
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  padding-left: 10px;
  padding-right: 10px;
  .grade-score {
    text-align: center;
    border-bottom: 1px solid #ebedf0;
    padding-bottom: 10px;
    h3 {
      color: rgb(255, 49, 116);
      span {
        font-weight: 400;
        font-size: 16px;
        color: black;
        margin-right: 4px;
      }
    }
  }
}
</style>
