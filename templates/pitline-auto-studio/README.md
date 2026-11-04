# PITLINE Auto Studio: oto detailing web sitesi şablonu

Oto detailing ve araç yıkama işletmeleri için hazırlanmış, Türkçe, tek sayfalık web sitesi şablonu.
Vite + düz HTML/CSS/JavaScript. Arka uç, veritabanı, giriş sistemi ve ödeme yoktur.
Randevu formu bir **talep** mesajı hazırlar ve WhatsApp'ı açar; randevuyu onaylamaz.

> **Demo uyarısı:** Marka, telefon, adres, çalışma saatleri ve tüm fiyatlar örnektir. Gerçek bir işletmeyi tanımlamaz.
> Fotoğraflar yerine çizimler kullanılır (aşağıda "Görseller").

## Çalıştırma

```bash
npm install
npm run dev       # geliştirme sunucusu
npm run build     # üretim derlemesi (dist/)
npm run preview   # derlemeyi yerelde önizleme
```

## Yeni müşteri için nereyi düzenlerim?

| Ne | Dosya |
| --- | --- |
| Marka adı, SEO başlığı ve açıklaması, **WhatsApp numarası**, telefon, adres, Google Maps bağlantısı, çalışma saatleri, araç tipleri | `src/config/site.js` |
| Hizmetler (açıklama, süre, başlangıç fiyatı), **paketler** (ad, fiyat, içerik), karşılaştırma satırları | `src/data/services.js` |
| Sayfa metinleri: başlıklar, açıklamalar, süreç adımları, hakkında, form ve hata mesajları | `src/config/content.js` |
| Görseller: hero, hakkında, harita, önce/sonra örnekleri | `src/config/images.js` |
| Renkler, yazı tipi genişliği ve ağırlığı, boşluklar | `src/styles/tokens.css` |
| Yazı tipi dosyası | `src/main.js` (`@fontsource-variable/archivo` importu) ve `tokens.css` içindeki `--font` |

### WhatsApp randevu talebi

`src/config/site.js` içinde:

```js
whatsapp: {
  phone: '905550000000',   // ülke koduyla, yalnızca rakam (başında + veya 0 olmadan)
  greeting: 'Merhaba, ...', // mesajın ilk satırı
  baseUrl: 'https://wa.me/',
}
```

Form geçerliyse şu biçimde bir mesaj oluşturur ve `wa.me/<numara>?text=<kodlanmış mesaj>` adresini yeni sekmede açar:

```
Merhaba, PITLINE Auto Studio için randevu talebi iletmek istiyorum.

Hizmet: Showroom paketi
Araç tipi: SUV / Crossover
Tarih: 2 Kasım 2026 Pazartesi
Saat: 14:00
Not: ...

Bu bir randevu talebidir. Uygunluğu ve fiyat bilgisini paylaşırsanız teşekkür ederim.
```

- Mesaj şablonu ve etiketleri `content.js` içindeki `appointment.message` altındadır.
- Sayfa hiçbir yerde randevunun onaylandığını söylemez. Talep, kullanıcı mesajı WhatsApp'ta gönderdiğinde iletilmiş olur.
- Saat seçenekleri, seçilen günün çalışma saatlerinden üretilir. Kapalı günler (örn. Pazar) seçilemez, bugün için geçmiş saatler listelenmez.
- Demo numara (`905550000000`) geçersizdir; yayına almadan önce mutlaka değiştirin.

### Görseller

`src/config/images.js` içindeki her kayıt `src` (görsel adresi) ve `art` (yedek çizim) alanı taşır.

- **Fotoğraf eklemek için:** dosyayı `public/images/` klasörüne koyun ve `src: '/images/hero.jpg'` yazın.
- `src` boşsa ya da fotoğraf yüklenemezse, aynı boyutta bir çizim gösterilir. Bozuk görsel simgesi veya boş kutu oluşmaz.
- **Önce/sonra:** `compare` listesine yeni kayıt ekleyerek örnek çoğaltabilirsiniz. Aynı aracın aynı açıdan, aynı ışıkta çekilmiş iki fotoğrafını kullanın; aksi hâlde kaydırıcı yanıltıcı görünür.
- Bu şablon hazırlanırken ağ erişimi olmadığından uzak bir fotoğraf doğrulanamadı; bu yüzden şu an tüm görseller çizimdir.

### Renk ve yazı tipi

`src/styles/tokens.css` içindeki `--lime` vurgu rengidir; zemin tonları `--ink-*`, yazı rengi `--paper`'dır.
Başlıkların darlığı `--display-stretch` ile ayarlanır (62–125).

## Dosya yapısı

```
index.html              sayfa kabuğu (SEO etiketleri site.js'den eklenir)
vite.config.js          meta etiketlerini config'ten üretir
public/favicon.svg
src/
  main.js               bölümleri sayfaya yerleştirir
  config/               site.js · content.js · images.js
  data/services.js      hizmetler ve paketler
  components/           header · hero · services · packages · compare · process
                        about · appointment · contact · footer
  lib/                  dom · hours · media · art · reveal
  styles/               tokens · base · components · sections · gallery · form
```

## Yayına almadan önce (gerçek müşteri için)

- [ ] WhatsApp numarası, telefon, adres, Google Maps bağlantısı ve çalışma saatleri
- [ ] Hizmet açıklamaları, süreler ve gerçek fiyatlar
- [ ] Gerçek fotoğraflar (hero, hakkında, önce/sonra) ve paylaşım görseli (`seo.ogImage`)
- [ ] `site.location.isDemo` değerini `false` yapın ve demo notlarını kaldırın
- [ ] `content.js` içindeki "demo" ve "temsilidir" notlarını gözden geçirin
- [ ] `hakkında` metni: kurgusal stüdyo tanımı yerine müşterinin gerçek bilgileri

## Erişilebilirlik ve hareket

- Klavye ile tam kullanım; belirgin odak çerçevesi; form hataları `aria-invalid` ve açıklama metniyle bağlıdır.
- Önce/sonra kaydırıcısı fare, dokunma ve klavye (ok tuşları, Home, End, PageUp/PageDown) ile çalışır.
- "Hareketi azalt" tercihi açıksa animasyonlar kapanır ve tüm içerik doğrudan görünür.
