/**
 * Sitedeki tüm görsellerin tek merkezi.
 *
 * Her kayıt:
 *   src:  Görselin adresi. Yerel dosya için '/images/dosya.jpg' (dosyayı public/images/ içine koyun)
 *         ya da tam bir https adresi. BOŞ bırakılırsa 'art' ile belirtilen çizim kullanılır.
 *   art:  Görsel yoksa ya da yüklenemezse gösterilen çizim (src/lib/art.js).
 *   alt:  Ekran okuyucular için Türkçe açıklama.
 *   w, h: Yer ayırmak için tahmini genişlik/yükseklik.
 *
 * Bu şablon hazırlanırken ağ erişimi olmadığından hiçbir uzak fotoğraf doğrulanamadı.
 * Bu yüzden şu an tüm görseller çizimdir; yerleşim, fotoğraf eklendiğinde de bozulmaz.
 * Önce/sonra için aynı aracın aynı açıdan, aynı ışıkta çekilmiş iki fotoğrafı kullanın.
 */
export const images = {
  hero: {
    src: '',
    art: 'hero',
    alt: 'Stüdyo ışığı altında duran koyu renkli spor coupe araç, yandan görünüm',
    w: 1600,
    h: 900,
  },

  about: {
    src: '',
    art: 'detail',
    alt: 'Boya yüzeyinde dönen polisaj pedini gösteren soyut çizim',
    w: 1000,
    h: 1200,
  },

  map: {
    src: '',
    art: 'map',
    alt: 'Stüdyonun konumunu gösteren örnek harita çizimi',
    w: 1000,
    h: 700,
  },

  /** Önce/sonra örnekleri. Yeni örnek eklemek için bu listeye bir kayıt daha ekleyin. */
  compare: [
    {
      id: 'boya',
      label: 'Boya düzeltme',
      caption: 'Çizik, hare ve su lekesi görünen boya yüzeyi; düzeltme sonrası net yansıma.',
      before: { src: '', art: 'paint-before', alt: 'Çizik, hare ve su lekeleri görünen mat boya yüzeyi' },
      after: { src: '', art: 'paint-after', alt: 'Aynı boya yüzeyi düzeltme sonrası: net ve parlak yansıma' },
    },
    {
      id: 'jant',
      label: 'Jant temizliği',
      caption: 'Fren tozu ve çamurla kaplı jant; arındırma sonrası temiz yüzey.',
      before: { src: '', art: 'wheel-before', alt: 'Fren tozu ve çamurla kaplanmış kirli jant' },
      after: { src: '', art: 'wheel-after', alt: 'Aynı jant temizlik sonrası: parlak ve düzgün yüzey' },
    },
  ],
};
