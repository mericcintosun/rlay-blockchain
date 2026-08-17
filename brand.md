# RlayHub Marka Rehberi

Bu doküman RlayHub'ın görsel kimliğini tanımlar. Kaynağı **icat edilmedi** — `web/`
klasöründeki slayt sitesinde (`app/globals.css`, `app/RlayHubLogo.tsx`) zaten kurulu olan
kimliği burada yazıya döküyor ve `frontend/` (RLAY claim sitesi) için genişletiyoruz.
İki site aynı markanın iki yüzü: renk, tipografi ve logo **birebir aynı** kalmalı.

Layout ritmi ve tipografik hiyerarşi için üç referans siteye (fonmap-tokenization,
a-identity.xyz, getlumenia.com) bakıldı — onlardan **sadece** sayfa akışı ve vurgu
mantığı alındı, renk paleti buradan, sıfırdan kuruldu.

---

## 1. Ton

RlayHub bir kamp markası: ciddi ama sıcak, teknik ama jargon yığmayan. Claim sitesi
arkadaşlar için yapılıyor — "resmi bir borsa" havası değil, "arkadaşının verdiği link"
havası. Türkçe konuşur, İngilizce token/cüzdan terimlerini gerektiğinde olduğu gibi bırakır
(claim, wallet, gas gibi — kampta zaten bu şekilde öğretiliyor).

---

## 2. Renk paleti

Kaynak: `web/app/globals.css`. Değiştirilmez, sadece burada adlandırılıp belgeleniyor.

| Token | Değer | Kullanım |
|---|---|---|
| `--color-purple` | `#5a0fbe` | Marka rengi. Buton arka planı, aktif link, logo, vurgulu değerler. |
| `--color-purple-deep` | `#43089c` | Sadece hover/pressed hali ve tint üstündeki metin. Yeni bir marka rengi değil. |
| `--color-tint` | `#ede3fa` | Mor'un açık tonu. Badge, adres pill'i, progress bar yatağı, ince kenarlıklar. |
| `--color-tint-soft` | `#f6f1fd` | İkincil butonun hover zemini. |
| `--color-bg` | `#f7f8fa` | Sayfa zemini. |
| `--color-ink` | `#0a0a0a` | Ana metin rengi. |
| `--color-muted` | `#5b5b66` | İkincil metin, etiketler. |
| `--color-line` | `#e7e7ee` | Nötr kart/bölüm kenarlığı. |
| `--color-ok` | `#0a7d38` | Başarı mesajı (claim başarılı, tx onaylandı). |
| `--color-err` | `#b00020` | Hata mesajı, "yanlış ağ" durumu. |

Yükselti (elevation) iki kademe — kartlar sayfanın üstünde durmalı, havada uçmamalı:

| Token | Kullanım |
|---|---|
| `--shadow-card` | Normal kartlar. Nötr, çok düşük kontrast. |
| `--shadow-raised` | Sadece claim kartı. Hafif mor tonlu, sayfadaki tek eylemi öne çıkarır. |

### Koyu tema

Koyu temada **marka moru değişmez.** `--color-purple` (buton dolgusu, logo dolgusu,
progress bar) iki temada da `#5a0fbe`. Değişen tek mor, `--color-purple-ink` —
yani *metin* olarak kullanılan mor:

| Token | Açık | Koyu | Neden |
|---|---|---|---|
| `--color-purple` | `#5a0fbe` | `#5a0fbe` | Marka rengi. Dolgu. **Asla değişmez.** |
| `--color-purple-ink` | `#43089c` | `#bb92f7` | Metin/ikon. `#5a0fbe` koyu zeminde ~2:1 kontrast veriyor, okunmuyor. |
| `--color-surface` | `#ffffff` | `#15151c` | Kart, navbar, footer zemini. |
| `--color-bg` | `#f7f8fa` | `#0b0b10` | Sayfa zemini. |
| `--color-ink` | `#0a0a0a` | `#f4f4f7` | Ana metin. |
| `--color-muted` | `#5b5b66` | `#a0a0ae` | İkincil metin. |
| `--color-line` | `#e7e7ee` | `#282833` | Kenarlık. |
| `--color-tint` | `#ede3fa` | `#251345` | Badge/pill/progress yatağı. |
| `--color-tint-soft` | `#f6f1fd` | `#1d0f36` | İkincil buton hover. |
| `--color-ok` | `#0a7d38` | `#3ecf7a` | Koyu zeminde açılır. |
| `--color-err` | `#b00020` | `#ff7085` | Koyu zeminde açılır. |

