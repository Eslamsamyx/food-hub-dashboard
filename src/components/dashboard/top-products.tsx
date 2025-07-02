import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { Card } from "~/components/ui/card";
import { formatCurrency, formatNumber } from "~/lib/utils";

interface Product {
  name: string;
  category: string;
  revenue: number;
  units: number;
  growth: number;
}

interface TopProductsProps {
  data: Product[];
}

export function TopProducts({ data }: TopProductsProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Top Products</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-slate-300">
                  Product
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wide text-slate-300">
                  Revenue
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wide text-slate-300">
                  Units
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wide text-slate-300">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {data.map((product) => (
                <tr key={product.name} className="border-b border-white/5">
                  <td className="py-3">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-300">
                        {product.category}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="text-sm font-medium text-white">
                      {formatCurrency(product.revenue)}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="text-sm text-slate-300">
                      {formatNumber(product.units)}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-emerald-300 font-medium">
                        +{formatNumber(product.growth)}%
                      </span>
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