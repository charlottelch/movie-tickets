<template>
  <div class="city">
    <van-nav-bar title="选择城市" left-arrow @click-left="onClickLeft" />
    <div class="city-location">
      <p>定位城市</p>
      <span @click="choose" :class="[isChoose==0?'selected':'']" v-if="location.addressComponent!=undefined">{{locationCity}}</span>
      <span :class="[isChoose==0?'selected':'']" v-if="$store.state.location == null">自动定位失败</span>
    </div>
    <div class="city-popular">
      <p>热门城市</p>
      <div>
        <span
          v-for="(item,index) in hotCities"
          :key="index"
          :class="[isSelected==index?'selected':'']"
          @click="toSelect(index,item)"
        >{{item.name}}</span>
      </div>
      <!-- <span>上海</span>
      <span>北京</span>-->
    </div>
    <van-index-bar>
      <van-index-anchor v-for="(item,index) in city" :key="index" :index="item.initial">
        <span class="indexWord">{{item.initial}}</span>
        <van-cell
          v-for="(citem,cindex) in item.list"
          :key="cindex"
          :title="citem.name"
          @click="toSelectIndex(citem,cindex)"
        />
      </van-index-anchor>
      <!-- <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />-->
    </van-index-bar>
  </div>
</template>

<script>
import { getCityList } from '@/api/city.js'
import axios from 'axios'
export default {
  name: 'City',
  data () {
    return {
      value: '',
      indexList: [],
      city: [],
      hotCities: [],
      locationCity: '',
      isSelected: -1,
      isChoose: -1,
      isSelectedIndex: -1,
      location:'',
      locationCity:''
    }
  },
  mounted () {
    // getCityList().then((res) => {
    //   if (res.code) {
    //     this.cities = res.cities
    //     this.hotCities = res.hotCities
    //   }
    // })
    console.log(this.$store.state.location)
    if (this.$store.state.location != null) {
      this.location = this.$store.state.location
      this.locationCity = this.location.addressComponent.city
      console.log(this.location.addressComponent.city)
    }
    this.getCityData()
  },
  methods: {
    getCityData () {
      var url = '/static/mock/city.json'
      var _this = this
      axios.get(url).then(function (result) {
        _this.city = result.data.city
        _this.hotCities = result.data.hotCities
        console.log(_this.hotCities)
        _this.indexList = result.data.city
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    toSelect (index, item) {
      this.isSelected = index
      console.log(item)
      localStorage.setItem("location", JSON.stringify(item))
      this.$router.go(-1)
    },
    choose () {
      this.isChoose = 0
      var arr={
        name:'',
        lng:'',
        lat:''
      }
      arr.name=this.location.addressComponent.city
      arr.lng=this.location.position.lng
      arr.lat=this.location.position.lat
      console.log(arr)
      localStorage.setItem("location", JSON.stringify(arr))
      this.$router.go(-1)
    },
    toSelectIndex (citem, cindex) {
      localStorage.setItem("location", JSON.stringify(citem))
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.city {
  /deep/ .van-index-bar__index--active {
    color: #2c3e50 !important;
  }
  .city-location,
  .city-popular {
    padding: 0 16px;
    span {
      background: #f7f8fa;
      padding: 8px 30px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .city-popular {
    div {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .selected {
    color: hotpink;
    border: 1px solid hotpink;
  }
}
</style>