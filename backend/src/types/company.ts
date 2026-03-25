import { Ratios } from "./ratios";

export type Company =  {
  symbol: string;
  marketCap: string | number;
  lastDividend: number;
  range: string;
  volume: number;
  averageVolume: number;
  companyName: string;
  currency: string;
  isin: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  image: string;
  ipoDate: string;
  ratios?: Ratios;
}
