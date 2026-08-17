import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const rpcUrl = process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC ?? "https://sepolia.base.org";
const walletConnectProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "";

// İki connector yeter:
//   injected      -> MetaMask, Rabby, Coinbase eklentisi (masaüstü tarayıcı cüzdanları)
//   walletConnect -> QR ile mobil cüzdanlar
// Project ID yoksa walletConnect hiç eklenmez; site yine de injected ile çalışır.
const connectors = walletConnectProjectId
  ? [
      injected(),
      walletConnect({
        projectId: walletConnectProjectId,
        showQrModal: true,
        metadata: {
          name: "RlayHub Claim",
          description: "RlayHub kampı için RLAY token claim sayfası",
          url: "https://rlayhub.local",
          icons: [],
        },
      }),
    ]
  : [injected()];

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors,
  transports: {
    [baseSepolia.id]: http(rpcUrl),
  },
  ssr: true,
});
