# RLAY — RlayHub Token

RlayHub adına çıkarılmış ERC-20 token ve arkadaşlara açık claim dağıtımı.
Ağ: **Base Sepolia testnet (84532)**. Asla mainnet değil.

> Bu dosya RLAY projesini anlatır. Kampın ders akışı için `README.md`'ye bak.
> Arayüzün renk/tipografi/UX kuralları `brand.md` dosyasında.

---

## Proje özeti

İki ayrı kontrat, tek sorumluluk kuralı:

| Kontrat | Ne yapar |
|---|---|
| `contracts/src/RlayToken.sol` | Saf ERC-20 + ERC20Permit. **`mint()` fonksiyonu yok.** Tüm arz (21.000.000 RLAY) deploy anında tek seferde basılır, sonradan artırılamaz. |
| `contracts/src/RlayClaim.sol` | Dağıtım kuralları. Cüzdan başına tek seferlik claim, 7 günlük süre, Pausable, deadline sonrası sweep. |

**Dağıtım:** 21.000.000 RLAY toplam arz → 20.000.000 claim havuzuna (20 slot × 1.000.000),
1.000.000 hazinede (owner cüzdanı).

**Claim kuralı:** Allowlist yok, herkese açık. Bir cüzdan bir kere, 1.000.000 RLAY.

### Tasarım kararları

- **Neden iki kontrat?** Token'a claim mantığı gömülmedi. Token sadece token; dağıtım
  politikası değişirse yeni bir claim kontratı deploy edilir, token'a dokunulmaz.
- **Neden `mint()` yok?** "Sonradan token basılamaz" garantisi kod seviyesinde. Test
  bunu düşük seviye call ile selector'ü çağırıp kanıtlıyor
  (`test_RevertWhen_MintSelectorDoesNotExist`).
- **Neden `Ownable2Step`?** Düz `Ownable`'da yanlış adrese `transferOwnership` çağırmak
  kontratı kalıcı olarak kilitler. İki adımlı devirde yeni sahip `acceptOwnership()`
  çağırmadan devir tamamlanmaz.
- **Neden `rescueToken` RLAY'i reddediyor?** Aksi halde owner, deadline'ı beklemeden
  havuzu boşaltabilirdi — `sweep()`'in deadline kuralı delinmiş olurdu.
- **CEI:** `claim()` içinde önce state (`_hasClaimed`, `_claimedCount`), sonra event,
  en son `SafeERC20.safeTransfer`.

---

## Deploy edilmiş kontratlar (Base Sepolia)

