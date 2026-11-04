import { site } from '../config/site.js';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapes text before it is placed inside an HTML template string. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

const priceFormatter = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) => priceFormatter.format(amount);

/** Public menu address that the QR code points to. Empty string when it cannot be determined. */
export function getMenuUrl() {
  if (site.menuUrl) return site.menuUrl;
  if (typeof location !== 'undefined' && location.protocol.startsWith('http')) {
    return `${location.origin}${location.pathname}#menu`;
  }
  return '';
}
