// import { getToken, setTitle } from '@utils/tool'
// import { getToken } from '@utils/tool'
import store from '../store'

import Home from '@pages/home.vue'
import Index from '@pages/index.vue'

export const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('@pages/login.vue')
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: 'okdeals卖家中心'
        },
        component: Home,
        beforeEnter: (to, from, next) => {
            const jwt = sessionStorage.getItem('jwt')
            if (jwt) {
                store.dispatch('userInfo', jwt).then((res) => {
                    next()
                })
            } else {
                next({ path: '/login' })
            }
        },
        children: [
            {
                path: '/index',
                name: 'index',
                component: Index
            },
            {
                path: '/account',
                name: 'account',
                component: () => import('@pages/account.vue'),
                children: [
                    {
                        path: '/account/dashboard',
                        name: 'dashboard',
                        component: () => import('@pages/dashboard.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/forgetPassword',
        name: 'ForgetPassword',
        meta: {
            title: '忘记密码'
        },
        component: () => import('@pages/forgetPassword.vue')
    }
]

// toMenu (item) {
//   if (this.$route.path !== item.url) {
//     this.$router.push({ path: item.url })
//   }
// }
