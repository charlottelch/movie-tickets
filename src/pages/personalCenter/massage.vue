<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <van-tabs v-model="active">
      <van-tab title="消息">内容 1</van-tab>
      <van-tab title="通知">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'Massage',
  data () {
    return {
      title: '消息',
      active: 0
    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
</style>