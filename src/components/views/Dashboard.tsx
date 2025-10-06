import React, { useState } from "react";
import {
  ArrowRightLeft,
  Network,
  Store,
  Globe2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Shield,
} from "lucide-react";
import type { TabType } from "../../types";
import { Section, StatWithOverlay } from "../ui";

interface DashboardProps {
  onNavigate?: (tab: TabType) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardHover = (cardId: string, isHovered: boolean) => {
    setHoveredCard(isHovered ? cardId : null);
  };

  const handleCardClick = (cardId: string) => {
    setActiveCard(cardId);
  };
  return (
    <div className="space-y-6">
      {/* Top Stats Bar - Full Width */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-stretch">
        <StatWithOverlay
          label="24h Volume"
          value="$8.7M"
          icon={<ArrowRightLeft className="h-5 w-5" />}
          trend={{ value: "+12.3%", direction: "up" }}
          highlight={activeCard === "volume" || (activeCard === null && hoveredCard === null)}
          isActive={activeCard === "volume"}
          isHovered={hoveredCard !== null && hoveredCard !== "volume"}
          onHover={(isHovered) => handleCardHover("volume", isHovered)}
          onClick={() => handleCardClick("volume")}
          overlayContent={{
            title: "Trading Volume Details",
            details: [
              "7-day average: $6.2M",
              "Peak 24h: $12.1M",
              "Active pairs: 24",
              "Largest trade: $847K USDC/ETH"
            ]
          }}
        />
        <StatWithOverlay
          label="Messages Relayed"
          value="12,904"
          icon={<Network className="h-5 w-5" />}
          trend={{ value: "+5.7%", direction: "up" }}
          highlight={activeCard === "messages"}
          isActive={activeCard === "messages"}
          isHovered={hoveredCard !== null && hoveredCard !== "messages"}
          onHover={(isHovered) => handleCardHover("messages", isHovered)}
          onClick={() => handleCardClick("messages")}
          overlayContent={{
            title: "Cross-Chain Activity",
            details: [
              "Success rate: 99.8%",
              "Avg processing: 2.3s",
              "Active routes: 12",
              "Failed messages: 26"
            ]
          }}
        />
        <StatWithOverlay
          label="Registered DApps"
          value="36"
          icon={<Store className="h-5 w-5" />}
          trend={{ value: "+2", direction: "up" }}
          highlight={activeCard === "dapps"}
          isActive={activeCard === "dapps"}
          isHovered={hoveredCard !== null && hoveredCard !== "dapps"}
          onHover={(isHovered) => handleCardHover("dapps", isHovered)}
          onClick={() => handleCardClick("dapps")}
          overlayContent={{
            title: "DApp Registry Stats",
            details: [
              "Active this week: 28",
              "New registrations: 2",
              "Pending reviews: 3",
              "Top category: DeFi (15)"
            ]
          }}
        />
        <StatWithOverlay
          label="Active Communities"
          value="7"
          icon={<Globe2 className="h-5 w-5" />}
          trend={{ value: "→", direction: "neutral" }}
          highlight={activeCard === "communities"}
          isActive={activeCard === "communities"}
          isHovered={hoveredCard !== null && hoveredCard !== "communities"}
          onHover={(isHovered) => handleCardHover("communities", isHovered)}
          onClick={() => handleCardClick("communities")}
          overlayContent={{
            title: "Community Overview",
            details: [
              "Total members: 2,847",
              "Active voters: 1,203",
              "Open proposals: 4",
              "Governance tokens: 5.2M"
            ]
          }}
        />
        <StatWithOverlay
          label="Total Value Locked"
          value="$24.8M"
          icon={<Shield className="h-5 w-5" />}
          trend={{ value: "+18.4%", direction: "up" }}
          highlight={activeCard === "tvl"}
          isActive={activeCard === "tvl"}
          isHovered={hoveredCard !== null && hoveredCard !== "tvl"}
          onHover={(isHovered) => handleCardHover("tvl", isHovered)}
          onClick={() => handleCardClick("tvl")}
          overlayContent={{
            title: "TVL Breakdown",
            details: [
              "Bridge reserves: $18.2M",
              "Staking pools: $4.1M",
              "LP tokens: $2.5M",
              "All-time high: $31.2M"
            ]
          }}
        />
        <StatWithOverlay
          label="Staked Tokens"
          value="847K"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend={{ value: "+3.2%", direction: "up" }}
          highlight={activeCard === "staked"}
          isActive={activeCard === "staked"}
          isHovered={hoveredCard !== null && hoveredCard !== "staked"}
          onHover={(isHovered) => handleCardHover("staked", isHovered)}
          onClick={() => handleCardClick("staked")}
          overlayContent={{
            title: "Staking Details",
            details: [
              "APY: 12.4%",
              "Unique stakers: 1,847",
              "Avg stake size: 459 tokens",
              "Unstaking queue: 23K tokens"
            ]
          }}
        />
      </div>

      {/* Main Content Grid - Two Columns */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
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
                <div className="text-sm text-white/60">
                  Discover applications
                </div>
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
    </div>
  );
}
