const webpack = require('webpack');

module.exports = function override(originalConfig) {
  const fallback = {
    ...originalConfig.resolve?.fallback,
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/'),
    process: require.resolve('process/browser'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    zlib: require.resolve('browserify-zlib'),
    url: require.resolve('url/'),
  };

  const plugins = [
    ...(originalConfig.plugins || []),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ];

  return {
    ...originalConfig,
    resolve: {
      ...originalConfig.resolve,
      fallback,
    },
    plugins,
  };
};
