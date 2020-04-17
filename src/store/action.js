const state = {
  todoList: JSON.parse(localStorage.getItem('todoList')) || []
}

import {GET_USERINFO} from './mutations-type'
export default {
  getUser({commit},params){
    // params为前端传过来得值
    console.log(params)
    // this.$axios.post("http://localhost:8080/login", {
    //     phone: this.tel,
    //     password: this.password
    //   }).then((res) => {
    //       commit(GET_USERINFO,res.data)
    //   })
  }
}