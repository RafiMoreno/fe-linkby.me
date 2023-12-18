// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "/"),
  },
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  imports: {
    dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts"],
  },
  modules: [
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "nuxt-snackbar",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  googleFonts: {
    families: {
      Nunito: [300, 400, 700, 900],
    },
  },
  runtimeConfig: {
    public: {
      APIBaseUrl: process.env.NUXT_API_BASE_URL,
    },
  },
  snackbar: {
    bottom: true,
    duration: 5000,
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
