
var path = require("path");

const target = 'http://localhost:3000/api'

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