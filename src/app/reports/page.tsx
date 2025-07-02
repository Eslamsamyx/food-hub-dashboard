"use client";

import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { formatCurrency, formatNumber } from "~/lib/utils";

// Mock data for reports
const performanceData = [
  { month: "Jan", revenue: 4200000, profit: 840000, customers: 1250 },
  { month: "Feb", revenue: 4500000, profit: 900000, customers: 1340 },
  { month: "Mar", revenue: 4800000, profit: 960000, customers: 1420 },
  { month: "Apr", revenue: 5100000, profit: 1020000, customers: 1580 },
  { month: "May", revenue: 5400000, profit: 1080000, customers: 1650 },
  { month: "Jun", revenue: 5700000, profit: 1140000, customers: 1720 },
];

const departmentData = [
  { department: "Sales", efficiency: 94.2, target: 90, budget: 2400000, spent: 2280000 },
  { department: "Marketing", efficiency: 87.5, target: 85, budget: 1800000, spent: 1620000 },
  { department: "Operations", efficiency: 91.8, target: 88, budget: 3200000, spent: 3040000 },
  { department: "Engineering", efficiency: 89.3, target: 90, budget: 4500000, spent: 4275000 },
  { department: "Customer Success", efficiency: 96.1, target: 92, budget: 1200000, spent: 1140000 },
];

const regionData = [
  { region: "North America", revenue: 8500000, growth: 15.2, color: "#3B82F6" },
  { region: "Europe", revenue: 6200000, growth: 12.8, color: "#10B981" },
  { region: "Asia Pacific", revenue: 4800000, growth: 22.1, color: "#F59E0B" },
  { region: "Latin America", revenue: 2100000, growth: 8.7, color: "#EF4444" },
  { region: "Middle East", revenue: 1400000, growth: 18.9, color: "#8B5CF6" },
];

export default function ReportsPage() {
  // Remove unused state variables that were causing ESLint warnings
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/10 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <DashboardHeader />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-3xl font-bold text-transparent">
                  📊 Business Reports
                </h1>
                <p className="mt-2 font-medium text-slate-200">
                  Comprehensive analytics and performance insights
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
                <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue & Profit Trends */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">Revenue & Profit Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      color: "white",
                    }}
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name === "revenue" ? "Revenue" : "Profit",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Growth */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">Customer Growth</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      color: "white",
                    }}
                    formatter={(value: number) => [formatNumber(value), "Customers"]}
                  />
                  <Bar dataKey="customers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="mb-8">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-6 text-xl font-bold text-white">Department Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Department
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-300">
                      Efficiency
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-300">
                      Target
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-300">
                      Budget
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-300">
                      Spent
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departmentData.map((dept, index) => (
                    <tr
                      key={`dept-report-${dept.department}-${index}`}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="px-4 py-4">
                        <div className="font-semibold text-white">{dept.department}</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="font-medium text-white">{dept.efficiency}%</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="text-slate-300">{dept.target}%</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="font-medium text-white">{formatCurrency(dept.budget)}</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="text-slate-300">{formatCurrency(dept.spent)}</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            dept.efficiency >= dept.target
                              ? "border border-emerald-400/30 bg-emerald-500/20 text-emerald-300"
                              : "border border-amber-400/30 bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {dept.efficiency >= dept.target ? "On Track" : "Needs Attention"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Regional Revenue Distribution */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">Regional Revenue Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ region, percent }) =>
                      `${region} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`region-cell-${entry.region}-${index}`} fill={entry.color} />
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Growth Rates */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">Regional Growth Rates</h2>
            <div className="space-y-4">
              {regionData.map((region, index) => (
                <div
                  key={`region-growth-${region.region}-${index}`}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                      <h3 className="font-semibold text-white">{region.region}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      {region.growth >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <span
                        className={`text-sm font-semibold ${
                          region.growth >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {region.growth > 0 ? "+" : ""}
                        {region.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Revenue</span>
                    <span className="font-medium text-white">{formatCurrency(region.revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Revenue", value: 23000000, change: 15.2, icon: "💰" },
            { title: "Net Profit", value: 4600000, change: 18.7, icon: "📈" },
            { title: "Customer Count", value: 8960, change: 12.3, icon: "👥" },
            { title: "Market Share", value: 18.5, change: 2.1, icon: "🎯", isPercentage: true },
          ].map((metric, index) => (
            <div
              key={`metric-summary-${metric.title}-${index}`}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-2xl">{metric.icon}</div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">+{metric.change}%</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-2xl font-bold text-white">
                  {metric.isPercentage ? `${metric.value}%` : formatCurrency(metric.value)}
                </div>
              </div>
              <div className="text-sm font-medium text-slate-300">{metric.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
