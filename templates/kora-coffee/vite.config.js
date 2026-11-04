import { defineConfig } from 'vite';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

// Injects title / description / social metadata from src/config/site.js into index.html,
// so SEO tags are edited in the same place as the rest of the brand details.
const siteMeta = () => ({
  name: 'site-meta',
  transformIndexHtml: {
    order: 'pre',
    async handler(html) {
      const file = pathToFileURL(resolve('src/config/site.js')).href + `?t=${Date.now()}`;
      const { site } = await import(file);
      const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      return html
        .replaceAll('__SITE_TITLE__', attr(site.seo.title))
        .replaceAll('__SITE_DESCRIPTION__', attr(site.seo.description))
        .replaceAll('__SITE_NAME__', attr(site.brand.name))
        .replaceAll('__SITE_OG_IMAGE__', attr(site.seo.ogImage));
    },
  },
});

export default defineConfig({
  plugins: [siteMeta()],
  build: { target: 'es2022' },
});
