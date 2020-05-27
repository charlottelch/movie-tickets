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
      <div class="videos-parts">
        <div
          class="videos"
          v-for="(item,index) in searchVideoList"
          :key="index"
          @click="toVideoDetail(item)"
        >
          <div class="video">
            <img :src="`${item.videoCover}`" alt />
            <!-- <img src="../../../static/images/video-img01.png" alt="">  headPortrait-->
          </div>
          <p class="describe">{{item.videoDescribe}}</p>
          <div class="video-bottom">
            <div class="left-person">
              <img :src="`${item.headPortrait}`" alt />
              <p>{{item.userName}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchVideo',
  data () {
    return {
      value: '',
      inputText: '',
      searchVideoList: [],
    }
  },
  mounted () {
  },
  methods: {
    onSearch (val) {
      console.log(val);
      this.inputText = val
      if (this.inputText != '') {
        // this.addSearchHistory()
        // this.getSearchAll()
        // this.getSearchHistory()
        this.getSearchVideo()

      } else {
        this.$toast("请输入搜索内容")
      }
      // this.getSearchVideo()
    },
    onCancel () {
      this.$router.go(-1)
    },
    // 搜索的电影
    getSearchVideo () {
      this.$axios.post("/getSearchVideo", {
        inputText: this.inputText
      }).then((res) => {
        console.log(res.data.data)
        this.searchVideoList = res.data.data
      })
    },
    toVideoDetail (item) {
      var videoArr = []
      videoArr.push(item)
      localStorage.setItem('video', JSON.stringify(videoArr));
      this.$router.push({ path: '/Community/Video' })
    }
  }
}
</script>

<style lang="less" scoped>
.videos-parts {
  padding: 10px 10px 50px 10px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // display: flex;
  // flex-flow: column wrap;
  // height: 50vh;
  // column-count: 2;
  // column-gap: 2%;
  h3,
  p {
    margin: 0px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .videos {
    border-radius: 5px;
    overflow: hidden;
    box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;
    // width: 48%;
    // margin-right: 2%;
    // margin-top: 10px;
    background-color: white;
    // break-inside: avoid;
    margin-bottom: 10px;
    width: 48%;
    overflow: hidden;
    // margin: 10px;
    // width: calc(100% / 2 - 20px);
    .video {
      height: 200px;
      background-color: #2c2d2d;
      overflow: hidden;
      img {
        // height: 200px;
        width: 100%;
      }
    }
    .describe {
      padding: 5px;
    }
    .video-bottom {
      padding: 0px 5px 10px 5px;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      .left-person {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
    }
    .right-great {
      img {
        width: 16px;
      }
    }
  }
}
</style>