const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//
// class MoveFilesAfterCompile {
//   apply(compiler){
//     compiler.hooks.done.tap('Move files not compiled by Webpack into dist/ directory', function(){
//       fs.mkdir('./dist/mail', { recursive: true }, (err) => {
//         if (err) throw err;
//
//         fs.copyFile('./src/mail/send_mail.php', './dist/mail/c.php', (err) => {
//           if (err) throw err;
//         });
//       });
//     });
//   }
// }

let mode = 'development';
let target = 'web';
let devtool = 'source-map';
let plugins = [
  new HTMLWebpackPlugin({ filename: 'index.html', template: './src/index.html' }),
  new HTMLWebpackPlugin({ filename: 'aviso-legal.html', template: './src/aviso-legal.html' }),
  new HTMLWebpackPlugin({ filename: 'privacidad.html', template: './src/privacidad.html' }),
  new HTMLWebpackPlugin({ filename: 'proteccion-datos.html', template: './src/proteccion-datos.html' })
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
  devtool = false;
  plugins.push(
    new CleanWebpackPlugin(),
    // new MoveFilesAfterCompile()
  );
}

/* Do not use hashes while in development in order to benefit from HMR */
plugins.push(new MiniCssExtractPlugin({
  filename: mode === 'production' ? '[name].[contenthash].css' : '[name].css' }
));

module.exports = {
  mode: mode,
  target: target,
  entry: './src/index.js',
  output: {
    filename: mode === 'production' ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(webp|png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(webm|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'videos/[name][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s[c|a]|c)ss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: plugins,
  devtool: devtool,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules/
    },
    hot: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
