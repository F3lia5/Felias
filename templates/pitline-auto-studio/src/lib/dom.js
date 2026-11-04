import { site } from '../config/site.js';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** HTML şablonuna konacak metni güvenli hale getirir. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

const priceFormatter = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) => priceFormatter.format(amount);
