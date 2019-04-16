<template>
  <div class="account-add">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <!-- 内容 -->
      <div class="text">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item class="two"  prop="cateName">
            <h4>*所属分类:</h4>
            <el-select v-model="ruleForm2.cateName" filterable placeholder="-- 选择分类 --" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品条形码 -->
          <el-form-item class="two" prop="barCode">
            <h4>*商品条形码:</h4>
            <el-input
              class="pro-input"
              ref="ruleForm2"
              placeholder="请输入内容"
              v-model="ruleForm2.barCode"
            ></el-input>
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item class="two" prop="productName">
            <h4>*商品名称:</h4>
            <el-input
              class="pro-input"
              placeholder="请输入内容"
              v-model="ruleForm2.productName"
              prop="productName"
            ></el-input>
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item class="two" prop="GoodsPrice">
            <h4>*商品售价:</h4>
            <el-input
              class="pro-input"
              placeholder="请输入内容"
              v-model="ruleForm2.GoodsPrice"
              prop="GoodsPrice"
            ></el-input>
            <span>元</span>
          </el-form-item>
          <!-- 市场价 -->
          <el-form-item class="two" prop="MarketPrice">
            <h4>市场价:</h4>
            <el-input class="pro-input" placeholder="请输入内容" v-model="ruleForm2.MarketPrice"></el-input>
            <span>元</span>
            <p>默认市场价为售价的1.2倍</p>
          </el-form-item>
          <!-- 商品进价 -->
          <el-form-item class="two" prop="GoodPurchasePrice">
            <h4>商品进价:</h4>
            <el-input class="pro-input" placeholder="请输入内容" v-model="ruleForm2.GoodPurchasePrice"></el-input>
            <span>元</span>
          </el-form-item>
          <!-- 入库数量 -->
          <el-form-item class="two" prop="LibrayNumber">
            <h4>入库数量:</h4>
            <el-input class="pro-input" placeholder="请输入内容" v-model="ruleForm2.LibrayNumber"></el-input>
            <p>记重商品单位为千克</p>
          </el-form-item>
          <!-- 商品重量 -->
          <el-form-item class="two" prop="GoodsWeight">
            <h4>商品重量:</h4>
            <el-input class="pro-input" placeholder="请输入内容" v-model="ruleForm2.GoodsWeight"></el-input>
          </el-form-item>
          <!-- 商品单位 -->
          <el-form-item class="two" prop="GoodsCompany">
            <h4>商品单位:</h4>
            <el-input class="pro-input" placeholder="请输入内容" v-model="ruleForm2.GoodsCompany"></el-input>
          </el-form-item>
          <!-- 会员优惠 -->
          <el-form-item class="two" prop="discount">
            <h4>会员优惠:</h4>
            <el-radio-group v-model="ruleForm2.discount">
              <el-radio v-model="radio" label="1">享受</el-radio>
              <el-radio v-model="radio" label="2">不享受</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 是否促销 -->
          <el-form-item class="two" prop="promotion">
            <h4>是否促销:</h4>
            <el-radio v-model="radio1" label="1-1">启用</el-radio>
            <el-radio v-model="radio1" label="2-2">禁用</el-radio>
          </el-form-item>
          <!-- 商品简介 -->
          <el-form-item class="product-brief" prop="productbrief">
            <h4>商品简介:</h4>
            <el-input
              class="product-brief-input"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="ruleForm2.textarea"
            ></el-input>
            <div>不超过200个汉字</div>
          </el-form-item>
          <!-- 按钮 -->
          <el-button type="success" @click="submitForm('ruleForm2')">添加</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    //商品名称不能为空
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("商品名称不能为空"));
      }
      callback();
    };
    //商品售价
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("商品价格不能为空"));
      }
      callback();
    };
    return {
      ruleForm2: {
        cateName: "",
        barCode: "",
        productName: "",
        GoodsPrice: "",
        MarketPrice: "",
        GoodPurchasePrice: "",
        LibrayNumber: "",
        GoodsWeight: "",
        GoodsCompany: "",
        discount: "",
        promotion: "",
        productbrief: ""
      },
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
      //定义规则
      rules2: {
        //商品名称
        productName: [{ validator: checkName, trigger: "blur" }],
        //商品售价
        GoodsPrice: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        //市场价
        user: [
          { required: true, message: "请输入市场价格", trigger: "blur" } //非空
        ]
      },
      value8: "",
      radio: "1",
      radio1: "1",
      barCode: "",
      from: {
        input: "",

        textarea: "",

        type: []
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //收集数据
          let params = {
            cateName: this.ruleForm2.cateName,
            barCode: this.ruleForm2.barCode,
            productName: this.ruleForm2.productName,
            GoodsPrice: this.ruleForm2.GoodsPrice,
            MarketPrice: this.ruleForm2.MarketPrice,
            GoodPurchasePrice: this.ruleForm2.GoodPurchasePrice,
            LibrayNumber: this.ruleForm2.LibrayNumber,
            GoodsWeight: this.ruleForm2.GoodsWeight,
            GoodsCompany: this.ruleForm2.GoodsCompany,
            discount: this.ruleForm2.discount,
            promotion: this.ruleForm2.promotion,
            productbrief: this.ruleForm2.productbrief
          };
          //发请求
          this.request
            .post("/account/goodsadd", params)
            .then(res => {
             let {code, reason}=res;
             if(code==0){
              this.$message({
                type:'success',
                message:reason
              })
             }else if(code==1){
               this.$message.error(reason)
             }
             this.$router.push('/home/Goodsmanage')
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
  /*   created() {
    //调用这个函数
    this.submitForm();
  } */
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