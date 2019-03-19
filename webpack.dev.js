const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const DotenvPlugin = require('dotenv-webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new DotenvPlugin({
      path: `./.env.development`,
    }),
  ],
})
