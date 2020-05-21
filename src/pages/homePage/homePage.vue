<template>
  <div class="main-con">
    <div class="search-top">
      <div class="location" @click="toCity">
        <p v-if="location.addressComponent!=undefined">{{locationCity}}</p>
        <i class="arrow-bottom"></i>
      </div>
      <span class="search-form" @click="toSearch">
        <van-icon name="search" size="20" />
        <p>搜影片、影人、影院</p>
      </span>
      <img src="../../assets/signIn.png" alt @click="toSignIn" />
    </div>
    <van-swipe class="my-swipe" :autoplay="30000" indicator-color="white">
      <van-swipe-item @click="toFirstSwipeDetail">
        <img src="../../assets/homePage/first-swipe.png" alt />
      </van-swipe-item>
      <van-swipe-item @click="toSecondSwipeDetail">
        <img src="../../assets/homePage/gana.png" alt />
      </van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="popular">
      <div class="popular-title">
        <h3>热映电影</h3>
        <!-- <p>
          <span>热播榜</span>
          <van-icon name="arrow" />
        </p>-->
      </div>
      <div class="sortMenu clearfix">
        <ul class="sortMenu-ul">
          <li class="cell" v-for="(item,index) in movieList" :key="index">
            <img :src="`../../../static/${item.movieImg}`" alt @click="goMovieDetailPage(item)" />
            <h4>{{item.movieName}}</h4>
            <van-button color="#ff3174" size="mini" round @click="goTicketsBuy(item)">购票</van-button>
            <!-- <p>大鹏与柳岩婚姻骗局</p> -->
            <!-- <a href>{{item.sortname}}</a> -->
          </li>
        </ul>
      </div>
    </div>
    <div>
      <h3>热门动态</h3>
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
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer"
import AMap from 'AMap'
import { GET_LOCATION } from "../../store/mutations-type"

