const path = require('path');

module.exports = {
    entry: './src/Collisions.js',
    output: {
        path: path.resolve(__dirname, 'lib/js'),
        filename: 'collisions.js'
    },
    mode: 'development'
};