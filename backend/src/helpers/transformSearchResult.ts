import { SearchInfo, SearchResult } from "../types/search"

export const transformSearchResult = (data: any) => {
  const transformedResults: SearchInfo[] = data.results.map((result: any) => {
    return {
      ticker: result.ticker,
      name: result.name,
      market: result.market,
      locale: result.locale,
      primary_exchange: result.primary_exchange,
      currency_name: result.currency_name,
    }
  })

  // data.results.forEach((result: any) => {
  //   const newResult = {
  //     ticker: result.ticker,
  //     name: result.name,
  //     market: result.market,
  //     locale: result.locale,
  //     primary_exchange: result.primary_exchange,
  //     currency_name: result.currency_name,
  //   }

  //   transformedResults.push(newResult)
  // })

  const newResult: SearchResult = {
    results: transformedResults,
    count: data.count
  }

  return newResult
}