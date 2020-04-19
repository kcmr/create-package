module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
  plugins: ['jest', 'node', 'prettier'],
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  rules: {
    'no-restricted-syntax': [
      'off',
      {
        selector: 'ForOfStatement',
      },
    ],
    'prettier/prettier': 'error',
  },
};
