<template>
  <div>
    <!-- <nav-title-fixed :title="title"></nav-title-fixed> -->
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" fixed/>

    <div class="list">
      <div
        class="list-part"
        v-for="(item,index) in followOrFansInfo"
        :key="index"
        @click="toFollowOrFansHomepage(item)"
      >
        <div class="list-user-img">
          <img :src="`${item.headPortrait}`" alt />
        </div>
        <div>
          <h3>{{item.userName}}</h3>
        </div>
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
  name: 'FollowAndFansList',
  data () {
    return {
      title: '',
      active: 0,
      videoList: {},
      userInfo: {},
      followOrFans: '',
      followOrFansInfo: []
    }
  },
  mounted () {
    var videoPlayList = JSON.parse(localStorage.getItem('video'))
    this.videoList = videoPlayList[videoPlayList.length - 1]
    this.followOrFans = JSON.parse(localStorage.getItem('followOrFans'))
    console.log(this.followOrFans)
    this.getUserInfo()
    
  },
  methods: {
    onClickLeft () {
      // cs
      var videoPlayList=JSON.parse(localStorage.getItem('video'))
      console.log(videoPlayList)
      videoPlayList.pop()
      console.log(videoPlayList)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      // cs
      this.$router.go(-1)
    },
    // 拿取该用户信息
    getUserInfo () {
      this.$axios.post("/getUserInfo", {
        userId: this.videoList.userId
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            this.followAndFansList = res.data.data
            this.followlist = res.data.data[0]
            this.fans = res.data.data[1]
            if (this.followOrFans == 0) {
              this.followOrFansInfo = this.followlist
            } else {
              this.followOrFansInfo = this.fans
            }
            console.log(this.followOrFansInfo)
            // console.log(this.fans)
          }
        }
      })
    },
    toFollowOrFansHomepage (item) {
      // cs
      var videoPlayList=JSON.parse(localStorage.getItem('video'))
      videoPlayList.push(item)
      localStorage.setItem('video', JSON.stringify(videoPlayList));
      // cs
      this.$router.push({ path: '/Community/PersonalHomepage'})
    }

  }
}
</script>
<style lang="less" scoped>
.list {
  margin-top: 46px;
  padding: 0 10px;
  .list-part {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .list-user-img {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  h3{
    margin-left:20px;
  }
}
</style>