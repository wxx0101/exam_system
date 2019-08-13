<template>
  <div class="showUser">
    <h1>用户展示</h1>
    <p>
      <span
        v-for="(item,index) in topArr"
        :class="{'active':index == ind}"
        :key="index"
        @click="switchFn(index,item.title)"
      >{{item.title}}</span>
    </p>
    <div class="big">
      <b>{{topName}}</b>
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
      >
        <el-table-column
          v-for="(ite,ind) in dataList"
          :prop="ite.value"
          :key="ind"
          :label="ite.key"
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="tableData.length"
        :current-page="currentPage"
        @current-change="changePageFn"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      ind: 0,
      topName: "用户数据",
      currentPage: 1, //默认显示第一页
      pageSize: 6,
      topArr: [
        {
          title: "用户数据"
        },
        {
          title: "身份数据"
        },
        {
          title: "api接口权限"
        },
        {
          title: "身份和api接口关系"
        },
        {
          title: "视图接口权限"
        },
        {
          title: "身份和视图权限关系"
        }
      ],
      tableData: [],
      dataList: []
    };
  },
  computed: {
    ...mapState(["user", "identity", "apiauthorityFn", "viewauthority"])
  },
  methods: {
    switchFn(index, topName) {
      this.ind = index;
      this.topName = topName;
      if (this.ind == 0) {
        this.getData(
          this.user,
          ["用户名", "密码", "身份"],
          ["user_name", "user_pwd", "identity_text"]
        );
      } else if (this.ind == 1) {
        this.getData(this.identity, ["身份名称"], ["identity_text"]);
      } else if (this.ind == 2) {
        this.getData(
          this.apiauthorityFn,
          ["api权限名称", "api权限url", "api权限方法"],
          ["api_authority_text", "api_authority_url", "api_authority_method"]
        );
      } else if (this.ind == 3) {
        this.getData(
          this.apiauthorityFn,
          ["身份名称", "api权限名称", "api权限url", "api权限方法"],
          [
            "identity_text",
            "api_authority_text",
            "api_authority_url",
            "api_authority_method"
          ]
        );
      } else if (this.ind == 4) {
        this.getData(
          this.viewauthority,
          ["视图权限名称", "视图id"],
          ["view_authority_text", "view_id"]
        );
      } else if (this.ind == 5) {
        this.getData(
          this.viewauthority,
          ["身份", "视图权限名称", "视图id"],
          ["identity_text", "view_authority_text", "view_id"]
        );
      }
    },
    getData(top, title, data) {
      this.tableData = top;
      this.dataList = title.map((item, i) => ({
        key: item,
        value: data[i]
      }));
    },
    changePageFn(e) {
      this.currentPage = e;
    }
  },
  created() {},
  mounted() {
    this.getData(
      this.user,
      ["用户名", "密码", "身份"],
      ["user_name", "user_pwd", "identity_text"]
    );
  },
  watch: {
    user() {
      this.getData(
        this.user,
        ["用户名", "密码", "身份"],
        ["user_name", "user_pwd", "identity_text"]
      );
    }
  }
};
</script>
<style scoped lang="scss">
.showUser {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  h1 {
    width: 94%;
    height: 50px;
    line-height: 80px;
    margin-left: 2.5%;
    font-size: 23px;
  }
  p {
    margin-top: 30px;
    width: 94%;
    height: 40px;
    margin-left: 2.5%;
    span {
      display: inline-block;
      padding: 4px;
      border: 1px solid #666;
      color: #666;
      margin: 0 5px;
      &:hover {
        color: blue;
      }
      &.active {
        color: blue;
        border: 1px solid blue;
      }
    }
  }
  b {
    width: 94%;
    margin-left: 2.5%;
  }
  .big {
    width: 94%;
    background: #f0f2f5;
    margin: 3%;
    border-radius: 10px;
    // overflow: auto;
  }
  .el-pagination {
    padding-left: 600px;
  }
}
</style>