import {
  ArrowRightLeft,
  Network,
  Store,
  Globe2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Zap,
  Shield,
} from "lucide-react";
import type { TabType } from "../../types";
import { Section, Stat } from "../ui";

interface DashboardProps {
  onNavigate?: (tab: TabType) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-[600px] lg:h-full lg:max-h-[800px] grid gap-6 lg:grid-cols-3 lg:grid-rows-1">
      {/* Overview Section with Enhanced Stats */}
      <Section
        title="Performance Overview"
        icon={<TrendingUp className="h-4 w-4" />}
        className="h-full"
      >
        <div className="grid gap-4 sm:grid-cols-2 h-full content-start">
          <button 
            onClick={() => onNavigate?.("dex")}
            className="block w-full text-left transition-transform hover:scale-105"
          >
            <Stat
              label="24h Volume"
              value="$8.7M"
              icon={<ArrowRightLeft className="h-5 w-5" />}
              trend={{ value: "+12.3%", direction: "up" }}
              highlight={true}
            />
          </button>
          <button 
            onClick={() => onNavigate?.("bridge")}
            className="block w-full text-left transition-transform hover:scale-105"
          >
            <Stat
              label="Messages Relayed"
              value="12,904"
              icon={<Network className="h-5 w-5" />}
              trend={{ value: "+5.7%", direction: "up" }}
            />
          </button>
          <button 
            onClick={() => onNavigate?.("registry")}
            className="block w-full text-left transition-transform hover:scale-105"
          >
            <Stat
              label="Registered DApps"
              value="36"
              icon={<Store className="h-5 w-5" />}
              trend={{ value: "+2", direction: "up" }}
            />
          </button>
          <button 
            onClick={() => onNavigate?.("governance")}
            className="block w-full text-left transition-transform hover:scale-105"
          >
            <Stat
              label="Active Communities"
              value="7"
              icon={<Globe2 className="h-5 w-5" />}
              trend={{ value: "→", direction: "neutral" }}
            />
          </button>
        </div>
      </Section>

      {/* Quick Actions with Better Visual Hierarchy */}
      <Section
        title="Quick Actions"
        icon={<Zap className="h-4 w-4" />}
        className="h-full"
      >
        <div className="flex flex-col gap-3 h-full justify-start">
          <button 
            onClick={() => onNavigate?.("bridge")}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-blue-600/10 to-blue-500/5 p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-blue-400/30 flex-1 min-h-[70px]"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                <ArrowRightLeft className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white mb-1">
                  Cross-Chain Bridge
                </div>
                <div className="text-sm text-white/60">
                  Transfer assets across chains
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white/70 transition-colors" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </button>

          <button 
            onClick={() => onNavigate?.("dex")}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-purple-600/10 to-purple-500/5 p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-purple-400/30 flex-1 min-h-[70px]"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                <ArrowRightLeft className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white mb-1">Swap on DEX</div>
                <div className="text-sm text-white/60">
                  Cross-chain AMM settlement
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white/70 transition-colors" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </button>

          <button 
            onClick={() => onNavigate?.("governance")}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-emerald-600/10 to-emerald-500/5 p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-emerald-400/30 flex-1 min-h-[70px]"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white mb-1">
                  Vote on Governance
                </div>
                <div className="text-sm text-white/60">Stake & participate</div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white/70 transition-colors" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </button>

          <button 
            onClick={() => onNavigate?.("registry")}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-orange-600/10 to-orange-500/5 p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-orange-400/30 flex-1 min-h-[70px]"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-orange-500/20 text-orange-300">
                <Store className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white mb-1">
                  Explore DApp Store
                </div>
                <div className="text-sm text-white/60">Discover applications</div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white/70 transition-colors" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </button>
        </div>
      </Section>

      {/* Protocol Health with Status Indicators */}
      <Section
        title="Protocol Health"
        icon={<Shield className="h-4 w-4" />}
        className="h-full"
      >
        <div className="flex flex-col gap-4 h-full">
          <div className="group rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-5 transition-all duration-200 hover:shadow-lg flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-300">
                  Network Status
                </span>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">
                HEALTHY
              </span>
            </div>
            <div className="text-sm text-white/80">
              Finality: <span className="font-semibold text-white">~2.1s</span>{" "}
              • Uptime:{" "}
              <span className="font-semibold text-emerald-300">99.98%</span>
            </div>
          </div>

          <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm font-medium text-white/90">
                  Security
                </span>
              </div>
              <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                SECURE
              </span>
            </div>
            <div className="text-sm text-white/70">
              Circuit breakers:{" "}
              <span className="font-semibold text-green-400">
                none triggered
              </span>
            </div>
          </div>

          <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-sm font-medium text-white/90">
                  Capacity
                </span>
              </div>
              <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                NORMAL
              </span>
            </div>
            <div className="text-sm text-white/70">
              Caps:{" "}
              <span className="font-semibold text-white">per-asset 1.5M</span>{" "}
              (24h)
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
