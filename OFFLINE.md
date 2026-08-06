# İnternet Kesintisi Planı

Şirince'de bağlantı gidebilir. Bu dosya "ne yaparım" sorusunun cevabı.

Buradaki komutların **✅ işaretli olanları bu repo'da gerçekten çalıştırıldı**.
"doğrula" yazanları kamptan önce sen test etmelisin.

---

## 30 saniyelik triyaj

İnternet gittiğinde sırayla sor:

1. **Bugün Gün 3 mü?** → Rahat ol. Gün 3'ün tamamı zaten yerelde çalışıyor.
2. **Öğrencilerde `node_modules` ve `lib/` var mı?** → Varsa Gün 2 ve Gün 4 de kurtarılabilir.
3. **Yoksa** → USB'yi çıkar (aşağıdaki liste), dağıt, `anvil` moduna geç.

**Asla yapma:** ders ortasında `npm install` veya `forge install` denemek.
Bağlantı yarım çalışıyorsa bunlar 10 dakika asılı kalıp sonra hata verir.

---

## Ders ders durum

| Oturum | İnternetsiz? | Ne yaparsın |
|---|---|---|
| **Gün 1** · cüzdan + musluk | ❌ Şart | Test parası kesinlikle **önceden** dağıtılmış olmalı. Bu iş kesintiye bırakılamaz. |
| **Gün 1** · slayt + kağıt oyunu | ✅ | Etkilenmez. |
| **Gün 2·1** Defter (Remix) | ⚠️ Kısmen | Remix bir web uygulaması — **yüklendikten sonra Remix VM çevrimdışı çalışır.** Sabah sekmeyi aç, gün boyu **kapatma**. Kapanırsa: aşağıdaki "Remix yerine Foundry" tarifi. |
| **Gün 2·2** Kurallar (Remix) | ⚠️ Kısmen | Aynı. Aynı sekmenin üstüne devam ediliyor zaten. |
| **Gün 2·3** Deploy + explorer | ❌ Şart | Base Sepolia ve explorer olmadan bu ders **yapılamaz**. → "anvil tarifi" ile yerelde deploy et; explorer'ın yerini `cast` tutar. Duygusal vurgu ("kalıcı, herkese açık") kaybolur — bunu sınıfa dürüstçe söyle ve dersi bağlantı gelince tekrarla. |
| **Gün 2·4** Token | ⚠️ Kısmen | `git clone` internet ister → USB. `forge test` **tamamen yerel** ✅. Deploy → anvil. |
| **Gün 3·1** slayt | ✅ | Etkilenmez. |
| **Gün 3·2** AI ile özellik | ❌ Şart | AI aracı olmadan olmaz. **Takas et:** bu oturumu Gün 3·3 veya 3·4 ile yer değiştir, AI dersini bağlantı gelince yap. Yedek: kendi makinende önceden ürettiğin prompt/çıktı ekran görüntülerini göster — ders "canlı" olmaz ama akış kopmaz. |
| **Gün 3·3** Bug'ı bul | ✅ **Tamamen yerel** | `cd contracts/egzersiz && forge test` ✅ doğrulandı. Slither kuruluysa o da yerel. |
| **Gün 3·4** Büyük Soygun | ✅ **Tamamen yerel** | ✅ doğrulandı. Kampın en güçlü oturumu internete hiç bağlı değil. |
| **Gün 4·1** Arayüzü bağla | ⚠️ Kısmen | `npm install` internet ister → USB. Okuma Base Sepolia yerine anvil'den yapılabilir ✅ doğrulandı. |
| **Gün 4·2** İlk yazma | ⚠️ Kısmen | Aynı. Cüzdan anvil ağına eklenir (aşağıda). |
| **Gün 4·3** Proje sprinti | ⚠️ Kısmen | Yerel zincirde tamamı yapılabilir. Takımlara baştan "anvil'de çalışıyoruz" de. |
| **Gün 4** Demo Day | ✅ | Yerel demo kabul et. |

**Özet:** Gün 3 tamamen güvende. Gün 2 ve 4 anvil ile kurtarılır. Gün 1'in musluk işi kurtarılamaz — o yüzden önceden yap.

---

## anvil tarifi (yerel zincir) ✅

Bu akışın tamamı bu repo'da çalıştırıldı ve çalışıyor.

