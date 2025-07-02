"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { foodHubBrands } from "~/lib/mock-data";
import { formatCurrency, formatNumber } from "~/lib/utils";

export function BrandOrdersCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {foodHubBrands.map((brand) => (
        <div
          key={brand.id}
          className="relative group"
        >
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/15">
            {/* Brand Color Accent */}
            <div 
              className="absolute top-0 right-0 w-16 h-16 rounded-bl-2xl opacity-20"
              style={{ backgroundColor: brand.color }}
            />
            
            {/* Brand Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white truncate pr-2">
                {brand.name}
              </h3>
              <div 
                className="w-3 h-3 rounded-full shadow-lg"
                style={{ backgroundColor: brand.color }}
              />
            </div>

            {/* Orders Count */}
            <div className="mb-3">
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(brand.dailyOrders)}
              </div>
              <div className="text-sm text-slate-300 font-medium">
                Daily Orders
              </div>
            </div>

            {/* Change Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                {brand.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    brand.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {brand.change > 0 ? "+" : ""}{brand.change}%
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                vs yesterday
              </div>
            </div>

            {/* Revenue & AOV */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Revenue</span>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(brand.revenue)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">AOV</span>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(brand.avgOrderValue)}
                </span>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
              style={{ 
                background: `radial-gradient(circle at center, ${brand.color}40 0%, transparent 70%)` 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
} 