import Cookies from 'js-cookie'

/**
 * 设置页签标题
 * @param {string} title 标题
 */
export const setTitle = (title) => {
  window.document.title = title || 'admin'
}

/**
 * 设置token
 * @param {string} token token内容
 * @param {string} tokenName token名称,默认就是token
 */
export const setToken = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token)
}

/**
 * 获取token
 * @param {string} tokenName token名称,默认就是token
 */
export const getToken = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}

/**
 * 移除token
 * @param {string} tokenName token名称,默认就是token
 */
export const removeToken = (tokenName = 'token') => {
  return Cookies.remove(tokenName)
}

/**
 * 设置storage缓存信息
 * @param {string} type sessionStorage/localStorage
 * @param {string} name 常量或者变量
 * @param {string} value 缓存的值
 */
export const storageSave = (obj) => {
  const { type, name, value } = obj
  type.setItem(name, value)
}

/**
 * 读取storage缓存信息
 * @param {string} type sessionStorage/localStorage
 * @param {string} name 常量或者变量
 */
export const storageRead = (obj) => {
  const { type, name } = obj
  return type.getItem(name)
}

/**
 * 移除storage缓存信息
 * @param {string} type sessionStorage/localStorage
 * @param {string} name 常量或者变量
 */
export const storageRemove = (obj) => {
  const { type, name } = obj
  return type.getItem(name)
}

/**
 * 格式化时间
 * @param datatime --时间/时间戳
 * @param fmt --格式化: yyyy-MM-dd hh:mm:ss
 */
export const Format = function (datetime, fmt) {
  if (datetime) {
    datetime = datetime.toString()
    if (parseInt(datetime) === datetime) {
      if (datetime.length === 10) {
        datetime = parseInt(datetime) * 1000
      } else if (datetime.length === 13) {
        datetime = parseInt(datetime)
      }
    }
    datetime = new Date(datetime)
    var o = {
      'M+': datetime.getMonth() + 1, // 月份
      'd+': datetime.getDate(), // 日
      'h+': datetime.getHours(), // 小时
      'm+': datetime.getMinutes(), // 分
      's+': datetime.getSeconds(), // 秒
      'q+': Math.floor((datetime.getMonth() + 3) / 3), // 季度
      S: datetime.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  } else {
    return ''
  }
}
