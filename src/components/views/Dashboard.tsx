import { ReactNode } from "react";
import {
  Activity,
  ArrowRightLeft,
  Network,
  Store,
  Globe2,
  ChevronRight,
  ShieldCheck,
  ArrowLeftRight,
} from "lucide-react";
import { Section, Stat } from "../ui";

export function Dashboard() {
  return (
    <div className="h-full grid gap-6 grid-cols-1 md:grid-cols-3 auto-rows-fr">
      <Section title="Overview" icon={<Activity className="h-4 w-4" />}>
        <div className="grid gap-3 md:grid-cols-2 h-full">
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
      >
        <div className="grid gap-3 h-full content-start">
          <QuickAction
            title="Bridge assets"
            desc="Move value between chains"
            icon={<ArrowLeftRight className="h-4 w-4" />}
          />
          <QuickAction
            title="Swap on DEX"
            desc="Cross-chain AMM settlement"
            icon={<ArrowRightLeft className="h-4 w-4" />}
          />
          <QuickAction
            title="Vote on Governance"
            desc="Stake & participate"
            icon={<ShieldCheck className="h-4 w-4" />}
          />
        </div>
      </Section>
      <Section
        title="Protocol Health"
        icon={<ShieldCheck className="h-4 w-4" />}
      >
        <div className="grid gap-4 h-full content-start">
          <div className="rounded-xl border bg-white/5 p-4 text-sm">
            Finality: ~2.1s • Uptime 99.98%
          </div>
          <div className="rounded-xl border bg-white/5 p-4 text-sm">
            Circuit breakers: none triggered
          </div>
          <div className="rounded-xl border bg-white/5 p-4 text-sm">
            Caps: per-asset 1.5M (24h)
          </div>
        </div>
      </Section>

      {/* Second Row */}
      <Section title="Network Status" icon={<Network className="h-4 w-4" />}>
        <div className="grid gap-4 h-full content-start">
          <Stat
            label="Active Validators"
            value="36"
            icon={<ShieldCheck className="h-5 w-5" />}
          />
          <Stat
            label="Network Uptime"
            value="99.98%"
            icon={<Activity className="h-5 w-5" />}
          />
        </div>
      </Section>

      <Section
        title="Cross-chain Activity"
        icon={<ArrowLeftRight className="h-4 w-4" />}
      >
        <div className="grid gap-3 h-full content-start">
          <div className="rounded-xl border bg-white/5 p-4 text-sm">
            <div className="font-semibold">Latest Bridge Transfer</div>
            <div className="text-xs opacity-70 mt-1">
              100 ICX → Chain A (2 min ago)
            </div>
          </div>
          <div className="rounded-xl border bg-white/5 p-4 text-sm">
            <div className="font-semibold">Recent Swap</div>
            <div className="text-xs opacity-70 mt-1">
              USDa → USDb (5 min ago)
            </div>
          </div>
          <div className="rounded-xl border bg-white/5 p-4 text-sm">
            <div className="font-semibold">New DApp Registered</div>
            <div className="text-xs opacity-70 mt-1">
              Yield Farm v2 (1 hour ago)
            </div>
          </div>
        </div>
      </Section>

      <Section title="Market Overview" icon={<Store className="h-4 w-4" />}>
        <div className="grid gap-4 h-full content-start">
          <Stat
            label="ICX Price"
            value="$0.42"
            icon={<ArrowRightLeft className="h-5 w-5" />}
          />
          <Stat
            label="Market Cap"
            value="$420M"
            icon={<Globe2 className="h-5 w-5" />}
          />
        </div>
      </Section>
    </div>
  );
}

interface QuickActionProps {
  title: string;
  desc: string;
  icon: ReactNode;
}

function QuickAction({ title, desc, icon }: QuickActionProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white/5 p-3">
      <div className="opacity-70">{icon}</div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs opacity-70">{desc}</div>
      </div>
    </div>
  );
}
