/// Tema seçiminin localStorage anahtarı.
///
/// Bu sabit bilerek "use client" TAŞIMAYAN ayrı bir modülde duruyor: bir server
/// component, client modülünden component olmayan bir export'u import ederse
/// Next.js modülü client-reference proxy'siyle değiştirir ve değer sunucuda
/// undefined olur. ThemeScript (server) ile ThemeToggle (client) bu anahtarı
/// paylaştığı için sabit nötr bir yerde olmak zorunda.
export const THEME_STORAGE_KEY = "rlayhub-theme";

export type Theme = "light" | "dark";
