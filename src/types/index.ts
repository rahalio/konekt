export type ChainId = "konekt" | "chain-a" | "chain-b";

export type Asset = {
  symbol: string;
  name: string;
  chainId: ChainId;
  decimals: number;
};

export type Swap = {
  id: string;
  user: string;
  src: string;
  dst: string;
  amount: number;
  status: "pending" | "settled" | "failed";
};

export type Proposal = {
  id: string;
  title: string;
  details: string;
  endsAt: string;
  forVotes: number;
  againstVotes: number;
  status: "active" | "passed" | "rejected";
};

export type DApp = {
  id: string;
  name: string;
  owner: string;
  cid: string;
  tags: string[];
};

export type TabType =
  | "dashboard"
  | "bridge"
  | "dex"
  | "governance"
  | "registry";

export type ToastType = {
  id: string;
  msg: string;
  type?: "ok" | "err";
};