**Kurallar:**

- Hiçbir bileşende `dark:` varyantı yazılmaz. Tailwind utility'leri
  `var(--color-*)` referansı ürettiği için sadece token değerlerini ezmek yeterli.
- Yüzeyler için asla `#fff` veya `bg-white` yazılmaz — `--color-surface` /
  `bg-surface` kullanılır. Tek istisna: mor dolgu üzerindeki beyaz metin
  (`.btn { color: #fff }`), çünkü mor dolgu iki temada da aynı.
- Tema `<html data-theme="light|dark">` ile seçilir. Kullanıcı seçim yapmadıysa
  **hiç `data-theme` yazılmaz** ve `prefers-color-scheme` geçerli olur — böylece
  sistem temasını değiştirince sayfa da takip eder.
- Koyu tema bloğu `:root:not([data-theme="light"])` ile korunur, yoksa sistemi koyu
  olan kullanıcı açık temayı seçemez.
- Seçim `localStorage` (`rlayhub-theme`) içinde saklanır ve sayfa boyanmadan önce
  çalışan satır içi bir script ile uygulanır (`ThemeScript`). Bu script olmadan
  kullanıcı önce yanlış temayı görür, sonra doğru temaya atlar.
- `ThemeScript` bir server component olduğu için `localStorage` anahtarını
  `@/config/theme`'den alır, `ThemeToggle`'dan **almaz** — bir server component
  `"use client"` modülünden component olmayan bir export import ederse değer
  sunucuda `undefined` olur.

**Anahtarın yeri:** Navbar'da, cüzdan butonunun hemen solunda (`.btn-icon`). Nötr
renkli — mor cüzdan butonuyla görsel olarak yarışmaz. Güneş ikonu koyu temada
(açığa dön), ay ikonu açık temada (koyuya geç) görünür.

**Kurallar:**
- Beyaz (`#fff`) sadece kart ve nav/footer zemini için kullanılır, `--bg` sayfanın
  kendisi için.
- Mor sadece **etkileşimli veya vurgulu** öğelerde kullanılır (buton, aktif link, logo).
  Büyük düz metin bloklarını mor yapma.
- `--err` ve `--ok` sadece durum mesajlarında kullanılır, dekoratif amaçla değil.

---

## 3. Tipografi

Kaynak: `web/app/layout.tsx`.

- **Poppins** — tüm arayüz metni (başlık, gövde, buton, nav). Ağırlıklar: 400, 500, 600, 700.
- **JetBrains Mono** — adresler, tx hash'leri, kontrat değerleri, kod parçaları.
- Alt küme: `latin` + `latin-ext` (Türkçe karakterler ş ğ ı İ ç ö ü için zorunlu — bunu
  düşürme).

| Kullanım | Font | Ağırlık | Boyut | Harf aralığı |
|---|---|---|---|---|
| H1 (hero) | Poppins | 700 | `clamp(1.95rem, 7vw, 3.25rem)` | `-0.03em` |
| H2 (bölüm / kart başlığı) | Poppins | 600 | 1.35rem | `-0.015em` |
| Hero alt metni | Poppins | 400 | 1.125rem | — |
| Gövde metni | Poppins | 400 | 1rem | — |
| İkincil / açıklama metni | Poppins | 400 | 0.875rem | — |
| Buton | Poppins | 600 | 0.95rem | — |
| Etiket (`.label`, uppercase) | Poppins | 600 | 0.7rem | `0.1em` |
| Adres / hash (`.addr`) | JetBrains Mono | 400 | 0.8rem | — |
| Büyük sayısal değer (`.value`) | JetBrains Mono | 600 | 1.4rem | `-0.02em` |

**Kural:** Başlıklar negatif harf aralığı alır (büyük puntoda Poppins fazla açık durur),
gövde metni almaz. Sayısal her şey monospace — rakamlar sabit genişlikte olunca
bakiye değişince satır zıplamaz.

---

