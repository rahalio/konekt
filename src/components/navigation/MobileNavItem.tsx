import React from "react";

interface MobileNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function MobileNavItem({
  icon,
  label,
  isActive,
  onClick,
}: MobileNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30"
          : "text-gray-300 hover:text-white hover:bg-white/5"
      }`}
    >
      <span
        className={`transition-colors duration-200 ${
          isActive ? "text-blue-300" : "text-gray-400"
        }`}
      >
        {icon}
      </span>
      <span className="font-medium">{label}</span>
      {isActive && (
        <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
      )}
    </button>
  );
}
