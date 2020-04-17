<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="tickets-body">
      <van-swipe-cell :before-close="beforeClose">
        <div class="ticket" @click="toTicketDetail">
          <div>
            <h3>
              沉睡魔咒2
              <span>2张</span>
            </h3>
            <p>
              <span>2019-12-31</span>
              <span>17:50</span>
            </p>
            <p>鑫苑星空影城</p>
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
    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toTicketDetail () {
      this.$router.push('/PersonalCenter/MovieTickets/TicketDetail')
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
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 75px;
      height: 64px;
    }
  }
}
</style>