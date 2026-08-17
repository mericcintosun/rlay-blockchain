export type TxState = "idle" | "pending" | "success" | "rejected" | "error";

interface TxStatusProps {
  state: TxState;
  txHash?: `0x${string}`;
  errorMessage?: string;
}

/// İşlem yaşam döngüsünün (pending/success/rejected/error) tek gösterim yeri.
/// ClaimCard ve TransferForm aynı mantığı kopyalamak yerine bunu paylaşır.
export function TxStatus({ state, txHash, errorMessage }: TxStatusProps) {
  if (state === "idle") return null;

  if (state === "pending") {
    return <p>İşlem onaylanıyor…</p>;
  }

  if (state === "success") {
    return (
      <p className="ok">
        İşlem tamamlandı.{" "}
        {txHash && (
          <a
            className="addr"
            href={`https://sepolia.basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            Basescan'de gör ↗
          </a>
        )}
      </p>
    );
  }

  if (state === "rejected") {
    return <p className="err">İşlemi iptal ettin, istersen tekrar dene.</p>;
  }

  return <p className="err">{errorMessage ?? "Bir şeyler ters gitti, tekrar dener misin?"}</p>;
}
