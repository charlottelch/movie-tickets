<template>
  <div class="main-con">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="cinema-title">
      <div class="cinema-info">
        <div>
          <h3>太平洋影城(温江店)</h3>
          <p>温江星艺大道300号艺苑生活圈2楼</p>
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
        <van-tag color="#f2826a">3D</van-tag>
        <van-tag color="#f2826a">可停车</van-tag>
        <van-tag color="#7232dd">儿童优惠</van-tag>
      </div>
    </div>
    <div class="movieShow">
      <carousel-3d :perspective="20" :space="80" :display="7">
        <slide :index="0">Slide 1 Content</slide>
        <slide :index="1">Slide 2 Content</slide>
        <slide :index="2">Slide 3 Content</slide>
        <slide :index="3">Slide 4 Content</slide>
        <slide :index="4">Slide 5 Content</slide>
        <slide :index="5">Slide 6 Content</slide>
        <slide :index="6">Slide 7 Content</slide>
        <slide :index="7">Slide 8 Content</slide>
      </carousel-3d>
    </div>
    <div class="movieinfo">
      <h3>狼图腾</h3>
      <p>
        <span>150分钟</span>/
        <span>动作 喜剧 音乐 奇幻</span>/
        <span>冯绍峰、窦骁</span>
      </p>
    </div>
    <div class="detail-info">
      <van-tabs class="date-tab">
        <div>
          <van-tab v-for="(item, index) in weekList" :title="item.date" :key="index">
            <div class="tickets-totle">
              <div class="tickets" v-for="(citem, index) in item.cinema" :key="index">
                <div class="tickets-info">
                  <div class="tickets-info-left">
                    <div class="tickets-time">
                      <span class="begin-time">15:50</span>
                      <span>17:51散场</span>
                    </div>
                    <div>
                      <span>国语2D</span>
                      <span>二号激光厅</span>
                    </div>
                  </div>
                  <div class="tickets-info-right">
                    <div class="tickets-price">
                      <span class="price">到手价￥ <span>18</span></span>
                      <span>优惠券已抵4元</span>
                    </div>
                    <span class="choose-seat">选座</span>
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
export default {
  name: 'CinemaDetail',
  components: {
    Carousel3d,
    Slide
  },
  data () {
    return {
      isCollect: true,
      weekList: [
        {
          date: '星期一 04.11',
          cinema: [
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(1店-1)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' }]        },
        {
          date: '星期一 04.12',
          cinema: [
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(2店-1)', address: '温江星艺大道300号艺苑生活圈2楼' }]
        },
        {
          date: '星期一 04.13',
          cinema: [
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(3店-1)', address: '温江星艺大道300号艺苑生活圈2楼' }
          ]
        },
        {
          date: '星期一 04.14',
          cinema: [
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(4店-1)', address: '温江星艺大道300号艺苑生活圈2楼' }
          ]
        },
        {
          date: '星期一 04.15',
          cinema: [
            { cinema: '太平洋影城(1店)', address: '温江星艺大道300号艺苑生活圈2楼' },
            { cinema: '太平洋影城(5店-1)', address: '温江星艺大道300号艺苑生活圈2楼' }
          ]
        }
      ],
    }
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
          .tickets-price>span {
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