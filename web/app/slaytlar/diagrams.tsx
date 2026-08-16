// Diagrams for the decks. Each one draws a mechanism the words alone cannot
// carry, in brand colours, sized in viewBox units so it scales with the slide.
// Text inherits the slide font through CSS - no font-family attributes here.

const P = "#5a0fbe";
const P_DARK = "#3d0a85";
const P_LIGHT = "#ede3fa";
const INK = "#0a0a0a";
const GREY = "#5b5b66";
const DANGER = "#b00020";

function Arrow({ id, color = P }: { id: string; color?: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M0 0 L10 5 L0 10 z" fill={color} />
    </marker>
  );
}

/** Numbered badge used to walk the class through a sequence. */
function Step({ x, y, n, fill = P }: { x: number; y: number; n: number; fill?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="15" fill={fill} />
      <text x={x} y={y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff">
        {n}
      </text>
    </g>
  );
}

/* ---------------------------------------------------------------- */
/* Deck 1 - three network topologies                                  */
/* ---------------------------------------------------------------- */

function nodes(cx: number, cy: number, r: number, count: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const a = offset + (i / count) * Math.PI * 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  });
}

export function UcModel() {
  const ring = nodes(0, 0, 74, 7, -Math.PI / 2);
  const mesh = nodes(0, 0, 74, 7, -Math.PI / 2);

  return (
    <svg viewBox="0 0 960 330" className="diagram">
      {/* Merkezi */}
      <g transform="translate(160,120)">
        {ring.map(([x, y], i) => (
          <line key={i} x1="0" y1="0" x2={x} y2={y} stroke={P} strokeWidth="2.5" />
        ))}
        {ring.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="11" fill={P_LIGHT} stroke={P} strokeWidth="2.5" />
        ))}
        <circle cx="0" cy="0" r="24" fill={P} />
      </g>

      {/* Dagitik - three hubs, leaves hang off each */}
      <g transform="translate(480,120)">
        {[-72, 0, 72].map((hx, h) => (
          <g key={h} transform={`translate(${hx},${h === 1 ? -28 : 26})`}>
            {nodes(0, 0, 46, 3, h * 1.2).map(([x, y], i) => (
              <g key={i}>
                <line x1="0" y1="0" x2={x} y2={y} stroke={P} strokeWidth="2.5" />
                <circle cx={x} cy={y} r="9" fill={P_LIGHT} stroke={P} strokeWidth="2.5" />
              </g>
            ))}
            <circle cx="0" cy="0" r="16" fill={P} />
          </g>
        ))}
        <line x1="-72" y1="26" x2="0" y2="-28" stroke={P_DARK} strokeWidth="3" />
        <line x1="0" y1="-28" x2="72" y2="26" stroke={P_DARK} strokeWidth="3" />
      </g>

      {/* Merkeziyetsiz - everyone to everyone */}
      <g transform="translate(800,120)">
        {mesh.map(([x1, y1], i) =>
          mesh.map(([x2, y2], j) =>
            j > i ? (
              <line
                key={`${i}-${j}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={P}
                strokeWidth="1.6"
                opacity="0.55"
              />
            ) : null,
          ),
        )}
        {mesh.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="12" fill={P} />
        ))}
      </g>

      {[
        ["Merkezi", "Herkes tek merkeze bağlı.", 160],
        ["Dağıtık", "Birkaç merkez var.", 480],
        ["Merkeziyetsiz", "Merkez yok.", 800],
      ].map(([t, s, x]) => (
        <g key={t as string}>
          <text x={x as number} y="268" textAnchor="middle" fontSize="26" fontWeight="700" fill={INK}>
            {t}
          </text>
          <text x={x as number} y="298" textAnchor="middle" fontSize="18" fill={GREY}>
            {s}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Deck 1 - the seal chain, and what breaks when you edit the past    */
/* ---------------------------------------------------------------- */

export function MuhurZinciri() {
  const pages = [
    { n: 1, seal: "a3f2", ok: true },
    { n: 2, seal: "7c19", ok: true },
    { n: 3, seal: "e480", ok: true },
    { n: 4, seal: "b25d", ok: true },
  ];

  return (
    <svg viewBox="0 0 960 340" className="diagram">
      <defs>
        <Arrow id="mz-a" />
        <Arrow id="mz-r" color={DANGER} />
      </defs>

      {pages.map((p, i) => {
        const x = 40 + i * 232;
        const tampered = i === 1;
        const broken = i > 1;
        const stroke = tampered ? DANGER : broken ? DANGER : P;
        return (
          <g key={p.n}>
            <rect
              x={x}
              y="60"
              width="184"
              height="132"
              rx="12"
              fill={tampered ? "#fdeaee" : P_LIGHT}
              stroke={stroke}
              strokeWidth="3"
            />
            <text x={x + 20} y="94" fontSize="20" fontWeight="700" fill={INK}>
              Sayfa {p.n}
            </text>
            <text x={x + 20} y="128" fontSize="17" fill={GREY}>
              önceki mühür
            </text>
            <text x={x + 20} y="158" fontSize="19" fontWeight="700" fill={stroke} className="mono">
              {i === 0 ? "—" : pages[i - 1].seal}
            </text>

            {i < pages.length - 1 && (
              <line
                x1={x + 184}
                y1="126"
                x2={x + 228}
                y2="126"
                stroke={broken || tampered ? DANGER : P}
                strokeWidth="3"
                markerEnd={`url(#${broken || tampered ? "mz-r" : "mz-a"})`}
              />
            )}

            {tampered && (
              <text x={x + 92} y="232" textAnchor="middle" fontSize="19" fontWeight="700" fill={DANGER}>
                değiştirildi
              </text>
            )}
            {broken && (
              <text x={x + 92} y="232" textAnchor="middle" fontSize="19" fontWeight="700" fill={DANGER}>
                mühür tutmuyor
              </text>
            )}
          </g>
        );
      })}

      <text x="480" y="300" textAnchor="middle" fontSize="21" fill={GREY}>
        Ortadaki sayfayı değiştirdiğin anda ondan sonraki bütün mühürler bozulur.
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Deck 2 - the life of a transaction                                 */
/* ---------------------------------------------------------------- */

