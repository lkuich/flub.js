const path = require('path');

module.exports = {
  entry: {
    core: './src/core.js',
    components: './src/components.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  }
};
