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
      currentdate:''
    }
  },
  mounted () {
    this.movieList = JSON.parse(localStorage.getItem('movie'))
    console.log(this.movieList)
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
      console.log(this.userInfo)
    }
    

  },
  methods: {
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
    onClickLeft () {
      this.$router.push({ path: '/Tickets/MovieDetail' })
    },
    onClickRight () {
      // console.log(this.message)
      // this.$router.go(-1)
      // 新增评论
      this.getNowFormatDate()
      this.$axios.post("/score", {
        userId: this.userInfo.userId,
        movieId: this.movieList.movieId,
        score:this.score,
        comment:this.message,
        commentTime:this.currentdate
      }).then((res) => {
        console.log(res.data.code)
      })
      // 提交评分，更新电影平均评分
      this.$axios.post("/movieScore", {
        // userId: this.userInfo.userId,
        movieId: this.movieList.movieId
      }).then((res) => {
        // this.movieList.score=res.data.data[0].score
        console.log(res)
      })
      this.$router.push({ path: '/Tickets/MovieDetail'})
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
