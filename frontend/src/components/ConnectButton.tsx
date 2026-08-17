"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

/// Cüzdan bağlama arayüzü. Harici modal kütüphanesi yok - wagmi'nin kendi
/// connector'ları doğrudan kullanılıyor, butonlar brand.md §6 stiliyle aynı.
export function ConnectButton({ compact = false }: { compact?: boolean }) {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

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

  // Navbar'da tek buton yeter - ilk connector'a bağlanır, tam liste claim kartında.
  if (compact) {
    const primary = connectors[0];
    return (
      <button
        type="button"
        className="btn"
        disabled={isPending || !primary}
        onClick={() => primary && connect({ connector: primary })}
      >
        {isPending ? "Bağlanıyor…" : "Cüzdan bağla"}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector, index) => (
        <button
          key={connector.uid}
          type="button"
          // İlk seçenek birincil (mor), diğerleri ikincil - iki mor buton yan yana
          // durunca hangisinin ana yol olduğu kaybolur.
          className={`btn btn-block ${index === 0 ? "" : "btn-secondary"}`}
          disabled={isPending}
          onClick={() => connect({ connector })}
        >
          {isPending ? "Bağlanıyor…" : connectorLabel(connector.name, connector.type)}
        </button>
      ))}
    </div>
  );
}

/// wagmi connector adları kullanıcıya anlamlı değil ("Injected" gibi) - çeviriyoruz.
function connectorLabel(name: string, type: string): string {
  if (type === "walletConnect" || name === "WalletConnect") return "Mobil cüzdan (QR kod)";
  if (name === "Injected" || name === "Browser Wallet") return "Tarayıcı cüzdanı";
  return name;
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
