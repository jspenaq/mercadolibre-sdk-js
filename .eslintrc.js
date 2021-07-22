module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended', 'plugin:jest/style', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
  },
};
