import { ReactNode } from "react";

interface StatProps {
  label: string;
  value: string;
  icon?: ReactNode;
}

export function Stat({ label, value, icon }: StatProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white/5 p-4">
      <div className="opacity-70">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-wide opacity-70">
          {label}
        </div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}
