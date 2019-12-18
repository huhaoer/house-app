<template>
  <div class="rent">
    <!-- 条件找房部分 -->
    <div class="rent-wrap">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我要租房</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索具体内容 -->
      <div class="rent-search">
        <p class="area">
          <span>区域:</span>
          <span class="active">全部</span>
          <span>锦江区</span>
          <span>青羊区</span>
        </p>
        <p class="money">
          <span>租金:</span>
          <span class="active">全部</span>
          <span>500-700</span>
          <span>700-1000</span>
          <span>1000-1500</span>
        </p>
        <p class="mianji">
          <span>面积:</span>
          <span class="active">全部</span>
          <span>锦江区</span>
          <span>青羊区</span>
        </p>
        <p class="bedroom">
          <span>卧室:</span>
          <span class="active">全部</span>
          <span>锦江区</span>
          <span>青羊区</span>
        </p>
        <p class="kitchen">
          <span>厨房:</span>
          <span class="active">全部</span>
          <span>锦江区</span>
          <span>青羊区</span>
        </p>
        <p class="wc">
          <span>卫生间:</span>
          <span class="active">全部</span>
          <span>锦江区</span>
          <span>青羊区</span>
        </p>
      </div>
    </div>
    <!-- 查询房源信息展示 -->
    <div class="rent-show">

      <!-- 点击当前房源查看详细信息 传递当前房源的id到详情页面 -->
      <router-link tag="div" :to="{name: 'houseDetail',params:{id: item.BuildId}}" class="origin-item" v-for="(item,index) in nowHouse" :key="index">
        <img
          :src="item.BuildImage"
          alt="加载失败"
        />
        <p>{{ item.BuildName }}</p>
        <div>
          <span>{{ item.BuildLocation }}</span>
          <span>￥{{ item.BuildPrice }}元/月</span>
        </div>
      </router-link>

    </div>
    <!-- 分页器 -->
    <div class="rent-pagination">
      <el-pagination
        background
        :current-page="1"
        :page-size="pageSize"
        @current-change="change"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '../api/index'
export default {
  data() {
    return {
      allHouse: [],//保存所有的房源信息
      nowHouse: [],
      totalCount: 0,//当前请求数据的总条数
      pageSize: 6,//每一页有多少条数据
    }
  },
  mounted() {
    api.UserQueryBuildList()
      .then(res => {
        console.log(res,'房子')
        // 保存所有数据
        this.allHouse = res.data._Items
        this.totalCount = res.data._Items.length//总长度
        if (this.allHouse.length < this.pageSize) {
          this.nowHouse = this.allHouse
        }else{
          this.nowHouse = this.allHouse.slice(0,this.pageSize)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  methods: {
    change(page) {
      if(page == 1){
        this.nowHouse = this.allHouse.slice(0,this.pageSize)
      }else{
        this.nowHouse = this.allHouse.slice((page - 1) * this.pageSize,page * this.pageSize)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.rent {
  width: 100%;
  margin-top: 60px;
  background-color: rgb(233, 236, 243);
  // 租房条件部分
  .rent-wrap {
    width: 90%;
    background-color: #fff;
    margin: 0 auto;
    overflow: hidden;
    // 面包屑
    .el-breadcrumb {
      margin-top: 25px;
    }
    // 具体搜索内容部分
    .rent-search {
      padding: 40px 40px;
      box-sizing: border-box;
      .area,
      .money,
      .mianji,
      .bedroom,
      .kitchen,
      .wc {
        margin-top: 15px;
        color: #555;
        span {
          display: inline-block;
          font-size: 14px;
          text-align: center;
          margin-right: 15px;
          padding: 2px 5px;
          box-sizing: border-box;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        span.active {
          background-color: #ff961e;
          color: #fff;
        }
      }
    }
  }
  // 房源信息展示
  .rent-show {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .origin-item {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      box-sizing: border-box;
      border-bottom: 3px solid #fff;
      transition: all .5s;
      &:hover{
        border-bottom: 3px solid red;
      }
      img {
        width: 318px;
        height: 212px;
      }
      p {
        font-size: 16px;
        color: #555;
        font-weight: 700;
        text-align: center;
        white-space: nowrap; //不换行
        overflow: hidden; //超出隐藏
        text-overflow: ellipsis; //变成...
        width: 318px;
        margin-top: 8px;
      }
      div {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        span:nth-of-type(1) {
          color: #999;
          font-size: 12px;
        }
        span:nth-of-type(2) {
          color: #ff5300;
          font-size: 18px;
          i {
            font-weight: bold;
            font-size: 12px;
          }
        }
      }
    }
  }
  // 分页器
  .rent-pagination{
    width: 90%;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
</style>