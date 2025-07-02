"use client";

import { Card } from "~/components/ui/card";
import { formatCurrency, formatPercentage } from "~/lib/utils";

interface PipelineStage {
  stage: string;
  deals: number;
  value: number;
  probability: number;
}

interface SalesPipelineProps {
  data: PipelineStage[];
}

export function SalesPipeline({ data = [] }: SalesPipelineProps) {
  const totalValue = data.reduce((sum, stage) => sum + stage.value, 0);
  const weightedValue = data.reduce((sum, stage) => sum + (stage.value * stage.probability / 100), 0);
  const maxDeals = data.length > 0 ? Math.max(...data.map(stage => stage.deals)) : 0;

  return (
    <Card>
      <Card.Header>
        <Card.Title>Sales Pipeline</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {/* Pipeline Stages */}
          <div className="space-y-4">
            {data.map((stage, index) => {
              const width = (stage.deals / maxDeals) * 100;
              const probabilityColor = 
                stage.probability >= 80 ? "text-green-300" :
                stage.probability >= 50 ? "text-yellow-300" :
                "text-red-300";
              
              return (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{stage.stage}</span>
                    <span className="text-slate-300">
                      {stage.deals} deals • {formatCurrency(stage.value)}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-white/20 rounded-full h-8">
                      <div 
                        className="h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-end pr-4 transition-all duration-500 shadow-lg"
                        style={{ width: `${width}%` }}
                      >
                        <span className={`text-sm font-medium ${probabilityColor}`}>
                          {formatPercentage(stage.probability)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <span className="text-slate-300">Total Pipeline Value</span>
              <div className="text-lg font-bold text-white mt-1">
                {formatCurrency(totalValue)}
              </div>
            </div>
            <div className="text-center">
              <span className="text-slate-300">Weighted Value</span>
              <div className="text-lg font-bold text-white mt-1">
                {formatCurrency(weightedValue)}
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
} 