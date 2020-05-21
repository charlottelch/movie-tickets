<template>
  <div class="main-con">
    <nav-title-fixed></nav-title-fixed>
    <div class="performer">
      <div class="basic-info">
        <div class="basic-info-in">
          <div class="basic-info-text">
            <h3>{{performerInfo.performerName}}</h3>
            <p>{{performerInfo.birthday}}</p>
            <p>{{performerInfo.householdRegister}}</p>
            <p>{{performerInfo.occupation}}</p>
          </div>
          <div>
            <img :src="`${performerInfo.image}`" alt />
          </div>
        </div>
      </div>
      <div class="introduction">
        <h3>影人简介</h3>
        <p>{{performerInfo.introduction}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTitleFixed from '@/components/navTitleFixed'
export default {
  name: 'Performer',
  components: {
    NavTitleFixed
  },
  data () {
    return {
      value: '',
      performer: [],
      performerInfo:[]
    }
  },
  mounted () {
    this.performer = JSON.parse(localStorage.getItem('performer'))
    console.log(this.performer)
    this.getPerformerData()
  },
  methods: {
    getPerformerData() {
      this.$axios.post("/getPerformerData",{
        performerId:this.performer.performerId,
        // performerId:this.performer.performerId
      }).then((res)=>{
        if(res.data.code == 200){
          console.log(res.data.data)
          this.performerInfo = res.data.data[0]
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.main-con {
  h3,p{
    margin: 8px 0;
  }
  .performer {
    .basic-info {
      // width: 100%;
      height: 220px;
      padding: 0 10px;
      background: rgb(48, 47, 47);
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      color: white;
      .basic-info-in {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        .basic-info-text{
          margin-right: 10px;
        }
        div {
          border-radius: 4px;
          overflow: hidden;
          img {
            width: 100px;
          }
        }
      }
    }
    .introduction {
      padding: 0 10px;
    }
  }
}
</style>