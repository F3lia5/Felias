import { site } from '../config/site.js';
import { esc } from './dom.js';

const DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const WEEKDAY_KEYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

/** Current weekday and minutes since midnight in the café's time zone. */
function nowInZone(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: site.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type).value;
  return {
    day: WEEKDAY_KEYS.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

const scheduleFor = (day) => site.hours.find((h) => h.days.includes(day));

export function getStatus(date = new Date()) {
  const { day, minutes } = nowInZone(date);
  const today = scheduleFor(day);

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { isOpen: true, day, text: `Şimdi açık. Kapanış saati ${today.close}.` };
  }

  for (let i = 0; i < 8; i += 1) {
    const d = (day + i) % 7;
    const next = scheduleFor(d);
    if (next && (i > 0 || minutes < toMinutes(next.open))) {
      const label = i === 0 ? 'Bugün' : i === 1 ? 'Yarın' : DAY_NAMES[d];
      return { isOpen: false, day, text: `Şu an kapalı. Sonraki açılış: ${label} ${next.open}.` };
    }
  }
  return { isOpen: false, day, text: 'Şu an kapalı.' };
}

/** Small status line with a colored dot. Kept in sync by refreshStatus(). */
export function renderStatus() {
  const status = getStatus();
  return `<p class="status" data-status data-open="${status.isOpen}">
    <span class="status__dot" aria-hidden="true"></span>
    <span data-status-text>${esc(status.text)}</span>
  </p>`;
}

/** Updates every status line and highlights today's row in the hours table. */
export function refreshStatus() {
  const status = getStatus();
  document.querySelectorAll('[data-status]').forEach((el) => {
    el.dataset.open = String(status.isOpen);
    el.querySelector('[data-status-text]').textContent = status.text;
  });
  document.querySelectorAll('[data-hours-row]').forEach((row) => {
    const days = row.dataset.hoursRow.split(',').map(Number);
    if (days.includes(status.day)) row.setAttribute('aria-current', 'date');
    else row.removeAttribute('aria-current');
  });
}
