# Felias Portfolio — first version

## Files
- `index.html` — giriş sayfası
- `about.html` — hakkımda
- `projects.html` — projeler
- `contact.html` — iletişim
- `style.css` — ortak tasarım ve responsive stiller
- `script.js` — ortak menü davranışları

## Run
`index.html` dosyasını tarayıcıda açman yeterli. Harici kütüphane veya derleme adımı yok.

## Before publishing
- `contact.html` içindeki örnek e-posta metnini gerçek adresinle değiştir.
- Proje kartlarındaki örnek içerikleri gerçek çalışmalarınla değiştir.


## KORA Coffee template
KORA Coffee şablonunun kaynak kodları `templates/kora-coffee/` klasöründedir.
Bu proje Vite ile ayrı çalışan bir demo uygulamasıdır. Portfolyodaki proje tanıtım sayfası `project-kora.html`, proje listesi ise `projects.html` dosyasıdır.

KORA demosunu yerelde çalıştırmak için:
```bash
cd templates/kora-coffee
npm install
npm run dev
```
Üretim derlemesi için:
```bash
npm run build
npm run preview
```
Not: KORA demo uygulaması henüz portfolyonun içine gömülü canlı önizleme olarak yayınlanmıyor; kendi Vite geliştirme sunucusunda çalıştırılır. Yayına almadan önce build çıktısını portfolyo içinde uygun bir demo yoluna alarak canlı önizleme ekleyebiliriz.

## PITLINE Auto Studio template
Oto detailing ve araç yıkama şablonunun kaynak kodları `templates/pitline-auto-studio/` klasöründedir. Portfolyo proje tanıtım sayfası `project-pitline.html`, proje listesi `projects.html` dosyasıdır.

Yerelde çalıştırmak için:
```bash
cd templates/pitline-auto-studio
npm install
npm run dev
```
Üretim derlemesi ve önizleme:
```bash
npm run build
npm run preview
```
Şablonun README dosyasında müşteri için düzenlenecek alanlar ve yayına alma kontrol listesi bulunur. `node_modules` arşive eklenmemiştir; bağımlılıklar `npm install` ile kurulur.
