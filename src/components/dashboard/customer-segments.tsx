"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { customerAnalytics } from "~/lib/mock-data";
import { formatCurrency, formatNumber } from "~/lib/utils";

export function CustomerSegments() {
  const segments = customerAnalytics.segments;

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Customer Segments</h2>
        <p className="text-sm text-slate-300">Revenue distribution by customer segment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ segment, percent }) => `${segment} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {segments.map((entry, index) => (
                  <Cell key={`segment-${entry.segment}-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  color: "white",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Segment Details */}
        <div className="space-y-4">
          {segments.map((segment) => (
            <div key={`segment-detail-${segment.segment}`} className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <h3 className="text-lg font-semibold text-white">{segment.segment}</h3>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {formatCurrency(segment.revenue)}
                  </div>
                  <div className="text-xs text-slate-400">Revenue</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-slate-400 mb-1">Customers</div>
                  <div className="text-white font-semibold">{formatNumber(segment.customers)}</div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">Avg Deal</div>
                  <div className="text-white font-semibold">{formatCurrency(segment.avgDeal)}</div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">Retention</div>
                  <div className="text-white font-semibold">{segment.retention}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Lifecycle */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Customer Lifecycle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerAnalytics.lifecycle.map((stage) => (
            <div key={`lifecycle-${stage.stage}`} className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {formatNumber(stage.count)}
                </div>
                <div className="text-sm text-slate-300 mb-2">{stage.stage}</div>
                <div className="text-xs text-slate-400">
                  {stage.conversion}% conversion
                </div>
                <div className="text-xs text-slate-400">
                  {formatCurrency(stage.cost)} avg cost
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 