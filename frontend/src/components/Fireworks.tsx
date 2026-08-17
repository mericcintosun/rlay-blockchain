"use client";

import { useEffect, useRef } from "react";

/// Claim başarılı olduğunda bir kereliğine patlayan havai fişek animasyonu.
/// Harici kütüphane yok - tek bir canvas ve requestAnimationFrame yeterli.
/// Süre dolunca kendini durdurur; sayfanın üstünde ama tıklamaları engellemez.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

// Marka moru merkezde, yanına ona yakışan birkaç ton.
const COLORS = ["#5a0fbe", "#bb92f7", "#8b4ef0", "#ffd166", "#ff7ab6", "#4ecdc4"];

const DURATION_MS = 5200;
const GRAVITY = 0.075;
// Sürtünme 1'e ne kadar yakınsa parçacıklar o kadar uzağa gider. 0.985 çok erken
// frenliyordu ve patlama sıkışık bir halka gibi duruyordu.
const DRAG = 0.972;

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Hareket azaltma tercihi olan kullanıcıya animasyon gösterme.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];

    /// Tek bir patlama: merkezden her yöne saçılan parçacıklar.
    function burst(x: number, y: number) {
      const count = 78 + Math.floor(Math.random() * 42);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const power = 7.5 + Math.random() * 5.5;

      for (let i = 0; i < count; i++) {
        // Açıyı eşit bölüp hafif rastgelelik katıyoruz - tam simetri yapay duruyor.
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.22;
        // Karekök dağılımı: parçacıklar halka yerine dolu bir küre gibi yayılır.
        const speed = power * Math.sqrt(Math.random()) * (0.55 + Math.random() * 0.6);
        const maxLife = 75 + Math.random() * 55;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          // Parçacıkların çoğu patlamanın rengini alır, azı başka renk - daha canlı görünüyor.
          color: Math.random() < 0.75 ? color : COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2.1 + Math.random() * 2.6,
        });
      }
    }

    const startedAt = performance.now();
    let nextBurstAt = 0;
    let frame = 0;

    function tick(now: number) {
      if (!ctx) return;
      const elapsed = now - startedAt;

      // İlk patlama hemen, sonrakiler aralıklı; sürenin ilk yarısından sonra sönümlenme.
      if (elapsed < DURATION_MS * 0.6 && now >= nextBurstAt) {
        burst(width * (0.16 + Math.random() * 0.68), height * (0.14 + Math.random() * 0.44));
        nextBurstAt = now + 190 + Math.random() * 260;
      }

      ctx.clearRect(0, 0, width, height);

      // Parçacıklar üst üste geldiğinde sönük değil parlak olsun.
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= DRAG;
        p.vy = p.vy * DRAG + GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const fade = Math.max(0, p.life / p.maxLife);
        ctx.globalAlpha = fade;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.4 + fade * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // Süre dolduysa ve ekranda parçacık kalmadıysa dur.
      if (elapsed > DURATION_MS && particles.length === 0) return;
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
