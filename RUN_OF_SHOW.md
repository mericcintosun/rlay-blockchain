# RUN OF SHOW — Şirince On-Chain

Nesin Matematik Köyü · 10–15 Ağustos 2026 · 4 gün × 4 oturum

Kampta elinde tutacağın tek kağıt. Her oturum 45 dakika.
Ders dosyasını Claude'a verirken tek cümle yeter: **"`<dosya>` dosyasını oku ve dersi yürüt."**
Claude her adımda durur, sen "devam" dedikçe ilerler.

---

# GÜN 1 — Kod yok, kavram var

### GÜN 1 · 10.00–10.45 · [SLAYT] Güven Problemi: Neden merkeziyetsizlik?
**Aç:** `sirince-onchain.vercel.app/slaytlar` → **Deck 1**, 18 slayt
**Öğrenci:** Laptop kapalı. Sadece dinliyor.
**Sen:** Sıfır teknik terim. Slayt 2'de 30 saniye sus. Slayt 6'yı **atlama**.
**Tahtaya yaz:** "Blokzincir = kimsenin tek başına değiştiremediği ortak defter."
**Süre uyarısı:** Soru-cevap uzar. 10 dakikadan fazla verme, "yarın kodla göreceğiz" de.
**İnternet giderse:** Slaytlar açıksa devam eder — sekmeyi **kapatma** (kodu bağlıyken girmiş ol).
**Bittiğinde öğrencide ne var:** Bir cümlelik tanım ve merak.

### GÜN 1 · 11.00–11.45 · [OYUN · laptopsuz] Köy Defteri Oyunu
**Aç:** Tahta + kağıt, kalem. Slayt yok, laptop yok.
**Öğrenci:** Laptoplar **kapalı**. Gruplara ayrılmış.
**Sen:** Tahtada ortak defter tut. Bir öğrenciye gizlice "aynı parayı iki kişiye gönder" görevi ver.
**Tahtaya yaz:** "Geçmişi değiştirmek için herkesi aynı anda kandırman gerekir."
**Süre uyarısı:** Kuralı 5 dakikada anlat, kalan 40 dakika oynansın.
**İnternet giderse:** Etkilenmez. Bağlantı çökerse **bu dersi uzat**, sonrakini kaydır.
**Bittiğinde öğrencide ne var:** Mutabakat ve mühür kavramını kendileri keşfetmiş olur.

### GÜN 1 · 14.00–14.45 · [UYGULAMA] İlk Cüzdan + İlk Transfer
**Aç:** Tarayıcı + MetaMask + senin dağıtım cüzdanın. **Repo yok, terminal yok.**
**Öğrenci:** Laptop açık, tarayıcı hazır.
**Sen:** Cüzdan kurdur → Base Sepolia'ya geçirt → adresleri **tek kağıtta** topla → parayı dağıt → birbirlerine transfer yaptır.
**Tahtaya yaz:** "Seed phrase'ini kimse senden istemez. İsteyen dolandırıcıdır."
**Süre uyarısı:** ⚠️ Kurulum 20 dk'yı geçerse transfer'e vakit kalmaz — **sonraki oturum transfer'e bağlı.**
**İnternet giderse:** ❌ Kurtarılamaz. Oyunu uzat, bunu akşama al ama **mutlaka yap**.
**Bittiğinde öğrencide ne var:** Parası olan cüzdan + gönderdiği **en az bir işlem**.

### GÜN 1 · 15.00–15.45 · [SLAYT + UYGULAMA] Bir İşlemin Yolculuğu
**Aç:** **Deck 2** (8 slayt), sonra `sepolia.basescan.org`
**Öğrenci:** Öğleden önce yaptığı transfer elinde olmalı — safari buna dayanıyor.
**Sen:** 8 slaydı 20 dakikada bitir, kalan 25 dakika explorer safarisi + görev kartı yarışması.
**Tahtaya yaz:** "Geri alma tuşu yok."
**Süre uyarısı:** Slaytlarda oyalanma. Asıl iş son slayttaki 5 maddelik görev kartı.
**İnternet giderse:** ❌ Explorer şart. Slaytları anlat, safariyi Gün 2 sabahına kaydır.
**Bittiğinde öğrencide ne var:** Explorer'da kendi işlemini okuyabilen öğrenci.

