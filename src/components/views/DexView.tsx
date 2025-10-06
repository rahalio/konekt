import { useState } from "react";
import {
  ArrowLeftRight,
  RefreshCw,
  Zap,
  TrendingUp,
  BarChart3,
  ChevronRight,
  ArrowUpDown,
  Percent,
  DollarSign,
} from "lucide-react";
import { ASSETS, CHAINS } from "../../constants";
import { Section, Stat } from "../ui";
import { wait } from "../../utils";

interface DexViewProps {
  notify: (message: string, type?: "ok" | "err") => void;
}

export function DexView({ notify }: DexViewProps) {
  const [from, setFrom] = useState("ICX");
  const [to, setTo] = useState("USDa");
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

  const swapAssets = () => {
    setFrom(to);
    setTo(from);
  };

  // Get asset info for display
  const fromAsset = ASSETS.find((a) => a.symbol === from);
  const toAsset = ASSETS.find((a) => a.symbol === to);

  return (
    <div className="min-h-[600px] max-h-[800px] grid gap-6 md:grid-cols-2">
      <Section
        title="Cross-chain Swap"
        icon={<ArrowLeftRight className="h-4 w-4" />}
        className="h-auto"
      >
        <div className="flex flex-col gap-6">
          {/* Asset Selection */}
          <div className="space-y-4">
            {/* From Asset */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/80 uppercase tracking-wider">
                From
              </label>
              <div className="relative">
                <select
                  className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 text-sm font-medium text-white appearance-none cursor-pointer hover:bg-white/15 focus:bg-white/15 focus:border-purple-400/50 focus:outline-none transition-all"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                >
                  {ASSETS.map((a) => (
                    <option
                      key={a.symbol}
                      value={a.symbol}
                      className="bg-gray-800 text-white"
                    >
                      {a.symbol} ({CHAINS[a.chainId].name})
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-4 h-4 w-4 text-white/60 rotate-90 pointer-events-none" />
              </div>
              {fromAsset && (
                <div className="text-xs text-white/60 px-1">
                  {fromAsset.name} • {CHAINS[fromAsset.chainId].name}
                </div>
              )}
            </div>

            {/* Swap Direction Button */}
            <div className="flex justify-center">
              <button
                onClick={swapAssets}
                className="group p-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-purple-400/50 transition-all duration-200"
              >
                <ArrowUpDown className="h-4 w-4 text-white/70 group-hover:text-purple-300 group-hover:rotate-180 transition-all duration-300" />
              </button>
            </div>

            {/* To Asset */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/80 uppercase tracking-wider">
                To
              </label>
              <div className="relative">
                <select
                  className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 text-sm font-medium text-white appearance-none cursor-pointer hover:bg-white/15 focus:bg-white/15 focus:border-purple-400/50 focus:outline-none transition-all"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                >
                  {ASSETS.map((a) => (
                    <option
                      key={a.symbol}
                      value={a.symbol}
                      className="bg-gray-800 text-white"
                    >
                      {a.symbol} ({CHAINS[a.chainId].name})
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-4 h-4 w-4 text-white/60 rotate-90 pointer-events-none" />
              </div>
              {toAsset && (
                <div className="text-xs text-white/60 px-1">
                  {toAsset.name} • {CHAINS[toAsset.chainId].name}
                </div>
              )}
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/80 uppercase tracking-wider">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 text-lg font-semibold text-white placeholder-white/50 hover:bg-white/15 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none transition-all"
                  placeholder="0.0"
                  value={amt}
                  onChange={(e) => setAmt(e.target.value)}
                />
                <div className="absolute right-3 top-4 text-sm font-medium text-white/70">
                  {from}
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/60 px-1">
                <span>Balance: 1,247.82 {from}</span>
                <span>~$312.45</span>
              </div>
            </div>
          </div>

          {/* Swap Details */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Expected Output</span>
              <span className="font-medium text-white">~847.23 {to}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Price Impact</span>
              <span className="font-medium text-emerald-400">0.12%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Network Fee</span>
              <span className="font-medium text-white/80">~0.05 ICX</span>
            </div>
          </div>

          {/* Swap Button */}
          <div className="mt-auto space-y-3">
            <button
              disabled={busy || !amt || from === to}
              onClick={submit}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-sm font-semibold text-white transition-all duration-200 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative flex items-center justify-center gap-2">
                {busy ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Processing Swap...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Swap Tokens
                  </>
                )}
              </div>
              {!busy && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>

            <div className="text-xs text-white/60 text-center space-y-1">
              <div>Slippage protected • TWAP oracle • ICX used for gas</div>
              <div>Cross-chain routing via KONEKT protocol</div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Pools & TVL"
        icon={<BarChart3 className="h-4 w-4" />}
        className="h-auto"
      >
        <div className="flex flex-col gap-4">
          {/* Top Pools Stats */}
          <div className="grid gap-3 md:grid-cols-2">
            <Stat
              label="Total TVL"
              value="$6.8M"
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: "+15.2%", direction: "up" }}
              highlight={true}
            />
            <Stat
              label="24h Volume"
              value="$847K"
              icon={<TrendingUp className="h-5 w-5" />}
              trend={{ value: "+8.7%", direction: "up" }}
            />
          </div>

          {/* Pool Cards */}
          <div className="space-y-3">
            <div className="text-xs font-medium text-white/80 uppercase tracking-wider mb-2">
              Active Pools
            </div>
            {[
              {
                pair: "USDa/USDb",
                tvl: "$4.2M",
                apr: "9.8%",
                volume24h: "$312K",
                trend: "up",
              },
              {
                pair: "ICX/USDb",
                tvl: "$1.1M",
                apr: "5.1%",
                volume24h: "$187K",
                trend: "up",
              },
              {
                pair: "GLDa/ICX",
                tvl: "$520k",
                apr: "12.4%",
                volume24h: "$95K",
                trend: "up",
              },
              {
                pair: "ENRb/ICX",
                tvl: "$310k",
                apr: "7.6%",
                volume24h: "$52K",
                trend: "neutral",
              },
            ].map((p, index) => (
              <div
                key={p.pair}
                className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer ${
                  index === 0
                    ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 hover:border-emerald-400/40"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-sm font-semibold ${
                        index === 0 ? "text-emerald-300" : "text-white"
                      }`}
                    >
                      {p.pair}
                    </div>
                    {index === 0 && (
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                        TOP
                      </span>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      p.trend === "up" ? "text-emerald-400" : "text-white/60"
                    }`}
                  >
                    {p.trend === "up" && "↗"}
                    {p.trend === "neutral" && "→"}
                    APR {p.apr}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-white/60 mb-1">TVL</div>
                    <div
                      className={`font-semibold ${
                        index === 0 ? "text-emerald-300" : "text-white"
                      }`}
                    >
                      {p.tvl}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">24h Volume</div>
                    <div className="font-semibold text-white/90">
                      {p.volume24h}
                    </div>
                  </div>
                </div>

                {/* Liquidity Bar */}
                <div className="mt-3">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        index === 0
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                          : "bg-gradient-to-r from-blue-400 to-purple-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (parseFloat(p.tvl.replace(/[$MK]/g, "")) / 5) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {index === 0 && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                )}
              </div>
            ))}
          </div>

          {/* Pool Actions */}
          <div className="mt-6 space-y-2">
            <button className="w-full p-3 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200">
              <div className="flex items-center justify-center gap-2">
                <Percent className="h-4 w-4" />
                Add Liquidity
              </div>
            </button>
            <div className="text-xs text-white/60 text-center">
              Earn fees by providing liquidity to pools
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
