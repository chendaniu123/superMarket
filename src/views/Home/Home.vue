<template>
  <div class="home">
        <el-container>
          <!-- 左侧 -->
          <el-aside width="200px">
            <LeftNav></LeftNav>
            </el-aside>
          <!-- 右侧 -->
            <el-container>
              <!-- 头 -->
              <el-header>
              <!--   <h2>欢迎您 admin</h2>
                <p>添加管理员账号</p> -->
                <Top ref="top"></Top>
                </el-header>
              <!-- 中 -->
              <el-main>
                 
                <router-view @A="B"></router-view>
              
                </el-main>
              <!-- 尾 -->
              <el-footer>
                <Button></Button>
               <!--  <h5>@copyright2018 华联超市管理系统</h5> -->
              </el-footer>
            </el-container>
    </el-container>
  
   
  </div>

</template>

<script>
  //引入组件
  import LeftNav from '@/components/LeftNav/LeftNav.vue';
  //引入main组件
 import Main from '@/components/Main/Main.vue';
 //引入头部组件
 import Top from '@/components/top/Top.vue';
 //引入底部组件
 import Button from '@/components/Button/Button.vue'

export default {
  //注册组件
  components:{
    LeftNav,
    Main,
    Top,
    Button
  },
  methods:{
    B(){
      this.$refs.top.getUserInfo()
    }
  }
}
</script>

<style lang="less">
 @import './home.less';
</style>