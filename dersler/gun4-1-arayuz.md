# Gün 4 · 10.00–10.45 — Cüzdanı Siteye Bağla

**Ortam:** `web/` klasörü.
**Çıktı:** Cüzdan bağlanan ve kontrattan veri okuyan bir sayfa.

## Hedef

Zincirdeki veriyi normal bir web sayfasında göstermek. Kod yazmak değil,
çalışan kodu okuyup anlamak.

## Öncesinde

Tasarım hazır geliyor. CSS'e tek dakika harcatma.

## Adımlar

### Adım 1 — Çalıştır
```
cd web && npm install && npm run dev
```
Sayfayı aç. Buton var, çalışmıyor. "Eksik olan tek şey bağlantı."
**Dur ve bekle.**

### Adım 2 — Yapıyı oku
`web/app/page.tsx` dosyasını aç. Üç şeyi göster:
- config: hangi ağa bağlanıyoruz
- `useAccount`: cüzdan bağlı mı
- `useReadContract`: kontrattan oku

Kod yazma, sadece oku. **Dur ve bekle.**

### Adım 3 — Kontrat adresini gir
`web/app/config.ts` içindeki adresi öğrenci kendi kontratıyla değiştirsin.
Sayfayı yenile. **Dur ve bekle.**

### Adım 4 — Cüzdanı bağla
Butona bas, cüzdan açılsın, bağlan. Adres ekranda görünsün.
"Site senin kim olduğunu artık biliyor — ama şifre vermedin." **Dur ve bekle.**

### Adım 5 — Veriyi oku
Kontrattaki son mesaj ekranda görünsün.
Öğrenci Remix'ten yeni bir mesaj yazsın, sayfayı yenilesin, değişsin.

"İki gün önce yazdığın kontrat, şimdi bir web sitesinden okunuyor."

## Takılırsan

- Adres yanlışsa sayfa boş gelir, hata vermez. Önce adresi kontrol et.
- Cüzdan yanlış ağdaysa okuma çalışmaz. Base Sepolia'da mı, bak.
