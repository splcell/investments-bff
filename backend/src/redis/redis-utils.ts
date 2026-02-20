import redisClient from "./redis-client";
import { Response } from "express";

export const saveToRedis = async (key: string, data: any, ttl = 60) => {
  //функция для сохранения в redis, которая принимает ключ, значение и срок харения данных в секундах
  await redisClient.set(key, JSON.stringify(data), {
    EX: ttl,
  });

  console.log("Save to redis") // удалить для прода
};

export const cacheResponse = async (res: Response, data: any) => {
  if(res.locals.cacheKey){
    await saveToRedis(res.locals.cacheKey, data, res.locals.ttl);
    console.log(res.locals.cacheKey, "Saved key")
  }
}

export const getFromRedis = async(key: string) => {
  const data = await redisClient.get(key)

  if(!data) return null

  return JSON.parse(data)
}