import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

var that = new Vue()

Vue.config.productionTip = false

// 路由元信息  在全局守卫使用,在router.js中要跳转的页面中配置meta : {login : true}做标识 然后在beforeEach中的to参数获取是否需要登陆标识
router.beforeEach((to, from, next) => {
  // 全局守卫 传递一个函数,里面也是这三个参数
  const needLogin = to.matched.some(item => item.meta && item.meta.login)//判断是否需要登录
  if (needLogin) {
    // 校验 判断路由元信息是否需要登陆标识
    const isLogin = window.localStorage.getItem('login') == 'true';//判断缓存中是否已经登陆
    if (isLogin) {
      // 缓存中有login信息 已经登陆,直接next执行显示页面
      next();
    } else {
      that.$confirm("还未登录,是否跳转到登录页面?",'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then( _ => {
        next('/login')
      })
      .catch( _ =>{
        next('/index')
      })
    }

  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
