<template>
  <div class="city">
    <van-nav-bar title="选择城市" left-arrow @click-left="onClickLeft" />
    <div class="city-location">
      <p>定位城市</p>
      <span @click="choose" :class="[isChoose==0?'selected':'']">{{locationCity}}</span>
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
      isSelectedIndex: -1
    }
  },
  mounted () {
    // getCityList().then((res) => {
    //   if (res.code) {
    //     this.cities = res.cities
    //     this.hotCities = res.hotCities
    //   }
    // })
    this.locationCity = JSON.parse(localStorage.getItem("location"))

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
      localStorage.setItem("location", JSON.stringify(item.name))
      this.$router.go(-1)
    },
    choose () {
      this.isChoose = 0
      localStorage.setItem("location", JSON.stringify("成都"))
      this.$router.go(-1)
    },
    toSelectIndex (citem, cindex) {
      localStorage.setItem("location", JSON.stringify(citem.name))
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