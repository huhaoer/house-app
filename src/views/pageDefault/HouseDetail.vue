<template>
  <div class="houseDetail">
    <div class="houseDetail-wrap">
      <!-- 左侧图片 -->
      <div class="houseDetail-left">
        <el-image :src="srcList[0]" alt="图片加载失败" :preview-src-list="srcList"></el-image>
        <div class="left-menu">
          <span>分享</span>
          <span
            @click="handConnect"
          >{{ isCollect && this.$store.state.currentLoginUser.UserId ? '已收藏' : '收藏' }}</span>
        </div>
      </div>
      <!-- 右侧简介 -->
      <div class="houseDetail-right">
        <p>{{ houseData.BuildName }}</p>
        <p>￥{{ houseData.BuildPrice }} /月</p>
        <p>
          <span>位置:</span>
          {{ houseData.BuildAddress }}
        </p>
        <p>
          <span>上架时间:</span>
          {{ houseData.BuildTime }}
        </p>
        <p>
          <span>租房方式:</span>
          {{ houseData.BuildType }}
        </p>
        <p>
          <span>房屋面积:</span>
          {{ houseData.BuildArea }}m²
        </p>
        <p>
          <span>客厅数量:</span>
          {{ houseData.BuildHall }}
        </p>
        <p>
          <span>房间数量:</span>
          {{ houseData.BuildRoom }}
        </p>
        <p>
          <span>厨房数量:</span>
          {{ houseData.BuildKitchen }}
        </p>
        <p>
          <span>厕所数量:</span>
          {{ houseData.BuildWc }}
        </p>
        <p>
          <span>备注信息:</span>
          {{ houseData.BuildRemake }}
        </p>
      </div>
    </div>
    <!-- 预约看房 -->
    <div class="houseDetail-subscribe">
      <!-- 左侧 -->
      <div class="subscribe-left">
        <!-- 每一项保障 -->
        <div class="left-item">
          <p>环保装修，密闭检测出租</p>
          <p>仅友家整租房源</p>
        </div>
        <!-- 每一项保障 -->
        <div class="left-item">
          <p>签约三天不满意，无理由换租</p>
          <p>转租、换租、续租、直租</p>
        </div>
        <!-- 每一项保障 -->
        <div class="left-item">
          <p>漏水保固，补偿日租金</p>
          <p>仅适用于友家、整租、直租和精选房源</p>
        </div>
        <!-- 每一项保障 -->
        <div class="left-item">
          <p>退租费用，三个工作日到账</p>
          <p>适用于所有房源</p>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="subscribe-right">
        <div
          class="right-book"
          @click="handBook"
          v-if="!this.$store.state.currentLoginUser.UserId || !isBook"
        >预约看房</div>
        <div class="right-book" v-else style="background: #ccc">预约看房</div>
        <div class="right-save">
          房源已被收藏
          <span>{{ houseData.BuildCollect }}</span>次
        </div>
        <div class="right-butler">
          <div class="butler-name">
            <i class="el-icon-chat-dot-round" @click="chatToBulter(butlerData.ButlerNumber)"></i>
            管家:{{ butlerData.ButlerName }}
          </div>
          <div class="butler-phone">电话:{{ butlerData.ButlerNumber }}</div>
        </div>
      </div>
    </div>
    <!-- 地图界面 -->
    <div class="houseDetail-map">
      <el-input v-model="addressKeyword" placeholder="请输入地址来直接查找相关位置"></el-input>
      <!-- 给地图加点击事件getLocationPoint，点击地图获取位置相关的信息，经纬度啥的 -->
      <!-- scroll-wheel-zoom：是否可以用鼠标滚轮控制地图缩放，zoom是视图比例 -->
      <baidu-map
        class="bmView"
        :scroll-wheel-zoom="true"
        :center="center"
        :zoom="zoom"
        :dragging="true"
        @click="getLocationPoint"
        @ready="handler"
      >
        <bm-view style="width: 100%; height:500px; flex: 1"></bm-view>

        <!-- 地理位置的搜索功能 -->
        <bm-local-search
          :keyword="addressKeyword"
          :auto-viewport="true"
          style="display: none"
          :location="location"
        ></bm-local-search>

        <!-- 添加一个小红点的，并将当前的经纬度写入数据中 -->
        <bm-marker :position="{lng:center.lng, lat: center.lat}"></bm-marker>
      </baidu-map>
    </div>
    <!-- 相似房源 -->
    <div class="houseDetail-alike">
      <div class="alike-title">联系过本房的人都在看~</div>
      <div class="alike-house" v-if="showDetailData.length > 0">
        <el-card
          :body-style="{ padding: '0px' }"
          v-for="(item,index) in showDetailData"
          :key="index"
        >
          <router-link
            tag="div"
            :to="{name: 'houseDetail',params:{id: item.data._Items[0].BuildId}}"
            class="link-img"
          >
            <img :src="item.data._Items[0].BuildImage" class="image" />
          </router-link>
          <div style="padding: 14px;" class="mes-box">
            <div class="bottom clearfix">
              <span>{{item.data._Items[0].BuildName}}</span>
              <span>{{item.data._Items[0].BuildLocation}}</span>
            </div>
            <div class="bottom clearfix">
              <span class="name">{{item.data._Items[0].BuildAddress}}</span>
              <span class="price">{{item.data._Items[0].BuildPrice}}￥</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="alike-house-no" v-else>
        <div class="no-title">暂无房源,敬请期待...</div>
        <div class="no-img">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578483929608&di=6e797a3d1bff63fc0402cf1d5c6fa083&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190531%2F11602021802f40abae765b090b0a0397.gif"
            alt
          />
        </div>
      </div>
    </div>
    <!-- 附近房源 -->
    <div class="houseDetail-recently">
      <div class="recently-title">查看附近相似房源~</div>
      <div class="recently-house" v-if="recentlyData.length > 0">
        <el-card
          :body-style="{ padding: '0px' }"
          v-for="(item,index) in recentlyData"
          :key="index"
        >
          <router-link
            tag="div"
            :to="{name: 'houseDetail',params:{id: item.BuildId}}"
            class="link-img"
          >
            <img :src="item.BuildImage.split(',')[0]" class="image" />
          </router-link>
          <div style="padding: 14px;" class="mes-box">
            <div class="bottom clearfix">
              <span>{{item.BuildName}}</span>
              <span>{{item.BuildLocation ? item.BuildLocation : "未定义" }}</span>
            </div>
            <div class="bottom clearfix">
              <span class="name">{{item.BuildAddress ? item.BuildAddress : "未定义"}}</span>
              <span class="price">{{item.BuildPrice}}￥</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="recently-house-no" v-else>
        <div class="no-title">暂无房源,敬请期待...</div>
        <div class="no-img">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578483929608&di=6e797a3d1bff63fc0402cf1d5c6fa083&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190531%2F11602021802f40abae765b090b0a0397.gif"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
