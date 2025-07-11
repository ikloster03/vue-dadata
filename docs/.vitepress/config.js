import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en",
  title: "vue-dadata",
  description: "Vue component for hinting addresses using dadata.ru",
  themeConfig: {
    docsDir: "docs",
    nav: [
      {
        text: "Github",
        link: "https://github.com/ikloster03/vue-dadata",
      },
      {
        text: "NPM",
        link: "https://www.npmjs.com/package/vue-dadata",
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        link: "/index",
      },
    ],
  },
});
