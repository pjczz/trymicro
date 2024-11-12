// vue.config.js
const process = require('node:process')
const path = require('path');

module.exports = function () {
  return import('@unocss/webpack').then(({ default: UnoCSS }) => ({
    devServer: {
      hot: true,  // 启用热更新
      open: true, // 启动时自动打开浏览器
      port: 8080, // 设置开发服务器端口
      hot: true, // 当 Hot Module Replacement 失败时，不会刷新页面
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3000',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/api': ''
      //     }
      //   }
      // }
    },
    configureWebpack: {
      devtool: 'inline-source-map',
      plugins: [
        UnoCSS()
      ],
      optimization: {
        realContentHash: true
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.js', '.vue', '.json']
    },
    chainWebpack(config) {
      config.module.rule('vue').uses.delete('cache-loader')
      config.module.rule('tsx').uses.delete('cache-loader')
      config.merge({
        cache: false
      })
    },
    css: {
      extract: process.env.NODE_ENV === 'development'
        ? {
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
          }
        : true
    }
  }))
}