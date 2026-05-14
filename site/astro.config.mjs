import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { fileURLToPath } from "node:url";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
  site: "https://www.horsorion.com",
  integrations: [react(), tailwind(), sitemap(), icon()],
  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: "static",
});
