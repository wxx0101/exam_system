<template>
  <div class="watchQuestions">
    <h1>查看试题</h1>
    <div class="big">
      <div class="top">
        <ul>
          <li>课程类型:</li>
          <li
            v-for="(item,index) in subjectType"
            :key="index"
            :class="{'active': index==ind}"
            @click="clickFn(index,item.subject_id)"
          >{{item.subject_text}}</li>
        </ul>
        <div class="types">
          <p>
            <b>考试类型：</b>
            <el-select v-model="exam_id" placeholder="请选择">
              <el-option
                v-for="(item,index) in examType"
                :key="index"
                :label="item.exam_name"
                :value="item.exam_id"
              >{{item.exam_name}}</el-option>
            </el-select>
          </p>
          <p>
            <b>题目类型：</b>
            <el-select v-model="questions_type_id" placeholder="请选择">
              <el-option
                v-for="(item,index) in questionsType"
                :key="index"
                :label="item.questions_type_text"
                :value="item.questions_type_id"
              >{{item.questions_type_text}}</el-option>
            </el-select>
          </p>
          <button @click="searchFn">查询</button>
        </div>
      </div>
      <div class="content">
        <Item :dataList="dataList" />
      </div>
    </div>
  </div>
</template>
<script>
import Item from "../components/Item";
import api from "../../../api/index";
import { mapState } from "vuex";
export default {
  props: {},
  components: {
    Item
  },
  data() {
    return {
      val: "",
      questions_type_id: "",
      exam_id: "",
      subject_id: "",
      ind: -1,
      dataList: []
    };
  },
  computed: {
    ...mapState(["subjectType", "examType", "questionsType"])
  },
  methods: {
    clickFn(index, id) {
      this.ind = index;
      this.subject_id = id;
    },
    searchFn() {
      let obj = {}
      if(this.subject_id ){
        obj.subject_id = this.subject_id
      }
      if(this.exam_id ){
        obj.exam_id = this.exam_id
      }
      if(this.questions_type_id ){
        obj.questions_type_id = this.questions_type_id
      }
      api.questionsCondition(obj).then(res => {
        let { code, data } = res;
        if (code) {
          this.dataList = data;
        }
      });
    }
  },
  created() {
    api.questionsTest().then(res => {
      let { code, data } = res;
      if (code) {
        this.dataList = data;
      }
    });
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.watchQuestions {
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
    background: #f0f2f5;
    margin: 3%;
    height: 300px;
    border-radius: 10px;
    .top {
      width: 100%;
      height: 150px;
      border-radius: 15px;
      background: #ffffff;
      ul {
        width: 100%;
        height: 50%;
        padding-top: 15px;
        li {
          float: left;
          list-style: none;
          font-size: 13px;
          padding: 0 10px;
          height: 26px;
          line-height: 26px;
          border-radius: 12px;
          color: #666;
          &.active {
            background: #0139fd;
            color: #fff;
          }
        }
        li:nth-child(1) {
          margin-left: 3%;
        }
      }
      .types {
        width: 100%;
        height: 40%;
        line-height: 70px;
        p {
          float: left;
          margin-left: 4%;
        }
        button {
          width: 120px;
          height: 30px;
          background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
          color: #fff;
          border-radius: 6px;
          border: none;
          margin-left: 3%;
          outline: none;
        }
      }
    }
    .content {
      width: 100%;
      border-radius: 15px;
      background: #ffffff;
      margin-top: 2%;
    }
  }
}
</style>