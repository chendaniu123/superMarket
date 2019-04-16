<template>
  <div class="classify-add">
     <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>添加管理</span>
      </div>
      <!-- 内容 -->
      <div class="text">
        <div class="one">
          <h4>*所属分类:</h4>
          <el-select v-model="value8" filterable placeholder="-- 顶级分类 --">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- 分类名称 -->
        <div class="two">
          <h4>*分类名称:</h4>
          <el-input class="pro-input" placeholder="请输入内容" v-model="barCode"></el-input>
        </div>
      
        <!-- 状态 -->
        <div class="two">
          <h4>状态:</h4>
          <el-radio v-model="radio1" label="1-1">启用</el-radio>
          <el-radio v-model="radio1" label="2-2">禁用</el-radio>
        </div>
       
        <!-- 按钮 -->
         <el-button type="success">添加</el-button>
      </div>
    </el-card>
    
  
   
  </div>

</template>




<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value8: "",
      input23: "",
      radio: "1",
      radio1: "1",
     
    };
  }
};
</script>



<style scoped lang="less">
@import "./ClassfyAdd.less";
</style>
<style lang="less">
.classify-add {
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