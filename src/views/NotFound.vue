<template>
  <div class="notFound">
    <div class="backhome">
      <router-link tag="span" :to="{name: 'index'}">&lt;&lt;返回首页</router-link>
    </div>
    <div id="clock">
      <p class="date">404 页面走丢了。。。</p>
      <p class="time">{{ time }}</p>
      <p class="text">{{ date }}</p>
    </div>
  </div>
</template>

<script>
import timeJs from "../utils/time";
export default {
  name: "notFound",
  data() {
    return {
      time: "",
      date: ""
    };
  },

  mounted() {
    var timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
  },

  methods: {
    updateTime() {
      var week = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>

<style lang='less' scoped>
html,
body {
  height: 95%;
  width: 100%;
  background: #0f3854;
  background: -webkit-radial-gradient(center ellipse, #0a2e38 0%, #000000 70%);
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%;
  .notFound {
    .backhome {
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      span {
        cursor: pointer;
      }
    }
    #clock {
      font-family: "Share Tech Mono", monospace;
      color: #ffffff;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      color: #daf6ff;
      text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
      p {
        margin: 0;
        padding: 0;
      }
      .time {
        letter-spacing: 0.05em;
        font-size: 60px;
        padding: 5px 0;
      }
      .date {
        letter-spacing: 0.1em;
        font-size: 25px;
      }
      .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
      }
    }
  }
}
</style>
