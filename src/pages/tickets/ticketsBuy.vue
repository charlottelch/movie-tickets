<template>
  <div class="main-con">
    <van-nav-bar fixed title="电影名称" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="detail-info">
      <van-tabs class="date-tab">
        <div class="select">
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
        <div>
          <van-tab v-for="(item, index) in weekList" :title="item.date" :key="index">
            <div class="cinema-totle">
              <div class="cinema" v-for="(citem, index) in item.cinema" :key="index">
                <div class="cinema-info">
                  <div>
                    <h3>{{citem.cinema}}</h3>
                    <p>{{citem.address}}</p>
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
      // weekList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      active1: '',
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
      // 筛选的值
      value1: 0,
      value2: 'a',
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
      ]
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getRightData (data) {
      this.businessCircleTitle = data.text
      console.log(data.text)
    },
    getSubwayRightData (data) {
      this.businessCircleTitle = data.text
    },
  }
}
</script>

<style lang="less" scoped>
.main-con {
  font-size: 12px;
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
    .select {
      position: fixed;
      top: 90px;
      width: 100%;
      padding: 0 10px;
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
    .cinema-totle {
      margin-top: 120px;
    }
    .cinema {
      text-align: left;
      border-bottom: 1px solid #ebedf0;
      padding: 7px 10px;
      background: white;
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
}
</style>
