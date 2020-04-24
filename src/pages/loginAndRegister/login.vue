<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <van-cell-group>
      <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
      <van-field v-model="password" type="password" placeholder="请输入密码" />
      <van-button type="primary" size="large" @click="login">登录</van-button>
    </van-cell-group>
    <span @click="toRegister">没有账号去注册</span>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
import {GET_USERINFO} from "../../store/mutations-type"
export default {
  components: {
    NavTitle
  },
  name: 'Login',
  data () {
    return {
      title: '登录',
      data: '',
      tel: '',
      sms: '',
      password: '',
      confirmPassword: '',
      userName: ''
    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toRegister () {
      this.$router.push('/Register')
    },
    login () {
      this.$axios.post("http://localhost:8080/login", {
        phone: this.tel,
        password: this.password
      }).then((res) => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.data = res.data.data[0]
          // this.userName = this.data.userName
          // console.log(this.userName)
          // 将登录数据传值到仓库
          this.$store.commit(GET_USERINFO,this.data)
          // this.$store.dispatch('getUser',{
          //   userId:'0001'
          // }).then(()=>{

          // }) 
          this.$router.push({path:'/PersonalCenter'})
          // 路由传值
          // this.$router.push({path:'/PersonalCenter',query:{data:this.userName}})

        } else if (res.data.code == 201) {
          console.log(res.data.msg)
        } else if (res.data.code == 202) {
          console.log(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>