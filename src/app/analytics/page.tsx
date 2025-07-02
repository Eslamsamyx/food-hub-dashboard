"use client";

import {
    ArrowTrendingUpIcon,
    BanknotesIcon,
    ChartBarIcon,
    CursorArrowRaysIcon,
    FunnelIcon,
    UsersIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
    Area,
    AreaChart,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { DataSourceSelector } from "~/components/dashboard/data-source-selector";
import { Card } from "~/components/ui/card";
import {
    customerAnalytics,
    generateBusinessTimeSeriesData,
    getKPIData,
    operationalMetrics,
    salesMetrics
} from "~/lib/mock-data";
import { formatCurrency, formatNumber, formatPercentage } from "~/lib/utils";

export default function AnalyticsPage() {
  const [selectedDataSource, setSelectedDataSource] = useState("all");
  const [timeRange, setTimeRange] = useState("30d");
  
  const timeSeriesData = generateBusinessTimeSeriesData(
    timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90, 
    selectedDataSource
  );

  const cohortData = [
    { month: "Jan", retention: 100, newUsers: 450, churn: 0 },
    { month: "Feb", retention: 85, newUsers: 380, churn: 15 },
    { month: "Mar", retention: 72, newUsers: 420, churn: 13 },
    { month: "Apr", retention: 68, newUsers: 520, churn: 4 },
    { month: "May", retention: 65, newUsers: 480, churn: 3 },
    { month: "Jun", retention: 63, newUsers: 550, churn: 2 },
  ];

  const conversionFunnelData = customerAnalytics.lifecycle.map((stage, index) => ({
    stage: stage.stage,
    users: stage.count,
    conversion: stage.conversion,
    dropoff: index > 0 ? (customerAnalytics.lifecycle[index - 1]?.count ?? 0) - stage.count : 0,
  }));

  const performanceMatrix = salesMetrics.team.map(rep => ({
    name: rep.rep,
    deals: rep.deals,
    revenue: rep.revenue,
    efficiency: (rep.revenue / rep.deals) / 1000, // Revenue per deal in thousands
    quota: rep.achievement,
  }));

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case "7d": return "Last 7 Days";
      case "30d": return "Last 30 Days";
      case "90d": return "Last 90 Days";
      default: return "Last 30 Days";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/10 to-transparent" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <DashboardHeader />
      
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Controls */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Advanced Analytics</h1>
            <p className="mt-2 text-slate-200 font-medium">
              Deep insights and predictive analytics for data-driven decision making.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              {["7d", "30d", "90d"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-2 text-sm rounded-xl border transition-all duration-200 font-medium ${
                    timeRange === range
                      ? "bg-blue-500/20 text-blue-300 border-blue-400/50 backdrop-blur-md"
                      : "backdrop-blur-md bg-white/10 text-slate-300 border-white/20 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {getTimeRangeLabel(range)}
                </button>
              ))}
            </div>
            <DataSourceSelector 
              selectedSource={selectedDataSource}
              onSourceChange={setSelectedDataSource}
            />
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getKPIData(selectedDataSource).map((kpi, index) => (
            <Card key={index}>
              <Card.Content className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300 font-medium">{kpi.title}</p>
                    <p className="text-2xl font-bold text-white">
                      {kpi.isCurrency ? formatCurrency(kpi.value) : 
                       kpi.isPercentage ? formatPercentage(kpi.value) : 
                       formatNumber(kpi.value)}
                    </p>
                    <p className={`text-sm flex items-center gap-1 ${
                      kpi.trend === 'up' ? 'text-green-300' : 'text-red-300'
                    }`}>
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                      {kpi.change > 0 ? '+' : ''}{formatPercentage(kpi.change)} {kpi.period}
                    </p>
                  </div>
                  <div className="text-2xl">{kpi.icon}</div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* Advanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Multi-Metric Time Series */}
          <Card>
            <Card.Header>
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-blue-600" />
                <Card.Title>Multi-Metric Performance</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: 'white', fontSize: 12 }}
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <YAxis 
                      yAxisId="left" 
                      tick={{ fill: 'white', fontSize: 12 }}
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      tick={{ fill: 'white', fontSize: 12 }}
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? formatCurrency(Number(value)) : 
                        name === 'conversion' ? formatPercentage(Number(value)) :
                        formatNumber(Number(value)), 
                        name
                      ]}
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    <Legend wrapperStyle={{ color: 'white' }} />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      fill="#3B82F6" 
                      fillOpacity={0.3}
                      stroke="#3B82F6"
                      name="Revenue"
                    />
                    <Bar yAxisId="left" dataKey="customers" fill="#10B981" name="New Customers" />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="conversion" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      name="Conversion Rate"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card.Content>
          </Card>

          {/* Customer Cohort Analysis */}
          <Card>
            <Card.Header>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-green-600" />
                <Card.Title>Customer Cohort Analysis</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cohortData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: 'white', fontSize: 12 }}
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <YAxis 
                      tick={{ fill: 'white', fontSize: 12 }}
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'retention' ? formatPercentage(Number(value)) : formatNumber(Number(value)),
                        name === 'retention' ? 'Retention Rate' : 
                        name === 'newUsers' ? 'New Users' : 'Churn'
                      ]}
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    <Legend wrapperStyle={{ color: 'white' }} />
                    <Area 
                      type="monotone" 
                      dataKey="retention" 
                      stackId="1" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.8}
                      name="Retention"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="churn" 
                      stackId="1" 
                      stroke="#EF4444" 
                      fill="#EF4444" 
                      fillOpacity={0.8}
                      name="Churn"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Conversion Funnel & Performance Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conversion Funnel */}
          <Card>
            <Card.Header>
              <div className="flex items-center gap-2">
                <FunnelIcon className="w-5 h-5 text-purple-600" />
                <Card.Title>Conversion Funnel Analysis</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {conversionFunnelData.map((stage, index) => {
                  const width = conversionFunnelData[0] ? (stage.users / conversionFunnelData[0].users) * 100 : 0;
                  const conversionColor = 
                    stage.conversion >= 80 ? "bg-green-500" :
                    stage.conversion >= 50 ? "bg-yellow-500" :
                    stage.conversion >= 25 ? "bg-orange-500" : "bg-red-500";
                  
                  return (
                    <div key={stage.stage} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{stage.stage}</span>
                        <div className="text-right text-sm">
                          <span className="font-medium text-white">{formatNumber(stage.users)}</span>
                          <span className="text-slate-300 ml-2">
                            ({formatPercentage(stage.conversion)} conversion)
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div 
                            className={`h-6 rounded-full ${conversionColor} flex items-center justify-center text-white text-sm font-medium transition-all duration-500`}
                            style={{ width: `${width}%` }}
                          >
                            {width > 20 && formatNumber(stage.users)}
                          </div>
                        </div>
                        {index > 0 && stage.dropoff > 0 && (
                          <div className="text-xs text-red-300 mt-1">
                            -{formatNumber(stage.dropoff)} drop-off
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card.Content>
          </Card>

          {/* Sales Performance Matrix */}
          <Card>
            <Card.Header>
              <div className="flex items-center gap-2">
                <CursorArrowRaysIcon className="w-5 h-5 text-indigo-600" />
                <Card.Title>Sales Performance Matrix</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={performanceMatrix}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="deals" 
                      name="Number of Deals"
                      label={{ value: 'Number of Deals', position: 'insideBottom', offset: -5, fill: 'white' }}
                      tick={{ fill: 'white', fontSize: 12 }}
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <YAxis 
                      dataKey="efficiency" 
                      name="Revenue per Deal (K)"
                      label={{ value: 'Revenue per Deal (K)', angle: -90, position: 'insideLeft', fill: 'white' }}
                      tick={{ fill: 'white', fontSize: 12 }}
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name, props) => [
                        name === 'efficiency' ? `$${Number(value).toFixed(1)}K` : formatNumber(Number(value)),
                        name === 'efficiency' ? 'Avg Deal Size' : 'Deals Closed'
                      ]}
                      labelFormatter={(label, payload) => {
                        const data = payload?.[0]?.payload as { name?: string; quota?: number } | undefined;
                        return data ? `${data.name ?? ''} (${formatPercentage(data.quota ?? 0)} quota)` : '';
                      }}
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    <Scatter 
                      dataKey="efficiency" 
                      fill="#6366F1"
                      r={8}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Department Efficiency Heatmap */}
        <Card className="mb-8">
          <Card.Header>
            <Card.Title>Department Efficiency Heatmap</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {operationalMetrics.productivity.map((dept) => {
                const efficiency = dept.efficiency;
                const getEfficiencyColor = (eff: number) => {
                  if (eff >= 95) return "bg-green-500";
                  if (eff >= 90) return "bg-green-400";
                  if (eff >= 85) return "bg-yellow-400";
                  if (eff >= 80) return "bg-orange-400";
                  return "bg-red-400";
                };

                const getTextColor = (eff: number) => {
                  return eff >= 85 ? "text-white" : "text-gray-900";
                };

                return (
                  <div 
                    key={dept.department}
                    className={`p-4 rounded-lg ${getEfficiencyColor(efficiency)} ${getTextColor(efficiency)} transition-all hover:scale-105`}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-sm">{dept.department}</h4>
                      <div className="text-2xl font-bold mt-2">{formatPercentage(efficiency)}</div>
                      <div className="text-xs mt-1 opacity-90">
                        {dept.employees} employees
                      </div>
                      <div className="text-xs opacity-90">
                        Target: {formatPercentage(dept.target)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Content>
        </Card>

        {/* Predictive Analytics */}
        <Card>
          <Card.Header>
            <div className="flex items-center gap-2">
              <BanknotesIcon className="w-5 h-5 text-emerald-600" />
              <Card.Title>Predictive Revenue Forecast</Card.Title>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  ...timeSeriesData.slice(-10),
                  ...Array.from({ length: 10 }, (_, i) => {
                    const lastDataPoint = timeSeriesData[timeSeriesData.length - 1];
                    const baseRevenue = lastDataPoint?.revenue ?? 100000;
                    return {
                      date: `Future ${i + 1}`,
                      revenue: baseRevenue * (1 + (Math.random() * 0.1 + 0.05)),
                      predicted: baseRevenue * (1 + (Math.random() * 0.1 + 0.05)),
                    };
                  })
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: 'white', fontSize: 12 }}
                    stroke="rgba(255,255,255,0.3)"
                  />
                  <YAxis 
                    tickFormatter={(value: number) => formatCurrency(value)} 
                    tick={{ fill: 'white', fontSize: 12 }}
                    stroke="rgba(255,255,255,0.3)"
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatCurrency(value), 
                      name === 'revenue' ? 'Actual Revenue' : 'Predicted Revenue'
                    ]}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      backdropFilter: 'blur(8px)'
                    }}
                  />
                  <Legend wrapperStyle={{ color: 'white' }} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Historical Revenue"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted Revenue"
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg backdrop-blur-sm">
              <h4 className="font-medium text-blue-300 mb-2">AI-Powered Insights</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Revenue growth trend shows 12.5% increase over the selected period</li>
                <li>• Predicted 18% growth in the next quarter based on current trajectory</li>
                <li>• Customer acquisition cost optimization could increase profit margin by 3.2%</li>
                <li>• Seasonal patterns suggest Q4 revenue spike of 25-30%</li>
              </ul>
            </div>
          </Card.Content>
        </Card>
      </main>
    </div>
  );
} 