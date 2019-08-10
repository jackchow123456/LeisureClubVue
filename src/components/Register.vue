<template>
  <div class="content">
    用户注册
    <div v-show="step == 1">
      <el-input placeholder="请输入你的手机号码" v-model="phone"></el-input>
      <div>
        <el-input placeholder="获取验证码" v-model="code">
          <el-button
            slot="append"
            @click="sendSms"
            :disabled="disabled"
            :loading="false"
          >{{btnTitle}}</el-button>
        </el-input>
      </div>
    </div>

    <div v-show="step == 2">
      <el-input placeholder="用户名" v-model="username"></el-input>

      <el-input placeholder="密码" v-model="password" show-password></el-input>

      <el-input placeholder="确认密码" v-model="password_confirmation" show-password></el-input>
    </div>

    <div class="button">
      <el-button @click="routerback">返回</el-button>
      <el-button type="primary" @click="register">下一步</el-button>
    </div>
  </div>
</template>

<script>
import server from "../server";
export default {
  data() {
    return {
      step: 1,
      phone: "",
      code: "",
      username: "",
      password: "",
      password_confirmation: "",
      btnTitle: "获取验证码",
      disabled: false,
      isSend: false,
      loading: false
    };
  },
  mounted() {},
  methods: {
    routerback: function() {
      this.$router.back(-1);
    },
    // 发送验证码
    sendSms: function() {
      if (this.validatePhone()) {
        this.isSend = true;
        let $data = { mobile: this.phone, scenes: "register" };
        this.btnTitle = "发送中...";
        this.loading = true;
        this.disabled = true;
        var that = this;
        server
          .SendSms($data)
          .then(function(response) {
            var $data = response.data;
            if ($data.data.success) {
              that.loading = false;
              that.$message.success("发送验证码成功");
              that.validateBtn();
            }
          })
          .catch(function(error) {
            that.loading = false;
            that.disabled = false;
            that.btnTitle = "获取验证码";
            that.$message.error(error.response.data.message);
          });
      }
    },

    // 注册步骤
    register: function() {
      if (!this.isSend) {
        this.$message.error("请先获取验证码");
        return;
      }

      var that = this;
      if (this.step == 1) {
        let $data = {
          mobile: this.phone,
          scenes: "register",
          code: this.code,
          step: this.step
        };
        server
          .Register($data)
          .then(function(response) {
            var $data = response.data;
            if ($data.code == 200) {
              that.step = 2;
            }
          })
          .catch(function(error, data) {
            that.$message.error(error.response.data.message);
          });
      }

      if (this.step == 2) {
        let $data = {
          mobile: this.phone,
          scenes: "register",
          name: this.username,
          step: this.step,
          password: this.password,
          password_confirmation: this.password_confirmation
        };
        server
          .Register($data)
          .then(function(response) {
            var $data = response.data;
            if ($data.code == 200) {
              that.$message.success("注册成功");
              sessionStorage.setItem("authToken", $data.data.access_token);
              that.$axios.defaults.headers.common["Authorization"] =
                "bearer " + $data.data.access_token;
              that.$store.commit("setUserInfo", $data.data.user);
              that.$router.push("/home");
            }
          })
          .catch(function(error, data) {
            that.$message.error(error.response.data.message);
          });
      }
    },
    validatePhone() {
      //判断输入的手机号是否合法
      if (!this.phone) {
        this.$message.error("手机号码不能为空");
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.$message.error("请输入正确是手机号");
        return false;
      } else {
        return true;
      }
    },
    validateBtn() {
      //倒计时
      let time = 5;
      this.btnTitle = time + "秒后重试";
      this.disabled = true;
      let timer = setInterval(() => {
        if (time - 1 == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.btnTitle = "获取验证码";
        } else {
          this.btnTitle = time - 1 + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
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