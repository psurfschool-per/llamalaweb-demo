import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://llamalaweb.com",
  integrations: [sitemap()],
  // Cabeceras del servidor de desarrollo y de `astro preview` (local).
  // En producción las sirve `scripts/serve.mjs` (Docker), que añade además
  // redirección HTTP->HTTPS y caché. HSTS solo actúa cuando va por HTTPS.
  server: {
    headers: {
      "Strict-Transport-Security": "max-age=31536000",
    },
  },
  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: ["localhost", ".railway.app", "llamalaweb.com", "www.llamalaweb.com"],
    },
  },
});
