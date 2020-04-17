<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="setting">
      <div class="select" @click="show=true">
        <span>头像</span>
        <div class="select-right">
          <div class="select-picture">
            <img src="../../assets/timg.jpg" alt />
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select" @click="toNickName">
        <span>昵称</span>
        <div class="select-right">
          <span>糖糖</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select" @click="genderShow=true">
        <span>性别</span>
        <div class="select-right">
          <span>女</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select" @click="dateShow=true">
        <span>生日</span>
        <div class="select-right">
          <span>10月21日</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select">
        <span>清除缓存</span>
        <div class="select-right">
          <span>10KB</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select" @click="toChangePassword">
        <span>修改密码</span>
        <div class="select-right">
          <span></span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select" @click="toChangePassword">
        <span>隐私设置</span>
        <div class="select-right">
          <span></span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select">
        <span>关于我们</span>
        <div class="select-right">
          <span></span>
          <van-icon name="arrow" />
        </div>
      </div>
      <van-button type="primary" size="large" @click="logout">退出登录</van-button>
      <van-action-sheet v-model="show" title="标题" cancel-text="取消" @cancel="onCancel">
        <div class="content">
          <p>拍照</p>
          <p>从相册中选择</p>
        </div>
      </van-action-sheet>
      <van-action-sheet v-model="genderShow" title="标题" cancel-text="取消" @cancel="onGenderCancel">
        <div class="content">
          <p>男</p>
          <p>女</p>
        </div>
      </van-action-sheet>
      <van-action-sheet v-model="dateShow" title="标题">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirmDate"
          @cancel="cancelDate"
        />
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
export default {
  components: {
    NavTitle
  },
  name: 'Setting',
  data () {
    return {
      title: '设置',
      active: 0,
      show: false,
      genderShow: false,
      dateShow: false,
      // actions: [
      //   { name: '选项', color: '#07c160' },
      //   { loading: true },
      //   { name: '禁用选项', disabled: true }
      // ],
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toNickName () {
      this.$router.push('/PersonalCenter/Setting/NicknameEdit')
    },
    selectPortrait () {
      this.show = true
    },
    onCancel () {
      console.log(this.show)
      this.show = false
    },
    onGenderCancel () {
      console.log(this.genderShow)
      this.genderShow = false
    },
    confirmDate (value) {
      console.log(value)
      this.dateShow = false
    },
    cancelDate () {
      this.dateShow = false
    },
    toChangePassword () {
      this.$router.push('/PersonalCenter/Setting/changePassword')
    },
    logout () {
      this.$dialog.confirm({
        // title:'标题奥',
        message: '确认退出登录吗？',
        confirmButtonColor: 'red'
      }).then(() => {
        console.log('点击了确认')
      }).catch(() => {
        console.log('点击了取消')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-con {
  .setting {
    padding: 0 10px;
    .select {
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .select-right {
        display: flex;
        align-items: center;
        .select-picture {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
    .van-action-sheet__header {
      display: none !important;
    }
    .content {
      p {
        text-align: center;
      }
    }
  }
}
</style>