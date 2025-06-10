
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PrinterData } from '@/lib/data';

interface PrinterSelectorProps {
  selectedBrand: string;
  selectedModel: string;
  onBrandChange: (brand: string) => void;
  onModelChange: (model: string) => void;
}

const PrinterSelector: React.FC<PrinterSelectorProps> = ({
  selectedBrand,
  selectedModel,
  onBrandChange,
  onModelChange,
}) => {
  const handleBrandChange = (brand: string) => {
    onBrandChange(brand);
    onModelChange(''); // Reset model when brand changes
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="brand-select" className="text-sm font-medium text-foreground mb-2 block">
          Printer Brand
        </Label>
        <Select value={selectedBrand} onValueChange={handleBrandChange}>
          <SelectTrigger id="brand-select" className="w-full">
            <SelectValue placeholder="Select a printer brand" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(PrinterData).map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="model-select" className="text-sm font-medium text-foreground mb-2 block">
          Printer Model
        </Label>
        <Select 
          value={selectedModel} 
          onValueChange={onModelChange}
          disabled={!selectedBrand}
        >
          <SelectTrigger id="model-select" className="w-full">
            <SelectValue placeholder="Select a printer model" />
          </SelectTrigger>
          <SelectContent>
            {selectedBrand && PrinterData[selectedBrand]?.models.map((model) => (
              <SelectItem key={model.name} value={model.name}>
                {model.name} ({model.powerConsumption}kW)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PrinterSelector;
