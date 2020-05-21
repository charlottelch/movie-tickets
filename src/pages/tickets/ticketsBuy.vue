<template>
  <div class="main-con">
    <van-nav-bar fixed :title="movieList.movieName" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="detail-info">
      <van-tabs class="date-tab">
        <div class="select" :class="navBarFixed == true ? 'navBarWrap' :''">
          <van-dropdown-menu>
            <van-dropdown-item :title="businessCircleTitle" class="first">
              <!-- <van-tabs v-model="active1">
              <van-tab title="商圈">-->
              <van-tree-select
                :items="businessCircleItems"
                :active-id.sync="activeId"
                :main-active-index.sync="activeIndex"
                @click-nav="getLeftData"
                @click-item="getRightData"
              />
              <!-- </van-tab>
              </van-tabs>-->
            </van-dropdown-item>
            <van-dropdown-item title="筛选" v-model="value1" class="second" ref="item">
              <div class="pick-cinema">
                <div>
                  <p>
                    <span>影院服务</span>
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
        <div>
          <van-tab v-for="(item, index) in movieSceneList" :title="item.sceneDate" :key="index">
            <div class="cinema-totle">
              <div
                class="cinema"
                v-for="(citem, index) in item.cinema"
                :key="index"
                @click="toCinemaDetail(citem)"
              >
                <div class="cinema-info">
                  <div>
                    <h3>{{citem.cinemaName}}</h3>
                    <p>{{citem.cinemaAdress}}</p>
                  </div>
                  <div class="cinema-info-right">
                    <span v-if="citem.bottomPrice!=0">￥{{citem.bottomPrice}}元</span>
                    <span v-if="citem.bottomPrice==0">暂无</span>
                    <span v-if="citem.bottomPrice!=0">起</span>
                    <p>{{citem.cinemaDistance}}km</p>
                  </div>
                </div>
                <div class="label">
                  <van-tag
                    color="#ff3174"
                    v-for="(Litem,index) in citem.label"
                    :key="index"
                  >{{Litem.labelName}}</van-tag>
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
export default {
  name: 'TicketsBuy',
  data () {
    return {
      active1: '',
      // 筛选的值
      value1: 0,
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
      movieSceneList: [],
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
      sortOrderText: 'bottomPrice,cinemaDistance'
      // subwayTitle: '全城',
    }
  },
  mounted () {
    this.movieList = JSON.parse(localStorage.getItem('movie'))
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)
    this.getMovieCinema()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
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
      // console.log(this.businessCircleTitle)
      this.tradeAreaSelected = data.text
      // console.log(this.tradeAreaSelected)
      this.selectMovieCinema()
    },
    // 获取有该电影的影院
    getMovieCinema () {
      this.$axios.post("/getMovieCinema", {
        movieId: this.movieList.movieId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            this.movieSceneList = res.data.data
            console.log(this.movieSceneList)
          }
        } else {

        }
        // console.log(res.data.data.length)
      })
    },
    // 选择影厅类型
    toSelectHallType (index) {
      this.isHallTypeSelected = index
      this.hallTypeSelected = this.hallType[index].name
      // console.log(this.hallTypeSelected)
    },
    // 选择影院服务
    toSelectCinemaServer (index) {
      this.isCinemaServerSelected = index
      this.cinemaServerSelected = this.cinemaServer[index].name
      // console.log(this.cinemaServerSelected)

    },
    // 重置筛选
    clearSelect () {
      this.isHallTypeSelected = 0
      this.isCinemaServerSelected = 0
    },
    // 确认筛选
    makeSureSelect () {
      this.$refs.item.toggle() //自定义下拉菜单之后，手动控制显示
      console.log(this.hallTypeSelected)
      console.log(this.cinemaServerSelected)
      this.selectMovieCinema()
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
      this.selectMovieCinema()
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
      this.selectMovieCinema()
    },
    // 筛选
    selectMovieCinema () {
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
      console.log(this.zoneSelected) //选择的区
      console.log(this.tradeAreaSelected) //选择的商圈
      console.log(this.hallTypeSelected) //影厅类型
      console.log(this.cinemaServerSelected) //影院服务
      console.log(this.brandSelectText) //影院品牌
      console.log(this.sortOrderText)
      this.$axios.post('/selectMovieCinema', {
        movieId: this.movieList.movieId,
        cinemaServerSelected: this.cinemaServerSelected,
        hallTypeSelected: this.hallTypeSelected,
        brandSelectText: this.brandSelectText,
        zoneSelected: this.zoneSelected,
        tradeAreaSelected: this.tradeAreaSelected,
        sortOrderText: this.sortOrderText,
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
          this.movieSceneList = res.data.data
        }
      })
    },

    toCinemaDetail (citem) {
      this.$router.push('/Tickets/CinemaDetail')
      localStorage.setItem('cinema', JSON.stringify(citem));
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
  .detail-info {
    margin-top: 46px;
    /deep/ .date-tab > .van-tabs__wrap {
      position: fixed !important;
      top: 46px;
      width: 100%;
    }
    /deep/ .date-tab {
      .van-tab__text {
        font-size: 10px;
      }
    }
    /deep/ .van-tabs__line {
      background-color: #ff3174;
    }
    .select {
      position: fixed;
      top: 90px;
      width: 100%;
      padding: 0 10px;
      .van-hairline--top-bottom::after,
      .van-hairline-unset--top-bottom::after {
        display: none;
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
      .van-dropdown-menu {
        width: 50px;
        height: 25px;
        display: flex;
        width: 100%;
        justify-content: flex-start;
        padding: 10px 0;
        // margin: 5px 5px 0 0;
        /deep/.van-dropdown-menu__item {
          margin-right: 10px;
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
        height: 390px;
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
    .cinema-totle {
      margin-top: 130px;
      padding: 0 10px;
    }
    .cinema {
      text-align: left;
      border-bottom: 1px solid #ebedf0;
      padding: 7px 0px;
      background: white;
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
  }
}
</style>
