/**
 * 封装ajax请求
 *  1. 统一的错误处理
 *  2. 请求鉴权
 */
import axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui'
import _ from 'lodash'
import {
  getToken,
  setToken
} from '@utils/tool'
// import {userInfo} from "@api/user"

// 定义一个loading对象
let loading = null

// 当前正在请求的数量
let currentRequestNum = 0

// 显示loading
function showLoading(target = 'body') {
  // 当前没有请求且loading不存在
  if (currentRequestNum === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.1)',
      target: target
    })
  }
}

// 隐藏loading
function hideLoading() {
  currentRequestNum--
  currentRequestNum = Math.max(currentRequestNum, 0)
  if (currentRequestNum === 0) {
    toHideLoading()
  }
}

// 防抖
const toHideLoading = _.debounce(() => {
  if (loading) {
    loading.close()
    loading = null
  }
}, 300)

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : '/prod',
  timeout: 5000 // 超时时间5s
})

// 添加请求拦截器
request.interceptors.request.use(config => {
  // 在发送请求前:默认展示loading
  if (config.headers.loading) {
    showLoading(config.headers.loadingTarget) // loading展示区域
  }
  // 在发送请求前:把token加进去,判断是否有token
  const token = getToken()
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, err => {
  // 判断当前请求是否设置了不显示Loading
  if (err.headers.loading) {
    hideLoading()
  }
  Message.error('请求超时')
  return Promise.reject(err)
})

// 添加响应拦截器
request.interceptors.response.use(response => {
  // 只响应data结构
  if (response.config.headers.loading) {
    hideLoading()
  }

  if (response.headers.authorization) {
    setToken(response.headers.authorization)
  } else {
    // this.$message({
    //   message: "error",
    //   type: 'error'
    // });
  }
  return response.data
}, error => {
  // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
  if (error.config.headers.loading) {
    hideLoading()
  }

  // if(error.response.config.headers.Authorization){
  //   console.log(error.response.config.headers.Authorization)
  //   setToken(error.response.config.headers.Authorization)
  // }

  if (error.response && error.response.data && error.response.data.message) {
    var jsonObj = JSON.parse(error.response.data.message)
    Message.error(jsonObj.message)
    return Promise.reject(error.response)
  } else {
    Message.error(error.message)
    return Promise.reject(error)
  }
})

export default request
