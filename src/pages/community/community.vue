<template>
  <div class="main-con">
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" input-align="center" />
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
              <img :src="`../../../static/images/${item.videoCover}`" alt />
              <!-- <img src="../../../static/images/video-img01.png" alt=""> -->
            </div>
            <p>{{item.videoDescribe}}</p>
            <div class="video-bottom">
              <div class="left-person">
                <img src="../../assets/头像.jpg" alt />
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

    <div class="add">
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
      active: 1,
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
      this.$router.push({ path: '/Community/Video'})
      localStorage.setItem('video', JSON.stringify(item));
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
    toThumb () {

    },
    toCancelThumb () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-con {
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
    text-align: left;
    // display: flex;
    // flex-flow: column wrap;
    // height: 50vh;
    column-count: 2;
    column-gap: 2%;
    h3,
    p {
      margin: 0 5px;
    }
    .videos {
      // width: 48%;
      // margin-right: 2%;
      // margin-top: 10px;
      background-color: rgb(230, 230, 230);
      break-inside: avoid;
      margin-bottom: 10px;
      // margin: 10px;
      // width: calc(100% / 2 - 20px);
      .video {
        height: 200px;
        background-color: rgb(69, 121, 121);
        overflow: hidden;
        img {
          // height: 200px;
          width: 100%;
        }
      }
      .video-bottom {
        padding: 10px 0;
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
