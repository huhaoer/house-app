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
          component: () => import('../views/Home.vue')
        },
        {
          path: 'rent',
          name: 'rent',
          component: () => import('../views/Rent.vue')
        },
        {
          path: 'houseDetail:id',//动态路由
          name: 'houseDetail',
          component: () => import('../views/HouseDetail.vue')
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
      redirect: '/personal/myInformation',
      meta: {login: true},//路由元信息,必须登录才能访问
      component: () => import('../views/Personal.vue'),
      children: [
        {
          path: 'myInformation',
          name: 'myInformation',
          component: () => import('../views/MyInformation.vue')
        },
        {
          path: 'myAccount',
          name: 'myAccount',
          component: () => import('../views/MyAccount.vue')
        },
        {
          path: 'myOrder',
          name: 'myOrder',
          component: () => import('../views/MyOrder.vue')
        },
        {
          path: 'myCollect',
          name: 'myCollect',
          component: () => import('../views/MyCollect.vue')
        },
        {
          path: 'myBook',
          name: 'myBook',
          component: () => import('../views/MyBook.vue')
        },
      ]
    },
    {
      path : '/notFound',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
      
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
