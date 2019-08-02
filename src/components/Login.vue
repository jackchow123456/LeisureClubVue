<template>
    <div class="content">
        用户登录
        <el-input
            placeholder="账号"
            v-model="input1">
        </el-input>

        <el-input
            placeholder="密码"
            v-model="input2"
            show-password>
        </el-input>
        <div class="button">
            <router-link to='/register'><el-button>注册</el-button></router-link>
            <el-button type="primary" @click="login">登录</el-button>
        </div>
        </div>

        
</template>

<script>
import server from '../server'

    export default {
        data() {
            return {
                input1: '',
                input2: ''
            }
        },
        mounted() {
        },
        methods: {
            login : function(){
                if(this.input1 == '' || this.input2 == ''){
                    this.$message.error('账号/密码不能为空');
                    return
                }
                let $data = {'name':this.input1,'password':this.input2}
                var that = this;
                server.Login($data).then(function (response) {
                    var $data = response.data
                    if ($data.code == 200) {
                        that.$message.success('登录成功');
                        sessionStorage.setItem('authToken',$data.data.access_token)
                        that.$axios.defaults.headers.common['Authorization'] = 'bearer '+ $data.data.access_token
                        that.$store.commit('setUserInfo', $data.data.user);
                        that.$router.push('/home')
                    }else{
                        that.$message.error('登录失败，账号或者密码错误');
                    }
                }).catch(function (error,data) {
                    that.$message.error('登录失败，账号或者密码错误');
                });
            }
        },
    }
</script>

<style scoped>
    .el-input{
        margin: .5rem 0
    }
    .button{
        margin-top: 1rem
    }
    .button .el-button{
        padding:12px 5rem;
        margin:0 10px
    }
    .content{
        margin-top: -5rem
    }
</style>