<template>
  <div>
    <el-dialog title="登录" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import common from "../../common";
export default {
  name: "LoginWidget",
  mounted() {
    let that = this;
    this.$axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        return response;
      },
      function(error) {
        // Do something with response error
        if (error.response.data.code == 401) {
          that.dialogFormVisible = true;
        }
        return Promise.reject(error);
      }
    );
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        password: ""
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    login: function() {
      let $data = { name: this.form.name, password: this.form.password };
      common.login($data, this);
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  padding-bottom: -30px;
}
</style>