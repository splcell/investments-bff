import { Router } from "express";
import { getSearchNameResults } from "../controllers/search";

const router = Router()

router.get('/search/name', getSearchNameResults)

export default router


