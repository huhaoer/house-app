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
const accountAjax = Axios.create({
  baseURL: URLS.accountBaseURL,
  method: 'get'
})
const alipayAjax = Axios.create({
  baseURL: URLS.alipayBaseURL,
  method: 'get'
})
const outrentAjax = Axios.create({
  baseURL: URLS.outrentBaseURL,
  method: 'get'
})

export default {
  /**
   * 退租续租
   */
  // 1.退租
  AddOutRent(outRent) {//outRent={"ConId":1049,"UserId":2020}
    return outrentAjax.get(URLS.AddOutRent, {
      params: {
        outRent,
      }
    })
  },
  /**
   * 支付宝支付
   */
  // 1.支付宝支付
  Alipay(payObj) {
    return alipayAjax.get(URLS.Alipay, {
      params: {
        ...payObj
      }
    })
  },

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
  // 4.获取短信验证码
  Getcode(UserNumber) {
    return userAjax.get(URLS.Getcode, {
      params: {
        UserNumber,
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
  // 4.根据导航栏关键字模糊查询
  GetBuildInfoByLike(likeObj) {
    return houseAjax.get(URLS.GetBuildInfoByLike,{
      params: {
        ...likeObj
      }
    })
  },
  // 5.查询房源多张图片
  GetImg(buildId) {
    return houseAjax.get(URLS.GetImg,{
      params: {
        buildId,
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
  // 2.用户下单
  AddOrder(orderInfo) {
    return orderAjax.get(URLS.AddOrder, {
      params: {
        orderInfo,
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
  // 4.获取用户的收藏列表
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
  // 1.用户点击添加预约
  AddBook(book) {
    return bookAjax.get(URLS.AddBook,{
      params: {
        book
      }
    })
  },
  // 2.根据用户id获取预约订单
  FindBookListFull(UserId) {
    return bookAjax.get(URLS.FindBookListFull,{
      params: {
        book: {
          UserId
        }
      }
    })
  },
  // 3.根据用户id和房源id判断是否被预约看房过
  IsBook(Book) {
    return bookAjax.get(URLS.IsBook,{
      params: {
        Book
      }
    })
  },

  /**
   * 关于账单的所有接口 
   */
  // 1.根据用户id查询账单
  FindAccountmore(accountInfo) {
    return accountAjax.get(URLS.FindAccountmore,{
      params: {
        accountInfo
      }
    })
  },
  // 2.用户线下支付接口
  OfflinePayment(accountId) {
    return accountAjax.get(URLS.OfflinePayment,{
      params: {
        accountId,
      }
    })
  },
  
}