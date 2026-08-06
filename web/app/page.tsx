"use client";

import { useState } from "react";
import { useAccount, useConnect, useReadContract } from "wagmi";
import { DEFTER_ABI, DEFTER_ADDRESS } from "./config";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [draft, setDraft] = useState("");

  // Day 4 / session 1: reading from the chain.
  const { data: lastMessage } = useReadContract({
    address: DEFTER_ADDRESS,
    abi: DEFTER_ABI,
    functionName: "lastMessage",
  });

  const { data: messageCount } = useReadContract({
    address: DEFTER_ADDRESS,
    abi: DEFTER_ABI,
    functionName: "messageCount",
  });

  // Day 4 / session 2 (dersler/gun4-2-yazma.md): wire up useWriteContract here.
  // Deliberately left unimplemented - the class builds it together.
  const canWrite = false;

  return (
    <main>
      <h1>Şirince Defteri</h1>
      <p className="sub">Zincir üzerindeki köy defteri</p>

      <div className="card">
        <div className="label">Son mesaj</div>
        <div className="value">{lastMessage ?? "—"}</div>
      </div>

      <div className="card">
        <div className="label">Toplam mesaj</div>
        <div className="value">{messageCount?.toString() ?? "—"}</div>
      </div>

      <div className="card">
        {isConnected ? (
          <>
            <div className="label">Bağlı cüzdan</div>
            <span className="addr">{address}</span>
          </>
        ) : (
          <button onClick={() => connect({ connector: connectors[0] })}>
            Cüzdanı bağla
          </button>
        )}
      </div>

      <div className="card">
        <div className="label">Mesaj yaz</div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Deftere ne yazmak istersin?"
        />
        <button disabled={!canWrite || !isConnected || draft.length === 0}>
          Gönder
        </button>
        {!canWrite && (
          <p className="err">
            Bu buton henüz bağlı değil — Gün 4, ikinci oturumda birlikte bağlayacağız.
          </p>
        )}
      </div>
    </main>
  );
}
