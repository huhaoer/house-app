<template>
  <div class="outrentlist" 
      v-loading="loading"
    element-loading-text="加载数据中...">
    <el-table :data="rentListTableData" border style="width: 100%" stripe highlight-current-row>
      <el-table-column prop="OutRentTime" label="退租日期" width="180"></el-table-column>
      <el-table-column prop="OutRentStatus" label="退租状态" width="180"></el-table-column>
      <el-table-column prop="OutRentMoney" label="退租金额" width="180"></el-table-column>
      <el-table-column prop="OutRentMonth" label="剩余月数" width="180"></el-table-column>
      <el-table-column prop="OutRentPay" label="已付金额" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="退租房源详情" :visible.sync="dialogTableVisible" width="65%">
      <el-table :data="rentListTableDetail" stripe border highlight-current-row>
        <el-table-column label="房源图片" width="250">
          <el-image style="width: 250px;" :src="nowImage" ></el-image>
        </el-table-column>
        <el-table-column property="BuildName" label="房源名称" width="150" align="center"></el-table-column>
        <el-table-column property="BuildAddress" label="房源地址" width="150"></el-table-column>
        <el-table-column property="BuildLocation" label="房源区域" width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  methods: {
    handleClick(row) {
      this.dialogTableVisible = true;
      const OutRentId = row.OutRentId; //点击当前退租的合同Id

      // 查看退房详情
      let getDetail = async () => {
        let addOutRent = await api.FindBuildByOutRentId(OutRentId);
        console.log(addOutRent,',,,,,,,,,,,,')
        this.rentListTableDetail = addOutRent.data; //退租详情列表
        this.nowImage = this.rentListTableDetail[0].BuildImage.split(',')[0]
      };
      getDetail();
    }
  },

  data() {
    return {
      rentListTableData: [], //退租列表
      dialogTableVisible: false,
      rentListTableDetail: [], //退租列表详情
      nowImage: '',//当前查看退租房源的图片
      loading: true,//加载中
    };
  },
  mounted() {
    const UserId = this.$store.state.currentLoginUser.UserId;
    const outRentListParams = {
      UserId
    };
    const that = this;
    // 查看退房列表
    async function getRentList() {
      let rentList = await api.FindOutRentList(outRentListParams);
      that.rentListTableData = rentList.data._Items; //数据保存到data
      that.loading = false;
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