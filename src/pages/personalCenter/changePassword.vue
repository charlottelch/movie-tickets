<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <van-cell-group>
      <van-field v-model="tel" type="tel" placeholder="请输入手机号"/>
      <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <van-field v-model="newPassword" type="password" placeholder="请输入密码"/>
      <van-field v-model="confirmPassword" type="password" placeholder="请再次输入密码"/>
      <van-button type="primary" size="large">确认修改</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'changePassword',
  data () {
    return {
      title: '修改密码',
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
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell-group {
  padding: 0 15px;
  .van-cell {
    margin: 10px 0px;
    border: 1px solid #e7e6e6;
  }
}
</style>