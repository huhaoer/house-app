import Vue from 'vue'
import VueRouter from 'vue-router'
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'exactActive',
  routes: [
    {
      path: '/index',
      name: 'index',
      redirect: '/index/home',
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/pageDefault/Home.vue')
        },
        {
          path: 'rent',
          name: 'rent',
          component: () => import('../views/pageDefault/Rent.vue')
        },
        {
          path: 'houseDetail/:id',//动态路由
          name: 'houseDetail',
          component: () => import('../views/pageDefault/HouseDetail.vue'),
        },
        {
          path: 'compare',//动态路由
          name: 'compare',
          component: () => import('../views/Compare.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      redirect: '/personal/myCollect',
      meta: {login: true},//路由元信息,必须登录才能访问
      component: () => import('../views/Personal.vue'),
      children: [
        {
          path: 'myInformation',
          name: 'myInformation',
          component: () => import('../views/personal/MyInformation.vue')
        },
        {
          path: 'myOrder',
          name: 'myOrder',
          component: () => import('../views/personal/MyOrder.vue')
        },
        {
          path: 'myCollect',
          name: 'myCollect',
          component: () => import('../views/personal/MyCollect.vue')
        },
        {
          path: 'myBook',
          name: 'myBook',
          component: () => import('../views/personal/MyBook.vue')
        },
        {
          path: 'outRent',
          name: 'outRent',
          component: () => import('../views/personal/OutRent.vue')
        },
        {//退租列表
          path: 'outRentList',
          name: 'outRentList',
          component: () => import('../views/personal/OutRentList.vue')
        },
      ]
    },
    {
      path : '/notFound',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
      
    },
    {
      path : '/alipay',//支付宝支付页面
      name: 'alipay',
      component: () => import('../views/Alipay.vue')
      
    },
    {
      path : '/chat',//聊天页面
      name: 'chat',
      component: () => import('../views/Chat.vue')
      
    },
    {
      path : '*',
      redirect (to) {
        if(to.path === '/'){
          return '/index'
        }else{
          return '/notFound';
        }
      }
    }
  ]
})

export default router
