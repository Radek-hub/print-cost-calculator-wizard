import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
interface FilamentInputsProps {
  spoolCost: number;
  printWeight: number;
  currency: string;
  onSpoolCostChange: (cost: number) => void;
  onPrintWeightChange: (weight: number) => void;
}
const FilamentInputs: React.FC<FilamentInputsProps> = ({
  spoolCost,
  printWeight,
  currency,
  onSpoolCostChange,
  onPrintWeightChange
}) => {
  return <div className="space-y-4">
      <div>
        <Label htmlFor="spool-cost" className="text-sm font-medium text-foreground mb-2 block">
          Filament Spool Cost (1kg)
        </Label>
        <div className="relative">
          <Input id="spool-cost" type="number" value={spoolCost} onChange={e => onSpoolCostChange(parseFloat(e.target.value) || 0)} className="pr-16" placeholder="90" />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
            {currency}
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="print-weight" className="text-sm font-medium text-foreground mb-2 block">
          Print Weight
        </Label>
        <div className="relative">
          <Input id="print-weight" type="number" value={printWeight} onChange={e => onPrintWeightChange(parseFloat(e.target.value) || 0)} className="pr-12" placeholder="220" />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">gr</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Cost per gram: {(spoolCost / 1000).toFixed(3)} {currency}/g
      </div>
    </div>;
};
export default FilamentInputs;