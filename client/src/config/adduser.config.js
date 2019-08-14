import api from "../api/index"

const add_user = {
    submit: api.addUser,
    cosnfig: {
        user_name: "",
        user_pwd: "",
        identity_id: ""
    },
    rules: {
        user_name: {required: true,message: "请输入用户名",tigger:"blur"},
        user_pwd: {required: true,message: "请输入密码",tigger:"blur"},
        identity_id: {required: false,message: "请输入身份id",tigger:"blur"} 
    },
    title: "添加用户"
}

export default {add_user}