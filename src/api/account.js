import instance from '@utils/instance'
/**
 * 添加优惠券商品接口
 */
// export function addProduct(data) {
//   return instance({
//     method: 'post',
//     url: '/api/coupon-prod-amazon/coupon-prod',
//     data: data
//   })
// }

/**
 * 添加亚马逊店铺接口
 * @param {object} data 传入 pageSize,pageNum,id,salesSite,storeName,storeAlias,sellerIdAmazon,status
 */

export function saveStore(data) {
    return instance({
        method: 'post',
        url: '/api/seller/store',
        data: data
    })
}

/**
 * 修改亚马逊店铺接口
 * @param {object} data 传入 storeName,storeAlias,sellerIdAmazon
 */
export function editStore(data) {
    return instance({
        method: 'put',
        url: '/api/seller/store',
        data: data
    })
}

/**
 * 查询亚马逊店铺接口
 * @param {obj}  storeAlias,status
 */
export function searchStore(data) {
    return instance({
        method: 'post',
        url: '/api/seller/store/list',
        data: data
    })
}

/**
 * 店铺别名唯一接口
 */
// export function storeAliasUnique(data) {
//   return instance({
//     method: 'post',
//     url: '/api/seller/store/unique/alias',
//     data: data
//   })
// }

// 产品接口

// 获取所有的商品分类
export function getProductsClassify(data) {
    return instance({
        method: 'post',
        url: '/api/coupon-prod-category-amazon/list',
        data: data
    })
}

// 搜索所有产品
// region,salesSite,storeName,couponCode,promotionStatus,region123456789,asin
export function searchProducts(data) {
    return instance({
        method: 'post',
        url: '/api/coupon-prod-amazon/list',
        data: data
    })
}

// 添加产品
// sellerStoreAmazonId,salesSite,asin,couponAvailableRange,transportMode,discountType,discountValue,couponCodeType,couponCode,couponStartTime,couponEndTime,dailyAllowNum
export function addProduct(data) {
    return instance({
        method: 'post',
        url: '/api/coupon-prod-amazon/coupon-prod',
        data: data
    })
}
