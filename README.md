# Felias Portfolio

Kişisel portfolyo ve dört web sitesi şablonunun vitrini. Derleme adımı yok: düz HTML, CSS ve JavaScript.

## Yapı
- `index.html`, `projects.html`, `about.html`, `contact.html` — ana sayfalar
- `project-kora.html`, `project-pitline.html`, `project-firin.html`, `project-maison.html` — proje detay sayfaları
- `style.css` — ortak tasarım; renkler dosyanın başındaki `:root` içindedir
- `script.js` — menü, canlı önizlemeler, cihaz seçimi, belirme animasyonları
- `fonts/` — yerel yazı tipleri (Bricolage Grotesque, Hanken Grotesk)
- `assets/shots/` — önizleme yüklenirken ve küçük ekranlarda gösterilen ekran görüntüleri

## Canlı önizleme nasıl çalışıyor?
Proje kartları ve detay sayfaları, GitHub Pages'te yayınladığınız sitelerin kendisini küçültülmüş bir tarayıcı penceresinde gösterir (iframe). Kartlara tıklayınca detay sayfası, oradan "Yeni sekmede aç" ile gerçek site açılır.
Küçük ekranlarda ve veri tasarrufu açıkken iframe yüklenmez; ekran görüntüsü gösterilir.

| Proje | Yayın adresi | Kaynak |
| --- | --- | --- |
| KORA Coffee | https://f3lia5.github.io/cafe-template/ | github.com/F3lia5/cafe-template |
| PITLINE Auto Studio | https://f3lia5.github.io/car-wash-template/ | github.com/F3lia5/car-wash-template |
| FIRIN NO. 8 | https://f3lia5.github.io/bakery-template/ | github.com/F3lia5/bakery-template |
| MAISON 1898 | https://f3lia5.github.io/restaurant-template/ | github.com/F3lia5/restaurant-template |

Adresler HTML dosyalarında `data-live="..."`, `<iframe src="...">` ve bağlantılarda geçer. Bir adres değişirse ilgili dosyalarda toplu bul-değiştir yapın.

## Yayınlama
GitHub'da depo → Settings → Pages → `main` / `(root)`. `.nojekyll` dosyası kökte kalmalıdır.

## Yayınlamadan önce
- `contact.html` içindeki örnek e-posta adresini gerçek adresinizle değiştirin.
- `about.html` metinlerini kendi bilgilerinizle genişletin.
- Tüm marka adları, adresler, fiyatlar ve içerikler kurgusal demodur.
