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
      className={`group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10 flex flex-col ${className}`}
    >
      <div className="mb-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
            {icon}
          </div>
          <span className="tracking-wide text-white/90 group-hover:text-white transition-colors">
            {title}
          </span>
        </div>
        {actions}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
