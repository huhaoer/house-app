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
const orderAjax = Axios.create({
  baseURL: URLS.orderBaseURL,
  method: 'get'
})
const collectAjax = Axios.create({
  baseURL: URLS.collectBaseURL,
  method: 'get'
})
const bookAjax = Axios.create({
  baseURL: URLS.bookBaseURL,
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

  // 2.根据房源id查看具体信息
  UserQueryDetails(id) {
    return houseAjax.get(URLS.UserQueryDetails, {
      params: {
        BuildId: id
      }

    })
  },
  // 3.传递数据筛选房源
  UserQueryBuildByParam(choice) {
    return houseAjax.get(URLS.UserQueryBuildByParam,{
      params: {
        ...choice
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
  },

  /**
   * 关于订单信息接口
   */

  //  1.根据用户id查询订单
  UserQueryOrderList(UserId) {
    return orderAjax.get(URLS.UserQueryOrderList, {
      params: {
        UserId,
      }
    })
  },

  /**
   * 关于用户收藏接口
   */

  //  1.用户添加收藏
  AddCollect(Collect) {
    return collectAjax.get(URLS.AddCollect, {
      params: {
        Collect,
      }
    })
  },
  // 2.判断是否被收藏
  IsCollect(Collect) {
    return collectAjax.get(URLS.IsCollect,{
      params: {
        Collect
      }
    })
  },
  // 3.取消收藏
  DeleteCollect(Collect) {
    return collectAjax.get(URLS.DeleteCollect,{
      params: {
        Collect
      }
    })
  },
  GetCollectListByUserId(UserId) {
    return collectAjax.get(URLS.GetCollectListByUserId,{
      params: {
        UserId
      }
    })
  },

  /**
   * 关于预约的所有接口
   */
  AddBook(book) {
    return bookAjax.get(URLS.AddBook,{
      params: {
        book
      }
    })
  }
  

}