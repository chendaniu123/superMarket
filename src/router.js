import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home/Home.vue'
// import New from '@/views/New.vue'


Vue.use(Router)

export default new Router({
    routes: [
        //登陆页面
        {
            path: "/login",
            component: () =>
                import ('./views/Login/Login.vue')
        },
        //根目录重定向，直接跳到登陆页面
        {
            path: '/',
            redirect: "/login",
        },
        //后台主界面
        {
            path: '/home',
            name: 'home',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Home/Home.vue'),
            //重定向
            redirect: "/home/systeminfo",
            children: [{
                    /* 系统信息 */
                    path: "/home/systeminfo",
                    component: () =>
                        import ("./views/Systeminfo/Systeminfo.vue") //组件
                },
                /* 个人中心 */
                {
                    path: "/home/person",
                    component: () =>
                        import ("./views/person/person.vue") //组件
                },
                /* 账号添加 */
                {
                    path: "/home/Accountadd",
                    component: () =>
                        import ("./views/AccountAdd/AccountAdd.vue")
                },
                /* 账号管理 */
                {
                    path: "/home/Accountmanage",
                    component: () =>
                        import ("./views/AccountManage/AccountManage.vue")
                },
                /* 密码修改 */
                {
                    path: "/home/Passwordmodify",
                    component: () =>
                        import ("./views/PasswordModifg/PasswordModifg.vue")
                },
                /* 商品添加 */
                {
                    path: "/home/Goodsadd",
                    component: () =>
                        import ("./views/GoodSadd/GoodSadd.vue")
                },
                /* 商品管理 */
                {
                    path: "/home/Goodsmanage",
                    component: () =>
                        import ("./views/GoodsManage/GoodsManage.vue")
                },
                /* 统计 */
                {
                    path: "/home/salestotal",
                    component: () =>
                        import ("./views/SalseTotal/SalseTotal.vue")
                },
                /* 进货 */
                {
                    path: "/home/stocktotal",
                    component: () =>
                        import ("./views/StockTotal/StockTotal.vue")
                },
                /* 分类添加 */
                {
                    path: '/home/classifyadd',
                    component: () =>
                        import ('./views/ClassifyAdd/ClassifyAdd.vue')
                },
                /* 分类管理 */
                {
                    path: "/home/SortManagement",
                    component: () =>
                        import ("./views/SortManagement/SortManagement.vue")
                },
                /* 进货管理中的库存管理 */
                {
                    path: "/home/stockcontrol",
                    component: () =>
                        import ('./views/StockControl/StockControl.vue')
                },
                /* 进货管理中的添加库存 */
                {
                    path: "/home/addineventory",
                    component: () =>
                        import ('./views/AddInventory/AddIneventory.vue')
                },
                /* 出货管理中的销售列表*/
                {
                    path: "/home/saleslist",
                    component: () =>
                        import ('./views/SalesList/SalesList.vue')
                },
                /* 出货管理中的商品出库*/
                {
                    path: "/home/ountboundgoods",
                    component: () =>
                        import ('./views/OutboundGoods/OutboundGoods.vue')
                },
                /* 出货管理中的商品出货*/
                {
                    path: "/home/shippinggoods",
                    component: () =>
                        import ('./views/ShippingGoods/ShippingGoods.vue')
                },
                /* 统计管理中的销售统计*/
                {
                    path: "/home/salesatistics",
                    component: () =>
                        import ('./views/SalesStatistics/SalesSatistics.vue')
                },
                /* 统计管理中的进货统计*/
                {
                    path: "/home/stockstatistics",
                    component: () =>
                        import ('./views/SalesStatistics/SalesSatistics.vue')
                },
                /*会员管理中的账号管理*/
                {
                    path: "/home/menberaccountmanage",
                    component: () =>
                        import ('./views/MenberAccountmanage/MenberAccountmanage.vue')
                },
                /*会员管理中的添加账号*/
                {
                    path: "/home/menberaddaccount",
                    component: () =>
                        import ('./views/MenberAddccount/MenberAddccount.vue')
                }
            ]
        }
    ]
})