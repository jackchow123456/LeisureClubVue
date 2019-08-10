import '../plugins/axios'

export default {

    // 七牛云上传文件示例
    QiNiuUpload: ($data) => axios.post('entry/application/upload',
        $data,
        {headers: {'Content-Type': 'multipart/form-data'}}
    ),

    // 投票
    Vote: ($id) => axios.post('entry/application/vote',
        {id: $id}
    ),

    // 获取投票结果
    GetVoteResult: ($id) => axios.get('entry/application/vote'),

    // 用户登录
    Login: ($data) => axios.post('login',$data),

    // 发送验证码
    SendSms: ($data) => axios.post('auth/sendSms',$data),

    // 注册
    Register: ($data) => axios.post('register',$data)

    
}
