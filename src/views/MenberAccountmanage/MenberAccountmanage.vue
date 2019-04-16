<template>
  <div class="menber-accountmanage">
   <!--  <h1>我是会员管理中的账号管理</h1> -->
    <el-card class="box-card">
      <!-- 头部 -->
        <div slot="header" class="clearfix">
          <span>添加管理员账号</span>
        
        </div>
        <!-- 内容 -->
        <div class="text">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="用户名" prop="user">
                        <el-input type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="ruleForm2.password" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop="checkPass">
                        <el-input v-model.number="ruleForm2.checkPass"></el-input>
                      </el-form-item>
                            <!-- 下拉单 -->
                      <el-form-item label="选择用户组" prop='userGroup'>
                            <el-select v-model="ruleForm2.userGroup" placeholder="选择用户组">
                              <el-option label="超级管理员" value="超级管理员"></el-option>
                              <el-option label="普通用户" value="普通用户"></el-option>
                            </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                      </el-form-item>
                </el-form>
        </div>
    </el-card>
  
   
  </div>

</template>


<script>
//引入正则
import {passwordReg} from  '@/utils/validator.js';
  export default {
    data() {
      //用户名
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
       callback();
      };
      //密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!passwordReg(value)) {
                callback(new Error('以字母开头，长度在3~6之间，只能包含字符、数字和下划线')) 
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      //确认密码
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();//成功
        }
      };
      return {
        ruleForm2: {
          user: '',
          password: '',
          checkPass: '',
           userGroup: ''
        },
        rules2: {
          user: [
            { validator: checkAge, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
          form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }

      }
      
      
     
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //搜集账号数据
            let params={
              user:this.ruleForm2.user,//用户名
              password:this.ruleForm2.password,//密码
              userGroup:this.ruleForm2.userGroup  //用户类型

            }
            console.log(this.request);
            this.request.post('/account/accountmanage',params)
            .then(res=>{
              console.log(res)
              let{code ,reason}=res;
              if(code===0){
                this.$message({
                  type:"success",
                  message:reason
                })
            this.$router.push('/home/Accountadd')//跳转页面，直接是子路由

              }else if(code===1){
                this.$message.error(reason)
              }
            })
            .catch(err=>{
              console.log(err);
              
            })
          } else {
            console.log('error submit!!');//提交失败
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       onSubmit() {
        console.log('submit!');
      }
    }
  }




 
</script>






<style scoped lang="less">
@import './MenberAccountmanage.less';
</style>
<style lang="less">
 .menber-accountmanage {
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