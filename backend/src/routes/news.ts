import { Router } from "express";
import { getAllNews, getCompanyNews } from "../controllers/news";
import cacheMiddleware from "../middlewares/cache-middleware";

const router = Router();

router.get("/news", cacheMiddleware(600), getAllNews);
router.get("/company/:ticker/news", cacheMiddleware(600), getCompanyNews);

export default router;
