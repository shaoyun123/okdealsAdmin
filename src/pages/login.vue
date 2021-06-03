<template>
  <div class="login">
    <div class="header">
      <div class="nav-topbar">
        <div class="container">
          <div class="topbar-menu">
            <a
              href="/#/index"
              style="background-color: #131921;color: #f93;font-weight: 600;font-size:18px;"
              >卖家中心</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <div class="input">
            <input
              type="text"
              placeholder="请输入邮箱"
              v-model="formLogin.email"
            />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="formLogin.loginPwd"
            />
          </div>
          <a href="/#/forgetPassword" style="color: #2D8CF0">忘记密码</a>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="handleSubmit">登 录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      formLogin: {
        email: '',
        loginPwd: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.formLogin.email === '') {
        this.$message({
          message: '请输入邮箱',
          type: 'error'
        })
        return
      }
      if (this.formLogin.loginPwd === '') {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
        return
      }
      this.$store
        .dispatch('login', this.formLogin)
        .then((res) => {
          if (res.data) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$router.replace({
              path: '/index'
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
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  .container {
    margin-top: 10%;
    display: flex;
    justify-content: center;

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
  }
}
</style>
