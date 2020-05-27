// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import store from './store/store'
// 3D轮播
import Carousel3d from 'vue-carousel-3d';
import Vuex from 'vuex'
// md5加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import VueBetterCalendar from 'vue-better-calendar'
Vue.use(VueBetterCalendar)

Vue.use(Vuex)
Vue.use(Carousel3d);
Vue.prototype.$axios = axios
Vue.use(Vant);

Vue.config.productionTip = false
// vue登录拦截
router.beforeEach((to, from, next) => {
  console.log(to.meta.requireAuth)
  if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
    if (store.state.token) { // vuex.state判断token是否存在
      next() // 已登录
    } else {
      next({
        path: '/Login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

