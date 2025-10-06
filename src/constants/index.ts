import type { ChainId, Asset, DApp } from "../types";

export const CHAINS: Record<ChainId, { name: string; color: string }> = {
  konekt: { name: "KONEKT", color: "#42e2b8" },
  "chain-a": { name: "Blockchain A", color: "#60a5fa" },
  "chain-b": { name: "Blockchain B", color: "#f472b6" },
};

export const ASSETS: Asset[] = [
  { symbol: "ICX", name: "ICON", chainId: "konekt", decimals: 18 },
  { symbol: "USDa", name: "USD (A)", chainId: "chain-a", decimals: 6 },
  { symbol: "GLDa", name: "Gold Token (A)", chainId: "chain-a", decimals: 8 },
  { symbol: "USDb", name: "USD (B)", chainId: "chain-b", decimals: 6 },
  {
    symbol: "ENRb",
    name: "Energy Credit (B)",
    chainId: "chain-b",
    decimals: 8,
  },
];

export const DAPPS: DApp[] = [
  {
    id: "dex",
    name: "KONEKT DEX",
    owner: "0xD3F...123",
    cid: "bafy...dex",
    tags: ["swap", "amm", "icx"],
  },
  {
    id: "bridge",
    name: "BTP Bridge",
    owner: "0xA11...ce5",
    cid: "bafy...btp",
    tags: ["btp", "bridge"],
  },
  {
    id: "vaults",
    name: "Yield Vaults",
    owner: "0xFEE...bee",
    cid: "bafy...yld",
    tags: ["yield", "lp"],
  },
];

export const MOCK_ADDRESS = "hx9c2e...e91";
