<template>
  <div>
    <p>{{msg.title}}</p>
    <el-form
      :model="msg.cosnfig"
      status-icon
      :rules="msg.rules"
      ref="baseOptions"
      class="demo-ruleForm"
    >
      <slot></slot>
      <el-form-item>
        <el-button type="primary" @click="addFn('baseOptions')">提交</el-button>
        <el-button @click="resetForm('baseOptions')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from "../../../api/index";

export default {
  props: {
    msg: {
      type: Object
    },
    dataList:{
      type:Object
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    addFn(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.dataList);
        if (valid) {
          this.msg.submit(this.dataList)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped lang="">
</style>