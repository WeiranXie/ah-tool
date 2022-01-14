const JuitReportPlugin = require('./tools/dist/webpack-reporter-plugin').JuitWebpackReportPlugin
const VueTsCheckerPlugin = require('@juit/vue-ts-checker').VueTsCheckerPlugin
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/ah-tool' : '/',
  configureWebpack: {
    devServer: {
      port: 4000,
    },
  },
  chainWebpack: (config) => {
    // console.dir(config.toConfig()) // , { depth: 6 })

    // This is the most unfriendly reporter I have ever seen... If there
    // are errors, it won't report warning, so use our replacement below!
    config.plugins.delete('friendly-errors')

    config.plugins.delete('fork-ts-checker')

    // This is our nice error reporter plugin, it tells us why we fail!
    config.plugin('juit-report').use(new JuitReportPlugin())

    // Use our TS + Vue Templates checker plugin...
    config.plugin('vue-ts-checker').use(new VueTsCheckerPlugin())

    // Enable the StyleLint plugin
    config.plugin('StyleLintPlugin').use(new StyleLintPlugin({
      files: [ './src/**/*.{vue,css,scss,postcss}' ],
    }))

    // Reconfigure ESLint as it's an essential piece of our stack!
    config.plugin('eslint').tap((args) => {
      args[0].fix = false // never fix while in webpack
      args[0].lintDirtyModulesOnly = false // always process _all_ files
      args[0].formatter = 'stylish' // use the compact eslint report

      // The eslint plugin configuration is confusing... with _everythig_
      // false, errors are reported as errors, warnings are reported as
      // warnings and no exceptions are thrown back at webpack... so it works!
      args[0].emitError = false
      args[0].emitWarning = false
      args[0].failOnError = false
      args[0].failOnWarning = false

      return args
    })
  },

  // This is broken! Don't use it!
  // lintOnSave: true,
}
