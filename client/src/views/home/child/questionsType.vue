<template>
  <div class="questionsType">
    <h1>试题分类</h1>
    <div class="big">
      <el-button type="text" @click="openFn">+添加类型</el-button>
      <el-table :data="questionsType" style="width: 100%">
        <el-table-column prop="questions_type_id" label="类型ID" width="300"></el-table-column>
        <el-table-column prop="questions_type_text" label="类型名称" width="300"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import api from "../../../api/index";
import { mapActions, mapState } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(["questionsType"])
  },
  methods: {
    ...mapActions(['getQuestionsType']),
    openFn() {
      this.$Message
        .prompt("", "创建新类型", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          placeholder: "请输入类型名称",
          inputErrorMessage: "邮箱格式不正确"
        })
        .then(({ value }) => {
          api
            .insertQuestionsType({
              text: value,
              sort: this.questionsType.length + 1
            })
            .then(res => {
              this.getQuestionsType();
            });
        })
        .catch(() => {
          this.$Mes({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  created() {
 
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.questionsType {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  h1 {
    width: 94%;
    height: 50px;
    line-height: 80px;
    margin-left: 2.5%;
    font-size: 23px;
  }
  .big {
    width: 94%;
    background: #ffffff;
    margin: 3%;
    height: 300px;
    border-radius: 10px;
    .el-button {
      width: 150px;
      height: 36px;
      background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
      color: #fff;
      border-radius: 6px;
      margin: 2%;
    }
    .el-table {
      padding: 2%;
    }
  }
}
</style>