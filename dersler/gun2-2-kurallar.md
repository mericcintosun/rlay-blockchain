# Gün 2 · 11.00–11.45 — Kurallar ve Sahiplik

**Ortam:** Remix. Bir önceki dersteki kontratın üstüne devam.
**Çıktı:** Kuralları olan bir defter kontratı.

## Hedef

"Kod = kanun" fikrini yaşatmak. Öğrenci bir kuralı koda yazar ve o kuralın
gerçekten uygulandığını kendi gözüyle görür.

## Adımlar

### Adım 1 — Boş mesajı yasakla
`require` yerine doğrudan custom error kullan (`error EmptyMessage();` + `if ... revert`).
Neden string yerine error: daha ucuz ve daha net. Bir cümle yeter.

Deploy et, **boş mesaj yazmayı dene**, hata al. Hata mesajını göster.
"Kuralı sen koydun, kontrat uyguladı." **Dur ve bekle.**

### Adım 2 — Sahip kim?
`address public owner;` ve constructor'da `owner = msg.sender;`

Deploy et, `owner` butonuna bastır, kendi adresini göster.
"Kontratı kim yayınladıysa sahibi o oldu." **Dur ve bekle.**

### Adım 3 — Silme fonksiyonu (kuralsız)
`clear()` ekle, herkes çağırabilsin.

Remix'te hesabı değiştir, başka bir hesapla `clear()` çağır — çalışıyor.
"Sorun var mı? Ne olmalıydı?" Sınıfa sordur. **Dur ve bekle.**

### Adım 4 — Kuralı koy
`error NotOwner();` + fonksiyonun başında kontrol.

Başka hesapla dene → hata. Kendi hesabınla dene → çalışıyor.
**Dur ve bekle.**

### Adım 5 — Tekrarı kaldır
Aynı kontrolü ikinci bir fonksiyona yazman gerekseydi kopyalar mıydın?
`modifier onlyOwner` ile göster.

"Modifier = tekrar eden kuralı bir kere yazıp her fonksiyona takmak."

## Kapanış

Öğrencinin kontratı artık `contracts/src/SirinceDefteri.sol` ile aynı olmalı.
Karşılaştırt. Farklıysa nedenini konuş.

**Bir fark bilerek kalacak:** referans dosyada `address public immutable owner;`
yazıyor, öğrencide sadece `address public owner;`. Soran olursa tek cümle:
"`immutable` = bir kere yazılır, bir daha değişmez. Sahip zaten değişmeyecekse
bunu koda söylemek hem daha ucuz hem daha güvenli." Fazlasına girme.

## Sık gelen soru

"Sahibi değiştirebilir miyiz?" — Evet, ama o zaman sahipliği devreden bir fonksiyon
gerekir ve o fonksiyon yanlış yazılırsa kontrat çalınabilir. Gün 3'te gerçek
bir örneğini göreceğiz.
