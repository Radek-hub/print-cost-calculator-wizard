import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { CountryData } from '@/lib/data';
interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  useCustomRate: boolean;
  customRate: number;
  onUseCustomRateChange: (useCustom: boolean) => void;
  onCustomRateChange: (rate: number) => void;
}
const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  useCustomRate,
  customRate,
  onUseCustomRateChange,
  onCustomRateChange
}) => {
  const selectedCountryData = CountryData.find(c => c.code === selectedCountry);
  return <div className="space-y-4">
      <div>
        <Label htmlFor="country-select" className="text-sm font-medium text-foreground mb-2 block">
          Country / region
        </Label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger id="country-select" className="w-full">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {CountryData.map(country => <SelectItem key={country.code} value={country.code}>
                {country.flag} {country.name} ({country.electricityRate} {country.currency}/kWh)
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {selectedCountryData && <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <Label htmlFor="custom-rate-toggle" className="text-sm font-medium text-gray-700">
              Use custom electricity rate
            </Label>
            <Switch id="custom-rate-toggle" checked={useCustomRate} onCheckedChange={onUseCustomRateChange} />
          </div>

          {useCustomRate ? <div className="space-y-2">
              <Label htmlFor="custom-rate-input" className="text-sm font-medium text-gray-700">
                Custom rate ({selectedCountryData.currency}/kWh)
              </Label>
              <Input id="custom-rate-input" type="number" step="0.001" min="0" value={customRate || ''} onChange={e => onCustomRateChange(parseFloat(e.target.value) || 0)} placeholder={`Enter rate (e.g., ${selectedCountryData.electricityRate})`} className="w-full" />
              <div className="text-xs text-gray-500">
                Default rate: {selectedCountryData.electricityRate} {selectedCountryData.currency}/kWh
              </div>
            </div> : <div className="text-sm text-gray-600">
              Using default rate: <span className="font-semibold">{selectedCountryData.electricityRate} {selectedCountryData.currency}/kWh</span>
            </div>}
        </div>}
    </div>;
};
export default CountrySelector;