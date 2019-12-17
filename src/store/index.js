import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentLoginUser: {},//当前登录的用户数据保存
    allHouse: [],//所有房源
  },
  mutations: {
    // 设置当前登录用户的所有信息
    setCurrentLoginUser(state,obj) {
      state.currentLoginUser = obj
    },
    // 设置当前房源
    setAllHouse(state,house ){
      state.allHouse = house
    }
  },
  actions: {
  },
  modules: {
  }
})
