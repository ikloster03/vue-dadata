import { visualizer } from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      title: "vue-dadata Bundle Visualizer",
    }),
  ],
  build: {
    lib: {
      entry: resolve(fileURLToPath(new URL("./src/index.ts", import.meta.url))),
      name: "vue-dadata",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
