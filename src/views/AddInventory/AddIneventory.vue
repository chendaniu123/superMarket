<template>
  <div class="add-ineventory">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>商品入库</span>
      </div>
      <!-- 内容 -->
      <div class="text">
        <!-- 商品条形码 -->
        <div class="two">
          <h4>*商品条形码:</h4>
          <el-input class="pro-input" placeholder="请输入内容" v-model="barCode"></el-input>
        </div>
        <!-- 数量 -->
        <div class="two">
          <h4>*数量:</h4>
          <el-input class="pro-input" placeholder="请输入内容" v-model="barCode"></el-input>
          <p>记重商品单位为千克</p>
        </div>
        <!-- 进价 -->
        <div class="two">
          <h4>*进价:</h4>
          <el-input class="pro-input" placeholder="请输入内容" v-model="barCode"></el-input>
         <span>元</span>
        </div>

      

        <!-- 按钮 -->
        <el-button type="success">入库</el-button>
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
      radio1: "1"
    };
  }
};
</script>



<style scoped lang="less">
@import "./Addinventory.less";
</style>
<style lang="less">
.add-ineventory {
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