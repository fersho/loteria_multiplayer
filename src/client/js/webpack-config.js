var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, './../tsx') + '/app.tsx',
    mode: "development",
    output: {
        filename: "./../src/client/js/dist/app-bundle.js"
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                include: [
                    path.resolve(__dirname, "./../tsx")
                ],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: './config/tsconfig.json'
                    }
                }
            }
        ]
    }
}