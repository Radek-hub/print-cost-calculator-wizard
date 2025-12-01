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
  const [useCustomElectricityRate, setUseCustomElectricityRate] = useState(false);
  const [customElectricityRate, setCustomElectricityRate] = useState(0);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const isFormValid = () => {
    const hasValidRate = useCustomElectricityRate ? customElectricityRate > 0 : true;
    return selectedModel && selectedCountry && (hours > 0 || minutes > 0) && spoolCost > 0 && printWeight > 0 && hasValidRate;
  };
  const calculateCost = () => {
    if (!isFormValid()) return;
    const printer = PrinterData[selectedBrand]?.models.find(m => m.name === selectedModel);
    const country = CountryData.find(c => c.code === selectedCountry);
    if (!printer || !country) return;
    const totalTimeHours = hours + minutes / 60;
    const electricityRate = useCustomElectricityRate ? customElectricityRate : country.electricityRate;
    const energyCost = printer.powerConsumption * totalTimeHours * electricityRate;
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
  return <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      {/* Modern navigation bar with glassmorphism effect */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 max-w-[960px] py-4">
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/slicecal-logo-transparent.png" alt="SliceCal Logo" className="w-[58px] h-[58px]" />
            <h1 className="text-2xl font-extrabold text-indigo-800">SliceCal</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-[960px] py-8">
        <div className="text-center mb-8">
          <p className="max-w-2xl mx-auto font-thin text-slate-800 text-2xl">A smart way to calculate 3D printing costs</p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-5">
          {/* Left side - Inputs (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-lg text-gray-700 flex items-center gap-2 font-bold">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Printer selection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <PrinterSelector selectedBrand={selectedBrand} selectedModel={selectedModel} onBrandChange={setSelectedBrand} onModelChange={setSelectedModel} />
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-lg text-gray-700 flex items-center gap-2 font-bold">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Location - electricity rate
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CountrySelector selectedCountry={selectedCountry} onCountryChange={handleCountryChange} useCustomRate={useCustomElectricityRate} customRate={customElectricityRate} onUseCustomRateChange={setUseCustomElectricityRate} onCustomRateChange={setCustomElectricityRate} />
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4 border-b border-gray-100">
                  <CardTitle className="text-lg text-gray-700 flex items-center gap-2 font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Print duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <TimeSelector hours={hours} minutes={minutes} onHoursChange={setHours} onMinutesChange={setMinutes} />
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4 border-b border-gray-100">
                  <CardTitle className="text-lg text-gray-700 flex items-center gap-2 font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Material costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <FilamentInputs spoolCost={spoolCost} printWeight={printWeight} currency={currency} onSpoolCostChange={setSpoolCost} onPrintWeightChange={setPrintWeight} />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Calculate button and results (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="sticky top-24">
              <div className="text-center mb-6">
                <Button onClick={calculateCost} size="lg" disabled={!isFormValid()} className="w-full text-white font-semibold py-9 text-lg shadow-lg transition-all duration-200 hover:shadow-xl bg-indigo-800 hover:bg-indigo-700">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate total cost
                </Button>
              </div>

              <CostResults results={results || defaultResults} />
              
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  Share your thoughts or suggestions 👉{' '}
                  <a href="https://forms.gle/D6G4vWLwT6mRch5D8" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 font-semibold underline">
                    Leave feedback
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;