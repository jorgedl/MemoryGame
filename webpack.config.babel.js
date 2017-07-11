import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const plugins = [
  new HtmlWebpackPlugin({
    inject: false,
    template: 'src/index.html'
  })
];

const configs = {
  entry: './src/index.jsx',

  output: {
    path: __dirname + '/dist',
    filename: 'game-ui.js'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      roselle: path.resolve(__dirname, './lib/')
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'react'
          ],

          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties'
          ]
        }
      },

      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components|\.spec\.js)/,
        use: [{
          loader: 'eslint-loader',
          options: {
            configFile: '.eslintrc',
            emitError: true,
            emitWarning: true
          }
        }]
      },

      {
        test: /\.(png|jpg|jpeg|tiff|woff|woff2|eot|svg|ttf)(\?v=(.*))?$/,
        loader: 'file-loader'
      },

      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },

  plugins: plugins,

  devServer: {
    hot: true,
    inline: true,
    contentBase: './dist',
    historyApiFallback: true,
    port: 8085
  },

  devtool: 'inline-source-map'
}

export default configs;
