import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',//保存用户的登录信息
  },
  mutations: {
    setUserName(state,name) {
      state.userName = name
    }
  },
  actions: {
  },
  modules: {
  }
})
