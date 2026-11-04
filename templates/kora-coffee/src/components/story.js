import { content } from '../config/content.js';
import { esc } from '../lib/dom.js';
import { picture } from '../lib/picture.js';

export function renderStory() {
  const c = content.story;
  const principles = c.principles
    .map(
      (p) => `<div class="principle">
        <dt>${esc(p.term)}</dt>
        <dd>${esc(p.text)}</dd>
      </div>`,
    )
    .join('');

  return `
  <section class="section story" id="hikaye" aria-labelledby="hikaye-title">
    <div class="wrap story__grid">
      <div class="story__media">
        ${picture('story', { sizes: '(min-width: 56rem) 40vw, 100vw' })}
      </div>
      <div class="story__copy">
        <h2 id="hikaye-title">${esc(c.title)}</h2>
        <p class="story__lead">${esc(c.lead)}</p>
        <dl class="principles">${principles}</dl>
      </div>
    </div>
  </section>`;
}
