<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <van-cell-group>
      <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
      <!-- <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>-->
      <van-field v-model="newPassword" type="password" placeholder="请输入密码" />
      <van-field v-model="confirmPassword" type="password" placeholder="请再次输入密码" />
      <van-button type="primary" size="large" @click="regist">注册</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'Regist',
  data () {
    return {
      title: '注册',
      tel: '',
      sms: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    regist () {
      // console.log("kk")
      if (this.newPassword !== this.confirmPassword) {
          console.log('两次输入密码不同')
          return
      }
      this.$axios.post("http://localhost:8080/regist", {
        phone: this.tel,
        password: this.newPassword
      }).then((res) => {
        console.log(res.data.msg)
      })
    }

  }
}
</script>

<style lang="less" scoped>
</style>