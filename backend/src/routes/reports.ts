import { Router } from "express";
import cacheMiddleware from "../middlewares/cache-middleware";
import { getAllReports } from "../controllers/reports";

const router = Router()

router.get('/company/:ticker/reports', cacheMiddleware(86400), getAllReports)

export default router