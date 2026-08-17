"use client";

import { useAccount } from "wagmi";
import { useRlayBalance } from "@/hooks/useRlayBalance";

export function BalanceCard() {
  const { isConnected, address } = useAccount();
  const { formatted, isLoading } = useRlayBalance();

  if (!isConnected || !address) return null;

  const display =
    formatted !== undefined
      ? new Intl.NumberFormat("tr-TR").format(BigInt(formatted.split(".")[0]))
      : "0";

  return (
    <div className="card">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="label">RLAY bakiyen</div>
          <div className="value mt-1">{isLoading ? "…" : `${display} RLAY`}</div>
        </div>
        <span className="addr">{`${address.slice(0, 6)}…${address.slice(-4)}`}</span>
      </div>
    </div>
  );
}
