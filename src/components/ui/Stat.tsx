import React from "react";

interface StatProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  highlight?: boolean;
}

export function Stat({ label, value, icon, trend, highlight = false }: StatProps) {
  return (
    <div className={`group relative overflow-hidden rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
      highlight 
        ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-400/30' 
        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
    }`}>
      <div className="flex items-center gap-3 p-4">
        <div className={`p-2 rounded-lg transition-colors ${
          highlight 
            ? 'bg-emerald-500/20 text-emerald-300' 
            : 'bg-white/10 text-white/70 group-hover:text-white/90'
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
            {label}
          </div>
          <div className="flex items-baseline gap-2">
            <div className={`text-xl font-bold ${highlight ? 'text-emerald-300' : 'text-white'}`}>
              {value}
            </div>
            {trend && (
              <div className={`text-xs font-medium flex items-center gap-1 ${
                trend.direction === 'up' ? 'text-emerald-400' :
                trend.direction === 'down' ? 'text-red-400' :
                'text-white/60'
              }`}>
                {trend.direction === 'up' && '↗'}
                {trend.direction === 'down' && '↘'}
                {trend.direction === 'neutral' && '→'}
                {trend.value}
              </div>
            )}
          </div>
        </div>
      </div>
      {highlight && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
      )}
    </div>
  );
}
