// vue.config.js 配置

// 设置时间戳为版本号
const path = require('path')
const fs = require('fs');
function resolve(dir) {
  return path.join(__dirname, dir)
}
const VERSION = new Date().getTime();
process.env.VUE_APP_VERSION = VERSION.toString()
const versionJSON = require(resolve('public/version.json'))
const versionFile = path.resolve(__dirname, 'public/version.json')
fs.writeFileSync(versionFile, JSON.stringify({
  ...versionJSON,
  version: VERSION,
  needNotification: false
}, null, 2))

module.exports = {
  runtimeCompiler: true,
  publicPath: './', // 设置打包文件相对路径
  outputDir: 'dist', // 构建时输出的目录根路径
  // assetsDir: 'static',  // 放置静态资源的目录
  // indexPath: 'index.html', // HTML输出的路径
  devServer: {
    port: 8080,
    proxy: {
      '/api': { // 配置到接口包含api使用该代理
        target: 'http://127.0.0.1:8000/api', // 定义后端的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/static': { // 配置到接口包含api使用该代理
        target: 'http://127.0.0.1:8000/static', // 定义后端的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/static': ''
        }
      }
    }
  },
  configureWebpack: {
    output: {
      filename: `js/[name].${VERSION}.js`, // 每次构建打包时给文件名加上时间戳，确保每次版本更新的文件名不一样
      chunkFilename: `js/[name].${VERSION}.js`
    }
  }
}
