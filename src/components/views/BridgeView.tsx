import React, { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Activity,
  Network,
  Globe2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import type { ChainId } from "../../types";
import { CHAINS, ASSETS } from "../../constants";
import { Section, Badge, ChainDot, Stat } from "../ui";
import { wait } from "../../utils";

interface BridgeViewProps {
  notify: (message: string, type?: "ok" | "err") => void;
}

export function BridgeView({ notify }: BridgeViewProps) {
  const [fromChain, setFromChain] = useState<ChainId>("konekt");
  const [toChain, setToChain] = useState<ChainId>("chain-a");
  const [asset, setAsset] = useState<string>("ICX");
  const [amount, setAmount] = useState<string>("100");
  const [busy, setBusy] = useState(false);

  const assetsOnFrom = useMemo(
    () => ASSETS.filter((a) => a.chainId === fromChain),
    [fromChain]
  );

  const submit = async () => {
    if (fromChain === toChain)
      return notify("Select two different chains", "err");
    setBusy(true);
    notify(`Locking ${amount} ${asset} on ${CHAINS[fromChain].name}…`);
    await wait(900);
    notify("Submitting BTP proof to KONEKT…");
    await wait(900);
    notify(`Releasing/minting on ${CHAINS[toChain].name}…`, "ok");
    await wait(600);
    setBusy(false);
  };

  const switchChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Section
        title="Bridge Transfer"
        icon={<ArrowLeftRight className="h-4 w-4" />}
        actions={
          <button
            onClick={switchChains}
            className="text-xs underline opacity-80"
          >
            Switch
          </button>
        }
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs opacity-70">From Chain</div>
            <select
              className="w-full rounded-xl border bg-white/5 p-2"
              value={fromChain}
              onChange={(e) => setFromChain(e.target.value as ChainId)}
            >
              {Object.keys(CHAINS).map((id) => (
                <option key={id} value={id}>
                  {CHAINS[id as ChainId].name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1 text-xs opacity-70">To Chain</div>
            <select
              className="w-full rounded-xl border bg-white/5 p-2"
              value={toChain}
              onChange={(e) => setToChain(e.target.value as ChainId)}
            >
              {Object.keys(CHAINS).map((id) => (
                <option key={id} value={id}>
                  {CHAINS[id as ChainId].name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1 text-xs opacity-70">Asset</div>
            <select
              className="w-full rounded-xl border bg-white/5 p-2"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            >
              {assetsOnFrom.map((a) => (
                <option key={a.symbol} value={a.symbol}>
                  {a.symbol} – {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1 text-xs opacity-70">Amount</div>
            <input
              className="w-full rounded-xl border bg-white/5 p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={busy}
            onClick={submit}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 disabled:opacity-50"
          >
            Start Transfer
          </button>
          <Badge>
            <ChainDot id={fromChain} />
            {CHAINS[fromChain].name}
          </Badge>
          <ChevronRight className="h-4 w-4 opacity-60" />
          <Badge>
            <ChainDot id={toChain} />
            {CHAINS[toChain].name}
          </Badge>
        </div>
      </Section>

      <Section title="Bridge Status" icon={<Activity className="h-4 w-4" />}>
        <div className="grid gap-3">
          <Stat
            label="Relayers"
            value="4 online"
            icon={<Network className="h-5 w-5" />}
          />
          <Stat
            label="24h Messages"
            value="1,284"
            icon={<Globe2 className="h-5 w-5" />}
          />
          <Stat
            label="Failures"
            value="0"
            icon={<ShieldCheck className="h-5 w-5" />}
          />
        </div>
      </Section>
    </div>
  );
}
