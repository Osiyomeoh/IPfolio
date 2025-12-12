const webpack = require('webpack');

module.exports = function override(config) {
  // Ignore optional peer dependencies for wagmi connectors
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /^@base-org\/account$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@coinbase\/wallet-sdk$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@gemini-wallet\/core$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@metamask\/sdk$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^porto$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^porto\/internal$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@safe-global\/safe-apps-sdk$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@safe-global\/safe-apps-provider$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@walletconnect\/ethereum-provider$/,
    })
  );

  // Add polyfills for Node.js core modules (needed for @story-protocol/core-sdk)
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": false,
    "os": false,
    "crypto": false,
    "fs": false,
    "stream": false,
    "util": false,
    "buffer": false,
    "process": false,
  };

  return config;
};

