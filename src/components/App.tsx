import { useState } from "react";
import {
  Settings,
  Store,
  Wallet,
  CheckCircle2,
  XCircle,
  BarChart3,
  Shield,
  Zap,
  ChevronDown,
} from "lucide-react";
import type { TabType } from "../types";
import { MOCK_ADDRESS } from "../constants";
import { useToasts } from "../hooks/useToasts";
import { Badge, ChainDot } from "./ui";
import {
  Dashboard,
  BridgeView,
  DexView,
  GovernanceView,
  RegistryView,
} from "./views";

// Professional Navigation Item Component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30"
          : "text-gray-300 hover:text-white hover:bg-white/5"
      }`}
    >
      <span
        className={`transition-colors duration-200 ${
          isActive ? "text-blue-300" : "text-gray-400 group-hover:text-gray-300"
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
      {isActive && (
        <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
      )}
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState<TabType>("dashboard");
  const { toasts, push, remove } = useToasts();

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      {/* Professional Navigation Bar */}
      <nav className="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-gray-900 font-bold text-sm shadow-lg">
                    IN
                  </div>
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                </div>
                <div>
                  <div className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    KONEKT
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Cross-chain Protocol
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <NavItem
                icon={<BarChart3 className="h-4 w-4" />}
                label="Dashboard"
                isActive={tab === "dashboard"}
                onClick={() => setTab("dashboard")}
              />
              <NavItem
                icon={<Shield className="h-4 w-4" />}
                label="Bridge"
                isActive={tab === "bridge"}
                onClick={() => setTab("bridge")}
              />
              <NavItem
                icon={<Zap className="h-4 w-4" />}
                label="DEX"
                isActive={tab === "dex"}
                onClick={() => setTab("dex")}
              />
              <NavItem
                icon={<Settings className="h-4 w-4" />}
                label="Governance"
                isActive={tab === "governance"}
                onClick={() => setTab("governance")}
              />
              <NavItem
                icon={<Store className="h-4 w-4" />}
                label="DApp Store"
                isActive={tab === "registry"}
                onClick={() => setTab("registry")}
              />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Network Status */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-300">
                    KONEKT
                  </span>
                </div>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </div>

              {/* Wallet Connection */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-200">
                <Wallet className="h-4 w-4 text-blue-300" />
                <span className="text-sm font-medium text-white">
                  {MOCK_ADDRESS}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl px-6 py-6">
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
