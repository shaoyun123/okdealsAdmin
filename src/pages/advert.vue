<template>
  <div>
    <div style="display: flex;justify-content: space-between;">
      <el-card class="box-card">
        <img src="../assets/logo.png" width="150" />
        <br />
        <img src="../assets/logo.png" width="20" />
        Fulfilled by Amazon
        <br />
        <span style="color: brown;font-size: 20px;font-weight: 600;">$ 5.00</span>
        <span style="text-decoration: line-through;">$ 10.99</span>
        <span style="border: 1px dotted indianred;padding: 4px;float: right;">80% OFF</span>
        <br />
        <i class="el-icon-s-comment"></i>
        <i style="float: right;" class="el-icon-s-comment"></i>
      </el-card>
      <el-card class="box-card" style="background-color: #AAAAAA;position: relative;">
        <div style="position: absolute;left: 50%;transform: translate(-50%,-50%);top: 50%;">
          <span style="color: rgb(255, 102, 0);font-size: 20px;font-weight: 900;">已失效</span>
        </div>

        <img src="../assets/logo.png" width="150" />
        <br />
        <img src="../assets/logo.png" width="20" />
        Fulfilled by Amazon
        <br />
        <span style="color: brown;font-size: 20px;font-weight: 600;">$ 5.00</span>
        <span style="text-decoration: line-through;">$ 10.99</span>
        <span style="border: 1px dotted indianred;padding: 4px;float: right;">80% OFF</span>
        <br />
        <i class="el-icon-s-comment"></i>
        <i style="float: right;" class="el-icon-s-comment"></i>
      </el-card>
      <el-card class="box-card" style="background-color: #AAAAAA;position: relative;">
        <div style="position: absolute;left: 50%;transform: translate(-50%,-50%);top: 50%;">
          <el-button>设置广告商品</el-button><br><br>
          <el-button>删除广告商品</el-button>
        </div>

        <img src="../assets/logo.png" width="150" />
        <br />
        <img src="../assets/logo.png" width="20" />
        Fulfilled by Amazon
        <br />
        <span style="color: brown;font-size: 20px;font-weight: 600;">$ 5.00</span>
        <span style="text-decoration: line-through;">$ 10.99</span>
        <span style="border: 1px dotted indianred;padding: 4px;float: right;">80% OFF</span>
        <br />
        <i class="el-icon-s-comment"></i>
        <i style="float: right;" class="el-icon-s-comment"></i>

      </el-card>
      <el-card class="box-card">
        <el-button>设置广告商品</el-button>
      </el-card>
      <el-card class="box-card">
        <el-button>设置广告商品</el-button>
      </el-card>
    </div>
    <div style="display: flex;justify-content: space-between;">
      <el-card class="box-card">
        <img src="../assets/logo.png" width="150" />
        <br />
        <img src="../assets/logo.png" width="20" />
        Fulfilled by Amazon
        <br />
        <span style="color: brown;font-size: 20px;font-weight: 600;">$ 5.00</span>
        <span style="text-decoration: line-through;">$ 10.99</span>
        <span style="border: 1px dotted indianred;padding: 4px;float: right;">80% OFF</span>
        <br />
        <i class="el-icon-s-comment"></i>
        <i style="float: right;" class="el-icon-s-comment"></i>
      </el-card>
      <el-card class="box-card">
        <el-button>设置广告商品</el-button>
      </el-card>
      <el-card class="box-card">
        <el-button>设置广告商品</el-button>
      </el-card>
      <el-card class="box-card">
        <el-button>设置广告商品</el-button>
      </el-card>
      <el-card class="box-card">
        <el-button>设置广告商品</el-button>
      </el-card>
    </div>
  </div>

</template>

<script>
  import {
    Table,
    Button,
    Card,
    Form,
    Input,
    Dialog,
    Switch,
    TableColumn,
    FormItem,
    Select,
    Option,
    Row,
    Col
  } from 'element-ui'

  export default {
    components: {
      [Table.name]: Table,
      [Button.name]: Button,
      [Card.name]: Card,
      [Form.name]: Form,
      [Input.name]: Input,
      [Dialog.name]: Dialog,
      [Switch.name]: Switch,
      [TableColumn.name]: TableColumn,
      [FormItem.name]: FormItem,
      [Select.name]: Select,
      [Option.name]: Option,
      [Row.name]: Row,
      [Col.name]: Col
    },
    data() {
      return {}
    }
  }
</script>

<style>
</style>
