export default {
  userBaseURL: '/userApi/',//获取用户数据需要的基础URL
  FindUserInfo: '/findUserInfo',//查询用户信息
  AddUserInfo: '/addUserInfo',//用户注册 添加一个用户
  UpdateUserInfo: '/updateUserInfo',//用户修改更新自己的信息

  houseBaseURL: '/houseApi/',//获取房源数据需要的基础URL
  UserQueryBuildList:'/userQueryBuildList', //获取房源信息
  UserQueryDetails: '/userQueryDetails',//根据房源id查看房源具体信息

  butlerBaseURL: '/butlerApi',//获取管家数据需要的基础URL
  GetButlerInfo: '/getButlerInfo',//根据管家id查询管家信息
}