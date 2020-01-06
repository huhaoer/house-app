<template>
  <div id="app">
    <!-- 中间显示路由跳转 -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  mounted() {
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
    localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
    })
    
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(localStorage.getItem("messageStore"))))

  }
};
</script>

<style lang="less">
.exactActive{
  color: #F56C6C;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  html,
  body {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  body::-webkit-scrollbar { width: 0 !important }
}
</style>
