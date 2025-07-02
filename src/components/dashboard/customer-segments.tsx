"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { customerAnalytics } from "~/lib/mock-data";
import { formatCurrency, formatNumber } from "~/lib/utils";

export function CustomerSegments() {
  const segments = customerAnalytics.segments;

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold text-white">Customer Segments</h2>
        <p className="text-sm text-slate-300">Revenue distribution by customer segment</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ segment, percent }) => `${segment} ${((percent ?? 0) * 100).toFixed(0)}%`}
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
            <div
              key={`segment-detail-${segment.segment}`}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="h-4 w-4 rounded-full"
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
                  <div className="mb-1 text-slate-400">Customers</div>
                  <div className="font-semibold text-white">{formatNumber(segment.customers)}</div>
                </div>
                <div>
                  <div className="mb-1 text-slate-400">Avg Deal</div>
                  <div className="font-semibold text-white">{formatCurrency(segment.avgDeal)}</div>
                </div>
                <div>
                  <div className="mb-1 text-slate-400">Retention</div>
                  <div className="font-semibold text-white">{segment.retention}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Lifecycle */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-white">Customer Lifecycle</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {customerAnalytics.lifecycle.map((stage) => (
            <div
              key={`lifecycle-${stage.stage}`}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="text-center">
                <div className="mb-1 text-2xl font-bold text-white">
                  {formatNumber(stage.count)}
                </div>
                <div className="mb-2 text-sm text-slate-300">{stage.stage}</div>
                <div className="text-xs text-slate-400">{stage.conversion}% conversion</div>
                <div className="text-xs text-slate-400">{formatCurrency(stage.cost)} avg cost</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