---

# GÜN 2 — İlk kontrat, ilk deploy

### GÜN 2 · 10.00–10.45 · Şirince Defteri
**Aç:** Remix, Environment = **"Remix VM"** (slayt yok)
**Öğrenci:** `remix.ethereum.org` yüklü. **Bu sekme gün boyu kapanmayacak.**
**Sen:** `dersler/gun2-1-defter.md` → Claude'a ver, 5 adım.
**Tahtaya yaz:** "Bir kontratın üç parçası: hafıza, işlem, duyuru."
**Süre uyarısı:** Adım 1'de derleyici sürümü. Takılana 0.8.28+ seçtir, geç.
**İnternet giderse:** Sekme açıksa Remix VM çalışmaya devam eder — **kapattırma.**
**Bittiğinde öğrencide ne var:** Remix VM'de çalışan, mesaj yazıp event basan kendi kontratı.

### GÜN 2 · 11.00–11.45 · Kurallar ve Sahiplik
**Aç:** Remix — sabahki sekmenin üstüne devam (slayt yok)
**Öğrenci:** Sabahki kontratı ekranda, aynı sekme.
**Sen:** `dersler/gun2-2-kurallar.md` → 5 adım. Adım 3'te kuralsız `clear()` yazdır, sınıfa sordur.
**Tahtaya yaz:** "Kuralı sen koydun, kontrat uyguladı. Kod = kanun."
**Süre uyarısı:** Adım 3'teki tartışma uzar. 5 dakikada kes.
**İnternet giderse:** Sekme açıksa etkilenmez.
**Bittiğinde öğrencide ne var:** `owner`, custom error ve `modifier`'ı olan defter kontratı.

### GÜN 2 · 14.00–14.45 · Test Ağına Çık
**Aç:** Remix + `sepolia.basescan.org` (slayt yok)
**Öğrenci:** Cüzdanda test parası var, Environment = "Injected Provider".
**Sen:** `dersler/gun2-3-deploy.md` → 5 adım. Adım 5'te birbirinin kontratına yazdır.
**Tahtaya yaz:** "Kontratını değiştiremezsin. Hata varsa hata da kalıcı."
**Süre uyarısı:** ⚠️ Adım 4 (doğrulama) yarım saat yiyebilir. Tutmuyorsa **bekletme**, "sonra bakarız" de.
**İnternet giderse:** ❌ Bu ders yapılamaz → `OFFLINE.md` anvil tarifi, explorer yerine `cast`.
**Bittiğinde öğrencide ne var:** Base Sepolia'da doğrulanmış, adresi tahtada yazan kontrat.

### GÜN 2 · 15.00–15.45 · Kendi Paran
**Aç:** Terminal — ilk repo klonlaması (slayt yok)
**Öğrenci:** git + foundry kurulu. `git clone --recurse-submodules <repo> && cd */contracts`
**Sen:** `dersler/gun2-4-token.md` → 5 adım. Adım 3'te `onlyOwner`'ı sildirip testi kırmızıya düşür, geri al.
**Tahtaya yaz:** "Denetlenmiş kütüphane kullanmak tembellik değil, güvenlik kararıdır."
**Süre uyarısı:** Adım 1 kurulum. 10 dakikadan fazla verme, takılanı yanındakiyle eşleştir.
**İnternet giderse:** USB'den repo + **solc** + `node_modules` dağıt (`OFFLINE.md`).
**Bittiğinde öğrencide ne var:** `forge test` yeşil geçen repo + kendi token'ı + 100 kamp token'ı.

---

# GÜN 3 — AI, bug, soygun

### GÜN 3 · 10.00–10.45 · AI ile kod yazmak (slayt)
**Aç:** Deck 03 (ders dosyası yok)
**Öğrenci:** Laptop kapalı.
**Sen:** AI'ın ne yapıp ne yapamadığı. Dünkü "hata da kalıcı" cümlesine bağla.
**Tahtaya yaz:** "AI hızlı yazar. Doğru yazdığını sen kanıtlarsın."
**Süre uyarısı:** Bu oturum kısa biterse iyi — sonraki üçü dolu.
**İnternet giderse:** Etkilenmez.
**Bittiğinde öğrencide ne var:** Günün çerçevesi ve bir şüphe.

