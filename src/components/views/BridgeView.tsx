import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Network,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Zap,
  CheckCircle2,
  TrendingUp,
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
    <div className="h-full min-h-[600px] max-h-[800px] grid gap-6 md:grid-cols-2 md:grid-rows-1">
      <Section
        title="Bridge Transfer"
        icon={<ArrowLeftRight className="h-4 w-4" />}
        className="h-full"
        actions={
          <button
            onClick={switchChains}
            className="group flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RefreshCw className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
            Switch
          </button>
        }
      >
        <div className="flex flex-col gap-6 h-full">
          {/* Chain Selection */}
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  From Chain
                </label>
                <div className="relative">
                  <select
                    className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 text-sm font-medium text-white appearance-none cursor-pointer hover:bg-white/15 focus:bg-white/15 focus:border-blue-400/50 focus:outline-none transition-all"
                    value={fromChain}
                    onChange={(e) => setFromChain(e.target.value as ChainId)}
                  >
                    {Object.keys(CHAINS).map((id) => (
                      <option
                        key={id}
                        value={id}
                        className="bg-gray-800 text-white"
                      >
                        {CHAINS[id as ChainId].name}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-3 h-4 w-4 text-white/60 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  To Chain
                </label>
                <div className="relative">
                  <select
                    className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 text-sm font-medium text-white appearance-none cursor-pointer hover:bg-white/15 focus:bg-white/15 focus:border-blue-400/50 focus:outline-none transition-all"
                    value={toChain}
                    onChange={(e) => setToChain(e.target.value as ChainId)}
                  >
                    {Object.keys(CHAINS).map((id) => (
                      <option
                        key={id}
                        value={id}
                        className="bg-gray-800 text-white"
                      >
                        {CHAINS[id as ChainId].name}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-3 h-4 w-4 text-white/60 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Asset and Amount */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  Asset
                </label>
                <div className="relative">
                  <select
                    className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 text-sm font-medium text-white appearance-none cursor-pointer hover:bg-white/15 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none transition-all"
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                  >
                    {assetsOnFrom.map((a) => (
                      <option
                        key={a.symbol}
                        value={a.symbol}
                        className="bg-gray-800 text-white"
                      >
                        {a.symbol} – {a.name}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-3 h-4 w-4 text-white/60 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  Amount
                </label>
                <input
                  type="number"
                  className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 text-sm font-medium text-white placeholder-white/50 hover:bg-white/15 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none transition-all"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Transfer Action */}
          <div className="mt-auto space-y-4">
            {/* Route Visualization */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <ChainDot id={fromChain} />
                {CHAINS[fromChain].name}
              </Badge>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
                <ArrowLeftRight className="h-4 w-4 text-emerald-400" />
                <div className="w-6 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400"></div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                <ChainDot id={toChain} />
                {CHAINS[toChain].name}
              </Badge>
            </div>

            {/* Transfer Button */}
            <button
              disabled={busy || !amount || fromChain === toChain}
              onClick={submit}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 p-4 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative flex items-center justify-center gap-2">
                {busy ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Processing Transfer...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Start Bridge Transfer
                  </>
                )}
              </div>
              {!busy && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>

            {/* Transfer Info */}
            <div className="text-xs text-white/60 text-center space-y-1">
              <div>Estimated time: ~2-3 minutes</div>
              <div>Bridge fee: 0.1% + network gas</div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Bridge Status"
        icon={<TrendingUp className="h-4 w-4" />}
        className="h-full"
      >
        <div className="flex flex-col gap-4 h-full">
          {/* Real-time Status */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-300">
                  Bridge Online
                </span>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">
                ACTIVE
              </span>
            </div>
            <div className="text-xs text-white/70">
              All relayers operational • Network latency:{" "}
              <span className="text-emerald-400 font-medium">~180ms</span>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="space-y-3 flex-1">
            <Stat
              label="Relayers Online"
              value="4"
              icon={<Network className="h-5 w-5" />}
              trend={{ value: "100%", direction: "up" }}
              highlight={true}
            />
            <Stat
              label="24h Messages"
              value="1,284"
              icon={<CheckCircle2 className="h-5 w-5" />}
              trend={{ value: "+8.3%", direction: "up" }}
            />
            <Stat
              label="Failed Transfers"
              value="0"
              icon={<ShieldCheck className="h-5 w-5" />}
              trend={{ value: "0%", direction: "neutral" }}
            />
          </div>

          {/* Recent Activity */}
          <div className="mt-auto">
            <div className="text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">
              Recent Activity
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Bridge transfer completed (2 mins ago)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>Message relayed to Chain A (5 mins ago)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <span>Relayer sync completed (8 mins ago)</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
