<template>
  <div class="main-con">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="cinema-title">
      <div class="cinema-info">
        <div>
          <h3>太平洋影城(温江店)</h3>
          <p>温江星艺大道300号艺苑生活圈2楼</p>
        </div>
        <div class="cinema-info-right">
          <div>
            <img src="../../assets/img/uncollect.png" alt v-show="isCollect" @click="collect" />
            <img src="../../assets/img/collected.png" alt v-show="!isCollect" @click="iscollect" />
          </div>
          <img src="../../assets/img/mapIcon.png" alt />
        </div>
      </div>
      <div class="label">
        <van-tag color="#f2826a">3D</van-tag>
        <van-tag color="#f2826a">可停车</van-tag>
        <van-tag color="#7232dd">儿童优惠</van-tag>
      </div>
    </div>
    <div class="movieShow"></div>
    <div class="movieinfo">
      <h3>狼图腾</h3>
      <p>
        <span>150分钟</span>/
        <span>动作 喜剧 音乐 奇幻</span>/
        <span>冯绍峰、窦骁</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CinemaDetail',
  data () {
    return {
      isCollect: true
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    collect () {
      this.isCollect = false
    },
    iscollect () {
      this.isCollect = true
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  h3,
  p {
    margin: 5px 0;
  }
  .cinema-title {
    text-align: left;
    border-bottom: 1px solid #ebedf0;
    padding: 5px 10px;
    .cinema-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cinema-info-right {
        display: flex;
        justify-content: space-between;
        width: 70px;
        img {
          width: 27px;
          height: 27px;
        }
        text-align: right;
      }
    }
  }
  .movieShow {
    height: 130px;
    background: rgba(0, 0, 0, 0.7);
  }
  .movieinfo {
    text-align: center;
  }
}
</style>