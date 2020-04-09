<template>
  <div class="main-con">
    <van-nav-bar fixed title="电影名称" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="video"></div>
    <div class="score box-shadow">
      <div class="movie-info">
        <img src="../../assets/dream-travel.jpg" alt />
        <div class="movie-info-content">
          <h3>寻梦环游记</h3>
          <span class="want-to-watch">
            <van-icon name="browsing-history" size="20" />
            <span>120人想看</span>
          </span>
          <p>
            <span>150分钟</span>/
            <span>动作 喜剧 音乐 奇幻</span>/
            <span>美国</span>
          </p>
          <p>
            <span>2020-03-26</span>
            <span>大陆上映</span>
          </p>
        </div>
      </div>
      <div class="score-detail">
        <div class="score-star">
          <p>
            <span>9.0</span>电影评分
          </p>
          <van-rate
            v-model="starValue"
            allow-half
            void-icon="star"
            color="#ee0a24"
            void-color="#eee"
            :size="20"
            readonly
          />
        </div>
        <span class="click-button">
          <van-icon name="like" />
          <span>想看</span>
        </span>
        <span class="click-button">
          <van-icon name="star" />
          <span @click="writeReview">看过</span>
        </span>
      </div>
    </div>
    <div class="introduction-review-more">
      <van-tabs v-model="active" scrollspy sticky offset-top="46">
        <van-tab title="简介">
          <div v-bind:class="{ expansion : active }" class="card-mid">
            小男孩米格(安东尼·冈萨雷斯配音)一心梦想成为音乐
            家，更希望自己能和偶像歌神德拉库斯(本杰明·布拉特
            配音)一样，创造出打动人心的音乐，但他的家族却世
            代禁止族人接触音乐。米格痴迷音乐，无比渴望证明自
            己的音乐才能，却因为一系列怪事，来到了五彩斑斓又
            光怪陆离的神秘世界。在那里，米格遇见了魅力十足的
            落魄乐手埃克托(盖尔·加西亚·贝纳尔配音)，他们-
            起踏上了探寻米格家族不为人知往事的奇妙之旅，并开
            启了一段震撼心灵、感动非凡、永生难忘的旅程。
          </div>
          <div class="introduction-myreview box-shadow">
            <div class="introduction-myreview-title">
              <h3>我的影评</h3>
              <van-icon name="upgrade" size="20" color="orange" />
            </div>
            <p>很好看很好看很好看很好看很好看很好看很好看很好看很好看</p>
          </div>
          <div class="performers box-shadow">
            <div class="performers-title">
              <h3>演职人员</h3>
              <p>
                <span>热播榜</span>
                <van-icon name="arrow" />
              </p>
            </div>
            <div class="sortMenu clearfix">
              <ul class="sortMenu-ul">
                <li class="cell" v-for="item in 6">
                  <img src="../../assets/头像.jpg" alt />
                  <p>哈哈</p>
                  <p>导演</p>
                  <!-- <a href>{{item.sortname}}</a> -->
                </li>
              </ul>
            </div>
          </div>
          <div class="movie-video box-shadow">
            <div class="performers-title">
              <h3>视频</h3>
              <!-- <p>
                <span>热播榜</span>
                <van-icon name="arrow" />
              </p>-->
            </div>
            <div class="sortMenu clearfix">
              <ul class="sortMenu-ul">
                <li class="cell" v-for="item in 6">
                  <img src="../../assets/头像.jpg" alt />
                  <!-- <p>哈哈</p>
                  <p>导演</p>-->
                  <!-- <a href>{{item.sortname}}</a> -->
                </li>
              </ul>
            </div>
          </div>
          <div class="photo box-shadow">
            <div class="performers-title">
              <h3>剧照</h3>
            </div>
            <div class="sortMenu clearfix">
              <ul class="sortMenu-ul">
                <li class="cell" v-for="item in 6">
                  <img src="../../assets/头像.jpg" alt />
                </li>
              </ul>
            </div>
          </div>
          <div class="awards box-shadow">
            <div class="performers-title">
              <h3>奖项荣誉</h3>
            </div>
            <div class="awards-part" v-for="item in 3">
              <img src="../../assets/film1.jpg" alt />
              <div>
                <h3>第35届香港电影金像奖</h3>
                <p>最佳两岸华语电影(提名)</p>
              </div>
              <van-icon name="arrow" />
            </div>
          </div>
        </van-tab>
        <van-tab title="影评">
          <div class="film-review box-shadow">
            <div class="film-review-title">
              <h3>观众评论</h3>
              <span @click="writeReview">写影评</span>
            </div>
            <div class="film-review-part" v-for="item in 3">
              <div class="film-review-user">
                <img src="../../assets/头像.jpg" alt />
                <p>用户名</p>
              </div>
              <p>很不错的片子，特别好看，很感人很不错的片子，特别好看，很感人很不错的片子，特别好看，很感人很不错的片子，特别好看，很感人很不错的片子，特别好看，很感人很不错的片子，特别好看，很感人</p>
              <div class="review-bottom">
                <span>2019-12-12</span>
                <div>
                  <span>
                    <van-icon name="good-job-o" />
                    <span>539</span>
                  </span>
                  <span>
                    <van-icon name="chat-o" />
                    <span>13</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="更多">
          <div class="movie-dynamics box-shadow">
            <div>
              <h3>电影动态</h3>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="ticket-purchase">
      <!-- <van-button round type="info" size="large">选座购票</van-button> -->
      <span @click="goTicketsBuy">选座购票</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  data () {
    return {
      starValue: 4.5,
      active: 0
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/Tickets')
    },
    goTicketsBuy () {
      this.$router.push('/Tickets/TicketsBuy')
    },
    writeReview () {
      this.$router.push('/Tickets/MovieDetail/Grade')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-con {
  padding-left: 10px;
  padding-right: 10px;
  h3,
  p {
    margin: 10px 0;
  }
  .box-shadow {
    box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
  }
  .video {
    height: 200px;
    background: red;
  }
  .score {
    margin-top: 0;
    .movie-info {
      display: flex;
      // padding: 10px 0;
      img {
        width: 100px;
        height: 140px;
      }
      .movie-info-content {
        text-align: left;
        padding-left: 10px;
        font-size: 14px;
        .want-to-watch {
          display: inline-block;
          display: flex;
          height: 20px;
          width: 120px;
          line-height: 20px;
          background: rgb(245, 199, 199);
          border-radius: 20px;
          color: red;
        }
      }
    }
    .score-detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .click-button {
        display: inline-block;
        text-align: center;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        background: rgb(216, 217, 218);
        color: slategray;
      }
    }
  }
  .introduction-review-more {
    margin-bottom: 60px;
    .expansion {
      white-space: pre-line;
      width: 100%;
      overflow: hidden;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .introduction-myreview {
      .introduction-myreview-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      p {
        // height: 50px;
        // line-height: 50px;
        text-align: left;
        padding: 15px 5px;
        background: rgb(245, 223, 208);
        border: 1px solid yellow;
        text-overflow: ellipsis;
      }
    }
    .performers {
      .performers-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding: 10px 0;
      }
    }
    .awards {
      .awards-part {
        img {
          width: 60px;
          height: 60px;
        }
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .film-review {
      .film-review-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          background: crimson;
          display: inline-block;
          text-align: center;
          width: 80px;
          height: 30px;
          line-height: 30px;
          border-radius: 30px;
          color: white;
        }
      }
      .film-review-part {
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        .film-review-user {
          display: flex;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
          }
          p {
            text-align: left;
          }
        }
        .review-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
        }
      }
    }
  }
  .ticket-purchase {
    position: fixed;
    bottom: 0;
    width: 100%;
    span {
      display: inline-block;
      background: rgb(233, 87, 131);
      border: 0;
      width: 95%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 40px;
      color: white;
    }
  }
  .sortMenu {
    width: 100%;
    background-color: #fff;
    overflow-x: scroll;
    -webkit-overflow-x: scroll;
  }
  .sortMenu::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #fff;
  }
  .sortMenu-ul {
    min-width: 500px;
    display: flex;
    justify-content: flex-start;
  }
  .sortMenu-ul li img {
    width: 100px;
    height: 120px;
  }
  .sortMenu .cell {
    display: inline-block;
    font-size: 12px;
    margin: 0px 1em;
    width: 100px;
    // height: 140px;
    // line-height: 40px;
    text-align: center;
    position: relative;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
  .sortMenu .cell.special a {
    color: #ff474c;
  }
  .sortMenu .cell.special:before {
    content: '';
    height: 2px;
    width: 100%;
    background: #ff474c;
    position: absolute;
    bottom: 0px;
  }
}
</style>
