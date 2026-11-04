import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { esc } from '../lib/dom.js';

export function renderFooter() {
  const { nav, footer } = content;
  const { location: loc, contact } = site;

  const hours = site.hours
    .map((h) => `<li><span>${esc(h.label)}</span><span>${h.open && h.close ? `${esc(h.open)} – ${esc(h.close)}` : esc(content.contact.closed)}</span></li>`)
    .join('');

  return `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__brand">
          <p class="footer__name">${esc(site.brand.name)}</p>
          <p>${esc(footer.blurb)}</p>
        </div>

        <nav aria-label="Alt gezinme">
          <h2 class="footer__title">Sayfa</h2>
          <ul class="footer__list">
            <li><a href="#hizmetler">${esc(nav.services)}</a></li>
            <li><a href="#paketler">${esc(nav.packages)}</a></li>
            <li><a href="#galeri">${esc(nav.gallery)}</a></li>
            <li><a href="#randevu">${esc(nav.cta)}</a></li>
            <li><a href="#iletisim">${esc(nav.contact)}</a></li>
          </ul>
        </nav>

        <div>
          <h2 class="footer__title">İletişim</h2>
          <address class="footer__address">${loc.addressLines.map(esc).join('<br>')}</address>
          ${loc.isDemo ? '<p class="footer__demo">Demo adres</p>' : ''}
          <ul class="footer__list footer__contact">
            <li><a href="${esc(contact.phoneHref)}">${esc(contact.phoneDisplay)}</a></li>
            ${contact.email ? `<li><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>` : ''}
          </ul>
        </div>

        <div>
          <h2 class="footer__title">Çalışma saatleri</h2>
          <ul class="footer__list footer__hours">${hours}</ul>
        </div>
      </div>

      <p class="footer__legal">
        <span>© ${new Date().getFullYear()} ${esc(site.brand.name)}.</span>
        <span>${esc(footer.legal)}</span>
      </p>
    </div>
  </footer>`;
}
