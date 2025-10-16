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
      <div className="container mx-auto px-4 max-w-[960px] py-[16px]">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 my-0 py-0">
            <img src="/lovable-uploads/df2c7151-598d-430b-9318-0e5a728a54f6.png" alt="SliceCal Logo" className="w-[120px] h-[120px]" />
            <h1 className="text-4xl font-extrabold text-indigo-600">SliceCal</h1>
          </div>
          <p className="max-w-2xl mx-auto font-thin text-slate-800 text-2xl">The smart way to price your 3D prints</p>
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
            <div className="sticky top-8">
              <div className="text-center mb-6">
                <Button onClick={calculateCost} size="lg" disabled={!isFormValid()} className="w-full text-white font-semibold py-9 text-lg shadow-lg transition-all duration-200 hover:shadow-xl bg-indigo-700 hover:bg-indigo-600">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate total cost
                </Button>
              </div>

              <CostResults results={results || defaultResults} />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;