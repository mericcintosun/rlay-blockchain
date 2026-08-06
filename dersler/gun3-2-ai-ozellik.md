# Gün 3 · 11.00–11.45 — AI ile Özellik Ekle

**Ortam:** Terminal + AI aracı + Foundry.
**Çıktı:** Token'a AI ile eklenmiş, testleri geçen yeni bir özellik.

## Hedef

spec → test → kod döngüsünü canlı yaşatmak. Sırayı bozma, ders bu sıradadır.

## Görev

`SirinceToken`'a **günlük transfer limiti** ekle:
bir adres 24 saat içinde en fazla belirli miktarda gönderebilsin.

## Adımlar

### Adım 1 — Şartnameyi İNSAN yazar
Kod yazma. Sadece kuralı Türkçe yaz, tahtaya:
- Bir adres 24 saatte en fazla X token gönderebilir
- Limit her adres için ayrı sayılır
- Sahibi limiti değiştirebilir
- Limit aşılırsa işlem reddedilir

Sınıfa sordur: eksik bir şey var mı? (Genelde "sayaç ne zaman sıfırlanır" çıkar.)
**Dur ve bekle.**

### Adım 2 — AI'a TESTLERİ yazdır
Prompt'u sınıfın önünde yaz. İçinde şunlar olsun: dosya yolu, Foundry, sadece test
istiyorsun, implementasyon istemiyorsun, yukarıdaki dört kural.

Çıktıyı **satır satır oku**. "Bu test ne kanıtlıyor?" diye her testte sor.
Eksik test varsa sen ekle. **Dur ve bekle.**

### Adım 3 — Testleri çalıştır (kırmızı olmalı)
`forge test` çalıştır.

> **Muhtemelen "kırmızı test" değil, derleme hatası göreceksin** — testler henüz
> var olmayan bir fonksiyonu (`setDailyLimit` gibi) çağırıyor, o yüzden proje
> derlenmiyor bile. Bu bir aksaklık değil, aynı dersin daha sert hali:
> "Testi yazdık, kod o kadar yok ki derlenmiyor bile."
>
> Gerçekten kırmızı test görmek istersen, önce fonksiyonların boş gövdelerini
> ekletip (`revert()` yeter) sonra çalıştır. İki dakika sürer, sahne daha temiz olur.

"Kırmızı iyi bir şey. Doğrunun tanımı hazır, uygulama yok."
**Dur ve bekle.**

### Adım 4 — AI'a kodu yazdır
Şimdi implementasyonu iste. Testlerin var olduğunu ve onları geçmesi gerektiğini söyle.

Çıktıyı yine oku. Anlamadığın satır varsa AI'a sor, geçme. **Dur ve bekle.**

### Adım 5 — Yeşile döndür
`forge test`. Geçmeyen varsa AI'a hata çıktısını ver, düzelttir.
Kod değişti mi diye tekrar oku.

### Adım 6 — Kritik soru
Sınıfa sor: **"AI bir testi geçsin diye kodu mu düzeltti, yoksa testi mi?"**
Git diff'e bakın. Eğer testi değiştirdiyse bu ciddi bir sorundur — konuşun.

## Kapanış cümlesi

"AI kodu yazdı, testleri sen onayladın. Sorumluluk sende kaldı."
