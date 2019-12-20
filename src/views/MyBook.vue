<template>
  <div class="order">
    <div class="order-wrap">
      <div class="order-header">预约列表</div>
      <div class="order-none" v-show="bookData.length == 0">暂无预约列表</div>

      <div
        class="order-item"
        v-show="bookData.length != 0"
        v-for="(item,index) in bookData"
        :key="index"
      >
        <router-link
          tag="div"
          :to="{name: 'houseDetail',params:{id: item.BuildId}}"
          class="item-left"
        >
          <img :src="item.BuildImage" alt />
        </router-link>
        <div class="item-center">
          <p>
            房源名:
            <span>{{ item.BuildName }}</span>
          </p>
          <p>
            房源价格:
            <span>{{ item.BuildPrice }}￥</span>
          </p>
          <p>
            预约状态:
            <span style="color: red">{{ item.BookState }}</span>
          </p>
          <p>
            预约时间:
            <span style="color: red">{{ item.BookTime }}</span>
          </p>
        </div>
        <div class="item-right" v-if="item.BookState == '已看房' ">
          <el-button type="primary" plain >立即下单</el-button>
        </div>
        <div class="item-right" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/index";
export default {
  data() {
    return {
      bookData: [], //预约列表
      showModal: false //是否展示选择月份提交的弹框
    };
  },

  mounted() {
    // 根据用户id查看预约列表
    api
      .FindBookListFull(this.$store.state.currentLoginUser.UserId)
      .then(res => {
        this.bookData = res.data._Items;
        console.log(res, "预约列表");
        return this.bookData
      })
      .then(res => {
        console.log(res,'返回预约列表数据')
        
      })
      
  },

  methods: {
    // 点击下单按钮进行创建订单
    handNewOrder(item) {
      this.showModal = true;
      console.log(item, "当前下单");
    },
    // open() {
    //   const BuildId = 
    //   const UserId = 
    //   const ButlerId = 
    //   const PayRentTotal = 
    //   const UserNumber = 
    //   this.$prompt("请输入租房月数", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     inputType: 'number',
    //     inputValue: 1,
    //     inputValidator(val) {
    //       if(val < 1 || val > 12) {
    //         return '月份错误'
    //       }
    //     }
    //   })
    //     .then(({ value }) => {
    //       api.AddOrder({

    //       })
    //       .then(res => {
    //         console.log(res,'新建订单')
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "取消输入"
    //       });
    //     });
    // }
  }
};
</script>

<style lang='less' scoped>
.order {
  width: 100%;
  .order-wrap {
    width: 80%;
    height: 300px;
    margin: 0 auto;
    margin-top: 30px;
    .order-header {
      width: 100%;
      height: 60px;
      color: #353535;
      font-size: 16px;
      font-weight: 700;
    }
    .order-none {
      width: 100%;
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
      box-sizing: border-box;
      text-align: center;
      font-weight: 500;
    }
    .order-item {
      width: 100%;
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .item-left {
        img {
          width: 300px;
          height: 150px;
          display: block;
        }
      }
      .item-center {
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p {
          font-size: 16px;
          color: #353535;
          span {
            color: #000;
            font-weight: bold;
            margin-left: 10px;
          }
        }
      }
      .item-right {
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .el-button {
          width: 32%;
          margin: 0;
        }
      }
    }
  }
}
</style>