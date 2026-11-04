import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { images } from '../config/images.js';
import { esc } from '../lib/dom.js';
import { media } from '../lib/media.js';
import { renderStatus } from '../lib/hours.js';

function hoursRows() {
  const c = content.contact;
  return site.hours
    .map((h) => {
      const value = h.open && h.close ? `${esc(h.open)} – ${esc(h.close)}` : esc(c.closed);
      return `<tr data-hours-row="${h.days.join(',')}"><th scope="row">${esc(h.label)}</th><td>${value}</td></tr>`;
    })
    .join('');
}

export function renderContact() {
  const c = content.contact;
  const loc = site.location;

  return `
  <section class="section contact" id="iletisim" aria-labelledby="iletisim-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="iletisim-title" data-reveal>${esc(c.title)}</h2>
        <p data-reveal>${esc(c.intro)}</p>
      </div>

      <div class="contact__grid">
        <div class="contact__info">
          <dl class="facts">
            <div class="fact">
              <dt>${esc(c.phone)}</dt>
              <dd><a href="${esc(site.contact.phoneHref)}">${esc(site.contact.phoneDisplay)}</a></dd>
            </div>
            <div class="fact">
              <dt>${esc(c.address)}</dt>
              <dd><address>${loc.addressLines.map(esc).join('<br>')}</address></dd>
            </div>
          </dl>
          ${loc.isDemo ? `<p class="demo-note"><strong>Demo bilgi.</strong> ${esc(c.demoNotice)}</p>` : ''}

          <table class="hours">
            <caption class="sr-only">${esc(c.hours)}</caption>
            <tbody>${hoursRows()}</tbody>
          </table>
          ${renderStatus()}

          <a class="btn btn--primary contact__cta" href="${esc(loc.mapsUrl)}" target="_blank" rel="noopener noreferrer">
            ${esc(c.directions)}<span class="sr-only"> (yeni sekmede açılır)</span>
          </a>
        </div>

        <div class="contact__map">
          <a class="map" href="${esc(loc.mapsUrl)}" target="_blank" rel="noopener noreferrer"
             aria-label="${esc(c.mapLabel)} (yeni sekmede açılır)">
            ${media({ ...images.map, alt: images.map.alt })}
            <span class="map__label">${esc(c.mapLabel)}</span>
          </a>
          <p class="note">${esc(c.mapNote)}</p>
        </div>
      </div>
    </div>
  </section>`;
}
