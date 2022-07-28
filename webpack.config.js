const path = require('path');

module.exports = {
    entry: "./src/app.ts",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
                // exclude: /node_modules/,
            }
        ]
    },

    mode: "development"
}