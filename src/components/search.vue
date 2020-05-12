<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="search-result">
      <div class="film" v-for="(mItem,index) in searchMovieList" :key="index">
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
        <!-- <van-button color="#7232dd" size="mini" round @click="goTicketsBuy(mItem)">购票</van-button> -->
      </div>
      <div class="performer" v-for="(item,index) in searchPerformerList" :key="index">
        <div class="information" @click="toPerformerDetail(item)">
          <img :src="`../../../static/images/${item.image}`" alt />
          <div>
            <h3>{{item.performerName}}</h3>
            <p>
              评分
              <span>{{item.occupation}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="cinema-all">
        <div
          class="cinema"
          v-for="(item,index) in searchCinemaList"
          :key="index"
          @click="toCinemaDetail(item)"
        >
          <div class="cinema-info">
            <div>
              <h3>{{item.cinemaName}}</h3>
              <p>{{item.cinemaAdress}}</p>
            </div>
            <div class="cinema-info-right">
              <span v-if="item.bottomPrice!=0">￥{{item.bottomPrice}}元</span>
              <span v-if="item.bottomPrice==0">暂无</span>
              <span v-if="item.bottomPrice!=0">起</span>
              <p>{{item.cinemaDistance}}km</p>
            </div>
          </div>
          <div class="label">
            <van-tag
              color="#ff3174"
              v-for="(Litem,index) in item.label"
              :key="index"
            >{{Litem.labelName}}</van-tag>
          </div>
        </div>
      </div>
    </div>
    <!-- <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" /> -->
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      inputText: '',
      searchMovieList: [],
      searchPerformerList: [],
      searchCinemaList: [],
    }
  },
  mounted () {
  },
  methods: {
    onSearch (val) {
      console.log(val);
      this.inputText = val
      this.getSearchAll()
    },
    onCancel () {
      this.$router.go(-1)
    },
    // 搜索的电影
    getSearchAll () {
      this.$axios.post("http://localhost:8080/getSearchAll", {
        inputText: this.inputText
      }).then((res) => {
        console.log(res.data.data)
        this.searchMovieList = res.data.data.movie[0]
        this.searchPerformerList = res.data.data.performer[0]
        this.searchCinemaList = res.data.data.cinema[0]
        console.log(this.searchMovieList)
        console.log(this.searchPerformerList)
        console.log(this.searchCinemaList)
      })
    },
    goMovieDetailPage (mItem) {
      // 电影信息存到localstorage
      this.$router.push({ path: '/Tickets/MovieDetail' })
      localStorage.setItem('movie', JSON.stringify(mItem));
    },
    // 去演员简介页面
    toPerformerDetail(item){
      localStorage.setItem('performer',JSON.stringify(item))
      this.$router.push('/Tickets/MovieDetail/Performer')
    },
    toCinemaDetail (item) {
      this.$router.push('/Tickets/CinemaDetail')
      localStorage.setItem('cinema', JSON.stringify(item));

    },
  }
}
</script>

<style lang="less" scoped>
.search-result {
  h3,
  p {
    margin: 5px 0;
  }
  padding: 0 10px;
  font-size: 12px;

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
  .performer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    .information {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
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
  .cinema-all {
    // margin-bottom: 60px;
    .cinema {
      text-align: left;
      border-bottom: 1px solid #ebedf0;
      padding: 5px 0;
      .cinema-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .cinema-info-right {
          text-align: right;
        }
      }
      .van-tag {
        margin-right: 2px;
      }
    }
  }
}
</style>