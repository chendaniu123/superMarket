<template>
  <div class="personal">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <!-- 内容 -->
      <div class="text">
        <!-- 头像 -->
        <div>
          <el-upload
            class="avatar-uploader"
            action="55555"
            :http-request="upLoad"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <!-- 图像 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <!-- 图标 -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 头像 -->
        <p>ID:{{accountInfo.id}}</p>
        <p>账号:{{accountInfo.user}}</p>
        <p>用户组：{{accountInfo.user_group}}</p>
        <p>创建时间：{{accountInfo.create_dade|favtime}}</p>
      </div>
    </el-card>
  </div>
</template>


<script>
//引入模块
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      accountInfo: {},
      imageUrl: ""
    };
  },
  methods: {
    //获取信息函数
    getAccountInfo() {
      this.request.get("/account/accountinfo")
      .then(res=>{
          console.log(res);
          
      })
      .catch(err=>{
          console.log(err);
          
      })
    },
    //头像上传之前
    beforeAvatarUpload(file) {
 const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 10;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
    },
    //之定义上传函数
    upLoad(file) {

           // 创建一个formData对象
           let formData = new FormData();
           //  把文件数据 放入 formData
           formData.append('file', file.file)   

           // 发送axios给后端 把文件新传递给后端
           axios.post('/account/uploadavatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
           })
           .then(response => {
              // 接收后端响应的数据
              let {code, reason, path} = response.data;   
              // 判断   
              if (code === 0) {
                  this.$message({
                      type: 'success',
                      message: reason
                  })
                 // 回填头像
                this.imageUrl = `http://172.16.11.197:5000${path}`; 

                //  触发父组件方法
                this.$emit('A')
                
              } else if (code === 1) {
                  this.$message.error(reason)
              }
              
           })
           .catch(err => {
               console.log(err)
           })
        }
  },

  created() {},
  //时间过滤
  filters: {
    favtime(val) {
      return moment(val).format("YYYY/MM/DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less">
.personal {
  .box-card {
    .clearfix {
      padding: 0 0 0 0 !important;
      text-align: left !important;
      background: #cccc;
      height: 50px;
      line-height: 50px !important;
    }
    .text {
      text-align: left;
      line-height: 0;
      p {
        height: 50px;
        line-height: 50px;
        text-align: left;
        color: red;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        left: 0;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>