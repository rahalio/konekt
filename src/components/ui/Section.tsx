import React from "react";

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function Section({
  title,
  icon,
  children,
  actions,
  className = "",
}: SectionProps) {
  return (
    <div
      className={`rounded-2xl border bg-white/5 p-5 shadow-sm ring-1 ring-black/5 flex flex-col ${className}`}
    >
      <div className="mb-3 flex items-center justify-between flex-shrink-0">
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
