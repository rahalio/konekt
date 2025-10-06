import { useState } from "react";
import {
  ArrowLeftRight,
  Settings,
  Store,
  Wallet,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { TabType } from "../types";
import { MOCK_ADDRESS } from "../constants";
import { useToasts } from "../hooks/useToasts";
import { Badge, Pill, ChainDot } from "./ui";
import {
  Dashboard,
  BridgeView,
  DexView,
  GovernanceView,
  RegistryView,
} from "./views";

export default function App() {
  const [tab, setTab] = useState<TabType>("dashboard");
  const { toasts, push, remove } = useToasts();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 text-gray-900">
            IN
          </div>
          <div>
            <div className="text-sm font-bold tracking-wide">KONEKT</div>
            <div className="text-xs opacity-60">
              Cross-chain connectivity • DEX • Governance
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Pill
            selected={tab === "dashboard"}
            onClick={() => setTab("dashboard")}
          >
            Dashboard
          </Pill>
          <Pill selected={tab === "bridge"} onClick={() => setTab("bridge")}>
            <ArrowLeftRight className="mr-1 h-3 w-3" />
            Bridge
          </Pill>
          <Pill selected={tab === "dex"} onClick={() => setTab("dex")}>
            <ArrowLeftRight className="mr-1 h-3 w-3" />
            DEX
          </Pill>
          <Pill
            selected={tab === "governance"}
            onClick={() => setTab("governance")}
          >
            <Settings className="mr-1 h-3 w-3" />
            Governance
          </Pill>
          <Pill
            selected={tab === "registry"}
            onClick={() => setTab("registry")}
          >
            <Store className="mr-1 h-3 w-3" />
            DApp Store
          </Pill>
        </div>
        <div className="flex items-center gap-2">
          <Badge>
            <Wallet className="mr-1 h-3 w-3" />
            {MOCK_ADDRESS}
          </Badge>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl px-6 py-4">
        {tab === "dashboard" && <Dashboard />}
        {tab === "bridge" && <BridgeView notify={push} />}
        {tab === "dex" && <DexView notify={push} />}
        {tab === "governance" && <GovernanceView notify={push} />}
        {tab === "registry" && <RegistryView />}
      </main>

      {/* Toasts */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[360px] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-2 rounded-xl border p-3 shadow ${
              t.type === "err"
                ? "border-red-500/40 bg-red-500/10"
                : "border-emerald-400/40 bg-emerald-400/10"
            }`}
          >
            {t.type === "err" ? (
              <XCircle className="mt-0.5 h-4 w-4 text-red-300" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
            )}
            <div className="text-sm">{t.msg}</div>
            <button
              className="ml-auto text-xs opacity-70 hover:opacity-100"
              onClick={() => remove(t.id)}
            >
              dismiss
            </button>
          </div>
        ))}
      </div>

      <footer className="border-t border-white/5 bg-slate-900/50 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-xs opacity-70">
          <div className="flex items-center gap-2">
            <Badge>
              <ChainDot id="konekt" />
              KONEKT
            </Badge>
            <Badge>
              <ChainDot id="chain-a" />
              Blockchain A
            </Badge>
            <Badge>
              <ChainDot id="chain-b" />
              Blockchain B
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>ICX used for fees • LFT/BFT validators • BTP messaging</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
