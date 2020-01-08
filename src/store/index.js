import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentLoginUser: {},//当前登录的用户数据保存
    needPay: [],//要过期的账单
  },
  mutations: {
    // 设置当前登录用户的所有信息
    setCurrentLoginUser(state,obj) {
      state.currentLoginUser = obj
    },
    // 设置要过期的账单
    setNeedPay(state,needPay) {
      state.needPay = needPay
    },

  },
  actions: {
  },
  modules: {
  }
})
