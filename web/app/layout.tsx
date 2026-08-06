import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Şirince On-Chain",
  description:
    "Nesin Matematik Köyü · Şirince · 10-15 Ağustos 2026 · Blokzincir Geliştiriciliği kampı",
};

const REPO = "https://github.com/mericcintosun/rlay-blockchain";

const NAV_LINKS = [
  { href: `${REPO}/tree/main/dersler`, label: "Dersler" },
  { href: `${REPO}/tree/main/contracts`, label: "Kontratlar" },
  { href: "https://remix.ethereum.org", label: "Remix" },
  { href: "https://sepolia.basescan.org", label: "Explorer" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <header className="nav">
            <div className="nav-inner">
              <a className="brand" href="/">
                <span className="brand-mark">◈</span>
                <span>Şirince On-Chain</span>
              </a>
              <nav className="nav-links">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <div className="page">{children}</div>

          <footer className="footer">
            <div className="footer-inner">
              <div>
                <strong>Nesin Matematik Köyü</strong> · Şirince · 10-15 Ağustos 2026
                <br />
                Blokzincir Geliştiriciliği — 4 günlük kamp
              </div>
              <div className="footer-warn">
                Base Sepolia testnet (84532). Asla mainnet değil.
                <br />
                Özel anahtarını hiçbir siteye ve hiç kimseye verme.
              </div>
              <div>
                <a href={REPO} target="_blank" rel="noreferrer">
                  Kaynak kod ↗
                </a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
