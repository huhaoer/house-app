export default {
  userBaseURL: '/userApi/',//获取用户数据需要的基础URL
  FindUserInfo: '/findUserInfo',//查询用户信息
  AddUserInfo: '/addUserInfo',//用户注册 添加一个用户
  UpdateUserInfo: '/updateUserInfo',//用户修改更新自己的信息

  houseBaseURL: '/houseApi/',//获取房源数据需要的基础URL
  UserQueryBuildList:'/userQueryBuildList', //获取房源信息
  UserQueryDetails: '/userQueryDetails',//根据房源id查看房源具体信息
  UserQueryBuildByParam: '/userQueryBuildByParam',//根据当前传递的数据筛选房源

  butlerBaseURL: '/butlerApi',//获取管家数据需要的基础URL
  GetButlerInfo: '/getButlerInfo',//根据管家id查询管家信息

  orderBaseURL: '/orderApi',//获取订单数据需要的基础URL
  UserQueryOrderList: '/userQueryOrderList',//根据用户id查询用户订单

  collectBaseURL: '/collectApi',//获取收藏数据需要的基础URL
  AddCollect: '/addCollect',//用户添加收藏
  IsCollect: '/isCollect',//判断是否被收藏
  DeleteCollect: '/deleteCollect',//取消收藏

  bookBaseURL: '/bookApi',//获取预约数据需要的基础URL
  AddBook: '/addBook',//添加预约
}