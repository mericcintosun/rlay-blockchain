"use client";

import { usePoolStatus } from "@/hooks/usePoolStatus";

/// Havuzun canlı durumu. Cüzdan bağlı olmasa bile görünür - ziyaretçi siteye
/// girdiği anda "kaç kişilik yer kaldı" sorusunun cevabını görmeli.
export function PoolStatus() {
  const { isLoading, slotsLeft, totalSlots, remainingPoolFormatted, daysLeft } = usePoolStatus();

  const filled =
    slotsLeft !== undefined && totalSlots > 0 ? ((totalSlots - slotsLeft) / totalSlots) * 100 : 0;

  return (
    <div className="card">
      {/* Mobilde alt alta, geniş ekranda iki uçta. Dar ekranda yan yana zorlamak
          monospace sayıları taşırıyor. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="min-w-0">
          <div className="label">Havuzda kalan</div>
          <div className="value mt-1">
            {isLoading ? "…" : `${remainingPoolFormatted ?? "0"} RLAY`}
          </div>
        </div>
        <div className="min-w-0 sm:text-right">
          <div className="label">Boş kontenjan</div>
          <div className="value mt-1">
            {isLoading || slotsLeft === undefined ? "…" : `${slotsLeft} / ${totalSlots}`}
          </div>
        </div>
      </div>

      {/* Doluluk çubuğu. Sadece renkle değil, yanındaki sayılarla da ifade ediliyor. */}
      <div
        className="mt-5 h-2 w-full overflow-hidden rounded-full bg-tint"
        role="progressbar"
        aria-valuenow={Math.round(filled)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Havuz doluluk oranı"
      >
        <div
          className="h-full rounded-full bg-purple transition-[width] duration-500"
          style={{ width: `${filled}%` }}
        />
      </div>

      {daysLeft !== undefined && (
        <p className="mt-4 text-sm text-muted">
          {daysLeft > 0
            ? `Claim penceresi ${daysLeft} gün sonra kapanıyor.`
            : "Claim penceresi kapandı."}
        </p>
      )}
    </div>
  );
}
