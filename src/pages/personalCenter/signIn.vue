<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="sign-in">
      <div class="sign-in-show">
        <p>本周累计签到{{day}}天</p>
        <p>
          <span>{{integral}}</span>
          <span>影豆</span>
        </p>
      </div>
      <div id="app">
        <vue-better-calendar
          ref="calendar"
          mode="sign"
          :signed-dates="signedDates"
          @select-sign-date="selectSign"
          :sign-success-txt="'签到成功，获取5个影豆'"
        ></vue-better-calendar>
        <button
          class="sign-btn"
          :class="{'sign-btn_disabled':isSigned || isSigning}"
          ref="signBtn"
          :disabled="isSigned || isSigning"
          @click="sign"
        >{{isSigned ? '今日已签到' : (isSigning ? '正 在 签 到' : '立 即 签 到')}}</button>
      </div>
      <!-- <div class="do-sign-in">
        <ul>
          <li v-for="item in 7">
            <span>1天</span>
            <img src="../../assets/icon/gift.png" alt />
          </li>
        </ul>
        <div>
          <van-button round type="info" size="small">签到</van-button>
        </div>
      </div>-->
      <div class="bottom-coupon">
        <h3>影劵</h3>
        <div class="coupon-all">
          <div class="coupon" v-for="(item,index) in couponList" :key="index">
            <div class="coupon-paper">
              <div>￥{{item.valueDesc}}抵扣劵</div>
            </div>
            <p>{{item.valueDesc}}元抵扣劵</p>
            <div class="convert-coupon">
              <span>{{item.cost}}影豆</span>
              <van-button round type="info" size="small" @click="exchange(item)">兑换</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'SignIn',
  data () {
    return {
      title: '签到',
      active: 0,
      day: '',
      integral: '',
      signedDates: [],
      isSigned: false,
      isSigning: false,
      userInfo: {},
      clickSign: '',
      couponList: [
        { value: '200', cost: '400', unitDesc: '元', condition: '无门槛', name: '抵扣券', valueDesc: '2' },
        { value: '500', cost: '800', unitDesc: '元', condition: '无门槛', name: '抵扣券', valueDesc: '5' },
        // startAt:'',
        //     endAt:'',

      ],
      currentdate: '',
      timeNumber: '',
      startAt: null,
      endAt: null
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    console.log(this.userInfo.integral)
    this.getSignInData()
    this.getNowFormatDate()
    this.startAt = this.timeNumber
    this.endAt = this.timeNumber + 86400 * 3
    // console.log(this.startAt)
    console.log(this.endAt)

  },
  methods: {
    // 获取当天的时间，及时间戳
    getNowFormatDate () {
      // endData.setDate(date.getDate()+3)
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentdate = year + seperator1 + month + seperator1 + strDate;
      // return currentdate;
      console.log(this.currentdate)
      var timeStamp = new Date(this.currentdate).getTime()
      var timeString = timeStamp.toString()
      // console.log(timeStamp.toString())
      var shortName = timeString.substr(0, 10)
      // console.log(typeof(shortName))
      this.timeNumber = Number(shortName)
      console.log(this.timeNumber)
      // console.log(this.coupons[0].endAt)
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    selectSign (signInfo) {
      /* signInfo.status 判断签到是否为当天
        *  signInfo.msg 本次是否签到成功的提示语
        *  signInfo.signedDates 本次签到后目前所有已签到的日期集合
        */
      if (signInfo.status) {
        this.isSigning = true
        // 获取此次签到的时间
        this.clickSign = signInfo.signedDates[signInfo.signedDates.length - 1]
        console.log(this.clickSign)

        this.$axios.post("http://localhost:8080/insertSignData", {
          userId: this.userInfo.userId,
          signDate: this.clickSign,
          integral: this.integral
        }).then((res) => {
          if (res.data.code == 200) {
            this.isSigning = false
            // 模拟请求成功状态值
            let responseDataStatus = true // true为成功，false为失败（具体看接口）
            let responseDataMsg = '签到失败，请重试~'
            if (responseDataStatus) {
              // 改变签到状态
              this.isSigned = true

              // 提示签到成功，可以通过signSuccessTxt属性设置
              alert(signInfo.msg)

              // 更新已签到日期
              this.signedDates = signInfo.signedDates
              // console.log(this.signedDates)
            } else {
              alert(responseDataMsg)
            }
            this.getSignInData() //签到成功之后，再次调用函数，刷新签到天数
          } else {
          }
        })

        // 模拟发送签到请求
        // setTimeout(() => {
        //   this.isSigning = false
        //   // 模拟请求成功状态值
        //   let responseDataStatus = true // true为成功，false为失败（具体看接口）
        //   let responseDataMsg = '签到失败，请重试~'
        //   if (responseDataStatus) {
        //     // 改变签到状态
        //     this.isSigned = true

        //     // 提示签到成功，可以通过signSuccessTxt属性设置
        //     alert(signInfo.msg)

        //     // 更新已签到日期
        //     this.signedDates = signInfo.signedDates
        //     // console.log(this.signedDates)
        //   } else {
        //     alert(responseDataMsg)
        //   }
        // }, 3000)
      } else {
        /* 需要在当天才能签到的提示，有如下三个属性可设置提示内容
         * notSignInOtherMonthsTxt，签到时点击本月外日期时的文本提示，默认值为“不能在本月外进行签到”
         * notSignInOtherDaysTxt，签到时点击本月内非当天日期时的文本提示，默认值为“notSignInOtherDaysTxt”
         * alreadySignTxt，签到时点击已经签过到的日期时的文本提示，默认值为“本日已经进行过签到”
         */
        alert(signInfo.msg)
      }
    },
    sign () {
      this.$refs.calendar.sign()
    },
    // 签到信息
    getSignInData () {
      this.$axios.post("http://localhost:8080/getSignInData", {
        userId: this.userInfo.userId,
      }).then((res) => {
        if (res.data.code == 200) {
          // 获取累计签到天数
          var dayList = res.data.data.day[0]
          this.day = dayList[0].day
          // 获取积分
          var integralList = res.data.data.integral[0]
          this.integral = integralList[0].integral
          // 累计签到的日期
          var signDataList = res.data.data.signDate[0]
          var str = ''
          signDataList.forEach((e) => {
            str += e.signDate + ','
          })
          str = str.substring(0, str.length - 1)
          this.signedDates = str.split(',')
          // console.log(this.day)
          // console.log(this.integral)
          // console.log(res.data.data)
        } else {
        }
      })
    },
    // 兑换电影抵扣券
    exchange (item) {
      this.$dialog.confirm({
        // title:'标题奥',
        message: '确认兑换吗？',
        confirmButtonColor: 'red'
      }).then(() => {
        console.log('点击了确认')
        if (item.cost <= this.integral) {
          this.$axios.post("http://localhost:8080/toExchangeCoupon", {
            userId: this.userInfo.userId,
            value: item.value,
            cost: item.cost,
            startAt: this.startAt,
            endAt: this.endAt,
            unitDesc: item.unitDesc,
            condition: item.condition,
            name: item.name,
            valueDesc: item.valueDesc,
            // integral: this.integral
          }).then((res) => {
            if (res.data.code == 200) {
              console.log("兑换成功")
              this.getSignInData() //兑换成功之后再次调用函数，更新影豆数量
            }
            // console.log(res.data)
          })
        } else {
          console.log("影豆不足")
        }
        // this.$store.commit(CLEAR_USERINFO)
        // this.$router.push({ path: '/PersonalCenter' })
        // console.log('haha')
      }).catch(() => {
        console.log('点击了取消')
      })
    }

  }
}
</script>

<style lang="less" scoped>
.sign-in {
  .sign-in-show {
    padding: 10px 20px;
    // background: rgb(247, 179, 155);
    color: white;
    background: url('../../assets/sign-in-bg.png');
    border-radius: 10px;
  }
  .do-sign-in {
    margin-top: 20px;
    border: 1px solid rgb(223, 222, 222);
    border-radius: 10px;
    ul {
      display: flex;
      justify-content: space-between;
      padding: 15px 10px;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 4px;
        background: rgb(248, 246, 246);
        font-size: 12px;
        color: #cdcdcd;
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
    div {
      display: flex;
      justify-content: center;
      button {
        width: 200px;
        margin-bottom: 15px;
      }
    }
  }
  .bottom-coupon {
    padding: 0 10px;
  }
  .coupon-all {
    display: flex;
    justify-content: space-between;
    .coupon {
      width: 170px;
      box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;
      border-radius: 4px;
      .coupon-paper {
        width: 100%;
        height: 100px;
        // border-radius: 4px;
        background: rgb(180, 196, 238);
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          width: 150px;
          height: 86px;
          background: url('../../assets/coupon-bg.png');
          background-size: 150px 86px;
          color: rgb(143, 169, 235);
          text-align: center;
          line-height: 86px;
        }
      }
      p {
        padding: 5px;
        margin: 0;
      }
      .convert-coupon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
      }
    }
  }
  #app {
    width: 375px;
    height: 776px;
    .sign-btn {
      margin: 30px;
      padding: 8px 16px;
      font-size: 14px;
      color: #333;
      background: #fff;
      border-radius: 4px;
      border: 2px solid rgb(90, 121, 140);
      &.sign-btn_disabled {
        background: #ebebeb;
        border: #ebebeb;
      }
    }
  }
}
</style>