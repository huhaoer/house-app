import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentLoginUser: {},//当前登录的用户数据保存
    nowHouseId: '',//当前选择房源的id
  },
  mutations: {
    // 设置当前登录用户的所有信息
    setCurrentLoginUser(state,obj) {
      state.currentLoginUser = obj
    },
    // 设置当前选择房源的id
    setNowHouseId(state,id) {
      state.nowHouseId = id
    }
  },
  actions: {
  },
  modules: {
  }
})
