export default {
  userBaseURL: '/userApi/',//获取用户数据需要的基础URL
  FindUserInfo: '/findUserInfo',//查询用户信息
  AddUserInfo: '/addUserInfo',//用户注册 添加一个用户
  UpdateUserInfo: '/updateUserInfo',//用户修改更新自己的信息
  Getcode: '/getcode',//获取短信验证码

  houseBaseURL: '/houseApi/',//获取房源数据需要的基础URL
  UserQueryBuildList:'/userQueryBuildList', //获取房源信息
  UserQueryDetails: '/userQueryDetails',//根据房源id查看房源具体信息
  UserQueryBuildByParam: '/userQueryBuildByParam',//根据当前传递的数据筛选房源
  GetBuildInfoByLike: '/getBuildInfoByLike',//根据导航栏的关键字模糊查询
  GetImg: '/getImg',//请求房源的多张图片
  RecommendAlike: '/recommendAlike',//查看相似房源

  butlerBaseURL: '/butlerApi',//获取管家数据需要的基础URL
  GetButlerInfoByButlerId: '/getButlerInfoByButlerId',//根据管家id查询管家信息

  orderBaseURL: '/orderApi',//获取订单数据需要的基础URL
  UserQueryOrderList: '/userQueryOrderList',//根据用户id查询用户订单
  AddOrder: '/addOrder',//用户下单
  UpdateOrderStatus: '/updateOrderStatus',//更新订单状态

  collectBaseURL: '/collectApi',//获取收藏数据需要的基础URL
  AddCollect: '/addCollect',//用户添加收藏
  IsCollect: '/isCollect',//判断是否被收藏
  DeleteCollect: '/deleteCollect',//取消收藏
  GetCollectListByUserId: '/getCollectListByUserId',//根据用户id查询自己的收藏列表

  bookBaseURL: '/bookApi',//获取预约数据需要的基础URL
  AddBook: '/addBook',//添加预约
  FindBookListFull: '/findBookListFull',//根据用户id查看已经预约的订单
  IsBook: '/isBook',//判断是否被预约过看房

  accountBaseURL: '/accountApi',//获取账单数据需要的基础URL
  FindAccountmore: '/findAccountmore',//根据用户id查询用户的账单
  OfflinePayment: '/offlinePayment',//线下支付接口
  NeedPayAccount: '/NeedPayAccount',//用户查看哪些东单要到期了

  alipayBaseURL: '/alipayApi',//支付宝 支付接口
  Alipay: '/pay',//支付

  outrentBaseURL: '/outrentApi',//退租续租 接口
  AddOutRent: '/addOutRent',//退租
  FindOutRentList: '/findOutRentList',//查看退租的列表
  FindBuildByOutRentId: '/findBuildByOutRentId',//根据退租id查看退租房源信息

  contracBaseURL: '/contractApi',//获取合同模板需要的基础URL
  FindPhotoUrl: '/findPhotoUrl',//根据合同id获取模板
  GoingContract: '/goingContract',//续租

  repairBaseURL: '/repairApi',//报修的基础URL
  AddRepair: '/addRepair',//添加报修
  IsRepair: '/isRepair',//是否已经报修过

  imgUploadBaseURL: '/imgUploadApi',//报修图片基础URL
  Upload: '/upload',//添加报修图片
}