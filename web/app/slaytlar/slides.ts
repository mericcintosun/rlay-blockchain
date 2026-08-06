// Slide content for the six camp decks (59 slides).
// Layout kinds follow the RBW 2026 brand guide: kapak, cumle, govde, kart,
// ikiSutun, adimlar, liste, rakam, kod.
//
// `note` is an instructor-only note. It is hidden by default in the viewer and
// toggled with the N key, so it never lands on the projector by accident.

export type Column = {
  title: string;
  items: string[];
};

export type Slide =
  | { kind: "kapak"; label: string; title: string; subtitle: string; theme?: "dark" }
  | { kind: "cumle"; text: string; note?: string }
  | { kind: "govde"; title: string; body: string[]; note?: string }
  | { kind: "kart"; title: string; cards: { title: string; text: string }[]; note?: string }
  | { kind: "ikiSutun"; title: string; left: Column; right: Column; note?: string }
  | { kind: "adimlar"; title: string; steps: string[]; note?: string }
  | { kind: "liste"; title: string; items: string[]; note?: string }
  | { kind: "rakam"; value: string; text: string; note?: string }
  | { kind: "kod"; title: string; code: string; notes: string[]; note?: string };

export type Deck = {
  id: string;
  name: string;
  when: string;
  slides: Slide[];
};

