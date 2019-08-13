<template>
  <div class="addviews">
    <p>
      <span>添加视图接口权限</span>
    </p>
    <p>
      <el-select v-model="view_authority_id" placeholder="请选择已有视图">
        <el-option
          v-for="(item,index) in viewauthority"
          :key="index"
          :label="item.view_authority_text"
          :value="item.identity_view_authority_relation_id"
        >{{item.view_authority_text}}</el-option>
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
import api from "../../../../api/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      view_authority_id: ""
    };
  },
  computed: {
    ...mapState(["viewauthority"])
  },
  methods: {
    resetFn() {
      this.view_authority_id = "";
    },
    okFn() {
      if (this.view_authority_id !== "") {
        api.userSetIdentityView({ view_authority_id: this.view_authority_id });
      } else {
        alert("不能为空哦，亲爱滴");
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.addviews {
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