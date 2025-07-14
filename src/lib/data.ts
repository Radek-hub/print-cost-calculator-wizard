
export interface PrinterModel {
  name: string;
  powerConsumption: number; // in kW
}

export interface PrinterBrand {
  models: PrinterModel[];
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  electricityRate: number; // per kWh
  currency: string;
}

export const PrinterData: Record<string, PrinterBrand> = {
  "Bambu Lab": {
    models: [
      { name: "A1", powerConsumption: 0.15 },
      { name: "A1 mini", powerConsumption: 0.12 },
      { name: "X1 Carbon", powerConsumption: 0.35 },
      { name: "P1P", powerConsumption: 0.25 },
      { name: "P1S", powerConsumption: 0.28 }
    ]
  },
  "Prusa": {
    models: [
      { name: "MK4", powerConsumption: 0.18 },
      { name: "MK3S+", powerConsumption: 0.15 },
      { name: "MINI+", powerConsumption: 0.12 },
      { name: "XL", powerConsumption: 0.45 },
      { name: "SL1S", powerConsumption: 0.08 }
    ]
  },
  "Creality": {
    models: [
      { name: "Ender 3 V3 SE", powerConsumption: 0.13 },
      { name: "Ender 3 V2", powerConsumption: 0.14 },
      { name: "CR-10 Smart Pro", powerConsumption: 0.25 },
      { name: "K1 Max", powerConsumption: 0.35 },
      { name: "Sermoon V1 Pro", powerConsumption: 0.22 }
    ]
  }
};

export const CountryData: Country[] = [
  { code: "PL", name: "Poland", flag: "🇵🇱", electricityRate: 1.1, currency: "PLN" },
  { code: "DE", name: "Germany", flag: "🇩🇪", electricityRate: 0.312, currency: "EUR" },
  { code: "US", name: "United States", flag: "🇺🇸", electricityRate: 0.156, currency: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", electricityRate: 0.285, currency: "GBP" },
  { code: "FR", name: "France", flag: "🇫🇷", electricityRate: 0.203, currency: "EUR" },
  { code: "IT", name: "Italy", flag: "🇮🇹", electricityRate: 0.287, currency: "EUR" },
  { code: "ES", name: "Spain", flag: "🇪🇸", electricityRate: 0.245, currency: "EUR" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", electricityRate: 0.267, currency: "EUR" },
  { code: "CA", name: "Canada", flag: "🇨🇦", electricityRate: 0.128, currency: "CAD" },
  { code: "AU", name: "Australia", flag: "🇦🇺", electricityRate: 0.258, currency: "AUD" },
  { code: "JP", name: "Japan", flag: "🇯🇵", electricityRate: 0.197, currency: "JPY" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", electricityRate: 0.089, currency: "KRW" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", electricityRate: 0.178, currency: "SEK" },
  { code: "NO", name: "Norway", flag: "🇳🇴", electricityRate: 0.142, currency: "NOK" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", electricityRate: 0.284, currency: "DKK" }
];
