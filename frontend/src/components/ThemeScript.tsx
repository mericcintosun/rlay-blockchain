import { THEME_STORAGE_KEY } from "@/config/theme";

// Sayfa boyanmadan ÖNCE çalışması gereken tek şey: kayıtlı tema seçimini
// <html data-theme> üzerine yazmak. React hydration'ı beklerse kullanıcı önce
// açık temayı görür, sonra koyuya atlar ("flash of wrong theme").
//
// Kayıtlı seçim yoksa hiçbir şey yazmayız - o durumda CSS'teki
// prefers-color-scheme medya sorgusu devreye girer.
//
// Anahtar @/config/theme'den geliyor, ThemeToggle'dan DEĞİL: client modülünden
// import edilse sunucuda undefined olurdu.
const script = `
(function () {
  try {
    var t = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  } catch (e) {}
})();
`;

export function ThemeScript() {
  // suppressHydrationWarning: bu script DOM'u React'ten önce değiştiriyor, bu kasıtlı.
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />;
}
