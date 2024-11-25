module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  //plugin:prettier/recommended 用于解决优先级问题
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier', '@unocss', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    'vue/component-name-in-template-casing': 'off', // 关闭该规则
    '@typescript-eslint/no-unsafe-function-type': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
