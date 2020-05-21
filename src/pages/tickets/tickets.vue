<template>
  <div class="main-con">
    <div class="ticket-top">
      <div class="location" @click="toCity">
        <p v-if="location.addressComponent!=undefined">{{locationCity}}</p>
        <i class="arrow-bottom"></i>
      </div>
      <!-- <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" input-align="center" /> -->
      <span class="search-form" @click="toSearch">
        <van-icon name="search" size="16" />
        <p>搜影片、影人、影院</p>
      </span>
      <img src="../../assets/map.png" alt @click="toCinemaMap" />
      <!-- <div class="right">
        <van-icon name="location-o" @click="toCinemaMap" />
        <van-icon name="search" />
      </div>-->
    </div>
    <van-tabs v-model="active" sticky>
      <van-tab title="热映">
        <div class="film" v-for="(mItem,index) in movieList" :key="index">
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
                <span
                  v-for="(dItem,index) in mItem.director"
                  :key="index"
                  style="paddingRight:4px"
                >{{dItem.performerName}}</span>
              </p>
              <p>
                主演:
                <span v-for="(aItem,index) in mItem.actor" :key="index">
                  <span style="paddingRight:4px">{{aItem.performerName}}</span>
                </span>
              </p>
            </div>
          </div>
          <van-button color="#ff3174" size="small" round @click="goTicketsBuy(mItem)">购票</van-button>
        </div>
      </van-tab>
      <van-tab title="影院">
        <div class="select" :class="navBarFixed == true ? 'navBarWrap' :''">
          <van-dropdown-menu>
            <van-dropdown-item :title="businessCircleTitle" class="first">
              <!-- <van-tabs v-model="active1"> -->
              <!-- <van-tab title="商圈"> -->
              <van-tree-select
                :items="businessCircleItems"
                :active-id.sync="activeId"
                :main-active-index.sync="activeIndex"
                @click-nav="getLeftData"
                @click-item="getRightData"
              />
              <!-- </van-tab> -->
              <!-- <van-tab title="地铁">
                  <van-tree-select
                    :items="subwayItems"
                    :active-id.sync="subwayActiveId"
                    :main-active-index.sync="subwayActiveIndex"
                    @click-item="getSubwayRightData"
                  />
              </van-tab>-->
              <!-- </van-tabs> -->
            </van-dropdown-item>
            <van-dropdown-item title="筛选" v-model="value1" class="second" ref="item">
              <div class="pick-cinema">
                <div>
                  <p>
                    <span>影院服务</span>
                    <!-- <span>
                      展开
                      <van-icon name="arrow-down" />
                    </span>-->
                  </p>
                  <p class="parts">
                    <span
                      v-for="(item, index) in cinemaServer"
                      :key="index"
                      :class="[isCinemaServerSelected==index?'selected':'']"
                      @click="toSelectCinemaServer(index)"
                    >{{item.name}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>放映影厅</span>
                    <!-- <span>
                      展开
                      <van-icon name="arrow-down" />
                    </span>-->
                  </p>
                  <p class="parts parts-block">
                    <span
                      v-for="(item, index) in hallType"
                      :key="index"
                      :class="[isHallTypeSelected==index?'selected':'']"
                      @click="toSelectHallType(index)"
                    >{{item.name}}</span>
                  </p>
                </div>
              </div>
              <div class="pick-buttons">
                <van-button round color="#ff3174" plain size="small" @click="clearSelect">重置</van-button>
                <van-button
                  round
                  color="linear-gradient(to right, #ff3174, #fe756b)"
                  size="small"
                  @click="makeSureSelect"
                >确定</van-button>
              </div>
            </van-dropdown-item>
            <van-dropdown-item
              :title="brandList.text"
              v-model="brandListValue"
              class="third"
              :options="brandList"
              @change="chooseBrand"
            ></van-dropdown-item>
            <van-dropdown-item
              :title="sortOrderList.text"
              v-model="sortOrderValue"
              class="fourth"
              :options="sortOrderList"
              @change="chooseSortOrder"
            ></van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <div class="cinema-all">
          <div
            class="cinema"
            v-for="(item,index) in cinemaList"
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
      </van-tab>
      <van-tab title="即将上映">
        <div class="coming-soon">
          <div class="popular">
            <div class="popular-title">
              <h3>热门预告片</h3>
              <!-- <p>
                <span>查看更多</span>
                <van-icon name="arrow" />
              </p>-->
            </div>
            <div class="sortMenu clearfix">
              <ul class="sortMenu-ul">
                <li
                  class="cell"
                  v-for="(item,index) in trailerList"
                  :key="index"
                  @click="toLookPopularTrailer(item)"
                >
                  <img :src="`${item.trailerCover}`" alt />
                  <!-- <h4>{{item}}</h4> -->
                  <p>{{item.trailerDescribe}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="recent-expectations">
            <div class="recent-expectations-title">
              <h3>近期最受期待</h3>
              <!-- <p>
                <span>查看更多</span>
                <van-icon name="arrow" />
              </p>-->
            </div>
            <div class="sortMenu clearfix">
              <ul class="sortMenu-ul">
                <li
                  class="cell"
                  v-for="(mItem,index) in recentExpectationsList"
                  :key="index"
                  @click="goMovieDetailPage(mItem)"
                >
                  <img :src="`../../../static/${mItem.movieImg}`" alt />
                  <h4>{{mItem.movieName}}</h4>
                  <p>{{mItem.releaseTime}}上映</p>
                  <!-- <a href>{{item.sortname}}</a> -->
                </li>
              </ul>
            </div>
          </div>
          <div class="coming-soon-movies" v-for="(item,index) in comingSoonMovieList" :key="index">
            <h3 class="coming-soon-time">
              <span>{{item.releaseTime}}</span>
              <!-- <span>周四</span> -->
            </h3>
            <div class="coming-soon-film" v-for="(mItem,index) in item.movie" :key="index">
              <div class="information" @click="goMovieDetailPage(mItem)">
                <img :src="`../../../static/${mItem.movieImg}`" alt />
                <div>
                  <h3>{{mItem.movieName}}</h3>
                  <p>
                    <span class="want-to-look-number">{{mItem.wantLook}}</span>
                    人想看
                  </p>
                  <p>
                    导演:
                    <span
                      v-for="(dItem,index) in mItem.director"
                      :key="index"
                    >{{dItem.performerName}}</span>
                  </p>
                  <p>
                    主演:
                    <span v-for="(aItem,index) in mItem.actor" :key="index">
                      <span>{{aItem.performerName}}</span>
                    </span>
                  </p>
                </div>
              </div>
              <!-- <span
                class="look"
                @click="wantToWatch(mItem)"
                :class="[mItem.users==null?'want-look':'has-look']"
              >{{mItem.users==null?'已想看':"想看"}}</span>-->
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer"
export default {
  components: {
    Footer
  },
  name: 'Tickets',
  data () {
    return {
      value: "",
      value1: 0,
      active: 0,
      active1: '',
      sortOrderValue: 0,
      sortOrderList: [
        { text: '综合排序', value: 0 },
        { text: '离我最近', value: 1 },
        { text: '价格最低', value: 2 },
      ],
      navBarFixed: false,
      businessCircleItems: [
        // {
        //   "chengdu": [
        { text: '全部', children: [{ text: '全部' }] },
        { text: '武侯区', children: [{ text: '全部' }, { text: '火车南站' }, { text: '石羊场' }] },
        { text: '锦江区', children: [{ text: '全部' }, { text: '春熙路' }] },
        { text: '双流区', children: [{ text: '全部' }, { text: '华阳' }] },
        { text: '金牛区', children: [{ text: '全部' }, { text: '五块石' }] },
        { text: '郫都区', children: [{ text: '全部' }, { text: '红光' }, { text: '犀浦' }] },
        { text: '成华区', children: [{ text: '全部' }, { text: 'SM广场' }] },
        //   ]
        // },
      ],
      activeId: 1,
      activeIndex: 0,
      businessCircleTitle: '全城',
      zoneTitle: '',
      // 放映影厅
      hallType: [
        { name: "全部" },
        { name: "IMAX厅" },
        { name: "杜比影院" },
        { name: "120帧", },
        { name: "巨幕厅", },
        { name: "激光厅", },
        { name: "CGS中国巨幕厅", },
        { name: "MX4D厅", },
        { name: "DTS临境厅", },
        { name: "4D厅", },
        { name: "融合厅", }
      ],
      // 影院服务
      cinemaServer: [
        { name: "全部" },
        { name: "退票", },
        { name: "改签", },
      ],
      brandListValue: 0,
      brandList: [
        { text: "全部", value: 0 },
        { text: "太平洋影城", value: 1 },
        { text: "万达", value: 2 },
        { text: "CGV", value: 3 },
        { text: "横店影视", value: 4 },
        { text: "星美影商城", value: 5 },
        { text: "橙天嘉禾", value: 6 },
        { text: "UME影城", value: 7 },
        { text: "百老汇电影", value: 8 },
        { text: "卢米埃影城", value: 9 },
        { text: "博纳影城", value: 10 },
        { text: "大地影院", value: 11 },
        { text: "幸福蓝海国际影城", value: 12 },
        { text: "保利影城", value: 13 },
        { text: "左岸国际影城", value: 14 },
        { text: "烽禾影城", value: 15 },
      ],
      movieList: [],
      cinemaList: [],
      comingSoonMovieList: [],
      // 筛选
      screenList: [],
      // 城市筛选
      // 区
      zoneSelected: '',
      // 商圈
      tradeAreaSelected: '',
      // 品牌筛选条件
      brandSelectText: '',
      // isSelected: false,
      isCinemaServerSelected: 0,
      // 筛选影院服务和影厅
      cinemaServerSelected: '',
      isHallTypeSelected: 0,
      hallTypeSelected: '',
      // 选择排序方式
      sortOrderText: 'bottomPrice,cinemaDistance',
      isActive: null,
      userInfo: {},
      location: {},
      // 热门预告片
      trailerList: [],
      // 近期最受期待电影
      recentExpectationsList: [],
      // 定位城市
      locationCity: '',
      city: '',
      // locationLat: '',
      // locationLng: ''
      // subwayTitle: '全城',
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    if (this.$store.state.location != null) {
      this.location = this.$store.state.location
      this.locationCity = this.location.addressComponent.city
      // this.locationLat = this.location.position.lat
      // this.locationLng = this.location.position.lng
      console.log(this.location.position)
    }
    this.city = JSON.parse(localStorage.getItem("location"))
    if (this.city != null) {
      this.locationCity = this.city.name
      // this.locationLat = this.city.lat
      // this.locationLng = this.city.lng
      console.log(this.city)
    }
    if (this.locationCity == '成都市'||'成都') {
      this.businessCircleItems = [
        { text: '全部', children: [{ text: '全部' }] },
        { text: '武侯区', children: [{ text: '全部' }, { text: '火车南站' }, { text: '石羊场' }] },
        { text: '锦江区', children: [{ text: '全部' }, { text: '春熙路' }] },
        { text: '双流区', children: [{ text: '全部' }, { text: '华阳' }] },
        { text: '金牛区', children: [{ text: '全部' }, { text: '五块石' }] },
        { text: '郫都区', children: [{ text: '全部' }, { text: '红光' }, { text: '犀浦' }] },
        { text: '成华区', children: [{ text: '全部' }, { text: 'SM广场' }] },
      ]
    }
    if (this.locationCity == '北京') {
      this.businessCircleItems = [
        { text: '全部', children: [{ text: '全部' }] },
        { text: '昌平区', children: [{ text: '全部' }, { text: '国泰百货' }, { text: '龙德广场' }] },
        { text: '朝阳区', children: [{ text: '全部' }, { text: '北京嘉里中心' }] },
        { text: '大兴区', children: [{ text: '全部' }, { text: '乐家购物中心' }] },
      ]

    }
    if (this.locationCity == '上海') {
      this.businessCircleItems = [
        { text: '全部', children: [{ text: '全部' }] },
        { text: '宝山区', children: [{ text: '全部' }, { text: '龙湖上海宝山天街' }, { text: '凯旋丽都广场' }] },
        { text: '黄埔区', children: [{ text: '全部' }, { text: '世茂广场' }] },
        { text: '长宁区', children: [{ text: '全部' }, { text: '上海金虹桥商城' }] },
      ]
    }
    // console.log(this.locationLat, this.locationLng)
    this.getMovie()
    this.getCinemaData()
    this.getComingSoonMovie()
    this.getTrailerData()
    this.getRecentExpectations()
    this.getDistance()
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)

  },
  methods: {
    // getDistance () {
    // 方法定义 lat,lng 
    GetDistance (lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0;
      var radLat2 = lat2 * Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;// EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;
    },
    // 调用 return的距离单位为km
    // console.log(GetDistance(22.54605355, 114.02597366, 22.620315, 114.144802));
    // },
    getDistance () {
      this.$axios.post("/getCinemaData", {
      }).then((res) => {
        var cinemaList = res.data.data
        console.log(cinemaList)
        for (let i = 0; i < cinemaList.length; i++) {
          var distance = this.GetDistance(this.location.position.lat, this.location.position.lng, cinemaList[i].lat, cinemaList[i].lng)
          console.log(distance)
          cinemaList[i].cinemaDistance = distance
        }
        console.log(cinemaList)
        this.$axios.post("/updataCinemaDistance", {
          cinemaList: cinemaList
        }).then((res) => {

        })
        // this.movieList.score = res.data.data[0].score
      })
    },
    toCity () {
      this.$router.push('/City')
    },
    toSearch () {
      this.$router.push('/Search')
    },
    watchScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 50 时，实现吸顶效果
      if (scrollTop > 55) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    },
    goMovieDetailPage (mItem) {
      // 电影信息存到localstorage
      this.$router.push({ path: '/Tickets/MovieDetail' })
      localStorage.setItem('movie', JSON.stringify(mItem));
    },
    toCinemaDetail (item) {
      this.$router.push('/Tickets/CinemaDetail')
      localStorage.setItem('cinema', JSON.stringify(item));

    },
    goTicketsBuy (mItem) {
      this.$router.push('/Tickets/TicketsBuy')
      localStorage.setItem('movie', JSON.stringify(mItem));
    },
    toCinemaMap () {
      this.$router.push('/Tickets/CinemaMap')
    },
    // 点击选择区
    getLeftData (index) {
      console.log(index)
      this.zoneSelected = this.businessCircleItems[index].text
      // 筛选框显示区
      this.zoneTitle = this.businessCircleItems[index].text
      // console.log(this.zoneSelected)
      // console.log(this.zoneTitle)
    },
    // 获取选择的商圈
    getRightData (data) {
      // 显示商圈
      this.businessCircleTitle = data.text
      if (this.businessCircleTitle == '全部') {
        this.businessCircleTitle = this.zoneTitle
      }
      console.log(this.businessCircleTitle)
      this.tradeAreaSelected = data.text
      // console.log(this.tradeAreaSelected)
      this.selectCinema()
    },
    // getSubwayRightData (data) {
    //   this.businessCircleTitle = data.text
    // },

    // 拿取到电影信息
    getMovie () {
      this.$axios.post("/getMovie", {
        locationCity:this.locationCity
      }).then((res) => {
        this.movieList = res.data.data
        console.log(this.movieList)
      })
    },
    // 获取电影院信息
    getCinemaData () {
      this.$axios.post("/getCinemaData", {
        locationCity:this.locationCity
      }).then((res) => {
        this.cinemaList = res.data.data
        console.log(this.cinemaList)
        // this.movieList.score = res.data.data[0].score
      })
    },
    // 选择影厅类型
    toSelectHallType (index) {
      this.isHallTypeSelected = index
      this.hallTypeSelected = this.hallType[index].name
    },
    // 选择影院服务
    toSelectCinemaServer (index) {
      this.isCinemaServerSelected = index
      this.cinemaServerSelected = this.cinemaServer[index].name
    },
    // 重置筛选
    clearSelect () {
      this.isHallTypeSelected = 0
      this.isCinemaServerSelected = 0
    },
    // 确认筛选
    makeSureSelect () {
      this.$refs.item.toggle() //自定义下拉菜单之后，手动控制显示
      // console.log(this.hallTypeSelected)
      // console.log(this.cinemaServerSelected)
      this.selectCinema()

    },
    // 选择品牌
    chooseBrand (value) {
      this.brandListValue = value
      this.brandSelectText = this.brandList[value].text
      // console.log(this.brandSelectText)
      // console.log(value)
      // if (value == 0) {
      //   this.getCinemaData()
      // } else {
      this.selectCinema()
      // }
    },
    // 选择排序方式
    chooseSortOrder (value) {
      this.sortOrderValue = value
      // this.sortOrderText = this.sortOrderList[value].text
      // console.log(this.sortOrderText)
      if (value == 0) {
        this.sortOrderText = 'bottomPrice,cinemaDistance'
      } else if (value == 1) {
        this.sortOrderText = 'cinemaDistance'
      } else if (value == 2) {
        this.sortOrderText = 'bottomPrice'
      }
      this.selectCinema()
    },
    // 筛选影院服务
    // selectHallType () {
    //   this.$axios.post('/selectHallType', {

    //     hallTypeSelected: this.hallTypeSelected
    //   }).then((res) => {
    //     if (res.data.code == 200) {
    //       // console.log(res.data.data)
    //       // this.cinemaList = res.data.data
    //     }
    //   })
    // },
    // 筛选
    selectCinema () {
      if (this.zoneSelected == '全部') {
        this.zoneSelected = ''
      }
      if (this.tradeAreaSelected == '全部') {
        this.tradeAreaSelected = ''
      }
      if (this.hallTypeSelected == '全部') {
        this.hallTypeSelected = ''
      }
      if (this.cinemaServerSelected == '全部') {
        this.cinemaServerSelected = ''
      }
      if (this.brandSelectText == '全部') {
        this.brandSelectText = ''
      }
      // console.log(this.zoneSelected) //选择的区
      // console.log(this.tradeAreaSelected) //选择的商圈
      // console.log(this.hallTypeSelected) //影厅类型
      // console.log(this.cinemaServerSelected) //影院服务
      // console.log(this.brandSelectText) //影院品牌
      // console.log(this.sortOrderText)
      this.$axios.post('/selectCinema', {
        cinemaServerSelected: this.cinemaServerSelected,
        hallTypeSelected: this.hallTypeSelected,
        brandSelectText: this.brandSelectText,
        zoneSelected: this.zoneSelected,
        tradeAreaSelected: this.tradeAreaSelected,
        sortOrderText: this.sortOrderText,
        locationCity:this.locationCity
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
          this.cinemaList = res.data.data
        }
      })
    },
    // 即将要上线的电影
    getComingSoonMovie () {
      this.$axios.post("/getComingSoonMovie", {

      }).then((res) => {
        if (res.data.code == 200) {
          this.comingSoonMovieList = res.data.data
          console.log(res.data.data)
        }
      })
    },
    getTrailerData () {
      this.$axios.post("/getTrailerData", {

      }).then((res) => {
        if (res.data.code) {
          this.trailerList = res.data.data
          console.log(res.data.data)
        }
      })
    },
    getRecentExpectations () {
      this.$axios.post("/getRecentExpectations", {

      }).then((res) => {
        if (res.data.code) {
          this.recentExpectationsList = res.data.data
        }
      })
    },
    toLookPopularTrailer (item) {
      localStorage.setItem("videoPlay", JSON.stringify(item))
      this.$router.push({ path: '/Tickets/VideoPlay' })
    }
    // 即将要上线的电影，操作“想看”
    // wantToWatch (mItem) {
    //   if(mItem.users==null){
    //     isActive = true
    //   }else{
    //     isActive=false
    //   }
    //   this.$axios.post("/wantToLook", {
    //     wantLook: mItem.wantLook,
    //     movieId: mItem.movieId,
    //     isActive: this.isActive,
    //     userId: this.userInfo.userId,
    //   }).then((res) => {
    //     // this.movieList = res.data.data
    //     console.log(res)
    //     if(res.data.code==200){
    //       this.getComingSoonMovie()
    //     }
    //   })
    //   console.log(mItem)
    // },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-con {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
  .navBarWrap {
    position: fixed;
    top: 44px;
    // z-index:999;
  }
  /deep/ .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0px 0;
  }
  .van-tab__pane,
  .van-tab__pane-wrapper {
    padding-bottom: 46px;
  }
  /deep/ .van-tabs__line {
    background-color: #ff3174;
  }
  /deep/ .van-dropdown-menu__title--active {
    color: #ff3174;
  }
  /deep/ .van-dropdown-item__option--active {
    color: #ff3174;
  }
  /deep/ .van-dropdown-item__option--active .van-dropdown-item__icon {
    color: #ff3174;
  }
  .van-sidebar-item--select {
    color: #ff3174;
    font-weight: 500;
    border-color: transparent;
  }
  /deep/ .van-sticky--fixed {
    margin-left: 9px;
    margin-right: 9px;
  }
  h3,
  p {
    margin: 5px 0;
  }
  .ticket-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    .location {
      display: flex;
      align-items: center;
      font-size: 14px;
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
      width: 20px;
    }
  }
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
      font-size: 12px;
      img {
        width: 90px;
        height: 115px;
        border-radius: 4px;
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
  .select {
    width: 100%;
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      display: none;
    }
    .van-dropdown-menu {
      width: 50px;
      height: 25px;
      display: flex;
      width: 100%;
      justify-content: flex-start;
      padding: 10px 0;
      /deep/.van-dropdown-menu__item {
        margin: 0 3px;
        flex: inherit;
        padding: 4px 10px;
        border: 1px solid #ebedf0;
        .van-dropdown-menu__title {
          padding: 0 8px 0 0;
          font-size: 13px;
        }
      }
    }
    .pick-cinema {
      padding: 0 10px;
      height: 320px;
      width: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      box-sizing: border-box;
      p {
        display: flex;
        justify-content: space-between;
      }
      div {
        border-bottom: rgb(241, 240, 235) 1px solid;
        padding: 10px 0;
      }
      .parts {
        flex-wrap: wrap;
        span {
          display: inline-block;
          width: 108px;
          height: 28px;
          line-height: 28px;
          border-radius: 3px;
          background: #d6d5d145;
          text-align: center;
          margin-top: 5px;
        }
        .selected {
          background: rgba(255, 49, 116, 0.11);
          color: rgb(255, 49, 116);
        }
      }
      .parts-block:after {
        content: '';
        display: inline-block;
        width: 108px;
        height: 28px;
        // background: aquamarine;
      }
    }
    .pick-buttons {
      // position: fixed;
      // bottom: 0;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        width: 160px;
        margin: 0 5px;
      }
    }
  }
  .cinema-all {
    // margin-bottom: 60px;
  }
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
  .coming-soon {
    .popular {
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .popular-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
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
        width: 200px;
        height: 120px;
        border-radius: 6px;
      }
      .sortMenu .cell {
        display: inline-block;
        font-size: 12px;
        margin: 0px 1em 0 0;
        width: 200px;
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
    .recent-expectations {
      h4,
      p {
        margin: 5px 0;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .recent-expectations-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
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
        // width: auto;
        height: 115px;
        border-radius: 4px;
      }
      .sortMenu .cell {
        display: inline-block;
        font-size: 12px;
        margin: 0px 1em 0 0;
        // width: auto;
        width: 90px;
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
    .coming-soon-film {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0px;
      .information {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        font-size: 12px;
        .want-to-look-number {
          color: #ffd700;
        }
        img {
          width: 90px;
          height: 115px;
          border-radius: 4px;
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
      .look {
        display: inline-block;
        height: 30px;
        width: 60px;
        line-height: 30px;
        text-align: center;
        // border: 1px solid rgb(148, 148, 139);
        border-radius: 30px;
      }
      .want-look {
        // color: yellow !important;
        border: 1px solid rgb(148, 148, 139);
        color: rgb(148, 148, 139);
      }
      .has-look {
        color: white;
        background-image: linear-gradient(to left, #ffd700, #ff9912);
      }
    }
  }
}
</style>
