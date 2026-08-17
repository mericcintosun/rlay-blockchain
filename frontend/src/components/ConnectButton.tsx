"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

/// Cüzdan bağlama arayüzü. Tek connector var (injected), bu yüzden liste değil
/// tek bir birincil buton gösteriyoruz.
export function ConnectButton({ compact = false }: { compact?: boolean }) {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  const connector = connectors[0];

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="addr">{shortenAddress(address)}</span>
        <button type="button" className="btn btn-secondary text-sm!" onClick={() => disconnect()}>
          Çık
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <button
        type="button"
        className="btn"
        disabled={isPending || !connector}
        onClick={() => connector && connect({ connector })}
      >
        {isPending ? "Bağlanıyor…" : "Cüzdan bağla"}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="btn btn-block"
        disabled={isPending || !connector}
        onClick={() => connector && connect({ connector })}
      >
        <WalletIcon />
        {isPending ? "Bağlanıyor…" : "Wallet Extension ile bağlan"}
      </button>

      <p className="text-xs text-muted">MetaMask, Rabby ve Coinbase Wallet destekleniyor.</p>

      {error && <p className="err">Cüzdan bağlanamadı, tekrar dener misin?</p>}
    </div>
  );
}

function WalletIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1" />
      <path d="M3 7.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
      <path d="M21 10.5h-4a1.75 1.75 0 0 0 0 3.5h4" />
    </svg>
  );
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
