<template>
  <div class="main-con">
    <van-nav-bar
      title="电影名称"
      left-text="关闭"
      right-text="发布"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="grade-score">
      <h3>7分</h3>
      <p>很不错</p>
      <van-rate v-model="value" allow-half void-icon="star" color="#ee0a24" void-color="#eee" />
    </div>
    <van-field v-model="message" rows="1" autosize type="textarea" placeholder="不要吝啬你的赞美和吐槽" />
  </div>
</template>

<script>
export default {
  name: 'Grade',
  data () {
    return {
      value: 3.5,
      message: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  padding-left: 10px;
  padding-right: 10px;
  .grade-score {
    text-align: center;
    border-bottom: 1px solid #ebedf0;
    padding-bottom: 10px;
    h3{
      color: tomato;
    }
  }
}
</style>