### 1. Zinciri başlat — Terminal A
```bash
anvil
```
Chain id **31337**, adres `http://127.0.0.1:8545`. Terminali açık bırak.

anvil başlarken 10 tane hazır hesap ve bakiyelerini ekrana basar. Birinci hesabın
adresi her zaman aynıdır:
```
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

> Özel anahtarları buraya yazmıyorum. anvil zaten ekrana basıyor; oradan oku.
> Bu anahtarlar herkesçe bilinir, **asla gerçek para tutan bir cüzdanda kullanma**.

### 2. Kontratı kur — Terminal B
```bash
cd contracts

forge create src/SirinceDefteri.sol:SirinceDefteri \
  --rpc-url http://127.0.0.1:8545 \
  --unlocked --from 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 \
  --broadcast
```

Boş bir anvil'de ilk kurulan kontratın adresi **her zaman** şu çıkar:
```
0x5FbDB2315678afecb367f032d93F642f64180aa3
```
Yani tahtaya önceden yazabilirsin.

### 3. Explorer'ın yerine `cast`

Gün 2·3'te explorer'ın yaptığı her şeyin yerel karşılığı var:

| Explorer'da | Terminalde |
|---|---|
| Kontratı aç, bak | `cast code <ADRES> --rpc-url http://127.0.0.1:8545` |
| Read Contract | `cast call <ADRES> "lastMessage()(string)" --rpc-url http://127.0.0.1:8545` |
| Write Contract | `cast send <ADRES> "write(string)" "merhaba" --rpc-url http://127.0.0.1:8545 --unlocked --from 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` |
| İşlem detayı | `cast tx <TX_HASH> --rpc-url http://127.0.0.1:8545` |
| Bakiye | `cast balance <ADRES> --rpc-url http://127.0.0.1:8545` |

"Birbirinin kontratına yaz" adımı (Gün 2·3 Adım 5) yerelde de yapılabilir:
herkes kendi anvil'ini değil, **senin makinendeki tek anvil'i** kullansın —
`anvil --host 0.0.0.0` ile başlat, öğrenciler `http://<senin-ip>:8545` kullansın.
*(Bunu sınıf ağında bir kere doğrula — kampus wifi'si bazen izin vermez.)*

---

## Web'i yerel zincire çevirme ✅

`web/app/config.ts` içinde iki satır:

```ts
import { foundry } from "wagmi/chains";   // baseSepolia yerine

export const DEFTER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as const;

export const config = createConfig({
  chains: [foundry],
  connectors: [injected()],
  transports: {
    [foundry.id]: http(),                 // varsayılan: http://127.0.0.1:8545
  },
});
```

✅ Doğrulandı: bu ayarla sayfanın kullandığı yığın (viem + foundry chain) anvil'den
`lastMessage` ve `messageCount` değerlerini okuyor.

**Cüzdan tarafı:** MetaMask'e elle ağ ekletmen gerekir —
ağ adı `Anvil`, RPC `http://127.0.0.1:8545`, Chain ID `31337`, sembol `ETH`.
*(Tarayıcıda bir kere sen dene — bu adımı doğrulamadım.)*

Kampın sonunda `baseSepolia`'ya geri almayı unutma.

---

## Remix yerine Foundry (Gün 2·1–2·2 için son çare)

Remix sekmesi de kapandıysa, ilk iki dersi terminalde yürütebilirsin — ama
pedagojik olarak zayıflar (buton yok, görsel geri bildirim yok). Sıra:

```bash
cd contracts
# ogrenci src/ icinde kendi dosyasini yazar
forge build --offline
anvil                                    # ayri terminal
forge create src/Deneme.sol:Deneme --rpc-url http://127.0.0.1:8545 \
  --unlocked --from 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --broadcast
cast call <ADRES> "lastMessage()(string)" --rpc-url http://127.0.0.1:8545
```

`--offline` bayrağı Foundry'nin hiçbir şey indirmeye çalışmamasını sağlar ✅.

---

## USB'ye alınacaklar

Kamptan önce hazırla. Toplam ~700 MB, tek USB fazlasıyla yeter.

| # | Ne | Nereden | Boyut | Neden |
|---|---|---|---|---|
| 1 | **Repo'nun tamamı** (submodule'lerle) | `git clone --recurse-submodules` | ~20 MB | `contracts/lib/` içinde (17 MB) |
| 2 | **`web/node_modules/`** | `cd web && npm install` sonrası | ~414 MB | Bunsuz Gün 4 hiç başlamaz |
| 3 | **solc 0.8.28 derleyicisi** | macOS: `~/Library/Application Support/svm/0.8.28/`<br>Linux: `~/.svm/0.8.28/` | 77 MB | ⚠️ **En sık atlanan madde.** Taze bir laptopta `forge build` solc'u indirmeye çalışır ve internetsiz **patlar** |
| 4 | **Foundry binary'leri** | `~/.foundry/bin/` | 176 MB | `forge`/`cast`/`anvil` kurulu değilse tek çare. Platform bazlı — Mac ve Linux için ayrı al |
| 5 | **Slaytlar** (Deck 1–5) | senin makinen | — | Gün 1, Gün 3·1, Gün 3·4 Adım 5 buna bağlı |
| 6 | **MetaMask kurulum dosyası** | tarayıcı eklenti mağazası | — | doğrula: çevrimdışı kurulabiliyor mu |
| 7 | **Remix Desktop** | Remix'in kendi dağıtımı | — | doğrula: sürüm ve platform |

