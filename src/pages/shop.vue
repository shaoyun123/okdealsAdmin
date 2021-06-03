<template>
  <div>
    <el-card class="box-card">
      <el-form
        ref="form"
        :model="shopSearch"
        style="display: flex;justify-content: space-between;"
      >
        <div>
          <el-input
            style="width: 300px;"
            v-model="shopSearch.storeAlias"
            placeholder="别名"
          ></el-input>
          <el-select v-model="shopSearch.status" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="已启用" value="1"></el-option>
            <el-option label="已停用" value="0"></el-option>
          </el-select>
          <el-button
            @click="shopSearchFunc"
            style="background-color: #FF6600;color: #FFF;"
            >搜索</el-button
          >
        </div>
        <div>
          <el-button
            @click="addStoreFunc"
            style="background-color: #009688;color: #FFF;"
            ><i class="el-icon-plus"></i> 添加亚马逊店铺</el-button
          >
        </div>
      </el-form>
      <el-table :data="shopTableData" style="width: 100%">
        <el-table-column width="65" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeShopSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="别名">
          <template slot-scope="scope">
            <span>{{ scope.row.storeAlias }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Amazon SellerID">
          <template slot-scope="scope">
            <span>{{ scope.row.sellerIdAmazon }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Amazon 店铺名">
          <template slot-scope="scope">
            <span>{{ scope.row.storeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editStoreFunc(scope.$index, scope.row)"
              >编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="StoreDialog"
      v-if="StoreDialog"
      @close="closeDialog"
      width="600px"
    >
      <el-form
        ref="addStore"
        :model="addStore"
        :rules="rules"
        label-width="130px"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="Amazon SellerID" prop="sellerIdAmazon">
              <el-input v-model="addStore.sellerIdAmazon"></el-input>
            </el-form-item>
            <el-form-item label="Amazon 店铺名" prop="storeName">
              <el-input v-model="addStore.storeName"></el-input>
            </el-form-item>
            <el-form-item label="别名" prop="storeAlias">
              <!-- <el-input v-model="addStore.storeAlias" @input="storeAliasUniqueFunc"></el-input> -->
              <el-input v-model="addStore.storeAlias"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button>如何得到</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-button type="primary" @click="submitForm('addStore')"
            >保 存</el-button
          >
          <el-button @click="closeDialog">取消</el-button>
        </el-row>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('addStore')">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div> -->
    </el-dialog>
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
    return {
      shopTableData: [],
      shopSearch: {},
      addStore: {
        sellerIdAmazon: '',
        storeName: '',
        storeAlias: ''
      },
      // updateStoreStatus:{
      //   sellerIdAmazon: '',
      //   storeName: '',
      //   storeAlias: '',
      //   status:''
      // }
      StoreDialog: false,
      dialogTitle: '',
      rules: {
        sellerIdAmazon: [
          {
            required: true,
            message: '请输入Amazon SellerID',
            trigger: 'blur'
          }
        ],
        storeName: [
          {
            required: true,
            message: '请输入Amazon 店铺名',
            trigger: 'blur'
          }
        ],
        storeAlias: [
          {
            required: true,
            message: '请输入别名',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    message(msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveStoreFunc()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    closeDialog() {
      this.StoreDialog = false
      this.addStore = {
        sellerIdAmazon: '',
        storeName: '',
        storeAlias: ''
      }
    },
    addStoreFunc() {
      this.StoreDialog = true
      this.dialogTitle = '添加亚马逊店铺'

      // this.addStore.storeName = row.storeName
      // this.addStore.storeAlias = row.storeAlias

      // this.addStore.id = row.id
      // this.addStore.salesSite = row.salesSite
      // this.addStore.sellerIdAmazon = row.sellerIdAmazon
      // this.addStore.status = row.status
    },
    saveStoreFunc() {
      this.StoreDialog = true
      if (this.dialogTitle === '修改亚马逊店铺') {
        this.$store
          .dispatch('editStore', this.addStore)
          .then((res) => {
            if (res.message === 'ok') {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.StoreDialog = false
              this.shopSearchFunc()
            } else {
              this.message(res.message)
            }
          })
          .catch((err) => {
            this.message(err.message)
          })
      } else if (this.dialogTitle === '添加亚马逊店铺') {
        this.$store
          .dispatch('saveStore', this.addStore)
          .then((res) => {
            if (res.message === 'ok') {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.StoreDialog = false
              this.shopSearchFunc()
            } else {
              this.message(res.message)
            }
          })
          .catch((err) => {
            this.message(err.message)
          })
      }
    },
    editStoreFunc(index, row) {
      this.StoreDialog = true
      this.dialogTitle = '修改亚马逊店铺'
      this.addStore.storeName = row.storeName
      this.addStore.storeAlias = row.storeAlias

      this.addStore.id = row.id
      this.addStore.salesSite = row.salesSite
      this.addStore.sellerIdAmazon = row.sellerIdAmazon
      this.addStore.status = row.status
    },
    // 搜索
    shopSearchFunc() {
      this.$store
        .dispatch('searchStore', this.shopSearch)
        .then((res) => {
          if (res.message === 'ok') {
            this.shopTableData = res.data
          } else {
            this.message(res.message)
          }
        })
        .catch((err) => {
          this.message(err.message)
        })
    },
    // 更新店铺状态
    changeShopSwitch(row) {
      this.$store
          .dispatch('editStore', row)
          .then((res) => {
            if (res.message === 'ok') {
              this.$message({
                message: '更新状态成功',
                type: 'success'
              })
              this.StoreDialog = false
              this.shopSearchFunc()
            } else {
              this.message(res.message)
            }
          })
          .catch((err) => {
            this.message(err.message)
          })
    }
    // 别名唯一
    // storeAliasUniqueFunc() {
    //   this.$store.dispatch('storeAliasUnique', this.addStore.storeAlias)
    // }
  }
}
</script>
