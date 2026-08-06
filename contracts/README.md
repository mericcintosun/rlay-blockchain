# contracts/

Foundry projesi. Solidity 0.8.28, OpenZeppelin v5.7.0, forge-std v1.9.7.

```bash
forge build
forge test                 # 9 test — Gün 2 ve Gün 3'ün tamamı
cd egzersiz && forge test  # 2 test — Gün 3 egzersizi, AYRI proje
```

`.env` bu klasörün içinde durur, repo kökünde değil. Ayrıntı: `../SETUP.md`.

---

## Kontratlar

| Dosya | Ders | Ne öğretiyor |
|---|---|---|
| `src/SirinceDefteri.sol` | Gün 2 · 10.00 + 11.00 | Hafıza, işlem, event. Sonra `owner`, custom error, `modifier`. Öğrenci bunu Remix'te sıfırdan yazar; dosya referans hali. |
| `src/SirinceToken.sol` | Gün 2 · 15.00 | ERC-20'yi elle yazmamak. `Ownable`, `immutable maxSupply`, cap'li `mint`. Öğrenci **okur**, yazmaz. |
| `src/Kasa.sol` | Gün 3 · 15.00 | ⛔ **Bilerek açıklı.** Reentrancy. Asla düzeltme. |
| `src/KasaGuvenli.sol` | Gün 3 · 15.00 | `Kasa`'nın yaması. Tek fark: bakiye transferden **önce** sıfırlanıyor. Sınıfla birlikte açılır. |
| `src/BahsisKutusu.sol` | Gün 4 · 14.00 | Proje sprintinin hazır başlangıcı. Checks-Effects-Interactions örneği. |
| `egzersiz/BuggyToken.sol` | Gün 3 · 14.00 | ⛔ **Bilerek buglı.** "AI yazdı, derleniyor, testleri geçiyor." Asla düzeltme, cevabı söyleme. |

`script/Deploy.s.sol` — `SirinceDefteri` + `SirinceToken` deploy eder (Gün 2 · 14.00).

---

## Testler — hangisi neyi kanıtlıyor

### `test/SirinceDefteri.t.sol`
| Test | Kanıtladığı |
|---|---|
| `test_AnyoneCanWrite` | Kural koymadıysan herkes yazabilir. |
| `test_EmptyMessageIsRejected` | Koyduğun kural gerçekten uygulanıyor. |
| `test_OnlyOwnerCanClear` | Sahiplik kontrolü çalışıyor: yabancı revert alıyor, sahip alamıyor. |

### `test/SirinceToken.t.sol`
| Test | Kanıtladığı |
|---|---|
| `test_OwnerCanMint` | Mutlu yol. |
| `test_StudentCannotMint` | `onlyOwner` orada. **Gün 2 · 15.00 Adım 3'te bu testi kırmızıya düşürüyoruz** (`onlyOwner`'ı silip geri koyarak). |
| `test_CapCannotBeExceeded` | Arz tavanı aşılamıyor. |
| `testFuzz_SupplyNeverExceedsCap` | Bilgisayar 256 rastgele miktar deniyor, hiçbiri tavanı kıramıyor. Fuzz kavramının girişi. |

### `test/Soygun.t.sol` — kampın belkemiği
| Test | Kanıtladığı |
|---|---|
| `test_VulnerableVaultCanBeDrained` | `Kasa` boşaltılabiliyor. 3 dürüst kullanıcı 15 ether yatırır; saldırgan 1 ether ile gelir, **16 ether ile çıkar**. |
| `test_PatchedVaultResistsTheSameAttack` | **Aynı** saldırgan kontratı `KasaGuvenli`'ye karşı revert ediyor. 1 ether ile gelir, 1 ether ile gider, kasaya dokunamaz. |

`-vv` ile çalıştır — rakamlar ekrana basılır, tahtaya yazacağın tablo hazır gelir:

```bash
forge test --match-test test_VulnerableVaultCanBeDrained -vv
```
```
BEFORE  vault (ether)   : 15      AFTER  vault (ether)   : 0
BEFORE  attacker (ether): 1       AFTER  attacker (ether): 16
```

`Saldirgan` kontratı aynı dosyanın içinde. `receive()` fonksiyonu tahtada anlatılacak
5 adımlık döngünün kendisi.

### `egzersiz/BuggyToken.t.sol`
| Test | Kanıtladığı |
|---|---|
| `test_TransferWorks` | Geçiyor. |
| `test_ApproveThenTransferFromWorks` | Geçiyor. |

**İkisinin de geçmesi dersin tuzağı.** "Testler yeşil" ile "kod doğru" aynı şey değil.
Öğrencinin işi, bug'ı yakalayan **kırmızı** bir üçüncü test yazmak.

Egzersiz neden ayrı proje: ana `forge test` çıktısı Gün 2'de `BuggyToken` adını
göstermesin diye. Bağımlılıkları ana projeyle paylaşır, ek kurulum istemez.

---

## Dokunulmayacak dosyalar

- `src/Kasa.sol` — Gün 3 canlı hack'i. Bug düzeltilirse oturum yok olur.
- `egzersiz/BuggyToken.sol` — Gün 3 egzersizi. Bug düzeltilirse egzersiz yok olur.
- `egzersiz/cozum/` — cevap anahtarı. Oturum bitmeden açma.

Ayrıntılı kural: `../CLAUDE.md`.
