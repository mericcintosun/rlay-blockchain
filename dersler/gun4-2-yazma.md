# Gün 4 · 11.00–11.45 — İlk Yazma İşlemi

**Ortam:** `web/` klasörü.
**Çıktı:** Butondan işlem gönderen çalışan bir arayüz.

## Hedef

Okumakla yazmak arasındaki farkı hissettirmek: yazmak para ve zaman istiyor.

## Adımlar

### Adım 1 — Farkı anlat
Okuma bedava ve anlık. Yazma ücretli ve beklemeli.
"Şimdi ikincisini yapacağız." **Dur ve bekle.**

### Adım 2 — Yazma fonksiyonunu bağla
`useWriteContract` ile input + butonu kontrata bağla.
Adım adım yaz, tek seferde dökme. **Dur ve bekle.**

> **Eğitmen yedeği:** bu dersin sonunda ortaya çıkması gereken tam dosya
> `web/app/COZUM_gun4.tsx.txt` içinde duruyor (derlendiği doğrulandı).
> Sınıfta açma — takılırsan veya süre biterse bak. Bu ders bittiğinde
> `page.tsx`'in içeriği o dosyayla aynı olmalı.

### Adım 3 — Bekleme durumu
Butona bas, cüzdan açılıyor, onayla. Şimdi bekliyor.
"Kullanıcı burada ne görüyor? Hiçbir şey. Bu kötü bir deneyim."

`isPending` ile butonu "Gönderiliyor..." yap. **Dur ve bekle.**

### Adım 4 — Hata durumu
Bilerek cüzdanda **reddet**. Sayfa donuyor mu, hata gösteriyor mu?
Hata mesajını ekrana bastır.
"Kullanıcı iptal edebilir, cüzdanı boş olabilir, ağ düşebilir. Üçünü de düşün."
**Dur ve bekle.**

### Adım 5 — Yenile
İşlem geçtikten sonra okunan veri otomatik güncellensin.

## Kalan süre

Takımlar kendi projelerine başlasın. Fikir Gün 4 · 14.00 dersinde.
