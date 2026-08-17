"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/config/theme";

/// Açık/koyu tema anahtarı. Navbar'da, cüzdan butonunun yanında duruyor.
/// Seçim localStorage'a yazılır; hiç seçim yapılmadıysa sistem tercihi geçerlidir.
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // İlk render'da gerçek temayı okuyoruz. Sunucuda localStorage/matchMedia yok,
  // bu yüzden state başlangıçta null - aksi halde hydration uyuşmazlığı olur.
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      // ThemeScript bunu boyamadan önce zaten yazdı; burada tekrar yazmak
      // script engellenmişse (CSP, eski tarayıcı) yedek görevi görür.
      document.documentElement.dataset.theme = stored;
      return;
    }

    // Kayıtlı seçim yok: sistem tercihini takip et. data-theme YAZILMAZ, böylece
    // CSS'teki prefers-color-scheme dalı geçerli kalır ve kullanıcı sistem
    // temasını değiştirdiğinde sayfa da değişir.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(media.matches ? "dark" : "light");

    const onChange = (event: MediaQueryListEvent) => setTheme(event.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  const isDark = theme === "dark";
  const label = isDark ? "Açık temaya geç" : "Koyu temaya geç";

  return (
    <button
      type="button"
      className="btn-icon"
      onClick={toggle}
      aria-label={label}
      title={label}
      // Tema okunana kadar ikon seçilemez; buton yerini korur ama boş görünmesin diye
      // ikonu yalnızca tema belliyken çiziyoruz.
      aria-pressed={isDark}
    >
      {theme === null ? null : isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M18.9 5.1l-1.7 1.7M6.8 17.2l-1.7 1.7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1Z" />
    </svg>
  );
}
