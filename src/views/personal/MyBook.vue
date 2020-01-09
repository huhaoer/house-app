<template>
  <div class="order">
    <div class="order-wrap" v-loading="loading" element-loading-text="加载数据中...">
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
          <img :src="item.BuildImage.split(',')[0]" alt />
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
            <span style="color: #409EFF">{{ item.BookTime }}</span>
          </p>
        </div>
        <div class="item-right" v-if="item.BookState == '已看房' ">
          <el-button type="primary" plain @click="handNewOrder(item)" ref="orderBtn">立即下单</el-button>
        </div>
        <div class="item-right" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  data() {
    return {
      bookData: [], //预约列表
      loading: true,//加载中
    };
  },

  mounted() {
    // 根据用户id查看预约列表
    api
      .FindBookListFull(this.$store.state.currentLoginUser.UserId)
      .then(res => {
        this.bookData = res.data._Items;
        this.loading = false;
      })
      .catch(e => {
        console.log(e)
      })
  },

  methods: {
    // 点击下单按钮进行创建订单
    handNewOrder(item) {
      this.$prompt("请输入租房月数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "number",
        inputValue: 12,
        closeOnClickModal: false,
        inputValidator(val) {
          if (val < 1) {
            return "月份错误";
          }
        }
      })
        .then(({ value }) => {
          const BuildId = item.BuildId;//房源id
          const UserId = item.UserId;//用户id
          const ButlerId = item.ButlerId;//管家id
          const PayRentTotal = parseInt(item.BuildPrice) * parseInt(value);//支付总价
          console.log(PayRentTotal,'总价')
          const UserNumber = item.UserNumber;//用户电话
          const that = this;
          api
            .AddOrder({
              BuildId,
              UserId,
              ButlerId,
              PayRentTotal,
              UserNumber
            })
            .then(res => {
              console.log(res,'下单情况')
              // 重复下单
              if (res.data == "订单已生成，请不要重复下单") {
                 this.$message({
                    type: "warning",
                    message: res.data,
                    duration: '1500',
                    center: true,
                })
              }
              // 下单成功
              if (res.data == "订单生成，请尽快联系管家签约哦") {
                 this.$message({
                    type: "success",
                    message: res.data,
                    duration: '1500',
                    center: true,
                })
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          return
        });
    }
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
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .el-button {
          width: 100%;
          margin: 0;
        }
      }
    }
  }
}
</style>