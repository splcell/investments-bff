import { Router } from "express";
import cacheMiddleware from "../middlewares/cache-middleware";
import { getCompanyDividends, getCompanyInfo, getCompanyQuote } from "../controllers/company";

const router = Router();

router.get('/company/:ticker', cacheMiddleware(604800), getCompanyInfo)
router.get('/company/:ticker/quote', getCompanyQuote)
router.get('/company/:ticker/dividends', cacheMiddleware(86400), getCompanyDividends)


export default router;