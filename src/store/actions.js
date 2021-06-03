import {
    login,
    logout,
    changepwd,
    userInfo,
    getImgCaptcha,
    getEmailCode,
    forgetPwdSave,
    validEmailCode
} from '@api/user'
import { addProduct, saveStore, editStore, searchStore, searchProducts, getProductsClassify } from '@api/account'
import { setToken } from '@utils/tool'
import { USERINFO } from '@store/mutation-type'

export const actions = {
    // 登录功能[登录完成把token传给mutations,存起来]
    login({ commit }, payload) {
        const { email, loginPwd } = payload
        return new Promise((resolve, reject) => {
            login({ email, loginPwd })
                .then((res) => {
                    resolve(res)
                    if (res.data) {
                        // 保存token
                        setToken(res.data.jwt)
                        // 把token提交给mutations,解析获取用户信息和过期时间
                        commit(USERINFO, res.data.jwt)
                        sessionStorage.setItem('jwt', JSON.stringify(res.data.jwt))
                    }
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    },

    // 登出功能
    logout() {
        return new Promise((resolve, reject) => {
            logout()
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 修改密码功能
    changepwd({ commit }, payload) {
        const { email, loginPwd, newLoginPwd } = payload
        return new Promise((resolve, reject) => {
            changepwd({ email, loginPwd, newLoginPwd })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 获取当前登录信息
    userInfo({ commit }, payload) {
        const { token } = payload
        return new Promise((resolve, reject) => {
            userInfo({ token })
                .then((res) => {
                    if (res.message === 'ok') {
                        commit(USERINFO, JSON.parse(sessionStorage.getItem('jwt')))
                        resolve(res)
                    } else {
                        // commit(USERINFO, res.data.jwt)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 获取图片验证码
    getImgCaptcha({ commit }, email) {
        // const {email} = payload
        return new Promise((resolve, reject) => {
            getImgCaptcha(email)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 获取邮箱验证码
    getEmailCode({ commit }, payload) {
        const { email, imageCode } = payload
        return new Promise((resolve, reject) => {
            getEmailCode({ email, imageCode })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 验证邮箱验证码
    validEmailCode({ commit }, payload) {
        const { email, emailCode } = payload
        return new Promise((resolve, reject) => {
            validEmailCode({ email, emailCode })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 忘记密码最后一步保存
    forgetPwdSave({ commit }, payload) {
        const { email, newLoginPwd, emailCode } = payload
        return new Promise((resolve, reject) => {
            forgetPwdSave({ email, newLoginPwd, emailCode })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 添加亚马逊店铺
    saveStore({ commit }, payload) {
        const { pageSize, pageNum, id, salesSite, storeName, storeAlias, sellerIdAmazon, status } = payload
        return new Promise((resolve, reject) => {
            saveStore({
                pageSize,
                pageNum,
                id,
                salesSite,
                storeName,
                storeAlias,
                sellerIdAmazon,
                status
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 修改亚马逊店铺
    editStore({ commit }, payload) {
        const { pageSize, pageNum, id, salesSite, storeName, storeAlias, sellerIdAmazon, status } = payload
        return new Promise((resolve, reject) => {
            editStore({
                pageSize,
                pageNum,
                id,
                salesSite,
                storeName,
                storeAlias,
                sellerIdAmazon,
                status
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 查询亚马逊店铺
    searchStore({ commit }, payload) {
        const { storeAlias, status } = payload
        return new Promise((resolve, reject) => {
            searchStore({ storeAlias, status })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 店铺别名唯一
    // storeAliasUnique ({ commit }, payload) {
    //   console.log(payload)
    //   // const { email,loginPwd,newLoginPwd } = payload
    //   // storeAliasUnique({ email,loginPwd,newLoginPwd }).then(res => {
    //   // })
    // },

    // 产品

    // 获取所有的商品分类
    getProductsClassify({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getProductsClassify({})
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 搜索产品
    searchProducts({ commit }, payload) {
        const { region, salesSite, storeName, couponCode, promotionStatus, asin } = payload
        return new Promise((resolve, reject) => {
            searchProducts({ region, salesSite, storeName, couponCode, promotionStatus, asin })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    // 添加优惠券商品
    addProduct({ commit }, payload) {
        const {
            sellerStoreAmazonId,
            salesSite,
            asin,
            couponAvailableRange,
            prodCategoryId,
            transportMode,
            discountType,
            discountValue,
            couponCodeType,
            couponCode,
            couponStartTime,
            couponEndTime,
            dailyAllowNum
        } = payload
        return new Promise((resolve, reject) => {
            addProduct({
                sellerStoreAmazonId,
                salesSite,
                asin,
                couponAvailableRange,
                prodCategoryId,
                transportMode,
                discountType,
                discountValue,
                couponCodeType,
                couponCode,
                couponStartTime,
                couponEndTime,
                dailyAllowNum
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}