export default {
  components: {
    Footer
  },
  name: 'HomePage',
  data () {
    return {
      movieList: [],
      videoList: [],
      trafficMap: null,
      // 定位城市
      city: '',
      location: '',
      locationCity: '',
    }
  },
  mounted () {
    // this.init()
    // this.getLocation()
    // this.getMovie()
    this.getVideo()
    // this.city = JSON.parse(localStorage.getItem("location"))
    if (this.$store.state.location != null) {
      this.location = this.$store.state.location
      this.locationCity = this.location.addressComponent.city
      this.getMovie()

      // console.log(this.location.addressComponent.city)
    } else {
      this.init()
      this.getLocation()
    }
    this.city = JSON.parse(localStorage.getItem("location"))
    if (this.city != null) {
      this.locationCity = this.city.name
      this.getMovie()
      // this.locationLat = this.city.lat
      // this.locationLng = this.city.lng
      console.log(this.city)
    }
    console.log(this.locationCity)

  },
  methods: {
    init () { // 创建地图
      console.log('11')
      this.trafficMap = new AMap.Map('container', {
        zoom: 12, // 级别
        center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '3D'// 使用3D视图
      })
      this.trafficMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation'], () => {
        this.trafficMap.addControl(new AMap.ToolBar()) // 工具条，控制地图的缩放、平移等
        this.trafficMap.addControl(new AMap.Scale()) // 比例尺，显示当前地图中心的比例尺
        this.trafficMap.addControl(new AMap.Geolocation())
      })
    },
    getLocation () {
      const self = this
      this.trafficMap.plugin('AMap.Geolocation', () => {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        })
        self.trafficMap.addControl(geolocation);
        // this.trafficMap.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息
          console.dir(data)
          console.log(data.addressComponent.city)
          // this.city = data.addressComponent.city
          console.log(self.$store.state)
          self.$store.commit(GET_LOCATION, data)
          // localStorage.setItem("location", JSON.stringify(data.addressComponent.city))
          console.log(data.position.lng)
          self.trafficMap.plugin(["AMap.PlaceSearch"], () => {
            //构造地点查询类
            // var placeSearch = new AMap.PlaceSearch({
            //   type: '餐饮服务', // 兴趣点类别
            //   pageSize: 5, // 单页显示结果条数
            //   pageIndex: 1, // 页码
            //   city: "成都", // 兴趣点城市
            //   citylimit: true,  //是否强制限制在设置的城市内搜索
            //   map: self.trafficMap, // 展现结果的地图实例
            //   panel: "panel", // 结果列表将在此容器中进行展示。
            //   autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            // });
            // var cpoint = [data.position.lng, data.position.lat]; //中心点坐标
            // placeSearch.searchNearBy('影院', cpoint, 200, function (status, result) {
            //     console.log(result)
            // });
            var placeSearch = new AMap.PlaceSearch({
              // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
              city: '成都',
              pageSize: 50,
            });

            placeSearch.search('万达影城(金红桥店)上海', (status, result) => {
              // 查询成功时，result即对应匹配的POI信息
              console.log(result)
            });
          });
        }

        function onError (data) {
          // 定位出错
          console.log('定位失败错误：', data)

          self.getLngLatLocation()
        }
      })
    },
    getLngLatLocation () {
      this.trafficMap.plugin('AMap.CitySearch', () => {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('通过ip获取当前城市：', result)
            console.log(result.city)
            // this.$store.commit(GET_LOCATION, result.city)
            // localStorage.setItem("location", JSON.stringify(result.city))
            // this.city = result.city
            //逆向地理编码
            this.trafficMap.plugin('AMap.Geocoder', function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })

              var lnglat = result.rectangle.split(';')[0].split(',')

              geocoder.getAddress(lnglat, function (status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data)

                }
              })
            })

          }
        })
      })
    },
    toCity () {
      this.$router.push('/City')
    },
    toSearch () {
      this.$router.push('/Search')
    },
    toSignIn () {
      this.$router.push('/PersonalCenter/SignIn')
    },
    toSecondSwipeDetail () {
      this.$router.push({ path: '/SecondSwipe' })
    },
    toFirstSwipeDetail () {
      this.$router.push({ path: '/FirstSwipe' })
    },
    // 拿取到电影信息
    getMovie () {
      console.log(this.locationCity)

      this.$axios.post("/getMovie", {
        locationCity: this.locationCity
      }).then((res) => {
        this.movieList = res.data.data
        console.log(this.movieList)
      })
    },
    goMovieDetailPage (item) {
      this.$router.push({ path: '/Tickets/MovieDetail' })
      localStorage.setItem('movie', JSON.stringify(item));
    },
    goTicketsBuy (item) {
      this.$router.push('/Tickets/TicketsBuy')
      localStorage.setItem('movie', JSON.stringify(item));
    },
    getVideo () {
      this.$axios.post("/getVideo", {
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
      var videoArr = []
      videoArr.push(item)
      localStorage.setItem('video', JSON.stringify(videoArr));
      this.$router.push({ path: '/Community/Video' })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-con {
  padding: 0 10px;
  font-size: 14px;
  h3,
  p {
    margin: 15px 0;
  }
  h4 {
    margin: 5px 0;
  }

  .search-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    .van-search {
      width: 85%;
      .van-search__content {
        padding-right: 10px;
      }
    }
    .location {
      display: flex;
      align-items: center;

      .arrow-bottom {
        width: 0;
        height: 0;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 6px solid #000000;
        margin-left: 2px;
      }
    }
    .search-form {
      width: 70%;
      height: 30px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      background: #f7f8fa;
      color: #adaeb0;
      padding: 0 10px;
    }
    img {
      width: 28px;
    }
  }
  .van-swipe {
    height: 160px !important;
    border-radius: 8px;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 160px;
    height: 160px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 355px;
      height: 160px;
    }
  }
  .popular {
    .popular-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 10px 0;
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
      width: 90px;
      height: 115px;
      border-radius: 4px;
    }
    .sortMenu .cell {
      display: inline-block;
      font-size: 12px;
      margin: 0px 1em 0 0;
      width: 90px;
      // height: 140px;
      // line-height: 40px;
      text-align: left;
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
  .videos-parts {
    padding: 0px 0px 50px 0px;
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
}
</style>
