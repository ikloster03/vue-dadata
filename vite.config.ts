import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

const banner = `/**
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${pkg.author}
  * @license MIT
  */\n`

export default () => defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-dadata',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: 'vue-dadata.[format].js',
          chunkFileNames: '[name].js',
          banner,
          plugins: [terser()], // Minify.
        },

        // Works with dynamic import().
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: 'vue-dadata.[format].js',
          chunkFileNames: '[name].js',
          banner,
        },

        // Works with dynamic import().
        {
          format: 'amd',
          name: 'vuedadata',
          dir: 'dist',
          entryFileNames: 'vue-dadata.[format].js',
          chunkFileNames: '[name].js',
          // Provide global variables to use in the UMD build for externalized deps.
          globals: { vue: 'Vue' },
          banner,
        },

        // IIFE & UMD don't work with dynamic import().
        {
          format: 'iife',
          name: 'vuedadata',
          inlineDynamicImports: true, // Everything contained in a single file.
          dir: 'dist',
          entryFileNames: 'vue-dadata.[format].js',
          chunkFileNames: '[name].js',
          // Provide global variables to use in the UMD build for externalized deps.
          globals: { vue: 'Vue' }
        }
      ]
    },
  },
});
