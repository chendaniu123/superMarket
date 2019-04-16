<template>
  <div id="box">
    <el-row class="tac">
      <el-col :span="12">
        <h5>华联超市管理系统</h5>
        <el-menu
          default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#cccc"
          active-text-color="yellow"
          unique-opened
          router
        >
          <!-- 分类管理 -->
          <el-submenu index="1">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>分类管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/SortManagement">分类管理</el-menu-item>
            <el-menu-item index="/home/classifyadd">分类添加</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/Goodsmanage">商品管理</el-menu-item>
            <el-menu-item index="/home/Goodsadd">添加商品</el-menu-item>
          </el-submenu>

          <!-- 进货管理 -->
          <el-submenu index="3">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>进货管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/stockcontrol">库存管理</el-menu-item>
            <el-menu-item index="/home/addineventory">添加库存</el-menu-item>
          </el-submenu>

          <!-- 出货管理 -->
          <el-submenu index="4">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-news"></i>
              <span>出货管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/saleslist">销售列表</el-menu-item>
            <el-menu-item index="/home/ountboundgoods">商品出库</el-menu-item>
            <el-menu-item index="/home/shippinggoods">商品出货</el-menu-item>
          </el-submenu>

          <!-- 统计管理 -->
          <el-submenu index="5">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>统计管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/salesatistics">销售统计</el-menu-item>
            <el-menu-item index="/home/stockstatistics">进货统计</el-menu-item>
          </el-submenu>

          <!-- 账号管理 -->
          <el-submenu index="6">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-upload"></i>
              <span>账号管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/Accountmanage">账号管理</el-menu-item>
            <el-menu-item index="/home/Accountadd">添加账号</el-menu-item>
            <el-menu-item index="/home/Passwordmodify">密码修改</el-menu-item>
          </el-submenu>

          <!-- 会员管理 -->
          <el-submenu index="7">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-service"></i>
              <span>会员管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/menberaccountmanage">账号管理</el-menu-item>
            <el-menu-item index="/home/menberaddaccount">添加账号</el-menu-item>
          </el-submenu>
          <!-- 个人中心 -->
          <el-submenu index="7">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-service"></i>
              <span>个人中心</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/person">个人中心</el-menu-item>
          </el-submenu>

          <!-- 系统管理 -->
          <el-submenu index="8">
            <!-- 图标和标题 -->
            <template slot="title">
              <i class="el-icon-rank"></i>
              <span>系统管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/systeminfo">系统信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  
  }

};
</script>

<style lang="less">
#box {
  .el-col-12 {
    width: 100%;
    .home .el-container .el-aside {
      color: aliceblue;
    }
  }
  .el-submenu {
    width: 200px;
    .el-menu {
      border: none;
    }
  }
}
</style>