export function IslemYolculugu() {
  return (
    <svg viewBox="0 0 980 330" className="diagram">
      <defs>
        <Arrow id="iy-a" />
      </defs>

      {/* 1 - sign */}
      <g transform="translate(20,70)">
        <rect width="140" height="110" rx="12" fill={P_LIGHT} stroke={P} strokeWidth="3" />
        <circle cx="52" cy="52" r="16" fill="none" stroke={P} strokeWidth="6" />
        <path d="M64 58 L104 82" stroke={P} strokeWidth="6" strokeLinecap="round" />
        <path d="M96 78 L92 90" stroke={P} strokeWidth="6" strokeLinecap="round" />
      </g>
      <Step x={30} y={62} n={1} />

      {/* 2 - broadcast */}
      <g transform="translate(232,70)">
        <rect width="140" height="110" rx="12" fill="#fff" stroke={P} strokeWidth="3" />
        {nodes(70, 55, 34, 6, -Math.PI / 2).map(([x, y], i) => (
          <g key={i}>
            <line x1="70" y1="55" x2={x} y2={y} stroke={P} strokeWidth="2" opacity="0.6" />
            <circle cx={x} cy={y} r="7" fill={P} />
          </g>
        ))}
        <circle cx="70" cy="55" r="9" fill={P_DARK} />
      </g>
      <Step x={242} y={62} n={2} />

      {/* 3 - mempool */}
      <g transform="translate(444,70)">
        <rect width="140" height="110" rx="12" fill={P_LIGHT} stroke={P} strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="22"
            y={20 + i * 22}
            width="96"
            height="15"
            rx="4"
            fill={i === 0 ? P : "#fff"}
            stroke={P}
            strokeWidth="2"
          />
        ))}
      </g>
      <Step x={454} y={62} n={3} />

      {/* 4 - into a block */}
      <g transform="translate(656,70)">
        <rect width="140" height="110" rx="12" fill="#fff" stroke={P} strokeWidth="3" />
        <rect x="20" y="18" width="100" height="74" rx="8" fill={P} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="32" y={28 + i * 22} width="76" height="14" rx="4" fill="#fff" opacity="0.9" />
        ))}
      </g>
      <Step x={666} y={62} n={4} />

      {/* 5 - confirmed */}
      <g transform="translate(838,70)">
        <rect width="122" height="110" rx="12" fill={P} stroke={P} strokeWidth="3" />
        <path
          d="M36 58 L54 78 L88 36"
          fill="none"
          stroke="#fff"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <Step x={848} y={62} n={5} fill={P_DARK} />

      {[
        [160, 232],
        [372, 444],
        [584, 656],
        [796, 838],
      ].map(([x1, x2], i) => (
        <line key={i} x1={x1 + 6} y1="125" x2={x2 - 8} y2="125" stroke={P} strokeWidth="3" markerEnd="url(#iy-a)" />
      ))}

      {[
        ["İMZALA", 90],
        ["AĞA DUYUR", 302],
        ["BEKLEME HAVUZU", 514],
        ["BLOĞA GİR", 726],
        ["ONAYLANDI", 899],
      ].map(([t, x]) => (
        <text key={t as string} x={x as number} y="216" textAnchor="middle" fontSize="19" fontWeight="700" fill={INK}>
          {t}
        </text>
      ))}

      <text x="514" y="264" textAnchor="middle" fontSize="19" fill={GREY}>
        Havuz kalabalıksa daha çok ödeyen önce bloğa girer.
      </text>
      <text x="514" y="294" textAnchor="middle" fontSize="19" fill={GREY}>
        Bloğa girene kadar işlemin gerçekleşmiş sayılmaz.
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Deck 2 - why an L2 is cheaper                                      */
/* ---------------------------------------------------------------- */

