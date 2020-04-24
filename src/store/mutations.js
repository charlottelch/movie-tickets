import { GET_USERINFO } from './mutations-type'
import { CLEAR_USERINFO } from './mutations-type'
export default {
  [GET_USERINFO] (state, data) {
    // 变更状态，data为前端传过来的值
    state.token = true //登录成功后token变为true
    state.userInfo = data
  },
  [CLEAR_USERINFO] (state) {
    state.token = false //登录成功后token变为true
    state.userInfo = {}
  }

}
