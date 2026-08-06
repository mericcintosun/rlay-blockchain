import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// STUDENTS: replace this with your own deployed contract address.
export const DEFTER_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

// Only the functions the page actually uses.
export const DEFTER_ABI = [
  {
    type: "function",
    name: "lastMessage",
    inputs: [],
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "messageCount",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "write",
    inputs: [{ name: "message", type: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(),
  },
});
