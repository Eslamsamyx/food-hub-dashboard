"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency, formatNumber } from "~/lib/utils";

interface SalesPipelineProps {
  data: Array<{
    stage: string;
    deals: number;
    value: number;
    probability: number;
    weightedValue: number;
  }>;
}

export function SalesPipeline({ data }: SalesPipelineProps) {
  const totalValue = data.reduce((sum, stage) => sum + stage.value, 0);
  const totalWeightedValue = data.reduce((sum, stage) => sum + stage.weightedValue, 0);

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold text-white">Sales Pipeline</h2>
        <p className="text-sm text-slate-300">Deal progression through sales stages</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pipeline Chart */}
        <div className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="stage"
                  stroke="#94a3b8"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "value" ? formatCurrency(value) : formatCurrency(value),
                    name === "value" ? "Total Value" : "Weighted Value",
                  ]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="weightedValue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold text-white">Pipeline Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-300">Total Pipeline</span>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(totalValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-300">Weighted Pipeline</span>
                <span className="text-sm font-semibold text-emerald-300">
                  {formatCurrency(totalWeightedValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-300">Total Deals</span>
                <span className="text-sm font-semibold text-white">
                  {formatNumber(data.reduce((sum, stage) => sum + stage.deals, 0))}
                </span>
              </div>
            </div>
          </div>

          {/* Stage Details */}
          <div className="space-y-2">
            {data.map((stage, _index) => (
              <div
                key={`pipeline-${stage.stage}`}
                className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">{stage.stage}</h4>
                  <span className="text-xs text-slate-400">{stage.probability}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">{formatNumber(stage.deals)} deals</span>
                  <span className="font-medium text-white">{formatCurrency(stage.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
