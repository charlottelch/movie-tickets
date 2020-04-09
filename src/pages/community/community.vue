<template>
  <div class="main-con">
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" input-align="center" />
    <van-tabs v-model="active" swipeable sticky>
      <van-tab title="热门">
        <div class="videos-parts">
          <div class="videos">
            <div class="video"></div>
            <p>1解读奥斯卡赢家《小丑》</p>
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
      <van-icon name="plus" color="#ffffff" size="30" />
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
  name: 'HomePage',
  data () {
    return {
      active: 1,
      value: ''
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
      }
      .video-bottom {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    }
  }
  .add {
    background: hotpink;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: fixed;
    bottom: 70px;
    right: 10px;
    text-align: center;
    line-height: 70px;
  }
}
</style>
