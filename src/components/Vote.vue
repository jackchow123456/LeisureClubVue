<template>
  <div class="container">
    <div class="ge">
      <a @click="vote(1)">1</a>
      <p>{{value1}} 票</p>
    </div>
    <div class="ge">
      <a @click="vote(2)">2</a>
      <p>{{value2}} 票</p>
    </div>
    <login-widget ref="login_widget"></login-widget>
  </div>
</template>

<script>
import server from "../server";
import LoginWidget from "./widget/Login";
export default {
  name: "vote",
  components: {
    LoginWidget
  },
  data() {
    return {
      value1: "loading...",
      value2: "loading...",
      path: "ws://127.0.0.1:1216",
      socket: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }

      var that = this;
      // 获取投票结果
      server
        .GetVoteResult()
        .then(function(response) {
          var $data = response.data;
          that.value1 = $data.data.count.vote_1;
          that.value2 = $data.data.count.vote_2;
        })
        .catch(function(error) {
          that.$message.error(error.response.data.message);
        });
    },
    // 投票
    vote: function($id) {
      var that = this;

      server
        .Vote($id)
        .then(function() {})
        .catch(function(error) {
          that.$message.error(error.response.data.message);
        });
    },
    open: function() {
      // console.log("socket连接成功");
      // let str = '["vote","{\\"id\\":1,\\"num\\":1}"]';
      // let data = JSON.parse(str);
      // console.log(data[0] == 'vote');
      // let result = JSON.parse(data[1]);
      // console.log(result)
    },
    error: function() {
      // console.log("连接错误");
    },
    getMessage: function(msg) {
      console.log("收到服务器信息" + msg.data);
      let index = msg.data.indexOf("[");
      if (index > 0) {
        try {
          let real_data = msg.data.substr(index);
          let data = JSON.parse(real_data);
          if (data[0] == "vote") {
            let result = JSON.parse(data[1]);
            let valueName = "value" + result.id;
            this[valueName] = result.num;
          }

          if (data[0] == "example") {
            this.$notify.info({
              title: "消息",
              message: data[1]
            });
          }
        } catch (e) {
          // 忽略报错
        }
      }
    },
    send: function(params) {
      this.socket.send(params);
    },
    close: function() {
      // console.log("socket已经关闭");
    }
  }
};
</script>
<style scoped>
.ge {
  width: 100px;
  display: inline-block;
}
</style>