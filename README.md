## 框架文档 

### 目录结构

```js
.
├── src                             ##项目源码
│   └── api						   	 	## 存放接口文件夹
│       └── user.js                	 		## 用户相关接口如登录注册存放位置 
|   └── assets					    	## 静态文件存放目录,如css,img等
│       └── scss							## 存放scss文件夹
│			└── config.scss						## 全局配置scss变量
|   └── components						## 公共组件目录
│       └── Header.vue						## 公用头部组件
|   └── pages							## 存放页面组件
|   └── router							## 路由配置文件夹
│       └── router.js						## 路由配置信息
│       └── index.js						## 导出路由配置,路由守卫处理
|   └── vuex							## vuex配置文件夹
|   └── utils							## 公共函数文件夹
├── public                          ## 公共文件夹
├── package.json  					## 包管理文件
└── vue.config.js                   ## vue配置
```



### 公共函数

对`utils/tool.js`里面的公共函数做一个说明

引用方式

```js
import { 函数名 } from '@utils/tool'
```



####  设置页面标题函数`setTitle`

```js
/**
 * 设置页面标题
 * @param {string} title 标题名称
 */
export const setTitle = (title) => {
  window.document.title = title || 'the best Amazon Coupons'
}
```

#### token存储

##### 增加`setToken`

```js
/**
 * 设置token
 * @param {string} token token内容
 * @param {string} tokenName token名称,默认就是token
 */
export const setToken = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token)
}
```

##### 获取`getToken`

```js
/**
 * 获取token
 * @param {string} tokenName token名称,默认就是token
 */
export const getToken = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}
```

##### 删除`removeToken`

```js
/**
 * 移除token
 * @param {string} tokenName token名称,默认就是token
 */
export const removeToken = (tokenName = 'token') => {
  return Cookies.remove(tokenName)
}
```

#### 格式化时间`Format`

```js
/**
 * 格式化时间
 * @param datatime --时间/时间戳
 * @param fmt --格式化: yyyy-MM-dd hh:mm:ss
 */
Format(1622545899841, 'yyyy-MM-dd hh:mm:ss') //把时间戳转换成年月日时分秒
```

