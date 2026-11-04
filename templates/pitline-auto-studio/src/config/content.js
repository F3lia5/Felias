/** Sayfa metinleri (Türkçe). Bileşenlere dokunmadan buradan düzenleyin. */
export const content = {
  nav: {
    services: 'Hizmetler',
    packages: 'Paketler',
    gallery: 'Galeri',
    contact: 'İletişim',
    cta: 'Randevu Talebi',
  },

  hero: {
    title: 'Işıkta kusur saklanmaz.',
    lead: 'Her araç, kontrollü ışık altında ve ölçülü adımlarla elde detaylandırılır. Boya, iç mekân ve cam yüzeyleri temiz, net ve düzgün teslim edilir.',
    primaryCta: 'Randevu Talebi Gönder',
    secondaryCta: 'Hizmetlere Göz At',
    alt: 'Stüdyo ışığı altında duran koyu renkli spor coupe araç, yandan görünüm',
  },

  services: {
    title: 'Hizmetler',
    intro: 'Yüzeyin durumuna göre seçilen, birbirini tamamlayan beş çalışma.',
    from: 'Başlangıç',
    request: 'Bu hizmeti talep et',
    note: 'Süreler ve başlangıç fiyatları örnektir. Kesin bilgi, araç görüldükten sonra paylaşılır.',
  },

  packages: {
    title: 'Paketler',
    intro: 'Üç paket, aynı özenle. Hangi işlerin dahil olduğunu satır satır karşılaştırın.',
    note: 'Fiyatlar örnektir ve araç tipine göre değişebilir. Kesin fiyat, aracı görmeden verilmez.',
    cta: 'Bu paketi talep et',
    included: 'Dahil',
    excluded: 'Dahil değil',
  },

  gallery: {
    title: 'Önce / sonra',
    intro: 'Kaydırıcıyı sürükleyin. Sol taraf işlem öncesini, sağ taraf işlem sonrasını gösterir.',
    before: 'Önce',
    after: 'Sonra',
    sliderLabel: 'Önce ve sonra karşılaştırma konumu',
    note: 'Görseller temsilidir. Gerçek müşteri çalışmalarının fotoğrafları eklenene kadar çizimler kullanılır.',
    casesLabel: 'Karşılaştırma örnekleri',
  },

  process: {
    title: 'Nasıl çalışır?',
    steps: [
      {
        title: 'Talebinizi gönderin',
        text: 'Formdan hizmeti, araç tipini ve uygun olduğunuz gün ile saati seçin. Talebiniz hazır bir WhatsApp mesajına dönüşür.',
      },
      {
        title: 'Stüdyo yanıtlasın',
        text: 'Stüdyo mesajınızı inceler, aracın durumuna göre süre ve fiyat bilgisini paylaşır. Randevu, ancak stüdyonun yazılı onayıyla kesinleşir.',
      },
      {
        title: 'Birlikte kontrol edin',
        text: 'Teslimde araç, ışık altında sizinle birlikte gözden geçirilir. Soru ve notlarınız o anda ele alınır.',
      },
    ],
  },

  about: {
    title: 'Acele edilmeyen bir atölye.',
    lead: 'PITLINE Auto Studio, aracın yüzeyine tek tek bakılan, işin süresinden çok sonucuna önem verilen kurgusal bir detailing stüdyosudur.',
    principles: [
      { term: 'Kontrollü ışık', text: 'Boyadaki çizik ve hare bakış açısına göre görünür olur. Bu yüzden çalışma alanı sabit ve güçlü bir ışıkla kurulur.' },
      { term: 'Ölçülü ürün', text: 'Her yüzeye uygun ürün, gerektiği kadar kullanılır. Daha fazlası daha iyi sonuç anlamına gelmez.' },
      { term: 'Açık iletişim', text: 'Başlamadan önce yapılacak iş ve süre yazılı olarak paylaşılır.' },
    ],
    demo: 'Bu metin demo içeriktir; gerçek bir işletmeyi tanımlamaz.',
    alt: 'Boya yüzeyinde dönen polisaj pedini gösteren soyut çizim',
  },

  appointment: {
    title: 'Randevu talebi',
    intro: 'Formu doldurun, WhatsApp mesajınız hazırlansın. Bu yalnızca bir taleptir; randevu stüdyonun onayıyla kesinleşir.',
    submit: 'WhatsApp ile Talep Gönder',
    labels: {
      service: 'Hizmet veya paket',
      vehicle: 'Araç tipi',
      date: 'Tercih edilen tarih',
      time: 'Tercih edilen saat',
      note: 'Not (isteğe bağlı)',
    },
    placeholders: {
      service: 'Seçin',
      vehicle: 'Seçin',
      timeNoDate: 'Önce tarih seçin',
      time: 'Saat seçin',
      note: 'Aracın modeli, mevcut durumu veya özel isteğiniz',
    },
    hints: {
      note: 'En fazla 400 karakter.',
      slots: 'Saatler, stüdyonun çalışma saatlerine göre listelenir.',
    },
    result: {
      title: 'Mesajınız hazırlandı',
      text: 'WhatsApp yeni sekmede açıldı. Talebin iletilmesi için mesajı orada göndermeniz gerekir. Bu bir randevu onayı değildir; stüdyo yanıt verene kadar randevu kesinleşmiş sayılmaz.',
      retry: "WhatsApp açılmadıysa buraya tıklayın",
      preview: 'Gönderilecek mesajı göster',
    },
    errors: {
      service: 'Lütfen bir hizmet veya paket seçin.',
      vehicle: 'Lütfen araç tipini seçin.',
      date: 'Lütfen bir tarih seçin.',
      datePast: 'Geçmiş bir tarih seçilemez.',
      dateInvalid: 'Lütfen geçerli bir tarih girin.',
      time: 'Lütfen bir saat seçin.',
      noSlots: 'Bugün için uygun saat kalmadı. Lütfen başka bir gün seçin.',
      note: 'Not en fazla 400 karakter olabilir.',
      summary: 'Formda eksik veya hatalı alanlar var. Lütfen işaretli alanları düzeltin.',
    },
    message: {
      service: 'Hizmet',
      vehicle: 'Araç tipi',
      date: 'Tarih',
      time: 'Saat',
      note: 'Not',
      noNote: '(belirtilmedi)',
      closing: 'Bu bir randevu talebidir. Uygunluğu ve fiyat bilgisini paylaşırsanız teşekkür ederim.',
    },
  },

  contact: {
    title: 'Stüdyo',
    intro: 'Sorularınız için arayabilir ya da randevu talebi gönderebilirsiniz.',
    phone: 'Telefon',
    address: 'Adres',
    hours: 'Çalışma saatleri',
    closed: 'Kapalı',
    directions: 'Yol Tarifi Al',
    mapLabel: "Google Haritalar'da aç",
    mapNote: 'Harita çizimi örnektir. Gerçek adres eklendiğinde bağlantı güncellenir.',
    demoNotice: 'Demo adres ve telefon: gerçek bir işletmeyi göstermez.',
  },

  footer: {
    blurb: 'Oto detailing ve araç bakımı için kurgusal bir stüdyo şablonu.',
    legal: 'Bu site bir demo şablondur. Marka, adres, telefon ve fiyatlar kurgusaldır.',
  },
};
