import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';

import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      title: 'vue3-truncate-html Bundle Visualizer',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue3-truncate-html',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
