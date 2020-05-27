<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
      />
    </form>
    <div class="history" v-show="searchHistoryShow == true"> 
      <p>历史记录</p>
      <span
        v-for="(item,index) in historyList"
        :key="index"
        @click="historySearch(item)"
        v-if="index<9"
      >{{item.searchHistoryContent}}</span>
    </div>
    <div class="search-result">
      <p v-if="searchMovieList.length>0" class="title">电影</p>
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
      <p v-if="searchPerformerList.length>0" class="title">影人</p>
      <div class="performer" v-for="(item,index) in searchPerformerList" :key="index">
        <div class="information" @click="toPerformerDetail(item)">
          <img :src="`../../../static/images/${item.image}`" alt />
          <div>
            <h3>{{item.performerName}}</h3>
            <p>
              职业：
              <span>{{item.occupation}}</span>
            </p>
          </div>
        </div>
      </div>
      <p v-if="searchCinemaList.length>0" class="title">影院</p>
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
      historyList: [],
      searchHistoryShow:true
    }
  },
  mounted () {
    this.getSearchHistory()
  },
  methods: {
    onSearch (val) {
      console.log(val);
      this.inputText = val
      // this.addSearchHistory()
      // this.getSearchAll()
      // this.getSearchHistory()
      if (this.inputText != '') {
        this.addSearchHistory()
        this.getSearchAll()
        this.getSearchHistory()
      }else{
        this.$toast("请输入搜索内容")
      }
    },
    onClear (val) {
      val = ''
    },
    onCancel () {
      this.$router.go(-1)
    },
    // 搜索的电影、影院、影人
    getSearchAll () {
      this.searchHistoryShow = false
      this.$axios.post("/getSearchAll", {
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
    // 得到搜索历史
    getSearchHistory () {
      this.$axios.post("/getSearchHistory", {
      }).then((res) => {
        this.historyList = res.data.data
        console.log(this.historyList)
      })
    },
    // 添加搜索历史
    addSearchHistory () {
      this.$axios.post("/addSearchHistory", {
        searchHistoryContent: this.inputText
      }).then((res) => {

      })
    },
    // 点击历史记录搜索
    historySearch (item) {
      this.inputText = item.searchHistoryContent
      // this.addSearchHistory()
      this.getSearchHistory()
      this.getSearchAll()
    },
    goMovieDetailPage (mItem) {
      // 电影信息存到localstorage
      this.$router.push({ path: '/Tickets/MovieDetail' })
      localStorage.setItem('movie', JSON.stringify(mItem));
    },
    // 去演员简介页面
    toPerformerDetail (item) {
      localStorage.setItem('performer', JSON.stringify(item))
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
.history {
  padding: 0 10px;
  p {
    margin: 10px 0;
  }
  span {
    display: inline-block;
    background: #f7f8fa;
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
    padding: 5px 20px;
    margin-right: 8px;
    margin-bottom: 8px;
    font-size: 14px;
  }
}
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
        width: 90px;
        height: 115px;
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
        width: 90px;
        height: 115px;
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