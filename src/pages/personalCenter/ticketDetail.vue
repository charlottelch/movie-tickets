<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <span class="comment">查看影片评价</span>
    <div class="ticket-info">
      <div>
        <h3>{{orderDetailList.movieName}}</h3>
        <p>{{orderDetailList.sceneDate}} {{orderDetailList.startTime}}-{{orderDetailList.endTime}} ({{orderDetailList.studioType}})</p>
        <p>{{orderDetailList.cinemaName}} {{orderDetailList.cinemaHallName}}</p>
        <p class="seat">
          <span
            v-for="(item,index) in orderDetailList.seat"
            :key="index"
          >{{item.seatY+1+'排'}}{{item.seatX+1+'座'}}</span>
        </p>
      </div>
      <van-divider dashed></van-divider>
      <div>
        <h3>取电影票</h3>
        <div class="qrcode" ref="qrCodeUrl" id="qrcode"></div>
        <p>出票号:{{orderList.ticketCode}}</p>
      </div>
      <van-divider dashed></van-divider>
      <div class="cinema-info">
        <div class="cinema-info-left">
          <h3>{{orderDetailList.cinemaName}}</h3>
          <p>{{orderDetailList.cinemaAdress}}</p>
        </div>
        <img src="../../assets/icon/phone.png" alt />
      </div>
      <van-divider dashed></van-divider>
      <div class="order-info-price">
        <div class="select" @click="settlementDetails=true">
          <h3>实际金额:￥{{orderList.cost}}</h3>
          <div class="select-right">
            <span>结算明细</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <p>订单号:{{orderList.orderNum}}</p>
        <p>购买时间:{{orderList.orderTime}}</p>
        <p>手机号:18702821964</p>
        <van-action-sheet
          v-model="settlementDetails"
          title="结算明细"
          cancel-text="取消"
          @cancel="onSettlementDetailsCancel"
        >
          <div class="content">
            <h4>电影票(含服务费)</h4>
            <p>
              <span>票价</span>
              <span>￥{{orderDetailList.ticketPrice}}*{{ticketsCount}}</span>
            </p>
            <p>
              <span>通用券</span>
              <span>-￥{{orderList.couponValue}}</span>
            </p>
          </div>
        </van-action-sheet>
      </div>
      <!-- <van-divider dashed></van-divider>
      <div>
        <div class="select">
          <span>帮助中心</span>
          <div class="select-right">
            <span>结算明细</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div> -->
      <van-divider dashed></van-divider>
      <div class="watch-tips">
        <h3>观影需知</h3>
        <ul>
          <li>
            1. 请提前到达影院现场，找到自助取票机，打印纸质
            电影票，完成取票。
          </li>
          <li>
            2. 如现场自助取票机无法打印电影票，请联系影院工作
            人员处理。
          </li>
          <li>3. 凭打印好的纸质电影票，检票入场观影</li>
          <li>
            4. 如果订单使用了兑换券，或购买了特殊场次，暂不支持退
            票和改签。
          </li>
          <li>
            5. 改签、退票服务由影城决定，特殊场次及使用兑换券的场
            次不支持改签、退票
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
import QRCode from 'qrcodejs2';
export default {
  components: {
    NavTitle
  },
  name: 'TicketDetail',
  data () {
    return {
      title: '电影票',
      settlementDetails: false,
      orderId: '',
      orderList: {},
      ticketsCount: '',
      orderDetailList: [],
      ticketsCode: ''
    }
  },
  mounted () {
    this.orderId = JSON.parse(localStorage.getItem('order'))
    this.getOrderData()
    // this.creatQrCode();
  },
  created () {
  },
  methods: {
    onClickLeft () {
      // this.$router.go(-1)
      this.$router.push('/PersonalCenter/MovieTickets')
    },
    onSettlementDetailsCancel () {
      // console.log(this.settlementDetails)
      this.settlementDetails = false
    },
    // 生成二维码
    creatQrCode () {
      console.log(this.ticketsCode)
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        // 这里选择器也可以直接写 'qrcode' 用的是id选择器,指示不需要带 # 而已
        // text: '沉睡魔咒2 2019-10-26 17:50-19:49 (英语3D) 鑫苑星空影城 2号巨幕厅 6排8座|6排9座', 
        text: this.ticketsCode, //  生成二维码的 内容
        width: 150,    //  宽,单位 px
        height: 150,   //  高,单位 px 
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
        // background: '#f0f'  
        // foreground: '#ff0'  
        correctLevel: QRCode.CorrectLevel.H   // 二维码容错 级别
      })
    },
    // 获取订单信息
    getOrderData () {
      this.$axios.post("/getOrderData", {
        orderId: this.orderId
      }).then((res) => {
        if (res.data.code == 200) {
          // console.log(res.data.data)
          this.orderList = res.data.data[0]
          console.log(this.orderList)
          this.ticketsCode = this.orderList.ticketCode
          console.log(this.ticketsCode)
          this.creatQrCode()
          this.getOrderDetailData()
        }
      })
    },
    // 获取页面影院、电影等的具体信息
    getOrderDetailData () {
      this.$axios.post("/getOrderDetailData", {
        orderId: this.orderId,
        sceneId: this.orderList.sceneId
      }).then((res) => {
        if (res.data.code == 200) {
          // console.log(res.data.data)
          this.orderDetailList = res.data.data[0]
          this.ticketsCount = this.orderDetailList.seat.length
          console.log(this.orderDetailList.seat.length)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  background: #28aca4;
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  .comment {
    display: inline-block;
    font-size: 12px;
    width: 130px;
    height: 25px;
    line-height: 25px;
    color: white;
    border: 1px solid white;
    border-radius: 30px;
    margin: 56px 0 20px 0;
    // text-align: center;
  }
  .ticket-info {
    margin: 0 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    .seat {
      span{
        padding: 0 4px;
      }
    }
    .qrcode {
      display: flex;
      justify-content: center;
    }
    .cinema-info {
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cinema-info-left {
        width: 260px;
      }
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h3,
      p {
        margin: 5px 0;
      }
    }
    .order-info-price {
      text-align: left;
      .content {
        padding: 0 10px;
        p {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
    .watch-tips {
      text-align: left;
    }
  }
  .select {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .select-right {
      display: flex;
      align-items: center;
      .select-picture {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
  /deep/ .van-nav-bar {
    background-color: transparent !important;
    color: white;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    i {
      color: white;
    }
    .van-nav-bar__title {
      color: white;
    }
  }
  /deep/ .van-hairline--bottom::after {
    border-bottom-width: 0px !important;
  }
}
</style>