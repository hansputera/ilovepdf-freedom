module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'prettier',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {},
};
