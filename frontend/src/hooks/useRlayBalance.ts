"use client";

import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { rlayToken } from "@/config/contracts";

/// Bağlı cüzdanın RLAY bakiyesini okur. Cüzdan bağlı değilse sorgu hiç çalışmaz.
export function useRlayBalance() {
  const { address } = useAccount();

  const { data, isLoading, refetch } = useReadContract({
    ...rlayToken,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const balance = data as bigint | undefined;

  return {
    balance,
    formatted: balance !== undefined ? formatUnits(balance, 18) : undefined,
    isLoading,
    refetch,
  };
}
