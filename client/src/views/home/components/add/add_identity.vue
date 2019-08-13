<template>
  <div class="addidentity">
    <p>
      <span>添加身份</span>
    </p>
    <p>
      <el-input v-model="identity_text" placeholder="请输入身份名称" />
    </p>
    <p>
      <el-button type="primary" @click="okFn">确定</el-button>
      <el-button @click="resetFn">重置</el-button>
    </p>
  </div>
</template>
<script>
import api from "../../../../api/index";
import { mapActions } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      identity_text: ""
    };
  },
  computed: {},
  methods: {
    ...mapActions(["getIdentity"]),
    resetFn() {
      this.identity_text = "";
    },
    okFn() {
      if (this.identity_text !== "") {
        api
          .userIdentityEdit({ identity_text: this.identity_text })
          .then(res => {
            let { code } = res;
            if (code) {
              this.getIdentity();
            }
          });
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
.addidentity {
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