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
    <div style="left: 50%;margin-left: -400px;width: 800px;position: relative;">
      <el-steps :active="active" finish-status="success" style="transform: scale(1.5);margin-top: 20px;">
        <el-step title="输入邮箱"></el-step>
        <el-step title="输入邮箱验证码"></el-step>
        <el-step title="重置密码"></el-step>
      </el-steps>
    </div>

    <div class="wrapper">
      <div class="login-form">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }" v-if="active===0">
          <el-form label-width="0">
            <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
              <el-form-item :error="errors[0]">
                <el-input v-model="forgetPassword.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </ValidationProvider>
            <div class="btn-box">
              <a href="javascript:;" class="btn" @click="handleSubmit(onSubmit1)">下一步</a>
            </div>
          </el-form>
        </ValidationObserver>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }" v-if="active===1">
          <el-form label-width="0">
            <div style="display: flex;justify-content: space-between;">
              <div>
                <div class="inline-item">
                  <img :src="captchaImg" @click="updateImg" />
                </div>
              </div>
              <div>
                <ValidationProvider rules="required" name="图片验证码" title="imgcaptcha" v-slot="{ errors }">
                  <el-form-item :error="errors[0]">
                    <el-input v-model="forgetPassword.imageCode" type="number" placeholder="请输入图片验证码"></el-input>
                  </el-form-item>
                </ValidationProvider>
              </div>
            </div>
             <div style="display: flex;justify-content: space-between;">
              <div>
            <ValidationProvider rules="required" name="邮箱验证码" title="emailcaptcha" v-slot="{ errors }">
              <el-form-item :error="errors[0]">
                <el-input v-model="forgetPassword.emailCode" placeholder="请输入邮箱验证码,不区分大小写"></el-input>
              </el-form-item>
            </ValidationProvider>
            </div>
              <div>
                <el-button v-show="Verification" @click="getEmailCode()" :disabled="forgetPassword.imageCode===''">
                  获取邮箱验证码</el-button>
                <el-button v-show="!Verification"><span>{{timer}}</span>秒后重新获取</el-button>
              </div>
            </div>
            <div class="btn-box">
              <a href="javascript:;" class="btn" @click="handleSubmit(onSubmit2)">下一步</a>
            </div>
          </el-form>
        </ValidationObserver>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }" v-if="active===2">
          <el-form label-width="0">
            <ValidationProvider rules="required|min:8|max:16|regex" name="新密码" v-slot="{ errors }">
              <el-form-item :error="errors[0]">
                <el-input v-model="forgetPassword.newLoginPwd" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </ValidationProvider>

            <ValidationProvider rules="required|min:8|max:16|regex" name="新密码" v-slot="{ errors }">
              <el-form-item :error="errors[0]">
                <el-input v-model="forgetPassword.newLoginPwd2" placeholder="请再次输入新密码"></el-input>
              </el-form-item>
            </ValidationProvider>
            <div class="btn-box">
              <a href="javascript:;" class="btn" @click="handleSubmit(onSubmit3)">完成</a>
            </div>
          </el-form>

        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ValidationProvider,
    ValidationObserver
  } from 'vee-validate'
  // import _ from 'lodash'
  import {
    Steps,
    Step,
    Button,
    Form,
    FormItem,
    Input
  } from 'element-ui'

  export default {
    data() {
      return {
        active: 0,
        forgetPassword: {
          email: '',
          imageCode: ''
        },
        captchaImg: '',
        Verification: true, // 通过v-show控制显示获取还是倒计时
        timer: 60 // 定义初始时间为60s
      }
    },
    components: {
      ValidationProvider,
      ValidationObserver,
      [Steps.name]: Steps,
      [Step.name]: Step,
      [Button.name]: Button,
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Input.name]: Input
    },
    methods: {
      // // 验证码防抖
      // limitCode() {
      //   this.debounced()
      // },
      // debounced() {
      //   this.debounced = _.debounce(this.getCode, 200)
      // },
      message(msg) {
        this.$message({
          message: msg,
          type: 'error'
        })
      },
      // 提交事件
      onSubmit1() {
         const email = this.forgetPassword.email
        this.$store.dispatch('getImgCaptcha', email).then(res => {
          if (res.message === 'ok') {
        this.active++
            this.captchaImg = res.data
          } else {
            this.message(res.message)
          }
        }).catch(err => {
          this.message(err.message)
        })
      },
      onSubmit2() {
        this.$store.dispatch('validEmailCode', this.forgetPassword).then(res => {
          if (res.message === 'ok') {
            this.active++
          } else {
            this.message(res.message)
          }
        }).catch(err => {
          this.message(err.message)
        })
      },
      onSubmit3() {
        if (this.forgetPassword.newLoginPwd !== this.forgetPassword.newLoginPwd2) {
          this.message('密码不一致')
        } else {
          // 这个按钮点击一次失效，或者需要防抖
          this.$store.dispatch('forgetPwdSave', this.forgetPassword).then(res => {
            if (res.message === 'ok') {
              this.$message({
                message: '重置密码成功，即将跳转登录页',
                type: 'success'
              })
              setTimeout(this.$router.replace({
                path: '/login'
              }), 3000)
            } else {
              this.message(res.message)
            }
          }).catch(err => {
            this.message(err.message)
          })
        }
      },
      getEmailCode() {
        this.$store.dispatch('getEmailCode', this.forgetPassword).then(res => {
          if (res.message === 'ok') {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
          } else {
          this.message(res.message)
          this.forgetPassword.imageCode = ''
          this.getImgUrl()
          this.Verification = true // 60s时间结束还原v-show状态并清除定时器
            this.timer = 60
            clearInterval(authTimer)
          }
        }).catch(err => {
          this.message(err.message)
        })

        this.Verification = false // 点击button改变v-show的状态
        const authTimer = setInterval(() => { // 定时器设置每秒递减
          this.timer-- // 递减时间
          if (this.timer <= 0) {
            this.Verification = true // 60s时间结束还原v-show状态并清除定时器
            this.timer = 60
            clearInterval(authTimer)
          }
        }, 1000)
      },
      updateImg() {
        this.getImgUrl()
      },
      getImgUrl() {
        const email = this.forgetPassword.email
        this.$store.dispatch('getImgCaptcha', email).then(res => {
          if (res.message === 'ok') {
            this.captchaImg = res.data
          } else {
            this.message(res.message)
          }
        }).catch(err => {
          this.message(err.message)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-step__title.is-success {
    color: #FF6600;
  }

  .el-step__head.is-success {
    color: #FF6600;
    border-color: #FF6600;
  }

  .wrapper {
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
        border: 1px solid #E5E5E5;
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
</style>
