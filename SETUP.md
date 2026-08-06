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

## Kamptan önce yapılacak 4 şey

**1. Foundry bağımlılıklarını kur ve testleri çalıştır**
```bash
cd contracts
forge install foundry-rs/forge-std
forge install OpenZeppelin/openzeppelin-contracts
forge build
forge test
```
Hepsi yeşil olmalı. `Soygun.t.sol` içindeki iki test kampın belkemiği — mutlaka çalışsın.

`remappings.txt` gerekirse:
```
forge-std/=lib/forge-std/src/
openzeppelin-contracts/=lib/openzeppelin-contracts/contracts/
```

**2. Web tarafını bir kere çalıştır**
```bash
cd web && npm install && npm run dev
```

**3. Sürümleri teyit et** (kamptan 1 gün önce)
```bash
forge --version
npm view wagmi version
npm view viem version
```
Bu ekosistem haftalık değişiyor. `package.json`'daki sürümleri o gün sabitle.

**4. Test parası topla**
Base Sepolia musluğu günlük limitli. 20 öğrenci için tek tek denemek riskli —
önceden tek cüzdana topla, Gün 1'de sen dağıt.

---

## İnternet yedeği (Şirince'de bağlantı kesintili olabilir)

Kamptan önce bir USB'ye al:
- `contracts/lib/` klasörü (forge bağımlılıkları)
- `web/node_modules/` klasörü

Bağlantı çökerse `anvil` ile yerel zincirde devam edebilirsin — Gün 3'ün tamamı
zaten yerelde çalışıyor.
