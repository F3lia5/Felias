import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { images } from '../config/images.js';
import { esc } from '../lib/dom.js';
import { media } from '../lib/media.js';
import { renderStatus } from '../lib/hours.js';

export function renderHero() {
  const c = content.hero;
  const city = site.location.addressLines[site.location.addressLines.length - 1];

  return `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__stage">
      <div class="hero__art">${media({ ...images.hero, alt: c.alt }, { eager: true })}</div>
      <div class="wrap hero__inner">
        <div class="hero__copy">
          <h1 class="hero__title" id="hero-title">${esc(c.title)}</h1>
          <p class="hero__lead">${esc(c.lead)}</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="#randevu">${esc(c.primaryCta)}</a>
            <a class="btn btn--ghost" href="#hizmetler">${esc(c.secondaryCta)}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap">
      <dl class="hero__facts">
        <div><dt class="sr-only">Durum</dt><dd>${renderStatus()}</dd></div>
        <div><dt class="sr-only">Konum</dt><dd>${esc(city)} <span class="hero__demo">(demo adres)</span></dd></div>
        <div><dt class="sr-only">Telefon</dt><dd><a href="${esc(site.contact.phoneHref)}">${esc(site.contact.phoneDisplay)}</a> <span class="hero__demo">(demo)</span></dd></div>
      </dl>
    </div>
  </section>`;
}
