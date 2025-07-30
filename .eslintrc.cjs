module.exports = {
  root: true,
  ignorePatterns: ['node_modules', 'dist', 'dist-ssr', 'package-lock.json', 'yarn.lock.json', '*.local'],
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
    jest: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base', '@vue/typescript/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    vueFeatures: {
      filter: false,
      interpolationAsNonHTML: true,
    },
  },
  plugins: ['vue'],
  rules: {
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'var', 'let'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
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
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
