import {
  Settings,
  Store,
  Wallet,
  BarChart3,
  Shield,
  Zap,
  ChevronDown,
  X,
} from "lucide-react";
import type { TabType } from "../../types";
import { MOCK_ADDRESS } from "../../constants";
import { MobileNavItem } from "./MobileNavItem";

interface MobileMenuProps {
  isOpen: boolean;
  tab: TabType;
  setTab: (tab: TabType) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function MobileMenu({
  isOpen,
  tab,
  setTab,
  setIsMobileMenuOpen,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="md:hidden fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsMobileMenuOpen(false);
        }
      }}
    >
      <div className="flex flex-col h-full transform transition-transform duration-300 translate-y-0">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 text-gray-900 font-bold text-xs">
                IN
              </div>
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-green-400 rounded-full border border-slate-900"></div>
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white">
                KONEKT
              </div>
              <div className="text-xs text-gray-400">Cross-chain Protocol</div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/20 bg-white/5"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            <MobileNavItem
              icon={<BarChart3 className="h-5 w-5" />}
              label="Dashboard"
              isActive={tab === "dashboard"}
              onClick={() => {
                setTab("dashboard");
                setIsMobileMenuOpen(false);
              }}
            />
            <MobileNavItem
              icon={<Shield className="h-5 w-5" />}
              label="Bridge"
              isActive={tab === "bridge"}
              onClick={() => {
                setTab("bridge");
                setIsMobileMenuOpen(false);
              }}
            />
            <MobileNavItem
              icon={<Zap className="h-5 w-5" />}
              label="DEX"
              isActive={tab === "dex"}
              onClick={() => {
                setTab("dex");
                setIsMobileMenuOpen(false);
              }}
            />
            <MobileNavItem
              icon={<Settings className="h-5 w-5" />}
              label="Governance"
              isActive={tab === "governance"}
              onClick={() => {
                setTab("governance");
                setIsMobileMenuOpen(false);
              }}
            />
            <MobileNavItem
              icon={<Store className="h-5 w-5" />}
              label="DApp Store"
              isActive={tab === "registry"}
              onClick={() => {
                setTab("registry");
                setIsMobileMenuOpen(false);
              }}
            />
          </div>

          {/* Mobile Wallet Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="space-y-4">
              {/* Network Status */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-300">
                    KONEKT Network
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
              </div>

              {/* Wallet Connection */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20">
                <Wallet className="h-5 w-5 text-blue-300" />
                <div>
                  <div className="text-sm font-medium text-white">
                    Connected Wallet
                  </div>
                  <div className="text-xs text-gray-400">{MOCK_ADDRESS}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
