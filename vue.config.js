const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyPlugin = require('uglifyjs-webpack-plugin');
// webpack-parallel-uglify-plugin 多进程压缩 如果觉得慢可以使用
const webpack = require('webpack');
let {
    version
} = require('./package.json');
version = version.replace(/\./g, '_');

function resolve(dir) {
    return path.join(__dirname, dir);
}

let baseConfigureWebpack = {
    //不进行打包
    externals: {
        vue: "Vue",
        vuex: "Vuex",
        "vue-router": "VueRouter",
        // "element-ui": "ELEMENT"
    }
}
let devConfigureWebpack = {
    mode: 'development', //指定webpack的编译环境
    devtool: 'cheap-module-eval-source-map', // （默认）加快编译速度
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         jQuery: "jquery",
    //         $: "jquery",
    //         "windows.jQuery": "jquery"
    //     })
    // ]
};

let prodConfigureWebpack = {
    // mode: 'production', //指定webpack的编译环境
    devtool: 'cheap-module-source-map', // 无法捕获错误位置，强压缩代码 prod
    output: {
        //将版本号添加进打包的js名中
        filename: `js/[name].[chunkhash].${version}.js`,
        chunkFilename: `js/[name].[chunkhash].${version}.js`
    },
    optimization: {
        minimizer: [new UglifyPlugin({
            uglifyOptions: {
                warnings: false,
                compress: {
                    drop_console: true, // console
                    drop_debugger: false,
                    pure_funcs: ['console.log'] // 移除console
                }
            }
        })],
        splitChunks: {
            chunks: 'all', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
            minSize: 30000, // 最小尺寸，30000
            minChunks: 1, // 最小 chunk ，默认1
            maxAsyncRequests: 5, // 最大异步请求数， 默认5
            maxInitialRequests: 3, // 最大初始化请求书，默认3
            automaticNameDelimiter: '~', // 打包分隔符
            name: true, // 根据模块和缓存组秘钥自动生成
            cacheGroups: {
                // TODO vender 细化，下面有例子
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0,
                    name: 'commons',
                },
            },
        },
        runtimeChunk: {
            name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
        },
    },
    plugins: [
        // 骨架页生成功能
        // new PrerenderSpaPlugin(path.join(__dirname, 'dist'), ['/', '/products/1', '/products/2', '/products/3']),
        // 打包可视化
        // ...bundleView,
        //打包后 文件过大可以使用   nginx 服务端需要 开启gzip压缩  会对服务器cpu增加压力
        //gizp压缩是一种http请求优化方式，通过减少文件体积来提高加载速度 在package.json中添加openGzip字段，用作gizp开启开关
        new CompressionPlugin({
            filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            algorithm: 'gzip', //算法
            test: new RegExp(
                '\\.(js|css|html)$' //压缩 js 与 css
            ),
            threshold: 10240, //只处理比这个值大的资源。按字节计算
            minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
            deleteOriginalAssets: false //不删除源文件
        })
    ],
};

module.exports = {
    // baseUrl: './', // 默认'/'，部署应用包时的基本 URL
    outputDir: process.env.outputDir, // 输出文件目录
    // assetsDir: "static", //静态资源
    publicPath: isDev ? './' : './', // 基本路径
    lintOnSave: false, // 关闭eslint
    css: {
        extract: true, //是否启用css分离
        // 是否构建样式地图，false 将提高构建速度
        // sourceMap: false,
        loaderOptions: {
            // 这里的选项会传递给对应-loader
            css: {
                // dev环境下开启sourceMap方便查找元素对应文件
                sourceMap: isDev,
            },
            sass: {
                // 全局scss  也可以加全局变量
                data: `@import "@/assets/scss/common.scss";`,
                sourceMap: isDev,
            },
            postcss: {
                sourceMap: isDev,
            },
        },
    },
    // configureWebpack: (config) => {
    //     // 简单/基础配置，比如引入一个新插件
    //     // config.plugins = [...config.plugins, ...(isDev ? devConfigureWebpack : prodConfigureWebpack), ...{
    //     // }]
    //     // 公共配置 : 注- 如果添加的plugin是已有的，那么添加无效(HtmlPlugin除外，可配置多页面)，需要在baseConfigureWebpack中做修改
    //     Object.assign(config, (isDev ? devConfigureWebpack : prodConfigureWebpack),
    //         baseConfigureWebpack)
    // },
    // 内部会通过merge 合并
    configureWebpack: {
        ...(isDev ? devConfigureWebpack : prodConfigureWebpack),
        ...baseConfigureWebpack
    },
    chainWebpack: (config) => {
        if (!isDev) {
            // 添加规则
            // config.module
            // .rule('htmlimg')
            // .test(/\.(html)$/)
            // .use('html-withimg-loader')
            // .loader('html-withimg-loader')

            // config.module
            //     .rule('image')
            //     .test(/\.(jpg|png|gif|jpeg|svg)$/)
            //     .use('url-loader')
            //     .loader('url-loader')
            //     .options({
            //         limit: 2 * 100, //大于200k就会使用file-loader
            //         fallback: {
            //             loader:'file-loader',
            //             options:{
            //                 name: 'img/[name][hash].[ext]'
            //             }
            //         }
            //     })

            // .end()
            // .use('image-webpack-loader')
            // .loader('image-webpack-loader')

            // 删除原有规则
            config.module
                .rule('images').uses.clear();
            // 新建 规则
            config.module
                .rule('images')
                .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
                .use('url-loader')
                .loader('url-loader')
                .options({
                    limit: 4096, //大于200k就会使用file-loader
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash8].[ext]'
                        }
                    }
                })
                .end()
                .use('image-webpack-loader')
                .loader('image-webpack-loader') // 图片压缩
        }
        // 修改全局配置
        let globalParams = {
            // 通过 process.env.VERSION 获得
            // 已存在 BASE_URL => /
            // 已存在 NODE_ENV => "production" || "development"
            VERSION: '1.0.0',
        }

        config.plugin('define').tap((args) => {
            Object.keys(globalParams).forEach((key) => {
                let value = globalParams[key];
                if (value) args[0][`process.env.${key}`] = JSON.stringify(value);
            });
            return args;
        });
        // 修复HMR
        config.resolve.symlinks(true);
        // 链式配置
        config.resolve.alias.set('@', resolve('src')).set('assets', resolve('src/assets')).set('components', resolve('src/components'))
        // 移除 该插件 首屏就不会一次性加载全部路由了
        // 如果需要首屏依赖组件 可以这么写 import (/*webpackPrefetch: true */ './components')
        config.plugins.delete('prefetch');
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,
    pluginOptions: {
        // 安装vue-cli-plugin-style-resources-loader插件
        // 添加全局样式global.scss
        // "style-resources-loader": {
        //  preProcessor: "scss",
        //  patterns: [
        //   resolve(__dirname, "./src/scss/scss/variables.scss")
        //  ]
        // }
    },
    devServer: {
        disableHostCheck: true, //禁止检查host头
        // open: true,
        // 服务器代理，其实就是利用了服务端接口不存在跨域的原理
        proxy: {
            '/api': {
                target: 'https://b-t.bsays.net',
                changeOrigin: true,
                pathRewrite: {
                    // 重写上方的/api地址
                    '^/api': '',
                },
            },
        },
    },
};