import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const rpcUrl = process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC ?? "https://sepolia.base.org";

// Tek connector: injected - MetaMask, Rabby, Coinbase gibi tarayıcı eklentileri.
// WalletConnect (QR ile mobil cüzdan) bilerek yok: harici bir proje kimliği ve
// alan adı izni gerektiriyordu, bu dağıtım için gereksiz bir bağımlılık.
export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(rpcUrl),
  },
  ssr: true,
});
