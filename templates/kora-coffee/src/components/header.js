import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { esc } from '../lib/dom.js';

const MOBILE_QUERY = '(min-width: 56rem)';

export function renderHeader() {
  const { nav } = content;
  return `
  <header class="site-header">
    <div class="wrap site-header__bar">
      <a class="brand" href="#top" aria-label="${esc(site.brand.name)}, sayfanın başı">
        <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <circle cx="16" cy="16" r="16" fill="currentColor"/>
          <path d="M12 9v14M12 16.2 20 9M14.6 14.4 20.6 23" fill="none" stroke="var(--paper)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="brand__name">${esc(site.brand.name)}</span>
      </a>

      <nav class="nav" aria-label="Ana gezinme">
        <ul class="nav__list">
          <li><a href="#menu" data-open-menu>${esc(nav.menu)}</a></li>
          <li><a href="#hikaye">${esc(nav.story)}</a></li>
          <li><a href="#konum">${esc(nav.location)}</a></li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <a class="btn btn--primary btn--sm" href="#menu" data-open-menu>${esc(nav.cta)}</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Gezinme menüsünü aç">
          <span class="nav-toggle__bars" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobil gezinme" hidden>
      <ul class="wrap mobile-nav__list">
        <li><a href="#menu" data-open-menu>${esc(nav.menu)}</a></li>
        <li><a href="#hikaye">${esc(nav.story)}</a></li>
        <li><a href="#konum">${esc(nav.location)}</a></li>
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
  window.matchMedia(MOBILE_QUERY).addEventListener('change', (m) => {
    if (m.matches) setOpen(false);
  });
}
