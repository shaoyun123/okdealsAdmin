<template>
  <div>
    <div style="height: 200px;width:300px;position: absolute;">
      <div class="row" style="margin-bottom: 15px;">
        <div class="col-md-12 text-center">
          <img
            src="../assets/logo.png"
            width="80px"
            style="border-radius: 50%; margin-bottom: 15px;"
          />
          <p>{{ email }}</p>
          <p>Points: <span class="text-cbb">0</span></p>
        </div>
      </div>
    </div>
    <el-tabs
      :tab-position="tabPosition"
      @tab-click="handleClick"
      style="height: 200px;"
    >
      <el-tab-pane label="面板">
        <dashboard></dashboard>
      </el-tab-pane>
      <el-tab-pane label="店铺">
        <shop></shop>
      </el-tab-pane>
      <el-tab-pane label="产品">
        <product></product>
      </el-tab-pane>
      <el-tab-pane label="广告">
        <advert></advert>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-card class="box-card">
          <div class="login-form">
            <div class="input">
              <input
                type="text"
                placeholder="请输入原始密码"
                v-model="changePWD.loginPwd"
              />
            </div>
            <div class="input">
              <input
                type="password1"
                placeholder="请输入新密码"
                v-model="changePWD.newLoginPwd"
              />
            </div>
            <div class="input">
              <input
                type="password2"
                placeholder="再次输入新密码"
                v-model="changePWD.newLoginPwd1"
              />
            </div>
            <div class="btn-box">
              <a href="javascript:;" class="btn" @click="saveNewPsd()">提 交</a>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <!-- <el-tab-pane label="退出">退出</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import dashboard from './dashboard.vue'
import shop from './shop.vue'
import product from './product.vue'
import advert from './advert.vue'

import {
  Tabs,
  TabPane,
  Button,
  Card,
  Form,
  Input,
  Radio,
  row,
  col
} from 'element-ui'

export default {
  components: {
    dashboard,
    shop,
    product,
    advert,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Button.name]: Button,
    [Card.name]: Card,
    [Form.name]: Form,
    [Input.name]: Input,
    [Radio.name]: Radio,
    [row.name]: row,
    [col.name]: col
  },
  data() {
    return {
      tabPosition: 'right',
      activeName: 'first',
      username: '',
      password1: '',
      password2: '',
      changePWD: {},
      email: ''
    }
  },
  mounted() {
    this.email = this.$store.state.USERINFO.email
  },
  methods: {
    handleClick(tab, event) {
      window.console.log(tab, event)
    },
    saveNewPsd() {
      if (this.changePWD.newLoginPwd === this.changePWD.newLoginPwd1) {
        this.$store
          .dispatch('changepwd', this.changePWD)
          .then((res) => {
            if (res.message === 'ok') {
              this.$message({
                message: '修改成功，即将跳转登录页',
                type: 'success'
              })
              // 清除jwt和session

              this.$router.replace({
                path: '/login'
              })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
          .catch((err) => {
            this.$message({
              message: err.message,
              type: 'error'
            })
          })
      } else {
        this.$message({
          message: '两次密码不一致',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.el-tabs {
  height: 100% !important;
  min-height: 600px !important;
}

.el-tabs--right .el-tabs__header.is-right {
  width: 300px;
  top: 200px;
  float: left;
  margin-bottom: 0;
  margin-left: 10px;
}

.el-tabs__item.is-active,
.el-tabs__item:hover {
  color: #f93;
}

.el-tabs__active-bar.is-right {
  background-color: #f93;
}

.el-tabs--right .el-tabs__item.is-right {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-weight: 600;
}

.login-form {
  box-sizing: border-box;
  padding-left: 31px;
  padding-right: 31px;
  width: 410px;
  height: 510px;

  .input {
    display: inline-block;
    width: 348px;
    height: 50px;
    border: 1px solid #e5e5e5;
    margin-bottom: 20px;

    input {
      width: 100%;
      height: 100%;
      border: none;
      padding: 18px;
    }
  }

  .btn {
    width: 100%;
    line-height: 50px;
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>
