import React from "react";

interface PillProps {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Pill({ selected, children, onClick }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm transition ${
        selected
          ? "bg-white text-gray-900"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      {children}
    </button>
  );
}
