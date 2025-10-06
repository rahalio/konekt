import { ReactNode } from "react";

interface SectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

export function Section({ title, icon, children, actions }: SectionProps) {
  return (
    <div className="rounded-2xl border bg-white/5 p-5 shadow-sm ring-1 ring-black/5 flex flex-col h-full min-h-[300px]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {icon}
          <span className="tracking-wide">{title}</span>
        </div>
        {actions}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
