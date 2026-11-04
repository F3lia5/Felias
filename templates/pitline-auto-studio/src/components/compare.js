import { content } from '../config/content.js';
import { images } from '../config/images.js';
import { esc } from '../lib/dom.js';
import { media, watchMedia } from '../lib/media.js';

const ARROWS = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
  <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
</svg>`;

export function renderCompare() {
  const c = content.gallery;
  const cases = images.compare;
  const first = cases[0];

  const buttons = cases
    .map(
      (item, i) => `<button class="case" type="button" data-case="${esc(item.id)}" aria-pressed="${i === 0}">${esc(item.label)}</button>`,
    )
    .join('');

  return `
  <section class="section gallery" id="galeri" aria-labelledby="galeri-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="galeri-title" data-reveal>${esc(c.title)}</h2>
        <p data-reveal>${esc(c.intro)}</p>
      </div>

      <div class="gallery__layout">
        <div class="compare" data-compare style="--pos: 50%">
          <div class="compare__layer" data-layer="after">${media(first.after)}</div>
          <div class="compare__layer compare__layer--before" data-layer="before">${media(first.before)}</div>
          <span class="compare__tag compare__tag--before">${esc(c.before)}</span>
          <span class="compare__tag compare__tag--after">${esc(c.after)}</span>
          <div class="compare__line">
            <button class="compare__handle" type="button" role="slider"
              aria-label="${esc(c.sliderLabel)}" aria-orientation="horizontal"
              aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"
              aria-valuetext="%50 ${esc(c.before)}, %50 ${esc(c.after)}">${ARROWS}</button>
          </div>
        </div>

        <div class="gallery__side">
          <div class="cases" role="group" aria-label="${esc(c.casesLabel)}">${buttons}</div>
          <p class="gallery__caption" data-caption aria-live="polite">${esc(first.caption)}</p>
          <p class="note">${esc(c.note)}</p>
        </div>
      </div>
    </div>
  </section>`;
}

export function initCompare() {
  const c = content.gallery;
  const root = document.querySelector('[data-compare]');
  if (!root) return;

  const handle = root.querySelector('.compare__handle');
  const caption = document.querySelector('[data-caption]');
  let pos = 50;
  let dragging = false;

  const set = (value) => {
    pos = Math.min(100, Math.max(0, value));
    const rounded = Math.round(pos);
    root.style.setProperty('--pos', `${pos}%`);
    handle.setAttribute('aria-valuenow', String(rounded));
    handle.setAttribute(
      'aria-valuetext',
      `%${rounded} ${c.before}, %${100 - rounded} ${c.after}`,
    );
  };

  const fromEvent = (e) => {
    const rect = root.getBoundingClientRect();
    set(((e.clientX - rect.left) / rect.width) * 100);
  };

  root.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    root.classList.add('is-dragging');
    try {
      root.setPointerCapture(e.pointerId);
    } catch {
      // Bazı tarayıcılar iptal edilmiş işaretçiyi yakalayamaz; sürükleme yine de çalışır.
    }
    fromEvent(e);
    handle.focus({ preventScroll: true });
  });
  root.addEventListener('pointermove', (e) => {
    if (dragging) fromEvent(e);
  });
  const stop = () => {
    dragging = false;
    root.classList.remove('is-dragging');
  };
  root.addEventListener('pointerup', stop);
  root.addEventListener('pointercancel', stop);
  root.addEventListener('lostpointercapture', stop);

  handle.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 10 : 4;
    let next = null;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = pos - step;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = pos + step;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 100;
    else if (e.key === 'PageDown') next = pos - 10;
    else if (e.key === 'PageUp') next = pos + 10;
    if (next === null) return;
    e.preventDefault();
    set(next);
  });

  // Örnek değiştirme (boya / jant ...)
  document.querySelector('.cases').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-case]');
    if (!btn) return;
    const item = images.compare.find((x) => x.id === btn.dataset.case);
    if (!item) return;
    document.querySelectorAll('[data-case]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    root.querySelector('[data-layer="after"]').innerHTML = media(item.after);
    root.querySelector('[data-layer="before"]').innerHTML = media(item.before);
    caption.textContent = item.caption;
    watchMedia(root);
  });

  set(50);
}
