"use client";

import { Card } from "~/components/ui/card";
import { formatNumber } from "~/lib/utils";

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

interface TrafficSourcesChartProps {
  data: TrafficSource[];
}

export function TrafficSourcesChart({ data }: TrafficSourcesChartProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Traffic Sources</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 42 42" className="w-full h-full">
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              {/* Pie chart segments would go here */}
            </svg>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {data.map((item) => (
            <div key={item.source} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="mr-3 h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-300 font-medium">
                  {item.source}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-white">
                  {formatNumber(item.visitors)}
                </span>
                <span className="ml-2 text-xs text-slate-300">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 