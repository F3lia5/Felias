/**
 * İşletme kimliği, iletişim, adres, çalışma saatleri ve WhatsApp ayarları.
 * Başka bir müşteri için şablonu uyarlarken ilk bu dosyayı düzenleyin.
 * (Hizmetler/paketler: src/data/services.js, metinler: src/config/content.js,
 *  görseller: src/config/images.js, renkler ve yazı tipi: src/styles/tokens.css)
 *
 * DEMO: Aşağıdaki tüm iletişim ve adres bilgileri örnektir, gerçek bir işletmeye ait değildir.
 */
export const site = {
  brand: {
    name: 'PITLINE Auto Studio',
    shortName: 'PITLINE',
    tagline: 'Auto Studio',
  },

  locale: 'tr-TR',
  currency: 'TRY',
  timezone: 'Europe/Istanbul',

  seo: {
    title: 'PITLINE Auto Studio | Oto detailing, boya düzeltme ve seramik kaplama',
    description:
      'PITLINE Auto Studio: dış yıkama, iç detaylandırma, boya düzeltme ve seramik kaplama hizmetleri. Demo şablon. WhatsApp üzerinden randevu talebi gönderin.',
    // Mutlak adres, tercihen 1200x630. Gerçek müşteri görseli eklenince değiştirin.
    ogImage: '',
  },

  /** Hizmet fiyatlarının ve bilgilerin örnek olduğunu belirten genel not. Gerçek müşteri için kaldırın. */
  demoNotice: 'Demo şablon: fiyatlar, telefon, adres ve saatler örnektir.',

  /**
   * WhatsApp randevu talebi.
   * phone: ülke koduyla, yalnızca rakamlar (başında + veya 0 olmadan). Örnek: 905551234567
   * DEMO numara geçersizdir; gerçek müşterinin numarasıyla değiştirin.
   */
  whatsapp: {
    phone: '905550000000',
    greeting: 'Merhaba, PITLINE Auto Studio için randevu talebi iletmek istiyorum.',
    // Ayrı bir bağlantı yapısı gerekirse (ör. WhatsApp Business) buradan değiştirin.
    baseUrl: 'https://wa.me/',
  },

  contact: {
    phoneDisplay: '+90 555 000 00 00',
    phoneHref: 'tel:+905550000000',
    email: '',
  },

  /** DEMO adres. Gerçek müşteri bilgisiyle değiştirin. */
  location: {
    isDemo: true,
    addressLines: ['Örnek Mahallesi, Örnek Sanayi Sitesi No: 8', 'İstanbul'],
    // Müşterinin Google Maps paylaşım bağlantısı ile değiştirin.
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=%C4%B0stanbul',
  },

  /**
   * Çalışma saatleri. days: 0 = Pazar, 1 = Pazartesi ... 6 = Cumartesi.
   * Kapalı günler için open/close boş bırakılır ('').
   * Randevu formundaki saat seçenekleri bu saatlerden ve slotMinutes'tan üretilir.
   */
  hours: [
    { label: 'Pazartesi – Cuma', days: [1, 2, 3, 4, 5], open: '09:00', close: '19:00' },
    { label: 'Cumartesi', days: [6], open: '09:00', close: '17:00' },
    { label: 'Pazar', days: [0], open: '', close: '' },
  ],

  appointment: {
    slotMinutes: 60,
    /** Araç tipleri, formdaki "Araç tipi" listesi */
    vehicleTypes: ['Küçük sınıf / Hatchback', 'Sedan', 'SUV / Crossover', 'Station Wagon', 'Ticari / Minivan', 'Spor / Premium'],
  },
};
