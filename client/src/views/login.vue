<template>
  <div class="wrap">
    <div class="box">
      <el-form
        :model="baseOptions"
        status-icon
        :rules="rules2"
        ref="baseOptions"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input
            type="text"
            v-model="baseOptions.user"
            auto-complete="off"
            inline-message="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="baseOptions.pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFn('baseOptions')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "../api/index";

export default {
  data() {
    var userVal = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]{4,10}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
        return;
      } else if (!reg.test(value)) {
        callback(new Error("用户名必须是6~10位字母"));
        return;
      } else {
        callback();
      }
    };
    var pwdVal = (rule, value, callback) => {
      let reg = /\S{6,}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
        return;
      } else if (!reg.test(value)) {
        callback(new Error("密码长度至少6位数字"));
        return;
      } else {
        callback();
      }
    };
    return {
      baseOptions: {
        user: "",
        pwd: ""
      },
      rules2: {
        user: [{ validator: userVal, trigger: "change" }],
        pwd: [{ validator: pwdVal, trigger: "change" }]
      }
    };
  },
  methods: {
    loginFn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { user, pwd } = this.baseOptions;
          api.login({ user_name: user, user_pwd: pwd }).then(res => {
            let {code,msg,token} = res
            if(code){
              sessionStorage.setItem("authorization",token)
              this.$router.push("/home")
            }else{
              alert(msg)
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  background: url("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3689709953,1813140733&fm=26&gp=0.jpg")
    no-repeat;
  background-size: 100% 100%;
  .box {
    width: 420px;
    height: 260px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    position: absolute;
    left: 10%;
    top: 35%;
    .el-form-item {
      margin: 5% 0;
      > .el-form-item__label {
        color: palegreen;
      }
      .el-input {
        width: 300px;
      }
      &:nth-child(3) {
        margin-top: 15%;
        .el-button {
          width: 260px;
        }
      }
    }
  }
}
</style>

