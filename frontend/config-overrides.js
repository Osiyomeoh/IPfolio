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

  return config;
};

