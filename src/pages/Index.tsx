
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
  const [spoolCost, setSpoolCost] = useState(90);
  const [printWeight, setPrintWeight] = useState(220);
  const [currency, setCurrency] = useState('PLN');
  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculateCost = () => {
    if (!selectedModel || !selectedCountry) return;

    const printer = PrinterData[selectedBrand]?.models.find(m => m.name === selectedModel);
    const country = CountryData.find(c => c.code === selectedCountry);
    
    if (!printer || !country) return;

    const totalTimeHours = hours + minutes / 60;
    const energyCost = printer.powerConsumption * totalTimeHours * country.electricityRate;
    const filamentCost = (spoolCost / 1000) * printWeight;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">3D Print Cost Calculator</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate the total cost of your 3D prints including energy consumption, filament usage, and materials
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-primary">Printer Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <PrinterSelector
                  selectedBrand={selectedBrand}
                  selectedModel={selectedModel}
                  onBrandChange={setSelectedBrand}
                  onModelChange={setSelectedModel}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-primary">Location & Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onCountryChange={handleCountryChange}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-primary">Print Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <TimeSelector
                  hours={hours}
                  minutes={minutes}
                  onHoursChange={setHours}
                  onMinutesChange={setMinutes}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-primary">Material Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <FilamentInputs
                  spoolCost={spoolCost}
                  printWeight={printWeight}
                  currency={currency}
                  onSpoolCostChange={setSpoolCost}
                  onPrintWeightChange={setPrintWeight}
                />
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={calculateCost}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                disabled={!selectedModel || !selectedCountry}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Total Cost
              </Button>
            </div>

            {results && (
              <CostResults results={results} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
