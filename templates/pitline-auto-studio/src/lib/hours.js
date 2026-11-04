import { site } from '../config/site.js';
import { esc } from './dom.js';

export const DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const WEEKDAY_KEYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};
const toTime = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

/** Belirli bir gün için çalışma saatleri. Kapalı günlerde null döner. */
export function scheduleFor(day) {
  const entry = site.hours.find((h) => h.days.includes(day));
  return entry && entry.open && entry.close ? entry : null;
}

/** Stüdyonun saat dilimine göre şu anki gün ve dakika. */
export function nowInZone(date = new Date()) {
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

/** Bugünün tarihi (YYYY-MM-DD), stüdyonun saat diliminde. */
export function todayISO(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: site.timezone }).format(date);
}

/** 'YYYY-MM-DD' metnini doğrular ve gün numarasını döndürür. Geçersizse null. */
export function parseISODate(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const utc = new Date(Date.UTC(y, mo - 1, d, 12));
  if (utc.getUTCFullYear() !== y || utc.getUTCMonth() !== mo - 1 || utc.getUTCDate() !== d) return null;
  return { utc, day: utc.getUTCDay() };
}

/** '5 Kasım 2026 Perşembe' biçiminde Türkçe tarih. */
export function formatDateTR(value) {
  const parsed = parseISODate(value);
  if (!parsed) return value;
  return new Intl.DateTimeFormat(site.locale, {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(parsed.utc);
}

/**
 * Seçilen tarih için uygun saatleri üretir.
 * Dönen değer: { closed, dayName, slots } — bugünse geçmiş saatler listeden çıkarılır.
 */
export function slotsFor(isoDate, now = new Date()) {
  const parsed = parseISODate(isoDate);
  if (!parsed) return { closed: false, invalid: true, dayName: '', slots: [] };

  const dayName = DAY_NAMES[parsed.day];
  const schedule = scheduleFor(parsed.day);
  if (!schedule) return { closed: true, dayName, slots: [] };

  const step = site.appointment.slotMinutes;
  const open = toMinutes(schedule.open);
  const close = toMinutes(schedule.close);
  const current = nowInZone(now).minutes;
  const isToday = isoDate === todayISO(now);

  const slots = [];
  for (let t = open; t + step <= close; t += step) {
    if (!isToday || t > current) slots.push(toTime(t));
  }
  return { closed: false, dayName, slots };
}

/** Küçük durum satırı: şimdi açık mı, ne zaman açılıyor. */
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

export function renderStatus() {
  const status = getStatus();
  return `<p class="status" data-status data-open="${status.isOpen}">
    <span class="status__dot" aria-hidden="true"></span>
    <span data-status-text>${esc(status.text)}</span>
  </p>`;
}

/** Durum satırlarını ve çalışma saatleri tablosunda bugünü günceller. */
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
