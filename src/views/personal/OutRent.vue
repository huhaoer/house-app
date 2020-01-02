<template>
  <div class="outrent">
    <div class="outrent-title">退租续租</div>
    <div class="outrent-wrap">
      <el-table :data="data" style="width: 100%" stripe>
        <el-table-column label="签约日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.PayRentTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="管家姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.ButlerName }}</p>
              <p>住址: {{ scope.row.BuildName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.ButlerName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="签约房源" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.BuildName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支付总价" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.PayRentTotal }}￥</span>
          </template>
        </el-table-column>

        <el-table-column label="房源操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" :disabled="scope.row.ConStatus != '已签约'" @click="handleEdit(scope.$index, scope.row)">退租</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">续租</el-button>
            <el-button size="mini" @click="handlePrint(scope.$index, scope.row)">打印合同</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
import { async } from 'q';
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    // 点击退租
    handleEdit(index, row) {
      console.log(index, row);
      const outRent = {
        ConId: row.ConId,
        UserId: row.UserId
      }
      api.AddOutRent(outRent)
        .then(res => {
          row.ConStatus = '已退房'
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点击续租
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 点击打印合同
    handlePrint(index,row) {
      const ConId = row.ConId//合同id
      async function printHT()  {
        try {
          const res =  await api.FindPhotoUrl(ConId)
          console.log(res,'合同=======================')
        }catch(err) {
          console.log(err)
        }
      }
      printHT();
    }
  },
  mounted() {
    // 传递当前用户的id获取当前用户的订单
    api
      .UserQueryOrderList(this.$store.state.currentLoginUser.UserId)
      .then(res => {
        this.data = res.data._Items;
        console.log(this.data, "0000000000000000000000");
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='less' scoped>
.outrent {
  width: 80%;
  margin: 0 auto;
  height: 300px;
  // background-color: red;
  .outrent-title {
    width: 100%;
    height: 60px;
    font-size: 16px;
    line-height: 60px;
    color: #353535;
    font-weight: 700;
    margin-top: 30px;
  }
  .outrent-wrap {
    border: 1px solid #ccc;
  }
}
</style>