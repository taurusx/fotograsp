const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const DotenvPlugin = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new DotenvPlugin({
      path: `./.env.production`,
    }),
    new CopyPlugin([
      {
        from: './public/_redirects',
        to: './_redirects',
        toType: 'file',
        flatten: true,
      },
    ]),
  ],
})
