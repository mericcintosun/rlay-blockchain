"use client";

import { ConnectButton } from "@/components/ConnectButton";

/// Navbar'ın cüzdan köşesi. layout.tsx bir server component olduğu için
/// client-only ConnectButton'ı doğrudan koyamıyoruz - bu ince sarmalayıcı ayırıyor.
export function NavWallet() {
  return <ConnectButton compact />;
}
