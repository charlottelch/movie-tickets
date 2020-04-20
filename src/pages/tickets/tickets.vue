<template>
  <div class="main-con">
    <div class="ticket-top">
      <div class="location">
        <p>成都</p>
        <i class="arrow-bottom"></i>
      </div>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" input-align="center" />
      <div class="right">
        <van-icon name="location-o" @click="toCinemaMap" />
        <van-icon name="search" />
      </div>
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
                <span v-for="(dItem,index) in mItem.director" :key="index">{{dItem.performerName}}</span>
              </p>
              <p>
                主演:
                <span v-for="(aItem,index) in mItem.actor" :key="index">
                  <span>{{aItem.performerName}}  </span>
                </span>
              </p>
            </div>
          </div>
          <van-button color="#7232dd" size="mini" round @click="goTicketsBuy">购票</van-button>
        </div>
      </van-tab>
      <van-tab title="影院">
        <div class="select" :class="navBarFixed == true ? 'navBarWrap' :''">
          <van-dropdown-menu>
            <van-dropdown-item :title="businessCircleTitle" class="first">
              <van-tabs v-model="active1">
                <van-tab title="商圈">
                  <van-tree-select
                    :items="businessCircleItems"
                    :active-id.sync="activeId"
                    :main-active-index.sync="activeIndex"
                    @click-item="getRightData"
                  />
                </van-tab>
                <van-tab title="地铁">
                  <van-tree-select
                    :items="subwayItems"
                    :active-id.sync="subwayActiveId"
                    :main-active-index.sync="subwayActiveIndex"
                    @click-item="getSubwayRightData"
                  />
                </van-tab>
              </van-tabs>
            </van-dropdown-item>
            <van-dropdown-item title="筛选" v-model="value1" class="second">
              <div class="pick-cinema">
                <div v-for="(item, index) in selectCinemaPartsList" :key="index">
                  <p>
                    <span>{{item.title}}</span>
                    <span>
                      展开
                      <van-icon name="arrow-down" />
                    </span>
                  </p>
                  <p class="parts">
                    <span v-for="(sitem, index) in item.select" :key="index">{{sitem}}</span>
                  </p>
                </div>
              </div>
              <div class="pick-buttons">
                <van-button round type="info" size="small">清空</van-button>
                <van-button round type="info" size="small">确定</van-button>
              </div>
            </van-dropdown-item>
            <van-dropdown-item
              :title="option2.text"
              v-model="value2"
              class="third"
              :options="option2"
            ></van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <div class="cinema" v-for="item in 10" @click="toCinemaDetail">
          <div class="cinema-info">
            <div>
              <h3>太平洋影城(温江店)</h3>
              <p>温江星艺大道300号艺苑生活圈2楼</p>
            </div>
            <div class="cinema-info-right">
              <span>￥28元</span>
              <span>起</span>
              <p>28.1km</p>
            </div>
          </div>
          <div class="label">
            <van-tag color="#f2826a">3D</van-tag>
            <van-tag color="#f2826a">可停车</van-tag>
            <van-tag color="#7232dd">儿童优惠</van-tag>
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
      value2: 'a',
      active: 0,
      active1: '',
      option2: [
        { text: '综合排序', value: 'a' },
        { text: '离我最近', value: 'b' },
        { text: '价格最低', value: 'c' },
      ],
      navBarFixed: false,
      businessCircleItems: [
        { text: '浙江', children: [{ text: '宁海宁海宁海宁海' }, { text: '浙江' }] },
        { text: '江苏', children: [{ text: '海' }, { text: '江' }] }
      ],
      activeId: 1,
      activeIndex: 0,
      businessCircleTitle: '全城',
      subwayItems: [
        { text: '1号线', children: [{ text: '天府广场' }, { text: '金融城' }] },
        { text: '2号线', children: [{ text: '春熙路' }, { text: '犀浦' }] }
      ],
      subwayActiveId: 1,
      subwayActiveIndex: 0,
      selectCinemaPartsList: [
        {
          "title": "放映影厅",
          "select": ["IMAX厅", "杜比影院", "120帧", "巨幕厅", "激光厅", "艺术影厅", "CGS中国巨幕厅", "MX4D厅", "DTS临境厅", "4D厅", "融合厅"]
        },
        {
          "title": "影院服务",
          "select": ["退票", "改签", "影城卡", "观影小食", "3D眼镜收费", "VIP厅", "可停车"]
        }
        ,
        {
          "title": "影院品牌",
          "select": ["太平洋影城", "万达电影", "CGV", "横店影视", "星美影商城", "橙天嘉禾", "UME影城", "百老汇电影", "卢米埃影城", "博纳影城", "大地影院", "幸福蓝海国际影城", "保利影城"]
        }
      ],
      movieList: []
      // subwayTitle: '全城',
    }
  },
  mounted () {
    this.getMovie()
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)
  },
  methods: {
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
      // 跳转到Goods.vue商品详情页面,name为Goods.vue页面路由配置里的的name属性
      this.$router.push({path:'/Tickets/MovieDetail'})
      localStorage.setItem('movie',JSON.stringify(mItem));
    },
    toCinemaDetail () {
      this.$router.push('/Tickets/CinemaDetail')
    },
    goTicketsBuy () {
      this.$router.push('/Tickets/TicketsBuy')
    },
    toCinemaMap () {
      this.$router.push('/Tickets/CinemaMap')
    },
    getRightData (data) {
      this.businessCircleTitle = data.text
      console.log(data.text)
    },
    getSubwayRightData (data) {
      this.businessCircleTitle = data.text
    },
    wantToWatch () {
      console.log("want to look")
    },
    getMovie () {
      this.$axios.post("http://localhost:8080/getMovie", {
        // user_id: "1"
      }).then((res) => {
        this.movieList = res.data.data
        console.log(this.movieList)
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
          background: rgb(241, 240, 235);
          text-align: center;
          margin-top: 5px;
        }
      }
      .parts:after {
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