| | Adres |
|---|---|
| **RlayToken** | [`0xf41D131cbB040e7655C7Fc4C78c4Da54Bf9B06c0`](https://sepolia.basescan.org/address/0xf41D131cbB040e7655C7Fc4C78c4Da54Bf9B06c0) |
| **RlayClaim** | [`0xa0B1Ac0f8b33d7df59d58C93030b50e93f1a2993`](https://sepolia.basescan.org/address/0xa0B1Ac0f8b33d7df59d58C93030b50e93f1a2993) |

İkisi de Basescan'de **doğrulanmış** (kaynak kod görünür).

### Deploy işlemleri

| İşlem | Tx hash |
|---|---|
| RlayToken deploy | `0x917263f5294560bfba5495ed1ba07da618aeaa6a8d8c89ced3a771e224d0490c` |
| RlayClaim deploy | `0xc49db6ebdd657de366c1eadee79e4dd27a2398356e1e8950846533580acd4656` |
| Havuza 20.000.000 RLAY | `0xc5774b3ba03435aff52ea4d891489651340b606b1972072f238e3d3500aae43c` |
| Hazineye 1.000.000 RLAY | `0x195c9551959e846864ea0e2874acc3ed3735b804ac72af03507f4ec156c66816` |
| Sahiplik devri başlatma | `0x1f4cf74f68d43418add5d696f21b03ac0aab4a254ac12107e695e7448ecea2bd` |

### Uçtan uca claim doğrulaması

Gerçek ağda bir claim denendi ve test token'ı havuza geri gönderildi:

| İşlem | Tx hash |
|---|---|
| Test claim | `0x2b4c4df63a1325871caae122d829c3d4c9818cd8814b6d89b34f407d082d6998` |
| Test token'ının havuza dönüşü | `0x3c5fa58573f94b5a91cbd6cfdd62730c4afb55a96d7484318b1d4b872ba05120` |

Havuz tekrar 20.000.000 RLAY — 20 kişilik kontenjan bozulmadı.

### Kalan tek adım: sahipliği kabul et

`RlayClaim`'in sahipliği hazine cüzdanına (`0x5033f39F...`) devredilmeye başlandı ama
`Ownable2Step` gereği **yeni sahibin kabul etmesi** gerekiyor. Kabul edilmeden
`pause` / `unpause` / `sweep` / `rescueToken` yetkileri hazine cüzdanına geçmez.

Basescan üzerinden (private key hiçbir yere yazılmaz, cüzdan imzalar):

```
https://sepolia.basescan.org/address/0xa0B1Ac0f8b33d7df59d58C93030b50e93f1a2993#writeContract
```

Cüzdanı bağla → `acceptOwnership` → çalıştır.

---

## Kurulum

### 1. Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
forge --version   # 1.7.1
```

### 2. Kontrat bağımlılıkları

Bağımlılıklar submodule olarak çivili (forge-std, OpenZeppelin v5).

```bash
git clone --recurse-submodules <repo-url> && cd rlay-blockchain
cd contracts && forge install    # submodule'ler boş geldiyse
forge build
```

### 3. `.env` dosyası

`contracts/.env.example` yok — repo kökündeki `.env.example` kullanılır ve
**`contracts/` içine** kopyalanır (repo kökünde durursa Foundry görmez):

```bash
cp .env.example contracts/.env
```

Doldurulacaklar:

| Değişken | Nereden |
|---|---|
| `BASE_SEPOLIA_RPC` | `https://sepolia.base.org` yeterli. Daha stabil uç nokta için [Alchemy](https://www.alchemy.com/) veya Infura. |
| `PRIVATE_KEY` | Deploy edecek cüzdanın anahtarı. **Sadece testnet cüzdanı kullan.** |
| `BASESCAN_API_KEY` | [basescan.org/myapikey](https://basescan.org/myapikey) — ücretsiz. |

Testnet ETH: [Alchemy Base Sepolia faucet](https://www.alchemy.com/faucets/base-sepolia)
veya [Coinbase faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet).

### 4. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
```

`.env.example` içindeki değerler doğrudan çalışır; hepsi public (chain id, kontrat
adresleri, public RPC). Gizli anahtar gerekmiyor.

---

## Test

```bash
cd contracts

forge test                       # tüm testler
forge test --match-path "test/Rlay*"   # sadece RLAY testleri
forge coverage --report summary  # kapsam raporu
forge fmt --check src/RlayToken.sol src/RlayClaim.sol   # biçim kontrolü
```

`test/DeployRlay.t.sol` Base Sepolia'yı fork'lar, yani internet ve geçerli
`BASE_SEPOLIA_RPC` gerektirir.

### Test dosyaları

| Dosya | Ne test eder |
|---|---|
| `test/RlayToken.t.sol` | Arz, metadata, transfer/transferFrom, permit (pozitif + negatif), **mint edilemezlik kanıtı** |
| `test/RlayClaim.t.sol` | Claim akışı, tekrar claim, deadline, havuz tükenmesi, pause, sweep, rescueToken, Ownable2Step devri |
| `test/RlayClaim.fuzz.t.sol` | Rastgele cüzdan/miktar/zaman ile claim davranışı |
| `test/invariant/RlayInvariant.t.sol` | Arz hiç değişmiyor, bakiye toplamı = arz, havuz muhasebesi tutarlı |
| `test/DeployRlay.t.sol` | Deploy script'i Base Sepolia fork'unda uçtan uca |

### Kapsam

```
src/RlayToken.sol   100.00% satır | 100.00% ifade | 100.00% dal | 100.00% fonksiyon
src/RlayClaim.sol   100.00% satır | 100.00% ifade | 100.00% dal | 100.00% fonksiyon
```

---

## Deploy

```bash
cd contracts
forge script script/DeployRlay.s.sol \
  --rpc-url base_sepolia \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

Script sırayla: RlayToken deploy → RlayClaim deploy → havuza 20M → hazineye 1M →
sahiplik devrini başlat. Sonunda `require` ile bakiye dağılımını doğrular, yanlışsa
işlem geri alınır.

`--verify` başarısız olursa elle:

```bash
forge verify-contract <TOKEN_ADRESI> src/RlayToken.sol:RlayToken \
  --chain 84532 --etherscan-api-key $BASESCAN_API_KEY \
  --constructor-args $(cast abi-encode "constructor(address)" <DEPLOYER_ADRESI>)

forge verify-contract <CLAIM_ADRESI> src/RlayClaim.sol:RlayClaim \
  --chain 84532 --etherscan-api-key $BASESCAN_API_KEY \
  --constructor-args $(cast abi-encode "constructor(address,uint256,address)" \
    <TOKEN_ADRESI> 1000000000000000000000000 <DEPLOYER_ADRESI>)
```

> Constructor argümanları **deploy anındaki** değerler olmalı. Sahiplik sonradan
> devredildiği için `owner_` alanına hazine adresi değil, deploy eden adres yazılır.

---

## Frontend

```bash
cd frontend
npm run dev      # http://localhost:3000
npm run build    # production build
npm run sync:abi # her iki ABI'yi kontratlardan yeniden üret
```

ABI dosyaları **elle kopyalanmaz** — `npm run sync:abi` komutu
`forge inspect` ile `src/abi/RlayToken.json` ve `src/abi/RlayClaim.json`
dosyalarını yeniden üretir. Kontrat değişirse bu komutu çalıştır.

### Klasör yapısı

```
frontend/src/
  config/     wagmi.ts (ağ + connector), contracts.ts (adres + ABI)
  abi/        RlayToken.json, RlayClaim.json  (forge inspect çıktısı)
  hooks/      useRlayBalance.ts, useClaim.ts
  components/ ConnectButton, ClaimCard, BalanceCard, TransferForm, TxStatus, RlayHubLogo
  app/        layout.tsx, page.tsx, providers.tsx, globals.css
```

### Stack

Next.js 16 (App Router) · TypeScript · TailwindCSS 4 · wagmi 3 · viem 2

Cüzdan bağlantısı için harici modal kütüphanesi yok — wagmi'nin kendi `injected`
connector'ı kullanılıyor (MetaMask, Rabby, Coinbase eklentisi), buton
`brand.md`'deki marka stiline birebir uyuyor. WalletConnect kaldırıldı: harici bir
proje kimliği ve alan adı izni gerektiriyordu, bu dağıtım için gereksiz bir bağımlılık.

### Claim arayüzünün karşıladığı durumlar

Cüzdan bağlı değil · yanlış ağda (tek tıkla Base Sepolia'ya geçiş) · claim edebilir ·
tx pending · tx başarılı (Basescan linkiyle + havai fişek) · zaten claim etmiş ·
havuz boş · süre dolmuş · duraklatıldı · kullanıcı tx'i reddetti · beklenmeyen hata.

---

## Güvenlik

- `PRIVATE_KEY` ve `BASESCAN_API_KEY` **asla** `NEXT_PUBLIC_` almaz, frontend bundle'ına
  girmez. Sadece `contracts/.env` içinde yaşar, `.gitignore`'da.
- Frontend'e giden her şey public: chain id, kontrat adresleri, ABI, public RPC.
- `.gitignore`: `.env*` (ama `.env.example` hariç), `out/`, `cache/`, `broadcast/`,
  `node_modules/`, `.next/`, `lib/`, `*.keystore`.
- Site hiçbir yerde private key veya seed phrase istemez.
