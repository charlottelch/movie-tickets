<template>
  <div class="main-con">
    <div class="ticket-top">
      <div class="location">
        <p>成都</p>
        <i class="arrow-bottom"></i>
      </div>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" input-align="center" />
      <div class="right">
        <van-icon name="location-o" />
        <van-icon name="search" @click="getUserInfo" />
      </div>
    </div>
    <van-tabs v-model="active" sticky>
      <van-tab title="热映">
        <div class="film" v-for="item in 16">
          <div class="information" @click="goMovieDetailPage">
            <img src="../../assets/film1.jpg" alt />
            <div>
              <h3>囧妈</h3>
              <p>
                评分
                <span>8.0</span>
              </p>
              <p>
                导演:
                <span>徐峥</span>
              </p>
              <p>
                主演:
                <span>迈克尔.佩纳/丽兹.卡潘</span>
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
                <div  v-for="(item, index) in selectCinemaPartsList" :key="index">
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
            <van-dropdown-item :title="option2.text" v-model="value2" class="third" :options="option2"></van-dropdown-item>
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
      <van-tab title="即将上映">内容 2</van-tab>
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
      active: 1,
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
      selectCinemaPartsList:[
        {
          "title":"放映影厅",
          "select":["IMAX厅","杜比影院","120帧","巨幕厅","激光厅","艺术影厅","CGS中国巨幕厅","MX4D厅","DTS临境厅","4D厅","融合厅"]
        },
        {
          "title":"影院服务",
          "select":["退票","改签","影城卡","观影小食","3D眼镜收费","VIP厅","可停车"]
        }
        ,
        {
          "title":"影院品牌",
          "select":["太平洋影城","万达电影","CGV","横店影视","星美影商城","橙天嘉禾","UME影城","百老汇电影","卢米埃影城","博纳影城","大地影院","幸福蓝海国际影城","保利影城"]
        }
      ]
      // subwayTitle: '全城',
    }
  },
  mounted () {
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
    goMovieDetailPage () {
      // 跳转到Goods.vue商品详情页面,name为Goods.vue页面路由配置里的的name属性
      this.$router.push('/Tickets/MovieDetail')
    },
    toCinemaDetail () {
      this.$router.push('/Tickets/CinemaDetail')
    },
    goTicketsBuy () {
      this.$router.push('/Tickets/TicketsBuy')
    },
    getRightData (data) {
      this.businessCircleTitle = data.text
      console.log(data.text)
    },
    getSubwayRightData (data) {
      this.businessCircleTitle = data.text
    },
    getUserInfo () {
      this.$axios.post("http://localhost:8080/api/getUserInfo", {
        user_id: "1"
      }).then((response) => {
        console.log(response)
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
}
</style>
