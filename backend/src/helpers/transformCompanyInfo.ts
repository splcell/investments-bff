import { Company } from "../types/company";

export const transformCompanyInfo = (data: any) => {
  const transformedCompany: Company = {
    symbol: data.symbol,
    marketCap: data.marketCap,
    lastDividend: data.lastDividend,
    range: data.range,
    change: data.change,
    changePercentage: data.changePercentage,
    volume: data.volume,
    averageVolume: data.averageVolume,
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
