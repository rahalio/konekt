import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
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
