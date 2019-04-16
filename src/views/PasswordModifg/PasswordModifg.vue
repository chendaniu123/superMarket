<template>
  <div class="account-manage">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>修改账号密码</span>
      </div>
      <!-- 内容 -->
      <div class="text">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldpassword">
            <el-input type="text" v-model="ruleForm2.oldpassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input type="text" v-model="ruleForm2.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="checkPass">
            <el-input v-model.number="ruleForm2.checkPass"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()">确认修改</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>



<script>
//引入正则
import { passwordReg } from "@/utils/validator.js";
//引入local
import local from '../../utils/local';
export default {
  data() {
    //原密码,值定义验证就密码
    var checkAge = (rule, value, callback) => {
      //接数据

      //发请求
      this.request
        .get("/account/changepassword", { oldpassword: value })
        .then(res => {
          //接收后端的响应
          let { code, reason } = res;
          //判断成功
          if (code === 0) {
            callback(); //成功
          } else {
            callback(new Error(reason)); //失败
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    //新密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passwordReg(value)) {
        callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        );
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    //确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认信密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback(); //成功
      }
    };
    return {
      ruleForm2: {
        oldpassword: "",
        password: "",
        checkPass: ""
      },
      rules2: {
        oldpassword: [{ required: true, validator: checkAge, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    //确认修改密码
    submitForm() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //收集新密码
          let parser = {
            password: this.ruleForm2.password //密码
          };
          //发送请求给后端

          this.request
            .post("/account/surepassword", parser)
            .then(res => {
             // console.log(res);
             //接收后端响应的数据
             let {code,reason}=res;

             if(code==0){
             //弹成功提示
             this.$message({
               type:'success',
               message:reason
             })
             //删除token
             local.remove('x_h_l_x_d_c666')

             //跳转页面
             this.$router.push('/login')
             }else if (code==1){
               this.$message.error(reason)
             }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!"); //提交失败
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped lang="less">
@import "./passwordmodifg.less";
</style>
<style lang="less">
.account-manage {
  .box-card {
    .clearfix {
      padding: 0 0 0 0 !important;
      text-align: left !important;
      background: #cccc;
      height: 50px;
      line-height: 50px !important;
    }
  }
}
</style>