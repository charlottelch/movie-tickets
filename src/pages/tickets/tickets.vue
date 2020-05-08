<template>
  <div class="main-con">
    <div class="ticket-top">
      <div class="location">
        <p>成都</p>
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
          <van-button color="#7232dd" size="mini" round @click="goTicketsBuy(mItem)">购票</van-button>
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
            <van-dropdown-item title="筛选" v-model="value1" class="second">
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
                <span>￥{{item.bottomPrice}}元</span>
                <span>起</span>
                <p>{{item.cinemaDistance}}</p>
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
              <p>
                <span>查看更多</span>
                <van-icon name="arrow" />
              </p>
            </div>
            <div class="sortMenu clearfix">
              <ul class="sortMenu-ul">
                <li class="cell" v-for="item in 6">
                  <img src="../../assets/头像.jpg" alt />
                  <h4>受益人</h4>
                  <p>大鹏与柳岩婚姻骗局</p>
                  <!-- <a href>{{item.sortname}}</a> -->
                </li>
              </ul>
            </div>
          </div>
          <div class="recent-expectations">
            <div class="recent-expectations-title">
              <h3>近期最受期待</h3>
              <p>
                <span>查看更多</span>
                <van-icon name="arrow" />
              </p>
            </div>
            <div class="sortMenu clearfix">
              <ul class="sortMenu-ul">
                <li class="cell" v-for="item in 6">
                  <img src="../../assets/头像.jpg" alt />
                  <h4>受益人</h4>
                  <p>大鹏与柳岩婚姻骗局</p>
                  <!-- <a href>{{item.sortname}}</a> -->
                </li>
              </ul>
            </div>
          </div>
          <div class="coming-soon-movies" v-for="item in 3">
            <h3 class="coming-soon-time">
              <span>4月30日</span>
              <span>周四</span>
            </h3>
            <div class="coming-soon-film" v-for="item in 3">
              <div class="information" @click="goMovieDetailPage">
                <img src="../../assets/img/big-red.jpg" alt />
                <div>
                  <h3>大红包</h3>
                  <p>
                    <span>800</span>
                    人想看
                  </p>
                  <p>
                    导演:
                    <span>李克龙</span>
                  </p>
                  <p>
                    主演:
                    <span>包贝尔/李成敏/张一鸣/贾冰/许君聪</span>
                  </p>
                </div>
              </div>
              <van-button color="#7200d0" size="mini" round @click="wantToWatch">想看</van-button>
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
        { text: '全部', children: [{ text: '全部' }] },
        { text: '武侯区', children: [{ text: '全部' }, { text: '火车南站' }, { text: '石羊场' }] },
        { text: '锦江区', children: [{ text: '全部' }, { text: '春熙路' }] },
        { text: '双流区', children: [{ text: '全部' }, { text: '华阳' }] },
        { text: '金牛区', children: [{ text: '全部' }, { text: '五块石' }] },
        { text: '郫都区', children: [{ text: '全部' }, { text: '红光' }, { text: '犀浦' }] },
        { text: '成华区', children: [{ text: '全部' }, { text: 'SM广场' }] },

      ],
      activeId: 1,
      activeIndex: 0,
      businessCircleTitle: '全城',
      zoneTitle:'',
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
      sortOrderText:'bottomPrice,cinemaDistance'
      // subwayTitle: '全城',
    }
  },
  mounted () {
    this.getMovie()
    this.getCinemaData()
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)

  },
  methods: {
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
      if(this.businessCircleTitle == '全部'){
        this.businessCircleTitle = this.zoneTitle
      }
      console.log(this.businessCircleTitle)
      this.tradeAreaSelected = data.text
      // console.log(this.tradeAreaSelected)
      this.selectMovie()
    },
    // getSubwayRightData (data) {
    //   this.businessCircleTitle = data.text
    // },
    // 想看
    wantToWatch () {
      console.log("want to look")
    },
    // 拿取到电影信息
    getMovie () {
      this.$axios.post("http://localhost:8080/getMovie", {
        // user_id: "1"
      }).then((res) => {
        this.movieList = res.data.data
        console.log(this.movieList)
      })
    },
    // 获取电影院信息
    getCinemaData () {
      this.$axios.post("http://localhost:8080/getCinemaData", {
        // userId: this.userInfo.userId,
        // movieId: this.movieList.movieId
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
      // console.log(this.hallTypeSelected)
      // console.log(this.cinemaServerSelected)
      this.selectMovie()

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
      this.selectMovie()
      // }
    },
    // 选择排序方式
    chooseSortOrder(value) {
      this.sortOrderValue = value
      // this.sortOrderText = this.sortOrderList[value].text
      // console.log(this.sortOrderText)
      if(value==0){
        this.sortOrderText = 'bottomPrice,cinemaDistance'
      }else if(value==1){
        this.sortOrderText = 'cinemaDistance'
      }else if(value==2){
        this.sortOrderText = 'bottomPrice'
      }
      this.selectMovie()
    },
    // 筛选影院服务
    selectHallType () {
      this.$axios.post('http://localhost:8080/selectHallType', {

        hallTypeSelected: this.hallTypeSelected
      }).then((res) => {
        if (res.data.code == 200) {
          // console.log(res.data.data)
          // this.cinemaList = res.data.data
        }
      })
    },
    // 筛选影院品牌
    selectMovie () {
      if(this.zoneSelected == '全部'){
        this.zoneSelected = ''
      }
      if(this.tradeAreaSelected == '全部'){
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
      this.$axios.post('http://localhost:8080/selectMovie', {
        cinemaServerSelected:this.cinemaServerSelected,
        hallTypeSelected:this.hallTypeSelected,
        brandSelectText: this.brandSelectText,
        zoneSelected: this.zoneSelected,
        tradeAreaSelected: this.tradeAreaSelected,
        sortOrderText: this.sortOrderText,
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
          this.cinemaList = res.data.data
        }
      })
    }

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
      width: 24px;
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
        width: 80px;
        height: 120px;
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
          background: rgb(243, 243, 242);
          text-align: center;
          margin-top: 5px;
        }
        .selected {
          background: rgb(245, 225, 229);
          color: crimson;
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
        width: 100px;
        height: 120px;
      }
      .sortMenu .cell {
        display: inline-block;
        font-size: 12px;
        margin: 0px 1em 0 0;
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
    .recent-expectations {
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
        width: 100px;
        height: 120px;
      }
      .sortMenu .cell {
        display: inline-block;
        font-size: 12px;
        margin: 0px 1em 0 0;
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
        img {
          width: 80px;
          height: 120px;
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
  }
}
</style>
