# Gün 2 · 15.00–15.45 — Kendi Paran

**Ortam:** İlk repo klonlaması burada. Remix + terminal.
**Çıktı:** Sınıfın kendi token'ı ve açılmış bir ekonomi.

## Hedef

Standart neden var, denetlenmiş kütüphane neden kullanılır — ve sınıf ekonomisi açılır.

## Adımlar

### Adım 1 — Repo'yu klonlat
`git clone` + `cd contracts` + `forge install`.
Kurulum sorunlarına 10 dakikadan fazla verme; takılan öğrenci yanındakiyle eşleşsin.
**Dur ve bekle.**

### Adım 2 — Kodu OKU, yazma
`contracts/src/SirinceToken.sol` dosyasını aç. Birlikte satır satır oku:
- Neden `ERC20`'den miras alıyoruz
- `maxSupply` neden `immutable`
- `mint` neden `onlyOwner`

"Bu dosya 25 satır. Sıfırdan yazsaydık 150 satır olurdu ve içinde bug olurdu.
Yarın tam olarak bunun örneğini göreceğiz." **Dur ve bekle.**

### Adım 3 — Testleri çalıştır
`forge test` çalıştır. Yeşilleri göster.
Sonra `SirinceToken.sol` içinde `onlyOwner` kelimesini sil, tekrar `forge test`.
Kırmızıyı göster. Geri al.
"Test, kuralının hâlâ orada olduğunu kanıtlıyor." **Dur ve bekle.**

### Adım 4 — Kendi token'ını çıkar
Öğrenciler sadece üç parametreyi değiştirsin: isim, sembol, toplam arz.
Deploy et. **Dur ve bekle.**

### Adım 5 — Ekonomiyi aç
Sen kamp token'ını deploy et ve herkese 100 tane dağıt.
Kuralı açıkla: ders içi görevler, bug bulma ve yarışmalar token kazandırır.
Son gün en iyi proje bu token'la oylanacak.

## Kapanış

"Artık kendi paranız var ve kuralını siz yazdınız. Kimse sizden habersiz
yeni token basamaz — çünkü koda öyle yazdınız."
