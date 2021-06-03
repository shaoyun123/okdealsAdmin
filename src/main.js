import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import Axios from 'axios'
import { Message } from 'element-ui'
// import ElementUI from 'element-ui'

import { setMetaTitle } from './utils/util.js'

import '@utils/validate'

Vue.config.productionTip = false
// Vue.use(ElementUI)

Vue.prototype.$message = Message
Vue.prototype.$Axios = Axios

// 设置浏览器标题
Vue.directive('title', {
    inserted: function(el, binding) {
        setMetaTitle(binding.value)
    }
})

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
