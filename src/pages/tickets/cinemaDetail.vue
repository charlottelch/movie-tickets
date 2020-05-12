<template>
  <div class="main-con">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="cinema-title">
      <div class="cinema-info">
        <div>
          <h3>{{cinemaList.cinemaName}}</h3>
          <p>{{cinemaList.cinemaAdress}}</p>
        </div>
        <div class="cinema-info-right">
          <div>
            <img src="../../assets/img/uncollect.png" alt v-show="isCollect" @click="collect" />
            <img src="../../assets/img/collected.png" alt v-show="!isCollect" @click="iscollect" />
          </div>
          <img src="../../assets/img/mapIcon.png" alt />
        </div>
      </div>
      <div class="label">
        <van-tag
          color="#ff3174"
          v-for="(Litem,index) in cinemaList.label"
          :key="index"
        >{{Litem.labelName}}</van-tag>
      </div>
    </div>
    <div class="movieShow">
      <carousel-3d :perspective="20" :space="80" :display="7">
        <slide v-for="(item,index) in movieSceneList" :index="index" :key="index">
          <img :src="`../../../static/${item.movieImg}`" alt @click="changeSlide(index)" />
          <!-- <template slot-scope="{ index, isCurrent, leftIndex, rightIndex}">
            <img
              :src="`../../../static/${item.movieImg}`"
              :data-index="index"
              :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >=0)}"
              alt
            />
          </template>-->
        </slide>
        <!-- <slide :index="2">1</slide> -->
      </carousel-3d>
    </div>
    <div class="movieinfo">
      <h3>{{movieSceneList.length==0?'':movieSceneList[movieIndex].movieName}}</h3>
      <p>
        <span>{{movieSceneList.length==0?'':movieSceneList[movieIndex].movieDuration}}</span>/
        <span>{{movieSceneList.length==0?'':movieSceneList[movieIndex].movieLabel}}</span>
        <!-- <span>冯绍峰、窦骁</span> -->
      </p>
    </div>
    <div class="detail-info">
      <van-tabs class="date-tab">
        <div>
          <van-tab
            v-for="(item, index) in movieSceneList[movieIndex].sceneDate"
            :title="item.sceneDate"
            :key="index"
          >
            <div class="tickets-totle">
              <div class="tickets" v-for="(citem, index) in item.scene" :key="index">
                <div class="tickets-info">
                  <div class="tickets-info-left">
                    <div class="tickets-time">
                      <span class="begin-time">{{citem.startTime}}</span>
                      <span>{{citem.endTime}}散场</span>
                    </div>
                    <div>
                      <span>{{citem.studioType}}</span>
                      <span>{{citem.cinemaHallName}}</span>
                    </div>
                  </div>
                  <div class="tickets-info-right">
                    <div class="tickets-price">
                      <span class="price">
                        到手价￥
                        <span>{{citem.ticketPrice}}</span>
                      </span>
                      <span>优惠券已抵4元</span>
                    </div>
                    <span class="choose-seat" @click="toSelectSeat(citem)">选座</span>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </div>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
// import AMap from 'AMap'
export default {
  name: 'CinemaDetail',
  components: {
    Carousel3d,
    Slide
  },
  data () {
    return {
      isCollect: true,
      cinemaList: [],
      movieSceneList: [{ sceneDate: '' }],
      movieIndex: 0
    }
  },
  mounted () {
    // 获取影院数据
    this.cinemaList = JSON.parse(localStorage.getItem('cinema'))
    console.log(this.cinemaList)
    // 获取电影场次数据
    this.getCinemaMovie()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    collect () {
      this.isCollect = false
    },
    iscollect () {
      this.isCollect = true
    },
    // 获取影院上映的电影
    getCinemaMovie () {
      this.$axios.post("http://localhost:8080/getCinemaMovie", {
        cinemaId: this.cinemaList.cinemaId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            this.movieSceneList = res.data.data
            console.log(this.movieSceneList)
          }

        } else {

        }
        // console.log(res.data)
      })
    },
    changeSlide (index) {
      this.movieIndex = index
      console.log(index)
    },
    toSelectSeat (citem) {
      this.$router.push({ path: '/Tickets/MovieDetail/SelectSeat'})
      localStorage.setItem('scene', JSON.stringify(citem));
    }

  }
}
</script>

<style lang="less" scoped>
.main-con {
  font-size: 12px;
  h3,
  p {
    margin: 5px 0;
  }
  .cinema-title {
    text-align: left;
    border-bottom: 1px solid #ebedf0;
    padding: 5px 10px;
    .cinema-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cinema-info-right {
        display: flex;
        justify-content: space-between;
        width: 70px;
        img {
          width: 27px;
          height: 27px;
        }
        text-align: right;
      }
    }
    .van-tag {
      margin-right: 2px;
    }
  }
  .movieShow {
    height: 110px;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    .carousel-3d-container {
      height: 100px !important;
      margin: 0 !important;
    }
    /deep/ .carousel-3d-slider {
      width: 80px !important;
      height: 100px !important;
    }
    .carousel-3d-slider > div {
      width: 80px !important;
      height: 100px !important;
    }
  }
  .movieinfo {
    text-align: center;
  }
  .detail-info {
    padding: 0 10px;
    // /deep/ .van-tab {
    //   font-size: 10px !important;
    // }
    .tickets-info {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tickets-info-left {
        display: flex;
        align-items: center;
        span {
          margin: 2px 0;
        }
        div {
          display: flex;
          flex-direction: column;
        }
        .tickets-time {
          margin-right: 10px;
          .begin-time {
            font-size: 16px;
            color: black;
          }
        }
      }
      .tickets-info-right {
        display: flex;
        align-items: center;
        text-align: right;
        .tickets-price > span {
          margin: 2px 0;
        }
        .price {
          color: hotpink;
          span {
            font-size: 18px;
          }
        }
        .choose-seat {
          display: inline-block;
          width: 50px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          border: 1px solid hotpink;
          color: hotpink;
          border-radius: 25px;
          margin-left: 10px;
        }
        div {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>