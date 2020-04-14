<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <van-cell-group>
      <van-field v-model="nicknameValue" placeholder="请输入昵称" />
      <van-button type="primary" size="large">保存</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'NicknameEdit',
  data () {
    return {
      title: '昵称',
      nicknameValue: '糖糖里面是糖'
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