import { site } from '../config/site.js';
import { content } from '../config/content.js';
import { services, packages, notSureOption } from '../data/services.js';
import { esc } from '../lib/dom.js';
import { slotsFor, todayISO, parseISODate, formatDateTR } from '../lib/hours.js';

const NOTE_MAX = 400;

/** Seçenek değeri → ekranda ve mesajda görünen ad. Hizmet ve paket verilerinden üretilir. */
function serviceOptions() {
  return [
    { group: 'Hizmetler', items: services.map((s) => ({ value: `service:${s.id}`, label: s.name })) },
    { group: 'Paketler', items: packages.map((p) => ({ value: `package:${p.id}`, label: `${p.name} paketi` })) },
    { group: '', items: [{ value: `other:${notSureOption.id}`, label: notSureOption.name }] },
  ];
}

const serviceLabel = (value) =>
  serviceOptions()
    .flatMap((g) => g.items)
    .find((i) => i.value === value)?.label || '';

/** WhatsApp bağlantısı: yapılandırılabilir numara + URL ile kodlanmış Türkçe mesaj. */
export function buildWhatsAppMessage({ service, vehicle, date, time, note }) {
  const m = content.appointment.message;
  const cleanNote = (note || '').replace(/\r\n/g, '\n').trim();
  return [
    site.whatsapp.greeting,
    '',
    `${m.service}: ${serviceLabel(service)}`,
    `${m.vehicle}: ${vehicle}`,
    `${m.date}: ${formatDateTR(date)}`,
    `${m.time}: ${time}`,
    `${m.note}: ${cleanNote || m.noNote}`,
    '',
    m.closing,
  ].join('\n');
}

export function buildWhatsAppUrl(message) {
  const phone = String(site.whatsapp.phone).replace(/\D/g, '');
  return `${site.whatsapp.baseUrl}${phone}?text=${encodeURIComponent(message)}`;
}

export function renderAppointment() {
  const c = content.appointment;

  const serviceSelect = serviceOptions()
    .map((g) => {
      const opts = g.items.map((i) => `<option value="${esc(i.value)}">${esc(i.label)}</option>`).join('');
      return g.group ? `<optgroup label="${esc(g.group)}">${opts}</optgroup>` : opts;
    })
    .join('');

  const vehicleOptions = site.appointment.vehicleTypes.map((v) => `<option value="${esc(v)}">${esc(v)}</option>`).join('');

  const field = (name, label, control, hint = '') => `
    <div class="field" data-field="${name}">
      <label class="field__label" for="f-${name}">${esc(label)}</label>
      ${control}
      ${hint ? `<p class="field__hint" id="hint-${name}">${esc(hint)}</p>` : ''}
      <p class="field__error" id="err-${name}" hidden></p>
    </div>`;

  return `
  <section class="section appointment" id="randevu" aria-labelledby="randevu-title">
    <div class="wrap appointment__grid">
      <div class="appointment__intro">
        <h2 id="randevu-title" data-reveal>${esc(c.title)}</h2>
        <p>${esc(c.intro)}</p>
      </div>

      <form class="form" data-form novalidate>
        <p class="form__summary" data-summary role="alert" hidden>${esc(c.errors.summary)}</p>

        <div class="form__row">
          ${field(
            'service',
            c.labels.service,
            `<select class="control" id="f-service" name="service" required aria-describedby="err-service">
              <option value="">${esc(c.placeholders.service)}</option>${serviceSelect}
            </select>`,
          )}
          ${field(
            'vehicle',
            c.labels.vehicle,
            `<select class="control" id="f-vehicle" name="vehicle" required aria-describedby="err-vehicle">
              <option value="">${esc(c.placeholders.vehicle)}</option>${vehicleOptions}
            </select>`,
          )}
        </div>

        <div class="form__row">
          ${field(
            'date',
            c.labels.date,
            `<input class="control" id="f-date" name="date" type="date" required min="${todayISO()}" aria-describedby="err-date">`,
          )}
          ${field(
            'time',
            c.labels.time,
            `<select class="control" id="f-time" name="time" required disabled aria-describedby="hint-time err-time">
              <option value="">${esc(c.placeholders.timeNoDate)}</option>
            </select>`,
            c.hints.slots,
          )}
        </div>

        ${field(
          'note',
          c.labels.note,
          `<textarea class="control control--area" id="f-note" name="note" rows="4" maxlength="${NOTE_MAX}"
            placeholder="${esc(c.placeholders.note)}" aria-describedby="hint-note err-note"></textarea>`,
          c.hints.note,
        )}

        <button class="btn btn--primary btn--block" type="submit">${esc(c.submit)}</button>

        <div class="form__result" data-result role="status" hidden>
          <p class="form__result-title">${esc(c.result.title)}</p>
          <p>${esc(c.result.text)}</p>
          <p><a class="link" data-retry href="#" target="_blank" rel="noopener noreferrer">${esc(c.result.retry)}</a></p>
          <details class="form__preview">
            <summary>${esc(c.result.preview)}</summary>
            <pre data-preview></pre>
          </details>
        </div>
      </form>
    </div>
  </section>`;
}

