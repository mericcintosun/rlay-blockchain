# Gün 2 · 10.00–10.45 — Şirince Defteri

**Ortam:** Remix (tarayıcı). Terminal yok, repo yok.
**Çıktı:** Her öğrencinin tarayıcısında çalışan kendi kontratı.

## Hedef

Öğrenci "akıllı kontrat" kelimesinin ne demek olduğunu, üç parçasını görerek anlar:
hafıza, işlem, duyuru.

## Bu derste kullanılmayacak kelimeler

`mapping`, `modifier`, `gas`, `storage`, `calldata`, `immutable`, `custom error`.
Hepsi bir sonraki derste gelecek. Şimdi girersen kaybediyorsun.

## Adımlar

### Adım 1 — Boş kontrat
Remix'te Environment'ı **"Remix VM"** yap (henüz gerçek ağa çıkmıyoruz).
Yeni dosya aç, sadece şunu yaz:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SirinceDefteri {
}
```

İlk iki satırı şimdilik "kimlik bilgisi" diye geç — lisans ve derleyici sürümü.
Derle. "Hiçbir şey yapmıyor ama artık bir kontratımız var" de.
**Dur ve bekle.**

### Adım 2 — Hafıza
Bir satır ekle: `string public lastMessage;`

Deploy et. Remix'te `lastMessage` butonuna bastır. Boş dönüyor.
"Kontratın bir hafızası oldu. Şu an boş." **Dur ve bekle.**

### Adım 3 — İşlem
`write` fonksiyonunu ekle. Mesajı `lastMessage`'a yazsın.

Deploy et, bir mesaj yazdır, tekrar `lastMessage`'a bastır. Değişti.
"Hafızayı değiştirebilen bir işlem eklendi." **Dur ve bekle.**

### Adım 4 — Duyuru
`event MessageWritten` ekle ve fonksiyonun sonunda `emit` et.

Tekrar deploy et, bir mesaj yaz, Remix'in konsolundaki log'u aç ve göster.
"Kontrat 'şu oldu' diye ağa iz bıraktı. Gün 4'te bu izleri okuyacağız."
**Dur ve bekle.**

### Adım 5 — Kim yazdı?
Event'e `msg.sender` ekle. Öğrencilere kendi cüzdan adreslerini gösterdiğini fark ettir.

"`msg.sender` = bu fonksiyonu şu an kim çağırdıysa o. Bir sonraki derste bu kelimeyle
kural yazacağız."

## Kapanış

Referans hali: `contracts/src/SirinceDefteri.sol`.
Ama oradaki dosya kuralları da içeriyor — bunu söyleme, sonraki derste açılacak.

## Takılırsan

- Remix derlemiyor: sürüm uyuşmazlığıdır, Solidity Compiler sekmesinden 0.8.28+ seç.
- Deploy çalışmıyor: Environment "Remix VM" olsun. Bu derste henüz gerçek ağa çıkmıyoruz.
