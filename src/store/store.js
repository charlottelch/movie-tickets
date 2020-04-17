import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './action.js'

Vue.use(Vuex)

const state={
  userInfo:null,
  token:false
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