export function initAppointment() {
  const c = content.appointment;
  const form = document.querySelector('[data-form]');
  if (!form) return;

  const el = (name) => form.elements[name];
  const summary = form.querySelector('[data-summary]');
  const result = form.querySelector('[data-result]');
  const touched = new Set();
  let submitted = false;

  const setError = (name, message) => {
    const control = el(name);
    const box = form.querySelector(`#err-${name}`);
    control.setAttribute('aria-invalid', message ? 'true' : 'false');
    form.querySelector(`[data-field="${name}"]`).classList.toggle('has-error', Boolean(message));
    box.textContent = message;
    box.hidden = !message;
  };

  const refreshTimes = () => {
    const timeSelect = el('time');
    const previous = timeSelect.value;
    const info = slotsFor(el('date').value);
    let label = c.placeholders.timeNoDate;
    let slots = [];

    if (!info.invalid && !info.closed) {
      slots = info.slots;
      label = slots.length ? c.placeholders.time : c.errors.noSlots.split('.')[0];
    } else if (info.closed) {
      label = `${info.dayName} günü kapalıyız`;
    }

    timeSelect.innerHTML =
      `<option value="">${esc(label)}</option>` + slots.map((t) => `<option value="${t}">${t}</option>`).join('');
    timeSelect.disabled = slots.length === 0;
    if (slots.includes(previous)) timeSelect.value = previous;
    return info;
  };

  const validators = {
    service: () => (el('service').value ? '' : c.errors.service),
    vehicle: () => (el('vehicle').value ? '' : c.errors.vehicle),
    date: () => {
      const value = el('date').value;
      if (!value) return c.errors.date;
      if (!parseISODate(value)) return c.errors.dateInvalid;
      if (value < todayISO()) return c.errors.datePast;
      const info = slotsFor(value);
      if (info.closed) return `${info.dayName} günü kapalıyız. Lütfen başka bir gün seçin.`;
      if (!info.slots.length) return c.errors.noSlots;
      return '';
    },
    time: () => (el('time').value ? '' : c.errors.time),
    note: () => (el('note').value.length > NOTE_MAX ? c.errors.note : ''),
  };

  const validate = (name) => {
    const message = validators[name]();
    setError(name, message);
    return message === '';
  };

  const hideResult = () => {
    result.hidden = true;
  };

  form.addEventListener('input', (e) => {
    const name = e.target.name;
    if (!name) return;
    hideResult();
    if (name === 'date') {
      refreshTimes();
      validate('date');
      if (touched.has('time') || submitted) validate('time');
      return;
    }
    if (touched.has(name) || submitted) validate(name);
  });
  form.addEventListener('change', (e) => {
    const name = e.target.name;
    if (name === 'date') return; // 'input' olayı zaten işledi
    if (name) {
      touched.add(name);
      validate(name);
    }
  });
  form.addEventListener('focusout', (e) => {
    const name = e.target.name;
    if (name && validators[name] && (touched.has(name) || el(name).value)) {
      touched.add(name);
      validate(name);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitted = true;
    hideResult();
    refreshTimes();

    const order = ['service', 'vehicle', 'date', 'time', 'note'];
    const invalid = order.filter((name) => !validate(name));
    summary.hidden = invalid.length === 0;

    if (invalid.length) {
      el(invalid[0]).focus();
      return;
    }

    const data = {
      service: el('service').value,
      vehicle: el('vehicle').value,
      date: el('date').value,
      time: el('time').value,
      note: el('note').value,
    };
    const message = buildWhatsAppMessage(data);
    const url = buildWhatsAppUrl(message);

    form.querySelector('[data-retry]').href = url;
    form.querySelector('[data-preview]').textContent = message;
    result.hidden = false;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  refreshTimes();
}

/** Paket/hizmet düğmesine basılınca formdaki seçimi doldurur. */
export function preselectService(value) {
  const select = document.getElementById('f-service');
  if (!select || ![...select.options].some((o) => o.value === value)) return;
  select.value = value;
  select.dispatchEvent(new Event('input', { bubbles: true }));
}
