/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@partners-utils': path.resolve(__dirname, './src/utils'),
    '@partners-assets': path.resolve(__dirname, './src/assets'),
    '@partners-api': path.resolve(__dirname, './src/api'),
    '@partners-components': path.resolve(__dirname, './src/components'),
    '@partners-auth': path.resolve(__dirname, './src/auth'),
    '@partners-hooks': path.resolve(__dirname, './src/hooks'),
    '@partners-store': path.resolve(__dirname, './src/store'),
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
    '@mui/material': path.resolve('./node_modules/@mui/material'),
    '@mui/icons-material': path.resolve('./node_modules/@mui/icons-material'),
    '@emotion/react': path.resolve('./node_modules/@emotion/react'),
    '@emotion/styled': path.resolve('./node_modules/@emotion/styled'),
    'react-router-dom': path.resolve('./node_modules/react-router-dom'),
  })
);
