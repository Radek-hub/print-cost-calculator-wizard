import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface CostResultsProps {
  results: {
    energyCost: number;
    filamentCost: number;
    totalCost: number;
    currency: string;
  };
}
const CostResults: React.FC<CostResultsProps> = ({
  results
}) => {
  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toFixed(2)} ${currency}`;
  };
  return <Card className="border-slate-200 shadow-sm bg-white">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="text-slate-700 flex items-center gap-2 font-bold text-lg">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          Cost Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
          <span className="font-medium text-slate-600">Energy Cost:</span>
          <span className="font-semibold text-slate-800">
            {formatCurrency(results.energyCost, results.currency)}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
          <span className="font-medium text-slate-600">Filament Cost:</span>
          <span className="font-semibold text-slate-800">
            {formatCurrency(results.filamentCost, results.currency)}
          </span>
        </div>
        
        <div className="border-t border-slate-200 pt-4">
          <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="text-lg font-bold text-emerald-700">Total Cost:</span>
            <span className="text-xl font-bold text-emerald-700">
              {formatCurrency(results.totalCost, results.currency)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default CostResults;