import React, { useState } from "react";
import { SwapHorizontal, Database } from "lucide-react";
import { ASSETS, CHAINS } from "../../constants";
import { Section, Badge } from "../ui";
import { wait } from "../../utils";

interface DexViewProps {
  notify: (message: string, type?: "ok" | "err") => void;
}

export function DexView({ notify }: DexViewProps) {
  const [from, setFrom] = useState("USDa");
  const [to, setTo] = useState("USDb");
  const [amt, setAmt] = useState("250");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (from === to) return notify("Choose two different assets", "err");
    setBusy(true);
    notify("Routing across KONEKT pools…");
    await wait(800);
    notify("Submitting swap to AMM…");
    await wait(800);
    notify("Swap settled • fees paid in ICX", "ok");
    setBusy(false);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Section
        title="Cross-chain Swap"
        icon={<SwapHorizontal className="h-4 w-4" />}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs opacity-70">From</div>
            <select
              className="w-full rounded-xl border bg-white/5 p-2"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {ASSETS.map((a) => (
                <option key={a.symbol} value={a.symbol}>
                  {a.symbol} ({CHAINS[a.chainId].name})
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1 text-xs opacity-70">To</div>
            <select
              className="w-full rounded-xl border bg-white/5 p-2"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {ASSETS.map((a) => (
                <option key={a.symbol} value={a.symbol}>
                  {a.symbol} ({CHAINS[a.chainId].name})
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1 text-xs opacity-70">Amount</div>
            <input
              className="w-full rounded-xl border bg-white/5 p-2"
              value={amt}
              onChange={(e) => setAmt(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              disabled={busy}
              onClick={submit}
              className="w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 disabled:opacity-50"
            >
              Swap
            </button>
          </div>
        </div>
        <div className="mt-3 text-xs opacity-70">
          Slippage protected • TWAP oracle • ICX used for gas
        </div>
      </Section>

      <Section title="Pools & TVL" icon={<Database className="h-4 w-4" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { pair: "USDa/USDb", tvl: "$4.2M", apr: "9.8%" },
            { pair: "ICX/USDb", tvl: "$1.1M", apr: "5.1%" },
            { pair: "GLDa/ICX", tvl: "$520k", apr: "12.4%" },
            { pair: "ENRb/ICX", tvl: "$310k", apr: "7.6%" },
          ].map((p) => (
            <div key={p.pair} className="rounded-xl border bg-white/5 p-4">
              <div className="text-sm font-semibold">{p.pair}</div>
              <div className="mt-1 text-xs opacity-70">
                TVL {p.tvl} • APR {p.apr}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
