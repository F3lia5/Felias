import { content } from '../config/content.js';
import { packages, packageFeatures } from '../data/services.js';
import { esc, formatPrice } from '../lib/dom.js';

const CHECK = `<svg class="feat__icon" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg>`;
const DASH = `<svg class="feat__icon" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M5 10h10" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

export function renderPackages() {
  const c = content.packages;

  const columns = packages
    .map((pkg) => {
      const feats = packageFeatures
        .map((f) => {
          const on = pkg.includes.includes(f.id);
          return `<li class="feat ${on ? 'feat--on' : 'feat--off'}">
            ${on ? CHECK : DASH}
            <span>${esc(f.label)}<span class="sr-only"> (${on ? esc(c.included) : esc(c.excluded)})</span></span>
          </li>`;
        })
        .join('');

      return `<article class="pack${pkg.highlight ? ' pack--lead' : ''}" data-reveal aria-labelledby="pack-${esc(pkg.id)}">
        <header class="pack__head">
          <p class="pack__flag">${pkg.highlight ? esc(pkg.highlight) : '&nbsp;'}</p>
          <h3 class="pack__name" id="pack-${esc(pkg.id)}"${pkg.lang ? ` lang="${esc(pkg.lang)}"` : ''}>${esc(pkg.name)}</h3>
          <p class="pack__tagline">${esc(pkg.tagline)}</p>
          <p class="pack__price">${formatPrice(pkg.price)}<span class="pack__duration">${esc(pkg.duration)}</span></p>
        </header>
        <ul class="pack__feats">${feats}</ul>
        <a class="btn ${pkg.highlight ? 'btn--primary' : 'btn--ghost'} pack__cta" href="#randevu" data-service="package:${esc(pkg.id)}">${esc(c.cta)}<span class="sr-only">: ${esc(pkg.name)}</span></a>
      </article>`;
    })
    .join('');

  return `
  <section class="section packages" id="paketler" aria-labelledby="paketler-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="paketler-title" data-reveal>${esc(c.title)}</h2>
        <p data-reveal>${esc(c.intro)}</p>
      </div>
      <div class="packs">${columns}</div>
      <p class="note packages__note">${esc(c.note)}</p>
    </div>
  </section>`;
}
