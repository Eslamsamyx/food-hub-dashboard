"use client";

import {
    ArrowDownTrayIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    DocumentChartBarIcon,
    DocumentTextIcon,
    ExclamationCircleIcon,
    PlayIcon,
    TableCellsIcon
} from "@heroicons/react/24/outline";

import { useState } from "react";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { DataSourceSelector } from "~/components/dashboard/data-source-selector";
import { Card } from "~/components/ui/card";

const exportTemplates = [
  {
    id: "executive-summary",
    name: "Executive Summary Report",
    description: "High-level overview with key metrics and insights for C-suite",
    type: "report",
    formats: ["PDF", "PowerPoint", "Word"],
    size: "2.4 MB",
    lastExported: "2024-01-22",
    automated: true,
    icon: DocumentTextIcon,
  },
  {
    id: "financial-data",
    name: "Financial Data Export",
    description: "Complete financial metrics, revenue, and cost analysis",
    type: "data",
    formats: ["Excel", "CSV", "JSON"],
    size: "850 KB",
    lastExported: "2024-01-21",
    automated: false,
    icon: TableCellsIcon,
  },
  {
    id: "sales-dashboard",
    name: "Sales Dashboard",
    description: "Interactive sales performance dashboard with charts",
    type: "dashboard",
    formats: ["PDF", "HTML", "PNG"],
    size: "1.2 MB",
    lastExported: "2024-01-20",
    automated: true,
    icon: ChartBarIcon,
  },
  {
    id: "customer-analytics",
    name: "Customer Analytics Report",
    description: "Detailed customer segmentation and behavior analysis",
    type: "analytics",
    formats: ["PDF", "Excel", "CSV"],
    size: "3.1 MB",
    lastExported: "2024-01-19",
    automated: false,
    icon: DocumentChartBarIcon,
  },
];

const exportHistory = [
  { id: 1, template: "Executive Summary Report", format: "PDF", date: "2024-01-22 09:30", size: "2.4 MB", status: "completed", user: "CEO Dashboard" },
  { id: 2, template: "Sales Dashboard", format: "HTML", date: "2024-01-22 08:15", size: "1.2 MB", status: "completed", user: "Sales Team" },
  { id: 3, template: "Financial Data Export", format: "Excel", date: "2024-01-21 16:45", size: "850 KB", status: "completed", user: "Finance Team" },
  { id: 4, template: "Customer Analytics Report", format: "PDF", date: "2024-01-21 14:20", size: "3.1 MB", status: "failed", user: "Marketing Team" },
  { id: 5, template: "Operational Metrics", format: "CSV", date: "2024-01-21 11:00", size: "650 KB", status: "completed", user: "Operations Team" },
];

export default function ExportsPage() {
  const [selectedDataSource, setSelectedDataSource] = useState("all");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (templateId: string, format: string) => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    alert(`Export completed: ${templateId} in ${format} format`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "report": return "bg-blue-500/20 text-blue-300 border border-blue-400/30";
      case "data": return "bg-green-500/20 text-green-300 border border-green-400/30";
      case "dashboard": return "bg-purple-500/20 text-purple-300 border border-purple-400/30";
      case "analytics": return "bg-orange-500/20 text-orange-300 border border-orange-400/30";
      default: return "bg-slate-500/20 text-slate-300 border border-slate-400/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-300";
      case "failed": return "text-red-300";
      case "processing": return "text-yellow-300";
      default: return "text-slate-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircleIcon;
      case "failed": return ExclamationCircleIcon;
      default: return ClockIcon;
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
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Data Exports</h1>
              <p className="mt-2 text-slate-200 font-medium">
                Export reports, dashboards, and data in various formats for analysis and sharing.
              </p>
            </div>
            <DataSourceSelector 
              selectedSource={selectedDataSource}
              onSourceChange={setSelectedDataSource}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-blue-200 bg-blue-50">
              <Card.Content className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Quick Report</h3>
                    <p className="text-sm text-blue-700">Generate executive summary</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleExport("executive-summary", "PDF")}
                  disabled={isExporting}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isExporting ? "Exporting..." : "Export PDF"}
                </button>
              </Card.Content>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <Card.Content className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <TableCellsIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Data Export</h3>
                    <p className="text-sm text-green-700">Download raw data</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleExport("financial-data", "Excel")}
                  disabled={isExporting}
                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {isExporting ? "Exporting..." : "Export Excel"}
                </button>
              </Card.Content>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <Card.Content className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900">Dashboard</h3>
                    <p className="text-sm text-purple-700">Export current view</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleExport("sales-dashboard", "HTML")}
                  disabled={isExporting}
                  className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {isExporting ? "Exporting..." : "Export HTML"}
                </button>
              </Card.Content>
            </Card>
          </div>

          <Card className="mb-8">
            <Card.Header>
              <Card.Title>Export Templates</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exportTemplates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <div key={template.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/10 rounded-lg border border-white/20">
                            <IconComponent className="w-6 h-6 text-slate-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{template.name}</h3>
                            <p className="text-sm text-slate-300 mt-1">{template.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                            {template.type}
                          </span>
                          {template.automated && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-400/30">
                              Auto
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-300 mb-4">
                        <span>Size: {template.size}</span>
                        <span>Last: {template.lastExported}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.formats.map((format) => (
                          <button
                            key={format}
                            onClick={() => handleExport(template.id, format)}
                            disabled={isExporting}
                            className="px-3 py-1 border border-white/20 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-50 transition-colors"
                          >
                            <ArrowDownTrayIcon className="w-4 h-4 inline mr-1" />
                            {format}
                          </button>
                        ))}
                      </div>

                      {template.automated && (
                        <div className="flex items-center gap-2 text-sm text-blue-300">
                          <PlayIcon className="w-4 h-4" />
                          <span>Automated export enabled</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-slate-300" />
                <Card.Title>Export History</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Template</th>
                      <th className="text-left p-3 font-medium">Format</th>
                      <th className="text-left p-3 font-medium">Date & Time</th>
                      <th className="text-left p-3 font-medium">Size</th>
                      <th className="text-center p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Requested By</th>
                      <th className="text-center p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportHistory.map((export_) => {
                      const StatusIcon = getStatusIcon(export_.status);
                      return (
                        <tr key={export_.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-3 font-medium text-white">{export_.template}</td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-white/10 text-slate-300 rounded text-xs font-medium border border-white/20">
                              {export_.format}
                            </span>
                          </td>
                          <td className="p-3 text-slate-300">{export_.date}</td>
                          <td className="p-3 text-slate-300">{export_.size}</td>
                          <td className="p-3 text-center">
                            <div className={`flex items-center justify-center gap-1 ${getStatusColor(export_.status)}`}>
                              <StatusIcon className="w-4 h-4" />
                              <span className="capitalize text-xs font-medium">{export_.status}</span>
                            </div>
                          </td>
                          <td className="p-3 text-slate-300">{export_.user}</td>
                          <td className="p-3 text-center">
                            {export_.status === "completed" ? (
                              <button className="text-blue-300 hover:text-blue-100 text-sm font-medium">
                                Download
                              </button>
                            ) : export_.status === "failed" ? (
                              <button className="text-orange-300 hover:text-orange-100 text-sm font-medium">
                                Retry
                              </button>
                            ) : (
                              <span className="text-slate-400 text-sm">Processing...</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card.Content>
          </Card>
        </main>
      </div>
  );
} 