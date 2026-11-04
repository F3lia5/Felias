import { content } from '../config/content.js';
import { services } from '../data/services.js';
import { esc, formatPrice } from '../lib/dom.js';

export function renderServices() {
  const c = content.services;

  const rows = services
    .map(
      (s) => `<li class="service" data-reveal>
        <div class="service__main">
          <h3 class="service__name">${esc(s.name)}</h3>
          <p class="service__text">${esc(s.summary)}</p>
        </div>
        <div class="service__meta">
          <p class="service__duration">${esc(s.duration)}</p>
          <p class="service__price"><span class="service__from">${esc(c.from)}</span> ${formatPrice(s.from)}</p>
          <a class="link" href="#randevu" data-service="service:${esc(s.id)}">${esc(c.request)}<span class="sr-only">: ${esc(s.name)}</span></a>
        </div>
      </li>`,
    )
    .join('');

  return `
  <section class="section services" id="hizmetler" aria-labelledby="hizmetler-title">
    <div class="wrap services__grid">
      <div class="services__head">
        <h2 id="hizmetler-title" data-reveal>${esc(c.title)}</h2>
        <p data-reveal>${esc(c.intro)}</p>
        <p class="note">${esc(c.note)}</p>
      </div>
      <ul class="services__list">${rows}</ul>
    </div>
  </section>`;
}
