<template>
  <div class="main-con">
    <!-- <span class="search-form" @click="toSearchVideo">
        <van-icon name="search" size="16" />
        <p>搜影片、影人、影院</p>
      </span> -->
    <van-search v-model="value" shape="round" placeholder="输入关键词搜索动态" input-align="center" @click="toSearchVideo"/>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab title="热门">
        <div class="videos-parts">
          <div
            class="videos"
            v-for="(item,index) in videoList"
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
              <!-- <div class="right-great">
                <img
                  v-show="isthumb == false"
                  src="../../assets/icon/thumb-grey.png"
                  alt
                  @click="toThumb"
                />
                <img
                  v-show="isthumb == true"
                  src="../../assets/icon/thumb-red.png"
                  alt
                  @click="toCancelThumb"
                />
                <span>{{item.likeNumber}}</span>
              </div> -->
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="推荐">
        <div class="videos-parts">
          <div class="videos">
            <div class="video"></div>
            <p>2解读奥斯卡赢家《小丑》 解读奥斯卡赢家《小丑》解读奥斯卡赢家《小丑》解读奥斯卡赢家《小丑》解读奥斯卡赢家《小丑》解读奥斯卡赢家《小丑》解读奥斯卡赢家《小丑》解读奥斯卡赢家《小丑》解读奥斯卡赢家《小丑》</p>
            <div class="video-bottom">
              <div class="left-person">
                <img src="../../assets/头像.jpg" alt />
                <p>胶片看电影</p>
              </div>
              <div class="right-great">
                <van-icon name="good-job-o" />
                <span>5</span>
              </div>
            </div>
          </div>

          <div class="videos">
            <div class="video"></div>
            <p>3解读奥斯卡赢家《小丑》读奥斯卡赢家《小丑读奥斯卡赢家《小丑读奥斯卡赢家《小丑</p>
            <div class="video-bottom">
              <div class="left-person">
                <img src="../../assets/头像.jpg" alt />
                <p>胶片看电影</p>
              </div>
              <div class="right-great">
                <van-icon name="good-job-o" />
                <span>5</span>
              </div>
            </div>
          </div>

          <div class="videos">
            <div class="video"></div>
            <p>4解读奥斯卡赢家《小丑》</p>
            <div class="video-bottom">
              <div class="left-person">
                <img src="../../assets/头像.jpg" alt />
                <p>胶片看电影</p>
              </div>
              <div class="right-great">
                <van-icon name="good-job-o" />
                <span>5</span>
              </div>
            </div>
          </div>
          <div class="videos">
            <div class="video"></div>
            <p>4解读奥斯卡赢家《小丑》</p>
            <div class="video-bottom">
              <div class="left-person">
                <img src="../../assets/头像.jpg" alt />
                <p>胶片看电影</p>
              </div>
              <div class="right-great">
                <van-icon name="good-job-o" />
                <span>5</span>
              </div>
            </div>
          </div>

          <div class="videos">
            <div class="video"></div>
            <p>4解读奥斯卡赢家《小丑》</p>
            <div class="video-bottom">
              <div class="left-person">
                <img src="../../assets/头像.jpg" alt />
                <p>胶片看电影</p>
              </div>
              <div class="right-great">
                <van-icon name="good-job-o" />
                <span>5</span>
              </div>
            </div>
          </div>

          <div class="videos">
            <div class="video"></div>
            <p>4解读奥斯卡赢家《小丑》</p>
            <div class="video-bottom">
              <div class="left-person">
                <img src="../../assets/头像.jpg" alt />
                <p>胶片看电影</p>
              </div>
              <div class="right-great">
                <van-icon name="good-job-o" />
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <div class="add" @click="toEditCommunity">
      <img src="../../assets/icon/edit.png" alt />
      <!-- <van-icon name="plus" color="#ffffff" size="30" /> -->
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer"

export default {
  components: {
    Footer
  },
  name: 'Community',
  data () {
    return {
      active: 0,
      value: '',
      userInfo: {},
      videoList: [],
      // isthumb: null
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    console.log(this.userInfo)
    this.getVideo()
    // this.toCheckThumb()
  },
  methods: {
    toSearchVideo () {
      this.$router.push('/SearchVideo')
    },
    getVideo () {
      this.$axios.post("http://localhost:8080/getVideo", {
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            this.videoList = res.data.data
            console.log(this.videoList)
          }
        } else {
        }
        // console.log(res.data)
      })
    },
    toVideoDetail (item) {
      var videoArr=[]
      videoArr.push(item)
      localStorage.setItem('video', JSON.stringify(videoArr));
      this.$router.push({ path: '/Community/Video'})
    },
    toCheckThumb () {
        this.$axios.post("http://localhost:8080/toCheckThumb", {
          userId: this.userInfo.userId,
          videoId: this.videoList.videoId
        }).then((res) => {
          if (res.data.code == 200) {
            this.isthumb = true
          } else {
            this.isthumb = true
          }
          console.log(res.data)
        })
    },
    // toThumb () {
    // },
    // toCancelThumb () {
    // },
    toEditCommunity () {
      this.$router.push({ path: '/Community/EditCommunity'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-con {
  .search-form {
      width: 100%;
      height: 30px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      background: #f7f8fa;
      color: #adaeb0;
      padding: 0 10px;
    }
  /deep/ .van-tabs {
    .van-tabs__wrap {
      display: flex;
      background: white;
      justify-content: center;
      .van-tabs__nav {
        width: 200px;
      }
    }
  }
  .videos-parts {
    padding: 10px 10px 50px 10px;
    text-align: left;
    // display: flex;
    // flex-flow: column wrap;
    // height: 50vh;
    column-count: 2;
    column-gap: 2%;
    h3,
    p {
      margin: 0px;
    }
    .videos {
      border-radius: 5px;
      overflow: hidden;
      box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;
      // width: 48%;
      // margin-right: 2%;
      // margin-top: 10px;
      background-color: white;
      break-inside: avoid;
      margin-bottom: 10px;
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
      .describe{
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
  .add {
    background: hotpink;
    background-image: linear-gradient(to right top, #ff3174, #fe756b);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: fixed;
    bottom: 70px;
    right: 10px;
    text-align: center;
    line-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
    }
  }
}
</style>
