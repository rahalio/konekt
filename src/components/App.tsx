import { useState } from "react";
import type { TabType } from "../types";
import { useToasts } from "../hooks/useToasts";
import { AppHeader, MobileMenu } from "./navigation";
import { ToastNotification } from "./ui";
import { Footer } from "./layout";
import {
  Dashboard,
  BridgeView,
  DexView,
  GovernanceView,
  RegistryView,
} from "./views";

export default function App() {
  const [tab, setTab] = useState<TabType>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toasts, push, remove } = useToasts();

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <AppHeader
        tab={tab}
        setTab={setTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        tab={tab}
        setTab={setTab}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="mx-auto w-full max-w-6xl px-6 py-6">
        {tab === "dashboard" && <Dashboard onNavigate={setTab} />}
        {tab === "bridge" && <BridgeView notify={push} onNavigate={setTab} />}
        {tab === "dex" && <DexView notify={push} onNavigate={setTab} />}
        {tab === "governance" && <GovernanceView notify={push} />}
        {tab === "registry" && <RegistryView />}
      </main>

      <ToastNotification toasts={toasts} onRemove={remove} />

      <Footer />
    </div>
  );
}
