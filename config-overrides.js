const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@assets': path.resolve(__dirname, './src/assets'),
    '@store': path.resolve(__dirname, './src/redux'),
    '@components': path.resolve(__dirname, './src/components'),
    '@contracts': path.resolve(__dirname, './src/contracts'),
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
    '@mui/material': path.resolve('./node_modules/@mui/material'),
    '@mui/icons-material': path.resolve('./node_modules/@mui/icons-material'),
    '@emotion/react': path.resolve('./node_modules/@emotion/react'),
    '@emotion/styled': path.resolve('./node_modules/@emotion/styled'),
    'react-router-dom': path.resolve('./node_modules/react-router-dom'),
  })
);
