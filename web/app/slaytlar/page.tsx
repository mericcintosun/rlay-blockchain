"use client";

import { useCallback, useEffect, useState } from "react";
import { ALL_SLIDES, type Slide } from "./slides";
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

  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

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
      <div className="deck-bar">
        <span className="deck-name">{current.deck.name}</span>
        <span className="deck-when">{current.deck.when}</span>
        <span className="deck-count">
          {index + 1} / {TOTAL}
        </span>
      </div>

      <div className="deck-stage">
        <SlideView slide={current.slide} />
      </div>

      {showNotes && (
        <div className="deck-note">
          <strong>Eğitmen notu:</strong> {note ?? "—"}
        </div>
      )}

      <div className="deck-controls">
        <button className="deck-btn" onClick={prev} disabled={index === 0}>
          ← Önceki
        </button>
        <span className="deck-hint">
          {unlocked ? "N: not · F: tam ekran" : "İlerlemek için kod gerekiyor"}
        </span>
        <button className="deck-btn primary" onClick={next} disabled={index === TOTAL - 1}>
          Sonraki →
        </button>
      </div>

      {gateOpen && (
        <div className="gate" role="dialog" aria-modal="true">
          <form className="gate-box" onSubmit={submitCode}>
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

function SlideView({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "kapak":
      return (
        <section className={`slide kapak${slide.theme === "dark" ? " dark" : ""}`}>
          <span className="kapak-label">{slide.label}</span>
          <h1 className="kapak-title">{slide.title}</h1>
          <p className="kapak-sub">{slide.subtitle}</p>
          <span className="dot dot-tl" />
          <span className="dot dot-br" />
        </section>
      );

    case "cumle":
      return (
        <section className="slide cumle">
          <p className="cumle-text">{slide.text}</p>
          <span className="dot dot-tl" />
          <span className="dot dot-br" />
        </section>
      );

    case "govde":
      return (
        <section className="slide govde">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="govde-body">
            {slide.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <span className="dot dot-soft" />
        </section>
      );

    case "kart":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="kart-grid">
            {slide.cards.map((card, i) => (
              <div className="kart" key={card.title}>
                <span className="kart-num">{i + 1}</span>
                <h3 className="kart-title">{card.title}</h3>
                <p className="kart-text">{card.text}</p>
              </div>
            ))}
          </div>
          <span className="dot dot-soft" />
        </section>
      );

    case "ikiSutun":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="sutun-grid">
            <div className="sutun light">
              <h3>{slide.left.title}</h3>
              <ul>
                {slide.left.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="sutun solid">
              <h3>{slide.right.title}</h3>
              <ul>
                {slide.right.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );

    case "adimlar":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="adim-row">
            {slide.steps.map((step, i) => (
              <div className={`adim${i % 2 === 0 ? " solid" : " light"}`} key={step}>
                <span className="adim-num">{i + 1}</span>
                <span className="adim-text">{step}</span>
              </div>
            ))}
          </div>
          <span className="dot dot-soft" />
        </section>
      );

    case "liste":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <ol className="liste">
            {slide.items.map((item, i) => (
              <li key={item}>
                <span className="liste-num">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <span className="dot dot-soft" />
        </section>
      );

    case "rakam":
      return (
        <section className="slide rakam">
          <div className="rakam-value">{slide.value}</div>
          <p className="rakam-text">{slide.text}</p>
          <span className="dot dot-soft" />
        </section>
      );

    case "kod":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="kod-grid">
            <pre className="kod-block">
              <code>{slide.code}</code>
            </pre>
            <ul className="kod-notes">
              {slide.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>
      );
  }
}
