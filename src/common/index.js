import server from '../server'

export default {
    login: function ($data, vue) {
        var that = vue;
        if ($data.name == '' || $data.password == '') {
            that.$message.error('账号/密码不能为空');
            return
        }

        server.Login($data).then(function (response) {
            var $data = response.data
            if ($data.code == 200) {
                that.$message.success('登录成功');
                sessionStorage.setItem('authToken', $data.data.access_token)
                that.$axios.defaults.headers.common['Authorization'] = 'bearer ' + $data.data.access_token
                that.$store.commit('setUserInfo', $data.data.user);
                that.$router.push('/home')
            } else {
                that.$message.error('登录失败，账号或者密码错误');
            }
        }).catch(function () { 
            that.$message.error('登录失败，账号或者密码错误');
        });
    }
}
