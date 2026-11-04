/**
 * Every photo used on the page, in one place.
 *
 * Each entry uses either:
 *   unsplash: '<photo id>'           -> remote photo (resized by the CDN)
 *   file:     '/images/hero.jpg'     -> a local file placed in /public/images
 *
 * alt:  Turkish description for screen readers
 * tone: color shown while loading and if the image fails (crema | espresso | olive | ember)
 * pos:  optional CSS object-position for the crop
 * ratio: [width, height] hint to reserve space
 *
 * NOTE: the Unsplash ids below could not be verified from the build environment.
 * Check each in a browser and swap anything that is wrong or off-brand. Local files are recommended
 * for a real client (see README).
 */
export const images = {
  hero: {
    unsplash: '1554118811-1e0d58224f24',
    alt: 'Gün ışığı alan, ahşap ve beyaz tonlarında sakin bir kahve dükkânının içi',
    tone: 'crema',
    pos: '50% 55%',
    ratio: [1200, 1500],
  },
  story: {
    unsplash: '1511920170033-f8396924c348',
    alt: 'Bir barista fincana elle kahve demliyor',
    tone: 'espresso',
    ratio: [1000, 1250],
  },

  espresso: {
    unsplash: '1510707577719-ae7c14805e3a',
    alt: 'Beyaz fincanda taze çekilmiş espresso',
    tone: 'espresso',
    ratio: [800, 800],
  },
  flatWhite: {
    unsplash: '1514432324607-a09d9b4aefdd',
    alt: 'Üzerinde latte art deseni olan bir flat white',
    tone: 'crema',
    ratio: [1000, 1250],
  },
  icedLatte: {
    unsplash: '1517701604599-bb29b565090c',
    alt: 'Buz dolu bardakta soğuk sütlü kahve',
    tone: 'olive',
    ratio: [800, 800],
  },
  coldBrew: {
    unsplash: '1461023058943-07fcbe16d735',
    alt: 'Camda servis edilen soğuk demleme kahve',
    tone: 'espresso',
    ratio: [800, 800],
  },
  pastry: {
    unsplash: '1555507036-ab1f4038808a',
    alt: 'Tezgâhta duran taze fırınlanmış kruvasanlar',
    tone: 'ember',
    ratio: [800, 800],
  },

  gallery: [
    {
      unsplash: '1509042239860-f550ce710b93',
      alt: 'Masada duran bir fincan kahve ve kahve çekirdekleri',
      tone: 'crema',
      ratio: [1000, 1000],
    },
    {
      unsplash: '1521017432531-fbd92d768814',
      alt: 'Kahve dükkânında masalarda sohbet eden misafirler',
      tone: 'olive',
      ratio: [800, 800],
    },
    {
      unsplash: '1541167760496-1628856ab772',
      alt: 'Süt dökülerek hazırlanan latte art',
      tone: 'espresso',
      ratio: [800, 800],
    },
    {
      unsplash: '1578985545062-69928b1d9587',
      alt: 'Dilimlenmiş çikolatalı kek',
      tone: 'ember',
      ratio: [800, 800],
    },
    {
      unsplash: '1442512595331-e89e73853f31',
      alt: 'Ahşap masada iki fincan latte',
      tone: 'crema',
      ratio: [800, 800],
    },
  ],
};
