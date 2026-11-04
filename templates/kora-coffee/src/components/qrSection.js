import qrcode from 'qrcode-generator';
import { content } from '../config/content.js';
import { esc, getMenuUrl } from '../lib/dom.js';

/** Builds an inline SVG QR code for the menu address. Returns '' if no public address is known. */
function qrSvg(url) {
  if (!url) return '';
  const qr = qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  const size = qr.getModuleCount();
  let path = '';
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (qr.isDark(row, col)) path += `M${col} ${row}h1v1h-1z`;
    }
  }
  const pad = 2;
  const total = size + pad * 2;
  return `<svg class="qr__code" viewBox="${-pad} ${-pad} ${total} ${total}" role="img"
    aria-label="Menüyü açan QR kod" shape-rendering="crispEdges">
    <rect x="${-pad}" y="${-pad}" width="${total}" height="${total}" fill="#FFFDF7"/>
    <path d="${path}" fill="#241610"/>
  </svg>`;
}

export function renderQrSection() {
  const c = content.qr;
  const url = getMenuUrl();
  const code = qrSvg(url);

  return `
  <section class="section qr" id="qr-menu" aria-labelledby="qr-title">
    <div class="wrap qr__grid">
      <div class="qr__copy">
        <h2 id="qr-title">${esc(c.title)}</h2>
        <p>${esc(c.text)}</p>
        <button class="btn btn--primary" type="button" data-open-menu>${esc(c.cta)}</button>
      </div>
      ${
        code
          ? `<figure class="qr__figure">
              ${code}
              <figcaption>
                <span>${esc(c.caption)}</span>
                <span class="qr__url">${esc(url)}</span>
              </figcaption>
            </figure>`
          : ''
      }
    </div>
  </section>`;
}
