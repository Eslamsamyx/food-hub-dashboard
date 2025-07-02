import {
    ArrowTrendingUpIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { Card } from "~/components/ui/card";
import { formatCurrency } from "~/lib/utils";

interface Alert {
  id: number;
  type: "opportunity" | "risk" | "milestone" | "market" | "compliance";
  description: string;
  amount?: number;
  time: string;
  status: "success" | "warning" | "info";
  priority: "high" | "medium" | "low";
}

interface ExecutiveAlertsProps {
  data: Alert[];
}

const getIcon = (type: Alert["type"]) => {
  const iconClass = "h-5 w-5";
  switch (type) {
    case "opportunity":
      return <ArrowTrendingUpIcon className={iconClass} />;
    case "risk":
      return <ExclamationTriangleIcon className={iconClass} />;
    case "milestone":
      return <CheckCircleIcon className={iconClass} />;
    case "market":
      return <BuildingOfficeIcon className={iconClass} />;
    case "compliance":
      return <ShieldCheckIcon className={iconClass} />;
    default:
      return <ArrowTrendingUpIcon className={iconClass} />;
  }
};

const getStatusColor = (status: Alert["status"], priority: Alert["priority"]) => {
  const baseColor = (() => {
    switch (status) {
      case "success":
        return "text-green-300 bg-green-500/20 border border-green-400/30";
      case "warning":
        return "text-yellow-300 bg-yellow-500/20 border border-yellow-400/30";
      case "info":
        return "text-blue-300 bg-blue-500/20 border border-blue-400/30";
      default:
        return "text-slate-300 bg-slate-500/20 border border-slate-400/30";
    }
  })();

  // Add priority ring for high priority items
  return priority === "high" ? `${baseColor} ring-2 ring-red-400/50` : baseColor;
};

const getPriorityBadge = (priority: Alert["priority"]) => {
  switch (priority) {
    case "high":
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-400/30">High</span>;
    case "medium":
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">Medium</span>;
    case "low":
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-400/30">Low</span>;
    default:
      return null;
  }
};

export function ExecutiveAlerts({ data }: ExecutiveAlertsProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Executive Alerts</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {data.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${getStatusColor(
                  alert.status,
                  alert.priority,
                )}`}
              >
                {getIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-white">
                    {alert.description}
                  </p>
                  {getPriorityBadge(alert.priority)}
                </div>
                {alert.amount && (
                  <p className="text-sm text-emerald-300 font-semibold">
                    {formatCurrency(alert.amount)}
                  </p>
                )}
                <p className="text-xs text-slate-300">
                  {alert.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 