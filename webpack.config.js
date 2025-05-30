const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/client/index.ts",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      clean: true,
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[hash][ext][query]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[hash][ext][query]",
          },
        },
        {
          test: /\.(mp3|wav|ogg)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/audio/[hash][ext][query]",
          },
        },
        {
          test: /\.(glb|gltf|obj|fbx)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/models/[hash][ext][query]",
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/client/index.html",
        title: "Sky Collector - Multiplayer Flying Game",
        favicon: "./assets/favicon.ico",
      }),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 3000,
      host: "localhost",
      hot: true,
      open: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
        "/socket.io": {
          target: "http://localhost:8080",
          changeOrigin: true,
          ws: true,
        },
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@client": path.resolve(__dirname, "src/client"),
        "@server": path.resolve(__dirname, "src/server"),
        "@shared": path.resolve(__dirname, "src/shared"),
        "@assets": path.resolve(__dirname, "assets"),
      },
    },

    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          silentium: {
            test: /[\\/]node_modules[\\/](silentium|silentium-components|silentium-web-api)[\\/]/,
            name: "silentium",
            chunks: "all",
            priority: 10,
          },
        },
      },
    },

    devtool: isProduction ? "source-map" : "eval-source-map",

    performance: {
      hints: isProduction ? "warning" : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
