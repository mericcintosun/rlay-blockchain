"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { isAddress, parseUnits } from "viem";
import { rlayToken } from "@/config/contracts";
import { TxStatus, type TxState } from "@/components/TxStatus";

export function TransferForm() {
  const { isConnected } = useAccount();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { writeContract, data: txHash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const state: TxState = isSuccess
    ? "success"
    : isPending || isConfirming
      ? "pending"
      : error
        ? isUserRejection(error)
          ? "rejected"
          : "error"
        : "idle";

  // Cüzdan bağlı değilken gönderme formu göstermek anlamsız - claim kartı
  // zaten "önce bağlan" diyor, ikinci bir ölü form kafa karıştırır.
  if (!isConnected) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setValidationError(null);

    if (!isAddress(to)) {
      setValidationError("Geçerli bir cüzdan adresi gir (0x ile başlayan 42 karakter).");
      return;
    }

    let parsedAmount: bigint;
    try {
      parsedAmount = parseUnits(amount, 18);
    } catch {
      setValidationError("Geçerli bir miktar gir.");
      return;
    }

    if (parsedAmount <= 0n) {
      setValidationError("Miktar sıfırdan büyük olmalı.");
      return;
    }

    writeContract({
      ...rlayToken,
      functionName: "transfer",
      args: [to, parsedAmount],
    });
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="label">RLAY gönder</div>
      <p className="mt-1.5 text-sm text-muted">
        Claim ettiğin RLAY&apos;in bir kısmını başka bir cüzdana yollayabilirsin.
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        <input
          className="field"
          type="text"
          placeholder="Alıcı adresi (0x…)"
          value={to}
          onChange={(event) => {
            setTo(event.target.value);
            reset();
          }}
        />
        <input
          className="field"
          type="text"
          inputMode="decimal"
          placeholder="Miktar"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
            reset();
          }}
        />
      </div>

      <button type="submit" className="btn btn-block mt-4" disabled={isPending || isConfirming}>
        {isPending || isConfirming ? "Gönderiliyor…" : "Gönder"}
      </button>

      {validationError && <p className="err mt-3">{validationError}</p>}
      <div className="mt-3">
        <TxStatus state={state} txHash={txHash} />
      </div>
    </form>
  );
}

function isUserRejection(error: Error): boolean {
  const message = error.message.toLowerCase();
  return message.includes("user rejected") || message.includes("rejected the request");
}
