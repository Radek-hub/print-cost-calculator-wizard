
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PrinterSelector from '@/components/PrinterSelector';
import CountrySelector from '@/components/CountrySelector';
import TimeSelector from '@/components/TimeSelector';
import FilamentInputs from '@/components/FilamentInputs';
import CostResults from '@/components/CostResults';
import { PrinterData, CountryData } from '@/lib/data';

interface CalculationResult {
  energyCost: number;
  filamentCost: number;
  totalCost: number;
  currency: string;
}

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [spoolCost, setSpoolCost] = useState(0);
  const [printWeight, setPrintWeight] = useState(0);
  const [currency, setCurrency] = useState('PLN');
  const [results, setResults] = useState<CalculationResult | null>(null);

  const isFormValid = () => {
    return selectedModel && 
           selectedCountry && 
           (hours > 0 || minutes > 0) && 
           spoolCost > 0 && 
           printWeight > 0;
  };

  const calculateCost = () => {
    if (!isFormValid()) return;

    const printer = PrinterData[selectedBrand]?.models.find(m => m.name === selectedModel);
    const country = CountryData.find(c => c.code === selectedCountry);

    if (!printer || !country) return;

    const totalTimeHours = hours + minutes / 60;
    const energyCost = printer.powerConsumption * totalTimeHours * country.electricityRate;
    const filamentCost = spoolCost / 1000 * printWeight;
    const totalCost = energyCost + filamentCost;

    setResults({
      energyCost,
      filamentCost,
      totalCost,
      currency: country.currency
    });
  };

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const country = CountryData.find(c => c.code === countryCode);
    if (country) {
      setCurrency(country.currency);
    }
  };

  // Default results with 0 values
  const defaultResults = {
    energyCost: 0,
    filamentCost: 0,
    totalCost: 0,
    currency: currency
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl text-slate-800 font-extrabold">3D Print Cost Calculator</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Calculate the total cost of your 3D prints including energy consumption, filament usage, and materials
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
          {/* Left side - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-lg text-slate-700 flex items-center gap-2 font-bold">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Printer Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <PrinterSelector 
                  selectedBrand={selectedBrand} 
                  selectedModel={selectedModel} 
                  onBrandChange={setSelectedBrand} 
                  onModelChange={setSelectedModel} 
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-lg text-slate-700 flex items-center gap-2 font-bold">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Location & Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CountrySelector 
                  selectedCountry={selectedCountry} 
                  onCountryChange={handleCountryChange} 
                />
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-slate-200 shadow-sm bg-white">
                <CardHeader className="pb-4 border-b border-slate-100">
                  <CardTitle className="text-lg text-slate-700 flex items-center gap-2 font-bold">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Print Duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <TimeSelector 
                    hours={hours} 
                    minutes={minutes} 
                    onHoursChange={setHours} 
                    onMinutesChange={setMinutes} 
                  />
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm bg-white">
                <CardHeader className="pb-4 border-b border-slate-100">
                  <CardTitle className="text-lg text-slate-700 flex items-center gap-2 font-bold">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Material Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <FilamentInputs 
                    spoolCost={spoolCost} 
                    printWeight={printWeight} 
                    currency={currency} 
                    onSpoolCostChange={setSpoolCost} 
                    onPrintWeightChange={setPrintWeight} 
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Calculate button and results */}
          <div className="space-y-6">
            <div className="sticky top-8">
              <div className="text-center mb-6">
                <Button 
                  onClick={calculateCost} 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg shadow-lg transition-all duration-200 hover:shadow-xl" 
                  disabled={!isFormValid()}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Total Cost
                </Button>
              </div>

              <CostResults results={results || defaultResults} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
