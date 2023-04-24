module.exports = {
  root: true,
  ignorePatterns: [
    'node_modules',
    'dist',
    'dist-ssr',
    'package-lock.json',
    'yarn.lock.json',
    '*.local',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-base',
    '@vue/typescript/recommended',

  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    parser: {
      ts: '@typescript-eslint/parser',
    },
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false,
    },
  },
  rules: {
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'var', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'max-len': ['warn', { code: 150 }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        '': 'never',
      },
    ],
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: true,
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

};
