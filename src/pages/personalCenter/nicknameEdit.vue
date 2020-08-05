<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <van-cell-group>
      <van-field v-model="userInfo.userName" placeholder="请输入昵称" />

      <!-- <van-button type="primary" size="large" @click="preserveNickname">保存</van-button> -->
    </van-cell-group>
    <div class="ticket-purchase">
      <span @click="preserveNickname">保存</span>
    </div>
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
      this.$axios.post("/preserveNickname", {
        userName: this.userInfo.userName,
        userId: this.userInfo.userId
      }).then((res) => {
        this.$router.go(-1)
        this.$toast("修改成功")
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ticket-purchase {
  // position: fixed;
  // bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background: white;
  margin-top: 20px;
  span {
    display: inline-block;
    background: rgb(233, 87, 131);
    background-image: linear-gradient(to left, #ff3174, #fe756b);
    border: 0;
    width: 95%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 40px;
    color: white;
  }
}
</style>