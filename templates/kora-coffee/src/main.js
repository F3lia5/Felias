import '@fontsource/young-serif/index.css';
import '@fontsource-variable/hanken-grotesk/index.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/menu.css';

import { renderHeader, initHeader } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderFeatured } from './components/featured.js';
import { renderQrSection } from './components/qrSection.js';
import { renderStory } from './components/story.js';
import { renderLocation } from './components/location.js';
import { renderGallery } from './components/gallery.js';
import { renderFooter } from './components/footer.js';
import { createMenuDialog } from './components/menuDialog.js';
import { watchImages } from './lib/picture.js';
import { refreshStatus } from './lib/hours.js';

const app = document.getElementById('app');

app.innerHTML = `
  ${renderHeader()}
  <main id="icerik" tabindex="-1">
    ${renderHero()}
    ${renderFeatured()}
    ${renderQrSection()}
    ${renderStory()}
    ${renderLocation()}
    ${renderGallery()}
  </main>
  ${renderFooter()}
`;

const menu = createMenuDialog();
document.body.append(menu.element);

initHeader();
watchImages(document);
refreshStatus();
window.setInterval(refreshStatus, 60_000);

// Every element with [data-open-menu] opens the menu. Optional data-category preselects a category.
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open-menu]');
  if (!trigger) return;
  event.preventDefault();
  menu.open(trigger.dataset.category, trigger);
});

window.addEventListener('hashchange', menu.openFromHash);
menu.openFromHash();
