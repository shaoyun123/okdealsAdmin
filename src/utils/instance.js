import request from '@utils/request'

/**
 * 请求再封装
 * @param {Object} obj 对象,包含url,method,headers,data等
 */
export default function instance (obj) {
  // 默认配置
  const defaultObj = {
    loadingTarget: 'body', // 默认全局加载modal
    method: 'get', // 默认请求方式是get
    loading: true, // 默认有请求modal
    parameterType: 'data' // 参数类型,分params和data
  }
  // 配置拓展
  const newObj = Object.assign({}, defaultObj, obj)

  // 发送请求
  return request({
    method: newObj.method,
    url: newObj.url,
    headers: {
      loading: newObj.loading,
      loadingTarget: newObj.loadingTarget
    },
    [newObj.parameterType]: newObj.data
  })
}
