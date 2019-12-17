<template>
  <div class="houseDetail">
    <div class="houseDetail-wrap">
      <div class="houseDetail-left">
        <img src="./../assets/yezhu.jpg" alt="">
      </div>
      <div class="houseDetail-right">
        <p>自如整租·通惠家园·2室1厅</p>
        <p>￥999 /月（季付价）</p>
        <p><span>限时优惠</span> 领优惠签约减2222元</p>
        <p><span>信用免押</span> 信用免押</p>
        <p><span>海燕计划</span> 毕业生租房月付/0押金/送搬家券</p>
        <p><span>惠蕾计划</span> 在校生专属，押金立减50%</p>
        <p><span>入住礼包</span> 领千元礼包，助力新生活</p>
        <p><span>位置</span> 小区距四惠东站步行约376米</p>
        <p><span>楼层</span> 2/7</p>
        <p><span>电梯</span> 无</p>
        <p><span>年代</span> 2001年建成</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.houseDetail{
  width: 100%;
  .houseDetail-wrap{
    width: 80%;
    // background-color: red;
    margin: 0 auto;
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    .houseDetail-left{
      img{
        width: 764px;
        height: 573px;
      }
    }
    .houseDetail-right{
      width: 300px;
      // background-color: blue;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      p{
        margin-bottom: 20px;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.4);
        &:nth-of-type(1){
          font-size: 24px;
          color: #000;
          font-weight: bold;
          margin-top: 20px;
        }
        &:nth-of-type(2){
          font-size: 24px;
          color: #ff961e;
        }
        span{
          color: #000;
          font-size: 15px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>