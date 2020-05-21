<template>
  <div class="main-con">
    <nav-title-fixed :title="title"></nav-title-fixed>
    <div class="firstSwipe">
      <div class="title">
        <h2>离影院复工还有 ？天</h2>
        <h3>这些票房神话，每一部都值得N刷</h3>
      </div>
      <p>经历了有如长征般的4个月等待只会，影院终于将迎来复工了。消息一出，BGM《好日子》自动想起，电影鹅们流下了幸福的眼泪</p>
      <p>趁着这个喜大普奔的时刻，我们不妨一起回顾一波这几年的现象级国产好电影。这些曾经创造过票房奇迹的电影，每一部都被载入史册，每一部都值得被N刷</p>
      <div class="movie-part">
        <p class="movie-title">
          <span class="title-light">《战狼2》</span>
          <span class="title-dark">“金字塔顶端之狼”</span>
        </p>
        <p>这部在2017年夏天点燃了大家爱国之情的电影，直到下线前票房已经突破五十亿，成功超越过往卖座电影，站在了中国电影票房的金字塔最顶端</p>
        <img src="../../assets/homePage/first-swipe-img01.jpg" alt />
        <p>了解《战狼2》的影迷都知道，影片之所以有这样的好成绩，离不开三个因素：中国护照、北京吉普和贵州茅台</p>
      </div>
      <div class="movie-part">
        <p class="movie-title-blue">
          <span class="title-light">《哪吒之魔童降世》</span>
          <span class="title-dark">“国漫票房之光”</span>
        </p>
        <p></p>
        <img src="../../assets/homePage/first-swipe-img02.jpg" alt />
        <p>凭借豆瓣8.5分、最终票房46亿+、跻身中国票房纪录第三名，《哪吒之魔童降世》成了当之无愧的国漫之光。《哪吒》是目前国产三维电影中的最佳，和引起轰动的《白蛇》一样，是富足想象之下的经典魔改，在人物、情节和视听呈现上都冲着一股劲。</p>
      </div>
      <div class="movie-part">
        <p class="movie-title">
          <span class="title-light">《流浪地球》</span>
          <span class="title-dark">“国产科幻的头号玩家”</span>
        </p>
        <p>对于国产电影来说，科幻类型有如处子之地一般。拍过科幻，但多为特效五毛，剧情鸡肋，票房更是一言难尽。《流浪地球》的出现，超出平均水准地弥合了这三项短板</p>
        <img src="../../assets/homePage/first-swipe-img03.png" alt />
        <p>特效虽然有瑕疵，但拿出了诚意；“带着地球去流浪”的故事理念，不同于西方科幻电影价值观，有着东方文化的独特意义；票房则一路开挂冲进票房史前三，直接拉开国产科幻元年序幕。</p>
      </div>
      <div class="movie-part">
        <p class="movie-title-blue">
          <span class="title-light">《红海行动》</span>
          <span class="title-dark">“票房逆袭黑马”</span>
        </p>
        <p>好莱坞大片质感，138分钟有100分钟是枪战爆破，坦克追逐戏精彩，号称国产版《黑鹰坠落》，《红海行动》的硬核口碑，让它在2018年的春节档杀出一条血路。</p>
        <img src="../../assets/homePage/first-swipe-img04.jpg" alt />
        <p>在此之前，《红海行动》的档期一度被认为是“自杀式上映”--一个主打军事题材的影片，在合家欢电影云集的春节档争地盘。不入虎穴焉得虎子，最后谁都没有想到《红海行动》创造了35亿的票房，不仅逆袭赶超同时期的《美人鱼》，还杀进了内地最高电影票房前五。</p>
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
  name: 'FirstSwipe',
  data () {
    return {
      title: '',

    }
  },
  mounted () {

  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },

  }
}
</script>

<style lang="less" scoped>
.main-con {
  .firstSwipe {
    // width: 100%;
    background: #e6c99d;
    padding: 46px 10px;
    .title {
      text-align: center;
      h2 {
        display: inline-block;
        color: #151575;
        background: white;
        margin: 20px;
        padding: 5px 10px;
        position: absolute;
      }
      h3 {
        display: inline-block;
        color: white;
        background: #eaba72;
        margin: 40px 0 30px 0;
        padding: 20px 10px 5px 10px;
      }
    }
    .movie-part {
      box-shadow: rgba(63, 62, 62, 0.2) 3px 6px 7px 2px;
      border-radius: 10px;
      padding: 10px;
      margin-top: 20px;
      background: #f0d9b9;
      color: #615039;
      .movie-title {
        background-image: linear-gradient(to right, #e5a03b, #e5a03b00);
        padding: 10px;
        margin: 0;
        .title-light {
          color: white;
          font-size: 20px;
        }
        .title-dark{
          color: #294965;
        }
      }
      .movie-title-blue{
        background-image: linear-gradient(to right, #5a68a0, #5a68a000);
        padding: 10px;
        margin: 0;
        .title-light {
          color: white;
          font-size: 20px;
        }
        .title-dark{
          // color: #294965;
          color: white;

        }
      }
    }
    img {
      width: 100%;
    }
  }
}
</style>