<template>
  <div class="footer">
     <!-- <img src="./assets/logo.png">  -->
    <van-tabbar v-model="active" route>
       <!-- <van-tabbar-item info="3">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
      </van-tabbar-item> -->
      <van-tabbar-item icon="wap-home-o" to="/" >首页</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" to="/Tickets">购票</van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o" to="/Community">社区</van-tabbar-item>
      <van-tabbar-item icon="smile-o" to="/PersonalCenter">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      active: 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>