import { extend, localize } from 'vee-validate'
import { required, email, min, max, length } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

// 安装required规则
extend('required', required)

// 安装email规则
extend('email', email)

// 安装min规则
extend('min', min)

// 安装max规则
extend('max', max)

// 安装length规则
extend('length', length)

// 自定义正则匹配规则
extend('regex', {
  validate: value => {
    return /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d_]*?/.test(value)
  }
})

// 汉化
localize('zh_CN', {
  messages: {
    ...zh.messages
  },
  names: {
    email: '邮箱',
    password: '密码',
    captcha: '验证码'
  },
  fields: {
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}'
    },
    password: {
      required: '请输入{_field_}',
      min: '{_field_}最少为8位',
      max: '{_field_}最长为16位',
      regex: '最少一个字母,一个数字,且只能由字母数字下划线组成'
    },
    captcha: {
      required: '请输入{_field_}',
      length: '请输入四位{_field_}'
    }
  }
})
