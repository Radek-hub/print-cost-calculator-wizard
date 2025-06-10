
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

const CostResults: React.FC<CostResultsProps> = ({ results }) => {
  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toFixed(2)} ${currency}`;
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-primary">Cost Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
          <span className="font-medium text-foreground">Energy Cost:</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(results.energyCost, results.currency)}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
          <span className="font-medium text-foreground">Filament Cost:</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(results.filamentCost, results.currency)}
          </span>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
            <span className="text-lg font-bold text-primary">Total Cost:</span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(results.totalCost, results.currency)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostResults;
