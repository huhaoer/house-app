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
const butlerAjax = Axios.create({
  baseURL: URLS.butlerBaseURL,
  method: 'get'
})

export default {
  /**
   *  关于用户查询的所有接口
   */
  // 1.查询用户信息
  FindUserInfo(userinfo) {//传递用户对象
    return userAjax.get(URLS.FindUserInfo, {
      params: {
        userinfo,
      }
    })
  },

  // 2.用户注册 添加用户
  AddUserInfo(userInfo) {
    return userAjax.get(URLS.AddUserInfo, {
      params: {
        userInfo,
      }
    })
  },

  // 3.用户修改更新自己的信息
  UpdateUserInfo(userInfo) {
    return userAjax.get(URLS.UpdateUserInfo, {
      params: {
        userInfo,
      }
    })
  },

  /**
   * 关于房源信息的所有接口
   */

  // 1.获取房源信息
  UserQueryBuildList() {
    return houseAjax.get(URLS.UserQueryBuildList)
  },

  // 根据房源id查看具体信息
  UserQueryDetails(id) {
    return houseAjax.get(URLS.UserQueryDetails, {
      params: {
        BuildId: id
      }

    })
  },

  /**
   * 关于管家信息的所有接口
   */

  // 1.根据管家id查询管家信息
  GetButlerInfo(ButlerId) {
    return butlerAjax.get(URLS.GetButlerInfo, {
      params: {
        ButlerId,
      }
    })
  }
}