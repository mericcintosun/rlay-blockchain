import { JetBrains_Mono, Poppins } from "next/font/google";
import { Providers } from "./providers";
import { RlayHubLogo } from "@/components/RlayHubLogo";
import { NavWallet } from "@/components/NavWallet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

// brand.md §3: geometric sans for everything, monospace for addresses/hashes.
// latin-ext carries the Turkish characters (ş ğ ı İ ç ö ü).
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "RlayHub Claim",
  description: "RlayHub kampı arkadaşları için RLAY token claim sayfası - Base Sepolia testnet.",
};

// Bu olmadan mobil tarayıcılar sayfayı 980px genişlikte render edip küçültür,
// yani telefonda her şey ufak ve kaymış görünür. Arkadaşların çoğu telefondan
// girecek, bu yüzden zorunlu.
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_RLAY_TOKEN_ADDRESS ?? "";
const CLAIM_ADDRESS = process.env.NEXT_PUBLIC_RLAY_CLAIM_ADDRESS ?? "";
const EXPLORER = "https://sepolia.basescan.org/address";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: ThemeScript, React devralmadan önce
    // <html data-theme> özniteliğini yazıyor - bu kasıtlı bir fark.
    <html lang="tr" className={`${poppins.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* Her şeyden önce: kayıtlı tema, sayfa boyanmadan uygulanır. */}
        <ThemeScript />
        <Providers>
          <header className="site-surface sticky top-0 z-10 border-b border-line">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3.5 sm:px-6 sm:py-4">
              <a
                className="text-purple-ink inline-flex min-w-0 items-center text-lg no-underline sm:text-xl"
                href="/"
              >
                <RlayHubLogo />
              </a>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <NavWallet />
              </div>
            </div>
          </header>

          <div className="flex flex-1 justify-center px-5 py-14 sm:px-6 sm:py-20">
            {/* min-w-0: flex çocukları varsayılan olarak içerik genişliğinin altına
                inmez, bu da mobilde yatay taşmaya yol açar. */}
            <main className="w-full min-w-0 max-w-xl">{children}</main>
          </div>

          <footer className="bg-surface mt-8 border-t border-line">
            <div className="mx-auto max-w-5xl px-6 py-10">
              <div className="flex flex-wrap justify-between gap-8 text-sm leading-relaxed text-muted">
                <div>
                  <div className="text-ink font-semibold">RlayHub</div>
                  <div className="mt-1">Şirince Blokzincir Kampı · RLAY dağıtımı</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="label">Kontratlar</div>
                  <a
                    className="text-purple-ink no-underline hover:underline"
                    href={`${EXPLORER}/${TOKEN_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    RlayToken ↗
                  </a>
                  <a
                    className="text-purple-ink no-underline hover:underline"
                    href={`${EXPLORER}/${CLAIM_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    RlayClaim ↗
                  </a>
                </div>
              </div>

              {/* Güvenlik uyarısı - brand.md §9. Kırmızı duvar değil, sakin ama görünür. */}
              <div className="mt-8 rounded-xl border border-line bg-bg px-4 py-3 text-xs leading-relaxed text-muted">
                <strong className="text-ink">Base Sepolia testnet (84532).</strong> Bu bir test
                ağıdır, RLAY&apos;in parasal değeri yoktur. Özel anahtarını veya kurtarma
                cümlelerini hiçbir siteye ve hiç kimseye verme — bu site de asla istemez.
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
