import { Company } from "../types/company";
import { convertData } from "./convertData";

export const transformCompanyInfo = (data: any) => {
  const transformedCompany: Company = {
    symbol: data.symbol,
    marketCap: String(convertData(data.marketCap)),
    lastDividend: data.lastDividend,
    range: data.range,
    volume: Number(convertData(data.volume)),
    averageVolume: Number(convertData(data.averageVolume)),
    companyName: data.companyName,
    currency: data.currency,
    isin: data.isin,
    exchange: data.exchange,
    industry: data.industry,
    website: data.website,
    description: data.description,
    ceo: data.ceo,
    sector: data.sector,
    country: data.country,
    fullTimeEmployees: data.fullTimeEmployees,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    image: data.image,
    ipoDate: data.ipoDate
  };

  return transformedCompany;
};
