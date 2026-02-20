import { transformSearchResult } from "./../helpers/transformSearchResult";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

const { API_KEY, BASE_URL } = process.env;

export const getSearchNameResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.query.name as string;

  try {
    const response = await fetch(
      BASE_URL +
        `v3/reference/tickers?market=stocks&search=${name.toUpperCase()}&active=true&order=asc&limit=100&sort=name&apiKey=${API_KEY}`
    );

    const data = await response.json();
    const transformedData = transformSearchResult(data);
    res.send(transformedData);
  } catch (error) {
    next(error);
  }
};

export const getSearchTickerResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ticker = req.query.ticker as string;

  try {
    const response = await fetch(
      BASE_URL +
        `v3/reference/tickers?ticker=${ticker.toUpperCase()}&market=stocks&active=true&order=asc&limit=100&sort=name&apiKey=${API_KEY}`
    );

    const data = await response.json();

    const transformedData = transformSearchResult(data);
    res.send(transformedData);
  } catch (error) {
    next(error);
  }
};
