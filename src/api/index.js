import Axios from 'axios'
import URLS from './urls'

const userAjax = Axios.create({
  baseURL: URLS.userBaseURL,
  method: 'get'
})
const houseAjax = Axios.create({
  baseURL: URLS.houseBaseURL,
  method: 'get'
})

export default {
  // 1.查询用户信息
  FindUserInfo(userinfo) {//传递用户对象
    return userAjax.get(URLS.FindUserInfo,{
      params: {
        userinfo,
      }
    })
  },

  // 2.用户注册 添加用户
  AddUserInfo(userInfo) {
    return userAjax.get(URLS.AddUserInfo,{
      params: {
        userInfo,
      }
    })
  },

  // 3.用户修改更新自己的信息
  UpdateUserInfo(userInfo) {
    return userAjax.get(URLS.UpdateUserInfo,{
      params: {
        userInfo,
      }
    })
  },

  // 1.获取房源信息
  UserQueryBuildList() {
    return houseAjax.get(URLS.UserQueryBuildList)
  }
}