# KORA Coffee: kafe web sitesi şablonu (QR menülü)

Kırklareli'nde kurgusal bir specialty kahve dükkânı için hazırlanmış, Türkçe, tek sayfalık web sitesi şablonu.
Vite + düz HTML/CSS/JavaScript. Çalışma zamanında harici bağımlılık yok (yalnızca QR kodu için küçük bir kütüphane ve kendi sunucunuzdan yüklenen yazı tipleri).

## Çalıştırma

```bash
npm install
npm run dev       # geliştirme sunucusu
npm run build     # üretim derlemesi (dist/)
npm run preview   # derlemeyi yerelde önizleme
```

## Nerede ne düzenlenir?

| Ne | Dosya |
| --- | --- |
| Marka adı, SEO başlığı/açıklaması, adres, çalışma saatleri, Google Maps bağlantısı, e-posta/telefon, Instagram bağlantısı, menü adresi | `src/config/site.js` |
| Sayfa metinleri (başlıklar, açıklamalar, butonlar) | `src/config/content.js` |
| Menü kategorileri, ürünler, açıklamalar, fiyatlar (TL), öne çıkan ürünler | `src/data/menu.js` |
| Fotoğraflar (adres, açıklama, renk tonu) | `src/config/images.js` |
| Renkler, yazı tipleri, boşluklar | `src/styles/tokens.css` |

### Fotoğrafları değiştirme

`src/config/images.js` içinde her kayıt ya `unsplash: '<foto id>'` ya da `file: '/images/dosya.jpg'` kullanır.
Gerçek bir müşteri için kendi fotoğraflarını `public/images/` klasörüne koyup `file:` ile bağlayın.
Bir fotoğraf yüklenemezse sayfa bozulmaz: tonlu bir yer tutucu ve alt metin kalır.

### Menü ve QR kodu

- Menü, sayfadaki her "Menüyü Keşfet" butonundan açılır; Escape veya kapatma düğmesiyle kapanır.
- `#menu` adresi menüyü açar, `#menu/tatlilar` doğrudan bir kategoriyi açar.
- Sayfadaki QR kod, `site.menuUrl` adresine (boşsa sitenin kendi `#menu` adresine) gider. Yayına alınca gerçek alan adı QR koda otomatik yansır; masalara basılacak kodu bu adresten üretebilirsiniz.
- Bir kategoriye ürün eklemezseniz menüde "henüz ürün eklenmedi" durumu görünür.

## Gerçek işletme bilgisi gerektirenler

- Adres, harita bağlantısı, telefon ve e-posta (şu an örnek/demo, ekranda "Demo konum" notuyla işaretli)
- Instagram profil bağlantısı
- Çalışma saatleri
- Gerçek ürünler ve fiyatlar
- Gerçek fotoğraflar (mevcut Unsplash kimlikleri doğrulanamadı, bkz. `images.js`)
- Sitenin yayın adresi (QR kod ve paylaşım görseli için)

Footer'daki demo notunu ve `location.isDemo` değerini gerçek bilgiler eklendiğinde kaldırın.
