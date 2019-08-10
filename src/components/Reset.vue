<template>
  <div class="content">
    找回密码
    <el-input placeholder="绑定邮箱" v-model="input1"></el-input>
    <div class="button">
      <el-button @click="$router.back(-1)">返回</el-button>
      <el-button type="primary" @click="sendEmail">发送</el-button>
    </div>
  </div>
</template>

<script>
import server from "../server";

export default {
  data() {
    return {
      input1: ""
    };
  },
  mounted() {},
  methods: {
    sendEmail: function() {
      let $data = { email: "1041224389@qq.com" };
      server
        .Reset($data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>

<style scoped>
.el-input {
  margin: 0.5rem 0;
}
.button {
  margin-top: 1rem;
}
.button .el-button {
  padding: 12px 5rem;
  margin: 0 10px;
}
.content {
  margin-top: -5rem;
}
</style>