import { transformCompanyInfo } from './../helpers/transformCompanyInfo';
import { Request, Response, NextFunction } from "express";
import { cacheResponse } from "../redis/redis-utils";
import 'dotenv/config'
import { NotFoundError } from "../errors/not-found-error";
import { transformQuote } from '../helpers/transformQuote';

const { ALT_API_KEY, ALT_BASE_URL, BASE_URL, API_KEY } = process.env;

export const getCompanyInfo = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ticker = req.params.ticker;

  try {
    const response = await fetch(ALT_BASE_URL + `stable/profile?symbol=${ticker}&apikey=${ALT_API_KEY}`)

    const data = await response.json()

    if(!data[0]){
      return next(new NotFoundError("Company not Found"))
    }

    const returnedData = transformCompanyInfo(data[0])

    await cacheResponse(res, returnedData)

    res.send(returnedData)

  } catch (error) {
    next(error)
  }
}

export const getCompanyQuote = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ticker = req.params.ticker;

  try {
    const response = await fetch(ALT_BASE_URL + `stable/quote?symbol=${ticker}&apikey=${ALT_API_KEY}`)

    const data = await response.json()

    if(!data[0]){
      return next(new NotFoundError("Company Quote not Found"))
    }

    const returnedQuote = transformQuote(data[0])

    res.send(returnedQuote)

  } catch (error) {
    next(error)
  }
}

export const getCompanyDividends = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ticker = req.params.ticker;

  try {
    const response = await fetch(BASE_URL + `stocks/v1/dividends?ticker=${ticker}&limit=100&sort=ticker.asc&apiKey=${API_KEY}`)
    const data = await response.json()

    if(!data || !data.results.length){
      return next(new NotFoundError("Company Dividends not Found"))
    }

    await cacheResponse(res, data)

    res.send(data)

  } catch (error) {
    next(error)
  }
}