import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://llamalaweb.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: [".railway.app", "localhost"]
    }
  },
});
