import { USERINFO } from '@store/mutation-type'
import jwtDecode from 'jwt-decode'
export const mutations = {
    // 获取用户信息
    [USERINFO](state, payload) {
        if (payload) {
            const token = payload.replace('Bearer ', '')
            const userInfo = jwtDecode(token)
            state.USERINFO = userInfo
        }
    }
}
