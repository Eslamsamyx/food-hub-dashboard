"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "~/components/ui/card";
import { formatCurrency } from "~/lib/utils";

interface IndustryDistributionProps {
  data: Array<{
    industry: string;
    companies: number;
    revenue: number;
    percentage: number;
    color: string;
  }>;
}

export function IndustryDistribution({ data }: IndustryDistributionProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Industry Distribution</Card.Title>
      </Card.Header>
      <Card.Content>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="revenue"
            >
              {data.map((entry) => (
                <Cell key={entry.industry} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                color: "#ffffff",
              }}
              formatter={(value: unknown) => [
                formatCurrency(value as number),
                "Revenue",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {data.map((item) => (
            <div key={item.industry} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="mr-3 h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-300 font-medium">
                  {item.industry}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-white">
                  {item.companies} companies
                </div>
                <div className="text-xs text-slate-400">
                  {formatCurrency(item.revenue)} ({item.percentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 