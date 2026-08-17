import { ClaimCard } from "@/components/ClaimCard";
import { BalanceCard } from "@/components/BalanceCard";
import { TransferForm } from "@/components/TransferForm";
import { PoolStatus } from "@/components/PoolStatus";

// brand.md §5: hero -> canlı havuz durumu -> 3 adım -> claim -> bakiye -> gönder.
const STEPS = [
  { title: "Cüzdanını bağla", detail: "Tarayıcı cüzdanı ya da QR ile mobil cüzdan." },
  { title: "Base Sepolia'ya geç", detail: "Yanlış ağdaysan tek tıkla geçirebilirsin." },
  { title: "Claim et", detail: "RLAY tek işlemde doğrudan cüzdanına gelir." },
];

export default function Home() {
  return (
    <>
      <section>
        <span className="badge">Base Sepolia testnet</span>

        {/* Satır sonu sadece geniş ekranda zorlanır - mobilde doğal sarma daha güvenli. */}
        <h1 className="mt-5">
          RLAY, arkadaşlara <br className="hidden sm:inline" />
          açık dağıtım.
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-muted">
          RlayHub kampı için ayrılan RLAY token&apos;ını buradan claim edebilirsin. Cüzdan
          başına bir kere, allowlist yok — kontenjan bitene kadar herkese açık.
        </p>
      </section>

      <div className="mt-12">
        <PoolStatus />
      </div>

      <section className="mt-12">
        <h2>Nasıl çalışır</h2>
        <ol className="mt-5 flex flex-col gap-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="bg-tint text-purple-ink mt-0.5 flex size-7 flex-none items-center justify-center rounded-full font-mono text-xs font-bold">
                {index + 1}
              </span>
              <span>
                <span className="block font-semibold">{step.title}</span>
                <span className="mt-0.5 block text-sm text-muted">{step.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <ClaimCard />
      </section>

      <div className="mt-4 flex flex-col gap-4">
        <BalanceCard />
        <TransferForm />
      </div>
    </>
  );
}
