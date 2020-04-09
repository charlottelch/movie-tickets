<template>
  <div class="city">
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" input-align="center" />
    <div>
      <p>定位城市</p>
      <span>成都</span>
    </div>
    <div>
      <p>热门城市</p>
      <span>成都</span>
      <span>上海</span>
      <span>北京</span>
    </div>
    <van-index-bar>
      <van-index-anchor v-for="(item,index) in cities" :key="index" :index="item.title">
        <span class="indexWord">{{item.title}}</span>
        <van-cell
          v-for="(citem,cindex) in item.cityLetter"
          :key="cindex"
          :title="citem.name"
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
      value:'',
      indexList: [],
      cities: [],
      hotCities: []
    }
  },
  mounted () {
    // getCityList().then((res) => {
    //   if (res.code) {
    //     this.cities = res.cities
    //     this.hotCities = res.hotCities
    //   }
    // })
    this.getCityData()
  },
  methods: {
    getCityData () {
      var url = '/static/mock/city.json'
      var _this = this
      axios.get(url).then(function (result) {
        _this.cities = result.data.cities
        _this.hotCities = result.data.hotCities
        console.log(_this.hotCities)
        _this.indexList = result.data.cities
      })
    },
    onClickLeft () {
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
}
</style>