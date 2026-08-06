# Gün 3 · 14.00–14.45 — Bug'ı Bul

**Ortam:** Terminal + Foundry. Takım çalışması.
**Çıktı:** Bug'ı yakalayan bir test.

## ÖNEMLİ — eğitmen notu

`contracts/egzersiz/cozum/` klasörünü ders bitmeden AÇMA ve AI'a açtırma.
Öğrenci sorarsa "orası ders sonunda açılacak" de.

## Hedef

"Testler geçiyor" ile "kod doğru" farklı şeylerdir. Bunu acıtarak öğretmek.

## Kurulum

`contracts/egzersiz/BuggyToken.sol` dosyasını tanıt:
"Bu kontratı bir AI yazdı. Prompt şuydu: *basit bir token yaz, approve ve
transferFrom olsun.* Derleniyor. İki testi geçiyor. Ama bir bug var."

Takımlar 3 kişilik. Bulan takıma token ödülü.

## Adımlar

### Adım 1 — Mevcut testleri çalıştır (5 dk)
Egzersiz **ayrı bir Foundry projesi** (ana `forge test` çıktısında görünmesin diye):
```bash
cd contracts/egzersiz
forge test
```
İki test de yeşil.
"İşte tuzak burada. Yeşil, kod doğru demek değil."
**Dur ve bekle.**

### Adım 2 — Kodu oku (10 dk)
AI kullanmadan, sadece gözle. Her fonksiyonun ne söz verdiğini yaz:
- `approve` neyi garanti ediyor?
- `transferFrom` o garantiyi koruyor mu?

İpucu ver ama cevabı verme: **"Bir izin verdin. Kaç kere kullanılabilmeli?"**
**Dur ve bekle.**

### Adım 3 — Otomatik araçla bak (5 dk)
Slither veya benzeri bir aracı çalıştır (kuruluysa). Çıktıyı birlikte okuyun.
Araç bu bug'ı bulabilir de bulamayabilir de — ikisi de öğretici.
**Dur ve bekle.**

### Adım 4 — Testi yaz (15 dk)
Takımlar bug'ı kanıtlayan testi yazsın. Test **kırmızı** olmalı — çünkü bug orada.
İlk kırmızıyı gösteren takım kazanır.
**Dur ve bekle.**

### Adım 5 — Düzelt (10 dk)
Bug'ı düzelt, test yeşile dönsün. Diğer testler hâlâ geçiyor mu, kontrol et.

## Kapanış

Şimdi `cozum/COZUM.md` açılabilir. Birlikte oku.

Son cümle: "Bu kontrat derleniyordu, okunaklıydı, testleri geçiyordu — ve bir
cüzdanı boşaltabilirdi. Bu yüzden ERC-20'yi sıfırdan yazmıyoruz."
