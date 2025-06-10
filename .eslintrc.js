module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // 使用 TS 解析器
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',        // React 推荐规则
    'plugin:react-hooks/recommended', // React Hooks 推荐规则
    'plugin:@typescript-eslint/recommended', // TS 推荐规则
    'plugin:react-native/all',         // React Native 推荐规则
    'prettier',                       // 关闭所有与 prettier 冲突的规则
    'plugin:prettier/recommended'     // 显示 prettier 错误作为 ESLint 错误
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native', 'prettier'],
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect', // 自动检测 react 版本
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    // 在这里覆盖默认规则，比如关闭某条规则
    
  },
};
