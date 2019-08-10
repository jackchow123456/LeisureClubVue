<template>
  <div class="content">
    用户登录
    <el-input placeholder="账号" v-model="input1"></el-input>

    <el-input placeholder="密码" v-model="input2" show-password></el-input>
    <div class="button">
      <router-link to="/register">
        <el-button>注册</el-button>
      </router-link>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
    <router-link to="/reset">
      <el-button type="text" @click="dialogVisible = true">忘记密码?</el-button>
    </router-link>
  </div>
</template>

<script>
import common from "../common";

export default {
  data() {
    return {
      input1: "",
      input2: ""
    };
  },
  mounted() {},
  methods: {
    login: function() {
      let $data = { name: this.input1, password: this.input2 };
      common.login($data, this);
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