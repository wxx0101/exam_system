<template>
  <div class="addQuestions">
    <h1>添加试题</h1>
    <div class="big">
      <p>题目信息</p>
      <span>题干</span>
      <el-input v-model="title" placeholder="请输入题目标题，不超过20个字" maxlength="20"></el-input>
      <p>题目主题</p>
      <mavon-editor
        :ishljs="false"
        :subfield="false"
        placeholder="请输入内容..."
        v-model="questions_stem"
      ></mavon-editor>
      <p>请选择考试类型：</p>
      <el-select v-model="exam_id" placeholder="请选择">
        <el-option
          v-for="(item,index) in examType"
          :key="index"
          :label="item.exam_name"
          :value="item.exam_id"
        >{{item.exam_name}}</el-option>
      </el-select>
      <p>请选择课程类型：</p>
      <el-select v-model="subject_id" placeholder="请选择">
        <el-option
          v-for="(item,index) in subjectType"
          :key="index"
          :label="item.subject_text"
          :value="item.subject_id"
        >{{item.subject_text}}</el-option>
      </el-select>
      <p>请选择题目类型：</p>
      <el-select v-model="questions_type_id" placeholder="请选择">
        <el-option
          v-for="(item,index) in questionsType"
          :key="index"
          :label="item.questions_type_text"
          :value="item.questions_type_id"
        >{{item.questions_type_text}}</el-option>
      </el-select>
      <p>答案信息</p>
      <mavon-editor
        :ishljs="false"
        :subfield="false"
        placeholder="请输入内容..."
        v-model="questions_answer"
      ></mavon-editor>
      <el-button type="text" @click="submitFn">提交</el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "../../../api/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      questions_answer: "",
      questions_type_id: "",
      title: "",
      exam_id: "",
      subject_id: "",
      questions_stem: ""
    };
  },
  computed: {
    ...mapState(["examType", "subjectType", "questionsType"])
  },
  methods: {
    submitFn() {
      this.$Message
        .confirm("真的要添加吗？", "你确定要添加这道试题吗?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let { user_id } = JSON.parse(sessionStorage.getItem("userinfo"));
          api
            .questions({
              questions_type_id: this.questions_type_id,
              subject_id: this.subject_id,
              exam_id: this.exam_id,
              title: this.title,
              user_id: user_id,
              questions_stem: this.questions_stem,
              questions_answer: this.questions_answer
            })
            .then(res => {
              let { code } = res;
              if ((code, msg)) {
                this.$Mes({
                  type: "success",
                  message: "添加成功"
                });
              }
            });
        })
        .catch(() => {
          this.$Mes({
            type: "info",
            message: "已取消添加"
          });
        });
    }
  },
  created() {
    let { path } = this.$router.history.current;
    let url = path.split("/")[2];
    if (url === "editQuestions") {
      let { id } = this.$router.history.current.query;
      api.questionsCondition({ questions_id: id }).then(res => {
        let { code, data } = res;
        if (code) {
          this.questions_answer = data[0].questions_answer;
          this.exam_id = data[0].exam_id;
          this.subject_id = data[0].subject_id;
          this.questions_type_id = data[0].questions_type_id;
          this.questions_stem = data[0].questions_stem;
          this.title = data[0].title;
        }
      });
    }
  },
  mounted() {},
  watch: {
    $route(data) {
      if (data.path.split("/")[2] === "editQuestions") {
        let { id } = this.$router.history.current.query;
        api.questionsCondition({ questions_id: id }).then(res => {
          let { code, data } = res;
          if (code) {
            this.questions_answer = data[0].questions_answer;
            this.exam_id = data[0].exam_id;
            this.subject_id = data[0].subject_id;
            this.questions_type_id = data[0].questions_type_id;
          }
        });
      } else {
        (this.questions_answer = ""),
          (this.questions_type_id = ""),
          (this.title = ""),
          (this.exam_id = ""),
          (this.subject_id = ""),
          (this.questions_stem = "");
      }
    }
  }
};
</script>
<style scoped lang="scss">
.addQuestions {
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
    border-radius: 10px;
    p {
      width: 100%;
      height: 55px;
      line-height: 55px;
      padding-left: 3%;
      margin: 3% 0 0 0;
    }
    span {
      padding-left: 3%;
      height: 30px;
      display: block;
    }
    .el-input {
      width: 500px;
      margin: 0 2%;
    }
    .v-note-wrapper {
      width: 94%;
      margin: 0 3%;
      border-radius: 10px;
    }
    .el-select {
      margin-left: 3%;
    }
    .el-button {
      width: 100px;
      height: 40px;
      background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
      color: #fff;
      border-radius: 6px;
      border: none;
      margin: 4% 0 2% 3%;
    }
  }
}
</style>