/**
 * Hizmetler ve paketler. Açıklamaları, süreleri ve fiyatları buradan düzenleyin.
 * Tüm fiyatlar DEMO (örnek) tutarlardır ve TL cinsindendir.
 * Form seçenekleri, hizmet listesi ve paket karşılaştırması bu dosyadan üretilir.
 */

export const services = [
  {
    id: 'dis-yikama',
    name: 'Dış Yıkama',
    summary: 'İki kovalı elde yıkama, jant ve çamurluk içi temizliği, kontrollü kurulama.',
    duration: 'Yaklaşık 1 saat',
    from: 650,
  },
  {
    id: 'ic-detay',
    name: 'İç Detaylandırma',
    summary: 'Döşeme, plastik ve cam yüzeylerin derinlemesine temizliği; koltuk altı ve dar köşeler dahil.',
    duration: 'Yaklaşık 3 saat',
    from: 1800,
  },
  {
    id: 'boya-duzeltme',
    name: 'Boya Düzeltme',
    summary: 'Çizik, hare ve matlaşmayı kademeli polisajla gideren, ışık altında kontrol edilen işlem.',
    duration: '1–2 gün',
    from: 6500,
  },
  {
    id: 'seramik-kaplama',
    name: 'Seramik Kaplama',
    summary: 'Düzeltilmiş boyanın üzerine uygulanan, yüzeyi korumaya yönelik seramik koruma katmanı.',
    duration: '2–3 gün',
    from: 9000,
  },
  {
    id: 'kapsamli-detay',
    name: 'Kapsamlı Detay',
    summary: 'Dış, iç, boya ve cam yüzeyleri tek planda bir araya getiren, araca özel hazırlanan çalışma.',
    duration: '2–4 gün',
    from: 12500,
  },
];

/** Paket karşılaştırma tablosundaki satırlar (sıra, ekranda gösterilen sıradır). */
export const packageFeatures = [
  { id: 'yikama', label: 'İki kademeli elde yıkama' },
  { id: 'jant', label: 'Jant ve çamurluk içi temizliği' },
  { id: 'cam', label: 'Cam iç ve dış temizliği' },
  { id: 'ic-temel', label: 'İç mekân vakumlama ve silme' },
  { id: 'kil', label: 'Kil ile yüzey arındırma' },
  { id: 'doseme', label: 'Koltuk ve döşeme derin temizliği' },
  { id: 'cila', label: 'Tek kademeli boya parlatma' },
  { id: 'duzeltme', label: 'Çok kademeli boya düzeltme' },
  { id: 'seramik', label: 'Seramik kaplama' },
  { id: 'kontrol', label: 'Teslimde ışık altında birlikte kontrol' },
];

export const packages = [
  {
    id: 'pit-stop',
    name: 'Pit Stop',
    lang: 'en', // büyük harfe çevirmede doğru kuralı seçer; Türkçe bir ad kullanırsanız bu satırı silin
    tagline: 'Düzenli bakım için temiz ve hızlı başlangıç.',
    price: 1250,
    duration: 'Yaklaşık 2 saat',
    includes: ['yikama', 'jant', 'cam', 'ic-temel'],
  },
  {
    id: 'showroom',
    name: 'Showroom',
    lang: 'en', // büyük harfe çevirmede doğru kuralı seçer; Türkçe bir ad kullanırsanız bu satırı silin
    tagline: 'Yüzeyi arındırıp parlatan, iç mekânı derinlemesine temizleyen denge.',
    price: 3900,
    duration: 'Yaklaşık 5 saat',
    highlight: 'Dengeli seçenek',
    includes: ['yikama', 'jant', 'cam', 'ic-temel', 'kil', 'doseme', 'cila', 'kontrol'],
  },
  {
    id: 'concours',
    name: 'Concours',
    lang: 'en', // büyük harfe çevirmede doğru kuralı seçer; Türkçe bir ad kullanırsanız bu satırı silin
    tagline: 'Boyayı düzeltip koruma katmanıyla tamamlayan en kapsamlı paket.',
    price: 14500,
    duration: '2–3 gün',
    includes: ['yikama', 'jant', 'cam', 'ic-temel', 'kil', 'doseme', 'duzeltme', 'seramik', 'kontrol'],
  },
];

export const notSureOption = { id: 'oneri', name: 'Emin değilim, önerinizi isterim' };
