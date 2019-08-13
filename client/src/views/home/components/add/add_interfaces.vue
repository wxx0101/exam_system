<template>
  <div class="addinterfaces">
    <p>
      <span>添加api接口权限</span>
    </p>
    <p>
      <el-input v-model="api_authority_text" placeholder="请输入api接口权限名称" />
    </p>
    <p>
      <el-input v-model="api_authority_url" placeholder="请输入api接口权限url" />
    </p>
    <p>
      <el-input v-model="api_authority_method" placeholder="请输入api接口权限方法" />
    </p>
    <p>
      <el-button type="primary" @click="okFn">确定</el-button>
      <el-button @click="resetFn">重置</el-button>
    </p>
  </div>
</template>
<script>
import api from "../../../../api/index"
export default {
  props: {},
  components: {},
  data() {
    return {
      api_authority_text: "",
      api_authority_url: "",
      api_authority_method: ""
    };
  },
  computed: {},
  methods: {
    resetFn(){
      this.api_authority_text = ""
      this.api_authority_url = ""
      this.api_authority_method = ""
    },
    okFn(){
      if(this.api_authority_text !== "" && this.api_authority_url !== "" && this.api_authority_method !== ""){
          api.userAuthorityApiEdit({api_authority_text:this.api_authority_text,api_authority_url:this.api_authority_url,api_authority_method:this.api_authority_method})
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
.addinterfaces {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  p {
    margin: 6px;

    span {
      border: 1px solid #00f;
      color: #00f;
      padding: 3px 10px;
      margin-right: 10px;
      background: #fff;
    }
  }
}
</style>
