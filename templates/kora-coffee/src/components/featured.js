import { content } from '../config/content.js';
import { menu } from '../data/menu.js';
import { esc, formatPrice } from '../lib/dom.js';
import { picture } from '../lib/picture.js';

export function renderFeatured() {
  const c = content.featured;
  const products = menu.featured
    .map((id) => menu.items.find((item) => item.id === id))
    .filter(Boolean);
  const [lead, ...rest] = products;

  const leadMarkup = lead
    ? `<article class="feature">
        ${picture(lead.image, { sizes: '(min-width: 56rem) 40vw, 100vw' })}
        <div class="feature__body">
          <div class="product-head">
            <h3 class="product-name">${esc(lead.name)}</h3>
            <p class="price">${formatPrice(lead.price)}</p>
          </div>
          <p class="product-desc">${esc(lead.description)}</p>
        </div>
      </article>`
    : '';

  const rows = rest
    .map(
      (item) => `<li class="pick">
        ${picture(item.image, { sizes: '6rem' })}
        <div class="pick__body">
          <div class="product-head">
            <h3 class="product-name">${esc(item.name)}</h3>
            <p class="price">${formatPrice(item.price)}</p>
          </div>
          <p class="product-desc">${esc(item.description)}</p>
        </div>
      </li>`,
    )
    .join('');

  return `
  <section class="section featured" id="imza" aria-labelledby="imza-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="imza-title">${esc(c.title)}</h2>
        <p>${esc(c.intro)}</p>
      </div>
      <div class="featured__layout">
        ${leadMarkup}
        <div class="featured__list">
          <ul class="picks">${rows}</ul>
          <button class="btn btn--ghost featured__all" type="button" data-open-menu>${esc(c.allCta)}</button>
        </div>
      </div>
    </div>
  </section>`;
}
