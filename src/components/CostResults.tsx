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

  return (
    <Card className="border-gray-200 shadow-sm bg-white">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-gray-700 flex items-center gap-2 font-bold text-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Cost breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
          <span className="font-medium text-gray-600">Energy cost:</span>
          <span className="font-semibold text-gray-800">
            {formatCurrency(results.energyCost, results.currency)}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
          <span className="font-medium text-gray-600">Filament cost:</span>
          <span className="font-semibold text-gray-800">
            {formatCurrency(results.filamentCost, results.currency)}
          </span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
            <span className="text-lg font-bold text-green-700">Total cost:</span>
            <span className="text-xl font-bold text-green-700">
              {formatCurrency(results.totalCost, results.currency)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostResults;
