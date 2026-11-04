import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { esc } from '../lib/dom.js';

export function renderFooter() {
  const { nav, footer } = content;
  const { contact, social, location: loc } = site;

  const hours = site.hours
    .map((h) => `<li><span>${esc(h.label)}</span><span>${esc(h.open)} – ${esc(h.close)}</span></li>`)
    .join('');

  const contactLines = [
    contact.email && `<li><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>`,
    contact.phone && `<li><a href="tel:${esc(contact.phone.replace(/\s+/g, ''))}">${esc(contact.phone)}</a></li>`,
  ]
    .filter(Boolean)
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
            <li><a href="#menu" data-open-menu>${esc(nav.menu)}</a></li>
            <li><a href="#hikaye">${esc(nav.story)}</a></li>
            <li><a href="#konum">${esc(nav.location)}</a></li>
            <li><a href="${esc(social.instagram.url)}" target="_blank" rel="noopener noreferrer">Instagram<span class="sr-only"> (yeni sekmede açılır)</span></a></li>
          </ul>
        </nav>

        <div>
          <h2 class="footer__title">Konum</h2>
          <address class="footer__address">${loc.addressLines.map(esc).join('<br>')}</address>
          ${loc.isDemo ? '<p class="footer__demo">Demo adres</p>' : ''}
          ${contactLines ? `<ul class="footer__list footer__contact">${contactLines}</ul>` : ''}
        </div>

        <div>
          <h2 class="footer__title">Çalışma saatleri</h2>
          <ul class="footer__list footer__hours">${hours}</ul>
        </div>
      </div>

      <p class="footer__legal">
        <span>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.brand.name)}.</span>
        <span>${esc(footer.legal)}</span>
      </p>
    </div>
  </footer>`;
}
