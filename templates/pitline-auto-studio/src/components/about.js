import { content } from '../config/content.js';
import { images } from '../config/images.js';
import { esc } from '../lib/dom.js';
import { media } from '../lib/media.js';

export function renderAbout() {
  const c = content.about;
  const principles = c.principles
    .map(
      (p) => `<div class="principle">
        <dt>${esc(p.term)}</dt>
        <dd>${esc(p.text)}</dd>
      </div>`,
    )
    .join('');

  return `
  <section class="section about" id="hakkinda" aria-labelledby="hakkinda-title">
    <div class="wrap about__grid">
      <div class="about__media">${media({ ...images.about, alt: c.alt })}</div>
      <div class="about__copy">
        <h2 id="hakkinda-title" data-reveal>${esc(c.title)}</h2>
        <p class="about__lead">${esc(c.lead)}</p>
        <dl class="principles">${principles}</dl>
        <p class="note">${esc(c.demo)}</p>
      </div>
    </div>
  </section>`;
}
