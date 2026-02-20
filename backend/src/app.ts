import express from "express";
import cors from 'cors'
import { errorHandler } from "./middlewares/error-handler";
import newsRouter from './routes/news'
import searchRouter from './routes/search'
import cookieParser from "cookie-parser";
import userRouter from './routes/user'
import companyRouter from './routes/company'
import reportsRouter from './routes/reports'
import 'dotenv/config'
import { initRedis } from "./redis/redis-client";
import mongoose from "mongoose";

const {BACKEND_PORT, MONGO_URL} = process.env

const app = express();

app.use("*", cors({
  origin: true,
  credentials: true
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());

app.use(newsRouter)
app.use(searchRouter)
app.use(userRouter)
app.use(companyRouter)
app.use(reportsRouter)


app.use(errorHandler)

console.log(BACKEND_PORT, "port")

const run = async() => {
  try {
    await initRedis()
    await mongoose.connect(MONGO_URL as string);

    console.log('MongoDB connected')
    app.listen(BACKEND_PORT, () => {
      console.log("Server start", BACKEND_PORT)
    })
  } catch (error) {
    console.log(error)
  }
}

run()