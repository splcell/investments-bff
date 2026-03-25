import 'dotenv/config'
import { NotFoundError } from '../errors/not-found-error';
import { Ratios } from '../types/ratios';
import { convertData } from './convertData';
import { convertToPercent } from './convertToPercent';

const {THIRD_BASE_URL, THIRD_API_KEY} = process.env;
const TTM = " | " + "TTM"

export const getCompanyRatios = async(symbol: string):Promise<Ratios> => {
  const response = await fetch(THIRD_BASE_URL + `query?function=OVERVIEW&symbol=${symbol}&apikey=${THIRD_API_KEY}`)

  if(!response.ok){
    throw new NotFoundError("Ratios not Found")
  }

  const data = await response.json()

  const transformedRatios: Ratios = {
    "EBITDA": convertData(data.EBITDA),
    "P/E": data.PERatio,
    "PEG": data.PEGRatio,
    "Dividend Per Share": data.DividendPerShare,
    "Dividend Yield": convertToPercent(data.DividendYield),
    "EPS": data.EPS,
    "Revenue Per Share": data.RevenuePerShareTTM + TTM,
    "Profit Margin": convertToPercent(data.ProfitMargin),
    "Operating Margin": convertToPercent(data.OperatingMarginTTM) + TTM,
    "ROA": convertToPercent(data.ReturnOnAssetsTTM) + TTM,
    "ROE": convertToPercent(data.ReturnOnEquityTTM) + TTM,
    "Revenue": convertData(data.RevenueTTM) + TTM,
    "Gross Profit": convertData(data.GrossProfitTTM) + TTM,
    "Diluted EPS": data.DilutedEPSTTM + TTM,
    "AnalystTargetPrice": data.AnalystTargetPrice,
    "AnalystRatingStrongBuy": data.AnalystRatingStrongBuy,
    "AnalystRatingBuy": data.AnalystRatingBuy,
    "AnalystRatingHold": data.AnalystRatingHold,
    "AnalystRatingSell": data.AnalystRatingSell,
    "AnalystRatingStrongSell": data.AnalystRatingStrongSell,
    "Trailing P/E": data.TrailingPE,
    "Forward P/E": data.ForwardPE,
    "P/S": data.PriceToSalesRatioTTM + TTM,
    "P/B": data.PriceToBookRatio,
    "EV/Revenue": data.EVToEBITDA,
    "EV/EBITDA": data.EVToEBITDA,
  }

  return transformedRatios
}