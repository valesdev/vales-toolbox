const { defineConfig } = require('@vue/cli-service')

const pkg = require('./package.json')

module.exports = defineConfig({
  productionSourceMap: false,

  publicPath: '/',

  chainWebpack (config) {
    config
      .externals({
        vue: 'Vue',
        'vue-router': 'VueRouter'
      })

    config.plugin('define')
      .tap(args => {
        return [{
          ...args[0],
          'process.env.NAME': JSON.stringify(pkg.name),
          'process.env.VERSION': JSON.stringify(pkg.version)
        }]
      })

    config.plugin('html')
      .tap(args => {
        args[0].title = 'Vales Toolbox'
        return args
      })
  }
})