export const DECKS: Deck[] = [
  {
    id: "deck1",
    name: "Neden Blockchain?",
    when: "Gün 1 · 10.00–10.45",
    slides: [
      {
        kind: "kapak",
        label: "GÜN 1 · OTURUM 1",
        title: "Blokzincir nedir?",
        subtitle:
          "Ve neden böyle bir şeye ihtiyacımız oldu? — Şirince, Ağustos 2026",
      },
      {
        kind: "cumle",
        text: "Birbirini hiç tanımayan iki insan, aralarında hakem olmadan nasıl anlaşır?",
        note: "Slaydı aç ve 30 saniye sus. Sınıfa sor, cevap bekle.",
      },
      {
        kind: "govde",
        title: "Küçük bir deney",
        body: [
          "Arkadaşına 100 lira borç verdin.",
          "Vermediğini söylerse bunu nasıl kanıtlarsın?",
          "Cevapları tahtaya yazalım.",
        ],
        note: "Cevaplar gelsin — tanık, kağıt, mesaj, banka kaydı. Hepsini tahtaya yaz.",
      },
      {
        kind: "cumle",
        text: "Verdiğiniz her cevabın ortak noktası: bir ÜÇÜNCÜ TARAFA güveniyoruz.",
      },
      {
        kind: "kart",
        title: "Hayatımızdaki defter tutucular",
        cards: [
          { title: "Banka", text: "Kimin ne kadar parası olduğunu o biliyor." },
          { title: "Tapu / Noter", text: "Neyin kime ait olduğunu o kaydediyor." },
          { title: "Platformlar", text: "Takipçin, puanın, hesabın onların sunucusunda." },
        ],
      },
      {
        kind: "govde",
        title: "Ve bu sistem kötü değil",
        body: [
          "Aracı olduğu için karşı tarafın dürüst olup olmadığını bilmek zorunda değilsin.",
          "Yüzyıllardır işliyor, çoğu durumda gayet iyi işliyor.",
          "Blockchain bunun yerine geçmek için doğmadı. Aracının olmadığı ya da güvenilmediği durumlar için doğdu.",
        ],
        note: "Bu slaydı ATLAMA. Dengeli durmak öğrencinin sana güvenini artırıyor.",
      },
      {
        kind: "kart",
        title: "Peki sorun ne zaman çıkıyor?",
        cards: [
          {
            title: "Tek nokta",
            text: "Defteri tutan çökerse, hacklenirse veya kapanırsa herkes etkilenir.",
          },
          {
            title: "İzin",
            text: "Hesabın dondurulabilir, ödemen reddedilebilir, ülkene göre erişimin kesilebilir.",
          },
          {
            title: "Görünmezlik",
            text: "Defterin içini göremezsin. Doğru tutulduğunu varsaymak zorundasın.",
          },
        ],
      },
      {
        kind: "cumle",
        text: "Ya defteri tek bir kurum değil, HERKES aynı anda tutsaydı?",
      },
      {
        kind: "kart",
        title: "Üç model",
        cards: [
          { title: "Merkezi", text: "Tek bir merkez her şeyi bilir ve karar verir." },
          { title: "Dağıtık", text: "Birden çok merkez var ama yine de merkezler var." },
          { title: "Merkeziyetsiz", text: "Merkez yok. Herkes aynı defterin kopyasını tutar." },
        ],
      },
      {
        kind: "liste",
        title: "Ama bu üç soruyu çözmen gerekir",
        items: [
          "Herkes kendi defterini tutuyorsa, kim haklı?",
          "Biri defterine sahte bir satır yazarsa ne olur?",
          "Aynı parayı iki farklı kişiye aynı anda gönderirsen?",
        ],
        note: "CEVAPLARI VERME. Sonraki oturumdaki oyunda kendileri bulacak.",
      },
      {
        kind: "govde",
        title: "Fikir 1: Mühür",
        body: [
          "Defterin her sayfası, bir önceki sayfanın mührünü taşıyor.",
          "Ortadaki bir sayfayı değiştirirsen, ondan sonraki bütün mühürler tutmaz.",
          "Yani geçmişi sessizce değiştiremezsin. Herkes fark eder.",
        ],
        note: '"Hash" kelimesini kullanma. Mühür yeterli.',
      },
      {
        kind: "govde",
        title: "Fikir 2: Çoğunluk ve maliyet",
        body: [
          "Hangi defterin doğru olduğuna çoğunluk karar verir.",
          "Ama oy kullanmak bedava değil: ya enerji harcarsın ya da teminat yatırırsın.",
          "Yani yalan söylemek sana pahalıya patlar. Sistemi ayakta tutan şey bu.",
        ],
      },
      {
        kind: "rakam",
        value: "9",
        text: "2008'de yayınlanan 9 sayfalık bir makale. Yazarın kim olduğu hâlâ bilinmiyor. Şirket yok, CEO yok, ofis yok — ama defter 17 yıldır hiç durmadan çalışıyor.",
      },
      {
        kind: "ikiSutun",
        title: "Bitcoin ve Ethereum farkı",
        left: {
          title: "Bitcoin",
          items: [
            "Deftere sadece transfer yazabilirsin",
            '"Ben Ayşe\'ye 5 gönderdim"',
            "Tek iş: değer taşımak",
          ],
        },
        right: {
          title: "Ethereum",
          items: [
            "Deftere KOD da yazabilirsin",
            '"Şu şart olursa şu otomatik olsun"',
            "Bu hafta yazacağımız şey bu",
          ],
        },
      },
      {
        kind: "govde",
        title: "Blockchain ne için İYİ DEĞİL",
        body: [
          "Yavaştır. Sıradan bir veritabanı binlerce kat hızlıdır.",
          "Pahalıdır. Her satırın bir bedeli var.",
          "Gizli değildir. Yazdığın her şey herkese açıktır.",
          "Okul yoklama sistemi kuruyorsan blockchain'e ihtiyacın yok. Excel yeter.",
        ],
      },
      {
        kind: "kart",
        title: "Ne için gerçekten iyi",
        cards: [
          {
            title: "Sınır tanımayan ödeme",
            text: "Banka saatine, ülkeye ve izne bağlı olmadan değer göndermek.",
          },
          {
            title: "Kalıcı kanıt",
            text: "Bir şeyin sana ait olduğunu veya belli bir anda var olduğunu ispatlamak.",
          },
          {
            title: "Ortak karar",
            text: "Kimsenin tek başına değiştiremeyeceği kurallarla topluca karar almak.",
          },
        ],
      },
      {
        kind: "adimlar",
        title: "Bu 4 günde ne yapacağız?",
        steps: [
          "GÜN 1: Defteri anla, cüzdanını kur",
          "GÜN 2: Kendi kuralını kodla",
          "GÜN 3: AI ile geliştir, hack'i gör",
          "GÜN 4: Ekrana çıkar, sun",
        ],
      },
      {
        kind: "cumle",
        text: "Sınıfın kendi köyünü, kendi parasını ve kendi oylamasını zincir üzerinde kuracağız.",
      },
    ],
  },

  {
    id: "deck2",
    name: "Bir İşlemin Yolculuğu",
    when: "Gün 1 · 15.00–15.45",
    slides: [
      {
        kind: "kapak",
        label: "GÜN 1 · OTURUM 4",
        title: "Gönder'e bastın. Sonra ne oldu?",
        subtitle: "Bir işlemin hayat döngüsü",
      },
      {
        kind: "adimlar",
        title: "Beş adım",
        steps: ["İMZALA", "AĞA DUYUR", "BEKLEME HAVUZU", "BLOĞA GİR", "ONAYLANDI"],
        note: "Tahtaya da çiz, dört gün boyunca silme.",
      },
      {
        kind: "govde",
        title: "1 · İmza",
        body: [
          "Özel anahtarın senin imzan. Kimse taklit edemez, ama herkes doğrulayabilir.",
          'Bu yüzden özel anahtarını kaybedersen paranı kaybedersin — kimseye "şifremi unuttum" diyemezsin.',
          "Kimseye gönderme, ekran görüntüsü alma, buluta yükleme.",
        ],
      },
      {
        kind: "govde",
        title: "2 ve 3 · Ağa duyur, sırada bekle",
        body: [
          "İşlemin binlerce bilgisayara aynı anda duyurulur.",
          "Hemen deftere yazılmaz, önce bir bekleme havuzuna girer.",
          "Havuz kalabalıksa daha çok ödeyen önce geçer. Tıpkı kargoda ekspres seçeneği gibi.",
        ],
      },
      {
        kind: "govde",
        title: "4 · Ücret neden var?",
        body: [
          "Her bloğa sınırlı sayıda işlem sığar. Yer kıt olduğu için fiyatı var.",
          "Kalabalık saatte pahalı, sakin saatte ucuz. Kimse fiyatı belirlemiyor — talep belirliyor.",
          'Ücreti sen değil, ağ hesaplıyor. Sen sadece "acelem var mı" kararını veriyorsun.',
        ],
      },
      {
        kind: "ikiSutun",
        title: "Bazıları neden çok daha ucuz?",
        left: {
          title: "Ana ağ",
          items: ["Her işlem tek tek yazılır", "Yer kıt, ücret yüksek", "Taksiyle gitmek gibi"],
        },
        right: {
          title: "L2 — bugün kullandığımız",
          items: [
            "Binlerce işlem tek zarfa konur",
            "Zarf ana ağa gönderilir",
            "Servis dolmuşuyla gitmek gibi",
          ],
        },
      },
      {
        kind: "cumle",
        text: "Geri alma tuşu yok. Yanlış adrese gönderdiysen para gitti.",
      },
      {
        kind: "liste",
        title: "GÖREV: Explorer safarisi",
        items: [
          "Kendi işlemini bul ve linkini not al",
          "Ödediğin ücreti oku",
          "Bir akıllı kontratın kaynak kodunu aç",
          "Bugünün en pahalı işlemini bul",
          "Sana en garip gelen işlemi ekrana getir",
        ],
      },
    ],
  },

  {
    id: "deck3",
    name: "Akıllı Kontrat Nedir?",
    when: "Gün 2 · 10.00–10.45",
    slides: [
      {
        kind: "kapak",
        label: "GÜN 2 · OTURUM 1",
        title: "Akıllı kontrat: kod olarak yazılmış söz",
        subtitle: "Ve 20 dakika sonra kendinizinkini yazacaksınız",
      },
      {
        kind: "cumle",
        text: "Otomat makinesi. Parayı at, ürün düşsün. Satıcıya güvenmene gerek yok.",
      },
      {
        kind: "kart",
        title: "Ne DEĞİL",
        cards: [
          {
            title: "Hukuki sözleşme değil",
            text: "Mahkemeye gitmez. Sadece kod çalışır.",
          },
          {
            title: "Yapay zekâ değil",
            text: '"Akıllı" ismi yanıltıcı. Düşünmüyor, sadece yazdığını yapıyor.',
          },
          {
            title: "Sihir değil",
            text: "Sen ne yazdıysan onu yapar. Yanlış yazdıysan yanlışı yapar.",
          },
        ],
      },
      {
        kind: "kart",
        title: "Üç parçası var",
        cards: [
          {
            title: "HAFIZA",
            text: "Kontratın hatırladığı şeyler. Kim ne yazdı, kimin ne kadarı var.",
          },
          {
            title: "İŞLEM",
            text: "Dışarıdan çağrılabilen fonksiyonlar. Yaz, sil, gönder.",
          },
          {
            title: "DUYURU",
            text: '"Şu oldu" diye ağa bıraktığı iz. Sonra bunu okuyacağız.',
          },
        ],
      },
      {
        kind: "kod",
        title: "Şirince Defteri",
        code: `contract SirinceDefteri {

    string public sonMesaj;

    event Yazildi(address kim, string ne);

    function yaz(string calldata mesaj) public {
        sonMesaj = mesaj;
        emit Yazildi(msg.sender, mesaj);
    }
}`,
        notes: [
          "sonMesaj → HAFIZA",
          "yaz() → İŞLEM",
          "Yazildi → DUYURU",
          "msg.sender → çağıran kişinin adresi",
        ],
      },
      {
        kind: "govde",
        title: "Yayınladıktan sonra değiştiremezsin",
        body: [
          "Kontrat zincire çıktığı anda kodu kilitlenir.",
          "Hata varsa o hata da kilitlenir.",
          "Bu yüzden yayınlamadan önce test edilir. Gün 3'te bunun neden ölüm kalım meselesi olduğunu göreceğiz.",
        ],
      },
      {
        kind: "govde",
        title: "Ve herkes okuyabilir",
        body: [
          "Kontratın kodu da, içindeki veri de tamamen halka açık.",
          '"Bunu kimse görmez" diye bir şey yok.',
          "Şifre, özel bilgi, gizli sayı — hiçbiri kontrata yazılmaz.",
          "Yeni başlayanların en pahalı hatası tam olarak budur.",
        ],
      },
      {
        kind: "cumle",
        text: "Şimdi sıra sizde. Remix'i açın — 15 dakikada kendi defterinizi yayınlıyoruz.",
      },
    ],
  },

  {
    id: "deck4",
    name: "AI ile Kod Yazmak",
    when: "Gün 3 · 10.00–10.45",
    slides: [
      {
        kind: "kapak",
        label: "GÜN 3 · OTURUM 1",
        title: "AI ile kod yazmak — ve AI'ı denetlemek",
        subtitle: "Asıl beceri kod yazdırmak değil, çıktıyı değerlendirmek",
      },
      {
        kind: "govde",
        title: "Önce dürüst olalım",
        body: [
          '2026\'da bir geliştiriciye "AI kullanma" demek anlamsız.',
          "Herkes kullanıyor. Şirketler de kullanıyor.",
          "Fark yaratan şey kullanıp kullanmaman değil — çıktısını değerlendirebilmen.",
        ],
      },
      {
        kind: "cumle",
        text: "Anlamadığın kodu deploy etme.",
        note: "Kampın altın kuralı. Kalan üç oturumda en az beş kez tekrar et.",
      },
      {
        kind: "ikiSutun",
        title: "Aynı görev, iki prompt",
        left: {
          title: "Kötü",
          items: [
            '"Bana bir token yaz"',
            "Hangi dil? Hangi sürüm?",
            "Kim basabilir? Sınır var mı?",
            "Test yok, kural yok",
          ],
        },
        right: {
          title: "İyi",
          items: [
            "Dil ve sürümü söyle",
            "Denetlenmiş kütüphaneyi şart koş",
            "Toplam arzı ve yetkiyi belirt",
            '"Testleriyle birlikte ver" de',
          ],
        },
      },
      {
        kind: "kart",
        title: "İyi prompt'un üç parçası",
        cards: [
          { title: "BAĞLAM", text: "Ne yapıyoruz, hangi proje, hangi araçlar." },
          {
            title: "KISIT",
            text: "Neyi kullanmalı, neyi kullanmamalı, hangi sınırlar var.",
          },
          {
            title: "KABUL KRİTERİ",
            text: 'Ne olursa "tamam" diyeceğiz. Genelde: testler geçiyor mu?',
          },
        ],
      },
      {
        kind: "adimlar",
        title: "Doğru sıra",
        steps: [
          "ŞARTNAMEYİ İNSAN YAZAR",
          "TESTLERİ AI YAZAR, İNSAN ONAYLAR",
          "KODU AI YAZAR",
          "TESTLER KARAR VERİR",
        ],
      },
      {
        kind: "govde",
        title: "Neden testler önce?",
        body: [
          'Test, "doğru"nun tanımıdır.',
          "Tanımı sen koyarsan, AI ne kadar hızlı yazarsa yazsın senin çizdiğin sınırın içinde kalır.",
          "Tanımı AI koyarsa, sadece kendi yazdığı kodun doğru olduğunu kanıtlamış olur.",
        ],
      },
      {
        kind: "kart",
        title: "AI'ın yapamadıkları",
        cards: [
          {
            title: "Yeni fikir tasarlamak",
            text: "Daha önce yazılmamış bir mekanizmayı kurgulamak onun işi değil.",
          },
          {
            title: "Saldırıyı öngörmek",
            text: "Kodun ekonomik olarak nasıl sömürüleceğini genelde göremiyor.",
          },
          {
            title: "Güncel olmak",
            text: "Bu ayki protokol değişikliğini bilmeyebilir. Doğrula.",
          },
        ],
      },
      {
        kind: "ikiSutun",
        title: "Araçlar ve AI birlikte çalışır",
        left: {
          title: "Otomatik analiz araçları",
          items: [
            "Kesin ve tekrarlanabilir",
            "Ama dar: sadece bildiği kalıpları görür",
            "Yorum yapmaz",
          ],
        },
        right: {
          title: "AI",
          items: [
            "Geniş: bağlamı okur",
            "Ama emin değil, uydurabilir",
            "Araç çıktısını yorumlamakta iyi",
          ],
        },
      },
      {
        kind: "cumle",
        text: "Öğleden sonra: Repo'daki kontratı AI yazdı. İçinde bir hata var. Bulun.",
      },
    ],
  },

  {
    id: "deck5",
    name: "Büyük Soygun",
    when: "Gün 3 · 15.00–15.45",
    slides: [
      {
        kind: "kapak",
        label: "GÜN 3 · OTURUM 4",
        title: "Bir kontrat nasıl boşaltılır?",
        subtitle: "Önce saldırıyı görelim, sonra korunmayı konuşalım",
        theme: "dark",
      },
      {
        kind: "cumle",
        text: "Şimdi bir kasa açacağım ve gözünüzün önünde boşaltacağım.",
        note: "Slaydı aç, laptopa geç. Konuşmayı kes, demoyu yap.",
      },
      {
        kind: "govde",
        title: "Ne oldu?",
        body: [
          "Kasa parayı gönderdi — ama bakiyeyi güncellemeyi sonraya bıraktı.",
          "Saldırgan, para gelir gelmez aynı fonksiyonu tekrar çağırdı.",
          "Kasa hâlâ eski bakiyeye bakıyordu. Tekrar gönderdi. Ve tekrar. Ve tekrar.",
        ],
      },
      {
        kind: "cumle",
        text: "ÖNCE KONTROL ET → SONRA KAYDET → EN SON GÖNDER",
      },
      {
        kind: "kart",
        title: "Gerçek dünyadan üç ders",
        cards: [
          {
            title: "Kapı açık kalmış",
            text: "Sadece sahibi çağırabilsin denmiş ama koda yazılmamış. Herkes çağırdı.",
          },
          {
            title: "Fiyata kanmış",
            text: "Kontrat fiyatı tek bir yerden okuyordu. O yer manipüle edildi.",
          },
          {
            title: "Anahtar çalınmış",
            text: "Kod kusursuzdu. Geliştiricinin bilgisayarı değildi.",
          },
        ],
        note: "Her biri için gerçek bir vaka ve tutar söyle — rakamları sunumdan önce doğrula.",
      },
      {
        kind: "cumle",
        text: "Güvenlik sadece kod değil. En zayıf halka genelde insan.",
      },
      {
        kind: "liste",
        title: "Yeni başlayanın kontrol listesi",
        items: [
          "Bu fonksiyonu kim çağırabilir? Koda yazdım mı?",
          "Para hangi sırayla hareket ediyor?",
          "Bir sayı beklediğimden büyük ya da küçük olabilir mi?",
          "Anahtar kimde, nerede duruyor?",
          "Bu davranışı kanıtlayan bir testim var mı?",
        ],
      },
      {
        kind: "cumle",
        text: "Kodun immutable. Hatan da immutable.",
      },
    ],
  },

  {
    id: "deck6",
    name: "Buradan Sonra Nereye",
    when: "Gün 4 · 15.00–15.45",
    slides: [
      {
        kind: "kapak",
        label: "GÜN 4 · KAPANIŞ",
        title: "4 günde ne yaptık?",
        subtitle: "Ve buradan sonra nereye",
      },
      {
        kind: "liste",
        title: "Dört günde şunları yaptın",
        items: [
          "Cüzdan kurdun ve ilk transferini yaptın",
          "Kendi akıllı kontratını yazıp yayınladın",
          "Kendi paranı çıkardın ve bir ekonomi kurdun",
          "AI ile geliştirdin — ve AI'ın hatasını yakaladın",
          "Bir kontratın nasıl soyulduğunu gördün",
          "Web arayüzü bağladın ve projeni sundun",
        ],
      },
      {
        kind: "cumle",
        text: "Dört gün önce bu grubun dışındaydın. Artık içindesin.",
      },
      {
        kind: "kart",
        title: "Nereden devam edersin",
        cards: [
          {
            title: "Ücretsiz kurslar",
            text: "Sıfırdan ileri seviyeye giden, tamamen ücretsiz platformlar var.",
          },
          {
            title: "Bulmacalar",
            text: "Oyunlaştırılmış zafiyet bulmacaları. Gece oturumunda tattın.",
          },
          {
            title: "Açık kaynak",
            text: "Gerçek projelere küçük katkı. İlk işini bu getiriyor.",
          },
        ],
        note: "QR kod koy. İnternet zayıf olsa da telefonla okunur.",
      },
      {
        kind: "govde",
        title: "Hackathon'a git",
        body: [
          "Bir hafta sonunda ekip kurar, bir şey yapar, sunarsın.",
          "Kazanmasan bile portföyün, ekip arkadaşların ve tanışıklığın kalır.",
          "Çoğu insan ilk işini oradan buluyor.",
        ],
        note: "Kendi hackathon hikâyelerinden 1-2 tanesini anlat. En etkili slayt bu olacak.",
      },
      {
        kind: "kart",
        title: "Takıldığında ne yap",
        cards: [
          {
            title: "Hata mesajını oku",
            text: "Cevabın yarısı zaten orada yazıyor.",
          },
          {
            title: "AI'a bağlam ver",
            text: "Kodu, hatayı ve ne beklediğini birlikte ver.",
          },
          { title: "Sor", text: "Topluluklar sandığından çok daha yardımsever." },
        ],
      },
      {
        kind: "cumle",
        text: "“Anlamadığın kodu deploy etme. Ama anlamak için denemeyi bırakma.”",
      },
    ],
  },
];

export const ALL_SLIDES: { deck: Deck; slide: Slide; deckIndex: number }[] =
  DECKS.flatMap((deck, deckIndex) =>
    deck.slides.map((slide) => ({ deck, slide, deckIndex })),
  );
