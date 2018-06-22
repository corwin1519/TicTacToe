const path = require('path');

module.exports = {
  entry: ["babel-polyfill", './js/script.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
    watch: true,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [["env", {
                            targets: {
                                browsers: ['> 1%', 'last 2 versions', 'ie >= 11']
                            }
                        }]]
                    }
                }
            }
        ]
    }
};