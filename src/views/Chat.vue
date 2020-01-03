<template>
  <div class="chat">
    <div class="back">
      <i class="el-icon-arrow-left" @click="backPage"></i>返回房屋详情
    </div>
    <div id="console-container">
      <div id="console"></div>
      <p class="inp">
        <el-input v-model="input" placeholder="请输入内容" class="inp-chat" id="chat"></el-input>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "", //输入框内容
      number: "", //管家电话
      Console: {
        log: this.log
      },
      mess: {},
      userList: [],
      Chat: {
        socket: null,
        connect: this.connect,
        initialize: this.initialize,
        sendMessage: this.sendMessage
      },
      senderId: null,
      avator1:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578040189534&di=05246ff3056f4018cb0c975a10121e37&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201808%2F15%2F20180815112431_keyzi.thumb.700_0.jpeg",
      avator2:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3336426722,2436895000&fm=26&gp=0.jpg"
    };
  },
  methods: {
    // 返回上一页
    backPage() {
      this.$router.go(-1);
    },
    log(message) {
      var console = document.getElementById("console");
      var p = document.createElement("p");
      if (message.indexOf("/other") != -1) {
        p.classList.add("other");
        p.innerHTML = `
          <img src=${this.avator1} alt="" class="img"/>
          <span class="img-text">${message.split("/other")[1]}</span>
      `;
      } else {
        p.classList.add("self");
        p.innerHTML = `
          <span class="img-text">${message}</span>
          <img src=${this.avator2} alt="" class="img"/>
      `;
      }

      console.appendChild(p);
    },

    connect(host) {
      const that = this;
      if ("WebSocket" in window) {
        this.Chat.socket = new WebSocket(host);
      } else if ("MozWebSocket" in window) {
        this.Chat.socket = new MozWebSocket(host);
      } else {
        this.Console.log("错误");
        return;
      }

      this.Chat.socket.onopen = function() {
        that.Console.log("连接成功");
        document.getElementById("chat").onkeydown = function(event) {
          if (event.keyCode == 13) {
            that.Chat.sendMessage();
          }
        };
      };

      this.Chat.socket.onclose = function() {
        document.getElementById("chat").onkeydown = null;
        that.Console.log("连接关闭");
      };

      this.Chat.socket.onmessage = function(message) {
        that.Console.log(message.data);
      };
    },

    initialize() {
      this.senderId = this.$store.state.currentLoginUser.UserNumber;
      console.log(this.senderId)
      this.number = this.$route.params.number;
      this.Chat.connect("ws://192.168.3.27:8044/webSocket/" + this.senderId);
    },

    sendMessage() {
      var message = document.getElementById("chat").value;

      var receiverIds = this.number;

      this.userList = receiverIds;

      this.mess.userList = this.userList;

      this.mess.mess = message;

      var strmee = JSON.stringify(this.mess);

      if (message != "") {
        //发送
        this.Chat.socket.send(strmee);
        console.log(strmee)
        //清空输入框
        document.getElementById("chat").value = "";
      }
    }
  },
  mounted() {
    this.Chat.initialize();
  }
};
</script>

<style lang="less"> 
.chat {
  .back {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    i {
      cursor: pointer;
    }
  }
  width: 60%;
  border: 1px solid r#ccc;
  margin: 0 auto;
  #console-container {
    width: 100%;
    position: relative;
    #console {
      overflow: scroll;
      border: 1px solid #cccccc;
      border-right-color: #999999;
      border-bottom-color: #999999;
      overflow-y: scroll;
      height: 500px;
      padding: 5px;
      width: 100%;
      .inp {
        border: 1px solid red;
        .inp-chat{
          position: absolute;
          width: 400px;
          bottom: 0px;
          left: calc(50% - 200px);
        }
      }
      p.self {
        // border: 1px solid blue;
        padding: 5px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
        .img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .img-text {
          display: inline-block;
          height: 50px;
          padding: 5px;
          box-sizing: border-box;
          text-align: center;
          line-height: 36px;
          border-radius: 7px;
          font-size: 18px;
          color: #000;
          background-color: rgb(135, 239, 84);
          border: 1px solid #ccc;
        }
      }
      p.other {
        padding: 5px 0;
        box-sizing: border-box;
        // border: 1px solid red;
        .img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .img-text {
          display: inline-block;
          height: 50px;
          padding: 5px;
          box-sizing: border-box;
          text-align: center;
          line-height: 36px;
          border-radius: 7px;
          font-size: 18px;
          color: #000;
          background-color: rgb(135, 239, 84);
          border: 1px solid #ccc;
        }
      }
    }
  }
}
</style>



