<template>
  <div class="addUser">
    <h1>添加用户</h1>
    <div class="big">
      <AddUser />
      <AddIdentity />
      <AddInterfaces />
      <AddViews />
      <AddIdentityJie />
      <AddIdentityView />
    </div>
  </div>
</template>
<script>
import AddUser from "../components/add/add_user"; //添加用户
import AddViews from "../components/add/add_views"; //添加视图接口权限
import AddInterfaces from "../components/add/add_interfaces"; //添加api接口权限
import AddIdentity from "../components/add/add_identity"; // 添加身份
import AddIdentityView from "../components/add/add_Identity_view"; //给身份设置视图权限
import AddIdentityJie from "../components/add/add_Identity_Jie"; //给身份设置api接口权限

export default {
  props: {},
  components: {
    AddUser,
    AddViews,
    AddInterfaces,
    AddIdentity,
    AddIdentityView,
    AddIdentityJie
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
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
