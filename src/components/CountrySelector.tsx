
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CountryData } from '@/lib/data';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  return (
    <div>
      <Label htmlFor="country-select" className="text-sm font-medium text-foreground mb-2 block">
        Country / Region
      </Label>
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger id="country-select" className="w-full">
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent>
          {CountryData.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.flag} {country.name} ({country.electricityRate} {country.currency}/kWh)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;
