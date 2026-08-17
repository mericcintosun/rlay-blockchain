"use client";

import { useAccount, useChainId, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { rlayClaim } from "@/config/contracts";

export type ClaimStatus =
  | "wallet-disconnected"
  | "wrong-network"
  | "already-claimed"
  | "pool-exhausted"
  | "deadline-passed"
  | "paused"
  | "claimable"
  | "pending"
  | "success"
  | "rejected"
  | "error";

/// RlayClaim'in tüm ilgili durumunu tek yerde toplar: ClaimCard bunun dışında
/// başka hiçbir yerden okuma/yazma yapmaz - durum mantığı burada, gösterim orada.
export function useClaim() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isWrongNetwork = isConnected && chainId !== baseSepolia.id;

  const { data, refetch: refetchClaimState } = useReadContracts({
    contracts: [
      { ...rlayClaim, functionName: "hasClaimed", args: address ? [address] : undefined },
      { ...rlayClaim, functionName: "remainingPool" },
      { ...rlayClaim, functionName: "claimDeadline" },
      { ...rlayClaim, functionName: "paused" },
      { ...rlayClaim, functionName: "CLAIM_AMOUNT" },
    ],
    query: { enabled: Boolean(address) && !isWrongNetwork },
  });

  const hasClaimed = data?.[0]?.result as boolean | undefined;
  const remainingPool = data?.[1]?.result as bigint | undefined;
  const claimDeadline = data?.[2]?.result as bigint | undefined;
  const isPaused = data?.[3]?.result as boolean | undefined;
  const claimAmount = data?.[4]?.result as bigint | undefined;

  const isExpired = claimDeadline !== undefined && BigInt(Math.floor(Date.now() / 1000)) > claimDeadline;
  const isPoolExhausted =
    remainingPool !== undefined && claimAmount !== undefined && remainingPool < claimAmount;

  const {
    writeContract,
    data: txHash,
    isPending: isSigning,
    error: writeError,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  function claim() {
    writeContract({
      ...rlayClaim,
      functionName: "claim",
    });
  }

  const status: ClaimStatus = (() => {
    if (!isConnected) return "wallet-disconnected";
    if (isWrongNetwork) return "wrong-network";
    if (isConfirmed) return "success";
    if (isSigning || isConfirming) return "pending";
    if (writeError) return isUserRejection(writeError) ? "rejected" : "error";
    if (hasClaimed) return "already-claimed";
    if (isPaused) return "paused";
    if (isExpired) return "deadline-passed";
    if (isPoolExhausted) return "pool-exhausted";
    return "claimable";
  })();

  return {
    status,
    claim,
    reset,
    txHash,
    claimAmount,
    remainingPool,
    claimDeadline,
    refetchClaimState,
    writeError,
  };
}

function isUserRejection(error: Error): boolean {
  const message = error.message.toLowerCase();
  return message.includes("user rejected") || message.includes("rejected the request");
}
