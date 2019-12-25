<template>
  <div class="home">
    <!-- 背景图部分 -->
    <div class="house-bg">
      <el-carousel :interval="9000" arrow="hover" height="600px">
        <el-carousel-item v-for="item in 3" :key="item"></el-carousel-item>
      </el-carousel>
    </div>
    <!-- 中间主体部分 -->
    <div class="house-main">
      <div class="order-house">
        <div class="order-top">
          <img src="../../assets/zufang.jpg" alt />
        </div>
        <div class="order-bottom">
          <p>租房</p>
          <p>合租/整租</p>
        </div>
      </div>
      <div class="order-house">
        <div class="order-top">
          <img src="../../assets/fuwu.jpg" alt />
        </div>
        <div class="order-bottom">
          <p>服务</p>
          <p>保洁/维修</p>
        </div>
      </div>
      <div class="order-house">
        <div class="order-top">
          <img src="../../assets/shenghuo.jpg" alt />
        </div>
        <div class="order-bottom">
          <p>生活</p>
          <p>社区/品质</p>
        </div>
      </div>
      <div class="order-house">
        <div class="order-top">
          <img src="../../assets/yezhu.jpg" alt />
        </div>
        <div class="order-bottom">
          <p>业主</p>
          <p>委托/合作</p>
        </div>
      </div>
    </div>
    <!-- 精选房源部分 -->
    <div class="house-origin">
      <h1>今日精选房源</h1>
      <div class="origin-wrap">
        <router-link
          tag="div"
          :to="{name: 'houseDetail',params:{id: item.BuildId}}"
          class="origin-item"
          v-for="(item,index) in homeHouse"
          :key="index"
        >
          <img :src="item.BuildImage" alt="加载图片失败" />
          <p>{{ item.BuildName }}</p>
          <div>
            <span>{{ item.BuildLocation }}</span>
            <span>￥{{ item.BuildPrice }}元/月</span>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 选择我们理由部分 -->
    <div class="house-reason">
      <div class="reason-top">
        <div class="top-one"></div>
        <div class="top-two"></div>
        <div class="top-three"></div>
        <div class="top-four"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  data() {
    return {
      homeHouse: []
    };
  },

  mounted() {
    // 发送请求,获取首页的6条数据
    api
      .UserQueryBuildList()
      .then(res => {
        this.homeHouse = res.data._Items.slice(0, 6); //首页截取6条数据
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='less' scoped>
.home {
  // 中间背景图部分
  .house-bg {
    .el-carousel__item:nth-of-type(1) {
      background-image: url("../../assets/bg.jpg");
      background-repeat: no-repeat;
      background-position: -240px 0px;
    }

    .el-carousel__item:nth-of-type(2) {
      background-image: url("../../assets/bg3.jpg");
      background-repeat: no-repeat;
    }

    .el-carousel__item:nth-of-type(3) {
      background-image: url("../../assets/bg2.jpg");
      background-repeat: no-repeat;
      background-position: -240px 0px;
    }
  }
  // 中间主体部分
  .house-main {
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    .order-house {
      position: relative;
      .order-top {
        width: 270px;
        height: 203px;
        border-radius: 3px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          transition: all 2s;
          &:hover {
            transform: scale(1.3);
          }
        }
      }
      .order-bottom {
        width: 230px;
        height: 72px;
        background-color: #fff;
        position: absolute;
        bottom: -30px;
        left: 50%;
        margin-left: -115px;
        p {
          text-align: center;
          &:nth-of-type(1) {
            font-size: 24px;
            font-weight: bold;
            line-height: 40px;
          }
          &:nth-of-type(2) {
            font-size: 15px;
          }
        }
      }
    }
  }
  // 精选房源部分
  .house-origin {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 60px;
    overflow: hidden;
    h1 {
      text-align: center;
      margin-top: 5px;
    }
    .origin-wrap {
      display: flex;
      justify-content: space-between;
      padding: 13px;
      box-sizing: border-box;
      flex-wrap: wrap;
      .origin-item {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
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
  }
  // 选择我们的理由部分
  .house-reason {
    box-sizing: border-box;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
    .reason-top {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      div {
        width: 220px;
        height: 38px;
        background-repeat: no-repeat;
      }
      .top-one {
        background-image: url("../../assets/instr.png");
      }
      .top-two {
        background-image: url("../../assets/instr.png");
        background-position: 0px -60px;
      }
      .top-three {
        background-image: url("../../assets/instr.png");
        background-position: 0px -120px;
      }
      .top-four {
        background-image: url("../../assets/instr.png");
        background-position: 0px -180px;
      }
    }
  }
}
</style>