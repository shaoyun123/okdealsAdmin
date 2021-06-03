<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="productSearchData.region" placeholder="分类">
          <div v-for="(item,index) in getProductsClassify" :key="index">
            <el-option
              :label="item.categoryName"
              :value="item.id"
              :index="item.id"
            ></el-option>
          </div>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="productSearchData.salesSite" placeholder="站点">
          <el-option label="美国" value="US"></el-option>
          <el-option label="德国" value="DE"></el-option>
          <el-option label="英国" value="GB"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="productSearchData.storeName"
          placeholder="店铺名"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="productSearchData.couponCode"
          placeholder="折扣码"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="productSearchData.promotionStatus">
          <el-option label="全部状态" value=""></el-option>
          <el-option label="未推广" value="0"></el-option>
          <el-option label="推广中" value="1"></el-option>
          <el-option label="停止推广" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="productSearchData.region123456789">
          <el-option label="全部" value="0"></el-option>
          <el-option label="投诉未处理" value="1"></el-option>
          <el-option label="评论未读" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="productSearchData.asin"
          placeholder="ASIN"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          style="background-color: #FF6600;color: #FFF;"
          @click="searchAllProducts"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" :offset="4">
        <el-button
          style="background-color: #009688;color: #FFF;"
          @click="addProduct"
          ><i class="el-icon-plus"></i> 添加商品
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="productsTableData" style="width: 100%">
      <el-table-column width="65" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <img :src="scope.row.firstImageUrl" width="50" />
        </template>
      </el-table-column>
      <el-table-column label="ASIN">
        <template slot-scope="scope">
          <span
            @click="toggleDialog1"
            style="color: #1890FF;cursor: pointer;"
            >{{ scope.row.asin }}</span
          ><br />
          <span>{{ scope.row.salesSite }}{{ scope.row.storeName }}</span
          ><br />
          <span>amazon okdeals</span>
        </template>
      </el-table-column>
      <el-table-column label="原始价/折后价">
        <template slot-scope="scope">
          <span>{{ scope.row.salePrice }}(USD)</span><br />
          <span>{{ scope.row.discountPrice }}(USD)</span>
          <span
            v-if="scope.row.discountType === 1"
            style="border: 1px dotted indianred;padding: 4px;float: right;"
            >{{ scope.row.discountValue * 100 }}% OFF</span
          >
          <span
            v-if="scope.row.discountType === 2"
            style="border: 1px dotted indianred;padding: 4px;float: right;"
            >直降金额{{ scope.row.discountValue }}(USD)</span
          >
        </template>
      </el-table-column>
      <el-table-column label="每日最大发放量">
        <template slot-scope="scope">
          <span>{{ scope.row.dailyAllowNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单量/总领取量">
        <template slot-scope="scope">
          <span>{{ scope.row.soldNum }}</span
          ><br />
          <span>{{ scope.row.soldNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品表现">
        <template slot-scope="scope">
          <!-- 评论 -->
          <svg class="icon" aria-hidden="true" @click="toggleDialog2">
            <use xlink:href="#icon-xinxi"></use>
          </svg>
          <span>{{ scope.row.commentNum }}</span>
          <!-- 收藏 -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-02"></use>
          </svg>
          <span>{{ scope.row.wishNum }}</span>
          <!-- 点赞 -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tubiaozhizuomoban-20"></use>
          </svg>
          <span>{{ scope.row.starNum }}</span>
          <!-- 踩 -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tubiaozhizuomoban-21"></use>
          </svg>
          <span>0</span>
          <!-- <span @click="toggleDialog2">{{ scope.row.date }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="折扣码" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.couponCode }}</span
          ><br />
          {{ scope.row.couponStartTime }} ~ {{ scope.row.couponEndTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="1" :visible.sync="dialogFormVisible1">
      <el-button-group>
        <el-button>点赞</el-button>
        <el-button>收藏</el-button>
        <el-button>领券</el-button>
        <el-button>下单</el-button>
      </el-button-group>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="买家">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible1 = false"
          >保 存</el-button
        >
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="评论" :visible.sync="dialogFormVisible2">
      <el-button-group>
        <el-button>未读</el-button>
        <el-button>已读</el-button>
      </el-button-group>
      <el-button style="background-color: #FF6600;color: #FFF;float: right;"
        >批量回复</el-button
      >
      <el-input style="width: 300px;float: right;"></el-input>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="优惠券编码"> </el-table-column>
        <el-table-column prop="name" label="评论信息"> </el-table-column>
        <el-table-column prop="name" label="创建日期"> </el-table-column>
        <el-table-column prop="name" label="买家"> </el-table-column>
        <el-table-column>
          <template>
            <el-button size="mini">回复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2 = false"
          >保 存</el-button
        >
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="商品信息"
      :visible.sync="ProductInformation"
      width="800px"
    >
      <el-form
        :inline="true"
        :rules="productDialogrules"
        ref="productDialog"
        :model="productDialog"
        label-width="120px"
      >
        <el-form-item label="店铺" prop="sellerStoreAmazonId">
          <el-input v-model="productDialog.sellerStoreAmazonId"></el-input>
          <!-- <el-select v-model="productDialog.salesSite" placeholder="站点">
            <el-option label="美国" value="US"></el-option>
            <el-option label="德国" value="DE"></el-option>
            <el-option label="英国" value="GB"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="站点" prop="salesSite">
          <el-select v-model="productDialog.salesSite" placeholder="站点">
            <el-option label="美国" value="US"></el-option>
            <el-option label="德国" value="DE"></el-option>
            <el-option label="英国" value="GB"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品分类" prop="prodCategoryId1">
          <!-- <el-select v-model="productDialog.prodCategoryId" placeholder="请选择" @change="prodCategoryId($event)"> -->
          <el-select
            v-model="productDialog.prodCategoryId1"
            placeholder="请选择"
          >
            <el-option
              v-for="item in getProductsClassifyDialog"
              :label="item.categoryName"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ASIN" prop="asin">
          <el-input v-model="productDialog.asin"></el-input>
        </el-form-item>
        <el-form-item label="使用范围" prop="couponAvailableRange">
          <el-select
            v-model="productDialog.couponAvailableRange"
            placeholder="请选择"
          >
            <el-option label="无变体" value="1"></el-option>
            <el-option label="适用所有变体" value="2"></el-option>
            <el-option label="适用部分变体" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运送方式" prop="transportMode">
          <el-select v-model="productDialog.transportMode" placeholder="请选择">
            <el-option label="亚马逊发货" value="1"></el-option>
            <el-option label="商家发货" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣类型" prop="discountType">
          <el-select v-model="productDialog.discountType" placeholder="请选择">
            <el-option label="百分比折扣" value="1"></el-option>
            <el-option label="直降金额" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣金额" prop="discountValue">
          <el-input
            type="number"
            min="0"
            v-model="productDialog.discountValue"
            placeholder="最多支持两位小数"
          ></el-input>
        </el-form-item>
        <br />
        折扣码信息
        <br />
        <el-form-item label="折扣码类型" prop="couponCodeType">
          <el-radio-group v-model="productDialog.couponCodeType">
            <el-radio
              value="1"
              label="长码，每个消费者领取单独的折扣码，每个折扣码仅可使用一次。"
            ></el-radio
            ><br />
            <el-radio
              value="2"
              label="短码，所有消费者可重复使用（推荐）"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="折扣码" prop="couponCode">
          <el-input
            type="textarea"
            v-model="productDialog.couponCode"
            placeholder="一行一个"
            style="width: 300%;"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="有效时间" prop="couponStartTime">
          <el-col :span="11">
            <el-date-picker
              v-model="productDialog.couponStartTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11" prop="couponEndTime">
            <el-date-picker
              v-model="productDialog.couponEndTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="每天最多发放量" prop="dailyAllowNum">
          <el-input
            v-model="productDialog.dailyAllowNum"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动性质" prop="type1">
          <el-checkbox-group v-model="productDialog.type1">
            <el-checkbox
              label="我已清楚推广中且未生效的折扣码会导致产品停止推广"
            ></el-checkbox
            ><br />
            <!-- <el-checkbox label="我已清楚如何保护我的库存"></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="type2">
          <el-checkbox-group v-model="productDialog.type2">
            <el-checkbox label="我已清楚如何保护我的库存" name=""></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('productDialog')"
            >保 存</el-button
          >
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProduct">保 存</el-button>
        <el-button @click="ProductInformation = false">取 消</el-button>
      </div> -->
    </el-dialog>
  </el-card>
</template>

<script>
import {
  TableColumn,
  Table,
  Button,
  Card,
  Form,
  Input,
  Dialog,
  Select,
  FormItem,
  MessageBox,
  Switch,
  // ButtonGroup,
  Option,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  DatePicker,
  TimePicker,
  Row,
  Col
} from 'element-ui'

export default {
  components: {
    [TableColumn.name]: TableColumn,
    [Table.name]: Table,
    [Button.name]: Button,
    [Card.name]: Card,
    [Form.name]: Form,
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    [Select.name]: Select,
    [FormItem.name]: FormItem,
    [MessageBox.name]: MessageBox,
    [Switch.name]: Switch,
    // [ButtonGroup.name]: ButtonGroup,
    [Option.name]: Option,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [DatePicker.name]: DatePicker,
    [TimePicker.name]: TimePicker,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data() {
    return {
      productsTableData: [],
      tableData: [],
      newForm: {
        name: ''
      },
      productSearchData: {
        region: '',
        salesSite: '',
        storeName: '',
        couponCode: '',
        asin: ''
      },
      productDialog: {
        sellerStoreAmazonId: '',
        salesSite: '',
        prodCategoryId1: '1',
        prodCategoryId: 1,
        asin: '',
        couponAvailableRange: '',
        transportMode: '',
        discountType: '',
        discountValue: '',
        couponCodeType: '',
        couponCode: '',
        couponStartTime: '',
        couponEndTime: '',
        dailyAllowNum: '',
        type1: [],
        type2: []
      },
      // prodCategoryId:'',
      productDialogrules: {
        sellerStoreAmazonId: [
          {
            required: true,
            message: '请输入店铺名称',
            trigger: 'blur'
          }
        ],
        salesSite: [
          {
            required: true,
            message: '请选择站点',
            trigger: 'change'
          }
        ],
        prodCategoryId1: [
          {
            required: true,
            message: '请选择产品分类',
            trigger: 'change'
          }
        ],
        asin: [
          {
            required: true,
            message: '请输入输入ASIN',
            trigger: 'blur'
          }
        ],
        couponAvailableRange: [
          {
            required: true,
            message: '请选择适用范围',
            trigger: 'change'
          }
        ],
        transportMode: [
          {
            required: true,
            message: '请选择运送方式',
            trigger: 'change'
          }
        ],
        discountType: [
          {
            required: true,
            message: '请选择折扣类型',
            trigger: 'change'
          }
        ],
        discountValue: [
          {
            required: true,
            message: '请输入折扣金额',
            trigger: 'blur'
          }
        ],
        couponCodeType: [
          {
            required: true,
            message: '请选择折扣码类型',
            trigger: 'change'
          }
        ],
        couponCode: [
          {
            required: true,
            message: '请填写折扣码',
            trigger: 'blur'
          }
        ],
        couponStartTime: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'change'
          }
        ],
        couponEndTime: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
          }
        ],
        dailyAllowNum: [
          {
            required: true,
            message: '请输入每天最多发放量',
            trigger: 'blur'
          }
        ],
        type1: [
          {
            type: 'array',
            required: true,
            message: '请12345678',
            trigger: 'change'
          }
        ],
        type2: [
          {
            type: 'array',
            required: true,
            message: '请12345678',
            trigger: 'change'
          }
        ]
      },
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      ProductInformation: false,
      getProductsClassify: [],
      getProductsClassifyDialog: []
    }
  },
  mounted() {
    this.$store
      .dispatch('getProductsClassify')
      .then((res) => {
        if (res.message === 'ok') {
          this.getProductsClassify = res.data
          this.getProductsClassifyDialog = res.data
        } else {
          this.message(res.message)
        }
      })
      .catch((err) => {
        this.message(err.message)
      })
  },
  methods: {
    message(msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    },
    // newReplace(str,olddata,newdata){
    //   var reg = new RegExp(olddata , "g")
    //   return str.replace(reg , newdata);
    // },
    handleEdit(index, row) {
      window.console.log(index, row)
    },
    handleDelete(index, row) {
      window.console.log(index, row)
    },
    toggleDialog1() {
      const that = this
      that.dialogFormVisible1 = true
    },
    toggleDialog2() {
      const that = this
      that.dialogFormVisible2 = true
    },
    // 添加商品
    addProduct() {
      const that = this
      that.ProductInformation = true
    },
    // 保存商品信息
    // saveProduct() {
    //   this.ProductInformation = false
    //   this.$store.dispatch('addProduct', this.productDialog).then(res => {
    //     if (res.message == "ok") {
    //       // this.productsTableData = res.data
    //       this.$message({
    //         message: "添加成功",
    //         type: 'success'
    //       });
    //     } else {
    //       this.message(res.message)
    //     }
    //   }).catch(err => {
    //     this.message(err.message)
    //   })
    // },
    // prodCategoryId($event){
    //   this.productDialog.prodCategoryId = event.target.value; //获取option对应的value值
    // },
    getNewDate(date) {
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : 0 + (date.getMonth() + 1)) +
        '-' +
        (date.getDate() > 9 ? date.getDate() + 1 : 0 + (date.getDate() + 1)) +
        ' ' +
        (date.getHours() > 9
          ? date.getHours() + 1
          : 0 + (date.getHours() + 1)) +
        ':' +
        (date.getMinutes() > 9
          ? date.getMinutes() + 1
          : 0 + (date.getMinutes() + 1)) +
        ':' +
        (date.getSeconds() > 9
          ? date.getSeconds() + 1
          : 0 + (date.getSeconds() + 1))
      )
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ProductInformation = false
          // const couponStartTime = new Date(this.productDialog.couponStartTime)
          // const couponEndTime = new Date(this.productDialog.couponEndTime)
          // // this.productDialog.couponEndTime = this.getNewDate(this.productDialog.couponEndTime)
          // // this.productDialog.couponStartTime = this.getNewDate(this.productDialog.couponStartTime)
          this.productDialog.couponEndTime = '2021-06-30 11:11:02'
          this.productDialog.couponStartTime = '2021-05-26 11:11:02'
          this.productDialog.prodCategoryId = 1
          this.productDialog.couponCode = this.productDialog.couponCode.replace(
            /\n/g,
            ','
          )
          this.productDialog.couponCodeType ===
          '长码，每个消费者领取单独的折扣码，每个折扣码仅可使用一次。'
            ? (this.productDialog.couponCodeType = 1)
            : (this.productDialog.couponCodeType = 2)
          // this.couponCode
          this.$store
            .dispatch('addProduct', this.productDialog)
            .then((res) => {
              console.log(res)
              if (res.message === 'ok') {
                // this.productsTableData = res.data
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } else {
                this.message(res.message)
              }
            })
            .catch((err) => {
              this.message(err.message)
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 搜索商品
    searchAllProducts() {
      console.log(123)
      this.$store
        .dispatch('searchProducts', this.productSearchData)
        .then((res) => {
          if (res.message === 'ok') {
            this.productsTableData = res.data
            this.$message({
              message: '查询成功',
              type: 'success'
            })
          } else {
            this.message(res.message)
          }
        })
        .catch((err) => {
          this.message(err.message)
        })
    }
  }
}
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-input__inner {
  width: 217px !important;
}
</style>
