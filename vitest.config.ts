/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import * as path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      // provider: 'istanbul',
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
    include: ['./src/**/*.test.ts']
  },
  plugins: [
    vue(),
  ],
});
