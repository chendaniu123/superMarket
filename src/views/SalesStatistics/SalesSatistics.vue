<template>
  <div class="account-add">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>销售统计</span>
      </div>
      <!-- 内容 -->
      <div class="text">
        <!-- 日期 -->
        <div class="block">
          <span class="demonstration">时间：</span>
          <el-date-picker
            v-model="value9"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            default-value="2010-10-01"
          ></el-date-picker>
        </div>
        <!-- 1 准备一个容器 -->
        <div id="main" style="width: 80%;height:400px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
//中引入echart 且 挂载在原型上
import echarts from "echarts";
export default {
  data() {
    return {
      value8: "",
      value9: ""
    };
  },
  //生命周期钩子函数 适合操作dom
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "销售统计"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      xAxis: {
        data: ["2019/03/01", "2019/03/02", "2019/03/03", "2019/03/04", "2019/03/05", "2019/03/06"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>


<style scoped lang="less">
</style>
<style lang="less">
.account-add {
  .box-card {
    border: 1px solid gray;
    margin-top: 67px;
    width: 1000px;
    padding-bottom: 6px;
    .clearfix {
      padding: 0 0 0 0 !important;
      text-align: left !important;
      background: #cccc;
      height: 50px;
      line-height: 50px !important;
    }
    .text {
      text-align: left;
      line-height: 60px;
      // margin-top: 20px;
      .two {
        width: 300px !important;
        h4 {
          height: 40px;
        }
        .pro-input {
          width: 240px;
        }
        span {
          display: inline-block;
          margin-left: 10px;
        }
        p {
          height: 40px;
          line-height: 40px;
        }
        .el-form-item__content {
          margin: 0 !important;
        }
      }
      .price {
        background: white;
      }
      .product-brief {
        .el-form-item__content {
          margin: 0 !important;
        }
        .product-brief-input {
          width: 900px;
        }
      }
    }
  }
}
</style>