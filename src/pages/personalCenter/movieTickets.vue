<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="tickets-body">
      <van-swipe-cell
        :before-close="beforeClose"
        v-for="(item,index) in userOrderList"
        :key="index"
      >
        <div class="ticket" @click="toTicketDetail(item)">
          <div>
            <h3>
              {{item.movieName}}
              <!-- <span>2张</span> -->
            </h3>
            <p>
              <span>{{item.sceneDate}}</span>
              <span>{{item.startTime}}</span>
            </p>
            <p>{{item.cinemaName}}</p>
          </div>
          <div>
            <img src="../../assets/img/refunded.png" alt />
          </div>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'MovieTickets',
  data () {
    return {
      title: '我的电影票',
      userInfo: '',
      userOrderList: []
    }
  },
  mounted () {
    // 获取用户信息
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
    }
    this.getUserOrderData()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toTicketDetail (item) {
      this.$router.push('/PersonalCenter/MovieTickets/TicketDetail')
      localStorage.setItem("order", JSON.stringify(item.orderId))
    },
    getUserOrderData () {
      this.$axios.post("http://localhost:8080/getUserOrderData", {
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          this.userOrderList = res.data.data
          console.log(this.userOrderList)
        }
      })
    },
    beforeClose ({ position, instance }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            instance.close();
          });
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  p,
  h3 {
    margin: 5px 0;
  }
  /deep/.van-nav-bar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .tickets-body {
    margin-top: 46px;
  }
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  .ticket {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    border-radius: 5px;
    box-shadow: rgb(240, 240, 240) 0px 0px 10px 1px;

    img {
      width: 75px;
      height: 64px;
    }
  }
}
</style>