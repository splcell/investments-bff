import { NextFunction, Request, Response } from "express";
import { getFromRedis } from "../redis/redis-utils";
import { CacheError } from "../errors/cache-error";

const cacheMiddleware = (ttl = 60) => async(req: Request, res: Response, next: NextFunction) => { //middleware для получения данных из redis
  const cacheKey = req.originalUrl

  try {
    const cacheData = await getFromRedis(cacheKey)

    if(cacheData){
      console.log(cacheData, "cache data")

      return res.send(cacheData)
    }

    res.locals.cachekey = cacheKey //сохраняем данные локально чтобы их можно было использовать в других middleware
    res.locals.ttl = ttl

    next()

  } catch (error) {
      console.log(error)
      next(new CacheError())
  }
}

export default cacheMiddleware;