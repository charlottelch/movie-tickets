<template>
  <div class="main-con">
    <div class="search-top">
      <div class="location" @click="toCity">
        <p>成都</p>
        <i class="arrow-bottom"></i>
      </div>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" input-align="center" />
    </div>
    <!-- <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>-->
    <van-swipe class="my-swipe" :autoplay="30000" indicator-color="white">
      <van-swipe-item>
        <img src="../../assets/timg (1).jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="popular">
      <div class="popular-title">
        <h3>热播电影</h3>
        <p>
          <span>热播榜</span>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="sortMenu clearfix">
        <ul class="sortMenu-ul">
          <li class="cell" v-for="item in 6">
            <img src="../../assets/头像.jpg" alt />
            <h4>受益人</h4>
            <p>大鹏与柳岩婚姻骗局</p>
            <!-- <a href>{{item.sortname}}</a> -->
          </li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer"
export default {
  components: {
    Footer
  },
  name: 'HomePage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: "",
      images: [
        '../../assets/timg (1).jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583386396439&di=c2d1fa0fbd6f490431098b870c93cbdc&imgtype=0&src=http%3A%2F%2Fp15.qhimg.com%2Fbdr%2F740__%2Fd%2F_open360%2Fmovie0123%2F19.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583386396439&di=c2d1fa0fbd6f490431098b870c93cbdc&imgtype=0&src=http%3A%2F%2Fp15.qhimg.com%2Fbdr%2F740__%2Fd%2F_open360%2Fmovie0123%2F19.jpg'
      ],
      subitemsExpanded: false
    }
  },
  mounted () {
   
  },
  methods: {
    toCity () {
      this.$router.push('/City')
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-con {
  padding: 0 10px;
  h3,
  h4,
  p {
    margin: 5px 0;
  }
  .search-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-search {
      width: 85%;
      .van-search__content {
        padding-right: 10px;
      }
    }
    .location {
      display: flex;
      align-items: center;

      .arrow-bottom {
        width: 0;
        height: 0;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 6px solid #000000;
        margin-left: 2px;
      }
    }
  }
  .van-swipe {
    height: 150px !important;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 355px;
      height: 150px;
    }
  }
  .popular {
    .popular-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }
    .sortMenu {
      width: 100%;
      background-color: #fff;
      overflow-x: scroll;
      -webkit-overflow-x: scroll;
    }
    .sortMenu::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: #fff;
    }
    .sortMenu-ul {
      min-width: 500px;
      display: flex;
      justify-content: flex-start;
    }
    .sortMenu-ul li img {
      width: 100px;
      height: 120px;
    }
    .sortMenu .cell {
      display: inline-block;
      font-size: 12px;
      margin: 0px 1em 0 0;
      width: 100px;
      // height: 140px;
      // line-height: 40px;
      text-align: center;
      position: relative;
      text-overflow: ellipsis;
      word-break: keep-all;
    }
    .sortMenu .cell.special a {
      color: #ff474c;
    }
    .sortMenu .cell.special:before {
      content: '';
      height: 2px;
      width: 100%;
      background: #ff474c;
      position: absolute;
      bottom: 0px;
    }
  }
}
</style>
