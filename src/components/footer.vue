<template>
  <div class="footer">
    <!-- <img src="./assets/logo.png">  -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activeH : icon.inactiveH" />
      </van-tabbar-item>
      <van-tabbar-item to="/Tickets">
        <span>购票</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activeM : icon.inactiveM" />
      </van-tabbar-item>
      <van-tabbar-item to="/Community">
        <span>社区</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activeC : icon.inactiveC" />
      </van-tabbar-item>
      <van-tabbar-item to="/PersonalCenter">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activeP : icon.inactiveP" />
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="wap-home-o" to="/" >首页</van-tabbar-item> -->
      <!-- <van-tabbar-item icon="coupon-o" to="/Tickets">购票</van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o" to="/Community">社区</van-tabbar-item>
      <van-tabbar-item icon="smile-o" to="/PersonalCenter">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
import homePage from '../assets/icon/homePage.png'
import homePageA from '../assets/icon/homePage-active.png'
import movie from '../assets/icon/movie.png'
import movieA from '../assets/icon/movie-active.png'
import community from '../assets/icon/community.png'
import communityA from '../assets/icon/community-active.png'
import personalCenter from '../assets/icon/personalCenter.png'
import personalCenterA from '../assets/icon/personalCenter-active.png'

export default {
  name: 'Footer',
  data () {
    return {
      active: 0,
      icon: {
        activeH: homePageA,
        inactiveH: homePage,
        activeM: movieA,
        inactiveM: movie,
        activeC: communityA,
        inactiveC: community,
        activeP: personalCenterA,
        inactiveP: personalCenter,
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabbar-item__icon img {
    height: 25px;
}
.van-tabbar-item--active {
    color: #fe6b7e;
}
</style>