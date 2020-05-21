<template>
  <div class="main-con">
    <div class="top-canvas">
      <nav-title-fixed :title="title"></nav-title-fixed>
      <div class="login">
        <van-cell-group>
          <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
          <!-- <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
          </van-field>-->
          <van-field v-model="newPassword" type="password" placeholder="请输入密码" />
          <van-field v-model="confirmPassword" type="password" placeholder="请再次输入密码" />
          <van-button color="#387eb2" size="large" @click="register">注册</van-button>
        </van-cell-group>
        <span>密码必须包含字母和数字，密码长度不小于6位，不大于10位</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavTitleFixed from "@/components/navTitleFixed"
export default {
  components: {
    NavTitleFixed
  },
  name: 'Register',
  data () {
    return {
      title: '注册',
      tel: '',
      sms: '',
      newPassword: '',
      confirmPassword: '',
    }
  },

  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    register () {
      // console.log("kk")
      if (!this.tel) {
        this.$toast('电话号码为空')
        return
      }
      if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
        this.$toast('电话号码格式错误')
        return
      }
      var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,10}');

      if (!pwdRegex.test(this.newPassword)) {
        this.$toast("密码格式错误");
        return
      }
      if (this.newPassword !== this.confirmPassword) {
        this.$toast('两次输入密码不同')
        return
      } else if (!this.newPassword) {
        this.$toast('密码为空')
        return
      }
      this.$axios.post("/register", {
        phone: this.tel,
        password: this.newPassword
      }).then((res) => {
        if (res.data.code == 200) {
          this.$router.go(-1)
        }
        this.$toast(res.data.msg)
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