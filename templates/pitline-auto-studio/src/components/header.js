import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { esc } from '../lib/dom.js';

const DESKTOP_QUERY = '(min-width: 56rem)';

export function renderHeader() {
  const { nav } = content;
  const links = `
    <li><a href="#hizmetler">${esc(nav.services)}</a></li>
    <li><a href="#paketler">${esc(nav.packages)}</a></li>
    <li><a href="#galeri">${esc(nav.gallery)}</a></li>
    <li><a href="#iletisim">${esc(nav.contact)}</a></li>`;

  return `
  <header class="site-header">
    <div class="wrap site-header__bar">
      <a class="brand" href="#top" aria-label="${esc(site.brand.name)}, sayfanın başı">
        <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path d="M9 25V7h9.5a5.5 5.5 0 0 1 0 11H14" fill="none" stroke="currentColor" stroke-width="3"/>
          <path d="M2 28h28" stroke="var(--lime)" stroke-width="2.5"/>
        </svg>
        <span class="brand__name">${esc(site.brand.shortName)}<span class="brand__sub">${esc(site.brand.tagline)}</span></span>
      </a>

      <nav class="nav" aria-label="Ana gezinme">
        <ul class="nav__list">${links}</ul>
      </nav>

      <div class="site-header__actions">
        <a class="btn btn--primary btn--sm" href="#randevu">${esc(nav.cta)}</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Gezinme menüsünü aç">
          <span class="nav-toggle__bars" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobil gezinme" hidden>
      <ul class="wrap mobile-nav__list">${links}
        <li><a class="mobile-nav__cta" href="#randevu">${esc(nav.cta)}</a></li>
      </ul>
    </nav>
  </header>`;
}

export function initHeader() {
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.getElementById('mobile-nav');

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Gezinme menüsünü kapat' : 'Gezinme menüsünü aç');
    panel.hidden = !open;
  };

  toggle.addEventListener('click', () => setOpen(panel.hidden));
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !e.target.closest('.site-header')) setOpen(false);
  });
  window.matchMedia(DESKTOP_QUERY).addEventListener('change', (m) => {
    if (m.matches) setOpen(false);
  });
}
