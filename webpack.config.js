const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: 'none',

  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction: false,
      // 不使用const
      const: false
    }
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
        {
          test: /\.ts$/,
          use: [
              {
                  loader: "babel-loader",
                  options:{
                      presets: [
                          [
                              "@babel/preset-env",
                              {
                                  "targets":{
                                      "chrome": "58",
                                      "ie": "11"
                                  },
                                  "corejs":"3",
                                  "useBuiltIns": "usage"
                              }
                          ]
                      ]
                  }
              },
              {
                  loader: "ts-loader",
              }
          ],
          exclude: /node_modules/
        },
        // 设置sass文件的处理
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            // postcss配置对css进行操作，类似于babel
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      // 兼容浏览器版本
                      {
                        browsers: 'last 2 versions'
                      }
                    ]
                  ]
                }
              }
            },
            'sass-loader'
          ]
        }
    ]
  },

   plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
  ]
}