### GÜN 3 · 11.00–11.45 · AI ile Özellik Ekle
**Aç:** Terminal + AI aracı + Foundry (slayt yok)
**Öğrenci:** Repo klonlu, `forge test` yeşil.
**Sen:** `dersler/gun3-2-ai-ozellik.md` → 6 adım. **Sırayı bozma:** şartname → test → kod.
**Tahtaya yaz:** "AI kodu yazdı, testleri sen onayladın. Sorumluluk sende."
**Süre uyarısı:** Adım 2'de AI çıktısını satır satır okumak uzar — ama kısaltma, ders bu.
**İnternet giderse:** ❌ AI aracı lazım → bu oturumu 14.00 veya 15.00 ile **takas et**.
**Bittiğinde öğrencide ne var:** Token'da günlük transfer limiti + onu kanıtlayan testler.

### GÜN 3 · 14.00–14.45 · Bug'ı Bul
**Aç:** Terminal, `cd contracts/egzersiz && forge test` (slayt yok)
**Öğrenci:** 3 kişilik takımlara ayrılmış. Bulan takıma token ödülü.
**Sen:** `dersler/gun3-3-bug-bul.md` → 5 adım. ⛔ `cozum/` klasörünü ders bitmeden **açma ve AI'a açtırma**.
**Tahtaya yaz:** "Testler yeşil ≠ kod doğru."
**Süre uyarısı:** Adım 2 (10 dk okuma) ve Adım 4 (15 dk test yazma) — saati tut, ipucunu erken verme.
**İnternet giderse:** ✅ Tamamen yerel, etkilenmez.
**Bittiğinde öğrencide ne var:** Bug'ı yakalayan kırmızı bir test + düzeltilmiş kontrat.

### GÜN 3 · 15.00–15.45 · Büyük Soygun
**Aç:** Terminal (`contracts/`) + Deck 05 son 10 dakikada (slayt yok, ders dosyası var)
**Öğrenci:** Laptop açık ama **kapaklar yarı kapalı** — önce izlesinler.
**Sen:** `dersler/gun3-4-soygun.md` → 5 adım. `forge test --match-test test_VulnerableVaultCanBeDrained -vv`
**Tahtaya yaz:** **ÖNCE KONTROL ET → SONRA KAYDET → EN SON GÖNDER** (sildirme, yarın lazım)
**Süre uyarısı:** Adım 3'te ok çizerek anlatım uzar. 10 dakikada bitir, Deck 05'e süre kalsın.
**İnternet giderse:** ✅ Tamamen yerel — kampın en güçlü oturumu internete bağlı değil.
**Bittiğinde öğrencide ne var:** Tahtada 15→0 / 1→16 tablosu ve fotoğrafını çektiği kontrol listesi.

---

# GÜN 4 — Arayüz ve proje

### GÜN 4 · 10.00–10.45 · Cüzdanı Siteye Bağla
**Aç:** Terminal, `cd web && npm install && npm run dev` (slayt yok)
**Öğrenci:** Gün 2'de deploy ettiği kontratın adresi elinde.
**Sen:** `dersler/gun4-1-arayuz.md` → 5 adım. Kod yazdırma, **okut**. CSS'e tek dakika verme.
**Tahtaya yaz:** "Site senin kim olduğunu biliyor — ama şifre vermedin."
**Süre uyarısı:** Adım 1'de `npm install`. USB'yi hazır tut, kuyruğa girme.
**İnternet giderse:** `node_modules` USB'den; okuma anvil'e çevrilir (`OFFLINE.md`).
**Bittiğinde öğrencide ne var:** Cüzdanı bağlanan ve kendi kontratından mesaj okuyan sayfa.

### GÜN 4 · 11.00–11.45 · İlk Yazma İşlemi
**Aç:** `web/` klasörü, dev sunucu açık (slayt yok)
**Öğrenci:** Sabahki sayfa çalışıyor, cüzdan bağlı.
**Sen:** `dersler/gun4-2-yazma.md` → 5 adım. **Adım adım yaz, tek seferde dökme.** Yedek: `web/app/COZUM_gun4.tsx.txt`
**Tahtaya yaz:** "Okuma bedava ve anlık. Yazma ücretli ve beklemeli."
**Süre uyarısı:** Adım 2 kod yazımı. Süre daralırsa Adım 5'i (otomatik yenileme) atla, Adım 4'ü (hata) atlama.
**İnternet giderse:** anvil'e çevir; cüzdana `Anvil` ağını ekletmen gerekir (`OFFLINE.md`).
**Bittiğinde öğrencide ne var:** Butondan zincire mesaj yazan, bekleme ve hata durumunu gösteren arayüz.

