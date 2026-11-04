/**
 * Business identity, location, hours, contact and social links.
 * Edit this file to adapt the template to another café.
 * (Colors and fonts live in src/styles/tokens.css, the menu in src/data/menu.js,
 *  photos in src/config/images.js, page copy in src/config/content.js.)
 */
export const site = {
  brand: {
    name: 'KORA Coffee',
    shortName: 'KORA',
  },

  locale: 'tr-TR',
  currency: 'TRY',
  timezone: 'Europe/Istanbul',

  seo: {
    title: "KORA Coffee | Kırklareli'nde specialty kahve ve QR menü",
    description:
      "KORA Coffee, Kırklareli'nde özenle hazırlanan specialty kahve, soğuk demlemeler ve günlük tatlılar sunan sakin bir mahalle kahvecisi. Menüyü hemen inceleyin.",
    // Absolute URL, ideally 1200x630. Replace with a file in /public once you have a real photo.
    ogImage:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=70&w=1200&h=630',
  },

  /**
   * Public address of the menu. The QR code on the page points here.
   * Leave empty to use "<this site's address>#menu" automatically.
   */
  menuUrl: '',

  /** DEMO location. Replace every field below with the client's real details. */
  location: {
    isDemo: true,
    demoNotice:
      'Bu adres örnek amaçlıdır ve gerçek bir işletmeyi göstermez. Gerçek müşteri bilgileri eklendiğinde bu not kaldırılır.',
    addressLines: ['Örnek Mahalle, Örnek Sokak No: 12', 'Merkez, Kırklareli'],
    district: 'Merkez',
    city: 'Kırklareli',
    // Replace with the client's Google Maps share link (or "Directions" link).
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=K%C4%B1rklareli',
  },

  /**
   * Opening hours. days: 0 = Pazar, 1 = Pazartesi ... 6 = Cumartesi.
   * Times are 24-hour "HH:MM" and the closing time must be later than the opening time on the same day.
   */
  hours: [
    { label: 'Hafta içi', range: 'Pazartesi – Cuma', days: [1, 2, 3, 4, 5], open: '08:00', close: '22:00' },
    { label: 'Hafta sonu', range: 'Cumartesi – Pazar', days: [6, 0], open: '09:00', close: '23:00' },
  ],

  /** Leave a field empty ('') to hide it. */
  contact: {
    email: 'merhaba@example.com',
    phone: '',
  },

  /** Replace with the client's real profile. The page never shows a fake live feed. */
  social: {
    instagram: {
      url: 'https://www.instagram.com/',
      label: "Instagram'da takip edin",
    },
  },
};
