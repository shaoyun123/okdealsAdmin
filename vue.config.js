// 参考https://github.com/staven630/vue-cli4-config/tree/master#top
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    lintOnSave: true,
    productionSourceMap: false,
    parallel: require('os').cpus().length > 1,
    css: {
        sourceMap: false,
        loaderOptions: {
            scss: {
                prependData: '@import "@assets/scss/config.scss";' // 定义公共的scss配置
            }
        }
    },
    devServer: {
        host: 'localhost', // 主机
        port: 9527, // 本地端口号,可以修改启动的端口号
        // open: true, // 自动启动浏览器
        hotOnly: true, // 热更新
        proxy: {
            // 代理请求
            '/api': {
                // target: 'http://47.97.25.144:9910/',
                target: 'http://3.92.146.187:9910/',
                changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据
                pathRewrite: {
                    '^/api': '/' // 把本地的localhost:4000/api/xxx代理成http://api.zhuishushenqi.com/xxx
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@c', resolve('src/components'))
            .set('@mock', resolve('src/mock'))
            .set('@pages', resolve('src/pages'))
            .set('@router', resolve('src/router'))
            .set('@store', resolve('src/store'))
            .set('@utils', resolve('src/utils'))

        // 压缩图片
        if (IS_PROD) {
            config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({
                mozjpeg: { progressive: true, quality: 65 },
                optipng: { enabled: false },
                pngquant: { quality: [0.65, 0.9], speed: 4 },
                gifsicle: { interlaced: false }
                // webp: { quality: 75 }
            })
        }
    }
}
