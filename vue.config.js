// vue.config.js
const process = require('node:process')
const path = require('path');

module.exports = function () {
  return import('@unocss/webpack').then(({ default: UnoCSS }) => ({
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