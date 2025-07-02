"use client";

import {
    ArrowDownTrayIcon,
    ArrowTrendingUpIcon,
    CalendarIcon,
    ChartBarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";

import { useState } from "react";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { Card } from "~/components/ui/card";
import { executiveReports, financialMetrics, marketData, riskAssessment } from "~/lib/mock-data";
import { formatCurrency, formatNumber, formatPercentage } from "~/lib/utils";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-500/20 text-green-300 border border-green-400/30";
      case "Draft": return "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30";
      case "In Review": return "bg-blue-500/20 text-blue-300 border border-blue-400/30";
      default: return "bg-slate-500/20 text-slate-300 border border-slate-400/30";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 8) return "bg-red-100 text-red-800";
    if (score >= 6) return "bg-yellow-100 text-yellow-800";
    if (score >= 4) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
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
          {/* Header */}
          <div className="mb-8 backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Executive Reports</h1>
            <p className="mt-2 text-slate-200 font-medium">
              Comprehensive reports and insights to support strategic decision making.
            </p>
          </div>

          {/* Executive Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {executiveReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Card.Header>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                      <div>
                        <Card.Title className="text-lg text-white">{report.title}</Card.Title>
                        <p className="text-sm text-slate-300 mt-1">
                          {report.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Last generated: {report.lastGenerated}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <UserGroupIcon className="w-4 h-4" />
                      <span>{report.recipients.join(", ")}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className="text-xs text-slate-300">
                        {report.frequency}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {report.keyMetrics.map((metric, index) => (
                        <span key={index} className="px-2 py-1 bg-white/10 text-slate-300 text-xs rounded border border-white/20">
                          {metric}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        <EyeIcon className="w-4 h-4" />
                        View Report
                      </button>
                      <button className="flex items-center justify-center gap-2 px-3 py-2 border border-white/20 text-slate-300 text-sm rounded-lg hover:bg-white/10 hover:text-white transition-colors">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>

          {/* Risk Assessment */}
          <Card className="mb-8">
            <Card.Header>
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-6 h-6 text-orange-600" />
                <Card.Title>Risk Assessment Dashboard</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-3 font-medium text-white">Risk Category</th>
                      <th className="text-left p-3 font-medium text-white">Risk Description</th>
                      <th className="text-center p-3 font-medium text-white">Probability</th>
                      <th className="text-center p-3 font-medium text-white">Impact</th>
                      <th className="text-center p-3 font-medium text-white">Risk Score</th>
                      <th className="text-left p-3 font-medium text-white">Mitigation Strategy</th>
                      <th className="text-center p-3 font-medium text-white">Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskAssessment.map((risk, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-3">
                          <span className="font-medium text-white">{risk.category}</span>
                        </td>
                        <td className="p-3 text-slate-300">{risk.risk}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            risk.probability === 'High' ? 'bg-red-500/20 text-red-300 border-red-400/30' :
                            risk.probability === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                            'bg-green-500/20 text-green-300 border-green-400/30'
                          }`}>
                            {risk.probability}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            risk.impact === 'Very High' || risk.impact === 'High' ? 'bg-red-500/20 text-red-300 border-red-400/30' :
                            risk.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                            'bg-green-500/20 text-green-300 border-green-400/30'
                          }`}>
                            {risk.impact}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.score)}`}>
                            {risk.score.toFixed(1)}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300 max-w-xs truncate" title={risk.mitigation}>
                          {risk.mitigation}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded font-medium border border-blue-400/30">
                            {risk.owner}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Content>
          </Card>

          {/* Market Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <ChartBarIcon className="w-6 h-6 text-green-600" />
                  <Card.Title>Competitive Analysis</Card.Title>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {marketData.competitors.map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className={`font-medium ${competitor.company === 'Our Company' ? 'text-blue-300' : 'text-white'}`}>
                          {competitor.company}
                        </h4>
                        <p className="text-sm text-slate-300">
                          {formatNumber(competitor.employees)} employees
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">{formatPercentage(competitor.marketShare)} market share</div>
                        <div className="text-sm text-slate-300">
                          {formatCurrency(competitor.revenue)} revenue
                        </div>
                        <div className={`text-sm font-medium ${competitor.growth > 20 ? 'text-green-300' : competitor.growth > 10 ? 'text-yellow-300' : 'text-red-300'}`}>
                          +{formatPercentage(competitor.growth)} growth
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600" />
                  <Card.Title>Market Trends</Card.Title>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {marketData.trends.map((trend, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{trend.trend}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          trend.impact === 'High' ? 'bg-red-500/20 text-red-300 border-red-400/30' :
                          trend.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                          'bg-green-500/20 text-green-300 border-green-400/30'
                        }`}>
                          {trend.impact} Impact
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-300">
                        <span>Timeline: {trend.timeline}</span>
                        <span>Probability: {trend.probability}%</span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full shadow-sm" 
                            style={{ width: `${trend.probability}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Financial Summary */}
          <Card>
            <Card.Header>
              <Card.Title>Quarterly Financial Performance</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-3 font-medium text-white">Quarter</th>
                      <th className="text-right p-3 font-medium text-white">Revenue</th>
                      <th className="text-right p-3 font-medium text-white">Profit</th>
                      <th className="text-right p-3 font-medium text-white">Margin</th>
                      <th className="text-right p-3 font-medium text-white">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialMetrics.quarterly.map((quarter, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-3 font-medium text-white">{quarter.quarter}</td>
                        <td className="p-3 text-right font-medium text-white">{formatCurrency(quarter.revenue)}</td>
                        <td className="p-3 text-right text-slate-300">{formatCurrency(quarter.profit)}</td>
                        <td className="p-3 text-right text-slate-300">{formatPercentage(quarter.margin)}</td>
                        <td className="p-3 text-right">
                          <span className={`font-medium ${quarter.growth > 20 ? 'text-green-300' : quarter.growth > 10 ? 'text-yellow-300' : 'text-red-300'}`}>
                            +{formatPercentage(quarter.growth)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Content>
          </Card>
        </main>
      </div>
  );
} 