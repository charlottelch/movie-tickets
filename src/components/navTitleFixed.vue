<template>
  <div class="title">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" fixed />
  </div>
</template>

<script>
export default {
  name: 'NavTitleFixed',
  props: {
    title: String,
    default: '标题'
  },
  data () {
    return {
      // title: '标题'
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
/deep/ .van-nav-bar .van-icon {
  color: #000;
}
</style>