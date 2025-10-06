import {
  Activity,
  ArrowRightLeft,
  Network,
  Store,
  Globe2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Section, Stat } from "../ui";

export function Dashboard() {
  return (
    <div className="h-full grid gap-4 md:grid-cols-3 md:grid-rows-1">
      <Section
        title="Overview"
        icon={<Activity className="h-4 w-4" />}
        className="h-full"
      >
        <div className="grid gap-3 md:grid-cols-2 h-full content-start">
          <Stat
            label="24h Volume"
            value="$8.7M"
            icon={<ArrowRightLeft className="h-5 w-5" />}
          />
          <Stat
            label="Messages Relayed"
            value="12,904"
            icon={<Network className="h-5 w-5" />}
          />
          <Stat
            label="Registered DApps"
            value="36"
            icon={<Store className="h-5 w-5" />}
          />
          <Stat
            label="Active Communities"
            value="7"
            icon={<Globe2 className="h-5 w-5" />}
          />
        </div>
      </Section>
      <Section
        title="Quick Actions"
        icon={<ChevronRight className="h-4 w-4" />}
        className="h-full"
      >
        <div className="flex flex-col gap-2 h-full justify-start">
          <button className="flex items-center gap-3 rounded-lg border bg-white/5 p-4 text-left text-sm hover:bg-white/10 transition-colors flex-1 min-h-[60px]">
            <ArrowRightLeft className="h-5 w-5" />
            <div>
              <div className="font-medium">Cross-Chain Bridge</div>
              <div className="text-gray-400">Transfer assets across chains</div>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-lg border bg-white/5 p-4 text-left text-sm hover:bg-white/10 transition-colors flex-1 min-h-[60px]">
            <ArrowRightLeft className="h-4 w-4" />
            <div>
              <div className="font-medium">Swap on DEX</div>
              <div className="text-gray-400">Cross-chain AMM settlement</div>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-lg border bg-white/5 p-4 text-left text-sm hover:bg-white/10 transition-colors flex-1 min-h-[60px]">
            <ShieldCheck className="h-4 w-4" />
            <div>
              <div className="font-medium">Vote on Governance</div>
              <div className="text-gray-400">Stake & participate</div>
            </div>
          </button>
        </div>
      </Section>
      <Section
        title="Protocol Health"
        icon={<ShieldCheck className="h-4 w-4" />}
        className="h-full"
      >
        <div className="flex flex-col gap-3 h-full">
          <div className="rounded-xl border bg-white/5 p-4 text-sm flex-1 flex items-center">
            Finality: ~2.1s • Uptime 99.98%
          </div>
          <div className="rounded-xl border bg-white/5 p-4 text-sm flex-1 flex items-center">
            Circuit breakers: none triggered
          </div>
          <div className="rounded-xl border bg-white/5 p-4 text-sm flex-1 flex items-center">
            Caps: per-asset 1.5M (24h)
          </div>
        </div>
      </Section>
    </div>
  );
}
