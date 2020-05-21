<template>
  <div class="main-con">
    <div>
      <van-nav-bar
        fixed
        left-arrow
        @click-left="onClickLeft"
        :title="movieList.movieName"
        :class="[isScroll?'title-top':'title-top-scroll']"
      >
        <template #right>
          <div class="share">
            <img
              v-if="isScroll==true"
              src="../../assets/icon/share.png"
              alt
              @click="showShare=true"
            />
            <img
              v-if="isScroll==false"
              src="../../assets/icon/share-black.png"
              alt
              @click="showShare=true"
            />
          </div>
          <!-- <van-icon name="ellipsis" /> -->
        </template>
      </van-nav-bar>
      <van-action-sheet v-model="showShare" title="标题" cancel-text="取消" @cancel="showShare=false">
        <div class="content">
          <img src="../../assets/icon/WeChat.png" alt />
          <img src="../../assets/icon/weibo.png" alt />
          <img src="../../assets/icon/QQ .png" alt />
        </div>
      </van-action-sheet>
      <div class="video" v-if="movieList.video!= ''">
        <video width="100%" height="100%" controls>
          <source :src="`../../../static/video/${movieList.video}`" type="video/mp4" />您的浏览器不支持 HTML5 video 标签。
          <!-- <source src="../../../static/video/meirenyu.mp4" type="video/mp4"/>> -->
        </video>
      </div>
      <div class="info">
        <div class="score box-shadow">
          <div class="movie-info">
            <img :src="`../../../static/${movieList.movieImg}`" alt />
            <div class="movie-info-content">
              <!-- <h3>{{item.movieName}}</h3> -->
              <h4>{{movieList.movieName}}</h4>
              <span class="want-to-watch">
                <van-icon name="browsing-history" size="20" />
                <span>{{movieList.wantLook}}人想看</span>
              </span>
              <p>
                <span>{{movieList.movieDuration}}</span>/
                <span>{{movieList.movieLabel}}</span>/
                <span>{{movieList.showingArea}}</span>
              </p>
              <p>
                <span>{{movieList.releaseTime}}</span>
                <span>{{movieList.showingArea}}</span>
              </p>
            </div>
          </div>
          <van-divider></van-divider>
          <div class="score-detail">
            <div class="score-star">
              <p>
                <span>{{movieList.score}}</span>电影评分
              </p>
              <van-rate
                v-model="starValue"
                allow-half
                void-icon="star"
                color="#ff3174"
                void-color="#eee"
                :size="20"
                readonly
              />
            </div>
            <span class="click-button" :class="[isActive?'checked':'']" @click="wantToLook">
              <van-icon name="like" />
              <span>想看</span>
            </span>
            <span class="click-button" :class="[isSeen?'checked':'']" @click="writeReview">
              <van-icon name="star" />
              <span>看过</span>
            </span>
          </div>
        </div>
        <div class="introduction-review-more">
          <van-tabs
            v-model="active"
            scrollspy
            sticky
            offset-top="46"
            line-width="20px"
            color="#ff3174"
          >
            <van-tab title="简介">
              <div
                v-bind:class="{ expansion : active }"
                class="card-mid"
              >{{movieList.filmIntroduction}}</div>
              <div class="introduction-myreview box-shadow" v-if="this.isSeen == true">
                <div class="introduction-myreview-title">
                  <h4>我的影评</h4>
                  <!-- <van-icon name="upgrade" size="20" color="orange" /> -->
                </div>
                <p>{{comment}}</p>
              </div>
              <div class="performers box-shadow">
                <div class="performers-title">
                  <h4>演职人员</h4>
                  <!-- <p>
                    <span>热播榜</span>
                    <van-icon name="arrow" />
                  </p> -->
                </div>
                <div class="sortMenu clearfix">
                  <ul class="sortMenu-ul">
                    <li
                      class="cell"
                      v-for="(item,index) in movieList.directorAndActor"
                      :key="index"
                      @click="toPerformerDetail(item)"
                    >
                      <img :src="`${item.image}`" alt />
                      <p>{{item.performerName}}</p>
                      <p>{{item.role}}</p>
                      <!-- <a href>{{item.sortname}}</a> -->
                    </li>
                  </ul>
                </div>
              </div>
              <div class="movie-video box-shadow">
                <div class="performers-title">
                  <h4>视频</h4>
                  <!-- <p>
                <span>热播榜</span>
                <van-icon name="arrow" />
                  </p>-->
                </div>
                <div class="sortMenu clearfix">
                  <ul class="sortMenu-ul">
                    <li class="cell" v-for="(item,index) in movieVideoList" :key="index" @click="toMovieVideoPage(item)">
                      <img :src="`${item.movieVideoCover}`" alt />
                      <!-- <p>哈哈</p>
                      <p>导演</p>-->
                      <!-- <a href>{{item.sortname}}</a> -->
                    </li>
                  </ul>
                </div>
              </div>
              <div class="photo box-shadow">
                <div class="performers-title">
                  <h4>剧照</h4>
                </div>
                <div class="sortMenu clearfix">
                  <ul class="sortMenu-ul">
                    <li class="cell" v-for="(item,index) in stillList" :key="index">
                      <img :src="`${item.still}`" alt @click="isImageShow(index)" />
                    </li>
                  </ul>
                </div>
              </div>
              <van-image-preview
                v-model="imageShow"
                :images="stillList1"
                @change="onChange"
                :start-position="index"
                :closeable="true"
              >
                <!-- <template v-slot:index>第{{ index }}页</template> -->
              </van-image-preview>
              
            </van-tab>
            <van-tab title="影评">
              <div class="film-review box-shadow">
                <div class="film-review-title">
                  <h4>观众评论</h4>
                  <span
                    :class="[isSeen?'write-comment-unable':'write-comment']"
                    @click="writeReview"
                  >{{isSeen?"已评论":"写影评"}}</span>
                </div>
                <div
                  class="film-review-part"
                  v-for="(item,index) in commentList"
                  :key="index"
                  v-if="index<3"
                >
                  <div class="film-review-user">
                    <img :src="`${item.headPortrait}`" alt />
                    <span>{{item.userName}}</span>
                  </div>
                  <p @click="toMovieCommentAndReply(item)">{{item.comment}}</p>
                  <div class="review-bottom">
                    <span>{{item.commentTime}}</span>
                    <div class="like-comment">
                      <!-- <span class="like">
                        <img
                          v-show="isLike==false || isLike==null"
                          @click="tolikeThisComment(item)"
                          src="../../assets/icon/movie-like-grey.png"
                          alt
                        />
                        <img v-show="isLike==true" src="../../assets/icon/movie-like-red.png" alt />
                        <span>{{item.likeCommentNum}}</span>
                      </span> -->
                      <span class="comment">
                        <!-- <van-icon name="chat-o" /> -->
                        <img src="../../assets/icon/movie-comment-grey.png" alt />
                        <span>{{item.reply.length}}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <p class="to-look-comment" @click="toLookComment">查看全部影评</p>
              </div>
            </van-tab>
            <van-tab title="更多">
              <div class="movie-dynamics box-shadow">
                <div>
                  <h4>电影动态</h4>
                </div>
              </div>
              <div class="awards box-shadow">
                <div class="performers-title">
                  <h4>奖项荣誉</h4>
                </div>
                <div class="awards-part" v-for="item in 3">
                  <img src="../../assets/film1.jpg" alt />
                  <div>
                    <h4>第35届香港电影金像奖</h4>
                    <p>最佳两岸华语电影(提名)</p>
                  </div>
                  <van-icon name="arrow" />
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="ticket-purchase">
        <!-- <van-button round type="info" size="large">选座购票</van-button> -->
        <span @click="goTicketsBuy">选座购票</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  data () {
    return {
      showShare: false,
      starValue: 4.5,
      active: 0,
      movieList: [],
      isActive: null,
      userInfo: {},
      isSeen: null,
      comment: '',
      isScroll: true,
      stillList: {},
      stillList1: [],
      movieVideoList:[],
      imageShow: false,
      index: 0,
      commentList: [],
      isLike: null,
    }
  },
  mounted () {
    //首先，在mounted钩子window添加一个滚动滚动监听事件
    window.addEventListener("scroll", this.handleScroll)
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.receiveMovie()
    this.wantLookList()
    this.seenMovie()
    this.movieScore()
    this.getMovieCommentData()
    // this.likeThisComment()
    // 拿到剧照
    this.$axios.post("/stillList", {
      movieId: this.movieList.movieId
    }).then((res) => {
      if (res.data.code == 200) {
        var str = ''
        res.data.data.forEach((e) => {
          str += e.still + ','
        })
        str = str.substring(0, str.length - 1)
        this.stillList1 = str.split(',')
        this.stillList = res.data.data
        // console.log(this.stillList1)
      }
      // console.log(res.data.data)
    })

    // 拿到视频
    this.$axios.post("/movieVideoList", {
      movieId: this.movieList.movieId
    }).then((res) => {
      if (res.data.code == 200) {
        this.movieVideoList = res.data.data
        console.log(this.movieVideoList)
      }
      // console.log(res.data.data)
    })
  },
  methods: {
    //然后在方法中，添加这个handleScroll方法来获取滚动的位置，实现导航栏滚动时样式改变
    handleScroll () {
      let _this = this;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      if (scrollTop > 0) {
        _this.isScroll = false
      } else {
        _this.isScroll = true
      }
      // console.log(_this.isScroll)
    },
    onClickLeft () {
      this.$router.push('/Tickets')
    },
    goTicketsBuy () {
      this.$router.push('/Tickets/TicketsBuy')
    },
    //去写评论
    writeReview () {
      if (this.isSeen != true) {
        this.$router.push({ path: '/Tickets/MovieDetail/Grade' })
      }
    },
    // 接收电影数据
    receiveMovie () {
      // this.movieList = this.$route.query.data
      this.movieList = JSON.parse(localStorage.getItem('movie'))
      console.log(this.movieList)
    },
    // 操作“想看”
    wantToLook (index) {
      this.isActive = !this.isActive
      if (this.isActive) {
        this.movieList.wantLook = this.movieList.wantLook + 1
      } else {
        this.movieList.wantLook = this.movieList.wantLook - 1
      }
      console.log(this.movieList.wantLook, this.isActive)
      this.$axios.post("/wantToLook", {
        wantLook: this.movieList.wantLook,
        movieId: this.movieList.movieId,
        isActive: this.isActive,
        userId: this.userInfo.userId,
      }).then((res) => {
        // this.movieList = res.data.data
        console.log(res)
      })
    },
    // 渲染“想看”
    wantLookList () {
      // console.log(this.userInfo)
      this.$axios.post("/wantLookList", {
        userId: this.userInfo.userId,
        movieId: this.movieList.movieId
      }).then((res) => {
        if (res.data.code == 200) {
          this.isActive = true
          // console.log(this.isActive)
        } else {
          this.isActive = false
          console.log(this.isActive)
          console.log(res.data.code)
        }
        // console.log(res.data.code)
      })
    },
    // 渲染"看过"
    seenMovie () {
      this.$axios.post("/seenMovie", {
        userId: this.userInfo.userId,
        movieId: this.movieList.movieId
      }).then((res) => {
        if (res.data.code == 200) {
          this.isSeen = true
          this.comment = res.data.data[0].comment
          console.log(res.data.data)
        }
        console.log(res.data)
      })
    },

    // 获取这部电影的影评
    getMovieCommentData () {
      this.$axios.post("/getMovieCommentData", {
        movieId: this.movieList.movieId
      }).then((res) => {
        this.commentList = res.data.data
        console.log(res.data.data)
      })
    },
    // likeThisComment () {
    //   // for (let i = 0; i < this.commentList.length; i++) {
    //     // this.commentList[i].isLike=''
    //     this.$axios.post("/likeThisComment", {
    //       userId: this.userInfo.userId,
    //       filmCommentId: this.commentList[i].id
    //     }).then((res) => {
    //       if (res.data.code == 200) {
    //         this.isLike = true
    //       } else {
    //         this.isLike = false
    //       }
    //     })
    //     console.log(this.isLike)
    //   // }
    // },
    toLookComment () {
      localStorage.setItem('movieComment', JSON.stringify(this.commentList))
      this.$router.push('/Tickets/MovieDetail/AllMovieComments')
    },
    toMovieCommentAndReply (item) {
      console.log(item)
      localStorage.setItem('movieCommentReply', JSON.stringify(item))
      this.$router.push('/Tickets/MovieDetail/AllMovieComments/MovieCommentReply')
    },
    // 去演员简介页面
    toPerformerDetail (item) {
      localStorage.setItem('performer', JSON.stringify(item))
      this.$router.push('/Tickets/MovieDetail/Performer')
    },
    // 控制图片预览图片切换
    onChange (index) {
      // console.log(this.index)
      this.index = index;
    },
    // 到电影视频观看页面
    toMovieVideoPage(item){
      localStorage.setItem("videoPlay",JSON.stringify(item))
      this.$router.push({ path: '/Tickets/VideoPlay' })
    },
    // 控制图片预览显示（在处理index时遇到一个问题，不应该将引用的组件放在v-for里面）
    isImageShow (index) {
      this.imageShow = true
      this.index = index
      // console.log(this.index)
    },
    // 电影评分
    movieScore () {
      this.$axios.post("/movieScore", {
        // userId: this.userInfo.userId,
        movieId: this.movieList.movieId
      }).then((res) => {
        this.movieList.score = res.data.data[0].score
        console.log(res)
      })
    },
  },
  //由于是在整个window中添加的事件，所以要在页面离开时摧毁掉，否则会报错
  beforeDestroy () {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-con {
  width: 100%;
  h4,
  p {
    margin: 10px 0;
  }
  .info {
    padding-left: 10px;
    padding-right: 10px;
  }
  // /deep/ .van-nav-bar {
  //   // background-color: transparent !important;
  //   color: white;
  //   i {
  //     color: white;
  //   }
  //   .van-nav-bar__title {
  //     color: white;
  //   }
  // }
  .title-top {
    // font-size: 10px;
    background-color: transparent !important;
    color: white;
    i {
      color: white;
    }
    .van-nav-bar__title {
      color: white;
    }
  }
  .title-top-scroll {
    background-color: white !important;
    color: black;
    i {
      color: black;
    }
    .van-nav-bar__title {
      color: black;
    }
  }
  /deep/ .van-hairline--bottom::after {
    border-bottom-width: 0px !important;
  }
  .box-shadow {
    box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
  }
  .share {
    height: 46px;
    display: flex;
    align-items: center;
    img {
      width: 24px;
    }
  }
  .video {
    // height: 200px;
    // background: red;
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
          width: 130px;
          line-height: 20px;
          background: #f7dada94;
          border-radius: 20px;
          color: red;
          span{
            padding: 0 5px;
          }
        }
      }
    }
    .score-detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .click-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        background: #f1f1f1;
        color: #9d9bae;
        i {
          padding-right: 6px;
        }
      }
      .checked {
        color: #f8b247;
        background: #fcfaf1;
        i {
          color: #ff3174;
        }
        border: 1px solid #f8b247;
      }
    }
  }
  .introduction-review-more {
    margin-bottom: 60px;
    .card-mid{
      padding-top: 15px;
    }
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
        background: #fffbf1;
        border: 1px solid #f8b247;
        text-overflow: ellipsis;
        border-radius: 3px;
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
    .movie-video {
      .sortMenu .cell {
        margin-right: 5px !important;
      }
      .sortMenu-ul li img {
        width: 200px;
        height: 120px;
      }
      .sortMenu .cell {
        margin-right: 5px !important;
        width: 200px;
      }
    }
    .photo {
      .sortMenu-ul li img {
        width: auto;
        height: 120px;
      }
      .sortMenu .cell {
        margin-right: 5px !important;
        width: auto;
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
        .write-comment {
          background-image: linear-gradient(to left, #ff3174, #fe756b);
          display: inline-block;
          text-align: center;
          width: 80px;
          height: 25px;
          line-height: 25px;
          border-radius: 25px;
          color: white;
        }
        .write-comment-unable {
          display: inline-block;
          text-align: center;
          width: 80px;
          height: 25px;
          line-height: 25px;
          border-radius: 25px;
          color: #ff3174;
          border: 1px solid #ff3174;
        }
      }
      .film-review-part {
        padding: 10px 0;
        // border-bottom: 1px solid #ddd;
        .film-review-user {
          display: flex;
          align-items: center;
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
          padding-bottom: 10px;
          .like-comment {
            display: flex;
            align-items: center;
            .like {
              display: flex;
              align-items: center;
              span {
                padding-left: 3px;
              }
              margin-right: 10px;
            }
            .comment {
              display: flex;
              align-items: center;
              span {
                padding-left: 3px;
              }
            }
            img {
              width: 20px;
            }
          }
        }
      }
      .to-look-comment {
        text-align: center;
        color: #fe756b;
      }
    }
  }
  .ticket-purchase {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background: white;
    span {
      display: inline-block;
      background: rgb(233, 87, 131);
      background-image: linear-gradient(to left, #ff3174, #fe756b);
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
    border-radius: 4px;
  }
  .sortMenu .cell {
    display: inline-block;
    font-size: 12px;
    margin-right: 10px;
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
