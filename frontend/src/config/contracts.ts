import rlayTokenAbi from "@/abi/RlayToken.json";
import rlayClaimAbi from "@/abi/RlayClaim.json";

export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 84532);

/// Havuza deploy anında yatırılan slot sayısı (20.000.000 RLAY / 1.000.000 RLAY).
/// Kontrat başlangıç havuz büyüklüğünü saklamadığı için bu bir deploy sabiti;
/// "kalan + claim edilen" diye türetmek yanlış olur, çünkü havuz sonradan
/// beslenirse toplam şişer.
export const TOTAL_CLAIM_SLOTS = Number(process.env.NEXT_PUBLIC_TOTAL_CLAIM_SLOTS ?? 20);

export const RLAY_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_RLAY_TOKEN_ADDRESS as `0x${string}`;
export const RLAY_CLAIM_ADDRESS = process.env.NEXT_PUBLIC_RLAY_CLAIM_ADDRESS as `0x${string}`;

export const rlayToken = {
  address: RLAY_TOKEN_ADDRESS,
  abi: rlayTokenAbi,
} as const;

export const rlayClaim = {
  address: RLAY_CLAIM_ADDRESS,
  abi: rlayClaimAbi,
} as const;
