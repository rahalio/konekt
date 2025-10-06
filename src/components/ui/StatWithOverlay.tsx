import React, { useState } from "react";

interface StatWithOverlayProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  highlight?: boolean;
  overlayContent: {
    title: string;
    details: string[];
  };
  isActive?: boolean;
  isHovered?: boolean;
  onHover?: (isHovered: boolean) => void;
  onClick?: () => void;
}

export function StatWithOverlay({
  label,
  value,
  icon,
  trend,
  highlight = false,
  overlayContent,
  isActive = false,
  isHovered = false,
  onHover,
  onClick,
}: StatWithOverlayProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    setShowOverlay(!showOverlay);
    onClick?.();
  };

  const handleMouseEnter = () => {
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    onHover?.(false);
  };

  // Determine if this card should show highlight styling
  const shouldHighlight = highlight && !isHovered;
  const shouldShowHoverEffect = !highlight || isActive;

  return (
    <div className="relative h-full min-h-[120px]">
      <div
        className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer h-full flex flex-col min-h-[120px] ${
          showOverlay ? 'scale-[1.02] shadow-lg ring-2 ring-emerald-400/30' : ''
        } ${
          shouldHighlight
            ? "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20"
            : shouldShowHoverEffect
            ? "bg-white/5 border-white/10 hover:bg-gradient-to-br hover:from-emerald-500/10 hover:to-emerald-600/5 hover:border-emerald-500/20"
            : "bg-white/5 border-white/10"
        }`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-3 p-4 flex-1">
          <div
            className={`p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
              showOverlay ? 'bg-emerald-500/30 text-emerald-300 scale-110' : ''
            } ${
              shouldHighlight
                ? "bg-emerald-500/20 text-emerald-300"
                : shouldShowHoverEffect
                ? "bg-white/10 text-white/70 group-hover:bg-emerald-500/20 group-hover:text-emerald-300"
                : "bg-white/10 text-white/70"
            }`}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1 leading-tight">
              {label}
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <div
                className={`text-xl font-bold transition-colors leading-tight ${
                  shouldHighlight 
                    ? "text-emerald-300" 
                    : shouldShowHoverEffect
                    ? "text-white group-hover:text-emerald-300"
                    : "text-white"
                }`}
              >
                {value}
              </div>
              {trend && (
                <div
                  className={`text-xs font-medium flex items-center gap-1 flex-shrink-0 ${
                    trend.direction === "up"
                      ? "text-emerald-400"
                      : trend.direction === "down"
                      ? "text-red-400"
                      : "text-white/60"
                  }`}
                >
                  {trend.direction === "up" && "↗"}
                  {trend.direction === "down" && "↘"}
                  {trend.direction === "neutral" && "→"}
                  {trend.value}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom accent bar - shows on highlight or hover */}
        <div className={`h-1 transition-all duration-300 ${
          shouldHighlight 
            ? "bg-gradient-to-r from-emerald-500 to-emerald-400" 
            : shouldShowHoverEffect
            ? "bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100"
            : "bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0"
        }`} />
        
        {/* Animated ripple effect */}
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 animate-pulse" />
        )}
      </div>

      {/* Enhanced Overlay */}
      {showOverlay && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
            style={{
              animation: 'backdropFadeIn 0.3s ease-out'
            }}
            onClick={() => setShowOverlay(false)}
          />
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-50 w-80 max-w-[90vw] animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-emerald-500/20"
              style={{
                animation: 'overlaySlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {overlayContent.title}
                      </h3>
                      <p className="text-xs text-white/60">{label}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowOverlay(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group"
                  >
                    <svg 
                      className="w-4 h-4 text-white/60 group-hover:text-white/80" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                {overlayContent.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group cursor-default"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'overlaySlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both'
                    }}
                  >
                    <div className="relative">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                      <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-50 group-hover:scale-150 group-hover:opacity-20 transition-all duration-300" />
                    </div>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-200 font-medium">
                      {detail}
                    </span>
                  </div>
                ))}
                
                {/* Subtle hint text */}
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-white/40 text-center">
                    Click outside to close
                  </p>
                </div>
              </div>

              {/* Footer accent */}
              <div className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}