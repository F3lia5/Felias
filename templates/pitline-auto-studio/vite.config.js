import { defineConfig } from 'vite';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

// src/config/site.js içindeki başlık, açıklama ve paylaşım bilgilerini index.html'e işler.
// Böylece SEO etiketleri de diğer marka bilgileriyle aynı yerden düzenlenir.
const siteMeta = () => ({
  name: 'site-meta',
  transformIndexHtml: {
    order: 'pre',
    async handler(html) {
      const file = pathToFileURL(resolve('src/config/site.js')).href + `?t=${Date.now()}`;
      const { site } = await import(file);
      const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      const ogImage = site.seo.ogImage
        ? `<meta property="og:image" content="${attr(site.seo.ogImage)}" />\n    <meta name="twitter:card" content="summary_large_image" />`
        : '<meta name="twitter:card" content="summary" />';
      return html
        .replaceAll('__SITE_TITLE__', attr(site.seo.title))
        .replaceAll('__SITE_DESCRIPTION__', attr(site.seo.description))
        .replaceAll('__SITE_NAME__', attr(site.brand.name))
        .replaceAll('__OG_IMAGE_TAGS__', ogImage);
    },
  },
});

export default defineConfig({
  plugins: [siteMeta()],
  build: { target: 'es2022' },
});
