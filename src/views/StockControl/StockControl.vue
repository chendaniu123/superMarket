<template>
  <div class="Stock-control">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>库存管理</span>
      </div>
      <!-- 内容 -->
      <div class="text">
        <!-- 左侧下拉框，选择分类 -->
        <el-select class="choice-classification" v-model="value" placeholder="---- 选择分类 ----">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>关键字：</span>
        <el-input class="Collection" v-model="input" placeholder="请输入内容"></el-input>
        <span>(商品名称，条形码)</span>
        <el-button class="collection-button" type="success">查询</el-button>
        <!-- 分割线 -->
        <div class="line"></div>

        <!-- 表格部分 -->
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 勾选框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 商品条形码 -->
          <el-table-column prop="goodsBarCode" label="商品条形码" width="120"></el-table-column>
          <!-- 商品名字 -->
          <el-table-column prop="goodName" label="商品名称" width="120"></el-table-column>
          <!-- 进价 -->
          <el-table-column prop="purchasingPrice" label="进价（元）" width="120"></el-table-column>
          <!-- 入库 -->
          <el-table-column prop="promotionPrice" label="入库" width="120"></el-table-column>
          <!-- 库存 -->
          <el-table-column prop="repertory" label="库存" width="120"></el-table-column>
          <!-- 已售 -->
          <el-table-column prop="repertoryTotalPrice" label="已售" width="120"></el-table-column>
          <!-- 管理 -->
          <el-table-column prop="management" label="管理" width="120"></el-table-column>
        </el-table>
        <!-- 勾选 -->
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData3[1], tableData3[2]])" type="success">批量删除</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        <!-- 页码 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40"
          ></el-pagination>
        </div>
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
          label: "酒水"
        },
        {
          value: "选项2",
          label: "奶茶"
        },
        {
          value: "选项3",
          label: "金饰"
        },
        {
          value: "选项4",
          label: "洗发露"
        }
      ],
      value: "",
      input:"",

      //表格数据
      tableData3: [
        {
          date: "2016-05-03",
          goodName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          goodsBarCode: "kfgdjh",
          classify: "kjkj",
          purchasingPrice: "kjkhhkhkjh",
          promotionPrice: "89",
          marketPrice: "788569855",
          repertory: "6",
          repertoryTotalPrice: "7896995",
          sellTotalPrice: "45"
        },
        {
          date: "2016-05-03",
          goodName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          goodsBarCode: "kfgdjh",
          classify: "kjkj",
          sellingPrice: "kjkhhkhkjh",
          promotionPrice: "89",
          marketPrice: "788569855",
          repertory: "6",
          repertoryTotalPrice: "7896995",
          sellTotalPrice: "45"
        },
        {
          date: "2016-05-03",
          goodName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          goodsBarCode: "kfgdjh",
          classify: "kjkj",
          sellingPrice: "kjkhhkhkjh",
          promotionPrice: "89",
          marketPrice: "788569855",
          repertory: "6",
          repertoryTotalPrice: "7896995",
          sellTotalPrice: "45"
        },
        {
          date: "2016-05-03",
          goodName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          goodsBarCode: "kfgdjh",
          classify: "kjkj",
          sellingPrice: "kjkhhkhkjh",
          promotionPrice: "89",
          marketPrice: "788569855",
          repertory: "6",
          repertoryTotalPrice: "7896995",
          sellTotalPrice: "45"
        },
        {
          date: "2016-05-03",
          goodName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          goodsBarCode: "kfgdjh",
          classify: "kjkj",
          sellingPrice: "kjkhhkhkjh",
          promotionPrice: "89",
          marketPrice: "788569855",
          repertory: "6",
          repertoryTotalPrice: "7896995",
          sellTotalPrice: "45"
        },
        {
          date: "2016-05-03",
          goodName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          goodsBarCode: "kfgdjh",
          classify: "kjkj",
          sellingPrice: "kjkhhkhkjh",
          promotionPrice: "89",
          marketPrice: "788569855",
          repertory: "6",
          repertoryTotalPrice: "7896995",
          sellTotalPrice: "45"
        },
        {
          date: "2016-05-03",
          goodName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          goodsBarCode: "kfgdjh",
          classify: "kjkj",
          sellingPrice: "kjkhhkhkjh",
          promotionPrice: "89",
          marketPrice: "788569855",
          repertory: "6",
          repertoryTotalPrice: "7896995",
          sellTotalPrice: "45"
        }
      ],
      multipleSelection: [],
      //页码
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /* 页码 */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>



<style scoped lang="less">
@import "./StockControl.less";
</style>
<style lang="less">
.Stock-control {
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