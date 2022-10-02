const path = require('path')

// eslint-disable-next-line import/no-unresolved
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  target: 'node',
  externals: [
    'aws-sdk'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-transform-runtime', { 'regenerator': true }]
            ]
          }
        }
      }
    ]
  },
  mode: 'development',
  devtool: 'source-map'
}
