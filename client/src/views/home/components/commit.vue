<template>
  <div class="addUser">
    <h1>添加用户</h1>
    <div class="big">
      <Add :msg="dataList.add_user" :dataList="add_user">
        <el-form-item label="用户名" prop="user">
          <el-input
            type="text"
            v-model="add_user.user_name"
            auto-complete="off"
            inline-message="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="add_user.user_pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-select v-model="add_user.identity_id" placeholder="请选择身份id">
          <el-option
            v-for="(item,index) in identity"
            :key="index"
            :label="item.identity_text"
            :value="item.identity_id"
          >{{item.identity_text}}</el-option>
        </el-select>
      </Add>
    </div>
  </div>
</template>
<script>
import dataList from "../../../config/adduser.config";
import Add from "../components/add.vue";
import { mapState, mapActions } from "vuex";
import api from "../../../api/index";

export default {
  props: {},
  components: {
    Add
  },
  data() {
    return {
      dataList: dataList,
      add_user: {
        user_name: "",
        user_pwd: "",
        identity_id: ""
      }
    };
  },
  computed: {
    ...mapState(["identity", "user"])
  },
  methods: {
    ...mapActions(["userFn"])
  },
  created() {},
  mounted() {},
  watch: {
    add_user(data) {
      console.log(data);
    }
  }
};
</script>
<style scoped lang="scss">
.addUser {
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
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 33.3%;
    }
  }
}
</style>
