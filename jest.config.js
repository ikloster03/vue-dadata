module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/*.test.(js|jsx|ts|tsx)',
  ],
  roots: [
    '<rootDir>/src',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js,vue}',
    '!src/index.ts',
  ],
};
