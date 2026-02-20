import { Request, Response, NextFunction } from "express";
import { cacheResponse } from "../redis/redis-utils";
import 'dotenv/config'

const { API_KEY, BASE_URL } = process.env;

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await fetch(
      BASE_URL +
        `v2/reference/news?order=desc&limit=10&sort=published_utc&apiKey=${API_KEY}`
    );

    const data = await response.json();

    await cacheResponse(res, data.results);

    res.send(data.results);
  } catch (error) {
    next(error);
  }
};
