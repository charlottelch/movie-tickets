<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="likeMovie">
      <div class="film" v-for="(mItem,index) in likeMovieList" :key="index">
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
              <span v-for="(dItem,index) in mItem.director" :key="index">{{dItem.performerName}}</span>
            </p>
            <p>
              主演:
              <span v-for="(aItem,index) in mItem.actor" :key="index">
                <span>{{aItem.performerName}}</span>
              </span>
            </p>
          </div>
        </div>
        <van-button color="#7232dd" size="mini" round @click="goTicketsBuy(mItem)">购票</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'LikeMoviePage',
  data () {
    return {
      title: '想看电影',
      likeMovieList: [],
      userInfo: {},
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.getLikeMovieData()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getLikeMovieData () {
      this.$axios.post("http://localhost:8080/getLikeMovieData", {
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          this.likeMovieList = res.data.data
          console.log(this.likeMovieList)
        }
      })
    },
    goMovieDetailPage (mItem) {
      // 电影信息存到localstorage
      this.$router.push({ path: '/Tickets/MovieDetail' })
      localStorage.setItem('movie', JSON.stringify(mItem));
    },
    goTicketsBuy (mItem) {
      this.$router.push('/Tickets/TicketsBuy')
      localStorage.setItem('movie', JSON.stringify(mItem));
    },
  }
}
</script>

<style lang="less" scoped>
.main-con {
  .likeMovie{
    // width: 100%;
    padding: 0 10px;
  }
  .film {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    .information {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      font-size: 12px;
      img {
        width: 80px;
        height: 120px;
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
}
</style>