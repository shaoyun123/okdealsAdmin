import instance from '@utils/instance'

// // 刷新token
// export function refreshToken(data) {
//     return request({
//         url: '/api/sys-user/info',
//         method: 'post'
//     })
// }

/**
 * 登出接口
 */
export function logout() {
    return instance({
        method: 'get',
        url: '/api/sys-user/logout'
    })
}

/**
 * 登录接口
 * @param {object} user 传入email,password
 */
export function login(user) {
    return instance({
        method: 'post',
        url: '/api/sys-user/login',
        data: user
    })
}

/**
 * 修改密码接口
 * @param {object} pwd 传入email,loginPwd,newLoginPwd
 */
export function changepwd(pwd) {
    return instance({
        method: 'put',
        url: '/api/sys-user/pwd',
        data: pwd
    })
}

/**
 * 获取当前登录用户的信息
 * @param {object}
 * data:token
 */
export function userInfo(data) {
    return instance({
        method: 'get',
        url: '/api/sys-user/info',
        data: data
    })
}

/**
 * 找回密码--获取图片验证码接口
 * @param {data} email
 */
export function getImgCaptcha(data) {
    return instance({
        method: 'get',
        url: '/api/sys-user/retrieve-password/captcha-image/' + data
    })
}

/**
 * 找回密码--获取邮箱验证码
 * @param {data} email,imageCode
 */
export function getEmailCode(data) {
    return instance({
        method: 'post',
        url: '/api/sys-user/retrieve-password/email-code',
        data: data
    })
}

/**
 * 找回密码--验证邮箱验证码
 * @param {data} email
 */
export function validEmailCode(data) {
    return instance({
        method: 'get',
        url: '/api/sys-user/retrieve-password/valid/email-code/' + data.email + '/' + data.emailCode
    })
}

/**
 * 找回密码保存
 * @param {data}  email,newLoginPwd,emailCode
 */
export function forgetPwdSave(data) {
    return instance({
        method: 'put',
        url: '/api/sys-user/retrieve-password',
        data: data
    })
}
// /**
//  * 注册接口
//  * @param {object} user email,name,password
//  */
// export function register(user) {
//   return instance({
//     method: 'post',
//     url: 'api/user/register',
//     data: user
//   })
// }

// /**
//  * 验证码接口
//  */
// export function code() {
//   return instance({
//     url: '/api/user/code',
//     loading: false
//   })
// }
