import {GET_USERINFO} from './mutations-type'
export default{
  [GET_USERINFO] (state,data) {
    // 变更状态，data为前端传过来的值
    state.userInfo=data
  }

}