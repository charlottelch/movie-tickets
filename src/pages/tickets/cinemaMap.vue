<template>
  <div class="main-con">
    <nav-title :title="title"></nav-title>
    <div id="container"></div>
  </div>
</template>

<script>
import NavTitle from "@/components/navTitle"
import AMap from 'AMap'

export default {
  components: {
    NavTitle
  },
  name: 'CinemaMap',
  data () {
    return {
      title: '影院地图',
      active: 0,
      trafficMap: null
    }
  },
  mounted () {
    this.init()
    this.getLocation()
  },
  created () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    init () { // 创建地图
      console.log('11')
      this.trafficMap = new AMap.Map('container', {
        zoom: 12, // 级别
        center: [104.04104, 30.6265], // 中心点坐标
        viewMode: '3D'// 使用3D视图
      })
      this.trafficMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation'], () => {
        this.trafficMap.addControl(new AMap.ToolBar()) // 工具条，控制地图的缩放、平移等
        this.trafficMap.addControl(new AMap.Scale()) // 比例尺，显示当前地图中心的比例尺
        this.trafficMap.addControl(new AMap.Geolocation())
      })
    },
    getLocation () {
      const self = this
      this.trafficMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        })
        self.trafficMap.addControl(geolocation);
        // this.trafficMap.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息
          console.log('定位成功信息：', data)
          self.trafficMap.plugin(["AMap.PlaceSearch"], function () {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              type: '', // 兴趣点类别
              pageSize: 20, // 单页显示结果条数
              pageIndex: 1, // 页码
              city: "成都", // 兴趣点城市
              citylimit: true,  //是否强制限制在设置的城市内搜索
              map: self.trafficMap, // 展现结果的地图实例
              autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });

            var cpoint = [data.position.lng, data.position.lat]; //中心点坐标
            placeSearch.searchNearBy('影院', cpoint, 30000, function (status, result) {
              console.log(result)
              var arr = result.poiList.pois
              for (let i = 0; i < arr.length; i++) {
                var marker = new AMap.Marker({
                  position: new AMap.LngLat(arr[i].entr_location.lng, arr[i].entr_location.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                });

                self.trafficMap.add(marker)
              }
            });
          })
        }

        function onError (data) {
          // 定位出错
          console.log('定位失败错误：', data)
          self.getLngLatLocation()
        }
      })
    },
    getLngLatLocation () {
      this.trafficMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('通过ip获取当前城市：', result)
            //逆向地理编码
            this.trafficMap.plugin('AMap.Geocoder', function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })

              var lnglat = result.rectangle.split(';')[0].split(',')

              geocoder.getAddress(lnglat, function (status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data)
                }
              })
            })
          }
        })
      })
    }

  }
}
</script>

<style lang="less" scoped>
#container {
  // width: 200px;
  // height: 500px;
  width: 100%;
  height: calc(100vh - 46px);
  /deep/ .amap-logo img {
    display: none;
  }
  /deep/ .amap-copyright {
    visibility: hidden !important;
  }
}
</style>
