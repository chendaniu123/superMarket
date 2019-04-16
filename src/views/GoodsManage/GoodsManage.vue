<template>
  <div class="goods-manage">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <!-- 内容 -->
      <div class="text">
        <!-- 左侧下拉框，选择分类 -->
        <div class="">
          <el-form size="mini" :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="选择分类" prop="cateName">
              <el-select v-model="searchForm.cateName" clearable placeholder="请选择" class="box">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 关键字 -->
            <span>关键字：</span>
            <el-input class="Collection" v-model="searchForm.keyword" placeholder="请输入内容"></el-input>
            <span>(商品名称，条形码)</span>
            <!-- 查询按钮 -->
            <el-button class="collection-button"  @click="search"  type="success">查询</el-button>
            <!-- 分割线 -->
            <div class="line"></div>
          </el-form>
        </div>

        <!-- 表格部分 -->
        <el-table
          ref="goodTable"
          :data="goodTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 勾选框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 商品条形码 -->
          <el-table-column prop="barCode" label="商品条形码" ></el-table-column>
          <!-- 商品名字 -->
          <el-table-column prop="productName" label="商品名称" ></el-table-column>
          <!-- 售价 -->
          <el-table-column prop="GoodsPrice" label="售价（元）" ></el-table-column>
          <!-- 商品类型 -->
          <el-table-column prop="cateName" label="商品类型"></el-table-column>
          <!-- 市场价 -->
          <el-table-column prop="MarketPrice" label="市场价（元）" ></el-table-column>
          <!-- 库存 -->
          <el-table-column prop="LibrayNumber" label="库存" ></el-table-column>
        
         

        <!-- 操作 -->

          <!-- 操作 -->

          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      

        <!-- 勾选 -->
        <div style="margin-top: 20px">
          <el-button @click="allDel" type="success">批量删除</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        <!-- 页码 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1,3,5,10,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
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
      searchForm: {
        // 搜索表格数据
        cateName: "全部",
        keyword: ""
      },
      tableId: [],
      options: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "电子类",
          label: "电子类"
        },
        {
          value: "烟酒类",
          label: "烟酒类"
        },
        {
          value: "食品类",
          label: "食品类"
        },
        {
          value: "服装类",
          label: "服装类"
        },
        {
          value: "蔬菜类",
          label: "蔬菜类"
        }
      ],

      //表格数据
      goodTable: [],

      //页码
      //  dialogFormVisible: false, // 模态框显示隐藏
      editForm: {}, // 修改
      rules: {}, // 验证规则
      currentPage: 1, // 当前页码
      pageSize: 3, // 每页条数
      total: 0 // 总条数
    };
  },
  methods: {
      //按照分页请求数据
    getGoodsListByPage() {
      //收集参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      //请求数据
      this.request
        .get("/account/goodslistbypage", params)
        .then(res => {
          //接收后端给的数据
          console.log(res);
          let { total, data } = res;
          //赋值
          this.total = total;
          this.goodTable = data;
          //如果第一页没有数据，就返回上一页
          if (this.currentPage !== 1 && !data.length) {
            //回到上一页
            this.currentPage -= 1;
            //调用自己
            this.getAccountListByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //所有数据
    Allccountlist() {
      //发送请求，获取所有数据
      this.request
        .get("./account/goodslist")
        .then(res => {
          this.goodTable = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /* 删除 */
      /* 删除账号列表 */
    handleDelete(id) {
      //优化删除
      this.$confirm("你确定要删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //搜集参数
          let params = { id };
          //发送请求
          this.request
            .get("/account/delgoods", params)
            .then(res => {
              /*  console.log(res); */
              //接收后端数据
              let { code, reason } = res;
              //判断，成功
              if (code === 0) {
                //弹成功
                this.$message({
                  type: "success",
                  message: reason
                });
                //页面刷新
                this.getGoodsListByPage();
              } else if (code === 1) {
                //失败，弹失败
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "以取消删除"
          });
        });
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    //勾选框取消
    toggleSelection() {
      this.$refs.goodTable.clearSelection();
    },

    handleSelectionChange(val) {
      //获取选中的id放入一个数组
      this.tableId = val.map(v => v.id);
      //是否拿到
      console.log(this.tableId);
    },
    //批量删除
    allDel() {
      //当没有选中任何勾选框，点击批量删除，给提示信息。且失败
      if (!this.tableId.length) {
        //弹提示
        this.$message.error("请选中要删除的账号");
        //结束函数操作
        return;
      }
      //选中状态
      //优化。给用户考虑机会
      this.$confirm("你确定要删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确认删除
          //接收呗选中的数据
          let params = {
            idArr: this.tableId
          };
          //发送请求给后端
          this.request
            .get("/account/alldelgoods", params)
            .then(res => {
              //接收后端响应的数据
              let { code, reason } = res;
              if (code === 0) {
                //弹提示，刷新
                this.$message({
                  type: "success",
                  message: reason
                });
                //刷新页面
                this.getGoodsListByPage();
              }
              if (code === 1) {
                //弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          //取消
          this.$message({
            type: "info",
            message: "一取消删除"
          });
        });
    },
    /* 页码 */
    //分页每页条数的改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoodsListByPage();
      console.log(val);
    },
    //当前页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val);

      this.getGoodsListByPage();
    },
    //搜索
    search(){
      //调用当前页面函数
      this.getGoodsListByPage();
      //收集参数
      let params={
        cateName:this.searchForm.cateName,
        keyword:this.searchForm.keyword
      }
      //发请求
      this.request.get('/account/search',params)
      .then(res=>{
        this.goodTable=res;

      })
      .catch(err=>{
        console.log(err);
        
      })
    }
  },

  created() {
    this.getGoodsListByPage();
  }
};
</script>



<style scoped lang="less">
@import "./doodsmanage.less";
</style>
<style lang="less">
.goods-manage {
  .box-card {
    .clearfix {
      padding: 0 0 0 0 !important;
      text-align: left !important;
      background: #cccc;
      height: 50px;
      line-height: 50px !important;
    }
    .text{
      .two{
        width: 200px;
        height: 300px;
      }
    }
  }
}
</style>