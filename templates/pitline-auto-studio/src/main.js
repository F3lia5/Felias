import '@fontsource-variable/archivo/wdth.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/gallery.css';
import './styles/form.css';

import { renderHeader, initHeader } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderServices } from './components/services.js';
import { renderPackages } from './components/packages.js';
import { renderCompare, initCompare } from './components/compare.js';
import { renderProcess } from './components/process.js';
import { renderAbout } from './components/about.js';
import { renderAppointment, initAppointment, preselectService } from './components/appointment.js';
import { renderContact } from './components/contact.js';
import { renderFooter } from './components/footer.js';
import { watchMedia } from './lib/media.js';
import { refreshStatus } from './lib/hours.js';
import { initReveal } from './lib/reveal.js';

document.getElementById('app').innerHTML = `
  ${renderHeader()}
  <main id="icerik" tabindex="-1">
    ${renderHero()}
    ${renderServices()}
    ${renderPackages()}
    ${renderCompare()}
    ${renderProcess()}
    ${renderAbout()}
    ${renderAppointment()}
    ${renderContact()}
  </main>
  ${renderFooter()}
`;

initHeader();
initCompare();
initAppointment();
watchMedia(document);
refreshStatus();
window.setInterval(refreshStatus, 60_000);
initReveal();

// [data-service] taşıyan bağlantılar formdaki hizmet seçimini doldurur; gezinmeyi tarayıcı yapar (#randevu).
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-service]');
  if (trigger) preselectService(trigger.dataset.service);
});