import { async } from "q";
export default {
  data() {
    return {
      houseData: {}, //根据点击进来的id获取的房源详细信息
      butlerData: {}, //根据管家id获取管家的详细信息
      isCollect: false, //是否被收藏,默认为false
      isBook: false, //判断是否被预约过
      srcList: [], //预览列表
      alikeDetailData: [], //相似房源的详细信息
      showDetailData: [], //相似房源展示信息
      recentlyData: [], //附近房源列表
      // 地图相关数据
      center: { lng: 104.07, lat: 30.67 },
      location: "成都市",
      zoom: 16,
      addressKeyword: "",
      baidumapSwitch: false
    };
  },
  // 监听路由变化
  beforeRouteUpdate(to, from, next) {
    let params = to.params.id; //参数
    let hf = "http://192.168.3.31:8080/index/houseDetail/";

    location.href = hf + params;
  },
  methods: {
    //  beforeRouteLeave(to, from, next) {
    //    console.log(to,'来自于')
    //    ntxt()
    //  },
    // 1.点击收藏或者取消收藏
    handConnect() {
      const UserId = this.$store.state.currentLoginUser.UserId;
      const BuildId = this.houseData.BuildId;

      if (UserId) {
        //用户已经登录
        if (this.isCollect) {
          // 已经是收藏状态 再次点击则取消收藏
          api
            .DeleteCollect({ UserId, BuildId })
            .then(res => {
              if (res.data == "取消成功") {
                this.isCollect = false; //已经被收藏,再次点击取消
                this.$message({
                  message: "取消收藏成功,欢迎下次查看",
                  type: "success",
                  duration: "1500",
                  center: true,
                  offset: 60
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          api
            .AddCollect({ UserId, BuildId })
            .then(res => {
              if (res.data == "收藏成功") {
                this.isCollect = true;
                this.$message({
                  message: "收藏成功,可进入个人中心点击我的收藏查看",
                  type: "success",
                  duration: "1500",
                  center: true,
                  offset: 60
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        //用户未登录
        this.$confirm("还未登录,是否跳转到登录页面?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(_ => {
            this.$router.push("/login");
          })
          .catch(_ => {
            return;
          });
      }
    },

    // 2.点击预约
    handBook() {
      if (this.$store.state.currentLoginUser.UserId) {
        //用户已经登录
        if (!this.isBook) {
          // 没有预约过才能进行下面操作
          this.$prompt("请选择日期", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputType: "date",
            inputErrorMessage: "日期错误,请重新填写",
            closeOnClickModal: false,
            inputErrorMessage: "邮箱格式不正确"
          })
            .then(({ value }) => {
              if (!value) {
                this.$message({
                  type: "error",
                  message: "请选择正确的日期"
                });
              }
              const year = new Date().getFullYear(); //年
              const month = new Date().getMonth() + 1; //月
              const day = new Date().getDate(); //日
              const choiceYear = parseInt(value.split("-")[0]); //用户选择年份
              const choiceMonth = parseInt(value.split("-")[1]); //用户选择月份
              const choiceDay = parseInt(value.split("-")[2]); //用户选择日

              // 日期错误
              if (
                !value ||
                choiceYear < year ||
                (choiceYear == year && choiceMonth < month) ||
                (choiceYear == year && choiceMonth == month && choiceDay < day)
              ) {
                this.$message({
                  type: "error",
                  message: "请选择正确的日期"
                });
              } else {
                const UserId = this.$store.state.currentLoginUser.UserId;
                const BuildId = this.houseData.BuildId;
                const ButlerId = this.butlerData.ButlerId;
                const BookTime = value;
                const BookState = "请求预约";
                /**
                 * UserId
                 * BuildId
                 * ButlerId
                 * BookTime
                 * BoolState
                 */
                api
                  .AddBook({ UserId, BuildId, ButlerId, BookTime, BookState })
                  .then(res => {
                    console.log(res, "预约信息");
                    if (res.data == "预约成功") {
                      this.isBook = true; //按钮
                      this.$message({
                        message: "预约成功",
                        type: "success",
                        duration: "2000",
                        center: true,
                        offset: 60
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            })
            .catch(() => {
              return;
            });
        } else {
          // 已经预约 直接返回
          return;
        }
      } else {
        //用户未登录
        this.$confirm("还未登录,是否跳转到登录页面?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(_ => {
            this.$router.push("/login");
          })
          .catch(_ => {
            return;
          });
      }
    },

    //   3.点击获取经纬度
    getLocationPoint(e) {
      this.lng = e.point.lng; //经度
      this.lat = e.point.lat; //纬度
      /* 创建地址解析器的实例 */
      let geoCoder = new BMap.Geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.addressKeyword, point => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });
      /* 利用坐标获取地址的详细信息 */
      geocoder.getLocation(e.point, res => {
        console.log(res);
      });
    },
    //百度地图初始化（这个一定要！否则地图回加载不出来）
    handler({ BMap, map }) {},

    // 4.点击和管家聊天
    chatToBulter(number) {
      if (this.$store.state.currentLoginUser.UserId) {
        //登录状态
        this.$router.push({ name: "chat", params: { number: number } });
      } else {
        this.$confirm("还未登录,是否跳转到登录页面?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(_ => {
            this.$router.push("/login");
          })
          .catch(_ => {
            return;
          });
      }
    }
  },
  computed: {
    getRecent() {
      const that = this;
      return function (zuobiao) {
        api.BuildNearby(zuobiao)
          .then(res => {
            console.log(res,'坐标++++++++++++')
            that.recentlyData = res.data;//附近房源列表
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },

  mounted() {
    // 根据房源id查看房源具体信息  动态路由传递房源id
    const buildId = this.$route.params.id;
    const that = this;
    //请求详细数据
    api
      .UserQueryDetails(buildId)
      .then(res => {
        this.houseData = res.data._Items[0];
        // 根据请求回来的坐标查询附近的房源
        this.houseData.BuildRemake && this.getRecent(this.houseData.BuildRemake)

        if (this.houseData.BuildRemake == null) {
        } else {
          // 填写经纬度
          this.center.lng = this.houseData.BuildRemake.split(",")[0];
          this.center.lat = this.houseData.BuildRemake.split(",")[1];
        }
        // promise.all数组
        const proArr = [
          api.IsCollect({
            UserId: this.$store.state.currentLoginUser.UserId,
            BuildId: this.houseData.BuildId
          }),
          api.GetButlerInfoByButlerId(this.houseData.ButlerId),
          api.IsBook({
            UserId: this.$store.state.currentLoginUser.UserId,
            BuildId: this.houseData.BuildId
          }),
          api.GetImg(buildId),
          api.RecommendAlike(buildId)
        ];

        Promise.all(proArr)
          .then(res => {
            // 1.请求房源信息成功后  根据用户id和房源id查看房源是否被收藏
            if (res[0].data === "true") {
              that.isCollect = true; //标记已收藏
            }

            // 2.请求房源信息成功后  根据管家id查看管家具体信息
            that.butlerData = res[1].data;

            // 3.判断是否预约看房
            if (res[2].data == "true") {
              that.isBook = true; //已经预约过
            }

            // 4.请求多个图片
            that.srcList = res[3].data;
            that.loadImg = false;

            // 5.查看相似房源
            that.alikeDetailData = res[4].data; //相似房源的id数组
            return that.alikeDetailData;
          })
          .then(res => {
            const detailArr = [];
            if (res.length > 0) {
              for (let i = 0; i < res.length; i++) {
                detailArr.push(api.UserQueryDetails(res[i]));
              }
              return detailArr;
            }
          })
          .then(res => {
            res.length > 0 &&
              Promise.all(res).then(res => {
                that.showDetailData = res.splice(0, 4); //每一个房源的详细信息
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });


  }
};
</script>

<style lang='less' scoped>
.houseDetail {
  width: 100%;
  // 房源信息
  .houseDetail-wrap {
    width: 80%;
    margin: 0 auto;
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    .houseDetail-left {
      width: 764px;
      height: 573px;
      position: relative;
      img {
        width: 764px;
        height: 573px;
      }
      .left-menu {
        position: absolute;
        top: 30px;
        right: 70px;
        span {
          user-select: none;
          display: inline-block;
          width: 70px;
          height: 30px;
          border: none;
          color: #fff;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.5);
          text-align: center;
          line-height: 30px;
          &:nth-of-type(1) {
            margin-right: 20px;
          }
        }
      }
    }
    .houseDetail-right {
      width: 267px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      p {
        margin-bottom: 20px;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.4);
        &:nth-of-type(1) {
          font-size: 24px;
          color: #000;
          font-weight: bold;
          margin-top: 20px;
        }
        &:nth-of-type(2) {
          font-size: 24px;
          color: #ff961e;
        }
        span {
          color: #000;
          font-size: 15px;
          margin-right: 20px;
        }
      }
    }
  }
  // 预约看房
  .houseDetail-subscribe {
    width: 80%;
    margin: 0 auto;
    height: 300px;
    margin-bottom: 20px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .subscribe-left {
      width: 764px;
      height: 300px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: center;
      .left-item {
        width: 50%;
        height: 25%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 30px;
        p:nth-of-type(1) {
          font-size: 16px;
          color: #000;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
          margin-top: 10px;
        }
      }
    }
    .subscribe-right {
      width: 267px;
      height: 300px;
      border: 1px solid #ccc;
      // 预定
      .right-book {
        width: 267px;
        height: 46px;
        background-color: #ff961e;
        color: #fff;
        font-size: 17px;
        border-radius: 2px;
        line-height: 46px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        &:hover {
          background-color: rgba(255, 150, 35, 0.8);
        }
      }
      // 收藏次数
      .right-save {
        color: rgba(0, 0, 0, 0.4);
        font-size: 13px;
        text-align: center;
        margin-top: 40px;
        span {
          color: #ff961e;
        }
      }
      // 管家信息
      .right-butler {
        height: 80px;
        margin-top: 40px;
        .butler-name {
          font-size: 18px;
          color: rgba(0, 0, 0, 0.85);
          text-align: center;
          letter-spacing: 1px;
          margin-bottom: 10px;
          .el-icon-chat-dot-round {
            margin-right: 15px;
            cursor: pointer;
          }
        }
        .butler-phone {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.4);
          text-align: center;
          letter-spacing: 1px;
        }
      }
    }
  }
  // 地图
  .houseDetail-map {
    width: 80%;
    margin: 0 auto;
  }
  // 相似房源
  .houseDetail-alike,.houseDetail-recently {
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    .alike-title,.recently-title {
      width: 100%;
      height: 40px;
      // background-color: #91d9ef;
      color: #666;
      line-height: 40px;
      font-size: 18px;
      font-weight: 700;
    }
    .alike-house,.recently-house {
      border: 1px solid #ccc;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .el-card {
        width: 240px;
        height: 290px;
        .image {
          width: 100%;
          height: 160px;
        }
        .mes-box {
          display: flex;
          flex-direction: column;
          .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            span {
              color: #ccc;
              font-size: 13px;
              &.name {
                display: inline-block;
                width: 100px;
              }
              &.price {
                color: #ff961e;
                font-weight: 600;
                font-style: italic;
              }
            }
          }
        }
      }
    }
    .alike-house-no,.recently-house-no {
      border: 1px solid #ccc;
      width: 100%;
      height: 300px;
      // background-color: red;
      display: flex;
      justify-content: space-around;
      .no-title {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
      }
      .no-img {
        img {
          height: 100%;
        }
      }
    }
  }
}
</style>