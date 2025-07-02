"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { operationalMetrics } from "~/lib/mock-data";
import { formatCurrency } from "~/lib/utils";

export function OperationalEfficiency() {
  const { productivity, costs } = operationalMetrics;

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Operational Efficiency</h2>
        <p className="text-sm text-slate-300">Department productivity and cost analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productivity Chart */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Department Productivity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="department" 
                  stroke="#94a3b8"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "efficiency" ? `${value}%` : value,
                    name === "efficiency" ? "Efficiency" : "Target"
                  ]}
                />
                <Bar dataKey="efficiency" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#374151" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Cost Breakdown</h3>
          <div className="space-y-4">
            {costs.map((cost) => (
              <div key={`cost-${cost.category}`} className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-white font-semibold">{cost.category}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      cost.trend === "up" 
                        ? "bg-red-500/20 text-red-300 border border-red-400/30"
                        : cost.trend === "down"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-slate-500/20 text-slate-300 border border-slate-400/30"
                    }`}>
                      {cost.trend === "up" ? "↑" : cost.trend === "down" ? "↓" : "→"} {Math.abs(cost.change)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{formatCurrency(cost.amount)}</div>
                    <div className="text-xs text-slate-400">{cost.percentage}%</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg transition-all duration-300"
                    style={{ width: `${cost.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity Details */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Department Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {productivity.map((dept) => (
            <div key={`dept-${dept.department}`} className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 text-center">
              <div className="text-lg font-bold text-white mb-1">{dept.department}</div>
              <div className="text-sm text-slate-300 mb-2">{dept.employees} employees</div>
              <div className="text-xs text-slate-400 mb-1">Output: {dept.output}</div>
              <div className={`text-sm font-semibold ${
                dept.efficiency >= dept.target ? "text-emerald-300" : "text-amber-300"
              }`}>
                {dept.efficiency}% efficiency
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 