### GÜN 4 · 14.00–14.45 · Proje Sprinti
**Aç:** Serbest. Sen anlatmıyorsun, masa masa dolaşıyorsun (slayt yok)
**Öğrenci:** Takım halinde. Başlangıç noktası: `contracts/src/BahsisKutusu.sol`
**Sen:** `dersler/gun4-3-proje.md` → 4 adım. Herkese sor: **"90 dakikada bitecek mi?"** Bitmeyecekse yarısını sildir.
**Tahtaya yaz:** "Tek kontrat, tek ekran, tek buton."
**Süre uyarısı:** ⚠️ Adım 2 (kapsam kesme) 5 dakikada bitmeli. Burada gevşersen Demo Day çöker.
**İnternet giderse:** Baştan "anvil'de çalışıyoruz" de, herkes yerelde kalsın.
**Bittiğinde öğrencide ne var:** Çalışan bir demo + en az bir test.

### GÜN 4 · 15.00–15.45 · Demo Day
**Aç:** Projeksiyon + kamp token'ı ile oylama (ders dosyası yok, format `gun4-3-proje.md` sonunda)
**Öğrenci:** Takım başına 3 dakika: ne yaptık (30sn) · canlı göster (90sn) · en zor kısım (60sn)
**Sen:** Saati **acımasızca** tut. Bitmemiş proje sunulmaz kuralını sabah hatırlat.
**Tahtaya yaz:** "Kodun kalıcı. Hatan da kalıcı."
**Süre uyarısı:** 6 takım × 3 dk = 18 dk sunum + geçişler. Oylamaya 10 dakika bırak.
**İnternet giderse:** ✅ Yerel demo kabul et, kimse itiraz etmez.
**Bittiğinde öğrencide ne var:** Sunulmuş bir proje ve zincirde kendi adresi.

---

# Kamptan önceki gece — 6 madde

1. **`cd contracts && forge test`** → 9 yeşil. **`cd contracts/egzersiz && forge test`** → 2 yeşil.
2. **`cd web && npm run build`** → hatasız. `npm audit` → 0 açık.
3. **`cd contracts && cast chain-id --rpc-url base_sepolia`** → `84532`. (`.env` `contracts/` içinde mi?)
4. **Dağıtım cüzdanında para var mı?** 20 öğrenci × 0.01 ETH + pay = en az 0.5 ETH.
5. **USB hazır mı?** repo + `web/node_modules` + **solc 0.8.28** + foundry binary'leri + slaytlar. → `OFFLINE.md`
6. **Deck 05'teki üç hack vakasının rakamlarını doğrula** (aşağı bak).

---

# Doğrulaman gerekenler

Bunları ben doğrulayamadım — uydurmuyorum, işaretliyorum:

- **Deck 05'teki üç gerçek hack vakası.** Rakamları (tarih, çalınan tutar, protokol adı) sunumdan önce güncel bir kaynaktan teyit et. Sınıfta yanlış rakam söylemek, dersin tamamının güvenilirliğini götürür.
- **Slayt numaraları.** Elimdeki tek kesin bilgi `gun3-4-soygun.md`'nin "Deck 05" demesi. Deck 01–03 eşleştirmeleri benim varsayımım — kendi dosya adlarınla değiştir.
- **Gün 1'in dört bloğu.** Ders dosyası yok; içeriği README, SETUP.md ve konuştuklarımızdan türettim. Kendi planınla karşılaştır.
- **MetaMask'e `Anvil` ağı ekleme** ve **Remix'in bugünkü derleyici listesi.** İkisi de tarayıcı adımı.
- **`anvil --host 0.0.0.0` ile sınıf ağı paylaşımı.** Bayrak var, kampüs wifi'sinin izin verdiğini bilmiyorum.
