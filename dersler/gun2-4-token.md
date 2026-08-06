# Gün 2 · 15.00–15.45 — Kendi Paran

**Ortam:** İlk repo klonlaması burada. Remix + terminal.
**Çıktı:** Sınıfın kendi token'ı ve açılmış bir ekonomi.

## Hedef

Standart neden var, denetlenmiş kütüphane neden kullanılır — ve sınıf ekonomisi açılır.

## Adımlar

### Adım 1 — Repo'yu klonlat
```bash
git clone --recurse-submodules <repo-url>
cd sirince-onchain/contracts
forge build
```
`--recurse-submodules` unutulduysa: `forge install` aynı kapıya çıkar.

Kurulum sorunlarına 10 dakikadan fazla verme; takılan öğrenci yanındakiyle eşleşsin.
**Dur ve bekle.**

### Adım 2 — Kodu OKU, yazma
`contracts/src/SirinceToken.sol` dosyasını aç. Birlikte satır satır oku:
- Neden `ERC20`'den miras alıyoruz
- `maxSupply` neden `immutable`
- `mint` neden `onlyOwner`

"Bu dosya 30 satır. Sıfırdan yazsaydık 150 satır olurdu ve içinde bug olurdu.
Yarın tam olarak bunun örneğini göreceğiz." **Dur ve bekle.**

### Adım 3 — Testleri çalıştır
`forge test` çalıştır. Yeşilleri göster.
Sonra `SirinceToken.sol` içinde `onlyOwner` kelimesini sil, tekrar `forge test`.
Kırmızıyı göster. Geri al.
"Test, kuralının hâlâ orada olduğunu kanıtlıyor." **Dur ve bekle.**

### Adım 4 — Kendi token'ını çıkar
`script/Deploy.s.sol` içinde sadece üç parametreyi değiştirsinler:
isim, sembol, toplam arz.

Deploy **terminalden** — bu ders Remix'te değil:
```bash
cp ../.env.example .env      # PRIVATE_KEY satırını kendi TEST cüzdanınla doldur
source .env
forge script script/Deploy.s.sol --rpc-url base_sepolia --broadcast --private-key $PRIVATE_KEY
```

Önce `--broadcast` olmadan çalıştırtabilirsin: simülasyon yapar, tahmini ücreti
yazar (~0.000015 ETH), hiçbir şey harcamaz. Güzel bir ara adım.

> **`SirinceToken.sol`'u Remix'e yapıştırmayın.** İçindeki
> `openzeppelin-contracts/...` satırı bir Foundry remapping'i; Remix onu çözemez
> ya da yanlış bir paket çeker. Bu dosya terminalde derlenir.

**Dur ve bekle.**

### Adım 5 — Ekonomiyi aç
Sen kamp token'ını deploy et ve herkese 100 tane dağıt.
Kuralı açıkla: ders içi görevler, bug bulma ve yarışmalar token kazandırır.
Son gün en iyi proje bu token'la oylanacak.

## Kapanış

"Artık kendi paranız var ve kuralını siz yazdınız. Kimse sizden habersiz
yeni token basamaz — çünkü koda öyle yazdınız."
