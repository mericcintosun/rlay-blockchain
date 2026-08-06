# Gün 3 · 15.00–15.45 — Büyük Soygun

**Ortam:** Terminal + Foundry (yerel, internet gerekmez).
**Çıktı:** Canlı boşaltılmış ve sonra yamalanmış bir kasa.

## Hedef

Kampın en akılda kalan 45 dakikası. Önce saldırı, sonra savunma.

## Adım 1 — Sahne kur (5 dk)
Slaydı aç, tek cümle söyle: "Şimdi bir kasa açacağım ve gözünüzün önünde
boşaltacağım." Sonra konuşmayı kes.

`contracts/src/Kasa.sol` dosyasını aç, birlikte oku. 30 satır, üç fonksiyon.
Sınıfa sor: "Burada bir sorun görüyor musunuz?" Genelde göremezler. İyi.
**Dur ve bekle.**

## Adım 2 — Soygunu çalıştır (10 dk)
`contracts/` klasöründen:
```
forge test --match-test test_VulnerableVaultCanBeDrained -vv
```

Ekranda şunu göreceksin — tahtaya aynen bu tabloyu yaz:
```
BEFORE  vault (ether)   : 15
BEFORE  attacker (ether): 1
AFTER   vault (ether)   : 0
AFTER   attacker (ether): 16
```

Üç dürüst kullanıcı 15 ether yatırmıştı. Saldırgan 1 ether ile geldi, 16 ether ile çıktı.
**Dur ve bekle.**

## Adım 3 — Ne oldu? (10 dk)
`Soygun.t.sol` içindeki `Saldirgan` kontratını aç. `receive()` fonksiyonunu göster.

Tahtada ok çizerek anlat:
1. Kasa parayı gönderiyor
2. Saldırganın `receive()` tetikleniyor
3. Oradan tekrar `withdraw()` çağrılıyor
4. Kasa hâlâ eski bakiyeye bakıyor → tekrar gönderiyor
5. Adım 2'ye dön

"Kasa parayı gönderdi ama bakiyeyi sıfırlamayı sonraya bıraktı."
**Dur ve bekle.**

## Adım 4 — Birlikte yamala (10 dk)
Sınıfa sordur: hangi satır nereye taşınmalı?

Cevap gelince `KasaGuvenli.sol`'u aç ve karşılaştır. Tek fark: sıra.

```
forge test --match-test test_PatchedVaultResistsTheSameAttack -vv
```

Bu test **aynı `Saldirgan` kontratını** yamalı kasaya sürüyor. Saldırı bu sefer
revert ediyor: saldırgan 1 ether ile geldi, 1 ether ile gidiyor, kasaya dokunamıyor.
```
BEFORE  vault (ether)   : 5
AFTER   vault (ether)   : 5
AFTER   attacker (ether): 1
```

Tahtaya yaz ve sildirme:
**ÖNCE KONTROL ET → SONRA KAYDET → EN SON GÖNDER**
**Dur ve bekle.**

## Adım 5 — Gerçek vakalar (10 dk)
Slayt 05'ten üç vaka. Rakamları söyle.
Son slayt: yeni başlayanın kontrol listesi. Öğrenciler fotoğraflasın.

## Kapanış cümlesi

"Kodun kalıcı. Hatan da kalıcı. Yarın projenizi yayınlamadan önce bu listeyi
tekrar açacağız."
