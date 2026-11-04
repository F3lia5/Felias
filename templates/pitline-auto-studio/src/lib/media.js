import { arts } from './art.js';
import { esc } from './dom.js';

/**
 * Bir görseli çizer. `entry` images.js içindeki bir kayıttır.
 * - src doluysa fotoğraf gösterilir; yüklenemezse altındaki çizim kalır.
 * - src boşsa doğrudan çizim gösterilir ve alt metin kapsayıcıya verilir.
 * Kapsayıcı her zaman yer tutar, bu yüzden bozuk görsel ikonu ya da boş kutu oluşmaz.
 */
export function media(entry, { eager = false, className = '' } = {}) {
  if (!entry) return '';
  const art = arts[entry.art] ? arts[entry.art]() : '';
  const hasSrc = Boolean(entry.src);
  const label = esc(entry.alt || '');

  return `<div class="media ${className}" data-art="${esc(entry.art || '')}"${hasSrc ? '' : ` role="img" aria-label="${label}"`}>
    <div class="media__art" aria-hidden="true">${art}</div>
    ${
      hasSrc
        ? `<img class="media__img" src="${esc(entry.src)}" alt="${label}"
            ${entry.w && entry.h ? `width="${entry.w}" height="${entry.h}"` : ''}
            ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
        : ''
    }
  </div>`;
}

/** Fotoğraf yüklenince çizimin önüne alır, yüklenemezse kaldırıp çizimi bırakır. */
export function watchMedia(root = document) {
  root.querySelectorAll('.media__img').forEach((img) => {
    const box = img.closest('.media');
    const ok = () => box.classList.add('is-loaded');
    const fail = () => {
      box.setAttribute('role', 'img');
      box.setAttribute('aria-label', img.alt);
      img.remove();
    };
    if (img.complete) {
      if (img.naturalWidth > 0) ok();
      else fail();
      return;
    }
    img.addEventListener('load', ok, { once: true });
    img.addEventListener('error', fail, { once: true });
  });
}
