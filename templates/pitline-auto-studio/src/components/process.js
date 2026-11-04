import { content } from '../config/content.js';
import { esc } from '../lib/dom.js';

export function renderProcess() {
  const c = content.process;
  const steps = c.steps
    .map(
      (s, i) => `<li class="step" data-reveal>
        <span class="step__no" aria-hidden="true">${i + 1}</span>
        <h3 class="step__title"><span class="sr-only">${i + 1}. adım: </span>${esc(s.title)}</h3>
        <p class="step__text">${esc(s.text)}</p>
      </li>`,
    )
    .join('');

  return `
  <section class="section process" id="surec" aria-labelledby="surec-title">
    <div class="wrap">
      <h2 id="surec-title" data-reveal>${esc(c.title)}</h2>
      <ol class="steps">${steps}</ol>
    </div>
  </section>`;
}
