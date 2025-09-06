import React, { useState, useEffect } from 'react';
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
  const [inputValue, setInputValue] = useState('');

  // Sync input value with customRate prop
  useEffect(() => {
    setInputValue(customRate > 0 ? customRate.toString() : '');
  }, [customRate]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === '') {
      onCustomRateChange(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        onCustomRateChange(numValue);
      }
    }
  };
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
        <div className="text-xs text-muted-foreground mt-2 space-y-1">
          <p className="my-0 py-0 text-slate-900">⚡ Average electricity price in your country.</p>
          <p className="my-[24px]">Prices vary depending on your energy plan, provider, and time of day - so this is just an estimate, but pretty close ✌️</p>
          
          
        </div>
      </div>

      {selectedCountryData && <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <Label htmlFor="custom-rate-toggle" className="text-sm font-medium text-gray-700">
              Use custom electricity rate
            </Label>
            <Switch id="custom-rate-toggle" checked={useCustomRate} onCheckedChange={onUseCustomRateChange} />
          </div>

          {useCustomRate && <div className="space-y-2">
              <Label htmlFor="custom-rate-input" className="text-sm font-medium text-gray-700">
                Custom rate ({selectedCountryData.currency}/kWh)
              </Label>
              <Input id="custom-rate-input" type="number" step="0.001" value={inputValue} onChange={handleInputChange} placeholder={`Enter rate (e.g., ${selectedCountryData.electricityRate})`} className="w-full" />
            </div>}
        </div>}
    </div>;
};
export default CountrySelector;