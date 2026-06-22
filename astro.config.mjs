import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// El dominio se toma de la variable de entorno PUBLIC_SITE_URL (.env)
const SITE = process.env.PUBLIC_SITE_URL || "https://www.madeartes.com";

// https://astro.build
export default defineConfig({
  site: SITE,
  integrations: [icon(), sitemap()],
});
