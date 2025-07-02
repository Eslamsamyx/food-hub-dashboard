"use client";

import { useState } from "react";
import { BrandOrdersCards } from "~/components/dashboard/brand-orders-cards";
import { CompanyPerformance } from "~/components/dashboard/company-performance";
import { CustomerSegments } from "~/components/dashboard/customer-segments";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { DataSourceSelector } from "~/components/dashboard/data-source-selector";
import { ExecutiveAlerts } from "~/components/dashboard/executive-alerts";
import { IndustryDistribution } from "~/components/dashboard/industry-distribution";
import { KPICard } from "~/components/dashboard/kpi-card";
import { OperationalEfficiency } from "~/components/dashboard/operational-efficiency";
import { RevenueChart } from "~/components/dashboard/revenue-chart";
import { SalesPipeline } from "~/components/dashboard/sales-pipeline";
import { TopCompanies } from "~/components/dashboard/top-companies";
import {
    companyPerformance,
    executiveAlerts,
    getKPIData,
    industryDistribution,
    revenueData,
    salesMetrics,
    topCompanies
} from "~/lib/mock-data";

export default function HomePage() {
  const [selectedDataSource, setSelectedDataSource] = useState("all");
  const kpiData = getKPIData(selectedDataSource);

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
        
        <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome Section with Food Hub Branding */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-4xl">🍽️</div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Food Hub
                </h1>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Welcome back, CEO!
              </h2>
              <p className="mt-2 text-slate-200 font-medium">
                Here&apos;s your multi-brand restaurant performance and key insights for strategic decision making.
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20 shadow-lg">
              <DataSourceSelector 
                selectedSource={selectedDataSource}
                onSourceChange={setSelectedDataSource}
              />
            </div>
          </div>

          {/* Brand Daily Orders Cards */}
          <div className="mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Daily Orders by Brand</h2>
              <p className="text-slate-300 font-medium">Real-time order tracking across all Food Hub brands</p>
            </div>
            <BrandOrdersCards />
          </div>

          {/* KPI Cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi) => (
              <KPICard key={`kpi-${kpi.title}`} {...kpi} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Revenue Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RevenueChart data={revenueData} />
            </div>
            
            {/* Industry Distribution */}
            <div className="lg:col-span-1">
              <IndustryDistribution data={industryDistribution} />
            </div>
          </div>

          {/* Sales Pipeline */}
          <div className="mb-8">
            <SalesPipeline data={salesMetrics.pipeline} />
          </div>

          {/* Customer Segments */}
          <div className="mb-8">
            <CustomerSegments />
          </div>

          {/* Operational Efficiency */}
          <div className="mb-8">
            <OperationalEfficiency />
          </div>

          {/* Secondary Charts and Tables */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Company Performance */}
            <CompanyPerformance data={companyPerformance} />
            
            {/* Executive Alerts */}
            <ExecutiveAlerts data={executiveAlerts} />
          </div>

          {/* Top Companies Table */}
          <div className="mb-8">
            <TopCompanies data={topCompanies} />
          </div>

          {/* Performance Metrics - Updated for Food Hub */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                🍕 Brand Performance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">Top Performing Brand</span>
                  <span className="text-sm font-semibold text-emerald-300">DipnDip</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">Fastest Growing</span>
                  <span className="text-sm font-semibold text-emerald-300">Procuts (+15.4%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">Average Delivery Time</span>
                  <span className="text-sm font-semibold text-blue-300">28 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">Kitchen Efficiency</span>
                  <span className="text-sm font-semibold text-emerald-300">94.2%</span>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                📊 Market Insights
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">Food Delivery Growth</span>
                  <span className="text-sm font-semibold text-emerald-300">+32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">Healthy Options Demand</span>
                  <span className="text-sm font-semibold text-emerald-300">+18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">Peak Hours</span>
                  <span className="text-sm font-semibold text-amber-300">12-2PM, 7-9PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">Customer Retention</span>
                  <span className="text-sm font-semibold text-blue-300">87.3%</span>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                🎯 Strategic Goals
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300 font-medium">Brand Expansion</span>
                    <span className="text-sm font-semibold text-white">78%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg" style={{ width: "78%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300 font-medium">Digital Integration</span>
                    <span className="text-sm font-semibold text-white">92%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg" style={{ width: "92%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300 font-medium">Sustainability Goals</span>
                    <span className="text-sm font-semibold text-white">65%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 shadow-lg" style={{ width: "65%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}
