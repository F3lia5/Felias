import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { esc } from '../lib/dom.js';
import { renderStatus } from '../lib/hours.js';

/** Decorative map illustration. The whole block links to the configured Google Maps URL. */
const MAP_SVG = `
<svg class="map__art" viewBox="0 0 600 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <rect width="600" height="440" fill="#E6DAC2"/>
  <rect x="48" y="52" width="170" height="118" fill="#C9CFA8"/>
  <path d="M-10 350 C110 318 210 384 340 352 S520 296 620 322 L620 450 L-10 450Z" fill="#D3D9C2"/>
  <g fill="none" stroke="#FBF4E4" stroke-linecap="round">
    <path d="M-10 214 H610" stroke-width="16"/>
    <path d="M300 -10 V450" stroke-width="16"/>
    <path d="M-10 96 L610 150" stroke-width="9"/>
    <path d="M118 -10 L170 450" stroke-width="9"/>
    <path d="M450 -10 L420 450" stroke-width="9"/>
    <path d="M-10 300 H610" stroke-width="7"/>
    <path d="M300 214 L560 40" stroke-width="7"/>
  </g>
  <g transform="translate(300 214)">
    <ellipse cx="0" cy="3" rx="16" ry="5" fill="#241610" opacity=".18"/>
    <path d="M0 0 C-18 -22 -28 -36 -28 -50 A28 28 0 0 1 28 -50 C28 -36 18 -22 0 0Z" fill="#B04B1B"/>
    <circle cx="0" cy="-50" r="10" fill="#FBF4E4"/>
  </g>
</svg>`;

function renderHoursRows() {
  return site.hours
    .map(
      (h) => `<tr data-hours-row="${h.days.join(',')}">
        <th scope="row">${esc(h.label)}<span class="hours__range">${esc(h.range)}</span></th>
        <td>${esc(h.open)} – ${esc(h.close)}</td>
      </tr>`,
    )
    .join('');
}

export function renderLocation() {
  const c = content.place;
  const loc = site.location;
  const address = loc.addressLines.map(esc).join('<br>');

  return `
  <section class="section place" id="konum" aria-labelledby="konum-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="konum-title">${esc(c.title)}</h2>
        <p>${esc(c.intro)}</p>
      </div>

      <div class="place__grid">
        <div class="place__info">
          <address class="address">${address}</address>
          ${loc.isDemo ? `<p class="demo-note"><strong>Demo konum.</strong> ${esc(loc.demoNotice)}</p>` : ''}

          <table class="hours">
            <caption class="sr-only">Çalışma saatleri</caption>
            <tbody>${renderHoursRows()}</tbody>
          </table>
          ${renderStatus()}

          <div class="place__actions">
            <a class="btn btn--primary" href="${esc(loc.mapsUrl)}" target="_blank" rel="noopener noreferrer">
              ${esc(c.directions)}<span class="sr-only"> (yeni sekmede açılır)</span>
            </a>
          </div>
        </div>

        <div class="place__map">
          <a class="map" href="${esc(loc.mapsUrl)}" target="_blank" rel="noopener noreferrer"
             aria-label="${esc(c.mapLabel)} (yeni sekmede açılır)">
            ${MAP_SVG}
            <span class="map__label">${esc(c.mapLabel)}</span>
          </a>
          <p class="map__note">${esc(c.mapNote)}</p>
        </div>
      </div>
    </div>
  </section>`;
}
