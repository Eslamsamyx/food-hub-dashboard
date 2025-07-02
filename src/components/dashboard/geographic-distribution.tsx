import { Card } from "~/components/ui/card";
import { formatNumber } from "~/lib/utils";

interface GeographicItem {
  country: string;
  value: number;
  percentage: number;
}

interface GeographicDistributionProps {
  data: GeographicItem[];
}

export function GeographicDistribution({ data }: GeographicDistributionProps) {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <Card>
      <Card.Header>
        <Card.Title>Geographic Distribution</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.country} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">
                  {item.country}
                </span>
                <div className="text-right">
                  <span className="text-sm font-medium text-white">
                    {formatNumber(item.value)}
                  </span>
                  <span className="ml-2 text-xs text-slate-300">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/20 backdrop-blur-sm">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg transition-all duration-300"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 