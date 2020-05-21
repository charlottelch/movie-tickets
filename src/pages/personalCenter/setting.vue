<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div class="setting">
      <div class="select" @click="show=true">
        <span>头像</span>
        <div class="select-right">
          <div class="select-picture">
            <img v-if="userInfo.headPortrait!=null" :src="`${userInfo.headPortrait}`" alt />
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select" @click="toNickName">
        <span>昵称</span>
        <div class="select-right">
          <span>{{userInfo.userName}}</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select" @click="genderShow=true">
        <span>性别</span>
        <div class="select-right">
          <span>{{userInfo.gender}}</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="select" @click="dateShow=true">
        <span>生日</span>
        <div class="select-right">
          <span>{{userInfo.birthday}}</span>
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
          <van-uploader :after-read="afterReadImage" accept="image/*" :max-count="1">
            <p>从相册中选择</p>
          </van-uploader>
        </div>
      </van-action-sheet>
      <van-action-sheet v-model="genderShow" title="标题" cancel-text="取消" @cancel="onGenderCancel">
        <div class="content">
          <p @click="genderBoy">男</p>
          <p @click="genderGirl">女</p>
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
import { GET_USERINFO } from "../../store/mutations-type"
import { CLEAR_USERINFO } from "../../store/mutations-type"

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
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      userInfo: {},
      // userImage:[],
      imgFile: {},
      imageUrl: '',
    }
  },
  mounted () {
    if (this.$store.state.userInfo != null) {
      this.userInfo = this.$store.state.userInfo
      console.log(this.userInfo.headPortrait)
    }
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
    // 上传头像
    afterReadImage (file) {
      // file.status = 'uploading';
      // file.message = '上传中...';
      console.log(file)
      this.imgFile = file
      let formData = new FormData()
      formData.append('file', file.file)
      console.log(formData)
      this.$axios.post("/uploadImage", formData).then((res) => {
        if (res.data.code == 200) {
          file.message = '上传成功！';
          this.imageUrl = res.data.data.url
          console.log(this.imageUrl)
          this.$axios.post("/uploadHeadPortrait", {
            headPortrait: this.imageUrl,
            userId: this.userInfo.userId
          }).then((res) => {
            if (res.data.code == 200) {
              // console.log(res.data.code)
              this.userInfo.headPortrait = this.imageUrl
              // console.log(this.userInfo)
              // 将修改头像，重新传值到仓库
              this.$store.commit(GET_USERINFO, this.userInfo)
            }

          })
        }
      })
      // this.upload()
      // setTimeout(() => {
      //   file.status = 'failed';
      //   file.message = '上传失败';
      // }, 1000);
    },
    // 更改生日
    confirmDate (value) {
      this.dateShow = false
      value = this.date(value)
      // this.userInfo.birthday = value
      this.$axios.post("/confirmDate", {
        birthday: this.userInfo.birthday,
        userId: this.userInfo.userId
      }).then((res) => {
        if (res.data.code == 200) {
          this.userInfo.birthday = value
          this.$store.commit(GET_USERINFO, this.userInfo)
        }
      })
    },

    // 改变日期时间格式
    date (time) {
      time = new Date(time)
      time = time.getFullYear() + '-' + this.formatDate((time.getMonth() + 1)) + '-' + this.formatDate(time.getDate())
      // this.endTime = new Date(this.formInline.time[1])
      return time
    },
    // 不够10添加0的函数
    formatDate (s) {
      return s < 10 ? '0' + s : s
    },
    cancelDate () {
      this.dateShow = false
    },
    toChangePassword () {
      this.$router.push('/PersonalCenter/Setting/changePassword')
    },
    logout () {
      // this.$store.commit(CLEAR_USERINFO)
      // this.$router.push({ path: '/PersonalCenter' })
      this.$dialog.confirm({
        // title:'标题奥',
        message: '确认退出登录吗？',
        confirmButtonColor: 'red'
      }).then(() => {
        console.log('点击了确认')
        this.$store.commit(CLEAR_USERINFO)
        this.$router.push({ path: '/PersonalCenter' })
        console.log('haha')
      }).catch(() => {
        console.log('点击了取消')
      })
    },
    genderBoy () {
      // if (this.userInfo.gender == '女' || null) {
        this.$axios.post("/genderBoy", {
          // gender: this.userInfo.gender,
          userId: this.userInfo.userId
        }).then((res) => {
          if (res.data.code == 200) {
            this.userInfo.gender = '男'
            this.onGenderCancel()
            this.$store.commit(GET_USERINFO, this.userInfo)
          }
          console.log(res)
        })
      // }

    },
    genderGirl () {
      // if (this.userInfo.gender == '男' || null) {
        this.$axios.post("/genderGirl", {
          // gender: this.userInfo.gender,
          userId: this.userInfo.userId
        }).then((res) => {
          if (res.data.code == 200) {
            this.userInfo.gender = '女'
            this.onGenderCancel()
            this.$store.commit(GET_USERINFO, this.userInfo)
          }
          console.log(res)
        })
      // }

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
          img {
            width: 100%;
            height: 100%;
          }
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