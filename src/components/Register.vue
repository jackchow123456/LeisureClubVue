<template>
    <div class="content">
        用户注册
        <el-input
            placeholder="用户名"
            v-model="input1">
        </el-input>

        <el-input
            placeholder="密码"
            v-model="input2"
            show-password>
        </el-input>

        <el-input
            placeholder="确认密码"
            v-model="input3"
            show-password>
        </el-input>
        
        <div>
            <el-input placeholder="获取验证码" v-model="input4" class="input-with-button">
                
                <el-button slot="append">获取验证码</el-button>
            </el-input>
        </div>
        <div class="button">
            <el-button @click="routerback">返回</el-button>
            <el-button type="primary">提交</el-button>
        </div>
    </div>

        
</template>

<script>
    export default {
        data() {
            return {
                input1: '',
                input2: '',
                input3: '',
                input4: ''
            }
        },
        mounted() {
            
        },
        methods: {
            routerback : function () {
                this.$router.back(-1)
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