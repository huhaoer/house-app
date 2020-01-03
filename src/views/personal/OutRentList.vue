<template>
  <div class="outrentlist">
    <el-table :data="tableData" border style="width: 100%" stripe highlight-current-row>
      <el-table-column prop="OutRentTime" label="退租日期" width="180"></el-table-column>
      <el-table-column prop="OutRentStatus" label="退租状态" width="180"></el-table-column>
      <el-table-column prop="OutRentMoney" label="退租金额" width="180"></el-table-column>
      <el-table-column prop="OutRentMonth" label="退租月数" width="180"></el-table-column>
      <el-table-column prop="OutRentPay" label="已付金额" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="退租详情" :visible.sync="dialogTableVisible">
      <el-table :data="tableData2">
        <el-table-column property="OutRentTime" label="日期" width="150"></el-table-column>
        <el-table-column property="OutRentStatus" label="姓名" width="200"></el-table-column>
        <el-table-column property="OutRentMoney" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  methods: {
    handleClick(row) {
      console.log(row);
      const conId = row.ConId;//点击当前的合同Id 
      const UserId = this.$store.state.currentLoginUser.UserId;//用户id

      async function getDetail() {
        let addOutRent = await api.AddOutRent({conId,UserId});
        console.log(addOutRent,'添加+++++++++++++++++++++')
      }
      getDetail();
      this.dialogTableVisible = true;
    }
  },

  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  mounted() {
    const UserId = this.$store.state.currentLoginUser.UserId;
    const outRentListParams = {
      UserId
    };
    const that = this;
    async function getRentList() {
      let rentList = await api.FindOutRentList(outRentListParams);
      that.tableData = rentList.data._Items; //数据保存到data
      
      console.log(rentList, "退租列表");
    }
    getRentList();
  }
};
</script>


<style lang='less' scoped>
.outrentlist {
  width: 80%;
  border: 1px solid #ccc;
  margin: 0 auto;
  margin-top: 20px;
}
</style>