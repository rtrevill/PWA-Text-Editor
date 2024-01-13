const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Editor',
        description: "Edit text like you've just got your keyboard licence",
        background_color: '#a2d6eb',
        theme_color: '#a2d6eb',
        start_url: './',
        publicPath: './',
        lang: 'en',
        screenshots: [
            {
              src: 'src/images/Jate2.png',
              sizes: '1511x917',
              type: 'image/png',
              form_factor: 'wide',
              label: 'Wide screenshot',
              purpose: 'any'
            }
        ],
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
          // {
          //   src: path.resolve('src/images/Jate2.png'),
          //   sizes: [911],
          //   destination: path.join('assets', 'icons'),
          // }
          // {
          //   src: path.resolve('/src/images/Jate1.png'),
          //   // type: 'image/png',
          //   sizes: '1024x1024',
          //   form_factor: 'wide'
          // }
        ],
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },  
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
        
      ],
    },
  };
};
