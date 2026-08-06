# Repo'yu GitHub'a koyma (5 dakika)

```bash
cd sirince-onchain
git init
git add .
git commit -m "Initial commit: Sirince On-Chain camp repository"
gh repo create sirince-onchain --public --source=. --push
```

`gh` yoksa GitHub'da boş repo aç, sonra:

```bash
git remote add origin https://github.com/KULLANICI/sirince-onchain.git
git branch -M main
git push -u origin main
```

---

## Kamptan önce yapılacak 5 şey

**1. Foundry bağımlılıklarını kur ve testleri çalıştır**

Bağımlılıklar submodule olarak repo'da çivili (forge-std v1.9.7, OpenZeppelin v5.7.0).
`--recurse-submodules` ile klonladıysan kurulacak bir şey yok:

```bash
cd contracts
forge build
forge test          # 9 test, hepsi yeşil
```

Submodule'ler boş geldiyse:
```bash
forge install       # foundry.lock'taki sürümleri geri getirir
```

`remappings.txt` repo'da hazır — dokunma. İçeriği:
```
forge-std/=lib/forge-std/src/
openzeppelin-contracts/=lib/openzeppelin-contracts/contracts/
```

Gün 3 egzersizi **ayrı bir Foundry projesi** (ana `forge test` çıktısı Gün 2'de
spoiler vermesin diye). Onu da bir kere çalıştır:
```bash
cd egzersiz && forge test    # 2 test, ikisi de yeşil (tuzak bu)
```

**2. `.env` dosyasını doğru yere koy**
```bash
# repo kökünden:
cp .env.example contracts/.env         # repo kökünde DEĞİL, contracts/ içinde
cd contracts && cast chain-id --rpc-url base_sepolia   # 84532 dönmeli
```
Repo kökündeki `.env`'i Foundry görmez. Bunu deploy dersinden önce test et.

**3. Web tarafını bir kere çalıştır**
```bash
cd web && npm install && npm run build && npm run dev
```
`npm audit` sıfır açık vermeli.

**4. Sürümleri teyit et** (kamptan 1 gün önce)
```bash
forge --version                 # 1.7.1 bekleniyor
node --version                  # >= 20.9
npm view next version           # package.json 16.3.0'a sabit
npm view wagmi version          # package.json 3.7.6'ya sabit
npm view viem version           # package.json 2.55.11'e sabit
```
Sürümler artık tam sabit (caret yok) — registry'de yenisi çıksa bile `npm install`
aynı sürümü kurar. Yukarıdaki komutlar sadece "arada ne kadar açıldı" diye bakmak
için. Kamp bitmeden **sürüm yükseltme**.

**5. Test parası topla**
Base Sepolia musluğu günlük limitli. 20 öğrenci için tek tek denemek riskli —
önceden tek cüzdana topla, Gün 1'de sen dağıt.

---

## İnternet yedeği (Şirince'de bağlantı kesintili olabilir)

`contracts/lib/` artık submodule olarak repo'nun içinde — ayrıca yedeklemene gerek yok.
USB'ye alınacak tek şey:
- `web/node_modules/` klasörü (npm registry'ye erişemezsen tek çaren bu)

Bağlantı çökerse `anvil` ile yerel zincirde devam edebilirsin — Gün 3'ün tamamı
zaten yerelde çalışıyor.

Ayrıntılı kesinti planı ve öğrenci tarafındaki sık sorunlar: `OFFLINE.md`.
