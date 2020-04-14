<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <van-cell-group>
      <van-field v-model="tel" type="tel" placeholder="请输入手机号"/>
      <van-field v-model="password" type="password" placeholder="请输入密码"/>
      <van-button type="primary" size="large" @click="login">登录</van-button>
    </van-cell-group>
    <span @click="toRegist">没有账号去注册</span>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'Login',
  data () {
    return {
      title: '登录',
      tel: '',
      sms: '',
      password: '',
      confirmPassword: ''
    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toRegist () {
      this.$router.push('/Regist')
    },
    login () {
      this.$axios.post("http://localhost:8080/login", {
        phone:this.tel,
        password:this.password
      }).then((res) => {
        console.log(res.data)
        if(res.data.code == 200){
          console.log(res.data.msg)
        }else if(res.data.code == 201){
          console.log(res.data.msg)
        }else if(res.data.code == 202){
          console.log(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>