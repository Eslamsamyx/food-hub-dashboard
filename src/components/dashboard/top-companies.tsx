import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { Card } from "~/components/ui/card";
import { formatCurrency, formatNumber } from "~/lib/utils";

interface Company {
  name: string;
  industry: string;
  revenue: number;
  growth: number;
}

interface TopCompaniesProps {
  data: Company[];
}

export function TopCompanies({ data = [] }: TopCompaniesProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Top Performing Companies</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-slate-300">
                  Company
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wide text-slate-300">
                  Revenue
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wide text-slate-300">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {data.map((company, index) => (
                <tr key={company.name} className="border-b border-white/5">
                  <td className="py-3">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {company.name}
                      </div>
                      <div className="text-xs text-slate-300">
                        {company.industry}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="text-sm font-medium text-white">
                      {formatCurrency(company.revenue)}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="text-sm text-slate-300">
                      <div className="flex items-center justify-end space-x-1">
                        <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-300 font-medium">
                          +{formatNumber(company.growth)}%
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Content>
    </Card>
  );
} 