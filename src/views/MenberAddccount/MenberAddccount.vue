<template>
  <div class="menber-addccount">
   
      <el-card class="box-card">
        <!-- 头部 -->
        <div slot="header" class="clearfix">
          <span>账号管理</span>
        </div>
        <!-- 内容 -->
        <div class="text">
          <!-- 表格 -->
          <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            :header-cell-style="headerStyle"
            :cell-style="cellStyle"
            @selection-change="handleSelectionChange"
          >
            <!-- 勾选 -->

            <el-table-column type="selection" width="55"></el-table-column>
            <!-- 用户名 -->
            <el-table-column label="用户名称" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.user }}</p>

                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.user }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>

            <!-- 用户组 -->
            <el-table-column label="用户组" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>用户组: {{ scope.row.user_group }}</p>

                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.user_group }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>

            <!-- 日期 -->
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.create_date | filterDate}}</span>
              </template>
            </el-table-column>

            <!-- 操作 -->

            <el-table-column label="操作">
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

          <!-- 修改模态框 -->
          <el-dialog
            width="400px"
            class="hiddenselect"
            title="修改账号"
            :visible.sync="dialogFormVisible"
          >
            <!-- 修改表单 -->
            <el-form :model="editForm" :rules="rules" ref="editForm">
              <!-- 账号 -->
              <el-form-item
                prop="user"
                style="width: 320px;"
                label="账号"
                :label-width="formLabelWidth"
              >
                <el-input v-model="editForm.user" auto-complete="off"></el-input>
              </el-form-item>

              <!-- 用户组 -->
              <el-form-item prop="userGroup" label="用户组" :label-width="formLabelWidth">
                <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通用户" value="普通用户"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 批量删除 -->
          <div style="margin-top: 20px" class="buttonsure">
            <el-button @click="allDel" type="success">批量删除</el-button>
            <el-button @click="toggleSelection" type="danger">取消</el-button>
          </div>
          <!-- 页码 -->
          <div class="block page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 3, 5, 10, 20, 50]"
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
//引入moment
import moment from "moment";
import { filter } from "minimatch";
export default {
  data() {
    return {
      //账号表格数据
      tableData: [],
      //分页
      currentPage: 1, //当前页
      pageSize: 3,
      total: 0, //数据总条数

      //修改框的数据
      editForm: {
        user: "",
        userGroup: ""
      },
      editId: "", //要修改的数据id
      dialogFormVisible: false, // 模态框的显示和隐藏状态
      formLabelWidth: "100px",
      //定义修改表单的规则
      rules: {
        user: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "账号长度 3~6 位", trigger: "blur" } // 非空
        ]
      },
      //批量删除要选中的数组
      selectedId: []
    };
  },
  methods: {
    //按照分页请求数据
    getAccountListByPage() {
      //收集参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      //请求数据
      this.request
        .get("/account/accountlistbypage", params)
        .then(res => {
          //接收后端给的数据
          console.log(res);
          let { total, data } = res;
          //赋值
          this.total = total;
          this.tableData = data;
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
    //请求所有账号数据

    Allccountlist() {
      //发送请求，获取所有数据
      this.request
        .get("./account/accountlist")
        .then(res => {
          this.tableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },

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
            .get("/account/delaccount", params)
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
                this.getAccountListByPage();
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
    /* 编辑账号 */
    handleEdit(id) {
      // 显示模态框
      this.dialogFormVisible = true;
      //把要修改的id保存起来
      this.editId = id;
      //发送请求 把id发给后端
      this.request
        .get("/account/alteraccount", { id })
        .then(res => {
          //回填数据
          console.log(res, "数据");
          this.editForm.user = res[0].user;
          this.editForm.userGroup = res[0].user_group;

          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改框的确定修改
    saveEdit() {
      //获取整个表单验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          //关闭框
          this.dialogFormVisible = false;
          //收集数据
          let params = {
            user: this.editForm.user,
            userGroup: this.editForm.userGroup,
            editId: this.editId
          };
          //发送请求给后端
          this.request
            .post("/account/saveedtitaccount", params)
            .then(res => {
              //接收后端相应的数据
              let { code, reason } = res;
              if (code === 0) {
                //弹提示
                this.$message({
                  type: "success",
                  message: reason
                });
                //刷新列表
                this.Allccountlist();
              } else if (code === 1) {
                //弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    //表格
    headerStyle({ row }) {
      return "background: #cccc;   text-align: center"; //设置表头背景颜色
    },
    cellStyle({ row1 }) {
      return "text-align: center";
    },
    //分页每页条数的改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAccountListByPage();
      console.log(val);
    },
    //当前页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val);

      this.getAccountListByPage();
    },
    //勾选框取消
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    //当选中悬着框的状态让生变化，就会触发这个函数
    handleSelectionChange(val) {
      //获取选中的id放入一个数组
      this.selectedId = val.map(v => v.id);
      //是否拿到
      console.log(this.selectedId);
    },
    //批量删除
    allDel() {
      //当没有选中任何勾选框，点击批量删除，给提示信息。且失败
      if (!this.selectedId.length) {
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
            idArr: this.selectedId
          };
          //发送请求给后端
          this.request
            .get("/account/alldel", params)
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
                this.getAccountListByPage();
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
    }
  },
  //过滤---过滤时间
  filters: {
    //   //过滤时间
    filterDate(val) {
      return moment(val).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  //生命周期钩子函数vue实例对象创建完成 dom 还没有生成
  created() {
    this.getAccountListByPage();
  }
};
</script>








<style scoped  lang="less">
@import "./MenberAddccount.less";
</style>
<style lang="less">
.menber-addccount {
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
.menber-addccount  {
  .el-table__footer-wrapper,
  .el-table__header-wrapper {
    height: 70px;
    line-height: 60px;
  }
  .el-table .cell,
  .el-table th div {
    padding-right:0;
  }
}
</style>