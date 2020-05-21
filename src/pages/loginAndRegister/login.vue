<template>
  <div class="main-con">
    <div class="top-canvas">
      <nav-title-fixed :title="title"></nav-title-fixed>
      <div class="login">
        <van-cell-group>
          <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
          <van-field v-model="password" type="password" placeholder="请输入密码" />
          <van-button color="#387eb2" size="large" @click="login">登录</van-button>
        </van-cell-group>
        <span @click="toRegister">没有账号去注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavTitleFixed from "@/components/navTitleFixed"
import { GET_USERINFO } from "../../store/mutations-type"
export default {
  components: {
    NavTitleFixed
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
      this.$axios.post("/login", {
        phone: this.tel,
        password: this.password
      }).then((res) => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.data = res.data.data[0]
          // this.userName = this.data.userName
          // console.log(this.userName)
          // 将登录数据传值到仓库
          this.$store.commit(GET_USERINFO, this.data)
          // this.$store.dispatch('getUser',{
          //   userId:'0001'
          // }).then(()=>{

          // }) 
          this.$router.push({ path: '/PersonalCenter' })
          // 路由传值
          // this.$router.push({path:'/PersonalCenter',query:{data:this.userName}})

        } else if (res.data.code == 201) {
          this.$toast(res.data.msg)
        } else if (res.data.code == 202) {
          this.$toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  width: 100%;
  // height: 700px;
  height: 100vh;
  box-sizing: border-box;
  background: url('../../assets/background-img02.jpg') no-repeat;
  background-size: cover;

  .top-canvas {
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.37);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login {
    width: 300px;
  }
  /deep/ .van-nav-bar {
    background-color: transparent;
  }
  /deep/.van-hairline--bottom::after {
    border-bottom-width: 0px;
  }
  /deep/.van-cell-group {
    background-color: transparent;
  }
  .van-cell {
    background-color: #ffffff8f;
  }
}
</style>