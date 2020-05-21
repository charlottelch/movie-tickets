<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <van-cell-group>
      <van-field v-model="userInfo.userName" placeholder="请输入昵称" />
      <van-button type="primary" size="large" @click="preserveNickname">保存</van-button>
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
      userInfo: {}
    }
  },
  mounted () {
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
      console.log(this.userInfo)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    preserveNickname () {
      console.log("hhaha")
      this.$axios.post("/preserveNickname",{
        userName: this.userInfo.userName,
        userId:this.userInfo.userId
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>