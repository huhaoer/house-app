import Vue from 'vue'
import VueRouter from 'vue-router'

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
          path: 'houseDetail:id',//动态路由
          name: 'houseDetail',
          component: () => import('../views/pageDefault/HouseDetail.vue')
        }
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
