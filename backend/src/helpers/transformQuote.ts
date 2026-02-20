import { Quote } from "../types/quote"

export const transformQuote = (data: any) => {
  const newQuote: Quote = {
    price: data.price,
    change: data.change,
    changePercentage: data.changePercentage,
    previousClose: data.previousClose,
    yearHigh: data.yearHigh,
    yearLow: data.yearLow
  }

  return newQuote
}