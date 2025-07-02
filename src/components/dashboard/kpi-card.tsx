"use client";

import { Star, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency, formatNumber, formatPercentage, formatRating } from "~/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  icon: string;
  period: string;
  isPercentage?: boolean;
  isCurrency?: boolean;
  isRating?: boolean;
  maxRating?: number;
  dataSource?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  period, 
  isPercentage = false,
  isCurrency = false,
  isRating = false,
  maxRating = 5,
}: KPICardProps) {
  const formatValue = () => {
    if (isRating) {
      return formatRating(value, maxRating);
    }
    if (isCurrency) {
      return formatCurrency(value);
    }
    if (isPercentage) {
      return formatPercentage(value);
    }
    return formatNumber(value);
  };

  return (
    <div className="group relative">
      {/* Glassmorphism Card */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/15">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{icon}</div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              {title}
            </h3>
          </div>
          {isRating && (
            <div className="flex items-center space-x-1">
              {Array.from({ length: maxRating }, (_, i) => (
                <Star 
                  key={`star-${title}-${i}`}
                  className={`h-4 w-4 ${
                    i < Math.floor(value) 
                      ? "text-yellow-400 fill-current" 
                      : i < value 
                      ? "text-yellow-400 fill-current opacity-50"
                      : "text-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-white mb-1">
            {formatValue()}
          </div>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span
              className={`text-sm font-semibold ${
                trend === "up" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {change > 0 ? "+" : ""}{change}%
            </span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            {period}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 pointer-events-none" />
      </div>
    </div>
  );
} 