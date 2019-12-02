const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")
const tsImportPluginFactory = require("ts-import-plugin")

const Paths = require("./Paths")
const { isProduction } = require("./Constants")

const cssLoader = [
  isProduction ? MiniCssExtractPlugin.loader : "style-loader",
  "css-loader",
].filter(Boolean)

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: [
      autoprefixer
    ]
  }
}

const sassLoader = {
  loader: "sass-loader",
  options: {
    sourceMap: !isProduction
  }
}

const cssModuleLoader = {
  loader: "typings-for-css-modules-loader",
  options: {
    modules: true,
    namedExport: true,
    camelCase: true,
    sass: true,
    minimize: true,
    localIdentName: "[local]_[hash:base64:5]"
  }
}

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: "cheap-module-source-map",
  entry: isProduction
    ? { index: path.resolve(Paths.Src, "index/index.ts") }
    : { index: path.resolve(Paths.Src, "test/index.tsx") },
  output: {
    path: Paths.Dist,
    filename: "[name].min.js",
    library: "Ducks",
    libraryTarget: "umd",
  },
  externals: isProduction ? {
    "react": "react",
  } : {},
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@Src": Paths.Src,
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // 如果 node_modules 中的文件需要经过压缩等处理的, 必须在该 include 中添加路径
        include: [ Paths.Src ],
        exclude: /\.min\.js$/,
        use: [
          // { // 如果需要babel可自主启用(需下载相应依赖)
          //   loader: "babel-loader",
          //   options: {
          //     plugins: [
          //       [
          //         "@babel/plugin-transform-runtime",
          //         {
          //           corejs: 2,
          //         }
          //       ]
          //     ],
          //     presets: [
          //       "@babel/preset-env",
          //       "@babel/react",
          //     ]
          //   }
          // },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: Paths.Src,
        use: cssLoader,
      },
      {
        test: /\.s(a|c)ss$/,
        include: Paths.Src,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          ...cssLoader,
          isProduction ? postcssLoader : null,
          sassLoader,
        ].filter(Boolean),
      },
      {
        test: /\.module\.s(a|c)ss$/,
        include: Paths.Src,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          cssModuleLoader,
          isProduction ? postcssLoader : null,
          sassLoader,
        ].filter(Boolean),
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)(\?.*)?$/i,
        include: Paths.Src,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/images/[name].[hash:6].[ext]"
          }
        }]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)(\?.*)?$/i,
        include: Paths.Src,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/fonts/[name].[hash:6].[ext]"
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        include: Paths.Src,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/medias/[name].[hash:8].[ext]' // 文件名
        }
      },
    ],
  },
  plugins: [
    !isProduction ? new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "index.html"),
      filename: "index.html",
      title: "use-ducks",
      inject: "body",
      favicon: path.join(Paths.Public, "favicon.ico"),
      hash: true,
    }) : null,
    new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
  ].filter(Boolean),
}
