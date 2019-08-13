<template>
  <div>
    <div class="con" v-for="(item,index) in dataList" :key="index">
      <div class="left">
        <h4>{{item.title}}</h4>
        <p>
          <el-tag>{{item.questions_type_text}}</el-tag>
          <el-tag type="success">{{item.subject_text}}</el-tag>
          <el-tag type="warning">{{item.exam_name}}</el-tag>
        </p>
        <b>{{item.user_name}}发布</b>
      </div>
      <div class="right">
        <b @click="editFn(item.questions_id)">编辑</b>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../../api/index";
export default {
  props: ['dataList'],
  components: {},
  data() {
    return {
    
    };
  },
  computed: {},
  methods: {
    editFn(id){
      this.$router.push({path: "/home/editQuestions",query: {id}})
    }
  },
  created() {
    
  },
  mounted() {
  
  }
};
</script>
<style scoped lang="scss">
.con {
  width: 94%;
  height: 100px;
  border-bottom: 1px solid #eee;
  margin: 0 3%;
  display: flex;
  .left {
    width: 35%;
    height: 100%;
    h4 {
      width: 100%;
      height: 35px;
      line-height: 35px;
      padding-left: 3%;
      font-size: 14px;
      color: rgb(133, 122, 122);
    }
    p {
      width: 100%;
      height: 30px;
      line-height: 30px;
      .el-tag {
        margin: 0 5px;
        padding: 0 5px;
        font-size: 10px;
        height: 25px;
        line-height: 25px;
      }
    }
    b {
      padding-left: 10px;
      margin-top: 10px;
      display: block;
      font-size: 13px;
      color: #0139fd;
    }
  }
  .right {
    width: 65%;
    height: 100%;
    line-height: 100px;
    color: #0139fd;
  }
}
</style>