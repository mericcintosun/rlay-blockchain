"use client";

import { useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { formatUnits } from "viem";
import { ConnectButton } from "@/components/ConnectButton";
import { TxStatus } from "@/components/TxStatus";
import { useClaim } from "@/hooks/useClaim";

/// Tek kart, tek an, tek durum (brand.md §5 ve §7). Durum mantığının tamamı
/// useClaim() içinde - bu bileşen sadece o duruma göre doğru mesajı/butonu basar.
export function ClaimCard() {
  const { status, claim, reset, txHash, claimAmount } = useClaim();
  const { switchChain } = useSwitchChain();

  const amountLabel =
    claimAmount !== undefined
      ? `${new Intl.NumberFormat("tr-TR").format(BigInt(formatUnits(claimAmount, 18).split(".")[0]))} RLAY`
      : "RLAY";

  return (
    <div className="card-raised">
      <div className="label">Claim</div>

      {status === "wallet-disconnected" && (
        <>
          <h2 className="mt-2">Cüzdanını bağla</h2>
          <p className="mt-1.5 text-sm text-muted">
            Claim edebilmek için önce cüzdanını bağlamalısın.
          </p>
          <div className="mt-5">
            <ConnectButton />
          </div>
        </>
      )}

      {status === "wrong-network" && (
        <>
          <h2 className="mt-2">Yanlış ağdasın</h2>
          <p className="mt-1.5 text-sm text-muted">
            RLAY Base Sepolia testnet üzerinde. Cüzdanını bu ağa geçirmen gerekiyor.
          </p>
          <button
            type="button"
            className="btn btn-block mt-5"
            onClick={() => switchChain({ chainId: baseSepolia.id })}
          >
            Base Sepolia&apos;ya geç
          </button>
        </>
      )}

      {status === "claimable" && (
        <>
          <h2 className="mt-2">{amountLabel} seni bekliyor</h2>
          <p className="mt-1.5 text-sm text-muted">
            Tek işlem, tek seferlik. Gas ücretini sen ödüyorsun.
          </p>
          <button type="button" className="btn btn-block mt-5" onClick={() => claim()}>
            Claim et
          </button>
        </>
      )}

      {status === "pending" && (
        <>
          <h2 className="mt-2">İşlem onaylanıyor</h2>
          <p className="mt-1.5 text-sm text-muted">
            Zincirin işlemi işlemesini bekliyoruz, bu birkaç saniye sürebilir.
          </p>
          <button type="button" className="btn btn-block mt-5" disabled>
            Gönderiliyor…
          </button>
        </>
      )}

      {status === "success" && (
        <>
          <h2 className="mt-2">RLAY cüzdanında</h2>
          <p className="mt-1.5 text-sm text-muted">
            Claim tamamlandı. Token&apos;ı cüzdanına eklemek istersen RLAY kontrat adresini
            kullanabilirsin.
          </p>
          <div className="mt-4">
            <TxStatus state="success" txHash={txHash} />
          </div>
        </>
      )}

      {status === "already-claimed" && (
        <>
          <h2 className="mt-2">Bu cüzdan claim etti</h2>
          <p className="mt-1.5 text-sm text-muted">
            Cüzdan başına tek claim hakkı var, bu cüzdan hakkını kullanmış.
          </p>
        </>
      )}

      {status === "pool-exhausted" && (
        <>
          <h2 className="mt-2">Kontenjan doldu</h2>
          <p className="mt-1.5 text-sm text-muted">
            Havuzdaki tüm slotlar alındı, dağıtılacak RLAY kalmadı.
          </p>
        </>
      )}

      {status === "deadline-passed" && (
        <>
          <h2 className="mt-2">Süre doldu</h2>
          <p className="mt-1.5 text-sm text-muted">
            Claim penceresi kapandı, artık yeni claim alınamıyor.
          </p>
        </>
      )}

      {status === "paused" && (
        <>
          <h2 className="mt-2">Claim geçici olarak durdu</h2>
          <p className="mt-1.5 text-sm text-muted">
            Dağıtım şu an duraklatıldı. Biraz sonra tekrar dene.
          </p>
        </>
      )}

      {status === "rejected" && (
        <>
          <h2 className="mt-2">İşlemi iptal ettin</h2>
          <div className="mt-1.5">
            <TxStatus state="rejected" />
          </div>
          <button
            type="button"
            className="btn btn-block mt-5"
            onClick={() => {
              reset();
              claim();
            }}
          >
            Tekrar dene
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h2 className="mt-2">Bir şeyler ters gitti</h2>
          <div className="mt-1.5">
            <TxStatus state="error" />
          </div>
          <button
            type="button"
            className="btn btn-block mt-5"
            onClick={() => {
              reset();
              claim();
            }}
          >
            Tekrar dene
          </button>
        </>
      )}
    </div>
  );
}