**Kurulum tarifi de USB'ye koy** — öğrenci "bu klasörü nereye kopyalayacağım"
diye sorduğunda cevabın hazır olsun:
- solc → yukarıdaki `svm` yoluna, olduğu gibi
- `node_modules` → `web/` klasörünün içine
- foundry → `~/.foundry/bin/`, sonra `PATH`'e ekle

---

## Öğrencide en olası 5 sorun ve 30 saniyelik çözümü

### 1. `forge: command not found`
En sık görülen. Foundry kurulu ama `PATH`'te değil, ya da terminal yeni açılmamış.
```bash
export PATH="$HOME/.foundry/bin:$PATH"
forge --version
```
Kalıcı olsun diye `~/.zshrc` sonuna aynı satırı ekle. Terminali kapat aç.
*(İnternet varsa: `curl -L https://foundry.paradigm.xyz | bash && foundryup`)*

### 2. Sayfa boş — "Son mesaj: —"
Neredeyse her zaman iki şeyden biri. **Bu sırayla** bak:
1. `web/app/config.ts` içindeki adres hâlâ `0x000...0` mı? → kendi adresini yaz
2. Cüzdan Base Sepolia'da mı? → değilse ağı değiştir

Sayfa hata **vermez**, sessizce boş gelir. O yüzden bu sıra önemli.

### 3. Explorer'da doğrulama tutmuyor — "bytecode does not match"
Üç ayar Remix'tekiyle birebir aynı olmalı:
derleyici sürümü · optimizer açık/kapalı (Remix'te varsayılan **kapalı**) · lisans (`MIT`).
Remix'in Solidity Compiler sekmesini aç, oradaki tam sürümü explorer'a gir.
Hâlâ olmuyorsa **dersi bekletme** — o öğrenciye "sonra bakacağız" de, devam et.

### 4. `forge test` çalışmıyor / import hatası
Yanlış klasördesin. Testler **`contracts/` içinden** çalışır:
```bash
cd contracts && forge test          # 9 test
cd contracts/egzersiz && forge test # 2 test (Gün 3 egzersizi, AYRI proje)
```
`openzeppelin-contracts/...` import hatası alıyorsan submodule'ler boş gelmiştir:
```bash
cd contracts && forge install
```

### 5. Cüzdanda test parası yok / işlem geçmiyor
Musluk günlük limitli, ders ortasında sırada bekleme.
Kendi dağıtım cüzdanından anında gönder:
```bash
cd contracts && source .env
cast send <OGRENCI_ADRESI> --value 0.01ether \
  --rpc-url base_sepolia --private-key $PRIVATE_KEY
```
0.01 ETH bir günü rahat çıkarır. Bunun için **kamptan önce tek cüzdanda para toplamış ol**.

---

## Kesinti anında söyleyeceğin cümle

> "İnternet gitti. İyi haber: bugün yazdığımız her şey kendi bilgisayarımızda
> zaten çalışıyor. Şimdi tam olarak bir blokzinciri kendi makinemizde açacağız."

Sonra `anvil` yaz ve devam et. Panik yapma — sınıf senin tepkine bakar.
