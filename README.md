# Şirince On-Chain

Nesin Matematik Köyü · Şirince · 10–15 Ağustos 2026
**Blokzincir Geliştiriciliği** — 4 günlük kamp

---

## Kurulum (3 komut)

```bash
git clone --recurse-submodules <repo-url> && cd sirince-onchain
cd contracts && forge build
cp ../.env.example .env
```

Bu kadar. `forge test` yeşilse hazırsın.

`--recurse-submodules` yazmayı unuttuysan: `forge install` çalıştır, aynı kapıya çıkar.

> **`.env` nerede duracak:** `contracts/` klasörünün içinde, `foundry.toml`'un yanında.
> Repo kökünde durursa Foundry onu **görmez** ve deploy günü `RPC_URL` bulunamaz.

Gün 1'de repo'ya ihtiyacın yok — sadece tarayıcı yeterli.

---

## Sürümler (6 Ağustos 2026'da doğrulandı)

| Araç | Sürüm |
|---|---|
| Foundry (`forge`) | 1.7.1 |
| Solidity | 0.8.28 |
| forge-std | v1.9.7 |
| OpenZeppelin Contracts | v5.7.0 |
| Node.js | ≥ 20.9 (test edilen: 24.15.0) |
| Next.js | 16.3.0 |
| wagmi / viem | 3.7.6 / 2.55.11 |

Solidity ve Foundry sürümleri `contracts/foundry.lock` ile çivili.
Web sürümleri `web/package.json` içinde tam sürüm olarak sabit — caret yok, kamp
sırasında kendiliğinden güncellenmez.

---

## Klasörler

| Klasör | Ne var |
|---|---|
| `dersler/` | Her ders için tek dosya. Eğitmen bunu AI'a verir, AI dersi yürütür. |
| `contracts/` | Foundry projesi. Hazır kontratlar ve testler. |
| `contracts/egzersiz/` | Gün 3'teki "bug'ı bul" egzersizi. |
| `web/` | Gün 4'teki arayüz şablonu. Tasarım hazır, bağlantı eksik. |

---

## Dersi AI ile yürütmek

Claude Code (veya benzeri) aç, repo klasöründeyken şunu yaz:

```
dersler/gun2-1-defter.md dosyasını oku ve dersi yürüt.
```

AI dersi adım adım anlatır ve her adımda durur. Sen "devam" dedikçe ilerler.

`CLAUDE.md` dosyası AI'a bu repo'nun bir eğitim repo'su olduğunu, çözümü tek seferde
dökmemesi gerektiğini söyler. O dosyayı silme.

---

## Ders dosyaları

| Dosya | Gün / Saat |
|---|---|
| `gun2-1-defter.md` | Gün 2 · 10.00 — Şirince Defteri (Remix) |
| `gun2-2-kurallar.md` | Gün 2 · 11.00 — Kurallar ve sahiplik |
| `gun2-3-deploy.md` | Gün 2 · 14.00 — Deploy + doğrulama |
| `gun2-4-token.md` | Gün 2 · 15.00 — Kendi token'ın |
| `gun3-2-ai-ozellik.md` | Gün 3 · 11.00 — AI ile özellik ekle |
| `gun3-3-bug-bul.md` | Gün 3 · 14.00 — Bug'ı bul |
| `gun3-4-soygun.md` | Gün 3 · 15.00 — Büyük Soygun (canlı hack) |
| `gun4-1-arayuz.md` | Gün 4 · 10.00 — Cüzdanı siteye bağla |
| `gun4-2-yazma.md` | Gün 4 · 11.00 — İlk yazma işlemi |
| `gun4-3-proje.md` | Gün 4 · 14.00 — Proje sprinti |

Gün 1 ve Gün 3'ün ilk oturumu slaytla anlatılır, ders dosyası yok.

---

## Ağ

Base Sepolia testnet (chain id **84532**). Asla mainnet değil.
Özel anahtarın sadece `contracts/.env` içinde durur. `.env` dosyasını **asla** commit etme.