## 4. Logo

`RlayHubMark` / `RlayHubLogo` (`web/app/RlayHubLogo.tsx`) — tek renkli, `currentColor`
kullanan tek bir SVG path. `frontend/`'de **aynı bileşen** birebir kopyalanır, yeniden
çizilmez. Mor zemin üzerinde beyaz, kağıt zemin üzerinde mor render olur — bunun dışında
bir renk kombinasyonu kullanılmaz. Minimum boyut: 24px (altında okunmaz hale gelir).

---

## 5. Layout ritmi

Referans sitelerin ortak deseni: **büyük başlık + alt başlık + net CTA → numaralı adım
akışı → durum/özellik kartları → kenar durumlar (FAQ tarzı) → footer.** Claim sitesine
şöyle uygulanıyor:

1. **Hero** — badge (ağ adı) → büyük H1 → tek paragraf açıklama. CTA hero'da değil,
   navbar'da ve claim kartında; hero'nun işi bağlam vermek.
2. **Canlı havuz durumu** (`PoolStatus`) — zincirden okunan gerçek veri: kalan RLAY,
   boş kontenjan, doluluk çubuğu, kalan gün. Referans sitelerdeki "stats" bloğunun
   karşılığı, ama uydurma metrik yok — hepsi kontrattan geliyor.
3. **3 adımlık akış** — numaralı, kısa, ikon yok (kampta ikon seti yok, gereksiz
   karmaşıklık). Numaralar tint dolgulu daire içinde monospace.
4. **Claim kartı** (`ClaimCard`) — sayfanın tek eylemi, bu yüzden `.card-raised`.
   Tek kart, tek an, tek durum gösterir (bkz. §7). Referans sitelerdeki "kart grid'i"
   yerine kasıtlı olarak tek kart: kullanıcı tam olarak nerede olduğunu görmeli.
5. **Bakiye + gönderme** (`BalanceCard`, `TransferForm`) — sadece cüzdan bağlıyken
   görünür. Bağlı değilken ölü form göstermek kafa karıştırır.
6. **Footer** — marka satırı, kontrat linkleri, ve kutulanmış güvenlik uyarısı.

**Boşluk kuralı:** Bölümler arası `3rem` (mt-12) dikey boşluk, kart içi sıkı gruplama.
Tek sütun, `max-width: 36rem` (`max-w-xl`) — claim sitesi geniş bir dashboard değil,
tek bir işlem ekranı.

