
var path = require("path");

//const target = 'http://192.168.0.42:3000/api'
//const target = 'http://163.152.30.239:3000/api'
const target = 'http://163.152.71.223:3000/api'

module.exports = {
  outputDir: path.resolve("../backend/public"),
  devServer: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        pathRewrite: {
          "^api" : ''
        }
      }
    }
  }
}
