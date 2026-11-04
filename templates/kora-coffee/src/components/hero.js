import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { esc } from '../lib/dom.js';
import { picture } from '../lib/picture.js';
import { renderStatus } from '../lib/hours.js';

export function renderHero() {
  const c = content.hero;
  return `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__grid">
      <div class="hero__copy">
        <h1 class="hero__title" id="hero-title">${esc(c.title)}</h1>
        <p class="hero__lead">${esc(c.lead)}</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="#menu" data-open-menu>${esc(c.primaryCta)}</a>
          <a class="btn btn--ghost" href="#konum">${esc(c.secondaryCta)}</a>
        </div>
      </div>
      <div class="hero__media">
        ${picture('hero', { eager: true, sizes: '(min-width: 60rem) 56vw, 100vw' })}
        <div class="hero__card">
          ${renderStatus()}
          <p class="hero__place">${esc(site.location.city)}, ${esc(site.location.district)}</p>
        </div>
      </div>
    </div>
  </section>`;
}