export function L2Zarf() {
  return (
    <svg viewBox="0 0 960 320" className="diagram">
      <defs>
        <Arrow id="l2-a" />
      </defs>

      <g>
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x={30 + (i % 3) * 74}
            y={54 + Math.floor(i / 3) * 44}
            width="62"
            height="30"
            rx="6"
            fill={P_LIGHT}
            stroke={P}
            strokeWidth="2.5"
          />
        ))}
        <text x="140" y="252" textAnchor="middle" fontSize="21" fontWeight="700" fill={INK}>
          Binlerce işlem
        </text>
        <text x="140" y="282" textAnchor="middle" fontSize="18" fill={GREY}>
          L2 üzerinde, ucuz
        </text>
      </g>

      <line x1="266" y1="130" x2="352" y2="130" stroke={P} strokeWidth="3" markerEnd="url(#l2-a)" />

      <g>
        <rect x="372" y="58" width="212" height="146" rx="12" fill={P} />
        <path d="M372 58 L478 146 L584 58" fill="none" stroke="#fff" strokeWidth="4" />
        <text x="478" y="252" textAnchor="middle" fontSize="21" fontWeight="700" fill={INK}>
          Tek zarf
        </text>
        <text x="478" y="282" textAnchor="middle" fontSize="18" fill={GREY}>
          hepsi bir araya konur
        </text>
      </g>

      <line x1="600" y1="130" x2="686" y2="130" stroke={P} strokeWidth="3" markerEnd="url(#l2-a)" />

      <g>
        <rect x="706" y="58" width="212" height="146" rx="12" fill="#fff" stroke={P_DARK} strokeWidth="4" />
        <rect x="742" y="94" width="140" height="74" rx="8" fill={P_DARK} />
        <text x="812" y="252" textAnchor="middle" fontSize="21" fontWeight="700" fill={INK}>
          Ana ağ
        </text>
        <text x="812" y="282" textAnchor="middle" fontSize="18" fill={GREY}>
          tek işlem ücreti ödenir
        </text>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Deck 3 - what a contract is made of                                */
/* ---------------------------------------------------------------- */

