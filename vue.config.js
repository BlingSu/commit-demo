const path = require('path')
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'png']
const Timestamp = new Date().getTime()
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    outputDir: 'dist', // 输出路径
    assetsDir: 'static', // 生成静态目录的文件夹
    runtimeCompiler: true, // 是否可以使用template模板
    parallel: require('os').cpus().length > 1, // 多余1核cpu时 启动并行压缩
    productionSourceMap: false, // 生产环境下 不使用soruceMap

    // https://github.com/neutrinojs/webpack-chain
    chainWebpack: config => {
        // 控制webpack内部配置
        config.resolve.alias.set('component', path.resolve(__dirname, 'src/components'))
        config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
    },
    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
          filename: `[name].${Timestamp}.js`,
          chunkFilename: `[name].${Timestamp}.js`
        },
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: false, // console
                            drop_debugger: false,
                            pure_funcs: ['console.log']// 移除console
                        }
                    }
                })
            ]
        }
      },
    // https://github.com/survivejs/webpack-merge
    devServer: { // 配置代理
        port: 8090, // 端口号
        host: 'localhost',
        disableHostCheck: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    pages: {
        index: { // 首页入口
            entry: './src/main.js'
        }
        // other: { // 其他页面入口
        //     entry: './src/a.js',
        //     chunks:['other'] // 引入的资源
        // }
    },
    // 第三方插件配置
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                // 插入全局样式
                path.resolve(__dirname, 'src/assets/styles/default.less')
            ]
        }
    }
}
