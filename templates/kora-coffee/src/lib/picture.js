import { images } from '../config/images.js';
import { esc } from './dom.js';

const WIDTHS = [480, 800, 1200, 1600];

function resolve(entry) {
  if (entry.unsplash) {
    const url = (w) =>
      `https://images.unsplash.com/photo-${entry.unsplash}?auto=format&fit=crop&q=70&w=${w}`;
    return {
      src: url(800),
      srcset: WIDTHS.map((w) => `${url(w)} ${w}w`).join(', '),
    };
  }
  return { src: entry.file, srcset: entry.srcset || '' };
}

/**
 * Returns the markup for one photo. The wrapper shows a tinted placeholder while loading
 * and keeps it if the image fails (see watchImages).
 * `source` is either a key from images.js or an image entry object.
 */
export function picture(source, { sizes = '100vw', eager = false } = {}) {
  const entry = typeof source === 'string' ? images[source] : source;
  if (!entry) return '';
  const { src, srcset } = resolve(entry);
  const [w, h] = entry.ratio || [1200, 800];
  const style = entry.pos ? ` style="object-position:${esc(entry.pos)}"` : '';

  return `<div class="ph" data-tone="${esc(entry.tone || 'crema')}">
    <img src="${esc(src)}"${srcset ? ` srcset="${esc(srcset)}" sizes="${esc(sizes)}"` : ''}
      alt="${esc(entry.alt)}" width="${w}" height="${h}"
      ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${style}>
  </div>`;
}

/** Keeps the placeholder visible (and accessible) when a photo cannot be loaded. */
export function watchImages(root = document) {
  root.querySelectorAll('.ph img').forEach((img) => {
    img.addEventListener(
      'error',
      () => {
        const box = img.closest('.ph');
        box.classList.add('is-broken');
        box.setAttribute('role', 'img');
        box.setAttribute('aria-label', img.alt);
        img.remove();
      },
      { once: true },
    );
  });
}
