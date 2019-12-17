module.exports = {
  //配置是否打包map文件
  productionSourceMap: false,

  //配置输出的文件夹目录
  outputDir: './myDist',

  // 配置获取用户信息代理
  devServer: {
    proxy: {
      "/userApi": {
        target: "http://192.168.3.29:8080/UserMgeSvr.assx/", // target host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/userApi": "" // rewrite path
        }
      },
      "/houseApi": {
        target: "http://192.168.3.27:8080/BuildInfoMgeSvr.assx/", // target host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/houseApi": "" // rewrite path
        }
      }
    }
  }
}
