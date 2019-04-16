<template>
  <div class="login">
    <div id="box1">
      <h1>
        <i class="el-icon-loading"></i>超市后台管理系统
      </h1>

      <!-- 表单 -->
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm form"
      >
        <el-form-item label="账户" prop="user" style="color:red" class="form1">
          <el-input type="text" v-model="ruleForm2.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="form1" style="color:aliceblue">
          <el-input type="text" v-model="ruleForm2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" class="form1" style="color:aliceblue">
          <el-input type="text" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
//引入正则
import { passwordReg } from "@/utils/validator.js";
import { log } from "util";

//引入local文件
import local from '../../utils/local.js'
export default {
  data() {
    // 确认密码自定义验证函数
    const confirmPassword = (rule, value, callback) => {
      // rules: 验证规则对象 value：用户输入的值 callback: 回调函数
      if (value === "") {
        callback(new Error("确认密码不能为空")); // 输出错误提示信息
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次密码不一致")); // 输出错误提示信息
      } else {
        callback(); // 成功 （绿色勾勾）
      }
    };

    // 密码的自定义验证函数
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        // 非空验证
        callback(new Error("密码不能为空")); // 错误提示
      } else if (!passwordReg(value)) {
        callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        );
      } else {
        if (this.ruleForm2.checkPass !== "") {
          // 如果确认密码不为空
          // 触发一致性验证
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback(); // 成功回调
      }
    };

    return {
      //表单数据
      ruleForm2: {
        user: "",
        password: "",
        checkPass: ""
      },
      //验证规则
      rules2: {
        //账号
        user: [
          { required: true, message: "请输入账号", trigger: "blur" } //非空
        ],
        //密码
        password: [
          { required: true, validator: checkPassword, trigger: "blur" } //非空
        ],
        //确认密码
        checkPass: [
          { required: true, validator: confirmPassword, trigger: "blur" } // 自定义验证
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //数据交给后台
      let params = {
        user: this.ruleForm2.user,
        password: this.ruleForm2.password
      };
      //发请求
      this.request
        .post("/login/checkLongin", params)
        .then(res => {
          //收集后端参数
          let { code, reason,token} = res;
          // console.log(res);
          //执行，判定
          if (code === 0) {
            //把token存入浏览器
            local.save('x_h_l_x_d_c666', token)
            //成功
            this.$message({
              type: "success",
              message: reason
            });
            //页面跳转
            //路由转跳
            this.$router.push("/home");
          } else if (code === 1) {
            //失败
            this.$message.error(reason);
            return;
          }
        })

        .catch(err => {
          console.log(err);
        });
     
    },
    //重置
    resetForm() {
      this.$refs.ruleForm2.resetFields();
    }
  }
};
</script>



/* 样式 */
<style  scoped lang="less">
@import "./longin.less";
</style>
<style>
.login .el-form-item__label {
  color: #fff;
}
</style>
