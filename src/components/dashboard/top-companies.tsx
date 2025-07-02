"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency, formatNumber } from "~/lib/utils";

interface TopCompaniesProps {
  data: Array<{
    name: string;
    revenue: number;
    growth: number;
    employees: number;
    industry: string;
  }>;
}

export function TopCompanies({ data }: TopCompaniesProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold text-white">Top Performing Companies</h2>
        <p className="text-sm text-slate-300">Portfolio companies ranked by revenue performance</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide text-slate-300 uppercase">
                Company
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold tracking-wide text-slate-300 uppercase">
                Revenue
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold tracking-wide text-slate-300 uppercase">
                Growth
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold tracking-wide text-slate-300 uppercase">
                Employees
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold tracking-wide text-slate-300 uppercase">
                Industry
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((company, _index) => (
              <tr
                key={`company-${company.name}`}
                className="border-b border-white/10 transition-colors hover:bg-white/5"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-sm font-bold text-white">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{company.name}</div>
                      <div className="text-xs text-slate-400">{company.industry}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="font-semibold text-white">{formatCurrency(company.revenue)}</div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {company.growth >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        company.growth >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {company.growth > 0 ? "+" : ""}
                      {company.growth}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="font-medium text-white">{formatNumber(company.employees)}</div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-300">
                    {company.industry}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
