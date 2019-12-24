<template>
  <div class="alipay">

  </div>
</template>

<script>
import api from "../api/index";
export default {
  data() {
    return {
      
    };
  },

  mounted() {
    api
      .Alipay({
        out_trade_no: this.$route.params.AccountId,
        total_amount: this.$route.params.AccountPay,
        subject: this.$route.params.AccountDate,
      })
      .then(res => {
        console.log(res)
        this.formData = res.data; //返回的form表单的页面
        const div = document.createElement('div') // 创建div
        div.innerHTML = res.data // 将返回的form 放入div
        document.body.appendChild(div)
        document.forms[0].submit()
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>