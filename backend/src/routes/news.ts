import { Router } from "express";
import { getAllNews } from "../controllers/news";
import cacheMiddleware from "../middlewares/cache-middleware";

const router = Router();

router.get('/news', cacheMiddleware(600), getAllNews)

export default router