**Mobil:** Tek eşik yeter — `sm` (640px). Altında: istatistikler alt alta, hero'da
zorunlu satır sonu kapalı, yatay padding `1.25rem`. `<meta name="viewport">` zorunlu
(yoksa telefon sayfayı 980px'te render edip küçültür). Flex çocuklarına `min-w-0`
verilir, yoksa içerik viewport'u taşırır.

---

## 6. Bileşen stilleri

Hepsi `frontend/src/app/globals.css` içinde `@layer components` altında tanımlı.

| Sınıf | Ne |
|---|---|
| `.card` | Beyaz zemin, `--color-line` kenarlık, `1.15rem` radius, `--shadow-card`. |
| `.card-raised` | Aynı ama `--color-tint` kenarlık + `--shadow-raised`. **Sadece claim kartı.** |
| `.btn` | Birincil buton: mor zemin, beyaz metin, `0.75rem` radius. Hover'da koyulaşır. |
| `.btn-secondary` | İkincil: beyaz zemin, mor metin, tint kenarlık. |
| `.btn-block` | Tam genişlik varyantı. |
| `.btn-icon` | Kare ikon butonu (tema anahtarı). Nötr renk — mor butonla yarışmaz. |
| `.site-surface` | Sticky navbar yüzeyi: token üzerinden yarı saydam + blur. |
| `.field` | Input: monospace (adres/miktar girilir), focus'ta mor kenarlık + halka. |
| `.badge` | Pill etiket (ör. "Base Sepolia testnet"): tint zemin, koyu mor metin. |
| `.addr` | Adres pill'i: tint zemin, monospace. |
| `.label` | Küçük, uppercase, harf aralıklı bölüm etiketi. |
| `.value` | Büyük monospace sayısal değer. |
| `.err` / `.ok` | Durum mesajı. Her zaman ilgili elemanın hemen altında — toast/modal yok. |

### İki kritik CSS kuralı

1. **Element seviyesi stil `@layer base` içine yazılır, layer'sız yazılmaz.** Layer'sız
   CSS, Tailwind'in `@layer utilities` katmanını yener. Çıplak bir
   `* { margin: 0; padding: 0 }` reset'i sayfadaki **tüm** `mt-*`, `px-*`, `mx-auto`
   sınıflarını sessizce iptal eder. İlk sürüm tam bu yüzden bozuk görünüyordu.
2. **Bare `button` seçicisine stil verilmez.** Sayfada hem tam genişlik birincil
   butonlar hem küçük satır içi butonlar var; global `button { width: 100% }` yazılırsa
   her istisna için `!important` hilesi gerekir. Bunun yerine açık `.btn` sınıfları.

### Butonların hiyerarşisi

Bir kartta yan yana iki mor buton **olmaz** — hangisinin ana yol olduğu kaybolur.
Birincil eylem `.btn`, alternatifler `.btn .btn-secondary`.

---

## 7. Claim arayüzü — durum kılavuzu

`ClaimCard` her zaman **tam olarak bir** durumu gösterir. Ton kuralı: suçlayıcı değil,
bilgilendirici; teknik hata metnini asla ham haliyle basma.

Her durum bir **H2 başlık + açıklama satırı** olarak kurulur; tek satır düz metin değil.
Başlık kullanıcının nerede olduğunu söyler, açıklama ne yapacağını.

| Durum | Başlık | Buton |
|---|---|---|
| Cüzdan bağlı değil | "Cüzdanını bağla" | Tarayıcı cüzdanı (birincil) + Mobil cüzdan (ikincil) |
| Yanlış ağda | "Yanlış ağdasın" | "Base Sepolia'ya geç" |
| Claim edilebilir | "1.000.000 RLAY seni bekliyor" | "Claim et" |
| Tx pending | "İşlem onaylanıyor" | devre dışı, "Gönderiliyor…" |
| Tx başarılı | "RLAY cüzdanında" | — (Basescan linki) |
| Zaten claim etmiş | "Bu cüzdan claim etti" | — |
| Havuz boş | "Kontenjan doldu" | — |
| Süre dolmuş | "Süre doldu" | — |
| Duraklatıldı | "Claim geçici olarak durdu" | — |
| Kullanıcı reddetti | "İşlemi iptal ettin" | "Tekrar dene" |
| Beklenmeyen hata | "Bir şeyler ters gitti" | "Tekrar dene" |

**Cüzdan etiketleri çevrilir.** wagmi connector adları kullanıcıya anlamsız
("Injected" gibi) — arayüzde "Tarayıcı cüzdanı" ve "Mobil cüzdan (QR kod)" yazar.

---

## 8. Erişilebilirlik

- Metin/zemin kontrastı: `--color-ink` her iki temada da zeminine karşı AAA seviyesinde.
  Yeni bir renk eklemeden önce **iki temada da** kontrastı kontrol et.
- Mor metni koyu zemine doğrudan koyma — `--color-purple-ink` bunun için var.
- Her interaktif öğede görünür `:focus-visible` hali var (`@layer base`).
  Tarayıcı varsayılanını kaldırmadan önce yerine bir şey koy.
- Durum mesajları sadece renkle değil, metinle de ifade edilir (renk körlüğü).
- Tema anahtarında `aria-label` + `aria-pressed` var; ikon `aria-hidden`.
- Progress bar `role="progressbar"` + `aria-valuenow` taşır ve yanında sayısal
  karşılığı yazar — çubuk tek bilgi kaynağı değil.
- `color-scheme` koyu temada `dark` olarak set edilir; tarayıcının kendi form
  kontrolleri ve kaydırma çubuğu da temaya uyar.

---

## 9. Asla yapılmayacaklar

- Özel anahtar veya seed phrase isteyen hiçbir form alanı yok.
- Mainnet'e işaret eden hiçbir link/metin yok — her yerde "Base Sepolia testnet" açık
  yazar.
- Referans sitelerden renk, ikon veya görsel kopyalanmaz — sadece bu dokümandaki
  layout ritmi ilkeleri kullanılır.
