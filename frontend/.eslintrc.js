module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'eslint-config-egg'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    quotes: ['error', 'single'], // 强制使用一致的单引号
    semi: 0, // 强制不使用分号结尾
    'comma-dangle': [2, 'never'], // 禁止列表、字典结尾使用逗号
    'array-bracket-spacing': [2, 'never'] // 强制数组方括号中使用一致的空格
  }
}
