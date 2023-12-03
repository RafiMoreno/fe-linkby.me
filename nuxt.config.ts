// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "/"),
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
  ],
  googleFonts: {
    families: {
      Nunito: [300, 400, 700, 900],
    },
  },
  runtimeConfig: {
    APIBaseUrl: process.env.APIBaseUrl,
  },
  snackbar: {
    bottom: true,
    duration: 5000,
  },
});
