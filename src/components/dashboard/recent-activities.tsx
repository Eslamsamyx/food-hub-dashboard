import {
    ArrowTrendingUpIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon
} from "@heroicons/react/24/outline";
import { Card } from "~/components/ui/card";
import { formatCurrency } from "~/lib/utils";

export interface Activity {
  id: string;
  type: "success" | "warning" | "info" | "error";
  status: "success" | "warning" | "info" | "error";
  description: string;
  amount?: number;
  time: string;
}

interface RecentActivitiesProps {
  data: Activity[];
}

const getIcon = (type: Activity["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon className="h-4 w-4" />;
    case "warning":
      return <ExclamationTriangleIcon className="h-4 w-4" />;
    case "info":
      return <InformationCircleIcon className="h-4 w-4" />;
    default:
      return <ArrowTrendingUpIcon className="h-4 w-4" />;
  }
};

const getStatusColor = (status: Activity["status"]) => {
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
};

export function RecentActivities({ data = [] }: RecentActivitiesProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Recent Activities</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {data.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${getStatusColor(
                  activity.status,
                )}`}
              >
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {activity.description}
                </p>
                {activity.amount && (
                  <p className="text-sm text-emerald-300">
                    {formatCurrency(activity.amount)}
                  </p>
                )}
                <p className="text-xs text-slate-300">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 