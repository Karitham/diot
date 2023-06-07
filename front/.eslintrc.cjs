module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [

  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [],
  rules: {
    'react/react-in-jsx-scope': 0
  }
}