export function KontratAnatomisi() {
  return (
    <svg viewBox="0 0 960 340" className="diagram">
      <defs>
        <Arrow id="ka-a" />
      </defs>

      <rect x="250" y="34" width="460" height="248" rx="16" fill="#fff" stroke={P} strokeWidth="4" />
      <text x="480" y="72" textAnchor="middle" fontSize="22" fontWeight="700" fill={P}>
        KONTRAT
      </text>

      <rect x="296" y="98" width="368" height="80" rx="12" fill={P_LIGHT} stroke={P} strokeWidth="2.5" />
      <text x="320" y="130" fontSize="19" fontWeight="700" fill={INK}>
        HAFIZA
      </text>
      <text x="320" y="160" fontSize="18" fill={GREY} className="mono">
        sonMesaj = &quot;merhaba&quot;
      </text>

      <rect x="296" y="196" width="368" height="62" rx="12" fill={P} />
      <text x="320" y="234" fontSize="19" fontWeight="700" fill="#fff" className="mono">
        yaz(mesaj)
      </text>

      {/* call in */}
      <line x1="70" y1="227" x2="288" y2="227" stroke={P} strokeWidth="3" markerEnd="url(#ka-a)" />
      <text x="76" y="206" fontSize="19" fontWeight="700" fill={INK}>
        İŞLEM
      </text>
      <text x="76" y="264" fontSize="16" fill={GREY}>
        biri çağırır
      </text>

      {/* event out */}
      <line x1="672" y1="138" x2="890" y2="138" stroke={P_DARK} strokeWidth="3" markerEnd="url(#ka-a)" />
      <text x="742" y="116" fontSize="19" fontWeight="700" fill={INK}>
        DUYURU
      </text>
      <text x="742" y="176" fontSize="17" fill={GREY}>
        ağa iz bırakır
      </text>

      <text x="480" y="318" textAnchor="middle" fontSize="19" fill={GREY}>
        Hafızayı sadece kontratın kendi işlemleri değiştirebilir.
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Deck 5 - the reentrancy loop. The most important picture of the camp */
/* ---------------------------------------------------------------- */

export function ReentrancyDongusu() {
  return (
    <svg viewBox="0 0 960 400" className="diagram">
      <defs>
        <Arrow id="re-a" />
        <Arrow id="re-r" color={DANGER} />
      </defs>

      {/* vault */}
      <rect x="40" y="96" width="290" height="180" rx="14" fill={P_LIGHT} stroke={P} strokeWidth="4" />
      <text x="70" y="140" fontSize="24" fontWeight="700" fill={INK}>
        KASA
      </text>
      <rect x="70" y="160" width="234" height="100" rx="10" fill="#fff" stroke={DANGER} strokeWidth="3" strokeDasharray="7 5" />
      <text x="88" y="188" fontSize="17" fill={GREY} className="mono">
        bakiye[saldırgan]
      </text>
      <text x="88" y="218" fontSize="23" fontWeight="700" fill={DANGER} className="mono">
        1 ETH
      </text>
      <text x="88" y="245" fontSize="17" fontWeight="700" fill={DANGER}>
        hiç sıfırlanmadı
      </text>

      {/* attacker */}
      <rect x="630" y="96" width="290" height="180" rx="14" fill={P} />
      <text x="660" y="140" fontSize="24" fontWeight="700" fill="#fff">
        SALDIRGAN
      </text>
      <rect x="660" y="166" width="230" height="80" rx="10" fill={P_DARK} />
      <text x="678" y="198" fontSize="18" fill={P_LIGHT} className="mono">
        receive() {"{"}
      </text>
      <text x="678" y="228" fontSize="18" fill="#fff" className="mono">
        {"  "}kasa.withdraw()
      </text>

      {/* 1: call withdraw */}
      <path d="M628 132 L336 132" fill="none" stroke={P} strokeWidth="3.5" markerEnd="url(#re-a)" />
      <Step x={482} y={132} n={1} />
      <text x="482" y="106" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>
        withdraw() çağrılır
      </text>

      {/* 2: money leaves first */}
      <path d="M336 196 L624 196" fill="none" stroke={P} strokeWidth="3.5" markerEnd="url(#re-a)" />
      <Step x={482} y={196} n={2} />
      <text x="482" y="176" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>
        önce para gönderilir
      </text>

      {/* 3: receive fires */}
      <Step x={482} y={252} n={3} />
      <text x="482" y="258" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK} dy="24">
        receive() tetiklenir
      </text>

      {/* 4: re-enter before the balance is cleared */}
      <path
        d="M628 316 C 520 356, 440 356, 336 316"
        fill="none"
        stroke={DANGER}
        strokeWidth="3.5"
        markerEnd="url(#re-r)"
      />
      <Step x={482} y={341} n={4} fill={DANGER} />
      <text x="482" y="388" textAnchor="middle" fontSize="19" fontWeight="700" fill={DANGER}>
        bakiye hâlâ eski → kasa tekrar gönderir → 2. adıma dön
      </text>
    </svg>
  );
}

export const DIAGRAMS = {
  ucModel: UcModel,
  muhurZinciri: MuhurZinciri,
  islemYolculugu: IslemYolculugu,
  l2Zarf: L2Zarf,
  kontratAnatomisi: KontratAnatomisi,
  reentrancyDongusu: ReentrancyDongusu,
} as const;

export type DiagramKey = keyof typeof DIAGRAMS;
