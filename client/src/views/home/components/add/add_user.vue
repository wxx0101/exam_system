<template>
  <div class="adduser">
    <p>
      <span
        v-for="(item,index) in arr"
        :key="index"
        :class="{'active': index==ind}"
        @click="switchFn(index)"
      >{{item}}</span>
    </p>
     <p v-if="ind==1">
      <el-select v-model="userID" placeholder="请选择身份id">
        <el-option
          v-for="(item,index) in user"
          :key="index"
          :label="item.user_name"
          :value="item.user_id"
        >{{item.user_name}}</el-option>
      </el-select>
    </p>
    <p>
      <el-input v-model="user_name" placeholder="请输入用户名" />
    </p>
    <p>
      <el-input v-model="user_pwd" placeholder="请输入密码" />
    </p>
    <p>
      <el-select v-model="identityID" placeholder="请选择身份id">
        <el-option
          v-for="(item,index) in identity"
          :key="index"
          :label="item.identity_text"
          :value="item.identity_id"
        >{{item.identity_text}}</el-option>
      </el-select>
    </p>
    <p>
      <el-button type="primary" @click="okFn">确定</el-button>
      <el-button @click="resetFn">重置</el-button>
    </p>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "../../../../api/index"
export default {
  props: {},
  components: {},
  data() {
    return {
      val: "",
      user_name: "",
      user_pwd: "",
      ind: 0,
      identityID: '',
      userID: '',
      arr: ["添加用户", "更新用户"]
    };
  },
  computed: {
    ...mapState(["identity","user"])
  },
  methods: {
    switchFn(index) {
      this.ind = index;
      this.user_name = ""
      this.user_pwd = ""
      this.identityID = ""
    },
    resetFn(){
      this.user_name = ""
      this.user_pwd = ""
      this.identityID = ""
    },
    okFn(){
      if(this.user_pwd !== "" && this.user_name !== "" && this.identityID !== ""){
        api.user({user_name:this.user_name,user_pwd:this.user_pwd,identity_id:this.identityID})
      }else{
         alert('不能为空哦，亲爱滴')
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.adduser {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  p {
    margin: 6px;
    span {
      border: 1px solid #999;
      color: #999;
      padding: 3px 10px;
      margin-right: 10px;
      background: #fff;
      &.active {
        border: 1px solid #0139fd;
        color: #0139fd;
      }
    }
  }
}
</style>