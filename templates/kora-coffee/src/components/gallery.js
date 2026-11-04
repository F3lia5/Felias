import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { images } from '../config/images.js';
import { esc } from '../lib/dom.js';
import { picture } from '../lib/picture.js';

export function renderGallery() {
  const c = content.gallery;
  const ig = site.social.instagram;

  const tiles = images.gallery
    .map(
      (entry, i) => `<li class="gallery__tile${i === 0 ? ' gallery__tile--lead' : ''}">
        ${picture(entry, { sizes: i === 0 ? '(min-width: 56rem) 50vw, 100vw' : '(min-width: 56rem) 25vw, 50vw' })}
      </li>`,
    )
    .join('');

  return `
  <section class="section gallery" id="galeri" aria-labelledby="galeri-title">
    <div class="wrap">
      <div class="gallery__head">
        <div>
          <h2 id="galeri-title">${esc(c.title)}</h2>
          <p class="gallery__note">${esc(c.note)}</p>
        </div>
        <a class="btn btn--ghost" href="${esc(ig.url)}" target="_blank" rel="noopener noreferrer">
          ${esc(ig.label)}<span class="sr-only"> (yeni sekmede açılır)</span>
        </a>
      </div>
      <ul class="gallery__grid">${tiles}</ul>
    </div>
  </section>`;
}
