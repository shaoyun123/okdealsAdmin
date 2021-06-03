import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './router'
import { setTitle } from '@utils/tool'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

// /**
//  * 路由守卫:
//  * 判断有无token: 有允许操作,没有就返回登录页
//  */
router.beforeEach((to, from, next) => {
    to.meta && setTitle(to.meta.title)
    if (to.name === 'ForgetPassword') {
        next()
    } else {
        const jwt = sessionStorage.getItem('jwt')
        if (jwt) {
            next()
        } else {
            if (to.path === '/login') {
                next()
            } else {
                next({ path: '/login' })
            }
        }
    }
})

export default router
