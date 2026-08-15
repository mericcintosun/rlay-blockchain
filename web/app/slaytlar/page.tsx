"use client";

import { useCallback, useEffect, useState } from "react";
import { RlayHubLogo } from "../RlayHubLogo";
import { SlideView } from "./SlideView";
import { ALL_SLIDES } from "./slides";
import "./slides.css";

const TOTAL = ALL_SLIDES.length;

export default function Slaytlar() {
  const [index, setIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [gateOpen, setGateOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Presentation mode: hide the site chrome while this route is mounted.
  useEffect(() => {
    document.documentElement.classList.add("slides-mode");
    return () => document.documentElement.classList.remove("slides-mode");
  }, []);

  // A previous unlock in this browser is remembered by an httpOnly cookie.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/slaytlar/unlock")
      .then((r) => r.json())
      .then((data: { unlocked?: boolean; configured?: boolean }) => {
        if (cancelled) return;
        setUnlocked(Boolean(data.unlocked));
        setConfigured(data.configured !== false);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const next = useCallback(() => {
    if (!unlocked) {
      setGateOpen(true);
      return;
    }
    setIndex((i) => Math.min(i + 1, TOTAL - 1));
  }, [unlocked]);

  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  async function submitCode(event: React.FormEvent) {
    event.preventDefault();
    setChecking(true);
    setError("");
    try {
      const res = await fetch("/api/slaytlar/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (data.ok) {
        setUnlocked(true);
        setGateOpen(false);
        setCode("");
        setIndex((i) => Math.min(i + 1, TOTAL - 1));
      } else {
        setError(data.error ?? "Kod yanlış.");
        setCode("");
      }
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (gateOpen && event.key !== "Escape") return;
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        prev();
      } else if (event.key === "Escape") {
        setGateOpen(false);
      } else if (event.key === "n" || event.key === "N") {
        setShowNotes((v) => !v);
      } else if (event.key === "f" || event.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen().catch(() => undefined);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, gateOpen]);

  const current = ALL_SLIDES[index];
  const note = "note" in current.slide ? current.slide.note : undefined;

  return (
    <div className="deck">
      <div className="deck-progress">
        <span style={{ width: `${((index + 1) / TOTAL) * 100}%` }} />
      </div>

      <div className="deck-stage">
        <div className="slide-frame">
          <SlideView key={index} slide={current.slide} />
        </div>
      </div>

      <div className="deck-meta">
        <b>{current.deck.name}</b>
        <span>
          {index + 1} / {TOTAL}
        </span>
      </div>

      {showNotes && (
        <div className="deck-note">
          <b>Eğitmen notu ·</b> {note ?? "bu slayt için not yok"}
        </div>
      )}

      <div className="deck-chrome">
        <button className="deck-btn" onClick={prev} disabled={index === 0}>
          ← Önceki
        </button>
        <span className="deck-hint">
          {unlocked ? "N: eğitmen notu · F: tam ekran" : "İlerlemek için kod gerekiyor"}
        </span>
        <button className="deck-btn primary" onClick={next} disabled={index === TOTAL - 1}>
          Sonraki →
        </button>
      </div>

      {gateOpen && (
        <div className="gate" role="dialog" aria-modal="true">
          <form className="gate-box" onSubmit={submitCode}>
            <RlayHubLogo className="gate-logo" />
            <div className="gate-title">Sonraki slayt için kod</div>
            <p className="gate-sub">
              {configured
                ? "Kodu bir kere gir, sunum boyunca açık kalır."
                : "Sunucuda SLIDE_PASSCODE tanımlı değil. Slaytlar açılamaz."}
            </p>
            <input
              className="gate-input"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              inputMode="numeric"
              autoComplete="off"
              autoFocus
              placeholder="••••"
              disabled={!configured || checking}
            />
            {error && <p className="gate-err">{error}</p>}
            <div className="gate-actions">
              <button
                type="button"
                className="deck-btn"
                onClick={() => {
                  setGateOpen(false);
                  setError("");
                }}
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="deck-btn primary"
                disabled={!configured || checking || code.length !== 4}
              >
                {checking ? "Kontrol ediliyor..." : "Aç"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
