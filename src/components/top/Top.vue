<template>
  <div id="box">
    <!--  <h2>欢迎您 admin</h2>
    <p>添加管理员账号</p>-->
    <el-row :gutter="20">
      <el-col :span="20" style="height:100px">
        <div class="grid-content bg-purple">
          <h2>欢迎您 admin</h2>
          <p>添加管理员账号</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-row :gutter="20">
            <el-col :span="13">
              <div class="grid-content bg-purple">
                <!-- 头像 -->
                <div class="avtive">
                  <img :src="imgUrl" alt>
                </div>
              </div>
            </el-col>
            <!-- 用户名 -->
            <el-col :span="11">
              <div class="grid-content bg-purple">
                <!-- 用户名的下拉菜单 -->
                <el-dropdown trigger="click" placement="bottom" @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{user}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">退出系统</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
//引入local
import local from "../../utils/local";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      user: "",
      imgUrl: ""
    };
  },
  methods: {
    //点击下拉框菜单触发函数
    handleCommand(command) {
      // 跳转到个人中心
      this.$router.push("/home/personal");
      if (command == "a") {
        console.log("点击个人中心");
      } else if (command == "b") {
        //清楚token
        local.remove("x_h_l_x_d_c666");
        //退出提示
        this.$message({
          type: "success",
          message: "退出成功"
        });
        //倒计时
        setTimeout(() => {
          //等待跳转页面
          this.$router.push("/login");
        }, 1000);
      }
    },
    // 获取当前登录账号
    getUserInfo() {
      this.request
        .get("/account/accountinfo")
        .then(res => {
          // 接收后端响应的数据
          let { user, img_url } = res[0];
          // 赋值给对应的变量
          this.user = user;
          this.imgUrl = `http://172.16.11.197:5000${img_url}`;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取当前登陆账号
    getcurrentaccount() {
      this.request
        .get("/login/currentaccount")
        .then(res => {
          this.user = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //调用函数 获取当前登陆账号
    this.getUserInfo();
  }
};
</script>

    <style>
@import "./Top.css";
</style>
<style lang="less">
#box {
  .el-icon-arrow-down {
    margin: 0;
  }
}
</style>
