import { site } from '../config/site.js';
import { menu } from '../data/menu.js';
import { esc, formatPrice } from '../lib/dom.js';

const HASH_PATTERN = /^#menu(?:\/([\w-]+))?$/;

const CLOSE_ICON = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
  <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

const dishMarkup = (item) => `
  <li class="dish">
    <div class="dish__row">
      <h4 class="dish__name">${esc(item.name)}</h4>
      <span class="dish__dots" aria-hidden="true"></span>
      <span class="dish__price"><span class="sr-only">Fiyat: </span>${formatPrice(item.price)}</span>
    </div>
    <p class="dish__desc">${esc(item.description)}</p>
  </li>`;

/**
 * Accessible QR menu, built on the native <dialog> element
 * (focus trap, Escape to close and inert background come from the browser).
 * Deep links: "#menu" opens it, "#menu/<category-id>" opens a specific category.
 */
export function createMenuDialog() {
  const { categories, items, note } = menu;
  const countIn = (id) => items.filter((i) => i.category === id).length;
  const firstFilled = categories.find((c) => countIn(c.id) > 0);

  const dialog = document.createElement('dialog');
  dialog.className = 'menu';
  dialog.id = 'menu-dialog';
  dialog.setAttribute('aria-labelledby', 'menu-title');

  const tabs = categories
    .map(
      (c) => `<button class="menu__tab" type="button" role="tab" id="tab-${c.id}"
        aria-controls="panel-${c.id}" aria-selected="false" tabindex="-1" data-category="${c.id}">${esc(c.label)}</button>`,
    )
    .join('');

  const panels = categories
    .map((c) => {
      const list = items.filter((i) => i.category === c.id);
      const body = list.length
        ? `<ul class="menu__list">${list.map(dishMarkup).join('')}</ul>`
        : `<div class="menu__empty">
            <p class="menu__empty-title">Bu kategoriye henüz ürün eklenmedi.</p>
            <p>Diğer kategorilere göz atabilirsiniz.</p>
            ${
              firstFilled
                ? `<button class="btn btn--ghost btn--sm" type="button" data-goto="${firstFilled.id}">${esc(firstFilled.label)} kategorisine git</button>`
                : ''
            }
          </div>`;
      return `<div class="menu__panel" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}" tabindex="0" hidden>
        <h3 class="menu__category">${esc(c.label)}</h3>
        ${body}
      </div>`;
    })
    .join('');

  dialog.innerHTML = `
    <div class="menu__sheet">
      <header class="menu__head">
        <div>
          <h2 class="menu__title" id="menu-title">Menü</h2>
          <p class="menu__brand">${esc(site.brand.name)}</p>
        </div>
        <button class="menu__close" type="button" aria-label="Menüyü kapat">${CLOSE_ICON}</button>
      </header>
      <div class="menu__tabs" role="tablist" aria-label="Menü kategorileri">${tabs}</div>
      <div class="menu__body">${panels}</div>
      <p class="menu__note">${esc(note)}</p>
    </div>`;

  const tabEls = [...dialog.querySelectorAll('[role="tab"]')];
  const panelEls = [...dialog.querySelectorAll('[role="tabpanel"]')];
  const body = dialog.querySelector('.menu__body');
  let activeId = categories[0]?.id;
  let opener = null;

  function select(id, { focus = false } = {}) {
    if (!categories.some((c) => c.id === id)) id = categories[0]?.id;
    activeId = id;
    tabEls.forEach((tab) => {
      const on = tab.dataset.category === id;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on) {
        tab.scrollIntoView({ block: 'nearest', inline: 'center' });
        if (focus) tab.focus();
      }
    });
    panelEls.forEach((panel) => {
      panel.hidden = panel.id !== `panel-${id}`;
    });
    body.scrollTop = 0;
    if (dialog.open) history.replaceState(null, '', `#menu/${id}`);
  }

  function open(categoryId, trigger) {
    opener = trigger || document.activeElement;
    select(categoryId || activeId);
    if (!dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add('is-locked');
    }
    history.replaceState(null, '', `#menu/${activeId}`);
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  // Tabs: click and keyboard (arrows, Home, End), with automatic activation.
  dialog.querySelector('.menu__tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) select(tab.dataset.category);
  });
  dialog.querySelector('.menu__tabs').addEventListener('keydown', (e) => {
    // Position comes from the tab that has focus, falling back to the selected one.
    const focused = tabEls.indexOf(document.activeElement);
    const index = focused >= 0 ? focused : tabEls.findIndex((t) => t.dataset.category === activeId);
    let next = null;
    if (e.key === 'ArrowRight') next = (index + 1) % tabEls.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabEls.length) % tabEls.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabEls.length - 1;
    if (next === null) return;
    e.preventDefault();
    select(tabEls[next].dataset.category, { focus: true });
  });

  // Buttons inside the empty state.
  dialog.addEventListener('click', (e) => {
    const goto = e.target.closest('[data-goto]');
    if (goto) select(goto.dataset.goto, { focus: true });
  });

  dialog.querySelector('.menu__close').addEventListener('click', close);

  // Click on the dimmed area (the dialog element itself) closes the menu.
  let pressStartedOnBackdrop = false;
  dialog.addEventListener('pointerdown', (e) => {
    pressStartedOnBackdrop = e.target === dialog;
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog && pressStartedOnBackdrop) close();
  });

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('is-locked');
    if (HASH_PATTERN.test(location.hash)) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    // Native dialogs restore focus; this is a safety net for older browsers.
    if (opener && document.activeElement === document.body && document.contains(opener)) {
      opener.focus();
    }
    opener = null;
  });

  /** Opens the menu if the address contains #menu or #menu/<category>. */
  function openFromHash() {
    const match = HASH_PATTERN.exec(location.hash);
    if (match) open(match[1]);
  }

  select(activeId);
  return { element: dialog, open, close, openFromHash };
}
