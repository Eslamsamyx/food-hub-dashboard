import { Card } from "~/components/ui/card";
import { formatCurrency } from "~/lib/utils";

interface Company {
  name: string;
  revenue: number;
  growth: number;
}

interface CompanyPerformanceProps {
  data: Company[];
}

export function CompanyPerformance({ data = [] }: CompanyPerformanceProps) {
  const maxRevenue = data.length > 0 ? Math.max(...data.map((company) => company.revenue)) : 0;

  return (
    <Card>
      <Card.Header>
        <Card.Title>Company Performance</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {data.map((company) => (
            <div key={company.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">
                  {company.name}
                </h4>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {formatCurrency(company.revenue)}
                  </div>
                  <div className="text-xs text-slate-300">
                    Revenue
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Growth</span>
                  <span className={`font-medium ${
                    company.growth >= 0 ? "text-emerald-300" : "text-red-300"
                  }`}>
                    {company.growth >= 0 ? "+" : ""}{company.growth.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg transition-all duration-300"
                    style={{
                      width: `${(company.revenue / maxRevenue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 