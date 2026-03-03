import { Request, Response, NextFunction } from "express";
import { cacheResponse } from "../redis/redis-utils";
import "dotenv/config";
import { NotFoundError } from "../errors/not-found-error";

const { API_KEY, BASE_URL } = process.env;

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await fetch(
      BASE_URL +
        `v2/reference/news?order=desc&limit=10&sort=published_utc&apiKey=${API_KEY}`,
    );

    const data = await response.json();

    await cacheResponse(res, data.results);

    res.send(data.results);
  } catch (error) {
    next(error);
  }
};

export const getCompanyNews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ticker = req.params.ticker

  if (!ticker) {
    return next(new NotFoundError("Ticker not Found"));
  }

  try {
    const response = await fetch(
      BASE_URL +
        `v2/reference/news?ticker=${ticker}&order=desc&limit=10&sort=published_utc&apiKey=a_1NHmsXRE2XUEDf9KvUDbvabvzk5vrX`,
    );

    const data = await response.json();

    await cacheResponse(res, data.results);

    res.send(data.results);

  } catch (error) {
    return next(error);
  }
};
