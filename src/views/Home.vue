<template>
  <div class="home">
    <!-- 头部导航菜单栏 -->
    <header class="house-header">
      <div class="header-wrap">
        <div class="header-left">
          <img src="http://webimg.ziroom.com/a8f8d17a-229b-4246-a856-6c9aee9d7323.png" alt />
        </div>
        <div class="header-middle">
          <span>首页</span>
          <span>我要租房</span>
        </div>
        <div class="header-right">
          <span>登陆</span>
          <span>|</span>
          <span>注册</span>
        </div>
      </div>
    </header>
    <!-- 背景图部分 -->
    <div class="house-bg">
      <el-carousel :interval="5000" arrow="hover" height="600px">
        <el-carousel-item v-for="item in 3" :key="item"></el-carousel-item>
      </el-carousel>
    </div>
    <!-- 中间主体部分 -->
    <div class="house-main">
      <div class="order-house">
        <div class="order-top">
          <img src="https://webimg.ziroom.com/f14b0a6b-9b21-4fb8-9e4c-9da3c4f371b8.jpg" alt="">
        </div>
        <div class="order-bottom">
          <p>租房</p>
          <p>合租/整租</p>
        </div>
      </div>
      <div class="order-house">
        <div class="order-top">
          <img src="https://webimg.ziroom.com/f14b0a6b-9b21-4fb8-9e4c-9da3c4f371b8.jpg" alt="">
        </div>
        <div class="order-bottom">
          <p>服务</p>
          <p>保洁/维修</p>
        </div>
      </div>
      <div class="order-house">
        <div class="order-top">
          <img src="https://webimg.ziroom.com/f14b0a6b-9b21-4fb8-9e4c-9da3c4f371b8.jpg" alt="">
        </div>
        <div class="order-bottom">
          <p>生活</p>
          <p>社区/品质</p>
        </div>
      </div>
      <div class="order-house">
        <div class="order-top">
          <img src="https://webimg.ziroom.com/f14b0a6b-9b21-4fb8-9e4c-9da3c4f371b8.jpg" alt="">
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
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
          <div class="origin-item">
            <img src="//image-etadmin-pub.uoko.com/images/room-lease-picture/2017-05-02/8a9fb2b5-2248-4ed8-91b9-0e5c7422bd1e.jpg?imageView2/1/w/318/h/212" alt="">
            <p>高新区 大源 【七折特价】环球中心 孵化园 天府一街旁  精装合租 免中介费</p>
            <div>
              <span>戛纳湾滨江</span>
              <span>￥580元/月</span>
            </div>
          </div>
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
    <!-- 底部信息栏部分 -->
    <footer class="house-footer">
      <div class="footer-modal">
        <p>Copyright © 2012-2018 zufang.com. All Rights Reserved </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
html,
body {
  position: relative;
  width: 100%;
  background-color: #333;
  .home {
    width: 100%;
    // 头部导航菜单部分
    .house-header {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 60px;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 99;
      .header-wrap {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .header-left {
          display: flex;
          align-items: center;
          img {
            width: 160px;
            height: 35px;
          }
        }
        .header-middle{
          color: #fff;
          line-height: 60px;
          width: 890px;
          span:hover{
            cursor: pointer;
            color: #41cbc0;
          }
          span:nth-of-type(2){
            margin-left: 40px;
          }
        }
        .header-right {
          line-height: 60px;
          color: #fff;
          font-size: 15px;
          span {
            display: inline-block;
            margin-right: 15px;
            &:nth-of-type(1),
            &:nth-of-type(3) {
              cursor: pointer;
            }
            &:nth-of-type(1):hover{
              text-decoration: underline;
            }
            &:nth-of-type(3):hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
    // 中间背景图部分
    .house-bg{
      // width: 100%;
      // height: 500px;
      // background-image: url('../assets/bg.jpg'); 
      // background-repeat: no-repeat;
      // background-position: -192px center;
      // background-size:cover;
      
      .el-carousel__item:nth-of-type(1) {
        background-image: url('../assets/bg.jpg');
        background-repeat: no-repeat;
        background-position: -240px 0px;
      }
      
      .el-carousel__item:nth-of-type(2) {
        background-image: url('../assets/bg2.jpg');
        background-repeat: no-repeat;
      }

      .el-carousel__item:nth-of-type(3) {
        background-image: url('../assets/bg.jpg');
        background-repeat: no-repeat;
        background-position: -240px 0px;
      }
    }
    // 中间主体部分
    .house-main{
      width: 90%;
      margin: 0 auto;
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      .order-house{
        position: relative;
        .order-top {
          width: 270px;
          height: 203px;
          border-radius: 3px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            transition: all 2s;
            &:hover{
              transform: scale(1.3);
            }
          }
        }
        .order-bottom{
          width: 230px;
          height: 72px;
          background-color: #fff;
          position: absolute;
          bottom: -30px;
          left: 50%;
          margin-left: -115px;
          p{
            text-align: center;
            &:nth-of-type(1){
              font-size: 24px;
              font-weight: bold;
              line-height: 40px;
            }
            &:nth-of-type(2){
              font-size: 15px;
            }
          }
        }
      }
    }
    // 精选房源部分
    .house-origin{
      width: 90%;
      margin: 0 auto;
      background-color: #fff;
      margin-top: 60px;
      overflow: hidden;
      h1{
        text-align: center;
        margin-top: 5px;
      }
      .origin-wrap{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        box-sizing: border-box;
        flex-wrap: wrap;
        .origin-item{
          display: flex;
          flex-direction: column;
          margin-top: 30px;
          img{
            width: 318px;
            height: 212px;
          }
          p{
            font-size: 16px;
            color: #555;
            font-weight: 700;
            text-align: center;
            white-space:nowrap;//不换行
            overflow: hidden;//超出隐藏
            text-overflow: ellipsis;//变成...
            width: 318px;
            margin-top: 8px;
          }
          div{
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
              i{
                font-weight: bold;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    // 选择我们的理由部分
    .house-reason{
      // border: 1px solid red;
      box-sizing: border-box;
      width: 100%;
      margin-top: 30px;
      .reason-top{
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        div{
          width: 220px;
          height: 38px;
          background-repeat: no-repeat;
        }
        .top-one{
          background-image: url('../assets/instr.png');
        }
        .top-two{
          background-image: url('../assets/instr.png');
          background-position: 0px -60px;
        }
        .top-three{
          background-image: url('../assets/instr.png');
          background-position: 0px -120px;
        }
        .top-four{
          background-image: url('../assets/instr.png');
          background-position: 0px -180px;
        }
      }
    }
    // 底部信息栏部分
    .house-footer{
      width: 100%;
      height: 200px;
      background-color: #41cbc0;
      position: relative;
      margin-top: 20px;
      .footer-modal{
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .3);
        P{
          text-align: center;
          line-height: 50px;
          color: #fff;
        }
      }
    }
  }
}
</style>
