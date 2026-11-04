/**
 * Menu data. Edit categories, products, descriptions and prices here.
 * Prices are plain numbers in Turkish lira (TRY).
 * `image` (optional) is a key from src/config/images.js, used by the "featured" section.
 */
export const menu = {
  note: 'Fiyatlar örnektir ve TL cinsindendir. Alerjen bilgisi için lütfen ekibimize danışın.',

  categories: [
    { id: 'sicak-kahveler', label: 'Sıcak Kahveler' },
    { id: 'soguk-kahveler', label: 'Soğuk Kahveler' },
    { id: 'caylar', label: 'Çaylar' },
    { id: 'tatlilar', label: 'Tatlılar' },
  ],

  /** Ids shown in the "İmza lezzetler" section. The first one is shown large. */
  featured: ['flat-white', 'espresso', 'buzlu-latte', 'cold-brew', 'gunun-pastasi'],

  items: [
    // Sıcak Kahveler
    { id: 'espresso', category: 'sicak-kahveler', name: 'Espresso', price: 95, image: 'espresso',
      description: 'Yoğun gövdeli, kakao ve kuru meyve notalı espresso.' },
    { id: 'doppio', category: 'sicak-kahveler', name: 'Doppio', price: 115,
      description: 'Çift shot espresso. Daha uzun, daha dolgun bir içim.' },
    { id: 'americano', category: 'sicak-kahveler', name: 'Americano', price: 115,
      description: 'Espresso ve sıcak su. Temiz, hafif ve uzun.' },
    { id: 'flat-white', category: 'sicak-kahveler', name: 'Flat White', price: 140, image: 'flatWhite',
      description: 'Çift shot espresso ve ipeksi süt köpüğü. Kahvenin kendisini öne çıkaran yumuşak bir içim.' },
    { id: 'cappuccino', category: 'sicak-kahveler', name: 'Cappuccino', price: 140,
      description: 'Eşit dengede espresso, sıcak süt ve kadifemsi köpük.' },
    { id: 'latte', category: 'sicak-kahveler', name: 'Latte', price: 145,
      description: 'Bol sütlü, yumuşak ve sakin bir kahve.' },
    { id: 'cortado', category: 'sicak-kahveler', name: 'Cortado', price: 130,
      description: 'Espresso ve az miktarda sıcak süt. Küçük fincanda dengeli bir tat.' },
    { id: 'filtre-kahve', category: 'sicak-kahveler', name: 'Filtre Kahve', price: 120,
      description: 'Günün çekirdeğiyle elde demlenen, hafif gövdeli filtre kahve.' },
    { id: 'turk-kahvesi', category: 'sicak-kahveler', name: 'Türk Kahvesi', price: 90,
      description: 'Közde pişmiş gibi köpüklü, yanında bir bardak su ile.' },
    { id: 'mocha', category: 'sicak-kahveler', name: 'Mocha', price: 160,
      description: 'Espresso, bitter çikolata ve buharla ısıtılmış süt.' },

    // Soğuk Kahveler
    { id: 'buzlu-latte', category: 'soguk-kahveler', name: 'Buzlu Latte', price: 155, image: 'icedLatte',
      description: 'Soğuk süt, buz ve espresso. Serinletici ve tatlandırıcısız.' },
    { id: 'cold-brew', category: 'soguk-kahveler', name: 'Cold Brew', price: 150, image: 'coldBrew',
      description: 'Soğuk suda saatlerce demlenen kahve. Düşük asiditeli, tatlı ve temiz bir içim.' },
    { id: 'espresso-tonic', category: 'soguk-kahveler', name: 'Espresso Tonic', price: 160,
      description: 'Tonik su, buz ve bir shot espresso. Ferah ve hafif acımsı.' },
    { id: 'buzlu-americano', category: 'soguk-kahveler', name: 'Buzlu Americano', price: 125,
      description: 'Buz üzerine espresso ve soğuk su.' },
    { id: 'buzlu-mocha', category: 'soguk-kahveler', name: 'Buzlu Mocha', price: 170,
      description: 'Çikolata, süt, buz ve espresso. Tatlı bir öğleden sonra için.' },
    { id: 'affogato', category: 'soguk-kahveler', name: 'Affogato', price: 150,
      description: 'Vanilyalı dondurmanın üzerine sıcak espresso.' },

    // Çaylar
    { id: 'demlik-cay', category: 'caylar', name: 'Demlik Çay', price: 45,
      description: 'İnce belli bardakta, taze demlenmiş siyah çay.' },
    { id: 'bitki-cayi', category: 'caylar', name: 'Bitki Çayı', price: 80,
      description: 'Papatya, adaçayı veya nane. Sormanız yeterli.' },
    { id: 'yesil-cay', category: 'caylar', name: 'Yeşil Çay', price: 85,
      description: 'Hafif, ferah ve çimenimsi notalı.' },
    { id: 'ihlamur', category: 'caylar', name: 'Ihlamur', price: 85,
      description: 'Sıcak, tatlımsı ve rahatlatıcı.' },
    { id: 'chai-latte', category: 'caylar', name: 'Chai Latte', price: 150,
      description: 'Tarçın, zencefil ve kakule ile baharatlı çay, sütle servis edilir.' },
    { id: 'matcha-latte', category: 'caylar', name: 'Matcha Latte', price: 165,
      description: 'Çırpılmış matcha ve süt. Pürüzsüz ve otsu.' },

    // Tatlılar
    { id: 'gunun-pastasi', category: 'tatlilar', name: 'Günün Pastası', price: 135, image: 'pastry',
      description: 'Her sabah fırından çıkan tereyağlı pasta. Bugünün çeşidi tezgâhta.' },
    { id: 'kruvasan', category: 'tatlilar', name: 'Tereyağlı Kruvasan', price: 125,
      description: 'Çıtır katmanlı, tereyağı kokulu klasik kruvasan.' },
    { id: 'san-sebastian', category: 'tatlilar', name: 'San Sebastian Cheesecake', price: 210,
      description: 'Üstü yanık, içi kremamsı, hafif tuzlu.' },
    { id: 'brownie', category: 'tatlilar', name: 'Brownie', price: 150,
      description: 'Bitter çikolatalı, ceviz parçacıklı, yoğun ve nemli.' },
    { id: 'havuclu-kek', category: 'tatlilar', name: 'Havuçlu Cevizli Kek', price: 140,
      description: 'Baharatlı, nemli kek ve üzerinde labneli krema.' },
    { id: 'limonlu-tart', category: 'tatlilar', name: 'Limonlu Tart', price: 160,
      description: 'Ekşi limon kreması ve kırılgan tereyağlı hamur.' },
    { id: 'kurabiye', category: 'tatlilar', name: 'Kurabiye', price: 70,
      description: 'Kahvenin yanına küçük bir tatlı mola.' },
  ],
};
