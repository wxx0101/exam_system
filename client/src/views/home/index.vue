<template>
  <div class="container">
    <header class="BasicLayout_header__3Ck8E ant-layout-header">
      <div class="BasicLayout_logo__1h5dC">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
          alt
        />
      </div>
      <div class="BasicLayout_logout__1KsIb">
        <div>
          <span class="Header_user__1XoJH ant-dropdown-trigger">
            <span class="ant-avatar ant-avatar-circle">
              <span class="ant-avatar-string"></span>
            </span>
            {{username}}
            <ul>
              <li @click="exitFn">退出</li>
            </ul>
          </span>
        </div>
      </div>
    </header>
    <div class="main">
      <div class="slideBox">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu v-for="(item,index) in testData" :key="index" :index="index+''">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    @click="sonFn(item1.url)"
                    v-for="(item1,index1) in item.list"
                    :key="index1"
                    :index="index+''+index1"
                  >{{item1.name}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../api/index";
import Issue from "../../static/mock/Issue";
import administer from "../../static/mock/administer";
import {mapActions} from "vuex"

export default {
  props: {},
  components: {},
  data() {
    return {
      testData: [],
      username: ""
    };
  },
  computed: {},
  methods: {
     ...mapActions(['getExam','getSub','getQuestionsType','getApiAuthority','getUser','getIdentity','getViewAuthority']),
    sonFn(url) {
      this.$router.push(url);
    },
    exitFn(){
      sessionStorage.clear()
      this.$router.push("/login")
    }
  },
  created() {
    let { identity_text, user_name } = JSON.parse(
      sessionStorage.getItem("userinfo")
    );
    if (identity_text === "出题者") {
      this.testData = Issue;
      this.username = user_name;
    } else if (identity_text === "管理员") {
      this.testData = administer;
      this.username = user_name;
    } else {
      this.$router.push("/login");
    }
    this.getQuestionsType()
    this.getSub()
    this.getExam()
    this.getApiAuthority()
    this.getUser()
    this.getIdentity()
    this.getViewAuthority()
  },
  mounted() {}
};
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-layout-header {
    height: 64px;
    padding: 0 50px;
    line-height: 64px;
    background: #001529;
    background: #fff;
  }
  .BasicLayout_logo__1h5dC {
    width: 120px;
    margin: 16px 28px 16px 0;
    float: left;
    line-height: 31px;
    text-align: center;
    color: #fff;
    font-weight: 700;
    font-family: "\5B8B\4F53";
    img {
      width: 100%;
      height: 100%;
    }
  }
  .BasicLayout_logout__1KsIb {
    color: #333;
    float: right;
    .Header_user__1XoJH {
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      position: relative;
      ul{
        position: absolute;
        left: 0;
        top: 50px;
        width: 100%;
        height: 35px;
        display: none;
        background: #eee;
        border-radius: 10px;
        overflow: hidden;
        li{
          width: 100%;
           line-height: 35px;
          padding-left: 10px;
          &:hover{
            background: blueviolet;
            color: #F0F2F5;
            border-radius: 10px;
          }
        }
      }

      .ant-avatar {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        font-feature-settings: "tnum";
        position: relative;
        display: inline-block;
        overflow: hidden;
        color: #fff;
        white-space: nowrap;
        text-align: center;
        vertical-align: middle;
        background: #ccc;
        width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 50%;
        .ant-avatar-string {
          position: absolute;
          left: 50%;
          transform-origin: 0 center;
        }
      }
    }
    &:hover{
      ul{
        display: block;
      }
      
    }
  }
  .main {
    flex: 1;
    display: flex;
    .slideBox {
      width: 200px;
      height: 100%;
      background: rgb(84, 92, 100);
      .el-menu-vertical-demo {
        width: 201px;
        overflow: hidden;
      }
    }
    .content {
      flex: 1;
      overflow: auto;
      background: #F0F2F5;
    }
  }
}
</style>