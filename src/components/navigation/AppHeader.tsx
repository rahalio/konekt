import {
  Settings,
  Store,
  Wallet,
  BarChart3,
  Shield,
  Zap,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import type { TabType } from "../../types";
import { MOCK_ADDRESS } from "../../constants";
import { NavItem } from "./NavItem";

interface AppHeaderProps {
  tab: TabType;
  setTab: (tab: TabType) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function AppHeader({
  tab,
  setTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: AppHeaderProps) {
  return (
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
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-200">
              <Wallet className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-medium text-white">
                {MOCK_ADDRESS}
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
