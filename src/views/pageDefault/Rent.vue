<template>
  <div class="rent">
    <!-- 对比房源 -->
    <div class="rent-compare">
      <div class="compare-wrap">
        <el-button
          @click="drawer = true"
          type="primary"
          style="margin-left: 16px;"
          class="open-com"
        >
          <i class="el-icon-arrow-left"></i>
          <p>点</p>
          <p>击</p>
          <p>展</p>
          <p>开</p>
        </el-button>
        <el-drawer
          class="compare-drawer"
          title="房源信息对比"
          :visible.sync="drawer"
          direction="rtl"
          :before-close="handleClose"
        >
          <div class="compare-item" v-for="(item,index) in compareList" :key="index">
            <p>{{index + 1}}.</p>
            <p>{{item.BuildName}},{{item.BuildArea}},￥{{item.BuildPrice}}元/月</p>
            <i class="el-icon-circle-close" @click="delCom(index)"></i>
          </div>
          <el-button class="compare-btn" @click="duibi" type="primary">对比</el-button>
        </el-drawer>
      </div>
    </div>
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
          <span
            v-for="(item,index) in area"
            :key="index"
            @click="handArea($event.target)"
            ref="area"
          >{{ item }}</span>
        </p>
        <p class="money">
          <span>租金:</span>
          <span
            v-for="(item,index) in money"
            :key="index"
            @click="handMoney($event.target)"
            ref="money"
          >{{ item }}</span>
        </p>
        <p class="mianji">
          <span>面积:</span>
          <span
            v-for="(item,index) in mianji"
            :key="index"
            @click="handMianji($event.target)"
            ref="mianji"
          >{{ item }}</span>
        </p>
        <p class="bedroom">
          <span>卧室:</span>
          <span
            v-for="(item,index) in bedroom"
            :key="index"
            @click="handBedroom($event.target)"
            ref="bedroom"
          >{{ item }}间</span>
        </p>
        <p class="houseType">
          <span>房屋类型:</span>
          <span
            v-for="(item,index) in houseType"
            :key="index"
            @click="handHouseType($event.target)"
            ref="houseType"
          >{{ item }}</span>
        </p>
      </div>
    </div>
    <!-- 查询房源信息展示 -->
    <div class="rent-show">
      <!-- 点击当前房源查看详细信息 传递当前房源的id到详情页面 -->
      <div
        class="origin-item"
        v-for="(item,index) in nowHouse"
        :key="index"
        v-show="nowHouse.length > 0"
        v-loading="imgLoading"
        element-loading-text="加载房源中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255,0.7)"
      >
        <router-link
          tag="div"
          :to="{name: 'houseDetail',params:{id: item.BuildId}}"
          class="link-img"
        >
          <img :src="item.BuildImage.split(',')[0]" alt="加载失败" />
        </router-link>
        <p class="p-com">{{ item.BuildName }}<span ref="spanBtn" @click="handCom($event.target,item)"><i class="el-icon-shopping-cart-2"></i>对比</span></p>
        <div>
          <span>{{ item.BuildLocation }}</span>
          <span>￥{{ item.BuildPrice }}元/月</span>
        </div>
      </div>
      <!-- 暂无房源时显示的提示 -->
      <div class="no-house" v-show="nowHouse.length == 0">房源正在筹备中,请等待...</div>
    </div>
    <!-- 分页器 -->
    <div class="rent-pagination">
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="change"
        layout="prev, pager, next"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  data() {
    return {
      compareList: [],
      isCompare: false,//是否进行了对比
      drawer: false,
      imgLoading: true,
      allHouse: [], //保存所有的房源信息
      nowHouse: [],
      totalCount: 0, //当前请求数据的总条数
      currentPage: 1, //当前展示的页数
      pageSize: 6, //每一页有多少条数据
      loading: true,
      area: [
        "全部",
        "锦江区",
        "青羊区",
        "武侯区",
        "金牛区",
        "高新区",
        "双流区",
        "天府新区",
        "成华区"
      ], //查询区域列表
      money: [
        "全部",
        "1-500",
        "500-1000",
        "1000-1500",
        "1500-2000",
        "2000-2500",
        "2500-3000"
      ], //查询价格列表
      mianji: [
        "全部",
        "10-30",
        "30-60",
        "60-90",
        "90-120",
        "120-150",
        "150-180",
        "180-210"
      ], //查询面积列表
      bedroom: ["全部", "1", "2", "3", "4", "5", "6", "7", "8"], //查询房间数量列表
      houseType: ["全部", "整租", "合租"], //查询租房方式列表
      nowArea: 0, //当前点击的查询区域  为0默认查找所有
      nowLowPrice: 0, //当前点击的价格的最低价
      nowHighPrice: 0, //当前点击的价格的最高价
      nowLowMianji: 0, //当前点击的最小面积
      nowHighMianji: 0, //当前点击的最大面积
      nowBedroom: 0, //当前点击的房间数量
      nowHouseType: 0 //当前点击的租房方式
    };
  },
  mounted() {
    // 初始化样式
    this.initStyle();

    // 获取房源信息
    if (this.$route.params.likeData) {
      //经过模糊查询跳转的页面
      this.allHouse = this.$route.params.likeData;
      this.totalCount = this.$route.params.likeData.length; //总长度
      this.dealData();
    } else {
      //自己访问的页面
      api
        .UserQueryBuildList()
        .then(res => {
          // 保存所有数据
          console.log(res, "=======================================");
          this.allHouse = res.data._Items;
          this.totalCount = res.data._Items.length; //总长度
          this.imgLoading = false;
          this.dealData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  methods: {
    // 点击对比按钮
    duibi() {
      // 判断对比数量小于2 不跳转
      if(this.compareList.length < 2) {
        this.$message({
            message: '请选择至少两个房源',
            type: 'warning',
            duration: '2000',
            center: true,
        })
        return
      }else{
        this.$router.push({name: 'compare',params:{ComList: this.compareList}})
      }
    },
    // 删除对比
    delCom(index) {
      this.compareList.splice(index,1);
    },
    // 点击对比加入到右侧
    handCom(dom,val) {
      dom.classList.add('active-com')
      this.compareList.push(val)
    },
    // 抽屉
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          console.log(this.$refs.spanBtn,'refs===============')
          // 关闭之后清除已经对比的样式
          var refArr = this.$refs.spanBtn;
          refArr.forEach(item => {
            item.classList.remove('active-com')
          })
          this.compareList = [];
          done();
        })
        .catch( _ => {
          
        });
    },
    // 处理数据
    dealData() {
      if (this.allHouse.length < this.pageSize) {
        this.nowHouse = this.allHouse;
      } else {
        this.nowHouse = this.allHouse.slice(0, this.pageSize);
      }
    },
    // 点击后筛选房源信息
    searchHouse() {
      api
        .UserQueryBuildByParam({
          Buildlocation: this.nowArea == 0 ? "" : this.nowArea,
          LowPrice: this.nowLowPrice == 0 ? "" : this.nowLowPrice,
          HighPrice: this.nowHighPrice == 0 ? "" : this.nowHighPrice,
          LowArea: this.nowLowMianji == 0 ? "" : this.nowLowMianji,
          HighArea: this.nowHighMianji == 0 ? "" : this.nowHighMianji,
          BuildRoom: this.nowBedroom == 0 ? "" : this.nowBedroom,
          BuildType: this.nowHouseType == 0 ? "" : this.nowHouseType
        })
        .then(res => {
          this.allHouse = res.data._Items;
          this.totalCount = res.data._Items.length; //总长度
          if (this.allHouse.length < this.pageSize) {
            this.nowHouse = this.allHouse;
          } else {
            this.nowHouse = this.allHouse.slice(0, this.pageSize);
          }
          this.currentPage = 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击翻页
    change(page) {
      this.currentPage = page;
      if (page == 1) {
        this.nowHouse = this.allHouse.slice(0, this.pageSize);
      } else {
        this.nowHouse = this.allHouse.slice(
          (page - 1) * this.pageSize,
          page * this.pageSize
        );
      }
    },
    // 初始化样式
    initStyle() {
      this.$refs.area[0].classList.add("active");
      this.$refs.money[0].classList.add("active");
      this.$refs.mianji[0].classList.add("active");
      this.$refs.bedroom[0].innerText = "全部";
      this.$refs.bedroom[0].classList.add("active");
      this.$refs.houseType[0].classList.add("active");
    },
    clickStyle(allDom, nowDom) {
      allDom.forEach(item => {
        item.classList.remove("active");
      });
      nowDom.classList.add("active");
    },
    // 点击查询条件
    handArea(val) {
      this.clickStyle(this.$refs.area, val);
      if (val.innerText == "全部") {
        this.nowArea = 0;
      } else {
        this.nowArea = val.innerText; //当前点击的区域选保存在data
      }
      console.log(this.nowArea);
      this.searchHouse();
    },
    handMoney(val) {
      this.clickStyle(this.$refs.money, val);
      if (val.innerText == "全部") {
        this.nowLowPrice = 0;
        this.nowHighPrice = 0;
      } else {
        this.nowLowPrice = val.innerText.split("-")[0];
        this.nowHighPrice = val.innerText.split("-")[1];
      }
      console.log(this.nowLowPrice, "===", this.nowHighPrice);
      this.searchHouse();
    },
    handMianji(val) {
      this.clickStyle(this.$refs.mianji, val);
      if (val.innerText == "全部") {
        this.nowLowMianji = 0;
        this.nowHighMianji = 0;
      } else {
        this.nowLowMianji = val.innerText.split("-")[0];
        this.nowHighMianji = val.innerText.split("-")[1];
      }
      console.log(this.nowLowMianji, "===", this.nowHighMianji);
      this.searchHouse();
    },
    handBedroom(val) {
      this.clickStyle(this.$refs.bedroom, val);
      if (val.innerText == "全部") {
        this.nowBedroom = 0;
      } else {
        this.nowBedroom = val.innerText[0];
      }
      console.log(this.nowBedroom);
      this.searchHouse();
    },
    handHouseType(val) {
      this.clickStyle(this.$refs.houseType, val);
      if (val.innerText == "全部") {
        this.nowHouseType = 0;
      } else {
        this.nowHouseType = val.innerText;
      }
      console.log(this.nowHouseType);
      this.searchHouse();
    }
  }
};
</script>

<style lang='less' scoped>
.rent {
  width: 100%;
  margin-top: 60px;
  background-color: rgb(233, 236, 243);
  position: relative;
  // 对比房源
  .rent-compare {
    width: 90%;
    margin: 0 auto;
    .compare-wrap {
      // 点击按钮
      .open-com {
        position: fixed;
        top: 100px;
        right: 0px;
        height: 150px;
        width: 40px;
        p {
          text-align: center;
        }
      }
      // 抽屉
      .compare-drawer {
        .compare-item {
          height: 25px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-bottom: 20px;
          p {
            &:nth-of-type(1){
              width: 20px;
            }
            &:nth-of-type(2){
              width: 270px;
            }
            font-size: 18px;
            color: #555;
          }
          i {
            font-size: 20px;
            color: red;
            cursor: pointer;
          }
        }
        .compare-btn{
          width: 50px;
          height: 30px;
          padding: 0;
          margin-left: 20px;
        }
      }
    }
  }
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
      .houseType {
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
      width: 30%;
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      box-sizing: border-box;
      border-bottom: 3px solid #fff;
      transition: all 0.5s;
      .p-com{
        width: 100%;
        span{
          padding: 0;
          display: inline-block;
          width: 50px;
          height: 20px;
          border: 1px solid rgba(0, 0, 0, .5);
          float: right;
          color: #fff;
          background-color: #ff5300;
          cursor: pointer;
          &.active-com{
            background-color: rgba(0, 0, 0, .5);
            color: #fff;
          }
        }
      }
      &:hover {
        border-bottom: 3px solid red;
      }
      .link-img {
        width: 100%;
        img {
          width: 100%;
          height: 212px;
        }
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
    // 暂无房源样式
    .no-house {
      width: 100%;
      height: 50px;
      border: 1px solid #ccc;
      font-size: 20px;
      text-align: center;
      line-height: 50px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  // 分页器
  .rent-pagination {
    width: 90%;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
</style>