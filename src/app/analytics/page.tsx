"use client";

import { DollarSign, ShoppingCart, Star, TrendingDown, TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
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
import { generateFoodHubTimeSeriesData } from "~/lib/mock-data";
import { formatCurrency, formatNumber } from "~/lib/utils";

// Generate sample data for analytics
const timeSeriesData = generateFoodHubTimeSeriesData(30);
const conversionData = generateFoodHubTimeSeriesData(30).map((item) => ({
  ...item,
  conversionRate: Math.random() * 5 + 2,
  bounceRate: Math.random() * 30 + 20,
}));

// Customer segments data
const customerSegments = [
  { segment: "Regular Customers", value: 45, color: "#3B82F6" },
  { segment: "VIP Customers", value: 25, color: "#10B981" },
  { segment: "New Customers", value: 20, color: "#F59E0B" },
  { segment: "Inactive", value: 10, color: "#EF4444" },
];

// Order sources
const orderSources = [
  { source: "Mobile App", orders: 1250, percentage: 45 },
  { source: "Website", orders: 890, percentage: 32 },
  { source: "Phone Orders", orders: 420, percentage: 15 },
  { source: "Walk-in", orders: 220, percentage: 8 },
];

export default function AnalyticsPage() {
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
            <h1 className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-3xl font-bold text-transparent">
              📈 Analytics Dashboard
            </h1>
            <p className="mt-2 font-medium text-slate-200">
              Deep insights into Food Hub performance and customer behavior
            </p>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Orders",
              value: 12847,
              change: 15.3,
              trend: "up" as const,
              icon: <ShoppingCart className="h-6 w-6" />,
              color: "text-blue-400",
            },
            {
              title: "Revenue",
              value: 987650,
              change: 23.1,
              trend: "up" as const,
              icon: <DollarSign className="h-6 w-6" />,
              color: "text-emerald-400",
              isCurrency: true,
            },
            {
              title: "Active Customers",
              value: 4521,
              change: 8.7,
              trend: "up" as const,
              icon: <Users className="h-6 w-6" />,
              color: "text-purple-400",
            },
            {
              title: "Avg Rating",
              value: 4.7,
              change: 2.1,
              trend: "up" as const,
              icon: <Star className="h-6 w-6" />,
              color: "text-yellow-400",
              isRating: true,
            },
          ].map((metric, index) => (
            <div
              key={`analytics-metric-${metric.title}-${index}`}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`${metric.color}`}>{metric.icon}</div>
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      metric.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    +{metric.change}%
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-2xl font-bold text-white">
                  {metric.isCurrency
                    ? formatCurrency(metric.value)
                    : metric.isRating
                      ? `${metric.value}/5.0`
                      : formatNumber(metric.value)}
                </div>
              </div>
              <div className="text-sm font-medium text-slate-300">{metric.title}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Trend */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">Revenue Trend (30 Days)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      color: "white",
                    }}
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Segments */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">Customer Segments</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ segment, value }) => `${segment} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`customer-segment-${entry.segment}-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      color: "white",
                    }}
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Order Sources & Conversion */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Order Sources */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">Order Sources</h2>
            <div className="space-y-4">
              {orderSources.map((source, index) => (
                <div
                  key={`order-source-${source.source}-${index}`}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold text-white">{source.source}</h3>
                    <span className="text-sm text-slate-300">{source.percentage}%</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Orders</span>
                    <span className="font-medium text-white">{formatNumber(source.orders)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Metrics */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">Conversion Metrics</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      color: "white",
                    }}
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(1)}%`,
                      name === "conversionRate" ? "Conversion Rate" : "Bounce Rate",
                    ]}
                  />
                  <Bar dataKey="conversionRate" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Peak Order Time",
              value: "7:30 PM",
              description: "Highest order volume",
              icon: "🕰️",
            },
            {
              title: "Top Performing Brand",
              value: "DipnDip",
              description: "Highest revenue generator",
              icon: "🏆",
            },
            {
              title: "Customer Satisfaction",
              value: "94.2%",
              description: "Overall satisfaction rate",
              icon: "😊",
            },
          ].map((item, index) => (
            <div
              key={`performance-${item.title}-${index}`}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md"
            >
              <div className="mb-3 text-3xl">{item.icon}</div>
              <div className="mb-1 text-2xl font-bold text-white">{item.value}</div>
              <div className="mb-2 text-lg font-semibold text-slate-200">{item.title}</div>
              <div className="text-sm text-slate-400">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
