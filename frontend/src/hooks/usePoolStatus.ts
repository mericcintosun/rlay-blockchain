"use client";

import { useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { rlayClaim, TOTAL_CLAIM_SLOTS } from "@/config/contracts";

/// Havuzun herkese açık durumu: cüzdan bağlı olmasa da okunabilir, çünkü
/// bunlar zincirdeki public view fonksiyonları.
export function usePoolStatus() {
  const { data, isLoading } = useReadContracts({
    contracts: [
      { ...rlayClaim, functionName: "remainingPool" },
      { ...rlayClaim, functionName: "claimedCount" },
      { ...rlayClaim, functionName: "CLAIM_AMOUNT" },
      { ...rlayClaim, functionName: "claimDeadline" },
    ],
  });

  const remainingPool = data?.[0]?.result as bigint | undefined;
  const claimedCount = data?.[1]?.result as bigint | undefined;
  const claimAmount = data?.[2]?.result as bigint | undefined;
  const deadline = data?.[3]?.result as bigint | undefined;

  // Kalan slot = havuzdaki token / kişi başı miktar.
  const slotsLeft =
    remainingPool !== undefined && claimAmount !== undefined && claimAmount > 0n
      ? Number(remainingPool / claimAmount)
      : undefined;

  return {
    isLoading,
    // Havuz beslenip slotsLeft toplamı aşarsa bile gösterim tutarlı kalsın.
    slotsLeft: slotsLeft !== undefined ? Math.min(slotsLeft, TOTAL_CLAIM_SLOTS) : undefined,
    totalSlots: TOTAL_CLAIM_SLOTS,
    claimedCount: claimedCount !== undefined ? Number(claimedCount) : undefined,
    remainingPoolFormatted:
      remainingPool !== undefined ? formatTokenAmount(remainingPool) : undefined,
    claimAmountFormatted: claimAmount !== undefined ? formatTokenAmount(claimAmount) : undefined,
    deadline,
    daysLeft: deadline !== undefined ? daysUntil(deadline) : undefined,
  };
}

/// 1000000000000000000000000 -> "1.000.000" (Türkçe binlik ayırıcı, ondalık yok)
function formatTokenAmount(raw: bigint): string {
  const whole = formatUnits(raw, 18).split(".")[0];
  return new Intl.NumberFormat("tr-TR").format(BigInt(whole));
}

function daysUntil(unixSeconds: bigint): number {
  const secondsLeft = Number(unixSeconds) - Math.floor(Date.now() / 1000);
  return Math.max(0, Math.ceil(secondsLeft / 86_400));
}
