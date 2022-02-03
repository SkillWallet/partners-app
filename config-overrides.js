/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const webpack = require('webpack');
const { alias } = require('react-app-rewire-alias');

module.exports = {
  webpack: (configuration) => {
    configuration.resolve.fallback = {
      url: require.resolve('url'),
      assert: false,
      buffer: require.resolve('buffer'),
    };

    const modifiedConfig = alias({
      '@assets': path.resolve(__dirname, './src/assets'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/redux'),
      '@components': path.resolve(__dirname, './src/components'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      '@mui/material': path.resolve('./node_modules/@mui/material'),
      '@mui/icons-material': path.resolve('./node_modules/@mui/icons-material'),
      '@emotion/react': path.resolve('./node_modules/@emotion/react'),
      '@emotion/styled': path.resolve('./node_modules/@emotion/styled'),
      'react-router-dom': path.resolve('./node_modules/react-router-dom'),
    })(configuration);
    return modifiedConfig;
  },
};
